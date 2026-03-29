#!/usr/bin/env node
/**
 * Ernst Moser GmbH – WordPress → Sanity Migration
 * ================================================
 * Liest das WordPress-XML-Export, lädt alle Bilder herunter,
 * konvertiert sie zu WebP und legt Centers + Marken in Sanity an.
 *
 * Ausführen: node scripts/migrate.js
 */

require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const {createClient} = require('@sanity/client')
const xml2js = require('xml2js')
const sharp = require('sharp')

// ─── Konfiguration ────────────────────────────────────────────────────────────

const CONFIG = {
  projectId: 'owqsc1ph',
  dataset: 'production',
  xmlFile: path.resolve(__dirname, '..', 'ernst-mosergmbh.WordPress.2026-03-28.xml'),
  cacheDir: path.resolve(__dirname, '..', '.migrate-cache'),
  image: {
    quality: 85,
    maxWidth: 1920,
    logoMaxWidth: 400,
  },
}

// ─── Marken → Center Zuordnung ────────────────────────────────────────────────

const CENTERS = [
  {
    _id: 'center-nutzfahrzeug',
    name: 'Nutzfahrzeugcenter',
    slug: 'nutzfahrzeugcenter',
    color: '#1B2D5B',
  },
  {
    _id: 'center-kommunal',
    name: 'Kommunalcenter',
    slug: 'kommunalcenter',
    color: '#C0392B',
  },
  {
    _id: 'center-motorgeraete',
    name: 'Motorgerätecenter',
    slug: 'motorgeraetecenter',
    color: '#4A7C59',
  },
]

const BRAND_CENTER = {
  // Nutzfahrzeugcenter
  scania:               'center-nutzfahrzeug',
  fiat:                 'center-nutzfahrzeug',
  isuzu:                'center-nutzfahrzeug',
  piaggio:              'center-nutzfahrzeug',
  ut:                   'center-nutzfahrzeug',
  dhollandia:           'center-nutzfahrzeug',
  wabco:                'center-nutzfahrzeug',
  // Kommunalcenter
  'alkè':               'center-kommunal',
  alke:                 'center-kommunal',
  baoli:                'center-kommunal',
  envitec:              'center-kommunal',
  greentec:             'center-kommunal',
  'gianni ferrari':     'center-kommunal',
  'gianni-ferrari':     'center-kommunal',
  hako:                 'center-kommunal',
  matev:                'center-kommunal',
  'ligier professional':'center-kommunal',
  'ligier-professional':'center-kommunal',
  ligier:               'center-kommunal',
  mulchy:               'center-kommunal',
  reform:               'center-kommunal',
  springer:             'center-kommunal',
  stema:                'center-kommunal',
  timan:                'center-kommunal',
  zaugg:                'center-kommunal',
  // Motorgerätecenter
  ambrogio:             'center-motorgeraete',
  erco:                 'center-motorgeraete',
  kaaz:                 'center-motorgeraete',
  makita:               'center-motorgeraete',
  nilfisk:              'center-motorgeraete',
  'pudu robotics':      'center-motorgeraete',
  'pudu-robotics':      'center-motorgeraete',
  pudu:                 'center-motorgeraete',
  segway:               'center-motorgeraete',
  stiga:                'center-motorgeraete',
  stihl:                'center-motorgeraete',
  swardman:             'center-motorgeraete',
  // Beide Center (Hilltip → Nutzfahrzeug bevorzugt; Kubota → Kommunal bevorzugt)
  hilltip:              'center-nutzfahrzeug',
  kubota:               'center-kommunal',
}

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function altTextFromFilename(filename) {
  const name = path.basename(filename, path.extname(filename))
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isLogo(filename) {
  return /logo/i.test(filename)
}

function centerIdForBrand(brandName) {
  const lower = brandName.toLowerCase().trim()
  // Exact match first
  if (BRAND_CENTER[lower]) return BRAND_CENTER[lower]
  // Partial match
  for (const [key, centerId] of Object.entries(BRAND_CENTER)) {
    if (lower.includes(key) || key.includes(lower)) return centerId
  }
  return 'center-nutzfahrzeug' // Fallback
}

function str(val) {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object' && val._) return val._
  return String(val)
}

// ─── Download ─────────────────────────────────────────────────────────────────

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    const req = proto.get(url, {timeout: 30000}, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        res.resume()
        return reject(new Error(`HTTP ${res.statusCode}`))
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

// ─── Bild verarbeiten (Download + WebP Konvertierung) ─────────────────────────

async function processImage(url, filename) {
  const logo = isLogo(filename)
  const maxWidth = logo ? CONFIG.image.logoMaxWidth : CONFIG.image.maxWidth

  let buffer
  try {
    buffer = await downloadBuffer(url)
  } catch (err) {
    throw new Error(`Download fehlgeschlagen: ${err.message}`)
  }

  // SVGs nicht konvertieren – direkt zurückgeben
  if (/\.svg$/i.test(filename)) {
    return {buffer, mime: 'image/svg+xml', webpFilename: filename}
  }

  const webpFilename = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp')

  const webpBuffer = await sharp(buffer)
    .resize({width: maxWidth, withoutEnlargement: true})
    .webp({quality: CONFIG.image.quality})
    .toBuffer()

  return {buffer: webpBuffer, mime: 'image/webp', webpFilename}
}

// ─── Sanity Client ────────────────────────────────────────────────────────────

function makeSanityClient() {
  const token = process.env.SANITY_TOKEN
  if (!token || token === 'sk...') {
    console.error('\n❌  SANITY_TOKEN nicht gesetzt!')
    console.error('   Kopiere .env.example → .env und trage deinen Token ein.')
    console.error('   Anleitung am Ende dieser Ausgabe.\n')
    process.exit(1)
  }
  return createClient({
    projectId: CONFIG.projectId,
    dataset: CONFIG.dataset,
    useCdn: false,
    apiVersion: '2024-01-01',
    token,
  })
}

// ─── Bild zu Sanity hochladen (mit Cache) ─────────────────────────────────────

async function uploadToSanity(client, url, filename, errors) {
  const cacheFile = path.join(CONFIG.cacheDir, slugify(filename) + '.json')

  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  }

  let processed
  try {
    processed = await processImage(url, filename)
  } catch (err) {
    errors.push({url, reason: err.message})
    return null
  }

  let asset
  try {
    asset = await client.assets.upload('image', processed.buffer, {
      filename: processed.webpFilename,
      contentType: processed.mime,
    })
  } catch (err) {
    errors.push({url, reason: `Sanity Upload: ${err.message}`})
    return null
  }

  const ref = {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt: altTextFromFilename(processed.webpFilename),
  }

  fs.writeFileSync(cacheFile, JSON.stringify(ref))
  return ref
}

// ─── XML parsen ───────────────────────────────────────────────────────────────

async function parseXml(filePath) {
  const xml = fs.readFileSync(filePath, 'utf8')
  const result = await xml2js.parseStringPromise(xml, {
    explicitArray: false,
    emptyTag: null,
    mergeAttrs: true,
  })
  const items = result?.rss?.channel?.item
  if (!items) return []
  return Array.isArray(items) ? items : [items]
}

// ─── Alle Bild-URLs aus dem XML sammeln ───────────────────────────────────────

function collectAllImageUrls(items) {
  const all = new Map() // url → filename

  for (const item of items) {
    const postType = str(item['wp:post_type'])
    const attachUrl = str(item['wp:attachment_url'])

    if (postType === 'attachment' && attachUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(attachUrl)) {
      const filename = path.basename(attachUrl)
      all.set(attachUrl, filename)
    }

    // Auch Bilder aus dem Content extrahieren
    const content = str(item['content:encoded'])
    if (content) {
      const matches = [...content.matchAll(/https?:\/\/test\.eprofis\.ch\/[^\s"'<>]+\.(jpg|jpeg|png|gif|webp)/gi)]
      for (const m of matches) {
        const u = m[0]
        all.set(u, path.basename(u))
      }
    }
  }

  return all // Map<url, filename>
}

// ─── Bilder einer Marke zuordnen ──────────────────────────────────────────────

function findImagesForBrand(brandName, brandPageId, attachmentsByParent, attachmentsByFilename) {
  const result = new Map() // url → filename

  // 1. Direkte Kinder-Attachments (parent = brand page ID)
  const children = attachmentsByParent.get(String(brandPageId)) || []
  for (const {url, filename} of children) result.set(url, filename)

  // 2. Attachments deren Dateiname den Brand-Slug enthält
  const slug = slugify(brandName)
  const slugParts = slug.split('-').filter((p) => p.length > 3)
  for (const [filename, {url}] of attachmentsByFilename) {
    const fLower = filename.toLowerCase()
    if (fLower.includes(slug) || slugParts.some((p) => fLower.includes(p))) {
      result.set(url, filename)
    }
  }

  return result
}

// ─── Portable Text aus HTML ───────────────────────────────────────────────────

function htmlToBlocks(html) {
  if (!html) return []
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö')
    .replace(/&uuml;/g, 'ü').replace(/&szlig;/g, 'ß')
    .trim()

  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: Math.random().toString(36).slice(2, 10), text: p, marks: []}],
  }))
}

// ─── Fortschrittsanzeige ──────────────────────────────────────────────────────

function progress(done, total, label) {
  const pct = Math.round((done / total) * 100)
  const bar = '█'.repeat(Math.floor(pct / 5)) + '░'.repeat(20 - Math.floor(pct / 5))
  process.stdout.write(`\r  [${bar}] ${pct}% – ${label.padEnd(50)}`)
}

// ─── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Ernst Moser GmbH – WordPress → Sanity Migration   ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  // Voraussetzungen prüfen
  if (!fs.existsSync(CONFIG.xmlFile)) {
    console.error(`❌  XML-Datei nicht gefunden: ${CONFIG.xmlFile}`)
    console.error('   Lege die WordPress-Export-Datei in den Projekt-Root und starte erneut.')
    process.exit(1)
  }

  if (!fs.existsSync(CONFIG.cacheDir)) fs.mkdirSync(CONFIG.cacheDir, {recursive: true})

  const client = makeSanityClient()
  const errors = []

  // ── 1. Centers anlegen ──────────────────────────────────────────────────────
  console.log('📍  Schritt 1/4 – Centers anlegen...')
  for (const center of CENTERS) {
    try {
      await client.createOrReplace({
        _id: center._id,
        _type: 'center',
        name: center.name,
        slug: {_type: 'slug', current: center.slug},
        color: center.color,
      })
      console.log(`   ✅  ${center.name}`)
    } catch (err) {
      console.error(`   ❌  ${center.name}: ${err.message}`)
      errors.push({stage: 'Center', name: center.name, reason: err.message})
    }
  }

  // ── 2. XML lesen ────────────────────────────────────────────────────────────
  console.log('\n📄  Schritt 2/4 – WordPress XML lesen...')
  const items = await parseXml(CONFIG.xmlFile)
  console.log(`   Gefunden: ${items.length} Einträge total`)

  const pages = items.filter((i) => ['page', 'post'].includes(str(i['wp:post_type'])))
  const attachments = items.filter((i) => str(i['wp:post_type']) === 'attachment')
  console.log(`   Seiten/Posts: ${pages.length}`)
  console.log(`   Anhänge:      ${attachments.length}`)

  // Attachment-Lookup-Maps aufbauen
  const attachmentsByParent = new Map()   // parentId → [{url, filename}]
  const attachmentsByFilename = new Map() // filename → {url}

  for (const att of attachments) {
    const url = str(att['wp:attachment_url'])
    if (!url || !/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) continue
    const filename = path.basename(url)
    const parentId = str(att['wp:post_parent'])

    if (!attachmentsByParent.has(parentId)) attachmentsByParent.set(parentId, [])
    attachmentsByParent.get(parentId).push({url, filename})
    attachmentsByFilename.set(filename.toLowerCase(), {url})
  }

  // Alle Bild-URLs sammeln
  const allImages = collectAllImageUrls(items)
  console.log(`   Bild-URLs gefunden: ${allImages.size}`)

  // ── 3. Alle Bilder hochladen ────────────────────────────────────────────────
  console.log(`\n🖼️   Schritt 3/4 – ${allImages.size} Bilder herunterladen, konvertieren & hochladen...`)
  const imageRefs = new Map() // url → ref

  let imgDone = 0
  const imgTotal = allImages.size

  for (const [url, filename] of allImages) {
    imgDone++
    progress(imgDone, imgTotal, `${imgDone}/${imgTotal} – ${filename.slice(0, 40)}`)

    const ref = await uploadToSanity(client, url, filename, errors)
    if (ref) imageRefs.set(url, ref)
  }

  process.stdout.write('\n')
  const uploaded = [...imageRefs.values()].length
  const skipped = imgDone - uploaded - errors.filter((e) => !e.stage).length
  console.log(`   ✅  ${uploaded} hochgeladen  |  ⏭️  ${skipped} übersprungen (Cache)  |  ❌  ${errors.filter((e) => !e.stage).length} Fehler`)

  // ── 4. Marken anlegen ───────────────────────────────────────────────────────
  console.log('\n🏷️   Schritt 4/4 – Marken anlegen...')

  // Seiten filtern: nur bekannte Marken
  const SKIP_TITLES = ['home', 'startseite', 'impressum', 'datenschutz', 'kontakt', 'agb',
    'sample page', 'über uns', 'ueber uns', 'news', 'aktuell', 'service', 'anfahrt',
    'jobs', 'karriere', 'galerie', 'gallery', 'blog', 'shop']

  const brandPages = pages.filter((p) => {
    const title = str(p['wp:post_title']).trim()
    if (!title) return false
    const lower = title.toLowerCase()
    if (SKIP_TITLES.some((s) => lower === s || lower.startsWith(s + ' '))) return false
    // Nur Seiten mit passendem Brand-Eintrag
    return centerIdForBrand(title) !== undefined
  })

  // Deduplizieren nach Titel
  const seenBrands = new Set()
  const uniqueBrands = brandPages.filter((p) => {
    const title = str(p['wp:post_title']).trim().toLowerCase()
    if (seenBrands.has(title)) return false
    seenBrands.add(title)
    return true
  })

  console.log(`   Marken erkannt: ${uniqueBrands.length}`)

  let brandsDone = 0
  for (const page of uniqueBrands) {
    const title = str(page['wp:post_title']).trim()
    const pageId = str(page['wp:post_id'])
    const slug = slugify(title)
    const centerId = centerIdForBrand(title)
    const content = str(page['content:encoded'])

    // Bilder für diese Marke zusammenstellen
    const brandImageMap = findImagesForBrand(title, pageId, attachmentsByParent, attachmentsByFilename)

    // Refs nachschlagen (nur hochgeladene)
    const brandRefs = []
    for (const [url] of brandImageMap) {
      const ref = imageRefs.get(url)
      if (ref) brandRefs.push({...ref, _key: Math.random().toString(36).slice(2, 10)})
    }

    // Logo = erstes Bild mit "logo" im Namen, sonst erstes Bild
    const logoRef = brandRefs.find((r) => r.alt && r.alt.toLowerCase().includes('logo'))
      || brandRefs[0]
    const heroRef = brandRefs.find((r) => r !== logoRef) || null
    const galleryRefs = brandRefs.filter((r) => r !== logoRef && r !== heroRef)

    const brandDoc = {
      _id: `brand-${slug}`.slice(0, 80),
      _type: 'brand',
      name: title,
      slug: {_type: 'slug', current: slug},
      center: {_type: 'reference', _ref: centerId},
      description: htmlToBlocks(content),
      ...(logoRef ? {logo: {_type: 'image', asset: logoRef.asset}} : {}),
      ...(heroRef ? {heroImage: {_type: 'image', asset: heroRef.asset}} : {}),
      ...(galleryRefs.length ? {images: galleryRefs.map((r) => ({_type: 'image', asset: r.asset, _key: r._key, alt: r.alt}))} : {}),
    }

    try {
      await client.createOrReplace(brandDoc)
      brandsDone++
      const centerName = CENTERS.find((c) => c._id === centerId)?.name || centerId
      console.log(`   ✅  ${title.padEnd(30)} → ${centerName}  (${brandRefs.length} Bilder)`)
    } catch (err) {
      console.error(`   ❌  ${title}: ${err.message}`)
      errors.push({stage: 'Brand', name: title, reason: err.message})
    }
  }

  // ── Zusammenfassung ─────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║                   Zusammenfassung                   ║')
  console.log('╚══════════════════════════════════════════════════════╝')
  console.log(`   Centers hochgeladen:  ${CENTERS.length}`)
  console.log(`   Bilder hochgeladen:   ${uploaded}`)
  console.log(`   Marken angelegt:      ${brandsDone}`)

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} Fehler aufgetreten:\n`)
    errors.forEach(({stage, name, url, reason}, i) => {
      console.log(`   ${i + 1}. [${stage || 'Bild'}] ${name || url}`)
      console.log(`      → ${reason}\n`)
    })
  } else {
    console.log('\n🎉  Migration erfolgreich abgeschlossen – keine Fehler!')
  }

  console.log('\n🔗  Sanity Studio öffnen: https://manage.sanity.io')
  console.log('    Oder lokal: cd studio && npm run dev\n')

  // ── Sanity Token Anleitung ──────────────────────────────────────────────────
  console.log('═'.repeat(56))
  console.log(' 🔑  So erstellst du deinen Sanity API Token:')
  console.log('═'.repeat(56))
  console.log(` 1.  Gehe zu https://manage.sanity.io`)
  console.log(` 2.  Wähle dein Projekt "ernst-moser" (${CONFIG.projectId})`)
  console.log(` 3.  Klicke links im Menü auf "API"`)
  console.log(` 4.  Wähle den Tab "Tokens"`)
  console.log(` 5.  Klicke auf "Add API token"`)
  console.log(` 6.  Name: z.B. "Migration Script"`)
  console.log(` 7.  Berechtigung: "Editor" auswählen`)
  console.log(` 8.  Klicke "Save" → Token wird angezeigt`)
  console.log(` 9.  Kopiere den Token (er wird nur EINMAL angezeigt!)`)
  console.log(` 10. Erstelle .env im Projekt-Root:`)
  console.log(`     cp .env.example .env`)
  console.log(`     Füge ein: SANITY_TOKEN=sk<dein-token>`)
  console.log(` 11. Starte das Script:`)
  console.log(`     node scripts/migrate.js`)
  console.log('═'.repeat(56) + '\n')
}

main().catch((err) => {
  console.error('\n💥  Fataler Fehler:', err.message)
  console.error(err.stack)
  process.exit(1)
})
