#!/usr/bin/env node
/**
 * Einmal-Script: legt die 3 Greentec-Produkte in Sanity an,
 * damit sie eigene Detail-Unterseiten erhalten (statt direkt extern zu verlinken).
 *
 *   /kommunalcenter/greentec/<slug>  →  Unterseite mit „Anfrage stellen" + „Bei Greentec ansehen"
 *
 * Run:
 *   node --env-file=.env.local scripts/add-greentec-products.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const PRODUCTS = [
  {
    slug: 'greentec-spider',
    title: 'GreenTec Böschungsmäher Spider',
    paragraphs: [
      'Der GreenTec Spider ist ein funkferngesteuerter Böschungsmäher für extreme Steigungen und schwer zugängliche Flächen.',
      'Sicheres Mähen an Böschungen, Deichen und Hängen ohne Gefährdung des Bedieners.',
    ],
  },
  {
    slug: 'greentec-scorpion',
    title: 'GreenTec Scorpion',
    paragraphs: [
      'Der GreenTec Scorpion ist ein leistungsstarker Auslegemulcher für Trägerfahrzeuge und Traktoren.',
      'Vielseitig für die Hecken-, Böschungs- und Grünflächenpflege mit grosser Reichweite.',
    ],
  },
  {
    slug: 'greentec-multitraeger-puma',
    title: 'GreenTec Multiträger Puma',
    paragraphs: [
      'Der GreenTec Multiträger Puma ist eine wendige Trägermaschine für vielfältige Anbaugeräte.',
      'Ideal für die professionelle Grün- und Landschaftspflege.',
    ],
  },
]

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

function descBlocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `desc${i + 1}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${i + 1}`, text, marks: [] }],
  }))
}

async function uploadAsset(slug) {
  const filepath = path.join(ROOT, 'public', 'images', 'products', slug, 'main.webp')
  const buf = fs.readFileSync(filepath)
  const asset = await client.assets.upload('image', buf, { filename: `${slug}.webp` })
  return asset._id
}

async function main() {
  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="greentec"][0]{_id}`,
  )
  if (!brand) throw new Error('greentec brand not found in Sanity')
  console.log(`🏭 Greentec brand: ${brand._id}\n`)

  for (const p of PRODUCTS) {
    try {
      const assetId = await uploadAsset(p.slug)
      const id = `product-${p.slug}`
      await client.createOrReplace({
        _id: id,
        _type: 'product',
        name: p.title,
        slug: { _type: 'slug', current: p.slug },
        brand: { _type: 'reference', _ref: brand._id },
        description: descBlocks(p.paragraphs),
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
      })
      console.log(`   ✅ ${p.title.padEnd(34)} → ${id}`)
    } catch (e) {
      console.error(`   ❌ ${p.title.padEnd(34)} : ${e.message}`)
    }
  }
  console.log()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
