import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const P = [
  ['segway-navimow-i108e', 'Navimow i108E', 'I-Serie', 'segway-navimow-i108e-maehroboter-rasenroboter', 'Kompakter Einsteiger-Mähroboter mit RTK-Satellitennavigation – drahtlos, leise und per App gesteuert für Gärten bis 800 m².'],
  ['segway-navimow-i210e', 'Navimow i210E AWD', 'I-Serie', 'segway-navimow-i210e-awd-n-rtk-maehroboter', 'Allrad-Mähroboter (AWD) mit RTK-Navigation für sicheres, kabelloses Mähen – auch an Steigungen.'],
  ['segway-navimow-h206e', 'Navimow h206E', 'H-Serie', 'segway-navimow-h206e-lidar-n-rtk-maehroboter', 'Mähroboter mit LiDAR- und RTK-Navigation für zuverlässiges, drahtloses Mähen ohne Begrenzungskabel.'],
  ['segway-navimow-h210e', 'Navimow h210E', 'H-Serie', 'segway-navimow-h210e-lidar-n-rtk-maehroboter', 'Mähroboter mit LiDAR- und RTK-Navigation für präzise, kabellose Rasenpflege.'],
  ['segway-navimow-h215e', 'Navimow h215E', 'H-Serie', 'segway-navimow-h215e-lidar-n-rtk-maehroboter', 'Leistungsstarker Mähroboter mit LiDAR- und RTK-Navigation für grössere Flächen.'],
  ['segway-navimow-h230e', 'Navimow h230E', 'H-Serie', 'segway-navimow-h230e-lidar-n-rtk-maehroboter', 'Top-Modell der H-Serie mit LiDAR- und RTK-Navigation für anspruchsvolle Gärten.'],
  ['segway-navimow-x315e', 'Navimow X315E', 'X3-Serie', 'segway-navimow-x315e-kabelloser-maehroboter-1500m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence-2.0-Kamera-Hinderniserkennung für Flächen bis 1.500 m².'],
  ['segway-navimow-x330e', 'Navimow X330E', 'X3-Serie', 'segway-navimow-x330e-kabelloser-maehroboter-3000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 3.000 m².'],
  ['segway-navimow-x350e', 'Navimow X350E', 'X3-Serie', 'segway-navimow-x350e-kabelloser-maehroboter-5000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 5.000 m².'],
  ['segway-navimow-x390e', 'Navimow X390E', 'X3-Serie', 'segway-navimow-x390e-kabelloser-maehroboter-10000m2-inkl-gps-wifi-4g-visionfence-2-0', 'Profi-Mähroboter mit GPS, 4G und VisionFence 2.0 für grosse Flächen bis 10.000 m².'],
  ['segway-navimow-x420e', 'Navimow X420E AWD', 'X4-Serie', 'segway-navimow-x420e-awd-kabelloser-maehroboter-bis-2000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence-Kamera für anspruchsvolles Gelände bis 2.000 m².'],
  ['segway-navimow-x430e', 'Navimow X430E AWD', 'X4-Serie', 'segway-navimow-x430e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².'],
  ['segway-navimow-x450e', 'Navimow X450E AWD', 'X4-Serie', 'segway-navimow-x450e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence', 'AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².'],
  ['segway-navimow-terranox-cm120', 'Navimow Terranox CM120 M1 AWD', 'Terranox', 'segway-navimow-terranox-cm120-m1-awd-kabelloser-maehroboter-bis-12000-m2-mit-visionfence', 'Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 12.000 m².'],
  ['segway-navimow-terranox-cm240', 'Navimow Terranox CM240 M1 AWD', 'Terranox', 'segway-navimow-terranox-cm240-m1-awd-kabelloser-maehroboter-bis-24000-m2-mit-visionfence', 'Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 24.000 m².'],
]

for (const [slug, , , , desc] of P) {
  await client.patch(`product-${slug}`).set({
    description: [{ _type: 'block', _key: 'd0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: desc, marks: [] }] }],
  }).commit()
  console.error(`patched ${slug}`)
}

console.log('\n===CATALOG_TS_START===')
for (const [slug, name, category, urlSlug, desc] of P) {
  const url = `https://shop.ernst-moser.ch/produkt/${urlSlug}/`
  console.log(`    { slug: ${JSON.stringify(slug)}, category: ${JSON.stringify(category)}, title: ${JSON.stringify(name)}, shortDescription: ${JSON.stringify(desc)}, longDescription: [${JSON.stringify(desc)}], image: '/images/products/${slug}/main.webp', sourceImageUrl: '', externalUrl: ${JSON.stringify(url)} },`)
}
console.log('===CATALOG_TS_END===')
