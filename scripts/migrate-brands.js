#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Schritt 4: Nur Marken anlegen
 * =================================================
 * Nutzt den Bild-Cache aus migrate.js – lädt keine Bilder erneut hoch.
 * Liest das WordPress-XML, erkennt Marken-Seiten und legt sie in Sanity an.
 *
 * Ausführen: node scripts/migrate-brands.js
 */

require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

const fs = require('fs')
const path = require('path')
const {createClient} = require('@sanity/client')
const xml2js = require('xml2js')

// ─── Konfiguration ────────────────────────────────────────────────────────────

const CONFIG = {
  projectId: 'owqsc1ph',
  dataset: 'production',
  xmlFile: path.resolve(__dirname, '..', 'ernst-mosergmbh.WordPress.2026-03-28.xml'),
  cacheDir: path.resolve(__dirname, '..', '.migrate-cache'),
}

// ─── Center-Definitionen ──────────────────────────────────────────────────────

const CENTERS = [
  {_id: 'center-nutzfahrzeug', name: 'Nutzfahrzeugcenter'},
  {_id: 'center-kommunal',     name: 'Kommunalcenter'},
  {_id: 'center-motorgeraete', name: 'Motorgerätecenter'},
]

// Slug → Center-Zuordnung (Schlüssel = exakter WP-Post-Slug)
const BRAND_CENTER = {
  // Nutzfahrzeugcenter
  scania:               'center-nutzfahrzeug',
  fiat:                 'center-nutzfahrzeug',
  isuzu:                'center-nutzfahrzeug',
  piaggio:              'center-nutzfahrzeug',
  ut:                   'center-nutzfahrzeug',
  dhollandia:           'center-nutzfahrzeug',
  wabco:                'center-nutzfahrzeug',
  hilltip:              'center-nutzfahrzeug',
  // Kommunalcenter
  kubota:               'center-kommunal',
  reform:               'center-kommunal',
  hako:                 'center-kommunal',
  baoli:                'center-kommunal',
  greentec:             'center-kommunal',
  springer:             'center-kommunal',
  zaugg:                'center-kommunal',
  envitec:              'center-kommunal',
  matev:                'center-kommunal',
  mulchy:               'center-kommunal',
  stema:                'center-kommunal',
  'gianni-ferrari':     'center-kommunal',
  alke:                 'center-kommunal',
  'ligier-professional':'center-kommunal',
  timan:                'center-kommunal',
  // Motorgerätecenter
  ambrogio:             'center-motorgeraete',
  erco:                 'center-motorgeraete',
  makita:               'center-motorgeraete',
  nilfisk:              'center-motorgeraete',
  'pudu-robotics':      'center-motorgeraete',
  segway:               'center-motorgeraete',
  stiga:                'center-motorgeraete',
  stihl:                'center-motorgeraete',
  swardman:             'center-motorgeraete',
  kaaz:                 'center-motorgeraete',
}

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function str(val) {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object' && val._) return val._
  return String(val)
}

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

// ─── Sanity Client ────────────────────────────────────────────────────────────

function makeSanityClient() {
  const token = process.env.SANITY_TOKEN
  if (!token || token === 'sk...') {
    console.error('\n❌  SANITY_TOKEN nicht gesetzt – .env prüfen.\n')
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

// ─── Bild-Cache laden ─────────────────────────────────────────────────────────

function loadImageRefsFromCache(cacheDir) {
  // Cache-Dateien enthalten JSON mit {_type, asset, alt}
  // Dateiname ist slugify(originalFilename) + '.json'
  // Wir lesen alle JSON-Dateien und bauen eine Map filename-slug → ref
  const refs = new Map()
  if (!fs.existsSync(cacheDir)) return refs

  for (const file of fs.readdirSync(cacheDir)) {
    if (!file.endsWith('.json')) continue
    try {
      const ref = JSON.parse(fs.readFileSync(path.join(cacheDir, file), 'utf8'))
      const key = file.replace(/\.json$/, '') // = slugify(filename)
      refs.set(key, ref)
    } catch {}
  }
  return refs
}

// ─── Bilder einer Marke zuordnen ──────────────────────────────────────────────

function findImagesForBrand(brandSlug, brandPageId, attachmentsByParent, attachmentsByFilename, imageRefsBySlug) {
  const result = []

  // 1. Direkte Kinder-Attachments (wp:post_parent = brand page ID)
  const children = attachmentsByParent.get(String(brandPageId)) || []
  for (const {url, filename} of children) {
    const fileSlug = slugify(filename.replace(/\.[^.]+$/, '')) // ohne Extension
    // Versuche anhand des Cache-Schlüssels zu finden
    const cacheKey = slugify(filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp'))
    const ref = imageRefsBySlug.get(cacheKey) || imageRefsBySlug.get(slugify(filename))
    if (ref) result.push(ref)
  }

  // 2. Attachments deren Dateiname den Brand-Slug enthält
  const slugParts = brandSlug.split('-').filter((p) => p.length > 3)
  for (const [fileLower, {filename, cacheKey}] of attachmentsByFilename) {
    if (fileLower.includes(brandSlug) || slugParts.some((p) => fileLower.includes(p))) {
      const ref = imageRefsBySlug.get(cacheKey)
      if (ref && !result.some((r) => r.asset?._ref === ref.asset?._ref)) {
        result.push(ref)
      }
    }
  }

  return result
}

// ─── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Ernst Moser GmbH – Schritt 4: Marken anlegen      ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  if (!fs.existsSync(CONFIG.xmlFile)) {
    console.error(`❌  XML-Datei nicht gefunden: ${CONFIG.xmlFile}`)
    process.exit(1)
  }

  const client = makeSanityClient()
  const errors = []

  // ── XML lesen ───────────────────────────────────────────────────────────────
  console.log('📄  XML lesen...')
  const items = await parseXml(CONFIG.xmlFile)
  console.log(`   ${items.length} Einträge total`)

  // Nur published pages
  const allPages = items.filter((i) => str(i['wp:post_type']) === 'page' && str(i['wp:status']) === 'publish')
  const attachments = items.filter((i) => str(i['wp:post_type']) === 'attachment')
  console.log(`   Published Pages: ${allPages.length}`)
  console.log(`   Attachments:     ${attachments.length}`)

  // ── Attachment-Lookups aufbauen ──────────────────────────────────────────────
  const attachmentsByParent  = new Map()   // parentId → [{url, filename}]
  const attachmentsByFilename = new Map()  // fileLower → {filename, cacheKey}

  for (const att of attachments) {
    const url = str(att['wp:attachment_url'])
    if (!url || !/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) continue
    const filename = path.basename(url)
    const parentId = str(att['wp:post_parent'])

    if (!attachmentsByParent.has(parentId)) attachmentsByParent.set(parentId, [])
    attachmentsByParent.get(parentId).push({url, filename})

    // Cache-Schlüssel = slugify(webp-Dateiname)
    const webpName = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp')
    const cacheKey = slugify(webpName)
    attachmentsByFilename.set(filename.toLowerCase(), {filename, cacheKey})
  }

  // ── Bild-Cache laden ─────────────────────────────────────────────────────────
  console.log('\n🗃️   Bild-Cache laden...')
  const imageRefsBySlug = loadImageRefsFromCache(CONFIG.cacheDir)
  console.log(`   ${imageRefsBySlug.size} gecachte Bilder gefunden`)

  // ── Marken erkennen ──────────────────────────────────────────────────────────
  console.log('\n🏷️   Marken aus XML erkennen...')

  // BUG-FIX: Titel ist im RSS-Standard-Feld 'title', nicht 'wp:post_title'
  // BUG-FIX: Marken per exaktem Slug aus BRAND_CENTER erkennen (kein Fallback)
  const seenSlugs = new Set()
  const brandPages = []

  for (const page of allPages) {
    const title = str(page['title']).trim()          // ← FIX: 'title' statt 'wp:post_title'
    const wpSlug = str(page['wp:post_name']).trim()  // z.B. 'scania', 'gianni-ferrari'

    if (!title || !wpSlug) continue
    if (seenSlugs.has(wpSlug)) continue              // Duplikate überspringen

    const centerId = BRAND_CENTER[wpSlug]            // exakter Slug-Match
    if (!centerId) continue                           // keine Marke → überspringen

    seenSlugs.add(wpSlug)
    brandPages.push({page, title, wpSlug, centerId})
  }

  console.log(`   Marken erkannt: ${brandPages.length}`)
  brandPages.forEach(({title, wpSlug, centerId}) => {
    const centerName = CENTERS.find((c) => c._id === centerId)?.name || centerId
    console.log(`   • ${title.padEnd(25)} [${wpSlug}] → ${centerName}`)
  })

  // ── Marken anlegen ───────────────────────────────────────────────────────────
  console.log('\n📤  Marken in Sanity anlegen...')
  let done = 0

  for (const {page, title, wpSlug, centerId} of brandPages) {
    const pageId  = str(page['wp:post_id'])
    const content = str(page['content:encoded'])
    const slug    = slugify(title)

    // Bilder für diese Marke zusammenstellen
    const brandRefs = findImagesForBrand(wpSlug, pageId, attachmentsByParent, attachmentsByFilename, imageRefsBySlug)

    // Logo = erstes Bild mit "logo" im Alt-Text, sonst erstes Bild
    const logoRef  = brandRefs.find((r) => r.alt?.toLowerCase().includes('logo')) || brandRefs[0]
    const heroRef  = brandRefs.find((r) => r !== logoRef) || null
    const galleryRefs = brandRefs.filter((r) => r !== logoRef && r !== heroRef)

    const brandDoc = {
      _id: `brand-${slug}`.slice(0, 80),
      _type: 'brand',
      name: title,
      slug: {_type: 'slug', current: slug},
      center: {_type: 'reference', _ref: centerId},
      description: htmlToBlocks(content),
      ...(logoRef  ? {logo:      {_type: 'image', asset: logoRef.asset}} : {}),
      ...(heroRef  ? {heroImage: {_type: 'image', asset: heroRef.asset}} : {}),
      ...(galleryRefs.length ? {images: galleryRefs.map((r) => ({
        _type: 'image',
        asset: r.asset,
        _key: Math.random().toString(36).slice(2, 10),
        alt: r.alt,
      }))} : {}),
    }

    try {
      await client.createOrReplace(brandDoc)
      done++
      const centerName = CENTERS.find((c) => c._id === centerId)?.name || centerId
      console.log(`   ✅  ${title.padEnd(25)} → ${centerName}  (${brandRefs.length} Bilder)`)
    } catch (err) {
      console.error(`   ❌  ${title}: ${err.message}`)
      errors.push({name: title, reason: err.message})
    }
  }

  // ── Zusammenfassung ──────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║                   Zusammenfassung                   ║')
  console.log('╚══════════════════════════════════════════════════════╝')
  console.log(`   Marken angelegt: ${done} / ${brandPages.length}`)

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} Fehler:\n`)
    errors.forEach(({name, reason}) => console.log(`   • ${name}: ${reason}\n`))
  } else {
    console.log('\n🎉  Alle Marken erfolgreich angelegt!')
  }

  console.log('\n🔗  Sanity Studio: cd studio && npm run dev\n')
}

main().catch((err) => {
  console.error('\n💥  Fataler Fehler:', err.message)
  console.error(err.stack)
  process.exit(1)
})
