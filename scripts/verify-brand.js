#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  const brand = await client.fetch(
    `*[_type == "brand" && slug.current == "scania"][0]{
      _id, name, slug, tagline,
      "descBlocks": length(description),
      "highlightCount": length(highlights),
      "featureCount": length(features),
      "productCount": length(products),
      "hasHeroImage": heroImage != null,
      "hasLogo": logo != null,
      highlights[0]{ icon, label },
      features[0]{ icon, title },
      products[0]{ name, info }
    }`
  )
  console.log('\n✅ Scania in Sanity:\n', JSON.stringify(brand, null, 2))

  // Also check salesperson
  const sp = await client.fetch(
    `*[_type == "salesperson"]{ _id, firstName, lastName, title, "hasPhoto": photo != null, "centers": centers[]->{ name } }`
  )
  console.log('\n✅ Verkäufer:\n', JSON.stringify(sp, null, 2))
}

main().catch(console.error)
