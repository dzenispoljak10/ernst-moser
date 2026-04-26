#!/usr/bin/env node
/**
 * Ernst Moser GmbH – UT Aufbauten synchronisieren.
 *
 *   1. Lädt Produktbild + Hero von ut-ag.ch herunter
 *   2. Konvertiert nach WebP @ 85 %, max 1200 px Breite
 *   3. Produkte → public/images/products/<slug>/main.webp
 *      Hero    → public/images/brands/ut/hero.webp  (nur wenn FORCE_HERO=1)
 *   4. Uploadet Produkt-WebPs nach Sanity, legt Sanity-Produkte mit Brand-Ref UT an
 *   5. Löscht stale UT-Produkte, die nicht mehr im Katalog sind
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-ut-products.mjs
 *
 * Optional:
 *   SKIP_SANITY=1   → nur Bilder herunterladen/konvertieren
 *   FORCE_HERO=1    → vorhandenes hero.webp überschreiben
 *
 * Hinweis: Modell-Liste muss synchron mit src/lib/ut-catalog.ts gehalten werden.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const BASE = 'https://www.ut-ag.ch'

const HERO_SOURCE_URL = `${BASE}/dw/uploads/2025/06/home_parallax.webp`
const HERO_LOCAL_PATH = path.join(ROOT, 'public', 'images', 'brands', 'ut', 'hero.webp')

const MODELS = [
  { slug: 'ut-gigant-12t-comfort', title: 'Teleskop-Absetzkipper GIGANT 12T Comfort', shortDescription: 'Der Wendige für leichte Transporte mit geringem Kilometerpreis – ideal zum Stellen leerer Mulden und Transport leichter Wertstoffe.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Teleskop-Absetzkipper-GIGANT-12T-Comfort.jpg` },
  { slug: 'ut-gigant-260t', title: 'Teleskop-Absetzkipper GIGANT 260T', shortDescription: 'Für dreiachsige Lkw konzipiert – sicherer Transport schwer beladener Mulden mit patentierter FIX-Click Muldensicherung.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Teleskop-Absetzkipper-GIGANT-260T.jpg` },
  { slug: 'ut-gigant-180k', title: 'Knickarm-Absetzkipper GIGANT 180K', shortDescription: 'Standardmodell für Baustellen und Entsorgungswirtschaft – effizientes Auf- und Abladen von Mulden mit bis zu 18.000 kg Hebekraft.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Knickarm-Absetzkipper-GIGANT-180K.png` },
  { slug: 'ut-gigant-180tk-flat', title: 'Knickarm-Absetzkipper GIGANT 180T/K Flat', shortDescription: 'Flache Bauform mit Knickarm-Mechanismus für vielseitige Transportaufgaben mit optimierter Aerodynamik und Ladungssicherheit.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Knickarm-Absetzkipper-GIGANT-180TK-Flat.png` },
  { slug: 'ut-saurier-26tr-avanti', title: 'Haken-Abrollkipper SAURIER 4-Achser 26TR Avanti', shortDescription: 'Robuster 26-Tonnen-Abrollkipper mit bis zu 30 % schnellerem Auf- und Abkippen gegenüber Vorgängermodellen.', sourceImageUrl: `${BASE}/dw/uploads/2025/06/Haken-Abrollkipper-SAURIER-4-Achser-26TR-Avanti.jpg` },
  { slug: 'ut-saurier-32tr-varitec', title: 'Haken-Abrollkipper SAURIER 5-Achser 32TR Varitec', shortDescription: 'Schwerlast-Abrollkipper in 5-Achser-Ausführung mit 32 Tonnen Hebekraft – maximale Transportkapazität und Stabilität.', sourceImageUrl: `${BASE}/dw/uploads/2025/06/Haken-Abrollkipper-SAURIER-5-Achser-32TR.jpg` },
  { slug: 'ut-normalmulde-no', title: 'Normalmulde (NO)', shortDescription: 'Symmetrisch aufgebaute Schiffchenmulde – formstabil, robust, vielseitig einsetzbar für gemischte Transportaufgaben.', sourceImageUrl: `${BASE}/dw/uploads/2025/06/Normalmulde.png` },
  { slug: 'ut-schrottmulde-sr', title: 'Schrottmulde (SR)', shortDescription: 'Spezialisierte Mulde für Schrotthandling mit verstärkter Konstruktion – ideal für Recycling und Entsorgung.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Schrottmulde.png` },
  { slug: 'ut-bauschuttmulde-br-bf', title: 'Bauschuttmulde (BR/BF)', shortDescription: 'Robuste Mulde speziell für Bauschutt- und Abbruchtransporte – erhöhte Tragfähigkeit, verschleissfeste Ausführung.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Bauschuttmulde.png` },
  { slug: 'ut-abrollcontainer-klassisch', title: 'Abrollcontainer klassisch', shortDescription: 'Vielseitiger Container in HEAVY/MEDIUM/LIGHT – das innovative UT-Tunnelprofil garantiert hohe Formstabilität.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Abrollcontainer-klassisch.png` },
  { slug: 'ut-cobra-standard', title: 'COBRA Standard', shortDescription: 'Standardcontainer mit hohem Nutzen und vielseitigen Einsatzmöglichkeiten – effizient für Abfallwirtschaft und Logistik.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/COBRA-Standard.png` },
  { slug: 'ut-orca-spantenlos', title: 'ORCA spantenlose Abrollcontainer', shortDescription: 'Innovativ spantenlos konstruiert – optimierter Platzbedarf und verbesserte Ein- und Ausladevorgänge für maximale Effizienz.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Abrollcontainer-ORCA.png` },
  { slug: 'ut-presscontainer-absetzkipper', title: 'Presscontainer für Absetzkipper', shortDescription: 'Reduziert das Abfallvolumen um das 5- bis 10-fache – ideal für platzsparende Entsorgung auf kleineren Stellplätzen.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Presscontainer-fuer-Absetzkipper.jpg` },
  { slug: 'ut-presscontainer-abrollkipper', title: 'Presscontainer für Abrollkipper', shortDescription: 'Spezialisierter Presscontainer für Abrollkipper-Systeme – Volumenreduktion um das 5- bis 10-fache.', sourceImageUrl: `${BASE}/dw/uploads/2025/07/Presscontainer-fuer-Abrollkipper.jpg` },
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
      Referer: 'https://www.ut-ag.ch/',
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
    `*[_type=="brand" && slug.current=="ut"][0]{_id}`,
  )
  if (!brand) throw new Error('UT brand not found in Sanity')
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
    `*[_type=="product" && brand->slug.current=="ut" && !(slug.current in $keep)]._id`,
    { keep: keepSlugs },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`🗑  deleted stale ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale UT products to delete)')
}

async function main() {
  console.log(`\n📋 UT catalog: ${MODELS.length} Aufbauten\n`)

  // Hero
  try {
    const r = await ensureHero()
    console.log(`✅ UT Hero${r.fresh ? ' - heruntergeladen' : ' - bereits vorhanden (FORCE_HERO=1 zum Überschreiben)'}`)
  } catch (e) {
    console.error(`❌ UT Hero - ${e.message}`)
  }

  // Produkte
  for (const m of MODELS) {
    try {
      const r = await ensureLocalImage(m)
      console.log(
        `✅ ${m.title.padEnd(52)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden'}`,
      )
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(52)} - Bildfehler: ${e.message}`)
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
      console.log(`✅ ${m.title.padEnd(52)} → ${id}`)
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(52)}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
