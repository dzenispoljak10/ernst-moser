import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const sps = await client.fetch(`*[_type=="salesperson"]{
  _id, firstName, lastName, title, email, phone,
  "centerSlugs": centers[]->slug.current
} | order(firstName asc)`)
console.log('=== SALESPERSONS ===')
console.log(JSON.stringify(sps, null, 2))

const brands = await client.fetch(`*[_type=="brand" && center->slug.current=="nutzfahrzeugcenter"]{
  _id, name, "slug": slug.current,
  "salesperson": salesperson->{_id, firstName, lastName, email}
} | order(slug asc)`)
console.log('\n=== NUTZFAHRZEUGCENTER BRANDS ===')
console.log(JSON.stringify(brands, null, 2))

const allBrandSlugs = await client.fetch(`*[_type=="brand"].slug.current`)
console.log('\n=== ALL BRAND SLUGS ===')
console.log(allBrandSlugs.sort())
