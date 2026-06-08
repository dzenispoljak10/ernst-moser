import puppeteer from 'puppeteer-core'
const url = process.argv[2]
const out = process.argv[3]
const width = parseInt(process.argv[4] || '390', 10)
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
// horizontale Overflows erkennen
const overflow = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth
  const offenders = []
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.width > docW + 1 && r.left < docW && r.right > docW + 1) {
      const cls = (el.className && typeof el.className === 'string') ? el.className.slice(0, 40) : ''
      offenders.push(`${el.tagName.toLowerCase()}.${cls} w=${Math.round(r.width)} (doc=${docW})`)
    }
  })
  return { scrollW: document.documentElement.scrollWidth, clientW: docW, offenders: [...new Set(offenders)].slice(0, 12) }
})
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0; const step = 500
    const t = setInterval(() => { window.scrollBy(0, step); y += step; if (y >= document.body.scrollHeight) { clearInterval(t); resolve() } }, 90)
  })
})
await new Promise((r) => setTimeout(r, 900))
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 500))
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log(JSON.stringify(overflow))
