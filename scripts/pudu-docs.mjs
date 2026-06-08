import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://www.getdone.ch'

// our-slug | getdone-slug
const M = [
  ['pudu-bg1', 'pudu-bg1'],
  ['pudu-bg1-pro', 'pudu-bg1'],
  ['pudu-cc1', 'pudu-cc1'],
  ['pudu-cc1-pro', 'pudu-cc1-pro'],
  ['pudu-mt1', 'pudu-mt1'],
  ['pudu-mt1-max', 'pudu-mt1-max'],
  ['pudu-mt1-vac', 'pudu-mt1-vac'],
  ['pudu-sh1', 'sh1'],
  ['pudu-bellabot', 'bellabot'],
  ['pudu-bellabot-pro', 'bellabot-pro'],
  ['pudu-pudubot2', 'pudubot-2'],
  ['pudu-swiftbot', 'pudu-swiftbot'],
  ['pudu-flashbot', 'flashbot'],
  ['pudu-t300', 't300'],
  ['pudu-t600', 't600'],
  ['pudu-kettybot-pro', 'kettybot'],
]

async function getHtml(u) { const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text() }

const outDir = path.join(ROOT, 'public', 'dokumentation')
fs.mkdirSync(outDir, { recursive: true })

for (const [slug, gd] of M) {
  try {
    const html = await getHtml(`${BASE}/${gd}`)
    // PDF-Attachment: /web/content/<id>?...download=true
    const m = html.match(/\/web\/content\/(\d+)\?[^"']*download=true/)
    if (!m) { console.error(`SKIP ${slug}: kein Dokumentations-PDF auf /${gd}`); continue }
    const id = m[1]
    const r = await fetch(`${BASE}/web/content/${id}?download=true`, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: `${BASE}/${gd}` }, redirect: 'follow' })
    if (!r.ok) throw new Error('pdf HTTP ' + r.status)
    const ct = r.headers.get('content-type') || ''
    const buf = Buffer.from(await r.arrayBuffer())
    if (!ct.includes('pdf') && buf.slice(0, 4).toString() !== '%PDF') throw new Error('kein PDF (' + ct + ')')
    fs.writeFileSync(path.join(outDir, `${slug}.pdf`), buf)
    console.error(`OK ${slug} <- /${gd} (content ${id}, ${Math.round(buf.length / 1024)}KB)`)
  } catch (e) { console.error(`ERR ${slug}: ${e.message}`) }
}
