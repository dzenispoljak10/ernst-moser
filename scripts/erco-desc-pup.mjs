import puppeteer from 'puppeteer-core'
import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  ['erco-es-643p', 'https://www.tamag.ch/ERCO-ES-643P-Akku-Laubsauger-fahrbar-powered-by-PELLENC/ES-643P', 'Fahrbarer Akku-Laubsauger powered by PELLENC – kraftvolles, leises und emissionsfreies Aufsaugen von Laub und Schnittgut.'],
  ['erco-eb-9043p', 'https://www.tamag.ch/ERCO-EB-9043P-Akku-Grossflaechenblaeser-powered-by-PELLENC/EB-9043P', 'Akku-Grossflächenbläser powered by PELLENC – enorme Blasleistung für die professionelle Flächenreinigung, leise und abgasfrei.'],
  ['erco-ewb-35p', 'https://www.tamag.ch/ERCO-Akku-Wildkrautbuerste-EWB-35P-powered-by-PELLENC/EWB-35P', 'Akku-Wildkrautbürste powered by PELLENC – chemiefreie Unkrautentfernung auf Wegen und Plätzen, emissionsfrei und leise.'],
]

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new', args: ['--no-sandbox', '--disable-gpu'] })
for (const [slug, page, fallback] of P) {
  let desc = fallback
  try {
    const pg = await browser.newPage()
    await pg.setViewport({ width: 1200, height: 900 })
    await pg.goto(page, { waitUntil: 'networkidle2', timeout: 60000 })
    await new Promise(r => setTimeout(r, 800))
    const t = await pg.evaluate(() => {
      const el = document.querySelector('.product-detail-description-text')
      return el ? el.innerText.replace(/\s+/g, ' ').trim() : null
    })
    await pg.close()
    if (t && t.length > 50 && !/CHF|Fr\.\s*\d/i.test(t)) desc = t.slice(0, 480).trim()
  } catch (e) { console.error(`WARN ${slug}: ${e.message}`) }
  await client.patch(`product-${slug}`).set({ description: [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: desc, marks: [] }] }] }).commit()
  console.error(`${slug}: ${desc.slice(0, 140)}…`)
}
await browser.close()
