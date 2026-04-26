#!/usr/bin/env node
/**
 * Fixt Typos in Sanity-Produktbeschreibungen.
 * Geht durch alle Produkte, ersetzt definierte Typo-Pärchen
 * im plain text der portable-text spans, schreibt nur zurück
 * wenn etwas geändert wurde.
 */
import { createClient } from '@sanity/client'

if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})

const REPLACEMENTS = [
  // [searchRegex, replacement]
  [/Mulitwash/g, 'Multiwash'],
  [/Multiash Prischenaufbau/g, 'Multiwash Pritschenaufbau'],
  [/eigent sich/g, 'eignet sich'],
  [/feigenet sich/g, 'eignet sich'],
  [/spühen/g, 'sprühen'],
  [/Mährobster/g, 'Mähroboter'],
  [/Ausleicherweite/g, 'Auslegerreichweite'],
  // Truncated descriptions — replace whole phrase
  [
    /Sie hat eine äußerst leise und leistungsstarke Saugturbine mit abg(?:[\.,]|$|")/g,
    'Sie verfügt über eine äusserst leise und leistungsstarke Saugturbine mit abgestimmtem Hochentleerungs-System für effizienten Einsatz auf Sport-, Park- und Grünanlagen.',
  ],
  [
    /eine unzureichende Hydraulikleistung hat(?:[\.,]|$|")/g,
    'eine unzureichende Hydraulikleistung hat. Es liefert die nötige Hydraulikleistung für Front-Anbaugeräte und macht so auch ältere Traktoren universell einsetzbar.',
  ],
]

function transform(text) {
  let out = text
  for (const [re, rep] of REPLACEMENTS) out = out.replace(re, rep)
  return out
}

function fixBlocks(blocks) {
  if (!Array.isArray(blocks)) return { changed: false, blocks }
  let changed = false
  const next = blocks.map((b) => {
    if (!b || b._type !== 'block' || !Array.isArray(b.children)) return b
    const newChildren = b.children.map((c) => {
      if (c?._type !== 'span' || typeof c.text !== 'string') return c
      const t2 = transform(c.text)
      if (t2 !== c.text) { changed = true; return { ...c, text: t2 } }
      return c
    })
    return { ...b, children: newChildren }
  })
  return { changed, blocks: next }
}

const products = await client.fetch(`
  *[_type=="product"]{ _id, "slug": slug.current, name, description }
`)

let scanned = 0, changed = 0, failed = 0
for (const p of products) {
  scanned++
  const { changed: didChange, blocks } = fixBlocks(p.description)
  if (!didChange) continue
  try {
    await client.patch(p._id).set({ description: blocks }).commit()
    console.log(`✅ ${p.slug}`)
    changed++
  } catch (e) {
    console.error(`❌ ${p.slug}: ${e.message}`)
    failed++
  }
}
console.log(`\nScanned: ${scanned}, changed: ${changed}, failed: ${failed}`)
