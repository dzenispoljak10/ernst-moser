import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000 })
await page.goto('https://www.pudurobotics.com/de/products', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise(r => setTimeout(r, 2500))
// scrollen, damit lazy-Bilder laden
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollBy(0, 600); await new Promise(r => setTimeout(r, 200)) } })
await new Promise(r => setTimeout(r, 1500))
const items = await page.evaluate(() => {
  const out = []
  document.querySelectorAll('a[href*="/products/"]').forEach(a => {
    const href = a.href
    const img = a.querySelector('img')
    const txt = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60)
    const src = img ? (img.currentSrc || img.src || img.getAttribute('data-src')) : null
    if (href && !href.endsWith('/products') && !href.endsWith('/products/')) out.push({ href, txt, src })
  })
  return out
})
// dedupe by href
const seen = new Set()
for (const it of items) { if (seen.has(it.href)) continue; seen.add(it.href); console.log(`${it.txt} | ${it.href} | ${it.src}`) }
await browser.close()
