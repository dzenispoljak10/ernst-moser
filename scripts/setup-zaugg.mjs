#!/usr/bin/env node
/**
 * Zaugg neu aufsetzen: nur 2 Produkte (Schneepflüge, Schneefrässchleudern).
 *
 *  1. Lädt 2 Produktbilder + 1 Hero-Bild von zaugg.swiss → WebP.
 *  2. Kopiert 2 Prospekt-PDFs aus ~/Downloads → public/prospekte/.
 *  3. Sanity: löscht die 4 alten Zaugg-Produkte, legt 2 neue an
 *     (mit hochgeladenem mainImage + Beschreibung).
 *
 * Run: node --env-file=.env.local scripts/setup-zaugg.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DL = 'C:/Users/dzeni/Downloads'

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})

const REFERER = 'https://www.zaugg.swiss/'

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      Accept: 'image/webp,image/*,*/*;q=0.8', Referer: REFERER,
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`too small: ${buf.length}`)
  return buf
}

async function saveImage(url, outRel, width) {
  const raw = await download(url)
  const webp = await sharp(raw).resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
  const out = path.join(ROOT, outRel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, webp)
  console.log(`🖼  ${outRel} (${Math.round(webp.length / 1024)} KB)`)
  return out
}

function copyPdf(srcName, outRel) {
  const out = path.join(ROOT, outRel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.copyFileSync(path.join(DL, srcName), out)
  console.log(`📄 ${outRel}`)
}

function blocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block', _key: `d${i}`, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
  }))
}

async function uploadAsset(filepath, name) {
  const asset = await client.assets.upload('image', fs.readFileSync(filepath), { filename: name })
  return asset._id
}

const PRODUCTS = [
  {
    slug: 'zaugg-schneepfluege',
    name: 'Zaugg Schneepflüge',
    img: 'https://www.zaugg.swiss/cache/files/2a6afc3ff070ec0b7a06fc75653ec676d8c5f6dc.jpg',
    desc: [
      'Zaugg produziert technisch und qualitativ hochstehende Schneepflüge für den professionellen Winterdienst – auf Strassen, Verkehrsflächen und Flugplätzen. Das innovative Elementabfederungssystem mit Einzelaufhängung sorgt für eine optimale Anpassung ans Fahrbahnprofil und zuverlässiges Räumen auch auf unebenem Untergrund.',
      'Das Programm reicht vom kompakten S3, L3, M5, L5 und XL5 über die G-Baureihe (G6, G8K, G9, G16, G21, G32, G33, G44) und die Keilpflüge G40K, G50K und SG50K bis zum VARIO 4, den Seitenpflügen SSR und SFR-G22K sowie den Spezialmodellen SP3000 und SnowShark.',
      'So lässt sich für jedes Trägerfahrzeug – vom Traktor über Kommunalfahrzeuge bis zum Lkw und zur Flughafen-Räummaschine – die passende Lösung konfigurieren.',
    ],
  },
  {
    slug: 'zaugg-schneefraesschleudern',
    name: 'Zaugg Schneefrässchleudern',
    img: 'https://www.zaugg.swiss/cache/files/6e14d96769d0d96f56041667e8a600ea74ce04e7.jpg',
    desc: [
      'Die Zaugg-Schneefrässchleudern überzeugen durch ihre kombinierte Konstruktion aus Fräshaspel und Schleuderrad, die optimal aufeinander abgestimmt sind. Für jedes Trägerfahrzeug – vom Kleintraktor bis zum grossen Geräteträger – gibt es die passende Lösung, wahlweise mechanisch oder hydraulisch angetrieben.',
      'Sicherheitsmerkmale wie Klappschar, elastische Haspellagerung und Abschaltkupplungen reduzieren die Belastung auf Fahrzeug und Gerät beim Überfahren von Hindernissen.',
      'Das Programm umfasst die Baureihen SF 40-42, SF 55-45/52, SF 65, SF 72, SF 90 (inkl. UNIMOG-Variante) und SF 110 sowie die selbstfahrenden Rolba- und Mobil-Modelle (Rolba 500/1500/3000, Mobil 230/380).',
    ],
  },
]

async function main() {
  // ── 1. Hero-Bild ──────────────────────────────────────────────────────────
  await saveImage('https://www.zaugg.swiss/cache/files/b09184f01898b205c2a4c97adb7c9cc4eac7aab3.jpg',
    'public/images/brands/zaugg/hero.webp', 1920)

  // ── 2. Prospekte ──────────────────────────────────────────────────────────
  copyPdf('2025 ZAUGG Folder - Schneepflug_DE.pdf', 'public/prospekte/zaugg-schneepfluege.pdf')
  copyPdf('Prospekt ZAUGG-Schneefrässchleudern.pdf', 'public/prospekte/zaugg-schneefraesschleudern.pdf')

  // ── 3. Brand-Ref holen ──────────────────────────────────────────────────────
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="zaugg"][0]{_id}`)
  if (!brand) throw new Error('zaugg brand not found')

  // ── 4. Alte Produkte löschen ────────────────────────────────────────────────
  const oldIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="zaugg" && !(slug.current in $keep)]._id`,
    { keep: PRODUCTS.map(p => p.slug) },
  )
  for (const id of oldIds) {
    await client.delete(id)
    console.log(`🗑  deleted ${id}`)
  }

  // ── 5. Neue Produkte anlegen ──────────────────────────────────────────────
  for (const p of PRODUCTS) {
    const localImg = await saveImage(p.img, `public/images/products/${p.slug}/main.webp`, 1200)
    const assetId = await uploadAsset(localImg, `${p.slug}.webp`)
    await client.createOrReplace({
      _id: `product-${p.slug}`,
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      brand: { _type: 'reference', _ref: brand._id },
      description: blocks(p.desc),
      mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    })
    console.log(`✅ product-${p.slug}`)
  }
  console.log('\nFertig.')
}

main().catch(e => { console.error(e); process.exit(1) })
