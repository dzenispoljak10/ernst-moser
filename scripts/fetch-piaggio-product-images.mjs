#!/usr/bin/env node
/**
 * Download 6 Piaggio model hero images from images.piaggio.com,
 * re-encode to WebP 85 %, write under public/images/products/piaggio-<slug>/main.webp,
 * clean up legacy short-slug folders, purge the Next image-optimizer cache.
 *
 * Run: node scripts/fetch-piaggio-product-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PRODUCTS_DIR = path.join(ROOT, 'public', 'images', 'products')

const IMAGES = [
  {
    slug: 'piaggio-porter-np6-chassis-einzelbereifung',
    url: 'https://images.piaggio.com/np6/vehicles/vcsk0000/vcsk0000/vcsk0000-01-m.png',
  },
  {
    slug: 'piaggio-porter-np6-chassis-zwillingsbereifung',
    url: 'https://images.piaggio.com/np6/vehicles/vctp0000/vctp0000/vctp0000-01-m.png',
  },
  {
    slug: 'piaggio-porter-npe-chassis-einzelbereifung',
    url: 'https://images.piaggio.com/np6/vehicles/ecs90000/ecs90000/ecs90000-01-m.png',
  },
  {
    slug: 'piaggio-porter-npe-pritsche-einzelbereifung',
    url: 'https://images.piaggio.com/np6/vehicles/eps80000/eps80000/eps8000-01-m.png',
  },
  {
    slug: 'piaggio-porter-npe-heckkipper-einzelbereifung',
    url: 'https://images.piaggio.com/np6/vehicles/etsp0000/etsp0000/etsp0000-01-m.png',
  },
  {
    slug: 'piaggio-porter-npe-heckkipper-grasfanggitter',
    url: 'https://images.piaggio.com/np6/vehicles/eos20000/eos20000/eos2000-01-m.png',
  },
]

// Folders created in the prior run with short slugs — remove after the new
// full-word slug folders are in place.
const LEGACY_SLUGS = [
  'piaggio-porter-np6-chassis-einzel',
  'piaggio-porter-np6-chassis-zwilling',
  'piaggio-porter-npe-chassis-einzel',
  'piaggio-porter-npe-pritsche',
  'piaggio-porter-npe-heckkipper',
  'piaggio-porter-npe-heckkipper-gras',
]

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  Referer: 'https://commercial.piaggio.com/',
}

for (const { slug, url } of IMAGES) {
  const dir = path.join(PRODUCTS_DIR, slug)
  fs.mkdirSync(dir, { recursive: true })
  const out = path.join(dir, 'main.webp')
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) {
      console.error(`❌ ${slug}: HTTP ${res.status} on ${url}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(out)
    const { size } = fs.statSync(out)
    console.log(`✅ ${slug.padEnd(50)} ${(size / 1024).toFixed(1).padStart(7)} KB`)
  } catch (err) {
    console.error(`❌ ${slug}: ${err.message}`)
  }
}

// Clean up legacy short-slug folders.
for (const s of LEGACY_SLUGS) {
  const p = path.join(PRODUCTS_DIR, s)
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true })
    console.log(`🗑  removed legacy ${s}`)
  }
}

// Purge Next.js image-optimizer caches so replaced URLs serve fresh bytes.
for (const cacheDir of [
  path.join(ROOT, '.next', 'dev', 'cache', 'images'),
  path.join(ROOT, '.next', 'cache', 'images'),
]) {
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true })
    console.log(`🧹 cleared ${path.relative(process.cwd(), cacheDir)}`)
  }
}
console.log('ℹ  Dev-Server neustarten, damit der In-Memory-Image-Cache flushed.')
