import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  ['pudu-bg1', 'BG1', 'Kompakter Reinigungsroboter für gewerbliche Böden – autonome Nass- und Trockenreinigung.'],
  ['pudu-bg1-pro', 'BG1 Pro', 'Profi-Reinigungsroboter der BG1-Serie mit erweiterter Reinigungsleistung und Ausdauer.'],
  ['pudu-cc1', 'CC1', 'Vielseitiger 4-in-1-Reinigungsroboter (Kehren, Schrubben, Saugen, Wischen) für Gewerbeflächen.'],
  ['pudu-cc1-pro', 'CC1 Pro', 'Premium-Variante des CC1 mit erweiterter Sensorik und höherer Reinigungseffizienz.'],
  ['pudu-mt1', 'MT1', 'Modularer Reinigungsroboter für unterschiedliche Bodenarten und Reinigungsaufgaben.'],
  ['pudu-mt1-max', 'MT1 Max', 'Erweiterte MT1-Plattform mit grösserem Reinigungswerkzeug für ausgedehnte Flächen.'],
  ['pudu-mt1-vac', 'MT1 Vac', 'MT1 mit integriertem Industriestaubsauger – autonomes Saugen und Reinigen in einem.'],
  ['pudu-sh1', 'SH1', 'Reinigungsroboter für die effiziente, autonome Pflege gewerblicher Hartböden.'],
  ['pudu-bellabot', 'BellaBot', 'Ikonischer Service-/Lieferroboter im Katzen-Design für Restaurants und Cafés.'],
  ['pudu-bellabot-pro', 'BellaBot Pro', 'Premium-Variante des BellaBot mit erweiterter KI und neuem Design.'],
  ['pudu-pudubot2', 'PuduBot 2', 'Bewährter Serviceroboter der nächsten Generation für vielseitige Liefer-Anwendungen.'],
  ['pudu-swiftbot', 'SwiftBot', 'Flexibler Serviceroboter mit offener Tablett-Plattform und smarter Navigation.'],
  ['pudu-flashbot', 'FlashBot', 'Autonomer Lieferroboter mit Aufzugsanbindung – ideal für Hotels und Bürogebäude.'],
  ['pudu-t300', 'T300', 'Industrieller Transport-/Lieferroboter mit hoher Nutzlast für Logistik und Industrie.'],
  ['pudu-t600', 'T600', 'Leistungsstarker Transportroboter für schwere Lasten im industriellen Materialfluss.'],
  ['pudu-kettybot-pro', 'KettyBot Pro', 'Begrüssungs- und Lieferroboter mit grossem Werbe-Display für Gastronomie und Retail.'],
]
const blocks = t => [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: t, marks: [] }] }]

const brand = await client.fetch(`*[_type=="brand" && slug.current=="pudu-robotics"][0]{_id}`)
if (!brand) throw new Error('pudu-robotics brand not found')
const keep = P.map(p => p[0])
const old = await client.fetch(`*[_type=="product" && brand->slug.current=="pudu-robotics" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep })
for (const o of old) { await client.delete(o._id); console.error(`deleted ${o._id}`) }

for (const [slug, name, desc] of P) {
  try {
    const ip = path.join(ROOT, 'public', 'images', 'products', slug, 'main.webp')
    const asset = await client.assets.upload('image', fs.readFileSync(ip), { filename: `${slug}.webp` })
    await client.createOrReplace({ _id: `product-${slug}`, _type: 'product', name, slug: { _type: 'slug', current: slug }, brand: { _type: 'reference', _ref: brand._id }, description: blocks(desc), mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    console.error(`OK ${slug}`)
  } catch (e) { console.error(`ERR ${slug}: ${e.message}`) }
}
