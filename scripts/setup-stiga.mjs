import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const NEW = [
  { slug: 'stiga-park', name: 'Stiga Park', img: 'https://www.stiga.com/media/catalog/product/cache/2ef6bf211fea48094bf634ee80ab3bd5/a/6/a6b9ae739f69e990986fda95851a0f0858a01483_PARK500_2F6120545ST2_full01_web.jpeg', desc: 'Stiga Park – knickgelenktes Frontmäher-System für präzises Mähen rund um Hindernisse. Ganzjährig vielseitig dank zahlreicher Anbaugeräte.' },
  { slug: 'stiga-aufsitzmaeher', name: 'Stiga Aufsitzmäher', img: 'https://www.stiga.com/media/catalog/product/cache/2ef6bf211fea48094bf634ee80ab3bd5/0/0/00460a41e84c36b9127e7ecb1fe9829fbfbf8eb5_Estate384e_fullgallery01_web.jpeg', desc: 'Stiga Aufsitzmäher und Rasentraktoren (Estate, Tornado) für komfortables Mähen grösserer Flächen – als Benzin- und Akku-Modelle (ePower).' },
]
// Bestehendes Produkt umbenennen → handgeführter Mäher
const KEEP_RENAME = { slug: 'stiga-rasenmaeher', name: 'Stiga Handgeführte Mäher', desc: 'Handgeführte Stiga Rasenmäher für kleine bis mittlere Gärten – erhältlich als Benzin-, Akku- und Elektromodelle.' }

const KEEP = ['stiga-park', 'stiga-aufsitzmaeher', 'stiga-rasenmaeher']
const blocks = t => [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: t, marks: [] }] }]

async function dl(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.stiga.com/' }, redirect: 'follow' }); if (!r.ok) throw new Error('HTTP ' + r.status); return Buffer.from(await r.arrayBuffer()) }

const brand = await client.fetch(`*[_type=="brand" && slug.current=="stiga"][0]{_id}`)
if (!brand) throw new Error('stiga brand not found')

// löschen (alles ausser KEEP)
const old = await client.fetch(`*[_type=="product" && brand->slug.current=="stiga" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep: KEEP })
for (const o of old) { await client.delete(o._id); fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.s), { recursive: true, force: true }); console.error(`deleted ${o._id}`) }

// neue Produkte
for (const p of NEW) {
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

// handgeführt umbenennen (Bild bleibt)
await client.patch(`product-${KEEP_RENAME.slug}`).set({ name: KEEP_RENAME.name, description: blocks(KEEP_RENAME.desc) }).commit()
console.error(`renamed ${KEEP_RENAME.slug} -> ${KEEP_RENAME.name}`)
