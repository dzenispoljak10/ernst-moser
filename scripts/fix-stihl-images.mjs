#!/usr/bin/env node
/**
 * Fix Stihl — echte Kategorie-Bilder von stihl.ch (og:image pro Kategorie).
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  Accept: 'image/*',
  Referer: 'https://www.stihl.ch/',
}

const STIHL = [
  { slug: 'stihl-kettensaegen', title: 'Kettensägen & Motorsägen', desc: 'Stihl Kettensägen — vom kompakten Astsäger bis zur Profi-Motorsäge für Forst und Holzschlag.', url: 'https://www.stihl.ch/de/c/kettensaegen-motorsaegen-98176', img: 'https://www.stihl.ch/content/dam/stihl/media/pim/50433.jpg' },
  { slug: 'stihl-freischneider-trimmer', title: 'Freischneider & Trimmer', desc: 'Motorsensen, Rasentrimmer und Freischneider für jedes Einsatzszenario — Benzin, Akku und Elektro.', url: 'https://www.stihl.ch/de/c/rasentrimmer-motorsensen-freischneider-98236', img: 'https://www.stihl.ch/content/dam/stihl/media/pim/118360.jpg' },
  { slug: 'stihl-heckenscheren', title: 'Heckenscheren', desc: 'Heckenscheren und Heckenschneider — präziser Schnitt, ergonomischer Griff, leise im Akku-Betrieb.', url: 'https://www.stihl.ch/de/c/heckenscheren-heckenschneider-98171', img: 'https://www.stihl.ch/content/dam/stihl/media/pim/53157.jpg' },
  { slug: 'stihl-laubblaeser', title: 'Laubbläser & Saughäcksler', desc: 'Laubbläser, Blasgeräte und Saughäcksler für Garten- und Anlagenpflege.', url: 'https://www.stihl.ch/de/c/laubblaeser-blasgeraete-saughaecksler-97976', img: 'https://www.stihl.ch/content/dam/stihl/media/pim/50079.jpg' },
  { slug: 'stihl-rasenmaeher', title: 'Rasenmäher', desc: 'Stihl Rasenmäher — Akku, Benzin oder Elektro für jeden Garten und jede Rasenfläche.', url: 'https://www.stihl.ch/de/c/rasenmaeher-97983', img: 'https://www.stihl.ch/content/dam/stihl/media/pim/105021.jpg' },
  { slug: 'stihl-akkusystem-ap', title: 'Akkusystem AP & Akkugeräte', desc: 'Profi-Akkusystem AP für 70+ Stihl-Geräte — emissionsfrei, leise und kompromisslos leistungsstark.', url: 'https://www.stihl.ch/de/professional/akku-loesungen', img: 'https://www.stihl.ch/content/dam/stihl/media/product-categories/tools-accessories/cordless-power-tools/batteries/batteries-ap-system/96581.jpg' },
]

async function downloadImage(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`)
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 1024) throw new Error(`tiny: ${buf.length}`)
  return buf
}

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
  const client = createClient({
    projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
    apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
  })
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="stihl"][0]{_id}`)
  if (!brand) throw new Error('Stihl brand not found')

  console.log()
  for (const p of STIHL) {
    const dir = path.join(ROOT, 'public', 'images', 'products', p.slug)
    const out = path.join(dir, 'main.webp')
    fs.mkdirSync(dir, { recursive: true })
    try {
      const raw = await downloadImage(p.img)
      const webp = await sharp(raw)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toBuffer()
      fs.writeFileSync(out, webp)

      const asset = await client.assets.upload('image', webp, { filename: `${p.slug}.webp` })
      await client.createOrReplace({
        _id: `product-${p.slug}`,
        _type: 'product',
        name: p.title,
        slug: { _type: 'slug', current: p.slug },
        brand: { _type: 'reference', _ref: brand._id },
        description: [
          { _type: 'block', _key: 'd1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: p.desc, marks: [] }] },
        ],
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      console.log(`✅ ${p.title.padEnd(34)} (${webp.length} bytes) → ${p.url.split('/').slice(-1)[0]}`)
    } catch (e) {
      console.error(`❌ ${p.title}: ${e.message}`)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
