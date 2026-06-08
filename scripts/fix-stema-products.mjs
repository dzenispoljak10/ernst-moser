#!/usr/bin/env node
/**
 * Stema bereinigen: nur noch Balkenmäher, Sähmaschinen, Vertikutiergeräte.
 *
 *  1. Balkenmäher-Bild (aus ~/Downloads) → public/images/products/stema-balkenmaeher/main.webp
 *  2. Sanity: löscht alle Stema-Produkte ausser den 3 gewünschten,
 *     legt Balkenmäher neu an (mit Bild + Beschreibung).
 *
 * Run: node --env-file=.env.local scripts/fix-stema-products.mjs
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

const KEEP = ['stema-balkenmaeher', 'stema-saehmaschinen', 'stema-vertikutiergeraete']

const BALKEN = {
  slug: 'stema-balkenmaeher',
  name: 'Balkenmäher',
  src: 'Balkenmaeher-FC-120-Hauptbild-transparent.png.webp',
  desc: [
    'Stema Balkenmäher eignen sich ideal für die Mahd von Böschungen, Wiesen und schwer zugänglichem Gelände. Der saubere Schnitt mit dem Mähbalken ist besonders schonend und insektenfreundlich.',
    'Modelle wie der FC 120 überzeugen mit robustem Antrieb und einfacher Handhabung — für den professionellen wie kommunalen Einsatz.',
  ],
}

function blocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block', _key: `d${i}`, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
  }))
}

async function main() {
  // ── 1. Balkenmäher-Bild ───────────────────────────────────────────────────
  const raw = fs.readFileSync(path.join(DL, BALKEN.src))
  const webp = await sharp(raw).resize({ width: 1024, withoutEnlargement: true }).webp({ quality: 90 }).toBuffer()
  const dir = path.join(ROOT, 'public', 'images', 'products', BALKEN.slug)
  fs.mkdirSync(dir, { recursive: true })
  const imgPath = path.join(dir, 'main.webp')
  fs.writeFileSync(imgPath, webp)
  console.log(`🖼  ${BALKEN.slug}/main.webp (${Math.round(webp.length / 1024)} KB)`)

  // ── 2. Brand-Ref ───────────────────────────────────────────────────────────
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="stema"][0]{_id}`)
  if (!brand) throw new Error('stema brand not found')

  // ── 3. Unerwünschte Produkte löschen ───────────────────────────────────────
  const oldIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="stema" && !(slug.current in $keep)]{_id,"slug":slug.current}`,
    { keep: KEEP },
  )
  for (const o of oldIds) {
    await client.delete(o._id)
    fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.slug), { recursive: true, force: true })
    console.log(`🗑  deleted ${o._id} (+ lokales Bild)`)
  }

  // ── 4. Balkenmäher anlegen ──────────────────────────────────────────────────
  const asset = await client.assets.upload('image', fs.readFileSync(imgPath), { filename: `${BALKEN.slug}.webp` })
  await client.createOrReplace({
    _id: `product-${BALKEN.slug}`,
    _type: 'product',
    name: BALKEN.name,
    slug: { _type: 'slug', current: BALKEN.slug },
    brand: { _type: 'reference', _ref: brand._id },
    description: blocks(BALKEN.desc),
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  })
  console.log(`✅ product-${BALKEN.slug}`)
  console.log('\nFertig.')
}

main().catch(e => { console.error(e); process.exit(1) })
