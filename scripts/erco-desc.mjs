import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  ['erco-es-643p', 'https://www.tamag.ch/ERCO-ES-643P-Akku-Laubsauger-fahrbar-powered-by-PELLENC/ES-643P', 'Fahrbarer Akku-Laubsauger powered by PELLENC – kraftvolles, leises und emissionsfreies Aufsaugen von Laub und Schnittgut.'],
  ['erco-eb-9043p', 'https://www.tamag.ch/ERCO-EB-9043P-Akku-Grossflaechenblaeser-powered-by-PELLENC/EB-9043P', 'Akku-Grossflächenbläser powered by PELLENC – enorme Blasleistung für die professionelle Flächenreinigung, leise und abgasfrei.'],
  ['erco-ewb-35p', 'https://www.tamag.ch/ERCO-Akku-Wildkrautbuerste-EWB-35P-powered-by-PELLENC/EWB-35P', 'Akku-Wildkrautbürste powered by PELLENC – chemiefreie Unkrautentfernung auf Wegen und Plätzen, emissionsfrei und leise.'],
]

function decode(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü').replace(/&szlig;/g, 'ß').replace(/&euro;/g, '€')
    .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&[a-z]+;/g, ' ')
}

function extract(html) {
  const i = html.lastIndexOf('product-detail-description-text')
  if (i < 0) return null
  const chunk = html.slice(i, i + 4000)
  // Paragraphen aus dem Block ziehen
  const paras = [...chunk.matchAll(/<(?:p|li)[^>]*>([\s\S]*?)<\/(?:p|li)>/g)]
    .map(m => decode(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
    .filter(t => t.length > 20 && !/CHF|Fr\.\s*\d|€\s*\d|Artikel-?Nr|Lieferzeit/i.test(t))
  let text = paras.join(' ')
  if (text.length < 40) return null
  return text.slice(0, 450).trim()
}

for (const [slug, page, fallback] of P) {
  let desc = fallback
  try {
    const r = await fetch(page, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' })
    const html = await r.text()
    const sd = extract(html)
    if (sd) desc = sd
  } catch (e) { console.error(`WARN ${slug}: ${e.message}`) }
  await client.patch(`product-${slug}`).set({ description: [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: desc, marks: [] }] }] }).commit()
  console.error(`${slug}: ${desc.slice(0, 120)}…`)
}
