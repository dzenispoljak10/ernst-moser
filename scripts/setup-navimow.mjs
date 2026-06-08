#!/usr/bin/env node
/**
 * Navimow-Sortiment aus shop.ernst-moser.ch holen:
 *  - pro Produkt Bild + Kurzbeschreibung scrapen
 *  - Bild → public/images/products/<slug>/main.webp
 *  - Sanity-Produkt anlegen (brand-segway), kategorisiert nach Serie
 *  - alte Segway-Produkte in Sanity löschen
 *  - fertige Katalog-Einträge (TS) ausgeben → in motorgeraete-catalogs.ts einfügen
 *
 * Run: node --env-file=.env.local scripts/setup-navimow.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOP = 'https://shop.ernst-moser.ch/produkt/'

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})

// slug | name | category | shop-url-slug | fallback-Beschreibung
const P = [
  ['segway-navimow-i108e', 'Navimow i108E', 'I-Serie', 'segway-navimow-i108e-maehroboter-rasenroboter', 'Kompakter Einsteiger-Mähroboter mit RTK-Satellitennavigation – drahtlos, leise und per App gesteuert für Gärten bis 800 m².'],
  ['segway-navimow-i210e', 'Navimow i210E AWD', 'I-Serie', 'segway-navimow-i210e-awd-n-rtk-maehroboter', 'Allrad-Mähroboter (AWD) mit RTK-Navigation für sicheres, kabelloses Mähen – auch an Steigungen.'],
  ['segway-navimow-h206e', 'Navimow h206E', 'H-Serie', 'segway-navimow-h206e-lidar-n-rtk-maehroboter', 'Mähroboter mit LiDAR- und RTK-Navigation für zuverlässiges, drahtloses Mähen ohne Begrenzungskabel.'],
  ['segway-navimow-h210e', 'Navimow h210E', 'H-Serie', 'segway-navimow-h210e-lidar-n-rtk-maehroboter', 'Mähroboter mit LiDAR- und RTK-Navigation für präzise, kabellose Rasenpflege.'],
  ['segway-navimow-h215e', 'Navimow h215E', 'H-Serie', 'segway-navimow-h215e-lidar-n-rtk-maehroboter', 'Leistungsstarker Mähroboter mit LiDAR- und RTK-Navigation für grössere Flächen.'],
  ['segway-navimow-h230e', 'Navimow h230E', 'H-Serie', 'segway-navimow-h230e-lidar-n-rtk-maehroboter', 'Top-Modell der H-Serie mit LiDAR- und RTK-Navigation für anspruchsvolle Gärten.'],
  ['segway-navimow-x315e', 'Navimow X315E', 'X3-Serie', 'segway-navimow-x315e-kabelloser-maehroboter-1500m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence-2.0-Kamera-Hinderniserkennung für Flächen bis 1.500 m².'],
  ['segway-navimow-x330e', 'Navimow X330E', 'X3-Serie', 'segway-navimow-x330e-kabelloser-maehroboter-3000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 3.000 m².'],
  ['segway-navimow-x350e', 'Navimow X350E', 'X3-Serie', 'segway-navimow-x350e-kabelloser-maehroboter-5000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 5.000 m².'],
  ['segway-navimow-x390e', 'Navimow X390E', 'X3-Serie', 'segway-navimow-x390e-kabelloser-maehroboter-10000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Profi-Mähroboter mit GPS, 4G und VisionFence 2.0 für grosse Flächen bis 10.000 m².'],
  ['segway-navimow-x420e', 'Navimow X420E AWD', 'X4-Serie', 'segway-navimow-x420e-awd-kabelloser-maehroboter-bis-2000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence-Kamera für anspruchsvolles Gelände bis 2.000 m².'],
  ['segway-navimow-x430e', 'Navimow X430E AWD', 'X4-Serie', 'segway-navimow-x430e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².'],
  ['segway-navimow-x450e', 'Navimow X450E AWD', 'X4-Serie', 'segway-navimow-x450e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².'],
  ['segway-navimow-terranox-cm120', 'Navimow Terranox CM120 M1 AWD', 'Terranox', 'segway-navimow-terranox-cm120-m1-awd-kabelloser-maehroboter-bis-12000-m2-mit-visionfence', 'Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 12.000 m².'],
  ['segway-navimow-terranox-cm240', 'Navimow Terranox CM240 M1 AWD', 'Terranox', 'segway-navimow-terranox-cm240-m1-awd-kabelloser-maehroboter-bis-24000-m2-mit-visionfence', 'Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 24.000 m².'],
]

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function extractImage(html) {
  let m = html.match(/data-large_image="([^"]+)"/)
  if (m) return m[1]
  m = html.match(/class="[^"]*wp-post-image[^"]*"[^>]*\bsrc="([^"]+)"/)
  if (m) return m[1]
  m = html.match(/\bsrc="([^"]+wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/i)
  return m ? m[1] : null
}

function extractShortDesc(html) {
  const m = html.match(/woocommerce-product-details__short-description"?>([\s\S]*?)<\/div>/)
  if (!m) return null
  let t = m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü').replace(/&szlig;/g, 'ß')
    .replace(/\s+/g, ' ').trim()
  // Preise entfernen
  if (/CHF|Fr\.|EUR|€/i.test(t)) return null
  return t.length > 40 ? t.slice(0, 320) : null
}

async function downloadImage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://shop.ernst-moser.ch/' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`img HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

function blocks(text) {
  return [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text, marks: [] }] }]
}

async function main() {
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="segway"][0]{_id}`)
  if (!brand) throw new Error('segway brand not found')

  const keep = P.map(p => p[0])
  const old = await client.fetch(`*[_type=="product" && brand->slug.current=="segway" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep })
  for (const o of old) {
    await client.delete(o._id)
    fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.s), { recursive: true, force: true })
    console.error(`deleted ${o._id}`)
  }

  const catalog = []
  for (const [slug, name, category, urlSlug, fallback] of P) {
    const url = SHOP + urlSlug + '/'
    let desc = fallback
    let imgUrl = null
    try {
      const html = await fetchHtml(url)
      imgUrl = extractImage(html)
      const sd = extractShortDesc(html)
      if (sd) desc = sd
    } catch (e) {
      console.error(`WARN ${slug}: page ${e.message}`)
    }
    // Bild
    try {
      if (imgUrl) {
        const raw = await downloadImage(imgUrl)
        const webp = await sharp(raw).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer()
        const dir = path.join(ROOT, 'public', 'images', 'products', slug)
        fs.mkdirSync(dir, { recursive: true })
        const imgPath = path.join(dir, 'main.webp')
        fs.writeFileSync(imgPath, webp)
        const asset = await client.assets.upload('image', fs.readFileSync(imgPath), { filename: `${slug}.webp` })
        await client.createOrReplace({
          _id: `product-${slug}`, _type: 'product', name,
          slug: { _type: 'slug', current: slug },
          brand: { _type: 'reference', _ref: brand._id },
          description: blocks(desc),
          mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        })
        console.error(`OK ${slug} (img ${Math.round(webp.length / 1024)}KB)`)
      } else {
        console.error(`WARN ${slug}: no image found`)
      }
    } catch (e) {
      console.error(`ERR ${slug}: ${e.message}`)
    }
    catalog.push({ slug, name, category, url, shortDescription: desc })
  }

  // TS-Ausgabe
  console.log('\n\n===CATALOG_TS_START===')
  for (const c of catalog) {
    console.log(`    { slug: ${JSON.stringify(c.slug)}, category: ${JSON.stringify(c.category)}, title: ${JSON.stringify(c.name)}, shortDescription: ${JSON.stringify(c.shortDescription)}, longDescription: [${JSON.stringify(c.shortDescription)}], image: '/images/products/${c.slug}/main.webp', sourceImageUrl: '', externalUrl: ${JSON.stringify(c.url)} },`)
  }
  console.log('===CATALOG_TS_END===')
}

main().catch(e => { console.error(e); process.exit(1) })
