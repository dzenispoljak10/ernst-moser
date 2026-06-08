import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = 'C:/Users/dzeni/Downloads/swisstransfer_7e0f1c54-6bd1-4e0d-9b70-f870bac1709c/Bilder und Videos neue Homepage'

// dest (in /images/isuzu) | source-datei | breite | (contain-pad weiss?)
const PRODUCTS = [
  ['d-max-single', 'D-Max Single Front_Splash White.jpg', 1200],
  ['d-max-space', 'D-Max Space Front_Biarritz Blue.jpg', 1200],
  ['d-max-crew', 'D-Max Crew Front_Inishmore Green.jpg', 1200],
  ['truck-3-5-ton', 'ISUZU M21-M27 Ribaltabile.png', 1200],
  ['truck-6-7-5-ton', 'ISZE_NPR_H_ext_007.png', 1200],
  ['truck-10-14-ton', 'F-Serie.jpg', 1200],
]

const outDir = path.join(ROOT, 'public', 'images', 'isuzu')
fs.mkdirSync(outDir, { recursive: true })

for (const [dest, src, w] of PRODUCTS) {
  try {
    const raw = fs.readFileSync(path.join(SRC, src))
    const webp = await sharp(raw).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer()
    fs.writeFileSync(path.join(outDir, `${dest}.webp`), webp)
    const m = await sharp(webp).metadata()
    console.log(`OK ${dest} <- ${src} (${m.width}x${m.height}, ${Math.round(webp.length / 1024)}KB)`)
  } catch (e) { console.log(`ERR ${dest}: ${e.message}`) }
}

// Hero
try {
  const raw = fs.readFileSync(path.join(SRC, 'Isuzu_JPG-129.jpg'))
  const webp = await sharp(raw).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer()
  fs.writeFileSync(path.join(outDir, 'hero-isuzu-truck.webp'), webp)
  const m = await sharp(webp).metadata()
  console.log(`OK hero-isuzu-truck (${m.width}x${m.height}, ${Math.round(webp.length / 1024)}KB)`)
} catch (e) { console.log(`ERR hero: ${e.message}`) }
