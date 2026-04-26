#!/usr/bin/env node
/**
 * Download 6 Isuzu category hero images from isuzu.it CDN, resize to max
 * 2400 px width, encode as WebP 85 %, write to public/images/isuzu/.
 *
 * Run: node scripts/fetch-isuzu-category-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'isuzu')
fs.mkdirSync(OUT_DIR, { recursive: true })

const IMAGES = [
  {
    slug: 'dmax-single',
    url: 'https://www.isuzu.it/img/a0bf663e-5700-4164-b81f-527ed407dcc1/homepage-d-max-single.png?fm=webp&crop=2048%2C1152%2C0%2C0',
  },
  {
    slug: 'dmax-space',
    url: 'https://www.isuzu.it/img/a9c05ad2-cac1-4952-a7ff-c87edfac6a18/eu-lhd-ext-rbb-side-splash-white.png?fm=webp',
  },
  {
    slug: 'dmax-crew',
    url: 'https://www.isuzu.it/img/7b0d2de0-0665-4ec1-8935-cda52f2e0ac3/eu-lhd-crew-rbb-side-splash-white.png?fm=webp',
  },
  {
    slug: 'truck-3-5-ton',
    url: 'https://www.isuzu.it/img/74711a7c-91da-48f7-8962-3761fc52c335/m21-tt.png?fm=webp',
  },
  {
    slug: 'truck-6-7-5-ton',
    url: 'https://www.isuzu.it/img/15776d51-47df-4361-adcc-31afb2f48cf0/m30-crew.png?fm=webp',
  },
  {
    slug: 'truck-10-14-ton',
    url: 'https://www.isuzu.it/img/c2f8a2bd-0d2c-4ee7-8dc5-1b212ea5c749/f10.png?fm=webp',
  },
]

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  Referer: 'https://www.isuzu.ch/',
}

for (const { slug, url } of IMAGES) {
  const out = path.join(OUT_DIR, `${slug}.webp`)
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    console.error(`❌ ${slug}: HTTP ${res.status}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(out)
  const { size } = fs.statSync(out)
  console.log(`✅ ${slug.padEnd(18)} ${(size / 1024).toFixed(1).padStart(7)} KB  →  ${path.relative(process.cwd(), out)}`)
}
