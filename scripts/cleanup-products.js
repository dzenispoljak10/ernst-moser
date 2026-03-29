#!/usr/bin/env node
/**
 * Ernst Moser – Produkt-Bereinigung
 * ==================================
 * 1. Löscht Nicht-Produkte (Kontaktkarten, "Warum...", Ansprechpartner etc.)
 * 2. Entfernt Personen-/Firmenfotos aus echten Produkten
 * 3. Legt Adrian Moser als Verkäufer an
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Muster für Junk-Titel ─────────────────────────────────────────────────

const JUNK_TITLE_PATTERNS = [
  /haben sie fragen/i,
  /wünschen eine beratung/i,
  /warum du dein/i,
  /warum du das/i,
  /ihr .{1,30} partner für/i,
  /ihr ansprechpartner/i,
  /ihr .{1,30} Ansprechpartner/i,
  /individuelle lösungen für ihr/i,
  /individuelle fahrzeuglösungen/i,
  /individuelle lösi/i,
  /damit ihre fahrzeuge/i,
  /wir haben das passende/i,
]

// Exakte Titel die Junk sind (generische Überschriften ohne echten Inhalt)
const JUNK_EXACT_TITLES = new Set([
  'Alkè', 'Alké', 'Ambrogio', 'Baoli', 'Dhollandia', 'Envitec', 'Erco', 'Fiat',
  'Gianni Ferrari', 'Greentec', 'Hako', 'Hilltip', 'Isuzu', 'Kaaz', 'Kubota',
  'Ligier', 'Ligier Professional', 'Makita', 'Matev', 'Mulchy', 'Nilfisk',
  'Piaggio', 'Professsional', 'Professional', 'Pudu', 'Reform', 'Scania',
  'Segway', 'Springer', 'Stema', 'Stiga', 'Stihl', 'Swardman', 'TIMAN', 'UT',
  'Wabco', 'Zaugg',
  // Generic section headers
  'Motorgeräte', 'Reinigungstechnik', 'Kommunalfahrzeuge', 'Roboter',
  'Rasenmäher', 'Salzstreuer', 'Streuautomaten', 'Maschinen', 'Winterdienste',
  'Spindelmäher', 'Gabelstapler', 'Fahrzeuge', 'Groundcare Solutions',
  'Groundcare', 'Maschinen', 'Hochhubwagen', 'Baoli Stapler', 'Rasenroboter',
  'Elektrische Modellreihe', 'Verbrennungsmotor-Baureihe',
  'Park-Reihe', 'Swardman Spindelmäher', 'Spindelmäher',
  // Incomplete/bad titles
  '& Mulden', 'UT Aufbauten',
  // Greentec
  'GreenTec', 'Greentec Auslegemulcher', 'Greentec Multiträger',
  // Kubota
  'EK1 Serie',  // no image
  // Reform
  'Kommunalfahrzeuge',
  // Springer
  'Salzstreuer', 'Streuautomaten', 'Springer',
  // Stema
  'Motorgeräte', 'Stema', 'Stema Motorgeräte',
  // Wabco
  'WABCO', 'Wabco',
  // Zaugg
  'Winterdienste', 'Zaugg',
  // Pudu
  'Pudu', 'Roboter',
  // Erco
  'Erco', 'Motorgeräte',
  // Envitec
  'Envitec', 'Winterdienste​',
  // Segway
  'Mähroboter',
  // Hilltip
  'Hilltip', 'Winterdienst',
  // Stihl
  'Motorgeräte', 'Rasenmäher',
  // Stiga
  'Motorgeräte',
  // Hako
  'Reinigungstechnik',
  // Dhollandia
  'Dhollandia – Marktführer für Ladebordwände',
  'Ihr Dhollandia Partner für starke Hebebühnen',
  // Scania
  'Individuelle Fahrzeuglösungen für Ihr Unternehmen',
  // Fiat
  'Werkstatt & Wartung', 'Professsional',
  // Isuzu
  'Kompakt, wendig und vielseitig einsetzbar',
  'Die perfekte Balance aus Leistung und Flexibilität',
  // Springer
  'Ihr Springer Partner für zuverlässigen Winterdienst',
  // Reform
  'Boki 1152 B',  // no image - keep but may have issues
  // Gianni Ferrari
  'Gianni Ferrari',
  // Ligier
  'Ligier',
])

// ─── Personen-/Firmenbilder die NICHT als Produktbilder erlaubt sind ─────────

const BANNED_IMAGE_FILENAMES = [
  'neustes-foto-firma',
  'roland_burkhalter',
  'foto-d845a2ec',      // generic placeholder
  'panorama',
  'adrian_moser',
  'burkhalter',
]

function isBannedImage(filename) {
  if (!filename) return false
  const f = filename.toLowerCase()
  return BANNED_IMAGE_FILENAMES.some(b => f.includes(b))
}

function isJunkTitle(title) {
  if (!title) return true
  if (title.length < 3) return true
  if (JUNK_EXACT_TITLES.has(title.trim())) return true
  return JUNK_TITLE_PATTERNS.some(p => p.test(title))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Produkt-Bereinigung                               ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  // Load all products with image info
  const products = await client.fetch(`
    *[_type == "product"] {
      _id, name,
      "brandName": brand->name,
      "imgFilename": mainImage.asset->originalFilename,
      mainImage
    }
  `)
  console.log(`Gefunden: ${products.length} Produkte\n`)

  const toDelete = []
  const toUnsetImg = []
  const toKeep = []

  for (const p of products) {
    if (isJunkTitle(p.name)) {
      toDelete.push(p)
    } else if (isBannedImage(p.imgFilename)) {
      toUnsetImg.push(p)
    } else {
      toKeep.push(p)
    }
  }

  console.log(`🗑️  Zu löschen:          ${toDelete.length}`)
  console.log(`🖼️  Bild entfernen:      ${toUnsetImg.length}`)
  console.log(`✅  Behalten:            ${toKeep.length}\n`)

  // Delete junk products
  console.log('─── Lösche Junk-Produkte ──────────────────────────────')
  let deleted = 0
  for (const p of toDelete) {
    try {
      await client.delete(p._id)
      console.log(`   🗑️  [${(p.brandName||'?').padEnd(20)}] ${p.name}`)
      deleted++
    } catch (err) {
      console.error(`   ❌  ${p.name}: ${err.message}`)
    }
  }

  // Remove banned images from products
  console.log('\n─── Entferne Personen-/Firmenbilder aus Produkten ────')
  let imgFixed = 0
  for (const p of toUnsetImg) {
    try {
      await client.patch(p._id).unset(['mainImage']).commit()
      console.log(`   🖼️  [${(p.brandName||'?').padEnd(20)}] ${p.name} (${p.imgFilename})`)
      imgFixed++
    } catch (err) {
      console.error(`   ❌  ${p.name}: ${err.message}`)
    }
  }

  // ── Adrian Moser als Verkäufer anlegen ────────────────────────────────────
  console.log('\n─── Verkäufer anlegen ────────────────────────────────')

  // Suche nach Adrian Moser Foto
  const adrianPhoto = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename match "Adrian*" || originalFilename match "adrian*"][0]{ _id, originalFilename }`
  )

  // Motorgeräte Center ID
  const motorCenter = await client.fetch(`*[_type == "center" && slug.current == "motorgeraetecenter"][0]{ _id }`)
  const kommunalCenter = await client.fetch(`*[_type == "center" && slug.current == "kommunalcenter"][0]{ _id }`)

  if (adrianPhoto) {
    console.log(`   Foto gefunden: ${adrianPhoto.originalFilename}`)
  } else {
    console.log('   ⚠️  Kein Foto für Adrian Moser gefunden – wird ohne Foto angelegt')
  }

  const adrianDoc = {
    _id: 'salesperson-adrian-moser',
    _type: 'salesperson',
    firstName: 'Adrian',
    lastName: 'Moser',
    title: 'Geschäftsführer / Leitung Verkauf',
    phone: '+41 (0)32 675 58 05',
    email: 'info@ernst-moser.ch',
    ...(adrianPhoto ? {
      photo: { _type: 'image', asset: { _type: 'reference', _ref: adrianPhoto._id } }
    } : {}),
    centers: [
      motorCenter?._id   && { _type: 'reference', _ref: motorCenter._id,   _key: 'motor' },
      kommunalCenter?._id && { _type: 'reference', _ref: kommunalCenter._id, _key: 'komm2' },
    ].filter(Boolean),
  }

  await client.createOrReplace(adrianDoc)
  console.log(`   ✅  Adrian Moser → Motorgerätecenter + Kommunalcenter`)

  // Update salesperson-kommunal mit Adrian als Hauptkontakt
  await client.patch('salesperson-kommunal').set({
    firstName: 'Adrian',
    lastName: 'Moser',
    title: 'Geschäftsführer / Leitung Verkauf',
    ...(adrianPhoto ? {
      photo: { _type: 'image', asset: { _type: 'reference', _ref: adrianPhoto._id } }
    } : {}),
  }).commit()
  console.log('   ✅  Kommunal-Ansprechpartner → Adrian Moser aktualisiert')

  await client.patch('salesperson-motor').set({
    firstName: 'Adrian',
    lastName: 'Moser',
    title: 'Geschäftsführer / Leitung Verkauf',
    ...(adrianPhoto ? {
      photo: { _type: 'image', asset: { _type: 'reference', _ref: adrianPhoto._id } }
    } : {}),
  }).commit()
  console.log('   ✅  Motor-Ansprechpartner → Adrian Moser aktualisiert')

  // ── Zusammenfassung ───────────────────────────────────────────────────────
  const remaining = await client.fetch(`count(*[_type == "product"])`)
  console.log(`\n╔══════════════════════════════════════════════════════╗`)
  console.log(`║  Gelöscht:        ${String(deleted).padStart(3)}                          ║`)
  console.log(`║  Bilder bereinigt: ${String(imgFixed).padStart(3)}                         ║`)
  console.log(`║  Produkte übrig:  ${String(remaining).padStart(3)}                          ║`)
  console.log(`╚══════════════════════════════════════════════════════╝\n`)
}

main().catch(err => {
  console.error('\n💥', err.message)
  process.exit(1)
})
