#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Hilltip Winterdienst-Kategorien synchronisieren.
 *
 *   1. Lädt Kategorie- und Hero-Bilder von hilltip.com herunter
 *   2. Konvertiert nach WebP @ 85 %, max 1200 px Breite
 *   3. Produkte → public/images/products/<slug>/main.webp
 *      Hero    → public/images/brands/hilltip/hero.webp  (nur wenn FORCE_HERO=1)
 *   4. Uploadet Produkt-WebPs nach Sanity, legt 3 Sanity-Produkte an
 *   5. Löscht stale Hilltip-Produkte, die nicht mehr im Katalog sind
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-hilltip-products.mjs
 *
 * Optional:
 *   SKIP_SANITY=1   → nur Bilder herunterladen/konvertieren
 *   FORCE_HERO=1    → vorhandenes hero.webp überschreiben
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const HERO_SOURCE_URL = 'https://www.hilltip.com/site/wp-content/uploads/2017/01/1.jpg'
const HERO_LOCAL_PATH = path.join(ROOT, 'public', 'images', 'brands', 'hilltip', 'hero.webp')

const MODELS = [
  {
    slug: 'hilltip-pickups',
    title: 'Pickups & Leichtfahrzeuge',
    shortDescription:
      'Streugeräte und Schneepflüge für Pickups und leichte Transporter – kompakte, präzise Winterdienst-Lösungen.',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2024/07/pickup-sand-salt-spreader-combi-salt-spreader-saltspridare-lautashiekoitin-salzstreuer-winterdienst-saleuses-elektryczna-posypywarka-23.jpg',
  },
  {
    slug: 'hilltip-leichte-lkw',
    title: 'Leichte LKW',
    shortDescription:
      'Winterdienstlösungen für mittlere Fahrzeuge – modulare IceStriker™ Streuer mit dualen Behältern und optionalen Sprühsystemen.',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2023/05/truck-salt-spreader-sandspridare-sirotinautomaatti-aufbaustreuer-saleuse-pour-camion-posypywarka-esparcidor-de-sal-para-camionetas-4-1.jpg',
  },
  {
    slug: 'hilltip-schwere-lkw',
    title: 'Schwere LKW',
    shortDescription:
      'Professionelle Winterdienstlösungen für schwere Fahrzeuge – IceStriker™ Truck und LION Highway-Streuer für höchste Streukapazitäten.',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2017/01/IceStriker-7000-spreader.jpg',
  },
]

const SKIP_SANITY = process.env.SKIP_SANITY === '1'
const FORCE_HERO = process.env.FORCE_HERO === '1'

let client = null
if (!SKIP_SANITY) {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN (or pass SKIP_SANITY=1 to skip Sanity sync)')
    process.exit(1)
  }
  client = createClient({
    projectId: 'owqsc1ph',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
  })
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'image/jpeg,image/png,image/webp,image/*',
      Referer: 'https://www.hilltip.com/',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`suspiciously small image: ${buf.length} bytes`)
  return buf
}

async function ensureLocalImage(model) {
  const dir = path.join(ROOT, 'public', 'images', 'products', model.slug)
  const out = path.join(dir, 'main.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && fs.statSync(out).size > 1024) {
    return { path: out, fresh: false }
  }
  const raw = await downloadImage(model.sourceImageUrl)
  const webp = await sharp(raw)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return { path: out, fresh: true }
}

async function ensureHero() {
  fs.mkdirSync(path.dirname(HERO_LOCAL_PATH), { recursive: true })
  if (fs.existsSync(HERO_LOCAL_PATH) && !FORCE_HERO) {
    return { fresh: false }
  }
  const raw = await downloadImage(HERO_SOURCE_URL)
  const webp = await sharp(raw)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(HERO_LOCAL_PATH, webp)
  return { fresh: true }
}

async function ensureBrand() {
  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="hilltip"][0]{_id}`,
  )
  if (!brand) throw new Error('Hilltip brand not found in Sanity')
  return brand._id
}

async function uploadToSanity(filepath, slug) {
  const buf = fs.readFileSync(filepath)
  const asset = await client.assets.upload('image', buf, { filename: `${slug}.webp` })
  return asset._id
}

async function ensureProduct(brandId, model) {
  const productId = `product-${model.slug}`
  const assetId = await uploadToSanity(
    path.join(ROOT, 'public', 'images', 'products', model.slug, 'main.webp'),
    model.slug,
  )
  await client.createOrReplace({
    _id: productId,
    _type: 'product',
    name: model.title,
    slug: { _type: 'slug', current: model.slug },
    brand: { _type: 'reference', _ref: brandId },
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: 's1', text: model.shortDescription, marks: [] },
        ],
      },
    ],
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  })
  return productId
}

async function deleteStale(keepSlugs) {
  const staleIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="hilltip" && !(slug.current in $keep)]._id`,
    { keep: keepSlugs },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`🗑  deleted stale ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale Hilltip products to delete)')
}

async function main() {
  console.log(`\n📋 Hilltip catalog: ${MODELS.length} Kategorien\n`)

  // Hero
  try {
    const r = await ensureHero()
    console.log(`✅ Hilltip Hero${r.fresh ? ' - heruntergeladen' : ' - bereits vorhanden (FORCE_HERO=1 zum Überschreiben)'}`)
  } catch (e) {
    console.error(`❌ Hilltip Hero - ${e.message}`)
  }

  // Kategorien
  for (const m of MODELS) {
    try {
      const r = await ensureLocalImage(m)
      console.log(
        `✅ Hilltip ${m.title.padEnd(30)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden'}`,
      )
    } catch (e) {
      console.error(`❌ Hilltip ${m.title.padEnd(30)} - Bildfehler: ${e.message}`)
    }
  }

  if (SKIP_SANITY) {
    console.log('\n(SKIP_SANITY=1, Sanity-Sync übersprungen)\n')
    return
  }

  console.log('\n🛰  Sanity sync…\n')
  const brandId = await ensureBrand()
  console.log(`Brand: ${brandId}\n`)

  await deleteStale(MODELS.map((m) => m.slug))
  console.log()

  for (const m of MODELS) {
    try {
      const id = await ensureProduct(brandId, m)
      console.log(`✅ Hilltip ${m.title.padEnd(30)} → ${id}`)
    } catch (e) {
      console.error(`❌ Hilltip ${m.title.padEnd(30)}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
