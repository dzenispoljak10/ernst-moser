#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Verkäufer in Sanity anlegen
 * ================================================
 * Sucht Roland Burkhalters Foto-Asset in Sanity und legt
 * das Verkäufer-Dokument an.
 *
 * Ausführen: node scripts/create-salesperson.js
 */

require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  console.log('\n👤  Verkäufer anlegen...\n')

  // Roland Burkhalters Foto-Asset suchen
  const photoAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename match "roland_burkhalter*"][0]{ _id, originalFilename }`
  )

  if (photoAsset) {
    console.log(`   Foto gefunden: ${photoAsset.originalFilename} (${photoAsset._id})`)
  } else {
    console.log('   ⚠️  Kein Foto-Asset für roland_burkhalter gefunden – wird ohne Foto angelegt.')
  }

  // Center-IDs holen
  const centers = await client.fetch(
    `*[_type == "center"]{ _id, name, slug }`
  )
  console.log(`   Centers: ${centers.map((c) => c.name).join(', ')}`)

  const nutzfahrzeugCenter = centers.find((c) => c.slug?.current === 'nutzfahrzeugcenter')
  const kommunalCenter = centers.find((c) => c.slug?.current === 'kommunalcenter')
  const motorgeraeteCenter = centers.find((c) => c.slug?.current === 'motorgeraetecenter')

  // Roland Burkhalter – Betriebsleiter Nutzfahrzeuge (Nutzfahrzeugcenter)
  const rolandDoc = {
    _id: 'salesperson-roland-burkhalter',
    _type: 'salesperson',
    firstName: 'Roland',
    lastName: 'Burkhalter',
    title: 'Betriebsleiter Nutzfahrzeuge',
    phone: '+41 (0)32 675 58 05',
    email: 'info@ernst-moser.ch',
    ...(photoAsset ? {
      photo: {
        _type: 'image',
        asset: {_type: 'reference', _ref: photoAsset._id},
      },
    } : {}),
    centers: [
      nutzfahrzeugCenter && {_type: 'reference', _ref: nutzfahrzeugCenter._id, _key: 'nutz'},
    ].filter(Boolean),
  }

  await client.createOrReplace(rolandDoc)
  console.log('   ✅  Roland Burkhalter → Nutzfahrzeugcenter')

  // Generischer Ansprechpartner für Kommunal- und Motorgerätecenter
  const kommunalDoc = {
    _id: 'salesperson-kommunal',
    _type: 'salesperson',
    firstName: 'Ihr',
    lastName: 'Ansprechpartner',
    title: 'Verkaufsberater Kommunal',
    phone: '+41 (0)32 675 58 05',
    email: 'kommunal@ernst-moser.ch',
    centers: [
      kommunalCenter && {_type: 'reference', _ref: kommunalCenter._id, _key: 'komm'},
    ].filter(Boolean),
  }
  await client.createOrReplace(kommunalDoc)
  console.log('   ✅  Ansprechpartner → Kommunalcenter')

  const motorDoc = {
    _id: 'salesperson-motor',
    _type: 'salesperson',
    firstName: 'Ihr',
    lastName: 'Ansprechpartner',
    title: 'Verkaufsberater Motorgeräte',
    phone: '+41 (0)32 675 58 05',
    email: 'motorgeraete@ernst-moser.ch',
    centers: [
      motorgeraeteCenter && {_type: 'reference', _ref: motorgeraeteCenter._id, _key: 'motor'},
    ].filter(Boolean),
  }
  await client.createOrReplace(motorDoc)
  console.log('   ✅  Ansprechpartner → Motorgerätecenter')

  console.log('\n🎉  Alle Verkäufer angelegt!\n')
}

main().catch((err) => {
  console.error('\n💥', err.message)
  process.exit(1)
})
