#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Dhollandia Produkte synchronisieren.
 *
 *   1. Lädt jedes Produktbild von dhollandia.com herunter
 *   2. Konvertiert nach WebP @ 85 %
 *   3. Speichert lokal unter public/images/products/<slug>/main.webp
 *   4. Uploadet das WebP-Asset nach Sanity
 *   5. Legt das Sanity-Produkt mit Brand-Ref Dhollandia an / aktualisiert es
 *   6. Löscht stale Dhollandia-Produkte, die nicht mehr im Katalog sind
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-dhollandia-products.mjs
 *
 * Optional:
 *   SKIP_SANITY=1 node ...   → nur Bilder herunterladen/konvertieren
 *
 * Hinweis: Der Katalog wird hier inline gehalten (statt aus
 * src/lib/dhollandia-catalog.ts importiert), weil Sync-Skripte ohne
 * ts-node-Loader laufen sollen. Beide Listen müssen synchron bleiben.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const BASE = 'https://www.dhollandia.com/library/product/large'

// Mirror of src/lib/dhollandia-catalog.ts → DHOLLANDIA_SECTIONS (flattened).
const MODELS = [
  // Kastenwagen Hebebühnen (light)
  { slug: 'dhollandia-dh-lsp-07', title: 'DH-LSP.07', shortDescription: 'VAN-Lift mit maximaler Plattformfläche für Kastenwagen – einfache Montage ohne Chassis-Ausschnitte.', sourceImageUrl: `${BASE}/8pX5IatsUaohDA.jpg` },
  { slug: 'dhollandia-dh-lsp-10', title: 'DH-LSP.10', shortDescription: 'Speziell für Iveco Daily entwickelt – 2 Hubzylinder für hervorragende Plattformstabilität.', sourceImageUrl: `${BASE}/wbMRItyhO7JhQg.jpg` },
  { slug: 'dhollandia-dh-p2-05', title: 'DH-P2.05', shortDescription: 'Vollautomatischer 2-Armenlift mit verstärkter Konstruktion für maximale Plattformstabilität.', sourceImageUrl: `${BASE}/cBSbcClX4AacWQ.jpg` },
  { slug: 'dhollandia-dh-p1-03', title: 'DH-P1.03', shortDescription: 'Kompakter 1-Arm Hubwagen für Kastenwagen mit automatischer Abrollsicherung.', sourceImageUrl: `${BASE}/yQQ4MnbbruYG6Q.jpg` },
  { slug: 'dhollandia-dh-c001-03', title: 'DH-C001.03', shortDescription: 'Kassetten-Lift: Plattform verschwindet unter dem Ladeboden – Hecktüren bleiben frei zugänglich.', sourceImageUrl: `${BASE}/zfiZb1oAZM6szw.jpg` },
  { slug: 'dhollandia-dh-vz-03', title: 'DH-VZ.03', shortDescription: 'Innenvertikallift mit seitlich rotierender Plattform – passend für viele Kastenwagen.', sourceImageUrl: `${BASE}/bui3a82WhoJbqw.jpg` },
  { slug: 'dhollandia-dh-ai12', title: 'DH-AI12 / AI13', shortDescription: 'Manuell klappbare Aluminium-Rampen mit Gasdruckdämpfern – leicht, robust, vielseitig.', sourceImageUrl: `${BASE}/FTbAefMGSaTJfg.jpg` },

  // Standard Hebebühnen (heavy)
  { slug: 'dhollandia-dh-le-08', title: 'DH-LE.08', shortDescription: 'Leichte 2-Zylinder-Hebebühne für Fahrzeuge mit kurzem Überhang – behält die Reserveradposition.', sourceImageUrl: `${BASE}/p6bfnupRaDGDfg.jpg` },
  { slug: 'dhollandia-dh-lm-10', title: 'DH-LM.10', shortDescription: '4-Zylinder-Spitzenreiter mit hervorragender Stabilität – ideal für Fahrzeuge bis 7,5 t.', sourceImageUrl: `${BASE}/p0laqdnLQl2hOA.jpg` },
  { slug: 'dhollandia-dh-lm-15', title: 'DH-LM.15', shortDescription: 'Leistungsstarke 4-Zylinder-Ladebordwand für LKW von 7,5 bis 12 Tonnen Gesamtgewicht.', sourceImageUrl: `${BASE}/gk94ydEjCyRfvQ.jpg` },
  { slug: 'dhollandia-dh-lm-20', title: 'DH-LM.20', shortDescription: 'Vielseitige 2-Tonnen-Klasse für Fahrzeuge über 7,5 t, Anhänger und Auflieger.', sourceImageUrl: `${BASE}/Hz4TXrMrSejBcQ.jpg` },
  { slug: 'dhollandia-dh-lm-30', title: 'DH-LM.30', shortDescription: 'Schwerlast-Hubladebühne für extreme Bedingungen – ideal für Getränke- und Lebensmittelhandel.', sourceImageUrl: `${BASE}/swau5nPzbSD4Ew.jpg` },
  { slug: 'dhollandia-dh-lsu-40', title: 'DH-LSU.40', shortDescription: 'Schwere Hubladebühne für 4 t mit verstärktem Hubmechanismus – für ungünstigen Lastschwerpunkt.', sourceImageUrl: `${BASE}/ac5Q9Q0BbOHtIQ.jpg` },
  { slug: 'dhollandia-dh-lsu-60', title: 'DH-LSU.60', shortDescription: 'Hochleistungs-Hubladebühne bis 6 t – für schwere Maschinen, Gabelstapler, Industrietransport.', sourceImageUrl: `${BASE}/h48PK2obNAnFjA.jpg` },

  // Unterfahrbare Hebebühnen (heavy)
  { slug: 'dhollandia-dh-sc-05', title: 'DH-SC.05', shortDescription: 'CITY SLIDER für Kastenwagen – Plattform verstaut sich unter dem Chassis in Fahrtposition.', sourceImageUrl: `${BASE}/c3PjAj5KMr7fQw.jpg` },
  { slug: 'dhollandia-dh-sm-15', title: 'DH-SM.15', shortDescription: 'Leichteste unterfahrbare Hubladebühne – einfach gefaltete Plattform, kompakte Installation.', sourceImageUrl: `${BASE}/sq8yVG5gxWVgtA.jpg` },
  { slug: 'dhollandia-dh-sm-30', title: 'DH-SM.30', shortDescription: 'Unterfahrbare Hochleistungs-Hubladebühne mit verstärkter Plattform – für Verteilfahrzeuge.', sourceImageUrl: `${BASE}/BguCmMDyVVfr0A.jpg` },
  { slug: 'dhollandia-dh-soc-10', title: 'DH-SO(C).10', shortDescription: 'Leichteste unterfahrbare Bühne mit doppelt gefalteter Plattform – für kurzen Überhang.', sourceImageUrl: `${BASE}/iYtPQTPHcK6Rjg.jpg` },
  { slug: 'dhollandia-dh-so7-20', title: 'DH-SO7.20', shortDescription: 'Doppelt gefaltete Plattform speziell für Auslieferfahrzeuge und Paketzustellung.', sourceImageUrl: `${BASE}/fjP5ZcQ2HO9yDQ.jpg` },

  // Vertikallifte (heavy)
  { slug: 'dhollandia-dh-vo-07-k1', title: 'DH-VO.07.K1', shortDescription: 'Single-Deck-Lift bis 7,5 t mit einteiliger Aluminium-Plattform – maximaler Wirkungsgrad.', sourceImageUrl: `${BASE}/cdMar4zroQimxw.jpg` },
  { slug: 'dhollandia-dh-vo-10-k1', title: 'DH-VO.10.K1', shortDescription: 'Mittelschwerer Vertikallift bis 15 t – manuell oder hydraulisch schliessbare Plattform.', sourceImageUrl: `${BASE}/vcEqUMN5vCIwHw.jpg` },
  { slug: 'dhollandia-dh-vo-15-k1', title: 'DH-VO.15.K1', shortDescription: 'Schwerlast-Vertikallift mit Aluminium- oder Stahlplattform und verstärkten Säulen.', sourceImageUrl: `${BASE}/2ug57mryhvXl2Q.jpg` },
  { slug: 'dhollandia-dh-vo-20-k9', title: 'DH-VO.20.K9', shortDescription: 'Leistungsstärkster Kettenlift mit bis zu 2.000 kg Hubkraft und verstärkter Stahlausführung.', sourceImageUrl: `${BASE}/nptj0in65V1wuw.jpg` },
  { slug: 'dhollandia-dh-vb-15-e1', title: 'DH-VB.15.E1', shortDescription: 'Robuster Einzelstock-Vertikallift – speziell für Supermarkt- und Lebensmittelhandel.', sourceImageUrl: `${BASE}/M7NUzDsg77WPfw.jpg` },

  // Falthebebühnen (heavy)
  { slug: 'dhollandia-dh-rp-10', title: 'DH-RP.10', shortDescription: 'Leichte, robuste Half-Dip-Hubladebühne mit hervorragendem Preis-Leistungs-Verhältnis.', sourceImageUrl: `${BASE}/yHhuzU1tyihEYw.jpg` },
  { slug: 'dhollandia-dh-rp-15', title: 'DH-RP.15', shortDescription: 'Schwerlast-Falthebebühne mit Half-Dip-Bewegung – wirtschaftliche Paletten- und Kistenentladung.', sourceImageUrl: `${BASE}/ORQazDz1lp9ohg.jpg` },
  { slug: 'dhollandia-dh-rc-10', title: 'DH-RC.10', shortDescription: 'Leichte Falthebebühne mit waagerechter Plattform und automatischer Bodenangleichung.', sourceImageUrl: `${BASE}/bNoyIDDWRBvdrg.jpg` },
  { slug: 'dhollandia-dh-rc-15', title: 'DH-RC.15', shortDescription: 'Falthebebühne für mittelschwere Nutzfahrzeuge – waagerechte Plattform mit Auto-Bodenangleichung.', sourceImageUrl: `${BASE}/ZVBVStJwIUpAiQ.jpg` },
  { slug: 'dhollandia-dh-rm-20', title: 'DH-RM.20', shortDescription: 'Hochleistungs-Falthebebühne mit 2 Hubzylindern und breiter Hubschwinge.', sourceImageUrl: `${BASE}/ZsTZtEI5l8dBbA.jpg` },

  // Spezialausführungen (heavy)
  { slug: 'dhollandia-dh-am-25', title: 'DH-AM.25', shortDescription: 'Leichte, robuste manuelle Aluminium-Rampe mit integrierten Torsionsfedern.', sourceImageUrl: `${BASE}/bG01HpfkO7qG0w.jpg` },
  { slug: 'dhollandia-dh-ach-10', title: 'DH-ACH.10.01', shortDescription: 'Leichte hydraulische Aluminium-Rampe mit elegant in die Türen integriertem Schliessmechanismus.', sourceImageUrl: `${BASE}/m5NBRkpYcBRqYg.jpg` },
  { slug: 'dhollandia-dh-ar11', title: 'DH-AR11 / AR12', shortDescription: 'Hydraulische Hochleistungs-Rampen mit einteiliger Stahlplattform – bis 20 t mit individueller Konfiguration.', sourceImageUrl: `${BASE}/NzJVYUpwySATbg.jpg` },
  { slug: 'dhollandia-dh-ap-25', title: 'DH-AP.25', shortDescription: 'Aluminium-Rampen für Motorwagen mit Anhänger – zwei klappbare Rampen für Ladungstransfer.', sourceImageUrl: `${BASE}/pUjau4blRjUZEA.jpg` },
  { slug: 'dhollandia-dh-dr-90', title: 'DH-DR.90', shortDescription: 'Brücken-Rampe mit 5 t- oder 9 t-Kapazität zwischen Laderampe und Fahrzeug – hydraulisch höhenverstellbar.', sourceImageUrl: `${BASE}/Cw1VLCaNcoGTaQ.jpg` },
]

const SKIP_SANITY = process.env.SKIP_SANITY === '1'

let client = null
if (!SKIP_SANITY) {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN (or pass SKIP_SANITY=1 to skip Sanity sync)')
    process.exit(1)
  }
  client = createClient({
    projectId: 'owqsc1ph',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
  })
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'image/jpeg,image/png,image/webp,image/*',
      Referer: 'https://www.dhollandia.com/',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`suspiciously small image: ${buf.length} bytes`)
  return buf
}

async function ensureLocalImage(model) {
  const dir = path.join(ROOT, 'public', 'images', 'products', model.slug)
  const out = path.join(dir, 'main.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && fs.statSync(out).size > 1024) {
    return { path: out, fresh: false }
  }
  const raw = await downloadImage(model.sourceImageUrl)
  const webp = await sharp(raw)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return { path: out, fresh: true }
}

async function ensureBrand() {
  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="dhollandia"][0]{_id}`,
  )
  if (!brand) throw new Error('Dhollandia brand not found in Sanity')
  return brand._id
}

async function uploadToSanity(filepath, slug) {
  const buf = fs.readFileSync(filepath)
  const asset = await client.assets.upload('image', buf, { filename: `${slug}.webp` })
  return asset._id
}

async function ensureProduct(brandId, model) {
  const productId = `product-${model.slug}`
  const assetId = await uploadToSanity(
    path.join(ROOT, 'public', 'images', 'products', model.slug, 'main.webp'),
    model.slug,
  )
  await client.createOrReplace({
    _id: productId,
    _type: 'product',
    name: model.title,
    slug: { _type: 'slug', current: model.slug },
    brand: { _type: 'reference', _ref: brandId },
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: 's1', text: model.shortDescription, marks: [] },
        ],
      },
    ],
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  })
  return productId
}

async function deleteStale(keepSlugs) {
  const staleIds = await client.fetch(
    `*[_type=="product" && brand->slug.current=="dhollandia" && !(slug.current in $keep)]._id`,
    { keep: keepSlugs },
  )
  for (const id of staleIds) {
    await client.delete(id)
    console.log(`🗑  deleted stale ${id}`)
  }
  if (!staleIds.length) console.log('   (no stale Dhollandia products to delete)')
}

async function main() {
  console.log(`\n📋 Dhollandia catalog: ${MODELS.length} products\n`)

  for (const m of MODELS) {
    try {
      const r = await ensureLocalImage(m)
      console.log(
        `✅ ${m.title.padEnd(22)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden'}`,
      )
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(22)} - Bildfehler: ${e.message}`)
    }
  }

  if (SKIP_SANITY) {
    console.log('\n(SKIP_SANITY=1, Sanity-Sync übersprungen)\n')
    return
  }

  console.log('\n🛰  Sanity sync…\n')
  const brandId = await ensureBrand()
  console.log(`Brand: ${brandId}\n`)

  await deleteStale(MODELS.map((m) => m.slug))
  console.log()

  for (const m of MODELS) {
    try {
      const id = await ensureProduct(brandId, m)
      console.log(`✅ ${m.title.padEnd(22)} → ${id}`)
    } catch (e) {
      console.error(`❌ ${m.title.padEnd(22)}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
