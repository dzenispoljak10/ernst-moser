import { createClient } from '@sanity/client'
const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})
const want = ['isuzu', 'pudu', 'swardman']
for (const w of want) {
  const r = await client.fetch(`
    *[_type=="product" && (slug.current match $q || name match $q)]{
      "slug": slug.current, name, "brand": brand->slug.current
    } | order(slug asc)
  `, { q: `*${w}*` })
  console.log(`\n=== ${w} ===`)
  for (const p of r) console.log(`  ${p.brand}/${p.slug}  —  ${p.name}`)
}
