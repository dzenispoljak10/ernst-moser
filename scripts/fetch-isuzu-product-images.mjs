#!/usr/bin/env node
/**
 * Download the 6 Isuzu model hero images supplied by the user, resize to
 * max 2400 px width, WebP 85 %, write to public/images/isuzu/.
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
    filename: 'd-max-single.webp',
    url: 'https://www.isuzu.it/img/a0bf663e-5700-4164-b81f-527ed407dcc1/homepage-d-max-single.png?fm=webp&crop=2048%2C1152%2C0%2C0',
  },
  {
    filename: 'd-max-space.webp',
    url: 'https://www.isuzu.it/img/8790cfa5-13fb-48af-b082-80ecef604124/homepage-space-isuzu.png?fm=webp&crop=3840%2C2160%2C0%2C0',
  },
  {
    filename: 'd-max-crew.webp',
    url: 'https://www.isuzu.it/img/ecb11c84-c870-46ff-b938-887f4d5f2946/homepage-crew-isuzu.png?fm=webp&crop=3840%2C2160%2C0%2C0',
  },
  {
    filename: 'truck-3-5-ton.webp',
    url: 'https://www.isuzu.it/img/59e360de-706c-4023-86be-16e5988450c2/e201448f-18a4-465f-8471-f6d75c72d353.jpg?fm=webp&crop=2066%2C1164%2C0%2C0',
  },
  {
    filename: 'truck-6-7-5-ton.webp',
    url: 'https://www.isuzu.it/img/970b56d0-45e5-422e-b1a7-fb14abfc742d/isuzu-m29-front-cover.jpg?fm=webp&crop=1812%2C1017%2C0%2C1208',
  },
  {
    filename: 'truck-10-14-ton.webp',
    url: 'https://www.isuzu.it/img/18fa0ae2-09a8-4379-b713-afd1e5747806/isuzu-serie-f-frontale-cover.jpg?fm=webp&crop=2522%2C1415%2C0%2C1641',
  },
]

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  Referer: 'https://www.isuzu.ch/',
}

for (const { filename, url } of IMAGES) {
  const out = path.join(OUT_DIR, filename)
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    console.error(`❌ ${filename}: HTTP ${res.status}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(out)
  const { size } = fs.statSync(out)
  console.log(`✅ ${filename.padEnd(22)} ${(size / 1024).toFixed(1).padStart(7)} KB`)
}

// Clean up previous naming variant.
for (const stale of ['dmax-single.webp', 'dmax-space.webp', 'dmax-crew.webp']) {
  const p = path.join(OUT_DIR, stale)
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log(`🗑  removed ${stale}`)
  }
}

// Invalidate Next.js image optimizer cache — otherwise derivatives from
// previous runs at the same URL+width stay in place and the old image
// keeps rendering. Next keys the cache on URL, not file mtime.
for (const cacheDir of [
  path.join(__dirname, '..', '.next', 'dev', 'cache', 'images'),
  path.join(__dirname, '..', '.next', 'cache', 'images'),
]) {
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true })
    console.log(`🧹 cleared ${path.relative(process.cwd(), cacheDir)}`)
  }
}
console.log('ℹ  Dev-Server neustarten, damit der In-Memory-Image-Cache ebenfalls flushed.')
