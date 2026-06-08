import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const files = [
  'public/video/isuzu-trucks.mp4',
  ...fs.readdirSync('public/dokumentation').filter(f => f.endsWith('.pdf')).map(f => 'public/dokumentation/' + f),
  ...fs.readdirSync('public/pdfs/mulchy').filter(f => f.endsWith('.pdf')).map(f => 'public/pdfs/mulchy/' + f),
]

const map = {}
for (const f of files) {
  const buf = fs.readFileSync(f)
  const filename = path.basename(f)
  const asset = await client.assets.upload('file', buf, { filename })
  const key = '/' + f.replace(/^public\//, '')
  map[key] = asset.url
  console.error(`OK ${Math.round(buf.length / 1024 / 1024)}MB ${key} -> ${asset.url}`)
}
fs.writeFileSync('scripts/asset-map.json', JSON.stringify(map, null, 2))
console.error('MAP written: scripts/asset-map.json (' + Object.keys(map).length + ' assets)')
