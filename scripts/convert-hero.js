#!/usr/bin/env node
/**
 * Download (or read local) Fiat hero image, convert to WebP 85 %, save to
 * public/images/fiat/hero-natural-born-workers.webp.
 *
 * Usage:
 *   node scripts/convert-hero.js                  # tries to fetch from fiat.ch
 *   node scripts/convert-hero.js --file PATH      # uses a locally saved jpg/png
 *
 * Note: fiat.ch is protected by Akamai Bot Manager and will reject plain
 * server-side requests (HTTP 403). If the direct download fails, save the
 * image manually in a browser from
 *   https://www.fiat.ch/content/dam/fiat2023/ch/professional/hp-slider/natural-born-workers/mobile.jpg/jcr:content/renditions/desktop.jpg
 * and re-run with --file <path>.
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const URL = 'https://www.fiat.ch/content/dam/fiat2023/ch/professional/hp-slider/natural-born-workers/mobile.jpg/jcr:content/renditions/desktop.jpg'
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'fiat')
const OUT_PATH = path.join(OUT_DIR, 'hero-natural-born-workers.webp')

fs.mkdirSync(OUT_DIR, { recursive: true })

async function getBuffer() {
  const fileFlagIdx = process.argv.indexOf('--file')
  if (fileFlagIdx !== -1) {
    const p = process.argv[fileFlagIdx + 1]
    if (!p) throw new Error('--file requires a path argument')
    return fs.readFileSync(p)
  }
  const res = await fetch(URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      Referer: 'https://www.fiat.ch/de/professional',
    },
  })
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} from fiat.ch. Save the image manually from the URL and re-run with --file <path>.`,
    )
  }
  return Buffer.from(await res.arrayBuffer())
}

;(async () => {
  const buf = await getBuffer()
  await sharp(buf).webp({ quality: 85 }).toFile(OUT_PATH)
  const stat = fs.statSync(OUT_PATH)
  console.log(`Saved: ${OUT_PATH} (${(stat.size / 1024).toFixed(1)} KB)`)
})().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
