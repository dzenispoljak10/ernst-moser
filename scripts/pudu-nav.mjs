import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000 })
await page.goto('https://www.pudurobotics.com/de/products', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise(r => setTimeout(r, 2000))
// Versuche die Produkte-Navigation zu öffnen (hover) und sammle nav-Bilder
const data = await page.evaluate(async () => {
  // alle Bilder lazy laden
  document.querySelectorAll('img').forEach(im => { if (im.dataset && im.dataset.src) im.src = im.dataset.src })
  await new Promise(r => setTimeout(r, 600))
  const map = {}
  document.querySelectorAll('a[href*="/products/"]').forEach(a => {
    const href = a.href.split('?')[0]
    let img = a.querySelector('img')
    let src = img ? (img.getAttribute('data-src') || img.currentSrc || img.src) : null
    // srcset grösste
    if (img && img.srcset) { const parts = img.srcset.split(',').map(s => s.trim().split(' ')[0]); if (parts.length) src = parts[parts.length - 1] }
    if (!src || src.startsWith('data:')) return
    if (!map[href]) map[href] = src
  })
  return map
})
for (const [href, src] of Object.entries(data)) console.log(`${href.replace('https://www.pudurobotics.com/de/products/', '')} | ${src}`)
await browser.close()
