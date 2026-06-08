import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
for (const slug of ['bellabot', 'swiftbot', 'pudubot2']) {
  const pg = await browser.newPage()
  await pg.setViewport({ width: 1440, height: 1000 })
  await pg.goto(`https://www.pudurobotics.com/de/products/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await pg.evaluate(async () => { for (let y = 0; y < 5000; y += 500) { window.scrollBy(0, 500); await new Promise(r => setTimeout(r, 150)) } })
  await new Promise(r => setTimeout(r, 1200))
  const urls = await pg.evaluate(() => {
    const set = new Set()
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage
      if (bg && bg.includes('cdn.pudutech.com')) { const m = bg.match(/url\(["']?([^"')]+)["']?\)/); if (m) set.add(m[1]) }
    })
    document.querySelectorAll('img,source').forEach(im => { const s = im.currentSrc || im.src || im.srcset; if (s && s.includes('cdn.pudutech.com')) set.add(s.split(' ')[0]) })
    return [...set]
  })
  console.log(`\n=== ${slug} ===`)
  urls.filter(u => !/logo|icon|qr|\.svg/i.test(u)).forEach(u => console.log(u.replace('https://cdn.pudutech.com/', '')))
  await pg.close()
}
await browser.close()
