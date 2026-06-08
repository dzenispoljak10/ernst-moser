import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SHOP = 'https://shop.ernst-moser.ch/produkt/'

// slug | url-slug | model-token (im Bild-Dateinamen)
const P = [
  ['segway-navimow-i108e', 'segway-navimow-i108e-maehroboter-rasenroboter', 'i108'],
  ['segway-navimow-i210e', 'segway-navimow-i210e-awd-n-rtk-maehroboter', 'i210'],
  ['segway-navimow-h206e', 'segway-navimow-h206e-lidar-n-rtk-maehroboter', 'h206'],
  ['segway-navimow-h210e', 'segway-navimow-h210e-lidar-n-rtk-maehroboter', 'h210'],
  ['segway-navimow-h215e', 'segway-navimow-h215e-lidar-n-rtk-maehroboter', 'h215'],
  ['segway-navimow-h230e', 'segway-navimow-h230e-lidar-n-rtk-maehroboter', 'h230'],
  ['segway-navimow-x315e', 'segway-navimow-x315e-kabelloser-maehroboter-1500m2-inkl-gps-wifi-4g-visionfence-2-0', 'x315'],
  ['segway-navimow-x330e', 'segway-navimow-x330e-kabelloser-maehroboter-3000m2-inkl-gps-wifi-4g-visionfence-2-0', 'x330'],
  ['segway-navimow-x350e', 'segway-navimow-x350e-kabelloser-maehroboter-5000m2-inkl-gps-wifi-4g-visionfence-2-0', 'x350'],
  ['segway-navimow-x390e', 'segway-navimow-x390e-kabelloser-maehroboter-10000m2-inkl-gps-wifi-4g-visionfence-2-0', 'x390'],
  ['segway-navimow-x420e', 'segway-navimow-x420e-awd-kabelloser-maehroboter-bis-2000m2-mit-visionfence', 'x420'],
  ['segway-navimow-x430e', 'segway-navimow-x430e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'x430'],
  ['segway-navimow-x450e', 'segway-navimow-x450e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'x450'],
  ['segway-navimow-terranox-cm120', 'segway-navimow-terranox-cm120-m1-awd-kabelloser-maehroboter-bis-12000-m2-mit-visionfence', 'cm120'],
  ['segway-navimow-terranox-cm240', 'segway-navimow-terranox-cm240-m1-awd-kabelloser-maehroboter-bis-24000-m2-mit-visionfence', 'cm240'],
]

async function getHtml(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' })
  if (!r.ok) throw new Error('HTTP ' + r.status)
  return r.text()
}
async function dl(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://shop.ernst-moser.ch/' }, redirect: 'follow' })
  if (!r.ok) throw new Error('img HTTP ' + r.status)
  return Buffer.from(await r.arrayBuffer())
}

for (const [slug, urlSlug, token] of P) {
  try {
    const html = await getHtml(SHOP + urlSlug + '/')
    // alle uploads-Bilder
    const all = [...html.matchAll(/https:\/\/shop\.ernst-moser\.ch\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"' ]+?\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0])
    // auf Vollgrösse normalisieren (Grössen-Suffix entfernen) + nur Modell-Token
    const full = [...new Set(all.map(u => u.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '')))]
      .filter(u => u.toLowerCase().includes(token.toLowerCase()))
    // Kandidaten testen, erstes Bild >= 600px breit nehmen
    let best = null
    for (const u of full) {
      try {
        const raw = await dl(u)
        const meta = await sharp(raw).metadata()
        if (meta.width >= 600) { best = { raw, w: meta.width }; break }
      } catch {}
    }
    if (!best) { console.error(`SKIP ${slug}: kein Vollbild (token ${token})`); continue }
    const webp = await sharp(best.raw).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer()
    fs.writeFileSync(path.join(ROOT, 'public', 'images', 'products', slug, 'main.webp'), webp)
    console.error(`OK ${slug}: ${best.w}px -> ${Math.round(webp.length / 1024)}KB`)
  } catch (e) {
    console.error(`ERR ${slug}: ${e.message}`)
  }
}
console.error('done')
