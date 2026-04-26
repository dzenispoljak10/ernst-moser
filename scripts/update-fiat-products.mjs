#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Fiat Produkte aktualisieren
 * ================================================
 * Lädt offizielle Fiat-Professional-Modellbilder vom Ernst-Moser
 * Dealer-Microsite-CDN (Contentful), konvertiert zu WebP 85 %,
 * speichert unter public/images/products/fiat-<slug>/main.webp,
 * lädt zu Sanity hoch, aktualisiert bzw. erstellt die Produkte.
 *
 * Run: node --env-file=.env.local scripts/update-fiat-products.mjs
 */

import { createClient } from '@sanity/client'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN env var')
  process.exit(1)
}

// Model -> Contentful image URL (extracted from ernst-moser.garage.fiatprofessional.ch brochures page)
// Slug matches either existing Sanity slug or new slug for new products.
const MODELS = [
  {
    slug: 'fiat-ducato',
    name: 'Ducato',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/3sjFFrkxKwMV8Enmbczn51/33f66f2e804a7cc83a8e1f6fb59b8c79/Fiat-Ducato-EDucato-Figurino-1920x1080.png',
    description: 'Der Fiat Ducato ist das bewährte Transporter-Flaggschiff für Profis – in zahlreichen Varianten als Kastenwagen, Kombi, Panorama oder Chassis.',
  },
  {
    slug: 'fiat-e-ducato',
    name: 'E-Ducato',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/3sjFFrkxKwMV8Enmbczn51/33f66f2e804a7cc83a8e1f6fb59b8c79/Fiat-Ducato-EDucato-Figurino-1920x1080.png',
    description: 'Der vollelektrische Fiat E-Ducato kombiniert das bewährte Ducato-Konzept mit emissionsfreiem Antrieb für den urbanen Lieferverkehr.',
  },
  {
    slug: 'fiat-scudo',
    name: 'Scudo',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/4E1EPC80Y3L1C81F3Tmkjr/20cd00d060fa5f8ddc3a4126033c6c9c/fiatpro_scudo_figurino__1_.jpg',
    description: 'Der Fiat Scudo ist der kompakte Transporter mit viel Ladevolumen, wendigem Handling und modernem Arbeitsplatz-Komfort.',
  },
  {
    slug: 'fiat-e-scudo',
    name: 'E-Scudo',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/1RRu0LufiApp9C1bwAFcVj/41ee9cb973f61cba274682f4e6724d74/fiatpro_escudo_figurino__1_.jpg',
    description: 'Der Fiat E-Scudo – 100 % elektrisch, 100 % Scudo: ideal für City-Logistik und emissionsfreies Arbeiten im urbanen Raum.',
  },
  {
    slug: 'fiat-dobl',
    name: 'Doblò',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/3ndULGG8Nx4OSE7ZJgUA5U/a4f6274527a56801709fca114f0e4d09/Doblo_L1_ICE.png',
    description: 'Der Fiat Doblò ist der vielseitige Hochdach-Kombi für Gewerbe und Familien mit großzügigem Ladevolumen.',
  },
  {
    slug: 'fiat-e-dobl',
    name: 'E-Doblò',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/HCv8kEA8jlubdQ9XQAD85/a3d4bc2eef0119ad5041ab207da922ad/Doblo_L1_BEV.png',
    description: 'Der vollelektrische Fiat E-Doblò ist die umweltfreundliche Antwort auf moderne Transportbedürfnisse in der Stadt.',
  },
  {
    slug: 'fiat-ulysse',
    name: 'Ulysse',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/oiSdhvABxnQcSWf94GfGD/e6af9fb70cb9be24c810dedeb34e976a/fiatpro_ulysse_figurino.jpg',
    description: 'Der Fiat Ulysse ist der 8-plätzige Personentransporter für Shuttle-Services, VIP-Transport und große Familien.',
  },
  {
    slug: 'fiat-e-ulysse',
    name: 'E-Ulysse',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/6pxawbxe89mSIeV3JptA1u/6daab6955c355d416d0b58bed0a1e4dd/fiatpro_eulysse_figurino.jpg',
    description: 'Der Fiat E-Ulysse bringt elektrische Mobilität in den Bereich des Personentransports – lokal emissionsfrei und komfortabel.',
  },
  {
    slug: 'fiat-ducato-chassis',
    name: 'Ducato Chassis Cab & Pickup',
    imgUrl: 'https://images.ctfassets.net/wrkkfp3wx9rg/1GJHT0morM2W2XHwSV2h36/edc535ac9bbd1cdff842eb84ab573ebc/Ducato_Chassis1.png',
    description: 'Der Fiat Ducato als Chassis Cab oder Pickup – die flexible Basis für Aufbauten, Kipper, Kofferaufbauten und individuelle Nutzfahrzeuglösungen.',
  },
]

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

async function downloadImage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function saveLocalWebP(buf, slug) {
  const dir = path.join(PROJECT_ROOT, 'public', 'images', 'products', slug)
  await fs.mkdir(dir, { recursive: true })
  const out = path.join(dir, 'main.webp')
  await sharp(buf)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(out)
  const stat = await fs.stat(out)
  return { path: out, bytes: stat.size }
}

async function uploadToSanity(buf, filename) {
  const asset = await client.assets.upload('image', buf, { filename })
  return asset
}

async function findProduct(slug) {
  return client.fetch(
    `*[_type=="product" && slug.current==$slug][0]{_id, name, slug}`,
    { slug }
  )
}

async function fetchBrandId() {
  const b = await client.fetch(`*[_type=="brand" && slug.current=="fiat"][0]{_id}`)
  if (!b) throw new Error('Fiat brand not found in Sanity')
  return b._id
}

async function ensureProduct({ slug, name, description, assetId, brandId }) {
  const existing = await findProduct(slug)
  const descBlocks = [
    {
      _type: 'block',
      _key: 'desc1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'descspan1', text: description, marks: [] }],
      markDefs: [],
    },
  ]
  if (existing?._id) {
    await client
      .patch(existing._id)
      .set({
        name,
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
      })
      .commit()
    return { action: 'updated', id: existing._id }
  } else {
    const newId = `product-${slug}`
    await client.createOrReplace({
      _id: newId,
      _type: 'product',
      name,
      slug: { _type: 'slug', current: slug },
      brand: { _type: 'reference', _ref: brandId },
      description: descBlocks,
      mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    })
    return { action: 'created', id: newId }
  }
}

async function main() {
  const brandId = await fetchBrandId()
  console.log(`Brand: ${brandId}\n`)

  for (const m of MODELS) {
    try {
      const buf = await downloadImage(m.imgUrl)
      const local = await saveLocalWebP(buf, m.slug)
      const filename = `${m.slug}.webp`
      // Re-encode buffer to webp for Sanity so asset matches local file
      const webpBuf = await sharp(buf)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer()
      const asset = await uploadToSanity(webpBuf, filename)
      const res = await ensureProduct({
        slug: m.slug,
        name: m.name,
        description: m.description,
        assetId: asset._id,
        brandId,
      })
      console.log(
        `✅ Fiat ${m.name.padEnd(28)} – ${(local.bytes / 1024).toFixed(1).padStart(6)} KB, ${res.action}`
      )
    } catch (err) {
      console.error(`❌ Fiat ${m.name} – ${err.message}`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
