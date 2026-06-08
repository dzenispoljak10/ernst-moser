import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
for (const [slug, kw] of [['bellabot', 'bella'], ['swiftbot', 'swift'], ['pudubot2', 'pudubot']]) {
  const pg = await browser.newPage()
  await pg.setViewport({ width: 1440, height: 1000 })
  await pg.goto(`https://www.pudurobotics.com/de/products/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await pg.evaluate(async () => { for (let y = 0; y < 4000; y += 600) { window.scrollBy(0, 600); await new Promise(r => setTimeout(r, 200)) } })
  await new Promise(r => setTimeout(r, 1000))
  const imgs = await pg.evaluate(() => [...document.querySelectorAll('img')].map(i => ({ s: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight })).filter(x => x.s.includes('cdn.pudutech.com') && x.w >= 300))
  console.log(`\n=== ${slug} ===`)
  const seen = new Set()
  for (const i of imgs) { if (seen.has(i.s)) continue; seen.add(i.s); console.log(`${i.w}x${i.h} ${i.s.replace('https://cdn.pudutech.com/', '')}`) }
  await pg.close()
}
await browser.close()
