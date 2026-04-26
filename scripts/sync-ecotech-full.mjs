#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Ecotech komplett crawlen + synchronisieren.
 *
 *   1. Lädt Logo von ecotech.at → public/images/brands/ecotech/logo.webp
 *   2. Crawlt /produkte/ und alle Kategorien-Seiten
 *   3. Extrahiert Produkte (ohne Sole-Produkte) inkl. Kategorie + og:image
 *   4. Lädt Bilder, konvertiert → public/images/products/<slug>/main.webp
 *   5. Schreibt JSON-Manifest → src/lib/ecotech-products.generated.json
 *   6. Sanity-Sync: Brand-Logo, Produkte (createOrReplace), Stale-Cleanup
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-ecotech-full.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const HOMEPAGE = 'https://www.ecotech.at'
const PRODUCTS_INDEX = 'https://www.ecotech.at/produkte/'
const LOGO_URL = 'https://www.ecotech.at/wp-content/themes/wp_ecotech/img/logo.svg'

const SOLE_RX = /sole|fertigsole|icefighter|backbag/i

// Kategorie-Slugs → menschenlesbare Bezeichnung (für Section-Titel)
const CATEGORY_LABELS = {
  'eco-grasabsaugungen': 'Grasabsaugungen',
  'eco-heckhydraulikaggregat': 'Heckhydraulikaggregate',
  'eco-kanalspuelgeraete': 'Kanalspülgeräte',
  'eco-kehrmaschinen': 'Kehrmaschinen',
  'eco-maehwerke': 'Mähwerke',
  'eco-multiwash-frontwaschbalken': 'Multiwash Frontwaschbalken',
  'eco-multiwash-giessarme': 'Multiwash Giessarme',
  'eco-multiwash-wassertanks': 'Multiwash Wassertanks',
  'eco-schneepfluege': 'Schneepflüge',
  'eco-streuer': 'Streuer',
  'eco-wildkrautbuersten': 'Wildkrautbürsten',
}

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'de-AT,de;q=0.9,en;q=0.8',
  Referer: HOMEPAGE + '/',
}

async function fetchHtml(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`)
  return r.text()
}

async function fetchImage(url) {
  const r = await fetch(url, { headers: { ...UA, Accept: 'image/*' }, redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`)
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 1024) throw new Error(`tiny: ${buf.length} bytes`)
  return buf
}

function deriveSlug(url) {
  // https://www.ecotech.at/produkt/ecotech-giessarm-ga3-2/ → ecotech-giessarm-ga3-2
  const m = url.match(/\/produkt\/([^/]+)\/?$/i)
  return m ? m[1] : null
}

async function crawl() {
  console.log('🛰  Crawl /produkte/ Kategorie-Seiten…')
  const productsByCategory = {} // catSlug → [{ url, slug }]
  const categoryOf = {} // slug → catSlug
  for (const [catSlug, label] of Object.entries(CATEGORY_LABELS)) {
    try {
      const url = `${HOMEPAGE}/kategorie/${catSlug}/`
      const html = await fetchHtml(url)
      const matches = [
        ...html.matchAll(/href="(https:\/\/www\.ecotech\.at\/produkt\/[^"]+)"/g),
      ].map((m) => m[1])
      const unique = [...new Set(matches)]
      productsByCategory[catSlug] = []
      for (const purl of unique) {
        const slug = deriveSlug(purl)
        if (!slug) continue
        if (SOLE_RX.test(slug)) continue
        if (!categoryOf[slug]) {
          categoryOf[slug] = catSlug
          productsByCategory[catSlug].push({ url: purl, slug })
        }
      }
      console.log(`   ✅ ${label.padEnd(36)} ${productsByCategory[catSlug].length} Produkte`)
    } catch (e) {
      console.error(`   ❌ ${catSlug}: ${e.message}`)
      productsByCategory[catSlug] = []
    }
  }
  return { productsByCategory, categoryOf }
}

async function fetchProductMeta(url) {
  const html = await fetchHtml(url)
  // Title from <title> or og:title
  const title =
    html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1] ??
    html.match(/<title>([^<|]+)/i)?.[1]?.trim() ??
    null
  // og:image → primary
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1]
  // Fallback: first wp-content/uploads jpg/png
  const fallback = html.match(/https:\/\/www\.ecotech\.at\/wp-content\/uploads\/[^"' ]+\.(?:jpg|jpeg|png)/i)?.[0]
  const image = og && !og.includes('logo') ? og : fallback
  // Description: meta description
  const desc =
    html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ??
    html.match(/<meta property="og:description" content="([^"]+)"/i)?.[1] ??
    null
  return { title, image, desc }
}

async function ensureLocalImage(slug, sourceUrl) {
  const dir = path.join(ROOT, 'public', 'images', 'products', slug)
  const out = path.join(dir, 'main.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && fs.statSync(out).size > 1024) {
    return { fresh: false, path: out }
  }
  const raw = await fetchImage(sourceUrl)
  const webp = await sharp(raw)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return { fresh: true, path: out }
}

async function ensureLogo() {
  const dir = path.join(ROOT, 'public', 'images', 'brands', 'ecotech')
  const out = path.join(dir, 'logo.webp')
  fs.mkdirSync(dir, { recursive: true })
  // SVG → rasterize via sharp into a square 512×512 white-bg WebP
  const buf = await fetchImage(LOGO_URL)
  const webp = await sharp(buf, { density: 300 })
    .resize({ width: 512, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .webp({ quality: 90 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return out
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

  // ── Logo ──────────────────────────────────────────────────────────────────
  console.log('\n🎨 Logo')
  try {
    const p = await ensureLogo()
    console.log(`   ✅ Logo → ${path.relative(ROOT, p)}`)
  } catch (e) {
    console.error(`   ❌ Logo: ${e.message}`)
  }

  // ── Crawl ─────────────────────────────────────────────────────────────────
  console.log()
  const { productsByCategory, categoryOf } = await crawl()
  const totalSlugs = Object.values(productsByCategory).flat().length
  console.log(`\n📋 Total: ${totalSlugs} Produkte (Sole-Produkte ausgeschlossen)\n`)

  // ── Per-product fetch + image + meta ─────────────────────────────────────
  const manifest = []
  for (const [catSlug, items] of Object.entries(productsByCategory)) {
    for (const { url, slug } of items) {
      try {
        const meta = await fetchProductMeta(url)
        if (!meta.image) {
          console.error(`   ❌ ${slug.padEnd(50)} - kein Bild gefunden`)
          continue
        }
        const r = await ensureLocalImage(slug, meta.image)
        const niceTitle = (meta.title ?? slug).replace(/^Ecotech\s+/i, 'Ecotech ').replace(/\s*[-–|]\s*Ecotech.*/i, '').trim()
        manifest.push({
          slug,
          title: niceTitle || slug,
          shortDescription: meta.desc?.slice(0, 200) ?? '',
          category: catSlug,
          categoryLabel: CATEGORY_LABELS[catSlug],
          externalUrl: url,
          sourceImageUrl: meta.image,
        })
        console.log(
          `   ✅ ${niceTitle.padEnd(50)} ${r.fresh ? '(heruntergeladen)' : '(bereits vorhanden)'}`,
        )
      } catch (e) {
        console.error(`   ❌ ${slug.padEnd(50)} - ${e.message}`)
      }
    }
  }

  // ── Manifest schreiben (für Catalog-Update) ──────────────────────────────
  const manifestPath = path.join(ROOT, 'src', 'lib', 'ecotech-products.generated.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\n📝 Manifest → ${path.relative(ROOT, manifestPath)} (${manifest.length} Produkte)\n`)

  // ── Sanity-Brand: Logo + Stale-Cleanup + Produkte ────────────────────────
  console.log('🛰  Sanity sync…\n')
  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="ecotech"][0]{_id}`,
  )
  if (!brand) throw new Error('Ecotech brand not found in Sanity')
  const brandId = brand._id

  // Logo upload + reference
  try {
    const logoBuf = fs.readFileSync(path.join(ROOT, 'public', 'images', 'brands', 'ecotech', 'logo.webp'))
    const logoAsset = await client.assets.upload('image', logoBuf, { filename: 'ecotech-logo.webp' })
    await client.patch(brandId).set({ logo: { _type: 'image', asset: { _type: 'reference', _ref: logoAsset._id } } }).commit()
    console.log(`   ✅ Brand-Logo aktualisiert`)
  } catch (e) {
    console.error(`   ❌ Logo upload: ${e.message}`)
  }

  // Stale cleanup
  const keepSlugs = manifest.map((p) => p.slug)
  const staleIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="ecotech" && !(slug.current in $keep)]._id`,
    { keep: keepSlugs },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`   🗑  deleted ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale Ecotech products)')

  // Produkte sync
  console.log()
  for (const p of manifest) {
    try {
      const localPath = path.join(ROOT, 'public', 'images', 'products', p.slug, 'main.webp')
      const buf = fs.readFileSync(localPath)
      const asset = await client.assets.upload('image', buf, { filename: `${p.slug}.webp` })
      await client.createOrReplace({
        _id: `product-${p.slug}`,
        _type: 'product',
        name: p.title,
        slug: { _type: 'slug', current: p.slug },
        brand: { _type: 'reference', _ref: brandId },
        description: [
          {
            _type: 'block',
            _key: 'desc1',
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: 's1', text: p.shortDescription, marks: [] }],
          },
        ],
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      console.log(`   ✅ ${p.title.padEnd(50)} → product-${p.slug}`)
    } catch (e) {
      console.error(`   ❌ ${p.title}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
