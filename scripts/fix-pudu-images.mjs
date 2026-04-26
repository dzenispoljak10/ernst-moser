#!/usr/bin/env node
/**
 * Fix Pudu — autoritative Bild-Zuordnung aus __NEXT_DATA__ von /de/products.
 *
 *   Quelle: https://www.pudurobotics.com/de/products
 *   Mapping: data.props.pageProps.initData.topNavProducts → title + mediaUrl
 *
 *   1. Lädt das exakte Pudu-Nav-Thumbnail je Produkt
 *   2. Konvertiert nach WebP @ 88 %
 *   3. Speichert in public/images/products/<slug>/main.webp
 *   4. Sanity: createOrReplace mit korrektem Bild
 *   5. T150 wird entfernt (nicht mehr auf pudurobotics.com vorhanden)
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  Accept: 'image/*',
  Referer: 'https://www.pudurobotics.com/',
}

// Autoritative URLs (Pudu __NEXT_DATA__ topNavProducts „Alle Produkte")
const PUDU = [
  { slug: 'pudu-bellabot', title: 'BellaBot', desc: 'Premium-Servierroboter — der ikonische Lieferroboter für Restaurants und Cafés.', img: 'https://cdn.pudutech.com/nav_product_bellabot_f807eb57b5.png' },
  { slug: 'pudu-bellabot-pro', title: 'BellaBot Pro', desc: 'Premium-Liefer- und Werberoboter mit erweiterter KI und neuem Design.', img: 'https://cdn.pudutech.com/nav_product_bella_pro_816bfa936e.png' },
  { slug: 'pudu-kettybot', title: 'KettyBot Pro', desc: 'Flexibler Multitasker — Begrüssungs- und Lieferroboter mit Werbe-Display für Gastronomie und Retail.', img: 'https://cdn.pudutech.com/nav_product_kettybotpro_27266c471c.png' },
  { slug: 'pudu-pudubot', title: 'PuduBot 2', desc: 'Allgemeiner Servierroboter — bewährte Plattform für vielseitige Liefer-Anwendungen.', img: 'https://cdn.pudutech.com/nav_product_pudubot2_478d35cdae.png' },
  { slug: 'pudu-flashbot', title: 'FlashBot Max', desc: 'Gebäudelieferexperte — autonom durch alle Etagen mit Aufzugsanbindung.', img: 'https://cdn.pudutech.com/nav_flashbot_new_e3c621b5fd.png' },
  { slug: 'pudu-robotics-pudu-cc1', title: 'PUDU CC1', desc: 'Intelligenter gewerblicher Reinigungsroboter — autonome Boden- und Staubreinigung.', img: 'https://cdn.pudutech.com/nav_product_cc1_8baf7f1424.png' },
  { slug: 'pudu-robotics-pudu-cc1-pro', title: 'PUDU CC1 Pro', desc: 'KI-gesteuerter autonomer Reinigungsroboter — Premium-Variante mit erweiterter Sensorik.', img: 'https://cdn.pudutech.com/nav_product_cc1_Pro_7de75f36ae.png' },
  { slug: 'pudu-robotics-pudu-mt1', title: 'PUDU MT1', desc: 'KI-gestützter Kehrroboter für vielseitige Bodenreinigungs-Anwendungen.', img: 'https://cdn.pudutech.com/nav_product_mt_9d40c8e237.webp' },
  { slug: 'pudu-robotics-pudu-mt1-vac', title: 'PUDU MT1 Vac', desc: 'KI-gestützter Kehr- und Staubsaugerroboter für gewerbliche Reinigung.', img: 'https://cdn.pudutech.com/nav_MT_1_Vac_ad6172aa60.png' },
  { slug: 'pudu-robotics-pudu-mt1-max', title: 'PUDU MT1 Max', desc: 'KI-gesteuerter 3D-Perzeptions-Reinigungsroboter — erweiterte MT1-Plattform für ausgedehnte Flächen.', img: 'https://cdn.pudutech.com/nav_MT_1_Max_c1c3a6b01b.png' },
  { slug: 'pudu-robotics-pudu-t300', title: 'PUDU T300', desc: 'Industrieller Lieferroboter mit hoher Nutzlast für Logistik und Krankenhaus-Einsatz.', img: 'https://cdn.pudutech.com/nav_product_0dd9c73f5a.png' },
]

const REMOVE_SLUGS = ['pudu-robotics-pudu-t150']

async function downloadImage(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`)
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 1024) throw new Error(`tiny: ${buf.length}`)
  return buf
}

async function main() {
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

  const brand = await client.fetch(
    `*[_type=="brand" && slug.current=="pudu-robotics"][0]{_id}`,
  )
  if (!brand) throw new Error('Pudu brand not found')

  // Stale-Cleanup: T150 entfernen
  for (const slug of REMOVE_SLUGS) {
    try {
      await client.delete(`product-${slug}`)
      console.log(`🗑  removed product-${slug}`)
    } catch {
      /* not present */
    }
    const dir = path.join(ROOT, 'public', 'images', 'products', slug)
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
  }
  console.log()

  for (const p of PUDU) {
    const dir = path.join(ROOT, 'public', 'images', 'products', p.slug)
    const out = path.join(dir, 'main.webp')
    fs.mkdirSync(dir, { recursive: true })
    try {
      const raw = await downloadImage(p.img)
      const webp = await sharp(raw)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toBuffer()
      fs.writeFileSync(out, webp)

      const asset = await client.assets.upload('image', webp, {
        filename: `${p.slug}.webp`,
      })
      await client.createOrReplace({
        _id: `product-${p.slug}`,
        _type: 'product',
        name: p.title,
        slug: { _type: 'slug', current: p.slug },
        brand: { _type: 'reference', _ref: brand._id },
        description: [
          {
            _type: 'block',
            _key: 'd1',
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: 's1', text: p.desc, marks: [] }],
          },
        ],
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      console.log(`✅ ${p.title.padEnd(20)} ${p.img.split('/').pop()}`)
    } catch (e) {
      console.error(`❌ ${p.title}: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
