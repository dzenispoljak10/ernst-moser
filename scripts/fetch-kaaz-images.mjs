#!/usr/bin/env node
/**
 * Ersetzt die Kaaz-Produktbilder durch die offiziellen Bilder von
 * kaaz.co.jp (LM_Top.html). → public/images/products/<slug>/main.webp
 *
 * Run: node scripts/fetch-kaaz-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = 'https://www.kaaz.co.jp/en/Photo/LM/'

// Hinweis: kaaz.co.jp listet kein „KOX"-Modell → für LM 4860 KOX wird das
// nächstliegende 4860-Bild (HXR) verwendet.
const MAP = {
  'kaaz-lm-4860-hx': 'LM4860HX.jpg',
  'kaaz-lm-4860-kox': 'LM4860HXR.jpg',
  'kaaz-lm-5360-hxa': 'LM5360HXA.jpg',
  'kaaz-lm-5360-hxa-hst-pro': 'LM5360HXA-HST-PRO.jpg',
  'kaaz-lm-5360-hxa-pro': 'LM5360HXA-PRO.jpg',
}

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      Accept: 'image/webp,image/*,*/*;q=0.8', Referer: 'https://www.kaaz.co.jp/en/LM_Top.html',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`too small: ${buf.length}`)
  return buf
}

for (const [slug, file] of Object.entries(MAP)) {
  try {
    const raw = await download(BASE + file)
    const webp = await sharp(raw).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
    const dir = path.join(ROOT, 'public', 'images', 'products', slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'main.webp'), webp)
    console.log(`OK  ${slug}  ←  ${file}  (${Math.round(webp.length / 1024)} KB)`)
  } catch (e) {
    console.error(`ERR ${slug}: ${e.message}`)
  }
}
