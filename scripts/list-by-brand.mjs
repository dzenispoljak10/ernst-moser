import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })
for (const b of ['fiat','hako','stiga','ambrogio','kubota','alk','stihl','nilfisk']) {
  const r = await client.fetch(`*[_type=="product" && brand->slug.current==$b]{ "slug": slug.current, name } | order(slug asc)`, { b })
  console.log(`\n=== ${b} (${r.length}) ===`)
  for (const p of r) console.log(`  ${p.slug}  —  ${p.name}`)
}
