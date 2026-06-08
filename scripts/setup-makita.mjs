import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })
const MED = 'https://fi.makitamedia.com/images/3_Makita/301_machines/3011_a_GS1/30120_JPG_zoom/'

const P = [
  { slug: 'makita-bohrschrauber-li-ion-integriert', name: 'Bohrschrauber Li-Ion integriert', img: MED + 'DF001DW_C2L0.jpg', desc: 'Handliche Akku-Bohrschrauber mit fest integriertem Li-Ion-Akku – kompakt, leicht und ideal für Heimwerker sowie schnelle Schraub- und Bohrarbeiten.' },
  { slug: 'makita-bohrschrauber-li-ion-72v', name: 'Bohrschrauber Li-Ion 7.2V', img: MED + 'DF012DSE_C2L0.jpg', desc: 'Besonders leichte und kompakte 7,2-V-Akku-Bohrschrauber für feine Schraub- und Bohrarbeiten – perfekt für Montage und enge Stellen.' },
  { slug: 'makita-bohrschrauber-cxt-12v', name: 'Bohrschrauber CXT 12V max / 10.8V', img: MED + 'DF332DSMJ_C2L0.jpg', desc: 'Bohrschrauber der CXT-Plattform (12V max / 10.8V) – kompakt, ausgewogen und kraftvoll für Montage, Ausbau und den vielseitigen Einsatz.' },
  { slug: 'makita-bohrschrauber-lxt-18v', name: 'Bohrschrauber LXT 18V', img: MED + 'DDF482RFJ_C2L0.jpg', desc: 'Akku-Bohrschrauber der LXT-18V-Plattform – das weltweit grösste 18-V-System mit kraftvollen Bohr- und Schlagbohrschraubern für Profi und Heimwerker.' },
  { slug: 'makita-bohrschrauber-xgt-40v', name: 'Bohrschrauber XGT 40V max', img: MED + 'DF002GA202_C2L0.jpg', desc: 'Bohrschrauber der XGT-40V-max-Plattform – maximale Leistung und Ausdauer für anspruchsvollste Bohr- und Schraubarbeiten im professionellen Dauereinsatz.' },
]

async function dl(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.makita.ch/' }, redirect: 'follow' }); if (!r.ok) throw new Error('img HTTP ' + r.status); return Buffer.from(await r.arrayBuffer()) }
const blocks = t => [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: t, marks: [] }] }]

const brand = await client.fetch(`*[_type=="brand" && slug.current=="makita"][0]{_id}`)
if (!brand) throw new Error('makita brand not found')
const keep = P.map(p => p.slug)
const old = await client.fetch(`*[_type=="product" && brand->slug.current=="makita" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep })
for (const o of old) { await client.delete(o._id); fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.s), { recursive: true, force: true }); console.error(`deleted ${o._id}`) }

for (const p of P) {
  try {
    const raw = await dl(p.img)
    const webp = await sharp(raw).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
    const dir = path.join(ROOT, 'public', 'images', 'products', p.slug); fs.mkdirSync(dir, { recursive: true })
    const ip = path.join(dir, 'main.webp'); fs.writeFileSync(ip, webp)
    const asset = await client.assets.upload('image', fs.readFileSync(ip), { filename: `${p.slug}.webp` })
    await client.createOrReplace({ _id: `product-${p.slug}`, _type: 'product', name: p.name, slug: { _type: 'slug', current: p.slug }, brand: { _type: 'reference', _ref: brand._id }, description: blocks(p.desc), mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    console.error(`OK ${p.slug} (${Math.round(webp.length / 1024)}KB)`)
  } catch (e) { console.error(`ERR ${p.slug}: ${e.message}`) }
}
