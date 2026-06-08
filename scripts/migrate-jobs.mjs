import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })

const JOBS = [
  { _id: 'job-mechatroniker-nfz', kind: 'stelle', title: 'Automobil-Mechatroniker resp. Fachmann Nutzfahrzeuge', center: 'Nutzfahrzeugcenter', centerColor: '#1B2D5B', type: 'Festanstellung', pensum: '100%', location: 'Gerlafingen SO', description: 'Als Automobil-Mechatroniker bei Ernst Moser sind Sie verantwortlich für Reparaturen, Service und Unterhalt unserer Nutzfahrzeugflotte. Sie arbeiten mit modernsten Diagnosegeräten an Fahrzeugen führender Marken wie Scania, Isuzu und Fiat Professional.', pdfUrl: 'https://test.eprofis.ch/automobil-mechatroniker-resp-fachmann-nutfahrzeuge/', order: 1, isActive: false },
  { _id: 'job-motorgeraetemechaniker', kind: 'stelle', title: 'Motorgerätemechaniker', center: 'Motorgerätecenter', centerColor: '#4A7C59', type: 'Festanstellung', pensum: '100%', location: 'Gerlafingen SO', description: 'Als Motorgerätemechaniker warten und reparieren Sie das gesamte Sortiment unserer Motorgeräte – von Stihl-Motorsägen über Mähroboter bis zu professionellen Reinigungsgeräten. Abwechslungsreiche Aufgaben in einem eingespielten Team.', pdfUrl: 'https://test.eprofis.ch/motorgeraetemechaniker/', order: 2, isActive: false },
  { _id: 'job-lehre-automobilfachmann', kind: 'lehrstelle', title: 'Automobil-Fachmann/-frau', center: 'Nutzfahrzeugcenter', centerColor: '#1B2D5B', duration: '3 Jahre', description: 'Ausbildung im Bereich Nutzfahrzeuge: Diagnose, Reparatur, Service und Wartung von LKW und leichten Nutzfahrzeugen.', order: 1, isActive: false },
  { _id: 'job-lehre-motorgeraetemechaniker', kind: 'lehrstelle', title: 'Motorgerätemechaniker/in', center: 'Motorgerätecenter', centerColor: '#4A7C59', duration: '3 Jahre', description: 'Ausbildung im Bereich Motorgeräte, Kommunalmaschinen und Gartentechnik. Vielseitiges Tätigkeitsfeld mit modernsten Maschinen.', order: 2, isActive: false },
]

for (const j of JOBS) {
  await client.createOrReplace({ _type: 'jobPosting', ...j })
  console.error(`OK ${j._id} (${j.kind}, isActive=${j.isActive})`)
}
console.error('done')
