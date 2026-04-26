#!/usr/bin/env node
/**
 * Motorgerätecenter Sync — Pudu (neue Roboter), Segway Navimow, Stihl (6 Kategorien).
 *
 *   1. Versucht Bilder von Hersteller-Sites herunterzuladen
 *   2. Fallback: Kopiert vorhandenes Pudu/Segway/Stihl-Bild
 *   3. Sanity: Stale-Cleanup, Produkte create/replace
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
  Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
}

async function tryFetchImage(url) {
  if (!url) return null
  try {
    const r = await fetch(url, { headers: UA, redirect: 'follow' })
    if (!r.ok) return null
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 1024) return null
    return buf
  } catch {
    return null
  }
}

async function ensureProductImage({ slug, sourceUrl, fallbackPath }) {
  const dir = path.join(ROOT, 'public', 'images', 'products', slug)
  const out = path.join(dir, 'main.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && fs.statSync(out).size > 1024) {
    return { fresh: false, path: out, fallback: false }
  }
  const raw = await tryFetchImage(sourceUrl)
  if (raw) {
    const webp = await sharp(raw)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer()
    fs.writeFileSync(out, webp)
    return { fresh: true, path: out, fallback: false }
  }
  // fallback: copy existing
  if (fallbackPath && fs.existsSync(fallbackPath)) {
    fs.copyFileSync(fallbackPath, out)
    return { fresh: true, path: out, fallback: true }
  }
  throw new Error(`no source for ${slug}`)
}

const TASKS = [
  // Pudu — neue Roboter (bestehende werden nicht angefasst)
  { brand: 'pudu-robotics', slug: 'pudu-bellabot', title: 'BellaBot', desc: 'Cat-themed Service-Roboter — der ikonische Lieferroboter für Restaurants und Cafés.', src: 'https://www.pudurobotics.com/cdn-pudu/cw/products/bellabot-hero.jpg' },
  { brand: 'pudu-robotics', slug: 'pudu-bellabot-pro', title: 'BellaBot Pro', desc: 'Premium-Variante des BellaBot mit erweiterter KI und neuem Design.', src: 'https://www.pudurobotics.com/cdn-pudu/cw/products/bellabotpro-hero.jpg' },
  { brand: 'pudu-robotics', slug: 'pudu-kettybot', title: 'KettyBot', desc: 'Kompakter Begrüssungs- und Lieferroboter mit Werbe-Display für Gastronomie und Retail.', src: 'https://www.pudurobotics.com/cdn-pudu/cw/products/kettybot-hero.jpg' },
  { brand: 'pudu-robotics', slug: 'pudu-pudubot', title: 'PuduBot', desc: 'Klassischer Service-Roboter — bewährte Plattform für vielseitige Liefer-Anwendungen.', src: 'https://www.pudurobotics.com/cdn-pudu/cw/products/pudubot-hero.jpg' },
  { brand: 'pudu-robotics', slug: 'pudu-flashbot', title: 'FlashBot', desc: 'Hotel-Lieferroboter mit Aufzugsanbindung — autonom durch alle Etagen.', src: 'https://www.pudurobotics.com/cdn-pudu/cw/products/flashbot-hero.jpg' },

  // Stihl — 6 Kategorien (ersetzt die 2 bestehenden generischen Produkte)
  { brand: 'stihl', slug: 'stihl-kettensaegen', title: 'Kettensägen & Motorsägen', desc: 'Stihl Kettensägen — vom kompakten Astsäger bis zur Profi-Motorsäge für Forst und Holzschlag.' },
  { brand: 'stihl', slug: 'stihl-freischneider-trimmer', title: 'Freischneider & Trimmer', desc: 'Motorsensen, Rasentrimmer und Freischneider für jedes Einsatzszenario — Benzin, Akku und Elektro.' },
  { brand: 'stihl', slug: 'stihl-heckenscheren', title: 'Heckenscheren', desc: 'Heckenscheren und Heckenschneider — präziser Schnitt, ergonomischer Griff, leise im Akku-Betrieb.' },
  { brand: 'stihl', slug: 'stihl-laubblaeser', title: 'Laubbläser & Saughäcksler', desc: 'Laubbläser, Blasgeräte und Saughäcksler für Garten- und Anlagenpflege.' },
  { brand: 'stihl', slug: 'stihl-rasenmaeher', title: 'Rasenmäher', desc: 'Stihl Rasenmäher — Akku, Benzin oder Elektro für jeden Garten und jede Rasenfläche.' },
  { brand: 'stihl', slug: 'stihl-akkusystem-ap', title: 'Akkusystem AP & Akkugeräte', desc: 'Profi-Akkusystem AP für 70+ Stihl-Geräte — emissionsfrei, leise und kompromisslos leistungsstark.' },
]

const FALLBACKS = {
  'pudu-robotics': path.join(ROOT, 'public', 'images', 'products', 'pudu-robotics-pudu-cc1', 'main.webp'),
  segway: path.join(ROOT, 'public', 'images', 'brands', 'segway', 'hero.webp'),
  stihl: path.join(ROOT, 'public', 'images', 'brands', 'stihl', 'hero.webp'),
}

async function main() {
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

  // Stage images
  console.log()
  for (const t of TASKS) {
    try {
      const r = await ensureProductImage({
        slug: t.slug,
        sourceUrl: t.src,
        fallbackPath: FALLBACKS[t.brand],
      })
      const note = r.fallback ? '(Fallback-Bild)' : (r.fresh ? '(heruntergeladen)' : '(bereits vorhanden)')
      console.log(`✅ ${t.title.padEnd(32)} ${note}`)
    } catch (e) {
      console.error(`❌ ${t.title.padEnd(32)} - ${e.message}`)
    }
  }

  // Sanity Sync
  console.log('\n🛰  Sanity sync…\n')
  const brandIds = {}
  for (const slug of ['pudu-robotics', 'segway', 'stihl']) {
    const b = await client.fetch(`*[_type=="brand" && slug.current==$slug][0]{_id}`, { slug })
    if (b) brandIds[slug] = b._id
  }

  // Stihl: cleanup stale (drop the old 2 Akkurasenmäher / Motorsägen)
  const stihlKeep = TASKS.filter((t) => t.brand === 'stihl').map((t) => t.slug)
  const stihlStale = await client.fetch(
    `*[_type=="product" && brand->slug.current=="stihl" && !(slug.current in $keep)]._id`,
    { keep: stihlKeep },
  )
  for (const id of stihlStale) {
    await client.delete(id)
    console.log(`🗑  Stihl stale: deleted ${id}`)
  }

  // Pudu: cleanup the generic 2 products (industrielle-lieferroboter, kommerzielle-reinigungsroboter)
  const PUDU_GENERIC_SLUGS = [
    'pudu-robotics-industrielle-lieferroboter',
    'pudu-robotics-kommerzielle-reinigungsroboter',
  ]
  for (const slug of PUDU_GENERIC_SLUGS) {
    const id = `product-${slug}`
    try {
      await client.delete(id)
      console.log(`🗑  Pudu generic: deleted ${id}`)
    } catch {
      /* not present */
    }
  }

  // Create products
  for (const t of TASKS) {
    const productId = `product-${t.slug}`
    try {
      const localPath = path.join(ROOT, 'public', 'images', 'products', t.slug, 'main.webp')
      if (!fs.existsSync(localPath)) throw new Error('image missing')
      const buf = fs.readFileSync(localPath)
      const asset = await client.assets.upload('image', buf, { filename: `${t.slug}.webp` })
      await client.createOrReplace({
        _id: productId,
        _type: 'product',
        name: t.title,
        slug: { _type: 'slug', current: t.slug },
        brand: { _type: 'reference', _ref: brandIds[t.brand] },
        description: [
          { _type: 'block', _key: 'd1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: t.desc, marks: [] }] },
        ],
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      console.log(`✅ ${t.title.padEnd(32)} → ${productId}`)
    } catch (e) {
      console.error(`❌ ${t.title.padEnd(32)}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
