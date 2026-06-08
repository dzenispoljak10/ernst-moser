import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  { slug: 'swardman-edwin', name: 'Swardman Edwin', from: 'swardman-swardman-edwin-2-1-45', desc: 'Swardman Edwin – modularer Benzin-Spindelmäher für perfekten Zier-, Sport- und Greenrasen. Dank austauschbarer Einheiten vielseitig (Mähen, Vertikutieren, Bürsten u. a.).' },
  { slug: 'swardman-electra', name: 'Swardman Electra', from: 'swardman-swardman-electra-2-0-45', desc: 'Swardman Electra – akkubetriebener Spindelmäher für höchste Schnittqualität, leise und emissionsfrei. Modulares System mit wechselbaren Einheiten.' },
]
const KEEP = P.map(p => p.slug)
const blocks = t => [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: t, marks: [] }] }]

const brand = await client.fetch(`*[_type=="brand" && slug.current=="swardman"][0]{_id}`)
if (!brand) throw new Error('swardman brand not found')

// Bilder kopieren (vor dem Löschen der Quell-Ordner)
for (const p of P) {
  const src = path.join(ROOT, 'public', 'images', 'products', p.from, 'main.webp')
  const dir = path.join(ROOT, 'public', 'images', 'products', p.slug); fs.mkdirSync(dir, { recursive: true })
  fs.copyFileSync(src, path.join(dir, 'main.webp'))
}

// alte löschen (alles ausser KEEP)
const old = await client.fetch(`*[_type=="product" && brand->slug.current=="swardman" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep: KEEP })
for (const o of old) { await client.delete(o._id); fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.s), { recursive: true, force: true }); console.error(`deleted ${o._id}`) }

for (const p of P) {
  const ip = path.join(ROOT, 'public', 'images', 'products', p.slug, 'main.webp')
  const asset = await client.assets.upload('image', fs.readFileSync(ip), { filename: `${p.slug}.webp` })
  await client.createOrReplace({ _id: `product-${p.slug}`, _type: 'product', name: p.name, slug: { _type: 'slug', current: p.slug }, brand: { _type: 'reference', _ref: brand._id }, description: blocks(p.desc), mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
  console.error(`OK ${p.slug}`)
}
