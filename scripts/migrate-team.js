#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Team-Migration mit Fotos
 * ============================================
 * 1. Fotos von ernst-moser.ch herunterladen
 * 2. Zu WebP konvertieren (max 800px, 85% Qualität)
 * 3. Zu Sanity Assets hochladen
 * 4. teamMember-Dokumente anlegen/aktualisieren
 *
 * Ausführen: node scripts/migrate-team.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

const fs   = require('fs')
const path = require('path')
const https = require('https')
const http  = require('http')
const { createClient } = require('@sanity/client')
const sharp = require('sharp')

// ─── Konfiguration ────────────────────────────────────────────────────────────

const CACHE_DIR = path.resolve(__dirname, '..', '.migrate-cache', 'team')
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true })

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Team-Daten mit Foto-URLs ─────────────────────────────────────────────────
// Quelle: https://www.ernst-moser.ch/team-1715.html

const BASE = 'https://www.ernst-moser.ch/'

const TEAM = [
  {
    id: 'team-adrian-moser',
    firstName: 'Adrian', lastName: 'Moser',
    role: 'Geschäftsführer, Leitung Verkauf',
    email: 'adrian.moser@ernst-moser.ch',
    centerSlug: 'kommunalcenter',
    order: 1,
    photoUrl: BASE + 'assets/images/0/2560-1709-max-60200fa1.jpg',
    photoFile: 'adrian-moser.webp',
  },
  {
    id: 'team-roland-burkhalter',
    firstName: 'Roland', lastName: 'Burkhalter',
    role: 'Betriebsleiter Nutzfahrzeugcenter',
    email: 'roland.burkhalter@ernst-moser.ch',
    centerSlug: 'nutzfahrzeugcenter',
    order: 2,
    photoUrl: BASE + 'assets/images/5/2560-1709-max%20%2823%29-5122b4dc.jpg',
    photoFile: 'roland-burkhalter.webp',
  },
  {
    id: 'team-ernst-moser',
    firstName: 'Ernst', lastName: 'Moser',
    role: 'Springer',
    email: null,
    centerSlug: null,
    order: 3,
    photoUrl: BASE + 'assets/images/f/2560-1709-max%20%2813%29-9f9eb465.jpg',
    photoFile: 'ernst-moser.webp',
  },
  {
    id: 'team-michael-peter',
    firstName: 'Michael', lastName: 'Peter',
    role: 'Verkauf Leichtnutzfahrzeuge + Kommunalgeräte',
    email: 'michael.peter@ernst-moser.ch',
    centerSlug: 'nutzfahrzeugcenter',
    order: 4,
    photoUrl: BASE + 'assets/images/5/Foto-d845a2ec.jpg',
    photoFile: 'michael-peter.webp',
  },
  {
    id: 'team-raphael-maurer',
    firstName: 'Raphael', lastName: 'Maurer',
    role: 'Verkauf Robotertechnik + Motorgeräte',
    email: 'raphael.maurer@ernst-moser.ch',
    centerSlug: 'motorgeraetecenter',
    order: 5,
    photoUrl: BASE + 'assets/images/3/Raphael%20Maurer-a4a4e5d0.png',
    photoFile: 'raphael-maurer.webp',
  },
  {
    id: 'team-daniela-graef',
    firstName: 'Daniela', lastName: 'Gräf',
    role: 'Kaufmännische Angestellte',
    email: 'info@ernst-moser.ch',
    centerSlug: null,
    order: 6,
    photoUrl: BASE + 'assets/images/c/2560-1709-max%20%2811%29-8f12d298.jpg',
    photoFile: 'daniela-graef.webp',
  },
  {
    id: 'team-sibylle-moser',
    firstName: 'Sibylle', lastName: 'Moser',
    role: 'Kaufmännische Angestellte',
    email: 'info@ernst-moser.ch',
    centerSlug: null,
    order: 7,
    photoUrl: BASE + 'assets/images/8/2560-1709-max%20%2824%29-bec65a3c.jpg',
    photoFile: 'sibylle-moser.webp',
  },
  {
    id: 'team-romario-luethi',
    firstName: 'Romario', lastName: 'Lüthi',
    role: 'Werkstattleiter Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 8,
    photoUrl: BASE + 'assets/images/e/Romario%20f%C3%BCr%20Homepage-256af1fb.jpg',
    photoFile: 'romario-luethi.webp',
  },
  {
    id: 'team-lukas-zimmermann',
    firstName: 'Lukas', lastName: 'Zimmermann',
    role: 'Automobilfachmann Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 9,
    photoUrl: BASE + 'assets/images/5/2560-1709-max%20%2818%29-59aa384b.jpg',
    photoFile: 'lukas-zimmermann.webp',
  },
  {
    id: 'team-simon-raez',
    firstName: 'Simon', lastName: 'Räz',
    role: 'Mechatroniker Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 10,
    photoUrl: BASE + 'assets/images/2/2560-1709-max%20%2817%29-d487def4.jpg',
    photoFile: 'simon-raez.webp',
  },
  {
    id: 'team-lukas-bernhard',
    firstName: 'Lukas', lastName: 'Bernhard',
    role: 'Mechatroniker Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 11,
    photoUrl: BASE + 'assets/images/e/_DSC6731-656d74be.jpg',
    photoFile: 'lukas-bernhard.webp',
  },
  {
    id: 'team-janik-moser',
    firstName: 'Janik', lastName: 'Moser',
    role: 'Mechatroniker Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 12,
    photoUrl: BASE + 'assets/images/8/2560-1709-max%20%2816%29-caa99889.jpg',
    photoFile: 'janik-moser.webp',
  },
  {
    id: 'team-marco-niederberger',
    firstName: 'Marco', lastName: 'Niederberger',
    role: 'Mechatroniker Nutzfahrzeuge',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 13,
    photoUrl: BASE + 'assets/images/9/Marco%20f%C3%BCr%20Homepage-ed9bb27f.jpg',
    photoFile: 'marco-niederberger.webp',
  },
  {
    id: 'team-fabian-kuenzi',
    firstName: 'Fabian', lastName: 'Künzi',
    role: 'Motorgerätemechaniker',
    email: null,
    centerSlug: 'motorgeraetecenter',
    order: 14,
    photoUrl: BASE + 'assets/images/e/2560-1709-max%20%2814%29-4bb8a935.jpg',
    photoFile: 'fabian-kuenzi.webp',
  },
  {
    id: 'team-alex-fulga',
    firstName: 'Alex', lastName: 'Fulga',
    role: 'Kommunal- und Motorgerätemechaniker',
    email: null,
    centerSlug: 'kommunalcenter',
    order: 15,
    photoUrl: BASE + 'assets/images/6/_DSC6735-bdc1ee33.jpg',
    photoFile: 'alex-fulga.webp',
  },
  {
    id: 'team-muhamet-rexhepi',
    firstName: 'Muhamet', lastName: 'Rexhepi',
    role: 'Leichtnutzfahrzeuge- und Kommunalgerätemechaniker',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 16,
    photoUrl: BASE + 'assets/images/9/Foti%20Muhi%202023-2896d69f.jpg',
    photoFile: 'muhamet-rexhepi.webp',
  },
  {
    id: 'team-stefan-schoeni',
    firstName: 'Stefan', lastName: 'Schöni',
    role: 'Motorgerätemechaniker',
    email: null,
    centerSlug: 'motorgeraetecenter',
    order: 17,
    photoUrl: BASE + 'assets/images/c/Stefan%20Sch%C3%B6ni-7b0af6e0.png',
    photoFile: 'stefan-schoeni.webp',
  },
  {
    id: 'team-david-kerschbaum',
    firstName: 'David', lastName: 'Kerschbaum',
    role: 'Lernender Mechatroniker Nutzfahrzeuge (3. Lehrjahr)',
    email: null,
    centerSlug: 'nutzfahrzeugcenter',
    order: 18,
    photoUrl: BASE + 'assets/images/3/David%20Kerschbaum.%202jpg-6c73b9d6.jpg',
    photoFile: 'david-kerschbaum.webp',
  },
]

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    const req = proto.get(url, { timeout: 30000 }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        res.resume()
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`))
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

async function downloadAndConvert(url, webpFilename) {
  const cacheFile = path.join(CACHE_DIR, webpFilename + '.assetid')
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8').trim()
  }

  // Download
  const buffer = await downloadBuffer(url)

  // Convert to WebP (max 800px portrait)
  const webpBuffer = await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()

  // Upload to Sanity
  const asset = await client.assets.upload('image', webpBuffer, {
    filename: webpFilename,
    contentType: 'image/webp',
  })

  fs.writeFileSync(cacheFile, asset._id)
  return asset._id
}

// ─── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n👥  Team-Migration mit Fotos starten...\n')

  // Centers laden
  const centers = await client.fetch(`*[_type == "center"]{ _id, name, slug }`)
  const centerBySlug = {}
  for (const c of centers) centerBySlug[c.slug?.current] = c
  console.log(`   Centers: ${centers.map((c) => c.name).join(', ')}\n`)

  let ok = 0
  let errors = []

  for (const member of TEAM) {
    process.stdout.write(`   ⏳  ${member.firstName} ${member.lastName} – Foto herunterladen...`)

    let assetId = null
    try {
      assetId = await downloadAndConvert(member.photoUrl, member.photoFile)
      process.stdout.write(` hochgeladen (${assetId.slice(0, 20)}...)\n`)
    } catch (err) {
      process.stdout.write(` ⚠️  Fehler: ${err.message}\n`)
      errors.push({ name: `${member.firstName} ${member.lastName}`, error: err.message })
    }

    // Dokument erstellen/aktualisieren
    const center = member.centerSlug ? centerBySlug[member.centerSlug] : null

    const doc = {
      _id: member.id,
      _type: 'teamMember',
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      order: member.order,
      isActive: true,
      ...(member.email ? { email: member.email } : {}),
      ...(center ? { center: { _type: 'reference', _ref: center._id } } : {}),
      ...(assetId
        ? {
            photo: {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId },
              hotspot: { x: 0.5, y: 0.2, width: 0.6, height: 0.6 },
              crop: { top: 0, bottom: 0, left: 0, right: 0 },
            },
          }
        : {}),
    }

    await client.createOrReplace(doc)

    const centerLabel = center ? ` → ${center.name}` : ''
    const photoLabel = assetId ? ' ✅ Foto' : ' ⚠️ kein Foto'
    console.log(`   ✅  ${member.firstName} ${member.lastName}${centerLabel}${photoLabel}`)
    ok++
  }

  console.log(`\n🎉  Migration abgeschlossen: ${ok}/18 Mitglieder verarbeitet.\n`)

  if (errors.length > 0) {
    console.log('   ⚠️  Fehler:')
    for (const e of errors) console.log(`      - ${e.name}: ${e.error}`)
  }
}

main().catch((err) => {
  console.error('\n💥', err.message)
  process.exit(1)
})
