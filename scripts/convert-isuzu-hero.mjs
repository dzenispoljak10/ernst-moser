#!/usr/bin/env node
/**
 * Download the Isuzu hero image, re-encode to WebP 85 %, save to
 * public/images/isuzu/hero-steering-wheel.webp.
 *
 * Uses Node's built-in fetch (cleaner redirect/TLS handling than https.get).
 *
 * Usage: node scripts/convert-isuzu-hero.mjs
 */

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const URL = 'https://www.isuzu.it/img/ae172d84-6a53-4422-a378-f4cdc3807d1b/steering-wheel-lhd-rbe-leather-eps-4x4-screen.jpg?fm=webp&crop=3000%2C1688%2C0%2C0'
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'isuzu')
const OUT_PATH = path.join(OUT_DIR, 'hero-steering-wheel.webp')

fs.mkdirSync(OUT_DIR, { recursive: true })

const res = await fetch(URL, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    Referer: 'https://www.isuzu.it/',
  },
})
if (!res.ok) {
  console.error(`HTTP ${res.status} from isuzu.it`)
  process.exit(1)
}
const buf = Buffer.from(await res.arrayBuffer())
await sharp(buf)
  .resize({ width: 2400, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(OUT_PATH)
const { size } = fs.statSync(OUT_PATH)
console.log(`Saved: ${OUT_PATH} (${(size / 1024).toFixed(1)} KB)`)
