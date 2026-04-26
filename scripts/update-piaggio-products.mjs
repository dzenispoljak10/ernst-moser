#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Piaggio Produkte synchronisieren.
 *
 * - Löscht alte, generische Piaggio-Produkte (Chassis, Kipper, Pick-Up) + Ape falls vorhanden
 * - Legt die 6 neuen Produkte (NP6 Chassis ×2, NPE Aufbauten ×4) an
 * - Upload der lokalen Platzhalter-Bilder unter public/images/products/piaggio-<slug>/main.webp
 *
 * Run: node --env-file=.env.local scripts/update-piaggio-products.mjs
 */
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const MODELS = [
  {
    slug: 'porter-np6-chassis-einzelbereifung',
    name: 'Porter NP6 Chassis Einzelbereifung',
    description:
      'Der Piaggio Porter NP6 mit Einzelbereifung kombiniert die kompakten Aussenmasse des Porter-Platforms mit dem bewährten Chassis-Aufbau – eine solide Basis für individuelle Karosserien. Long-Range CNG-Motorisierung mit niedrigem Verbrauch.',
  },
  {
    slug: 'porter-np6-chassis-zwillingsbereifung',
    name: 'Porter NP6 Chassis Zwillingsbereifung',
    description:
      'Chassis mit doppelter Hinterachs-Bereifung für höhere Stabilität und zulässige Nutzlast. Erste Wahl für Kipper- und Kofferaufbauten mit schwerer Zuladung. CNG Long-Range Motor, Euro 6d.',
  },
  {
    slug: 'porter-npe-chassis-einzelbereifung',
    name: 'Porter NPE Chassis Einzelbereifung',
    description:
      'Der vollelektrische Porter NPE als Chassis – die emissionsfreie Basis für individuelle Aufbauten. Gleiche Abmessungen wie NP6, kombiniert mit ruhigem, drehmomentstarkem Elektroantrieb.',
  },
  {
    slug: 'porter-npe-pritsche-einzelbereifung',
    name: 'Porter NPE Pritsche Einzelbereifung',
    description:
      'Offene Pritsche mit klappbaren Bordwänden auf dem elektrischen Porter-NPE-Chassis. Ideal für Gartenbau, Reinigung, Bauzulieferung – schnelle Beladung von oben und seitlich.',
  },
  {
    slug: 'porter-npe-heckkipper-einzelbereifung',
    name: 'Porter NPE Heckkipper Einzelbereifung',
    description:
      'Hydraulisch kippbare Ladefläche auf dem elektrischen Porter-Chassis. Schnelles Entleeren von Aushub, Grünschnitt und Baumaterial – komplett emissionsfrei auch beim Kipp-Vorgang.',
  },
  {
    slug: 'porter-npe-heckkipper-grasfanggitter',
    name: 'Porter NPE Heckkipper mit Grasfanggitter',
    description:
      'Heckkipper mit montiertem Fanggitter für leichtes Material – Rasenschnitt, Laub, kleines Schnittgut. Spezifisch für kommunale Grünpflege und Gartenbau-Unterhalt.',
  },
]

async function ensureBrand() {
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="piaggio"][0]{_id}`)
  if (!brand) throw new Error('Piaggio brand not found in Sanity')
  return brand._id
}

async function deleteOld() {
  // Keep-list = the 6 new full-word slugs. Anything else under Piaggio gets
  // purged (covers the 3 original generic aufbau entries, the previous
  // short-slug run, and any Ape products that might have snuck in).
  const KEEP = [
    'piaggio-porter-np6-chassis-einzelbereifung',
    'piaggio-porter-np6-chassis-zwillingsbereifung',
    'piaggio-porter-npe-chassis-einzelbereifung',
    'piaggio-porter-npe-pritsche-einzelbereifung',
    'piaggio-porter-npe-heckkipper-einzelbereifung',
    'piaggio-porter-npe-heckkipper-grasfanggitter',
  ]
  const staleIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="piaggio" && !(slug.current in $keep)]._id`,
    { keep: KEEP },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`🗑  deleted ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale products to delete)')
}

async function uploadLocalImage(slug, filename) {
  const p = path.join(ROOT, 'public', 'images', 'products', `piaggio-${slug}`, 'main.webp')
  if (!fs.existsSync(p)) throw new Error(`missing ${p}`)
  const buf = fs.readFileSync(p)
  const asset = await client.assets.upload('image', buf, { filename })
  return asset._id
}

async function ensureProduct(brandId, { slug, name, description }) {
  const productId = `product-piaggio-${slug}`
  const assetId = await uploadLocalImage(slug, `piaggio-${slug}.webp`)
  await client.createOrReplace({
    _id: productId,
    _type: 'product',
    name,
    slug: { _type: 'slug', current: `piaggio-${slug}` },
    brand: { _type: 'reference', _ref: brandId },
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's1', text: description, marks: [] }],
      },
    ],
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  })
  return productId
}

async function main() {
  const brandId = await ensureBrand()
  console.log(`Brand: ${brandId}\n`)

  await deleteOld()
  console.log()

  for (const m of MODELS) {
    try {
      const id = await ensureProduct(brandId, m)
      console.log(`✅ ${m.name.padEnd(48)} → ${id}`)
    } catch (e) {
      console.error(`❌ ${m.name}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
