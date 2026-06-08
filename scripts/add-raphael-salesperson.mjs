#!/usr/bin/env node
/**
 * Raphael Maurer als Ansprechperson (salesperson) einrichten.
 *
 *  1. Legt salesperson-raphael-maurer an (Foto vom Team-Doc, E-Mail, Telefon,
 *     zuständig für Motorgeräte- + Kommunalcenter).
 *  2. Setzt ihn als brand.salesperson auf 12 Marken
 *     (Stema, Zaugg, Ambrogio, Kaaz, Nilfisk, Segway, Stihl, Erco, Makita,
 *      Pudu, Stiga, Swardman).
 *  3. Setzt Telefonnummern bei den Team-Mitgliedern Raphael, Michael, Adrian, Roland.
 *
 * Run:
 *   node --env-file=.env.local scripts/add-raphael-salesperson.mjs
 */
import { createClient } from '@sanity/client'

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const RAPHAEL_ID = 'salesperson-raphael-maurer'
const RAPHAEL_PHONE = '+41 79 360 38 37'

// Foto-Asset stammt aus dem bestehenden Team-Doc von Raphael
const RAPHAEL_PHOTO = {
  _type: 'image',
  asset: { _type: 'reference', _ref: 'image-3e3ed2959c93ed5ef23c71dd70ab8d55159176db-600x600-webp' },
  crop: { _type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0 },
  hotspot: { _type: 'sanity.imageHotspot', x: 0.5, y: 0.2, width: 0.6, height: 0.6 },
}

const BRAND_IDS = [
  'brand-stema',
  'brand-zaugg',
  'brand-ambrogio',
  'brand-kaaz',
  'brand-nilfisk',
  'brand-segway',
  'brand-stihl',
  'brand-erco',
  'brand-makita',
  'brand-pudu-robotics',
  'brand-stiga',
  'brand-swardman',
]

// Team-Telefonnummern (Werte aus den salesperson-Docs übernommen)
const TEAM_PHONES = {
  'team-raphael-maurer': RAPHAEL_PHONE,
  'team-michael-peter': '+41 79 485 89 12',
  'team-adrian-moser': '+41 32 675 58 05',
  'team-roland-burkhalter': '+41 32 675 58 05',
}

async function main() {
  // ── 1. Salesperson-Doc anlegen ───────────────────────────────────────────
  await client.createOrReplace({
    _id: RAPHAEL_ID,
    _type: 'salesperson',
    firstName: 'Raphael',
    lastName: 'Maurer',
    title: 'Verkauf Robotertechnik + Motorgeräte',
    phone: RAPHAEL_PHONE,
    email: 'raphael.maurer@ernst-moser.ch',
    photo: RAPHAEL_PHOTO,
    centers: [
      { _key: 'motor', _type: 'reference', _ref: 'center-motorgeraete' },
      { _key: 'komm', _type: 'reference', _ref: 'center-kommunal' },
    ],
  })
  console.log(`✅ Salesperson angelegt: ${RAPHAEL_ID} (Tel ${RAPHAEL_PHONE})\n`)

  // ── 2. Marken auf Raphael umstellen ──────────────────────────────────────
  console.log('🏭 Marken-Zuordnung:')
  for (const id of BRAND_IDS) {
    await client
      .patch(id)
      .set({ salesperson: { _type: 'reference', _ref: RAPHAEL_ID } })
      .commit()
    console.log(`   ✅ ${id} → Raphael Maurer`)
  }
  console.log()

  // ── 3. Team-Telefonnummern setzen ────────────────────────────────────────
  console.log('📞 Team-Telefonnummern:')
  for (const [id, phone] of Object.entries(TEAM_PHONES)) {
    await client.patch(id).set({ phone }).commit()
    console.log(`   ✅ ${id} → ${phone}`)
  }
  console.log()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
