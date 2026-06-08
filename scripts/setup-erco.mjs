import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  {
    slug: 'erco-es-643p', name: 'ERCO ES-643P Akku-Laubsauger',
    page: 'https://www.tamag.ch/ERCO-ES-643P-Akku-Laubsauger-fahrbar-powered-by-PELLENC/ES-643P',
    img: 'https://www.tamag.ch/media/3b/af/bf/1776869529/erco_es_643p.jpeg',
    fallback: 'Fahrbarer Akku-Laubsauger powered by PELLENC – kraftvolles, leises und emissionsfreies Aufsaugen von Laub und Schnittgut.',
  },
  {
    slug: 'erco-eb-9043p', name: 'ERCO EB-9043P Akku-Grossflächenbläser',
    page: 'https://www.tamag.ch/ERCO-EB-9043P-Akku-Grossflaechenblaeser-powered-by-PELLENC/EB-9043P',
    img: 'https://www.tamag.ch/thumbnail/fe/4d/ce/1776875801/eb_9043p_702x800.jpeg?ts=1776875803',
    fallback: 'Akku-Grossflächenbläser powered by PELLENC – enorme Blasleistung für die professionelle Flächenreinigung, leise und abgasfrei.',
  },
  {
    slug: 'erco-ewb-35p', name: 'ERCO EWB-35P Akku-Wildkrautbürste',
    page: 'https://www.tamag.ch/ERCO-Akku-Wildkrautbuerste-EWB-35P-powered-by-PELLENC/EWB-35P',
    img: 'https://www.tamag.ch/thumbnail/bc/92/64/1776908106/ewb_35p_800x800.jpeg?ts=1776908106',
    fallback: 'Akku-Wildkrautbürste powered by PELLENC – chemiefreie Unkrautentfernung auf Wegen und Plätzen, emissionsfrei und leise.',
  },
]

async function getHtml(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text() }
async function dl(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.tamag.ch/' }, redirect: 'follow' }); if (!r.ok) throw new Error('img HTTP ' + r.status); return Buffer.from(await r.arrayBuffer()) }

function extractDesc(html) {
  let m = html.match(/product-detail-description-text[^>]*>([\s\S]*?)<\/div>/)
  if (!m) return null
  let t = m[1].replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö')
    .replace(/&uuml;/g, 'ü').replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß').replace(/&euro;/g, '€').replace(/\s+/g, ' ').trim()
  if (/CHF|Fr\.\s*\d|€\s*\d/i.test(t)) t = t.split(/CHF|Fr\.\s*\d|€/)[0].trim()
  return t.length > 40 ? t.slice(0, 420) : null
}

function blocks(text) { return [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text, marks: [] }] }] }

async function main() {
  const brand = await client.fetch(`*[_type=="brand" && slug.current=="erco"][0]{_id}`)
  if (!brand) throw new Error('erco brand not found')

  const keep = P.map(p => p.slug)
  const old = await client.fetch(`*[_type=="product" && brand->slug.current=="erco" && !(slug.current in $keep)]{_id,"s":slug.current}`, { keep })
  for (const o of old) { await client.delete(o._id); fs.rmSync(path.join(ROOT, 'public', 'images', 'products', o.s), { recursive: true, force: true }); console.error(`deleted ${o._id}`) }

  for (const p of P) {
    let desc = p.fallback
    try { const sd = extractDesc(await getHtml(p.page)); if (sd) desc = sd } catch (e) { console.error(`WARN ${p.slug} page: ${e.message}`) }
    try {
      const raw = await dl(p.img)
      const webp = await sharp(raw).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
      const dir = path.join(ROOT, 'public', 'images', 'products', p.slug); fs.mkdirSync(dir, { recursive: true })
      const ip = path.join(dir, 'main.webp'); fs.writeFileSync(ip, webp)
      const asset = await client.assets.upload('image', fs.readFileSync(ip), { filename: `${p.slug}.webp` })
      await client.createOrReplace({ _id: `product-${p.slug}`, _type: 'product', name: p.name, slug: { _type: 'slug', current: p.slug }, brand: { _type: 'reference', _ref: brand._id }, description: blocks(desc), mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      console.error(`OK ${p.slug} (img ${Math.round(webp.length / 1024)}KB)`)
    } catch (e) { console.error(`ERR ${p.slug}: ${e.message}`) }
    console.log(`  '${p.slug}': '${p.page}',`)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
