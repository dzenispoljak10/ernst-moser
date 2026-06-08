import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CDN = 'https://cdn.pudutech.com/'

// slug-our | pudurobotics page-slug | nav-fallback-image
const M = [
  ['pudu-bg1', 'pudu-bg1-series', 'nav_product_BG_1_Pro_1_b196fdb002.png'],
  ['pudu-bg1-pro', 'pudu-bg1-series', 'nav_product_BG_1_Pro_1_b196fdb002.png'],
  ['pudu-cc1', 'puduCC1', 'nav_product_cc1_8baf7f1424.png'],
  ['pudu-cc1-pro', 'cc1-pro', 'nav_product_cc1_Pro_7de75f36ae.png'],
  ['pudu-mt1', 'mt1', 'nav_product_mt_9d40c8e237.webp'],
  ['pudu-mt1-max', 'mt1-max', 'nav_MT_1_Max_c1c3a6b01b.png'],
  ['pudu-mt1-vac', 'mt1-vac', 'nav_MT_1_Vac_ad6172aa60.png'],
  ['pudu-sh1', 'sh', 'nav_product_1_18f2507db0.png'],
  ['pudu-bellabot', 'bellabot', null],
  ['pudu-bellabot-pro', 'bellabotpro', 'nav_product_bella_pro_816bfa936e.png'],
  ['pudu-pudubot2', 'pudubot2', null],
  ['pudu-swiftbot', 'swiftbot', null],
  ['pudu-flashbot', 'flashbot-new', 'nav_flashbot_new_e3c621b5fd.png'],
  ['pudu-t300', 'pudut300', 'nav_product_0dd9c73f5a.png'],
  ['pudu-t600', 'pudut600', 'nav_T600_09c8d0b9bb.png'],
  ['pudu-kettybot-pro', 'kettybot_pro', 'nav_product_kettybotpro_27266c471c.png'],
]

async function dl(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.pudurobotics.com/' } }); if (!r.ok) throw new Error('HTTP ' + r.status); return Buffer.from(await r.arrayBuffer()) }
async function save(slug, buf) {
  const webp = await sharp(buf).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
  const dir = path.join(ROOT, 'public', 'images', 'products', slug); fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'main.webp'), webp)
  const m = await sharp(webp).metadata()
  return `${m.width}x${m.height} ${Math.round(webp.length / 1024)}KB`
}

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
for (const [slug, pslug, navimg] of M) {
  let buf = null, info = ''
  try {
    const pg = await browser.newPage()
    await pg.setViewport({ width: 1440, height: 1000 })
    await pg.goto(`https://www.pudurobotics.com/de/products/${pslug}`, { waitUntil: 'networkidle2', timeout: 60000 })
    await new Promise(r => setTimeout(r, 1500))
    // grösstes Produktbild (cdn.pudutech.com), nav_/logo/icon ausschliessen
    const best = await pg.evaluate(() => {
      let best = null
      document.querySelectorAll('img').forEach(im => {
        const s = im.currentSrc || im.src || ''
        if (!s.includes('cdn.pudutech.com')) return
        if (/logo|icon|\/nav_|qr|avatar/i.test(s)) return
        const area = (im.naturalWidth || 0) * (im.naturalHeight || 0)
        if (im.naturalWidth >= 400 && (!best || area > best.area)) best = { src: s, area, w: im.naturalWidth }
      })
      return best
    })
    await pg.close()
    if (best) { buf = await dl(best.src); info = `page ${best.w}px` }
  } catch (e) { info = 'page-err ' + e.message }
  if (!buf && navimg) { try { buf = await dl(CDN + navimg); info += ' | nav' } catch (e) { info += ' nav-err' } }
  if (!buf) { console.error(`SKIP ${slug}: ${info}`); continue }
  try { console.error(`OK ${slug}: ${await save(slug, buf)} (${info})`) } catch (e) { console.error(`ERR ${slug}: ${e.message}`) }
}
await browser.close()
