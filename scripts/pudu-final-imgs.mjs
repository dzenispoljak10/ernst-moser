import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const C = 'https://cdn.pudutech.com/'
const F = 'https://cdn.pudutech.com/official-website/product/float_btn/'

const MAP = {
  'pudu-bg1': C + 'nav_product_BG_1_1_940b41c677.png',
  'pudu-bg1-pro': C + 'nav_product_BG_1_Pro_1_b196fdb002.png',
  'pudu-cc1': C + 'nav_product_cc1_8baf7f1424.png',
  'pudu-cc1-pro': C + 'nav_product_cc1_Pro_7de75f36ae.png',
  'pudu-mt1': C + 'nav_product_mt_9d40c8e237.webp',
  'pudu-mt1-max': C + 'nav_MT_1_Max_c1c3a6b01b.png',
  'pudu-mt1-vac': C + 'nav_MT_1_Vac_ad6172aa60.png',
  'pudu-sh1': C + 'nav_product_1_18f2507db0.png',
  'pudu-bellabot': F + 'bellabot-float.png',
  'pudu-bellabot-pro': C + 'nav_product_bella_pro_816bfa936e.png',
  'pudu-pudubot2': F + 'pudubot2-float.png',
  'pudu-swiftbot': F + 'swiftbot-float.png',
  'pudu-flashbot': C + 'nav_flashbot_new_e3c621b5fd.png',
  'pudu-t300': C + 'nav_product_0dd9c73f5a.png',
  'pudu-t600': C + 'nav_T600_09c8d0b9bb.png',
  'pudu-kettybot-pro': C + 'nav_product_kettybotpro_27266c471c.png',
}

for (const [slug, url] of Object.entries(MAP)) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.pudurobotics.com/' } })
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const raw = Buffer.from(await r.arrayBuffer())
    const webp = await sharp(raw).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 90 }).toBuffer()
    const dir = path.join(ROOT, 'public', 'images', 'products', slug); fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'main.webp'), webp)
    const m = await sharp(webp).metadata()
    console.log(`OK ${slug}: ${m.width}x${m.height} ${Math.round(webp.length / 1024)}KB`)
  } catch (e) { console.error(`ERR ${slug}: ${e.message}`) }
}
