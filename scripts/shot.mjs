import puppeteer from 'puppeteer-core'
const url = process.argv[2]
const out = process.argv[3]
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
// Durch die Seite scrollen, damit Lazy-Bilder + Scroll-Animationen (AnimatedSection, CountUp) auslösen
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0
    const step = 400
    const timer = setInterval(() => {
      window.scrollBy(0, step)
      y += step
      if (y >= document.body.scrollHeight) { clearInterval(timer); resolve() }
    }, 120)
  })
})
await new Promise((r) => setTimeout(r, 1200))
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 600))
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log('OK ' + out)
