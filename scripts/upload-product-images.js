#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Produktbilder aus Sanity-Assets zuweisen
 * =============================================================
 * Die Bilder sind bereits alle in Sanity hochgeladen.
 * Dieses Script verknüpft die Inline-Produkte (brand.products[])
 * mit den korrekten Sanity-Image-Assets via originalFilename-Lookup.
 *
 * Ausführen: node scripts/upload-product-images.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Produktbild-Mapping ─────────────────────────────────────────────────────
// match: Substring des Produktnamens (case-insensitive)
// file:  Substring des Sanity originalFilename (case-insensitive, ohne Pfad)

const PRODUCT_IMAGES = {

  // ═══ NUTZFAHRZEUGCENTER ══════════════════════════════════════════════════

  scania: [
    { match: 'R-Serie',   file: 'ready-built' },
    { match: 'S-Serie',   file: 'image.img_.90' },
    { match: 'P-Serie',   file: 'Scania.jpeg' },
    { match: 'G-Serie',   file: 'scaniag450-3akipper-dunkel' },
    { match: 'L-Serie',   file: '23166-067' },
    { match: 'BEV',       file: 'scania-17020-037' },
  ],

  fiat: [
    { match: 'E-Ducato',  file: 'e-ducato' },
    { match: 'Ducato',    file: 'ducato-768x' },
    { match: 'Doblò',     file: 'doblo-300x' },
    { match: 'Scudo',     file: 'e-scudo' },
    { match: 'Fiorino',   file: 'ducato-mca-choose' },
  ],

  isuzu: [
    { match: 'D-Max 4×4', file: 'Isuzu-Dmax-blau' },
    { match: 'D-Max 4×2', file: 'pickupdmax' },
    { match: 'NLR',        file: 'Landi-Lohn-Isuzu-NLR' },
    { match: 'NMR',        file: 'Serie-N-35Ton' },
    { match: 'F-Serie',    file: 'isuzu-truck-3-5-ton' },
  ],

  piaggio: [
    { match: 'Porter 700',      file: 'kipper-rgwsx09' },
    { match: 'Porter Electric', file: 'Piaggio-Commercial-UK-1' },
    { match: 'Ape TM',          file: 'chassis' },
    { match: 'Ape E-City',      file: 'pickup-rgwsx17' },
  ],

  ut: [
    { match: 'Transporter', file: '68f8a088691bb_3_absetzkipper_gigant_klein' },
    { match: 'Kipper',       file: 'Knickarm-Absetzkipper-GIGANT-180K' },
    { match: 'Pritsche',     file: 'absetzkipper_banner' },
  ],

  dhollandia: [
    { match: 'DH-QL',  file: 'dholandia-img2-1' },
    { match: 'DH-AM',  file: '724_4' },
    { match: 'DH-PS',  file: '2J8A3508' },
    { match: 'DH-EC',  file: '1209659180' },
  ],

  wabco: [
    { match: 'ABS',      file: 'WABCO_logo' },
    { match: 'EBS',      file: 'wabco-etrailer' },
    { match: 'AEBS',     file: 'csm_6_01_c628a2c33a' },
    { match: 'OptiFlow', file: 'lkw-OptiFlow-AutoTail' },
  ],

  hilltip: [
    { match: '600L',        file: 'IceStriker-blog' },
    { match: '1000L',       file: 'SnowStriker-VP-340x220' },
    { match: 'SnowStriker', file: 'SnowStriker-VMP-pickup' },
    { match: 'IceStriker',  file: 'hilltip1' },
  ],

  // ═══ KOMMUNALCENTER ══════════════════════════════════════════════════════

  alk: [
    { match: 'ATX 320E', file: 'staedtische-elektrofahrzeuge-alke' },
    { match: 'ATX 340E', file: 'elektrische-industriefahrzeuge-alke' },
    { match: 'ATX 330E', file: 'offroad-fahrzeuge-ohne-emissionen-alke' },
  ],

  baoli: [
    { match: 'KBD',  file: 'Baoli_Internal_Combustion_Truck_KBD' },
    { match: 'KBG',  file: 'Baoli_KBR_14-16-20' },
    { match: 'KBE',  file: 'Multifunction-Vehicle_Produktoverview' },
    { match: 'KBS',  file: 'Baoli_Pallet-Stacker_KBS' },
    { match: 'KBP',  file: 'Baoli_KBP_14H' },
  ],

  envitec: [
    { match: '0.3',       file: 'ENS-50-a' },
    { match: '0.6/0.8',   file: 'ENS1150H' },
    { match: 'Schleuder', file: 'ENS2100R' },
    { match: 'ENS1060',   file: 'ENS1060H' },
    { match: 'Sole',      file: 'inox3-large' },
  ],

  greentec: [
    { match: 'HFS',       file: 'Spider-620-PLUS-featured' },
    { match: 'RM 2800',   file: 'boom-mowers-cover-image' },
    { match: 'HC 260',    file: 'Scorpion-630-PLUS-Featured' },
    { match: 'Mulchkopf', file: 'FOX-Featured-image' },
  ],

  'gianni-ferrari': [
    { match: 'Turbo 4',      file: 'Gianni_Ferrari-Turbo4-gallery-5' },
    { match: 'Super Roller', file: 'gianni-ferrari-gsr_1' },
    { match: 'PG 210',       file: 'Gianni_Ferrari-PG-PGXPRO' },
  ],

  hako: [
    { match: 'Citymaster',   file: 'csm_CM-400' },
    { match: 'Hakomatic',    file: 'csm_M31_Teaser' },
    { match: 'Sweepmaster',  file: 'csm_Aussenreinigungsmaschine-citymaster-1650-ze' },
    { match: 'Hakotrac',     file: 'csm_240626-HAKO_Multicar_M41' },
  ],

  kubota: [
    { match: 'BX',    file: 'gr2120-action-01' },
    { match: 'B ',    file: 'lx401-action' },
    { match: 'L ',    file: 'z4-541-studio-01-1' },
    { match: 'F ',    file: 'f-serie' },
    { match: 'G ',    file: 'z1-421-studio-01-1' },
  ],

  matev: [
    { match: 'Kehr',        file: 'swe-16-57-frontkehrmaschine' },
    { match: 'Schneefräse', file: 'nh-jd-ki-winterdienst' },
    { match: 'Kehrsaug',    file: 'mrm-120-as-saugkehrsystem' },
    { match: 'Streu',       file: 'spr-ds-600-st-schleuderstreuer' },
  ],

  'ligier-professional': [
    { match: 'JS50',    file: 'ligier_pulse_3_action_02' },
    { match: 'Pulse 4', file: 'ligier_pulse_4_action_03' },
  ],

  mulchy: [
    { match: 'PTO', file: 'Balkenmaeher-WM-600-BR' },
    { match: 'TR',  file: 'Schlegel-Mulchmaeher-TTR-680-Hauptbild-transparent.png.webp' },
  ],

  reform: [
    { match: 'Motormäher', file: 'csm_motech-rm16-fingerbalken' },
    { match: 'Mounty',     file: 'csm_MetracH75_WEB_01' },
    { match: 'Muli',       file: 'csm_Muli-T15V' },
  ],

  springer: [
    { match: '0.3',        file: 'Produktfoto_TSS' },
    { match: '0.6/0.8',    file: 'header-mobil-springer-anbau' },
    { match: 'Schleuder',  file: 'Streuautomat-AS-150-280' },
    { match: 'SD-211',     file: 'SD-211' },
    { match: 'STA-550',    file: 'STA-550' },
    { match: 'ASE-250',    file: 'ASE-250' },
    { match: 'Solestreuer',file: 'Kombi-Solestreuer' },
    { match: 'TSS',        file: 'TSS-1200' },
  ],

  stema: [
    { match: 'MAK-17',          file: 'Einachser-MAK-17' },
    { match: 'KAM-13',          file: 'Kombimaschine-KAM-13' },
    { match: 'TTR-680',         file: 'Schlegel-Mulchmaeher-TTR-680-Hauptbild-transparent.png.webp' },
    { match: 'Aufsitz',         file: 'Aufsitz-Wildwuchsmaeher' },
    { match: 'Wildkrautbürste', file: 'Wildkrautbuerste' },
    { match: 'Wildkrautbrenn',  file: 'Wildkrautbrenner' },
  ],

  timan: [
    { match: 'Forst',  file: 'tool-trac' },
    { match: 'Kipper', file: 'RC-751_im_Einsatz' },
  ],

  zaugg: [
    { match: 'SF 75',       file: 'csm_zaugg-ag-eggiwil-schneefraese' },
    { match: 'SF 165',      file: 'leiserag-winterdienstanbaugeraete-schneefraese' },
    { match: 'Schneepflug', file: 'kd619_zaugg-schneepflug' },
    { match: 'Schneekan',   file: 'csm_Zaugg_G16_Schneepflug' },
  ],

  // ═══ MOTORGERÄTECENTER ═══════════════════════════════════════════════════

  ambrogio: [
    { match: 'L15',    file: 'mulching_1520x1040' },
    { match: 'L30',    file: '40-ELITE-RTK-4WD' },
    { match: 'L85',    file: 'AmbrogioRobotVerde' },
    { match: 'Twenty', file: 'Amico_1520x1040' },
  ],

  erco: [
    { match: 'Kleintrak',   file: 'erco_es_660pia' },
    { match: 'Motormäher',  file: 'ES_622-scaled' },
    { match: 'Holzspalter', file: 'ES-670EP-R' },
  ],

  kaaz: [
    { match: 'LM 5360', file: 'handrasenmaeher_benzin_kaaz' },
    { match: 'LM 4630', file: '1073208-2024-09-25' },
    { match: 'FG 550',  file: '2513269-2024-12-16' },
  ],

  makita: [
    { match: 'DLM532', file: '389339_20250930' },
    { match: 'DUH602', file: 'F551995.0100' },
    { match: 'DUC254', file: 'JR001GZ_C2L0' },
    { match: 'DUB363', file: 'DF001DW_C2L0' },
  ],

  nilfisk: [
    { match: 'Core 140',  file: 'nilfisk_mc2c_high-pressure' },
    { match: 'Alto P160', file: 'stationary-pressure-washers' },
    { match: 'VL200',     file: 'nilfisk-vp300-vacumm' },
    { match: 'SW 5500',   file: 'nilfisk_sw3000_sweeper' },
  ],

  'pudu-robotics': [
    { match: 'BellaBot',  file: 'nav_product_bellabot' },
    { match: 'KettyBot',  file: 'nav_product_kettybotpro' },
    { match: 'HolaBot',   file: 'nav_product_holabot' },
    { match: 'FlashBot',  file: 'nav_flashbot_new' },
  ],

  segway: [
    { match: 'H500', file: 'navimow-h-serie-hebesensor' },
    { match: 'H800', file: 'navimow-x-serie' },
    { match: 'i105', file: 'Segway-Navimow-i-Series' },
  ],

  stiga: [
    { match: 'Twinclip',  file: 'park_700_wx' },
    { match: 'Estate',    file: '2528739-2025-02-20_08-58' },
    { match: 'Autoclip',  file: '2528746-2025-02-20_09-02' },
    { match: 'SWIFT',     file: '2528733-2025-02-20_08-57' },
  ],

  stihl: [
    { match: 'MS 261',  file: 'Stihl_MS_362_h' },
    { match: 'FS 55',   file: '77813' },
    { match: 'BG 50',   file: '15857-1024' },
    { match: 'iMOW',    file: '117560_rma448pv' },
    { match: 'HSA 94',  file: '0_Hauptbild-min' },
  ],

  swardman: [
    { match: 'Electra', file: '1da253b3-7add-48bc' },
    { match: 'Edwin',   file: '9c42c3f4-2362-491f' },
    { match: 'Greens',  file: 'd8f2cb14-0074-44a7' },
  ],
}

// ─── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Produktbilder aus Sanity-Assets zuweisen          ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  // 1. Alle Sanity-Assets laden und nach originalFilename indexieren
  console.log('Lade alle Sanity-Image-Assets…')
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset"]{ _id, originalFilename }`
  )
  console.log(`${assets.length} Assets gefunden\n`)

  // Lookup: lowercase substring → asset._id (erster Treffer)
  // Index by stripping extensions and lowercasing
  const assetIndex = new Map()
  for (const a of assets) {
    if (!a.originalFilename) continue
    const lower = a.originalFilename.toLowerCase()
    // Store full filename (lowercase) → _id
    assetIndex.set(lower, a._id)
    // Also store without extension
    const noExt = lower.replace(/\.(webp|jpg|jpeg|png|gif|avif)$/, '')
    if (!assetIndex.has(noExt)) assetIndex.set(noExt, a._id)
  }

  // Lookup: find asset by substring match in filename
  function findAsset(fileSubstring) {
    const sub = fileSubstring.toLowerCase()
    // Exact match first
    if (assetIndex.has(sub)) return assetIndex.get(sub)
    // Substring match
    for (const [key, id] of assetIndex) {
      if (key.includes(sub)) return id
    }
    return null
  }

  // 2. Alle Marken mit Inline-Produkten laden
  const brands = await client.fetch(`
    *[_type == "brand" && defined(products) && count(products) > 0]{
      _id, name, "slug": slug.current,
      products[]{ _key, name, info, image }
    }
  `)

  console.log(`${brands.length} Marken mit Inline-Produkten\n`)

  let totalUpdated = 0
  let totalSkipped = 0
  let totalNoMatch = 0

  for (const brand of brands) {
    const slug = brand.slug
    const mappings = PRODUCT_IMAGES[slug]
    if (!mappings) {
      console.log(`── ${brand.name} (${slug}): kein Mapping, übersprungen`)
      continue
    }

    console.log(`\n── ${brand.name} (${slug}) ──`)

    const patch = client.patch(brand._id)
    let hasPatch = false

    for (const prod of brand.products) {
      // Skip if already has image
      if (prod.image?.asset?._ref) {
        console.log(`   ⏩  ${prod.name} – bereits verknüpft`)
        totalSkipped++
        continue
      }

      // Find matching rule
      const nameLower = prod.name.toLowerCase()
      const rule = mappings.find(r => nameLower.includes(r.match.toLowerCase()))

      if (!rule) {
        console.log(`   ⚠️  ${prod.name} – kein Regel-Match`)
        totalNoMatch++
        continue
      }

      // Find asset
      const assetId = findAsset(rule.file)
      if (!assetId) {
        console.log(`   ❌  ${prod.name} → "${rule.file}" – Asset nicht in Sanity gefunden`)
        totalNoMatch++
        continue
      }

      patch.set({
        [`products[_key == "${prod._key}"].image`]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      })
      hasPatch = true
      console.log(`   ✅  ${prod.name} → ${assetId}`)
      totalUpdated++
    }

    if (hasPatch) {
      try {
        await patch.commit()
        console.log(`   💾  Gespeichert`)
      } catch (err) {
        console.log(`   💥  Fehler: ${err.message}`)
      }
    }
  }

  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║                   Zusammenfassung                   ║')
  console.log('╚══════════════════════════════════════════════════════╝')
  console.log(`   Verknüpft:   ${totalUpdated}`)
  console.log(`   Übersprungen: ${totalSkipped}`)
  console.log(`   Kein Match:  ${totalNoMatch}`)
  console.log('\n🎉  Fertig!\n')
}

main().catch(err => {
  console.error('\n💥', err.message)
  process.exit(1)
})
