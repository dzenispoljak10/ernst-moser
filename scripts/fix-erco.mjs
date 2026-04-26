#!/usr/bin/env node
/**
 * Erco — 4 Produkt-Kategorien anlegen mit Bildern aus dem Sanity-Gallery-Feed.
 * Erco hat keine öffentliche Website; Detailseiten haben nur die mailto-Anfrage.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const ERCO = [
  { slug: 'erco-forstmaschinen', title: 'Forstmaschinen', desc: 'Professionelle Forstmaschinen für Profi-Forstbetriebe und kommunale Waldpflege.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/6be727a4a9c975b9b82717194468d62d77e2b54d-1920x1693.webp' },
  { slug: 'erco-gartengeraete', title: 'Gartengeräte', desc: 'Professionelle Gartengeräte für Gartenbauunternehmen und anspruchsvolle Privatkunden.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/baf323fb527f62bed47a68abb97482a7ecef4eb3-1280x800.webp' },
  { slug: 'erco-kleintraktoren', title: 'Kleintraktoren', desc: 'Wendige Kleintraktoren für Garten, Forst und kommunalen Einsatz.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/370e0cb340d46a28a4ec0007566316d9fcba6984-1920x1920.webp' },
  { slug: 'erco-anbaugeraete', title: 'Anbaugeräte & Zubehör', desc: 'Anbaugeräte und Zubehör für Erco-Maschinen — vielseitig erweiterbar für jede Aufgabe.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/045707c3aca2b911a73574443615c46e6fbebaf4-1800x1447.webp' },
]

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
  const client = createClient({
    projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
    apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
  })
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="erco"][0]{_id}`)
  if (!brand) throw new Error('Erco brand not found')

  console.log()
  for (const p of ERCO) {
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
      console.log(`✅ ${p.title.padEnd(28)} (${webp.length} bytes) → product-${p.slug}`)
    } catch (e) {
      console.error(`❌ ${p.title}: ${e.message}`)
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
