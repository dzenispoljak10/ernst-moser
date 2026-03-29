/**
 * Downloads all actively used images from Sanity + hardcoded URLs
 * Generates src/lib/localImages.json manifest
 */
import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public', 'images')
const MANIFEST_PATH = path.join(ROOT, 'src', 'lib', 'localImages.json')

// ── Sanity client ────────────────────────────────────────────────────────────
const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// ── Helpers ──────────────────────────────────────────────────────────────────
function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

function extFromUrl(url: string): string {
  const clean = url.split('?')[0]
  const ext = path.extname(clean).toLowerCase()
  return ext || '.jpg'
}

function sanitizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function downloadFile(url: string, dest: string): Promise<boolean> {
  if (fs.existsSync(dest)) return false // already downloaded
  ensureDir(path.dirname(dest))
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Ernst-Moser-ImageSync/1.0' } })
    if (!res.ok) { console.warn(`  ⚠ ${res.status} ${url}`); return false }
    const buf = await res.arrayBuffer()
    fs.writeFileSync(dest, Buffer.from(buf))
    return true
  } catch (e) {
    console.warn(`  ⚠ Failed: ${url}`)
    return false
  }
}

// Concurrency-limited runner
async function pAll(tasks: (() => Promise<void>)[], limit = 6) {
  let i = 0
  const run = async () => { while (i < tasks.length) await tasks[i++]() }
  await Promise.all(Array(limit).fill(0).map(run))
}

// ── Manifest ─────────────────────────────────────────────────────────────────
const manifest: Record<string, string> = {}

function addToManifest(assetId: string, localPath: string) {
  // localPath relative to /public (becomes the URL path)
  const urlPath = localPath.replace(PUBLIC, '').replace(/\\/g, '/')
  manifest[assetId] = '/images' + urlPath
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Abfrage aktiver Bilder von Sanity...\n')

  const data = await client.fetch<{
    brands: Array<{
      name: string; slug: string
      logo: { asset: { _id: string; url: string } } | null
      hero: { asset: { _id: string; url: string } } | null
      gallery: Array<{ asset: { _id: string; url: string } }> | null
    }>
    centers: Array<{
      name: string; slug: string
      hero: { asset: { _id: string; url: string } } | null
    }>
    products: Array<{
      name: string; slug: string; brandSlug: string
      main: { asset: { _id: string; url: string } } | null
      gallery: Array<{ asset: { _id: string; url: string } }> | null
    }>
    team: Array<{
      firstName: string; lastName: string
      photo: { asset: { _id: string; url: string } } | null
    }>
    salespeople: Array<{
      firstName: string; lastName: string
      photo: { asset: { _id: string; url: string } } | null
    }>
    logoAsset: { _id: string; url: string } | null
  }>(`{
    "brands": *[_type == "brand"] | order(order asc) {
      name, "slug": slug.current,
      "logo": logo { asset->{ _id, url } },
      "hero": heroImage { asset->{ _id, url } },
      "gallery": images[] { asset->{ _id, url } }
    },
    "centers": *[_type == "center"] {
      name, "slug": slug.current,
      "hero": heroImage { asset->{ _id, url } }
    },
    "products": *[_type == "product"] | order(_createdAt desc) {
      name, "slug": slug.current, "brandSlug": brand->slug.current,
      "main": mainImage { asset->{ _id, url } },
      "gallery": images[] { asset->{ _id, url } }
    },
    "team": *[_type == "teamMember"] | order(order asc) {
      firstName, lastName,
      "photo": photo { asset->{ _id, url } }
    },
    "salespeople": *[_type == "salesperson"] | order(lastName asc) {
      firstName, lastName,
      "photo": photo { asset->{ _id, url } }
    },
    "logoAsset": *[_type == "sanity.imageAsset" && originalFilename match "Element-3Logo-EMoser*"][0] {
      _id, url
    }
  }`)

  const tasks: (() => Promise<void>)[] = []
  let total = 0

  // ── Company Logo ─────────────────────────────────────────────────────────
  if (data.logoAsset?.url) {
    const ext = extFromUrl(data.logoAsset.url)
    const dest = path.join(PUBLIC, 'logos', `ernst-moser-logo${ext}`)
    tasks.push(async () => {
      const fresh = await downloadFile(data.logoAsset!.url, dest)
      if (fresh) process.stdout.write('.')
    })
    addToManifest(data.logoAsset._id, dest)
    total++
  }

  // ── Centers ──────────────────────────────────────────────────────────────
  for (const c of data.centers) {
    if (!c.hero?.asset?.url) continue
    const ext = extFromUrl(c.hero.asset.url)
    const dest = path.join(PUBLIC, 'hero', `${sanitizeName(c.slug)}${ext}`)
    tasks.push(async () => {
      const fresh = await downloadFile(c.hero!.asset.url, dest)
      if (fresh) process.stdout.write('.')
    })
    addToManifest(c.hero.asset._id, dest)
    total++
  }

  // ── Brands ───────────────────────────────────────────────────────────────
  for (const b of data.brands) {
    const slug = sanitizeName(b.slug ?? b.name)
    const dir = path.join(PUBLIC, 'brands', slug)

    if (b.logo?.asset?.url) {
      const ext = extFromUrl(b.logo.asset.url)
      const dest = path.join(dir, `logo${ext}`)
      tasks.push(async () => {
        const fresh = await downloadFile(b.logo!.asset.url, dest)
        if (fresh) process.stdout.write('.')
      })
      addToManifest(b.logo.asset._id, dest)
      total++
    }

    if (b.hero?.asset?.url) {
      const ext = extFromUrl(b.hero.asset.url)
      const dest = path.join(dir, `hero${ext}`)
      tasks.push(async () => {
        const fresh = await downloadFile(b.hero!.asset.url, dest)
        if (fresh) process.stdout.write('.')
      })
      addToManifest(b.hero.asset._id, dest)
      total++
    }

    for (let i = 0; i < (b.gallery ?? []).length; i++) {
      const img = b.gallery![i]
      if (!img?.asset?.url) continue
      const ext = extFromUrl(img.asset.url)
      const dest = path.join(dir, 'gallery', `${String(i + 1).padStart(2, '0')}${ext}`)
      const assetId = img.asset._id
      tasks.push(async () => {
        const fresh = await downloadFile(img.asset.url, dest)
        if (fresh) process.stdout.write('.')
      })
      addToManifest(assetId, dest)
      total++
    }
  }

  // ── Products ─────────────────────────────────────────────────────────────
  for (const p of data.products) {
    const pSlug = sanitizeName(p.slug ?? p.name)
    const dir = path.join(PUBLIC, 'products', pSlug)

    if (p.main?.asset?.url) {
      const ext = extFromUrl(p.main.asset.url)
      const dest = path.join(dir, `main${ext}`)
      tasks.push(async () => {
        const fresh = await downloadFile(p.main!.asset.url, dest)
        if (fresh) process.stdout.write('.')
      })
      addToManifest(p.main.asset._id, dest)
      total++
    }

    for (let i = 0; i < (p.gallery ?? []).length; i++) {
      const img = p.gallery![i]
      if (!img?.asset?.url) continue
      const ext = extFromUrl(img.asset.url)
      const dest = path.join(dir, 'gallery', `${String(i + 1).padStart(2, '0')}${ext}`)
      tasks.push(async () => {
        const fresh = await downloadFile(img.asset.url, dest)
        if (fresh) process.stdout.write('.')
      })
      addToManifest(img.asset._id, dest)
      total++
    }
  }

  // ── Team ─────────────────────────────────────────────────────────────────
  for (const t of data.team) {
    if (!t.photo?.asset?.url) continue
    const name = sanitizeName(`${t.firstName}-${t.lastName}`)
    const ext = extFromUrl(t.photo.asset.url)
    const dest = path.join(PUBLIC, 'team', `${name}${ext}`)
    tasks.push(async () => {
      const fresh = await downloadFile(t.photo!.asset.url, dest)
      if (fresh) process.stdout.write('.')
    })
    addToManifest(t.photo.asset._id, dest)
    total++
  }

  // ── Salespeople ──────────────────────────────────────────────────────────
  for (const s of data.salespeople) {
    if (!s.photo?.asset?.url) continue
    const name = sanitizeName(`${s.firstName}-${s.lastName}`)
    const ext = extFromUrl(s.photo.asset.url)
    const dest = path.join(PUBLIC, 'team', `${name}${ext}`)
    tasks.push(async () => {
      const fresh = await downloadFile(s.photo!.asset.url, dest)
      if (fresh) process.stdout.write('.')
    })
    addToManifest(s.photo.asset._id, dest)
    total++
  }

  console.log(`📦 ${total} Sanity-Bilder gefunden. Starte Download...\n`)
  await pAll(tasks, 8)
  console.log('\n')

  // ── Hardcoded Unsplash URLs ───────────────────────────────────────────────
  const unsplashMap: Record<string, string> = {}
  const unsplashSources = [
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop', file: 'workshop.jpg' },
    { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85&auto=format&fit=crop', file: 'truck-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da2f?w=1200&q=85&auto=format&fit=crop', file: 'service.jpg' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop', file: 'machinery.jpg' },
    { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=85&auto=format&fit=crop', file: 'vehicles.jpg' },
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop', file: 'workshop.jpg' },
  ]

  console.log('📷 Unsplash-Bilder...')
  for (const { url, file } of unsplashSources) {
    if (unsplashMap[url]) continue
    const dest = path.join(PUBLIC, 'unsplash', file)
    const fresh = await downloadFile(url, dest)
    unsplashMap[url] = `/images/unsplash/${file}`
    if (fresh) process.stdout.write('.')
  }
  console.log('\n')

  // ── Hardcoded Wikimedia URLs from brandSections.ts ───────────────────────
  const brandSectionsPath = path.join(ROOT, 'src', 'data', 'brandSections.ts')
  const brandSectionsContent = fs.readFileSync(brandSectionsPath, 'utf8')
  const wikiRegex = /https:\/\/upload\.wikimedia\.org\/[^\s'"]+/g
  const wikiUrls = [...new Set(brandSectionsContent.match(wikiRegex) ?? [])]
  const wikimediaMap: Record<string, string> = {}

  console.log(`🌐 ${wikiUrls.length} Wikimedia-Bilder...`)
  ensureDir(path.join(PUBLIC, 'wikimedia'))

  const wikiTasks = wikiUrls.map((url) => async () => {
    const hash = Buffer.from(url).toString('base64').replace(/[^a-z0-9]/gi, '').slice(0, 16)
    const ext = extFromUrl(url.split('/').pop()?.split('?')[0] ?? '')
    const file = `${hash}${ext || '.jpg'}`
    const dest = path.join(PUBLIC, 'wikimedia', file)
    const fresh = await downloadFile(url, dest)
    wikimediaMap[url] = `/images/wikimedia/${file}`
    if (fresh) process.stdout.write('.')
  })
  await pAll(wikiTasks, 8)
  console.log('\n')

  // ── Save manifest ─────────────────────────────────────────────────────────
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`✅ Manifest gespeichert: src/lib/localImages.json (${Object.keys(manifest).length} Einträge)`)

  // ── Save external URL map ─────────────────────────────────────────────────
  const externalMap = { ...unsplashMap, ...wikimediaMap }
  const externalMapPath = path.join(ROOT, 'src', 'lib', 'localExternalImages.json')
  fs.writeFileSync(externalMapPath, JSON.stringify(externalMap, null, 2))
  console.log(`✅ External map gespeichert: src/lib/localExternalImages.json (${Object.keys(externalMap).length} Einträge)`)

  // Count downloaded files
  let downloaded = 0
  function countFiles(dir: string) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) countFiles(path.join(dir, entry.name))
      else downloaded++
    }
  }
  countFiles(PUBLIC)
  console.log(`\n🎉 Fertig! ${downloaded} Dateien in public/images/`)
}

main().catch(console.error)
