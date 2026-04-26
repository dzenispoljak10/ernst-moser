import { createClient } from '@sanity/client'
const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})
const products = await client.fetch(`
  *[_type=="product" && brand->slug.current=="ecotech"]{
    "slug": slug.current,
    name,
    "descText": pt::text(description)
  } | order(slug asc)
`)
for (const p of products) {
  const t = (p.descText ?? '').slice(0, 120).replace(/\s+/g, ' ')
  console.log(`${p.slug}\n  → ${t}\n`)
}
