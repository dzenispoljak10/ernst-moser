import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new', args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000/motorgeraetecenter/stihl', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise(r => setTimeout(r, 1500))
const info = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.stihl-tile-img img')]
  const wrap = document.querySelector('.stihl-tile-img')
  return {
    count: imgs.length,
    wrapBox: wrap ? wrap.getBoundingClientRect() : null,
    wrapStyle: wrap ? { position: getComputedStyle(wrap).position, aspectRatio: getComputedStyle(wrap).aspectRatio, height: getComputedStyle(wrap).height } : null,
    first: imgs[0] ? {
      src: imgs[0].currentSrc || imgs[0].src,
      natural: imgs[0].naturalWidth + 'x' + imgs[0].naturalHeight,
      box: imgs[0].getBoundingClientRect(),
      complete: imgs[0].complete,
      pos: getComputedStyle(imgs[0]).position,
      objectFit: getComputedStyle(imgs[0]).objectFit,
    } : null,
  }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
