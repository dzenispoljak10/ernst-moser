import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise(r => setTimeout(r, 800))
// Nav-Button "Motorgerätecenter" finden und hovern
const btns = await page.$$('.nav-btn')
for (const b of btns) {
  const t = await page.evaluate(el => el.textContent, b)
  if (t && t.toLowerCase().includes('motorger')) { await b.hover(); break }
}
await new Promise(r => setTimeout(r, 900))
await page.screenshot({ path: 'C:/Users/dzeni/AppData/Local/Temp/menu.png' })
await browser.close()
console.log('OK')
