#!/usr/bin/env node
/**
 * Konvertiert die von stema.ch heruntergeladenen Hauptbilder (in ~/Downloads)
 * in public/images/products/<slug>/main.webp.
 *
 * Run: node scripts/fetch-stema-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DL = 'C:/Users/dzeni/Downloads'

const MAP = {
  'stema-aufsitz-wildwuchsmaeher': 'Aufsitz-Wildwuchsmaeher-Ghepard-4x4-Hauptbild-transparent-1-1024x1024.png.webp',
  'stema-saehmaschinen': 'Saehmaschine.jpg.webp',
  'stema-grasschaelmaschinen': 'grasschaelmaschine-l390-transparent-1024x1024.png.webp',
  'stema-vertikutiergeraete': 'Vertikutiergeraet.jpg.webp',
  'stema-wildkrautbrenner': 'Wildkrautbrenner.jpg.webp',
  'stema-wildkrautbuersten': 'Wildkrautbuerste.jpg.webp',
}

for (const [slug, file] of Object.entries(MAP)) {
  try {
    const raw = fs.readFileSync(path.join(DL, file))
    const webp = await sharp(raw).resize({ width: 1024, withoutEnlargement: true }).webp({ quality: 90 }).toBuffer()
    const dir = path.join(ROOT, 'public', 'images', 'products', slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'main.webp'), webp)
    console.log(`OK  ${slug}  (${Math.round(webp.length / 1024)} KB)`)
  } catch (e) {
    console.error(`ERR ${slug}: ${e.message}`)
  }
}
