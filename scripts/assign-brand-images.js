#!/usr/bin/env node
/**
 * Ernst Moser – Brand Image Assignment
 * =====================================
 * Liest die WordPress XML, analysiert Elementor JSON,
 * weist Bilder korrekt zu: hero, logo, gallery, products
 *
 * Ausführen: node scripts/assign-brand-images.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })

const fs   = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const { createClient } = require('@sanity/client')

// ─── Config ───────────────────────────────────────────────────────────────────

const XML_FILE   = path.resolve(__dirname, '..', 'ernst-mosergmbh.WordPress.2026-03-28.xml')
const CACHE_DIR  = path.resolve(__dirname, '..', '.migrate-cache')
const SANITY_PROJECT = 'owqsc1ph'

// Brand slug → Sanity brand doc ID
const BRAND_CENTER = {
  scania:                'center-nutzfahrzeug',
  fiat:                  'center-nutzfahrzeug',
  isuzu:                 'center-nutzfahrzeug',
  piaggio:               'center-nutzfahrzeug',
  ut:                    'center-nutzfahrzeug',
  dhollandia:            'center-nutzfahrzeug',
  wabco:                 'center-nutzfahrzeug',
  hilltip:               'center-nutzfahrzeug',
  alk:                   'center-kommunal',
  baoli:                 'center-kommunal',
  envitec:               'center-kommunal',
  greentec:              'center-kommunal',
  'gianni-ferrari':      'center-kommunal',
  hako:                  'center-kommunal',
  kubota:                'center-kommunal',
  matev:                 'center-kommunal',
  'ligier-professional': 'center-kommunal',
  mulchy:                'center-kommunal',
  reform:                'center-kommunal',
  springer:              'center-kommunal',
  stema:                 'center-kommunal',
  timan:                 'center-kommunal',
  zaugg:                 'center-kommunal',
  ambrogio:              'center-motorgeraete',
  erco:                  'center-motorgeraete',
  kaaz:                  'center-motorgeraete',
  makita:                'center-motorgeraete',
  nilfisk:               'center-motorgeraete',
  'pudu-robotics':       'center-motorgeraete',
  segway:                'center-motorgeraete',
  stiga:                 'center-motorgeraete',
  stihl:                 'center-motorgeraete',
  swardman:              'center-motorgeraete',
}

// WordPress page slugs that match each brand (some differ from Sanity slug)
const WP_TO_SANITY_SLUG = {
  alke: 'alk',  // WP slug is 'alke', Sanity is 'alk'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
}

function str(v) {
  if (!v) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'object' && v._) return v._
  return String(v)
}

// Load all cache entries: filename-slug → {asset: {_ref}}
function loadCache(dir) {
  const map = new Map()
  if (!fs.existsSync(dir)) return map
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue
    try {
      const ref = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
      map.set(f.replace(/\.json$/,''), ref)  // key = slugified filename without ext
    } catch {}
  }
  return map
}

// Given a full WP image URL, find the best matching Sanity ref from cache
function findCacheRef(wpUrl, cache) {
  if (!wpUrl) return null
  const filename = path.basename(wpUrl)
  // Try variants: original, webp, different sizes
  const base = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
  const baseSlug = slugify(base)

  // 1. Try exact slugified filename
  const webpKey = slugify(filename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp'))
  if (cache.has(webpKey)) return cache.get(webpKey)

  // 2. Try without size suffix (e.g. image-300x200 → image)
  const noSize = baseSlug.replace(/-\d+x\d+$/, '')
  const noSizeWebp = noSize + '-webp'
  if (cache.has(noSizeWebp)) return cache.get(noSizeWebp)
  if (cache.has(slugify(filename.replace(/\.(jpg|jpeg|png|gif)$/i,'')))) {
    return cache.get(slugify(filename.replace(/\.(jpg|jpeg|png|gif)$/i,'')))
  }

  // 3. Try original json key
  const origKey = slugify(filename)
  if (cache.has(origKey)) return cache.get(origKey)

  // 4. Partial match: find cache keys that contain the base slug
  if (noSize.length > 5) {
    for (const [k, v] of cache) {
      if (k.includes(noSize) && !k.includes('-150x') && !k.includes('-300x') && !k.includes('-1024x') && !k.includes('-1536x')) {
        return v
      }
    }
    // Best full-res match
    for (const [k, v] of cache) {
      if (k.includes(noSize)) return v
    }
  }

  return null
}

// Extract all image URLs from Elementor JSON string
function extractElementorImages(jsonStr) {
  if (!jsonStr) return []
  const images = []

  // Match all image URL patterns in Elementor JSON
  const urlPattern = /"url"\s*:\s*"(https:\/\/test\.eprofis\.ch\/wp-content\/uploads\/[^"]+)"/g
  let m
  while ((m = urlPattern.exec(jsonStr)) !== null) {
    images.push(m[1])
  }

  return [...new Set(images)]
}

// Parse Elementor JSON to find structured image roles
function analyzeElementorImages(jsonStr, brandSlug) {
  if (!jsonStr) return { hero: null, logo: null, products: [], gallery: [] }

  let parsed
  try { parsed = JSON.parse(jsonStr) } catch { return { hero: null, logo: null, products: [], gallery: [] } }

  const result = { hero: null, logo: null, products: [], gallery: [] }

  // Flatten all widgets recursively
  function walk(nodes, depth) {
    if (!nodes || !Array.isArray(nodes)) return
    for (const node of nodes) {
      // Check background images (hero candidates - first section at depth 0)
      if (depth === 0 && node.settings) {
        const bgImg = node.settings.background_image?.url ||
                      node.settings.background_overlay_image?.url
        if (bgImg && !result.hero) result.hero = bgImg
      }

      // Check widget images
      if (node.elType === 'widget') {
        const ws = node.settings || {}

        // Image widget
        if (node.widgetType === 'image' || node.widgetType === 'theme-post-featured-image') {
          const imgUrl = ws.image?.url
          if (imgUrl) {
            const fn = path.basename(imgUrl).toLowerCase()
            // Logo detection
            if (fn.includes('logo') || fn.includes('_logo') || fn.includes('-logo')) {
              if (!result.logo) result.logo = imgUrl
            } else {
              result.gallery.push(imgUrl)
            }
          }
        }

        // Heading widget that might indicate a product section
        if (node.widgetType === 'heading') {
          const title = ws.title || ws.text || ''
          if (title && title.length > 2 && title.length < 80) {
            // This might be a product title - store for context
            result._lastHeading = title
          }
        }
      }

      walk(node.elements, depth + 1)
    }
  }

  walk(parsed, 0)
  return result
}

// Make a Sanity image reference object
function sanityImg(ref, key) {
  if (!ref?.asset?._ref) return null
  const obj = { _type: 'image', asset: { _type: 'reference', _ref: ref.asset._ref } }
  if (key) obj._key = key
  return obj
}

function randKey() { return Math.random().toString(36).slice(2,10) }

function block(text) {
  return {
    _type: 'block', _key: randKey(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: randKey(), text, marks: [] }]
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║   Ernst Moser – Brand Image Assignment                      ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  const token = process.env.SANITY_TOKEN
  if (!token) { console.error('❌  SANITY_TOKEN fehlt'); process.exit(1) }

  const sanity = createClient({
    projectId: SANITY_PROJECT, dataset: 'production',
    useCdn: false, apiVersion: '2024-01-01', token
  })

  // ── Load cache ─────────────────────────────────────────────────────────────
  console.log('🗃️   Bild-Cache laden...')
  const cache = loadCache(CACHE_DIR)
  console.log(`   ${cache.size} gecachte Assets\n`)

  // ── Parse XML ──────────────────────────────────────────────────────────────
  console.log('📄  XML parsen...')
  const xmlContent = fs.readFileSync(XML_FILE, 'utf8')
  const parsed = await xml2js.parseStringPromise(xmlContent, {
    explicitArray: false, emptyTag: null, mergeAttrs: true
  })
  const allItems = parsed.rss.channel.item
  const items = Array.isArray(allItems) ? allItems : [allItems]

  const pages = items.filter(i => str(i['wp:post_type']) === 'page' && str(i['wp:status']) === 'publish')
  const attachments = items.filter(i => str(i['wp:post_type']) === 'attachment')
  console.log(`   ${pages.length} Seiten, ${attachments.length} Attachments\n`)

  // Build attachment lookup: parentId → list of {url, filename}
  const byParent = new Map()
  for (const att of attachments) {
    const url = str(att['wp:attachment_url'])
    if (!url || !/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) continue
    const pid = str(att['wp:post_parent'])
    if (!byParent.has(pid)) byParent.set(pid, [])
    byParent.get(pid).push({ url, filename: path.basename(url), id: str(att['wp:post_id']) })
  }

  // ── Get all brands from Sanity ─────────────────────────────────────────────
  console.log('📥  Marken aus Sanity laden...')
  const brands = await sanity.fetch(
    `*[_type == "brand"]{ _id, name, slug, heroImage, logo, images, "center": center->slug.current }`
  )
  console.log(`   ${brands.length} Marken gefunden\n`)

  const brandBySlug = {}
  for (const b of brands) brandBySlug[b.slug.current] = b

  // ── Process each brand page ────────────────────────────────────────────────
  const results = []

  for (const page of pages) {
    const wpSlug = str(page['wp:post_name'])
    const sanitySlug = WP_TO_SANITY_SLUG[wpSlug] || wpSlug

    if (!BRAND_CENTER[sanitySlug]) continue  // Not a brand page

    const brand = brandBySlug[sanitySlug]
    if (!brand) {
      console.log(`   ⚠️  Brand nicht in Sanity: ${sanitySlug}`)
      continue
    }

    const pageId = str(page['wp:post_id'])
    const title = str(page.title)

    // Get metas
    const metas = Array.isArray(page['wp:postmeta']) ? page['wp:postmeta'] : (page['wp:postmeta'] ? [page['wp:postmeta']] : [])
    const elemMeta = metas.find(m => str(m['wp:meta_key']) === '_elementor_data')
    const elemJson = elemMeta ? str(elemMeta['wp:meta_value']) : ''

    // Get child attachments for this page
    const children = byParent.get(pageId) || []

    // Analyze Elementor to find image roles
    const roles = analyzeElementorImages(elemJson, sanitySlug)

    // All image URLs mentioned in Elementor
    const elemUrls = extractElementorImages(elemJson)

    // Combine: elementor URLs + child attachments
    const allUrls = [...new Set([...elemUrls, ...children.map(c => c.url)])]

    // Resolve all URLs to Sanity refs
    const resolved = []
    for (const url of allUrls) {
      const ref = findCacheRef(url, cache)
      if (ref) resolved.push({ url, ref, filename: path.basename(url).toLowerCase() })
    }

    // ── Assign roles ─────────────────────────────────────────────────────────

    // HERO: first background image OR first non-logo large image
    let heroRef = roles.hero ? findCacheRef(roles.hero, cache) : null
    if (!heroRef) {
      // Use first child image that's not a logo
      const nonLogo = resolved.find(r => !r.filename.includes('logo'))
      if (nonLogo) heroRef = nonLogo.ref
    }

    // LOGO: image containing 'logo' in filename
    let logoRef = roles.logo ? findCacheRef(roles.logo, cache) : null
    if (!logoRef) {
      const logoMatch = resolved.find(r => r.filename.includes('logo'))
      if (logoMatch) logoRef = logoMatch.ref
    }
    // If still no logo, try cache directly by brand slug + logo
    if (!logoRef) {
      for (const [k, v] of cache) {
        if (k.startsWith(sanitySlug) && k.includes('logo')) {
          logoRef = v; break
        }
        // Also try brand name partial
        const brandNameSlug = slugify(title)
        if (k.startsWith(brandNameSlug) && k.includes('logo')) {
          logoRef = v; break
        }
      }
    }

    // GALLERY: all remaining images (not hero, not logo)
    const heroAssetRef = heroRef?.asset?._ref
    const logoAssetRef = logoRef?.asset?._ref
    const galleryRefs = resolved
      .filter(r => {
        const ref = r.ref?.asset?._ref
        if (!ref) return false
        if (ref === heroAssetRef) return false
        if (ref === logoAssetRef) return false
        if (r.filename.includes('logo')) return false
        if (r.filename.includes('roland_burkhalter')) return false
        if (r.filename.includes('neustes-foto') || r.filename.includes('firma')) return false
        return true
      })
      .slice(0, 12)  // max 12 gallery images

    // ── Build product documents from Elementor headings + images ─────────────
    const products = extractProducts(elemJson, sanitySlug, brand._id, cache)

    results.push({
      brand,
      heroRef,
      logoRef,
      galleryRefs,
      products,
      stats: {
        total: allUrls.length,
        resolved: resolved.length,
        gallery: galleryRefs.length,
        products: products.length,
        hasHero: !!heroRef,
        hasLogo: !!logoRef,
      }
    })
  }

  // ── Write to Sanity ────────────────────────────────────────────────────────
  console.log('📤  In Sanity schreiben...\n')

  let total = 0, skipped = 0

  for (const r of results) {
    const { brand, heroRef, logoRef, galleryRefs, products, stats } = r

    const patch = {}

    if (heroRef && !brand.heroImage) {
      patch.heroImage = sanityImg(heroRef)
    } else if (heroRef) {
      patch.heroImage = sanityImg(heroRef)  // always update to best image
    }

    if (logoRef) {
      patch.logo = sanityImg(logoRef)
    }

    if (galleryRefs.length > 0) {
      patch.images = galleryRefs.map((r, i) => ({
        ...sanityImg(r.ref, `gal-${i}-${randKey()}`),
        alt: brand.name,
      })).filter(Boolean)
    }

    // Update brand
    if (Object.keys(patch).length > 0) {
      try {
        await sanity.patch(brand._id).set(patch).commit()
        total++
      } catch (err) {
        console.error(`   ❌  ${brand.name}: ${err.message}`)
        skipped++
        continue
      }
    }

    // Create/update product documents
    let prodCreated = 0
    for (const prod of products) {
      try {
        await sanity.createOrReplace(prod)
        prodCreated++
      } catch (err) {
        // ignore product errors silently
      }
    }

    const s = stats
    const heroIcon  = s.hasHero ? '🖼️' : '  '
    const logoIcon  = s.hasLogo ? '🏷️' : '  '
    console.log(`   ✅  ${brand.name.padEnd(25)} ${heroIcon} Hero  ${logoIcon} Logo  📸 ${String(s.gallery).padStart(2)} Galerie  📦 ${String(prodCreated).padStart(2)} Produkte`)
  }

  console.log(`\n╔═══════════════════════════════════╗`)
  console.log(`║  Marken aktualisiert: ${String(total).padStart(3)}         ║`)
  console.log(`║  Übersprungen:        ${String(skipped).padStart(3)}         ║`)
  console.log(`╚═══════════════════════════════════╝\n`)
}

// ─── Extract Products from Elementor JSON ─────────────────────────────────────

function extractProducts(elemJson, brandSlug, brandId, cache) {
  if (!elemJson) return []

  let parsed
  try { parsed = JSON.parse(elemJson) } catch { return [] }

  const products = []
  let currentHeading = null
  let currentImages = []
  let currentDesc = ''

  function randKey() { return Math.random().toString(36).slice(2,10) }

  function block(text) {
    return {
      _type: 'block', _key: randKey(), style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: randKey(), text, marks: [] }]
    }
  }

  function slugify(t) {
    return t.toLowerCase()
      .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
  }

  function flushProduct() {
    if (!currentHeading || currentHeading.length < 3 || currentHeading.length > 60) return
    // Skip generic headings
    const skip = ['nutzfahrzeuge', 'kommunalcenter', 'motorgerätecenter', 'nutzfahrzeugcenter',
                  'produkte', 'modelle', 'leistungen', 'service', 'über', 'galerie',
                  'kontakt', 'home', 'mehr erfahren', 'dieselfahrzeuge', 'elektrofahrzeuge',
                  'hybridfahrzeuge', 'gas', 'scania', 'fiat', 'isuzu', 'piaggio', 'kubota',
                  'hako', 'stihl', 'makita', 'stiga', 'ambrogio', 'segway', 'reform']
    if (skip.some(s => currentHeading.toLowerCase().includes(s))) {
      currentHeading = null; currentImages = []; currentDesc = ''; return
    }

    const slug = `${brandSlug}-${slugify(currentHeading)}`.slice(0, 80)
    const mainImg = currentImages[0]
    const otherImgs = currentImages.slice(1)

    const doc = {
      _id: `product-${slug}`,
      _type: 'product',
      name: currentHeading,
      slug: { _type: 'slug', current: slug },
      brand: { _type: 'reference', _ref: brandId },
      ...(currentDesc ? { description: [block(currentDesc)] } : {}),
      ...(mainImg ? { mainImage: { _type: 'image', asset: { _type: 'reference', _ref: mainImg.asset._ref } } } : {}),
    }

    if (otherImgs.length > 0) {
      doc.images = otherImgs.slice(0, 4).map((img, i) => ({
        _type: 'image', _key: `pi-${i}-${randKey()}`,
        asset: { _type: 'reference', _ref: img.asset._ref }
      }))
    }

    products.push(doc)
    currentHeading = null; currentImages = []; currentDesc = ''
  }

  function walk(nodes, depth) {
    if (!nodes || !Array.isArray(nodes)) return

    for (const node of nodes) {
      if (node.elType === 'widget') {
        const ws = node.settings || {}

        if (node.widgetType === 'heading') {
          const raw = (ws.title || ws.text || '').replace(/<[^>]+>/g, '').trim()
          if (raw && raw.length > 2) {
            // Save previous product if we had one
            if (currentHeading) flushProduct()
            currentHeading = raw
            currentImages = []
            currentDesc = ''
          }
        }

        if (node.widgetType === 'image') {
          const imgUrl = ws.image?.url
          if (imgUrl && currentHeading) {
            const fn = path.basename(imgUrl).toLowerCase()
            if (!fn.includes('logo')) {
              const ref = findCacheRef(imgUrl, cache)
              if (ref) currentImages.push(ref)
            }
          }
        }

        if (node.widgetType === 'text-editor' || node.widgetType === 'theme-post-content') {
          const raw = (ws.editor || ws.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          if (raw && raw.length > 20 && raw.length < 500 && currentHeading) {
            currentDesc = raw
          }
        }
      }

      walk(node.elements, depth + 1)
    }
  }

  walk(parsed, 0)
  if (currentHeading) flushProduct()

  return products.slice(0, 12)  // max 12 products per brand
}

main().catch(err => {
  console.error('\n💥', err.message)
  console.error(err.stack)
  process.exit(1)
})
