#!/usr/bin/env node
/**
 * Hako — 4 Standalone-Produkte mit Bildern aus Sanity-Gallery anlegen.
 * (Inline brand.products werden aktuell nicht als Detailseiten gerendert.)
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const HAKO = [
  { slug: 'hako-citymaster-1600', title: 'Hako Citymaster 1600', desc: 'Kompakte Saugkehrmaschine für Strassen, Plätze und Fussgängerzonen — wendig, leise und einsatzbewährt.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/0502e15b802b7ff57345eedf154d5107baf8b255-1208x700.webp' },
  { slug: 'hako-hakomatic-b-450', title: 'Hako Hakomatic B 450', desc: 'Aufsitz-Scheuersaugmaschine für Hallenböden — hohe Flächenleistung, ergonomischer Arbeitsplatz.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/c5fd9f18841bc1d3191af2662e4fcf4f78126b0c-1200x800.webp' },
  { slug: 'hako-sweepmaster-650', title: 'Hako Sweepmaster 650', desc: 'Kompakt-Kehrmaschine für Innenhöfe und Fussgängerzonen — geräuscharm, emissionsfrei verfügbar.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/4cd391d4af9662b621421ae701c839b633427ec8-1024x594.webp' },
  { slug: 'hako-hakotrac-1700d', title: 'Hako Hakotrac 1700D', desc: 'Multifunktions-Kommunalfahrzeug für Sommer- und Winterdienst — Mähwerk, Streuer, Schneepflug.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/caad789bcc9d3b621ae85e381354f483db67bd8b-1051x700.webp' },
]

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
  const client = createClient({
    projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
    apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
  })
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="hako"][0]{_id}`)
  if (!brand) throw new Error('Hako brand not found')

  console.log()
  for (const p of HAKO) {
    const dir = path.join(ROOT, 'public', 'images', 'products', p.slug)
    const out = path.join(dir, 'main.webp')
    fs.mkdirSync(dir, { recursive: true })
    try {
      const r = await fetch(p.img, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      const buf = Buffer.from(await r.arrayBuffer())
      const webp = await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
      fs.writeFileSync(out, webp)
      const asset = await client.assets.upload('image', webp, { filename: `${p.slug}.webp` })
      await client.createOrReplace({
        _id: `product-${p.slug}`,
        _type: 'product',
        name: p.title,
        slug: { _type: 'slug', current: p.slug },
        brand: { _type: 'reference', _ref: brand._id },
        description: [{ _type: 'block', _key: 'd1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: p.desc, marks: [] }] }],
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      console.log(`✅ ${p.title}`)
    } catch (e) {
      console.error(`❌ ${p.title}: ${e.message}`)
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
