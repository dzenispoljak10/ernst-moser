#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  // Summary of all brands
  const brands = await client.fetch(`
    *[_type == "brand"] | order(name asc) {
      name, slug,
      "hasHero": heroImage != null,
      "hasLogo": logo != null,
      "galleryCount": length(images),
      "center": center->slug.current
    }
  `)

  console.log('\n🖼️  BILD-ZUWEISUNG ÜBERSICHT\n')
  console.log('Marke'.padEnd(26), 'Center'.padEnd(22), 'Hero', 'Logo', 'Galerie')
  console.log('─'.repeat(75))

  for (const b of brands) {
    const hero = b.hasHero ? '✅' : '❌'
    const logo = b.hasLogo ? '✅' : '❌'
    console.log(
      b.name.padEnd(26),
      (b.center || '').padEnd(22),
      hero, ' ', logo, ' ',
      String(b.galleryCount || 0).padStart(2), 'Bilder'
    )
  }

  // Product count
  const products = await client.fetch(`*[_type == "product"]{ _id, name, "hasImg": mainImage != null, "brandName": brand->name }`)
  console.log(`\n📦  PRODUKTE TOTAL: ${products.length}`)
  console.log(`   Mit Hauptbild: ${products.filter(p => p.hasImg).length}`)
  console.log(`   Ohne Bild:     ${products.filter(p => !p.hasImg).length}`)

  // Group by brand
  const byBrand = {}
  for (const p of products) {
    const b = p.brandName || 'unknown'
    if (!byBrand[b]) byBrand[b] = 0
    byBrand[b]++
  }
  console.log('\n   Produkte pro Marke (Top 10):')
  Object.entries(byBrand).sort((a,b) => b[1]-a[1]).slice(0,10)
    .forEach(([n, c]) => console.log(`   ${String(c).padStart(3)}x  ${n}`))
}

main().catch(console.error)
