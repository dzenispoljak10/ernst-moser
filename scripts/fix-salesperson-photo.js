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
  // Find all roland_burkhalter assets
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename match "roland_burkhalter*"]{ _id, originalFilename, url, metadata { dimensions } }`
  )
  console.log('Roland assets:', JSON.stringify(assets, null, 2))

  // Use the largest one
  const best = assets.sort((a, b) => {
    const aW = a.metadata?.dimensions?.width ?? 0
    const bW = b.metadata?.dimensions?.width ?? 0
    return bW - aW
  })[0]

  if (!best) { console.log('No asset found'); return }
  console.log('Using:', best._id, best.originalFilename)

  await client.patch('salesperson-roland-burkhalter').set({
    photo: { _type: 'image', asset: { _type: 'reference', _ref: best._id } }
  }).commit()
  console.log('✅ Updated Roland photo to best quality:', best._id)
}

main().catch(console.error)
