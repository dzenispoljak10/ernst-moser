#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Scania Baureihen synchronisieren.
 *
 *   1. Lädt das offizielle Scania-Hero-Bild jeder Baureihe herunter
 *   2. Konvertiert nach WebP @ 85 %, max 1200 px Breite
 *   3. Speichert lokal unter public/images/products/scania-<slug>/main.webp
 *   4. Uploadet das WebP-Asset nach Sanity
 *   5. Legt das Sanity-Produkt mit Brand-Ref Scania an / aktualisiert es
 *   6. Löscht stale Scania-Produkte, die nicht mehr im Katalog sind
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-scania-products.mjs
 *
 * Optional:
 *   SKIP_SANITY=1 node ...   → nur Bilder herunterladen/konvertieren
 *
 * Hinweis: Modell-Liste muss synchron mit src/lib/scania-catalog.ts gehalten
 * werden (Slugs, Quell-URLs).
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const BASE = 'https://www.scania.com'

const MODELS = [
  {
    slug: 'scania-l-baureihe',
    title: 'Scania L-Baureihe',
    shortDescription:
      'Niedrige Einstiegshöhe und beste Sicht – ideal für urbane Verteilung, Kommunaldienste und enge Stadtmanöver.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/l-series/_jcr_content/root/responsivegrid/responsivegrid/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1687257082209/19108-031.jpeg`,
  },
  {
    slug: 'scania-p-baureihe',
    title: 'Scania P-Baureihe',
    shortDescription:
      'Vielseitiger Allrounder für Stadt-, Regional- und anspruchsvolle Geländeeinsätze – zuverlässig auf allen Streckentypen.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/p-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1658383790893/20091-011.jpeg`,
  },
  {
    slug: 'scania-g-baureihe',
    title: 'Scania G-Baureihe',
    shortDescription:
      'Komfort trifft Eleganz – großzügiges Fahrerhaus mit umfangreichem Stauraum, das ideale Allroundtalent für mittelschwere Anwendungen.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/g-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1635412314936/19246-001.jpeg`,
  },
  {
    slug: 'scania-r-baureihe',
    title: 'Scania R-Baureihe',
    shortDescription:
      'Premium-Fernverkehr mit charakteristisch robustem Design – die erste Wahl für professionelle Langstrecke und schwere Lasten.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/r-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1672325508517/19280-059.jpeg`,
  },
  {
    slug: 'scania-s-baureihe',
    title: 'Scania S-Baureihe',
    shortDescription:
      'Premium-Fernverkehr mit flachem Boden und luxuriöser Innenausstattung – maximaler Komfort und Effizienz auf langen Strecken.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/s-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1672325529118/20118-026.jpeg`,
  },
  {
    slug: 'scania-xt',
    title: 'Scania XT',
    shortDescription:
      'Gebaut für wechselhafte Bedingungen und schwieriges Gelände – der robuste Offroad- und Baustellen-LKW.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/xt/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_copy/heroimage.coreimg.85.1920.jpeg/1635412280442/20190-026.jpeg`,
  },
  {
    slug: 'scania-super',
    title: 'Scania Super (V8)',
    shortDescription:
      'Hocheffizienz-Antriebsstrang mit V8-Power – Spitzenleistung, Premium-Drehmoment, ikonischer Sound.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/trucks/v8/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_copy/heroimage.coreimg.85.1920.jpeg/1724239683418/v8-hero.jpeg`,
  },
  {
    slug: 'scania-batteriebetrieben',
    title: 'Scania Batteriebetrieben',
    shortDescription:
      'Vollelektrisch, lokal emissionsfrei – die nachhaltige Lkw-Lösung für urbane und regionale Transporte.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/emobility/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid/responsivegrid_copy/responsivegrid_459490170/responsivegrid_1772426439/heroimage.coreimg.85.1920.jpeg/1711552232887/23166-067.jpeg`,
  },
  {
    slug: 'scania-gasmotor',
    title: 'Scania Gasmotor',
    shortDescription:
      'CNG- und LNG-Lkw mit Reihensechszylinder – die wirtschaftliche und CO₂-arme Alternative für Fern- und Verteilverkehr.',
    sourceImageUrl: `${BASE}/content/www/ch/de/home/products/attributes/alternative-fuels/_jcr_content/root/responsivegrid/responsivegrid_copy_/responsivegrid/heroimage.coreimg.85.1920.jpeg/1625146344720/19113-018.jpeg`,
  },
  {
    slug: 'scania-schwerlastzugmaschine',
    title: 'Scania Schwerlastzugmaschine',
    shortDescription:
      'Konfigurierte Schwerlast- und Sondertransport-Lkw mit V8-Power – für Gewichte jenseits der Standard-Klassen.',
    sourceImageUrl: `${BASE}/content/dam/group/products-and-services/trucks/r-series/16122-057.jpg`,
  },
]

const SKIP_SANITY = process.env.SKIP_SANITY === '1'

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
      Referer: 'https://www.scania.com/',
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

async function ensureBrand() {
  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="scania"][0]{_id}`,
  )
  if (!brand) throw new Error('Scania brand not found in Sanity')
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
    `*[_type=="product" && brand->slug.current=="scania" && !(slug.current in $keep)]._id`,
    { keep: keepSlugs },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`🗑  deleted stale ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale Scania products to delete)')
}

async function main() {
  console.log(`\n📋 Scania catalog: ${MODELS.length} Baureihen\n`)

  for (const m of MODELS) {
    try {
      const r = await ensureLocalImage(m)
      console.log(
        `✅ ${m.title.padEnd(34)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden'}`,
      )
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(34)} - Bildfehler: ${e.message}`)
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
      console.log(`✅ ${m.title.padEnd(34)} → ${id}`)
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(34)}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
