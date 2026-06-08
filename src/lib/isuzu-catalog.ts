/**
 * Isuzu model catalog for /nutzfahrzeugcenter/isuzu/*.
 *
 * Brand page renders 2 category sections with 3 light cards each, "Details"
 * link goes to the internal model subpage. The external isuzu.ch link
 * appears only on the subpage as the primary CTA.
 *
 * Alle externen Links zeigen auf die deutschen Seiten von isuzu.ch
 * (/de-ch/d-max/* und /de-ch/truck/*). Pro Modell ist zusätzlich das
 * passende deutsche Prospekt / technische Datenblatt (PDF) hinterlegt –
 * Quelle: isuzu.ch/de-ch/kataloge-preislisten-und-technische-datenblatter.
 */

export interface IsuzuModel {
  slug: string
  title: string
  shortDescription: string
  longDescription: string[]
  image: string
  externalUrl: string
  /** Deutsches Prospekt / technisches Datenblatt (PDF) */
  prospektUrl: string
}

export interface IsuzuCategory {
  slug: 'd-max' | 'truck'
  label: string
  sectionTitle: string
  sectionLead: string
  models: IsuzuModel[]
}

export const ISUZU_CATEGORIES: IsuzuCategory[] = [
  {
    slug: 'd-max',
    label: 'D-Max',
    sectionTitle: 'Pick-up für jeden Einsatz',
    sectionLead:
      'Drei Kabinenvarianten. 1.9 DDi Bi-Turbo-Diesel, 3.5 t Anhängelast, echte 4×4-Fähigkeit.',
    models: [
      {
        slug: 'single',
        title: 'Single',
        shortDescription: 'Maximale Ladefläche, kompakte Einzelkabine.',
        longDescription: [
          'Der D-Max Single Cab konzentriert sich auf das Wesentliche: die grösstmögliche Ladefläche auf dem kompakten D-Max-Chassis. Zwei Sitze, eine Tür pro Seite, maximaler Nutzraum hinten.',
          'Ideal für Gewerbe, Bau und Landwirtschaft, die Transportkapazität über alles stellen – inklusive Pritschen-, Kipper- und Kofferaufbau-Lösungen.',
          '1.9 DDi Bi-Turbo-Diesel mit 163 PS, 3.5 t Anhängelast, echtes Teilzeitallrad mit Geländeuntersetzung.',
        ],
        image: '/images/isuzu/d-max-single.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/d-max/single',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/dd831f1c-2396-4432-82e6-5349e872de07/SINGLE_N60B-4X4-Euro-6e_ted.pdf',
      },
      {
        slug: 'space',
        title: 'Space',
        shortDescription: 'Erweiterte Kabine mit Notsitzen hinten. Die goldene Mitte.',
        longDescription: [
          'Der D-Max Space Cab bietet eine verlängerte Kabine mit zusätzlichem Stauraum hinter den Vordersitzen und zwei Notsitzen – ideal für Zweimann-Teams und kurze Transfers mit Werkzeug.',
          'Gegenüber dem Single Cab bleibt die Ladefläche noch immer grosszügig; gegenüber dem Crew Cab sparen Sie Baulänge und Gewicht.',
          'Gleiches Antriebsstrang-Paket wie der Single: 1.9 DDi Bi-Turbo, 3.5 t Anhängelast, 4×4.',
        ],
        image: '/images/isuzu/d-max-space.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/d-max/space',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/a3c9d1fe-31dc-47a6-b539-fd8d6acd723b/SPACE_N60B_MY25_ted.pdf',
      },
      {
        slug: 'crew',
        title: 'Crew',
        shortDescription: 'Vollwertige Doppelkabine, fünf Sitzplätze plus Ladefläche.',
        longDescription: [
          'Der D-Max Crew Cab ist die Doppelkabinen-Variante mit fünf vollwertigen Sitzplätzen und vier Türen – Personentransport und Ladefläche in einem Fahrzeug.',
          'Erste Wahl für Bauleiter, Monteur-Teams oder Forst- und Jagdgebrauch – mit gleichem Einsatzradius wie Single und Space, aber voller Crew an Bord.',
          'Auch hier: 1.9 DDi Bi-Turbo mit 163 PS, 3.5 t Anhängelast, 4×4 mit Geländeuntersetzung.',
        ],
        image: '/images/isuzu/d-max-crew.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/d-max/crew',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/6e3d2ef8-5189-4f82-841d-5e3de66e902c/CREW_N60B---MY25_ted.pdf',
      },
    ],
  },
  {
    slug: 'truck',
    label: 'Truck',
    sectionTitle: 'Nutzfahrzeuge für jede Gewichtsklasse',
    sectionLead:
      'Von 3.5 t bis 14 t. Wendige Stadttransporter, Mittelklasse-Trucks und Schwerlast-Fahrzeuge für den härtesten Einsatz.',
    models: [
      {
        slug: '3-5-ton',
        title: '3.5 ton',
        shortDescription: 'Mit PW-Ausweis fahrbar. M21 und M27 für Stadt und Zubringer.',
        longDescription: [
          'Die 3.5-Tonnen-Klasse von Isuzu – M21 und M27 – ist mit dem normalen Personenwagen-Führerausweis fahrbar und prädestiniert für Stadtlogistik, Zubringerdienste und Kurier-Einsätze.',
          'Der wendige Radstand und die kompakte Kabine erlauben Manövrieren auch in engen Gassen; die Aufbauvielfalt reicht vom Kastenwagen bis zum Kipper.',
          'Robuster Antriebsstrang, Euro-6-Diesel und das bewährte Isuzu-Servicenetz in der Schweiz.',
        ],
        image: '/images/isuzu/truck-3-5-ton.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/truck/3-5-ton',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/9c84c330-4433-4294-ada6-941e53055257/ISUZU_N_SERISEct_MIDI_250618n_DE-CH_completo_Web.pdf',
      },
      {
        slug: '6-7-5-ton',
        title: '6 / 7.5 ton',
        shortDescription: 'Mittelklasse-Trucks. M29 mit 150 oder 190 PS, als Single oder Crew Cab.',
        longDescription: [
          'Die Mittelklasse-Trucks M29 und M30 decken den Bereich von 6 bis 7.5 Tonnen ab – das Arbeitspferd für Handwerk, Baustellenlogistik und regionale Verteilung.',
          'Motorisierung mit 150 oder 190 PS, wahlweise als Einzelkabine oder Mannschaftskabine (Crew Cab) mit bis zu sieben Sitzplätzen für mitfahrende Crews.',
          'Solider Kastenrahmen, hohe Nutzlast und das bewährte Isuzu-Servicenetz in der Schweiz.',
        ],
        image: '/images/isuzu/truck-6-7-5-ton.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/truck/6-7-5-ton',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/9c84c330-4433-4294-ada6-941e53055257/ISUZU_N_SERISEct_MIDI_250618n_DE-CH_completo_Web.pdf',
      },
      {
        slug: '10-14-ton',
        title: '10 / 14 ton',
        shortDescription: 'Schwerlast-Trucks der F-Serie für maximale Nutzlast und härtesten Einsatz.',
        longDescription: [
          'Die F-Serie – F10, F11, F12 und F14 – ist die Schwerlast-Liga im Isuzu-Programm. Entwickelt für hohe Nutzlasten, Dauereinsatz und anspruchsvolle Aufbauten.',
          'Typische Einsätze: Bauzulieferung, Kippaufbauten, Koffer- und Kühltransporter, Abrollkipper und spezielle kommunale Anwendungen.',
          'Robuster Antriebsstrang, Euro-6-Diesel, moderne Assistenz- und Sicherheitssysteme – alles gepaart mit klassischer Isuzu-Langlebigkeit.',
        ],
        image: '/images/isuzu/truck-10-14-ton.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/truck/10-14-ton',
        prospektUrl: 'https://www.isuzu.it/storage/uploads/f9c13f35-f23b-4c20-8f5e-302c0bd40245/ISUZU_F-SERISEct_MIDI_0627n_DE-CH_completo_Web.pdf',
      },
    ],
  },
]

export function getIsuzuModel(
  categorySlug: string,
  modelSlug: string,
): { category: IsuzuCategory; model: IsuzuModel } | null {
  const category = ISUZU_CATEGORIES.find((c) => c.slug === categorySlug)
  if (!category) return null
  const model = category.models.find((m) => m.slug === modelSlug)
  if (!model) return null
  return { category, model }
}

export function getAllIsuzuRoutes(): { category: string; model: string }[] {
  return ISUZU_CATEGORIES.flatMap((c) => c.models.map((m) => ({ category: c.slug, model: m.slug })))
}
