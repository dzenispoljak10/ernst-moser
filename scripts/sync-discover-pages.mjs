#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Hero-Bilder für die "Entdecken"-Seiten herunterladen.
 *
 *   1. Anhänger     → public/images/pages/anhaenger/hero.webp
 *      Quelle: Wikimedia Commons – Humbaur HTV203015 (sauberer Studio-Shot)
 *   2. Wohnmobile  → public/images/pages/wohnmobile-wohnwagen-camper/hero.webp
 *      Quelle: fiatcamper.com – Camper-Product-Layout-Designed_for_motor_home
 *
 * Run:
 *   node scripts/sync-discover-pages.mjs
 *
 * Optional:
 *   FORCE=1 → bestehende Bilder überschreiben
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const FORCE = process.env.FORCE === '1'

const TARGETS = [
  {
    name: 'Anhänger',
    sourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/d7/Humbaur_HTV203015.jpg',
    referer: 'https://commons.wikimedia.org/',
    out: path.join(ROOT, 'public', 'images', 'pages', 'anhaenger', 'hero.webp'),
  },
  {
    name: 'Wohnmobile/Camper',
    sourceUrl:
      'https://www.fiatcamper.com/content/dam/camper/cross/product/perfect-layout/designed-with-motorhome-manufacturers/aug-24/Camper-Product-Layout-Designed_for_motor_home.jpg',
    referer: 'https://www.fiatcamper.com/',
    out: path.join(
      ROOT,
      'public', 'images', 'pages', 'wohnmobile-wohnwagen-camper', 'hero.webp',
    ),
  },
]

async function downloadImage(url, referer) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
      Referer: referer,
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`suspiciously small image: ${buf.length} bytes`)
  return buf
}

async function ensureHero(target) {
  fs.mkdirSync(path.dirname(target.out), { recursive: true })
  if (fs.existsSync(target.out) && !FORCE) {
    return { fresh: false }
  }
  const raw = await downloadImage(target.sourceUrl, target.referer)
  const webp = await sharp(raw)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(target.out, webp)
  return { fresh: true }
}

async function main() {
  console.log()
  for (const t of TARGETS) {
    try {
      const r = await ensureHero(t)
      console.log(
        `✅ ${t.name.padEnd(22)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden (FORCE=1 zum Überschreiben)'}`,
      )
    } catch (e) {
      console.error(`❌ ${t.name.padEnd(22)} - ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
