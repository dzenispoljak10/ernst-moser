#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Verkäufer pro Marke zuweisen
 * ================================================
 * 1. Erstellt Michael Peter als neuen Salesperson (Kommunalcenter)
 * 2. Weist jedem brand-Dokument den richtigen salesperson zu
 *
 * Ausführen: node scripts/assign-salespersons-to-brands.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Marken pro Center ────────────────────────────────────────────────────────

const NUTZFAHRZEUG_SLUGS = ['scania', 'fiat', 'isuzu', 'piaggio', 'ut', 'dhollandia', 'wabco', 'hilltip']

const KOMMUNAL_SLUGS = [
  'alk',  // Alkè – Sanity slug ist "alk" nicht "alke"
  'baoli', 'envitec', 'greentec', 'gianni-ferrari', 'hako', 'kubota',
  'matev', 'ligier-professional', 'mulchy', 'reform',
  'springer', 'stema', 'timan', 'zaugg',
]

const MOTOR_SLUGS = [
  'ambrogio', 'erco', 'kaaz', 'makita', 'nilfisk',
  'pudu-robotics', 'segway', 'stiga', 'stihl', 'swardman',
]

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Verkäufer-Zuweisung pro Marke                     ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  // ── 1. Center-IDs holen ──────────────────────────────────────────────────
  const centers = await client.fetch(`*[_type == "center"]{ _id, name, slug }`)
  const kommunalCenter = centers.find(c => c.slug?.current === 'kommunalcenter')
  const motorCenter    = centers.find(c => c.slug?.current === 'motorgeraetecenter')
  const nutzCenter     = centers.find(c => c.slug?.current === 'nutzfahrzeugcenter')

  console.log('Centers:')
  for (const c of centers) console.log(`  [${c._id}] ${c.name}`)
  console.log()

  // ── 2. Michael Peter anlegen / aktualisieren ─────────────────────────────
  console.log('── Michael Peter (Kommunalcenter) ──')

  // Suche nach einem Foto-Asset für Michael Peter
  const michaelPhoto = await client.fetch(
    `*[_type == "sanity.imageAsset" && (originalFilename match "michael*peter*" || originalFilename match "michael_peter*")][0]{ _id, originalFilename }`
  )
  if (michaelPhoto) {
    console.log(`   Foto gefunden: ${michaelPhoto.originalFilename}`)
  } else {
    console.log('   ⚠️  Kein Foto für Michael Peter – wird ohne Foto angelegt')
  }

  const michaelDoc = {
    _id: 'salesperson-michael-peter',
    _type: 'salesperson',
    firstName: 'Michael',
    lastName: 'Peter',
    title: 'Verkauf / Aussendienst',
    phone: '+41 79 485 89 12',
    email: 'michael.peter@ernst-moser.ch',
    ...(michaelPhoto ? {
      photo: { _type: 'image', asset: { _type: 'reference', _ref: michaelPhoto._id } },
    } : {}),
    centers: [
      kommunalCenter && { _type: 'reference', _ref: kommunalCenter._id, _key: 'komm' },
    ].filter(Boolean),
  }

  await client.createOrReplace(michaelDoc)
  console.log('   ✅  salesperson-michael-peter angelegt / aktualisiert\n')

  // ── 3. Roland Burkhalter updaten ─────────────────────────────────────────
  console.log('── Roland Burkhalter (Nutzfahrzeugcenter) ──')
  await client.patch('salesperson-roland-burkhalter').set({
    firstName: 'Roland',
    lastName: 'Burkhalter',
    title: 'Betriebsleiter Nutzfahrzeuge',
    phone: '+41 32 675 58 05',
    email: 'roland.burkhalter@ernst-moser.ch',
    centers: [
      nutzCenter && { _type: 'reference', _ref: nutzCenter._id, _key: 'nutz' },
    ].filter(Boolean),
  }).commit()
  console.log('   ✅  salesperson-roland-burkhalter aktualisiert\n')

  // ── 4. Adrian Moser updaten ───────────────────────────────────────────────
  console.log('── Adrian Moser (Motorgerätecenter) ──')
  await client.patch('salesperson-adrian-moser').set({
    firstName: 'Adrian',
    lastName: 'Moser',
    title: 'Geschäftsführer / Leitung Verkauf',
    phone: '+41 32 675 58 05',
    email: 'adrian.moser@ernst-moser.ch',
    centers: [
      motorCenter    && { _type: 'reference', _ref: motorCenter._id,    _key: 'motor' },
      kommunalCenter && { _type: 'reference', _ref: kommunalCenter._id, _key: 'komm' },
    ].filter(Boolean),
  }).commit()
  console.log('   ✅  salesperson-adrian-moser aktualisiert\n')

  // ── 5. Alle Marken holen ─────────────────────────────────────────────────
  const allBrands = await client.fetch(`
    *[_type == "brand"]{ _id, name, slug, "centerSlug": center->slug.current }
  `)

  console.log(`── ${allBrands.length} Marken gefunden ──`)

  let nutzCount = 0, kommCount = 0, motorCount = 0, notFound = []

  for (const brand of allBrands) {
    const slug = brand.slug?.current
    let spId = null
    let spName = null

    if (NUTZFAHRZEUG_SLUGS.includes(slug) || brand.centerSlug === 'nutzfahrzeugcenter') {
      spId   = 'salesperson-roland-burkhalter'
      spName = 'Roland Burkhalter'
      nutzCount++
    } else if (KOMMUNAL_SLUGS.includes(slug) || brand.centerSlug === 'kommunalcenter') {
      spId   = 'salesperson-michael-peter'
      spName = 'Michael Peter'
      kommCount++
    } else if (MOTOR_SLUGS.includes(slug) || brand.centerSlug === 'motorgeraetecenter') {
      spId   = 'salesperson-adrian-moser'
      spName = 'Adrian Moser'
      motorCount++
    } else {
      notFound.push(`${brand.name} (${slug})`)
      continue
    }

    await client.patch(brand._id).set({
      salesperson: { _type: 'reference', _ref: spId },
    }).commit()

    console.log(`   ✅  ${brand.name} (${slug}) → ${spName}`)
  }

  console.log(`\n── Zusammenfassung ──`)
  console.log(`   Nutzfahrzeugcenter: ${nutzCount} Marken → Roland Burkhalter`)
  console.log(`   Kommunalcenter:     ${kommCount} Marken → Michael Peter`)
  console.log(`   Motorgerätecenter:  ${motorCount} Marken → Adrian Moser`)
  if (notFound.length > 0) {
    console.log(`   ⚠️  Nicht zugeordnet: ${notFound.join(', ')}`)
  }
  console.log('\n✅  Alle Verkäufer-Zuweisungen abgeschlossen!\n')
}

main().catch(err => {
  console.error('\n💥', err.message)
  process.exit(1)
})
