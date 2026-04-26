#!/usr/bin/env node
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const STIGA = [
  { slug: 'stiga-park-aufsitzmaeher', title: 'Stiga Park & Aufsitzmäher', desc: 'Vielseitige Aufsitzmäher und Park-Mäher mit zahlreichen Anbaugeräten — vom Mähen bis zum Schneeräumen.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/fafe3e239573205debf65ff81a47da00350fb6c0-704x520.webp' },
  { slug: 'stiga-akku-power', title: 'Stiga ePower Akku', desc: 'Das ePower-Akkusystem für über 25 Stiga-Geräte — leise, emissionsfrei und kompromisslos leistungsstark.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/07e2fb09ea248dde82bbcf34f39d40c67a264011-704x495.webp' },
  { slug: 'stiga-maehroboter', title: 'Stiga Mähroboter', desc: 'Stiga Autonom-Mäher mit Begrenzungskabel oder GPS — automatische Rasenpflege ohne Aufwand.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/7a8b94ce931824adac616ef192e64ecf8064531e-704x481.webp' },
  { slug: 'stiga-rasenmaeher', title: 'Stiga Rasenmäher', desc: 'Klassische Rasenmäher mit Benzin- und Akkuantrieb für jeden Garten.', img: 'https://cdn.sanity.io/images/owqsc1ph/production/7747cef28da98e80731e59b4db91089ac522f6e9-704x456.webp' },
]

async function main() {
  const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="stiga"][0]{_id}`)
  if (!brand) throw new Error('Stiga brand not found')

  for (const p of STIGA) {
    const dir = path.join(ROOT, 'public', 'images', 'products', p.slug)
    const out = path.join(dir, 'main.webp')
    fs.mkdirSync(dir, { recursive: true })
    const r = await fetch(p.img, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const buf = Buffer.from(await r.arrayBuffer())
    const webp = await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
    fs.writeFileSync(out, webp)
    const asset = await client.assets.upload('image', webp, { filename: `${p.slug}.webp` })
    await client.createOrReplace({
      _id: `product-${p.slug}`, _type: 'product', name: p.title,
      slug: { _type: 'slug', current: p.slug },
      brand: { _type: 'reference', _ref: brand._id },
      description: [{ _type: 'block', _key: 'd1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: p.desc, marks: [] }] }],
      mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    })
    console.log(`✅ ${p.title}`)
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
