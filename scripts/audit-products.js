#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  const products = await client.fetch(`
    *[_type == "product"] | order(brand->name asc, name asc) {
      _id, name,
      "brandName": brand->name,
      "brandSlug": brand->slug.current,
      "imgFilename": mainImage.asset->originalFilename,
      "imgUrl": mainImage.asset->url
    }
  `)

  console.log(`\nTotal products: ${products.length}\n`)
  for (const p of products) {
    console.log(`[${p.brandName}] ${p.name}`)
    if (p.imgFilename) console.log(`  IMG: ${p.imgFilename}`)
  }
}
main().catch(console.error)
