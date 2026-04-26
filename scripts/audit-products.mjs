import { createClient } from '@sanity/client'

if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})

const products = await client.fetch(`
  *[_type=="product"]{
    _id,
    name,
    "slug": slug.current,
    "brand": brand->{name, "slug": slug.current},
    "hasDescription": defined(description) && length(description) > 0,
    "descTextLen": length(pt::text(description))
  } | order(brand.name asc, name asc)
`)

const noDesc = products.filter(p => !p.hasDescription || (p.descTextLen ?? 0) < 30)
console.log(`Total products: ${products.length}`)
console.log(`Without description (or <30 chars): ${noDesc.length}\n`)
for (const p of noDesc) {
  console.log(`  [${p.brand?.slug ?? '?'}] ${p.slug}  —  ${p.name}  (len=${p.descTextLen ?? 0})`)
}
