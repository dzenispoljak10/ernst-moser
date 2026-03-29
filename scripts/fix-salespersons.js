#!/usr/bin/env node
/**
 * Verkäufer konsolidieren:
 * - salesperson-adrian-moser  → behalten (Motor + Kommunal)
 * - salesperson-motor         → löschen (doppelt)
 * - salesperson-kommunal      → löschen (doppelt)
 * - salesperson-roland-burkhalter → unverändert
 *
 * Alle Produkte/Marken die auf salesperson-motor / salesperson-kommunal zeigen
 * werden auf salesperson-adrian-moser umgebogen.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Verkäufer-Konsolidierung                          ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  // 1. Aktuelle Verkäufer anzeigen
  const all = await client.fetch(`*[_type == "salesperson"] | order(_id asc) {
    _id, firstName, lastName, title,
    "hasPic": photo != null,
    "centers": centers[]->slug.current
  }`)

  console.log('Aktuelle Verkäufer:')
  for (const s of all) {
    console.log(`  [${s._id}] ${s.firstName} ${s.lastName} | Foto: ${s.hasPic ? '✅' : '❌'} | Centers: ${(s.centers||[]).join(', ')}`)
  }
  console.log()

  // 2. Center-IDs ermitteln
  const motorCenter    = await client.fetch(`*[_type == "center" && slug.current == "motorgeraetecenter"][0]{ _id }`)
  const kommunalCenter = await client.fetch(`*[_type == "center" && slug.current == "kommunalcenter"][0]{ _id }`)

  // 3. Sicherstellen, dass salesperson-adrian-moser korrekte Center-Refs hat
  await client.patch('salesperson-adrian-moser').set({
    centers: [
      motorCenter?._id    && { _type: 'reference', _ref: motorCenter._id,    _key: 'motor' },
      kommunalCenter?._id && { _type: 'reference', _ref: kommunalCenter._id, _key: 'komm' },
    ].filter(Boolean),
  }).commit()
  console.log('✅  salesperson-adrian-moser: Center-Refs gesetzt (Motor + Kommunal)')

  // 4. Alle Marken die auf salesperson-motor oder salesperson-kommunal zeigen, auf Adrian umbiegen
  const OLD_IDS = ['salesperson-motor', 'salesperson-kommunal']

  const brandsWithOld = await client.fetch(`
    *[_type == "brand" && salesperson._ref in $ids]{ _id, name }
  `, { ids: OLD_IDS })

  for (const b of brandsWithOld) {
    await client.patch(b._id).set({
      salesperson: { _type: 'reference', _ref: 'salesperson-adrian-moser' }
    }).commit()
    console.log(`   ↩️  Marke "${b.name}" → salesperson-adrian-moser`)
  }

  // 5. Alle Center-Docs die auf die alten IDs zeigen, bereinigen
  const centersWithOld = await client.fetch(`
    *[_type == "center" && salesperson._ref in $ids]{ _id, name }
  `, { ids: OLD_IDS })

  for (const c of centersWithOld) {
    await client.patch(c._id).set({
      salesperson: { _type: 'reference', _ref: 'salesperson-adrian-moser' }
    }).commit()
    console.log(`   ↩️  Center "${c.name}" → salesperson-adrian-moser`)
  }

  // 6. Alte Duplikate löschen
  for (const id of OLD_IDS) {
    try {
      await client.delete(id)
      console.log(`🗑️  Gelöscht: ${id}`)
    } catch (err) {
      console.log(`⚠️  Konnte ${id} nicht löschen: ${err.message}`)
    }
  }

  // 7. Ergebnis
  const remaining = await client.fetch(`*[_type == "salesperson"] | order(_id asc) {
    _id, firstName, lastName, title,
    "hasPic": photo != null,
    "centers": centers[]->slug.current
  }`)

  console.log('\n─── Ergebnis ─────────────────────────────────────────')
  for (const s of remaining) {
    console.log(`  [${s._id}]`)
    console.log(`    Name:    ${s.firstName} ${s.lastName}`)
    console.log(`    Titel:   ${s.title}`)
    console.log(`    Foto:    ${s.hasPic ? '✅' : '❌  → bitte in Sanity Studio hochladen'}`)
    console.log(`    Centers: ${(s.centers||[]).join(', ') || '(keine)'}`)
  }
  console.log()
}

main().catch(err => {
  console.error('\n💥', err.message)
  process.exit(1)
})
