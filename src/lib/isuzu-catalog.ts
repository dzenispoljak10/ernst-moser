/**
 * Isuzu model catalog for /nutzfahrzeugcenter/isuzu/*.
 *
 * Brand page renders 2 category sections with 3 light cards each, "Details"
 * link goes to the internal model subpage. The external isuzu.ch link
 * appears only on the subpage as the primary CTA.
 *
 * URL locale mix is intentional: D-Max category pages on isuzu.ch live
 * under /it-ch/ only (/de-ch/dmax/* = 404). Trucks are available under
 * /de-ch/, which is preferable for DE-speaking CH customers.
 * User-supplied /it-it URLs on isuzu.it all return 404 (product moved).
 */

export interface IsuzuModel {
  slug: string
  title: string
  shortDescription: string
  longDescription: string[]
  image: string
  externalUrl: string
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
        externalUrl: 'https://www.isuzu.ch/it-ch/dmax/single',
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
        externalUrl: 'https://www.isuzu.ch/it-ch/dmax/space',
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
        externalUrl: 'https://www.isuzu.ch/it-ch/dmax/crew',
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
          'Varianten Gen-2 und Gen-3, je nach Aufbau als Single- oder Twin-Bereifung (T / TT), auch in der Heavy-Ausführung verfügbar.',
        ],
        image: '/images/isuzu/truck-3-5-ton.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/truck/3-5-ton',
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
      },
      {
        slug: '10-14-ton',
        title: '10 / 14 ton',
        shortDescription: 'Schwerlast-Trucks der F-Serie für maximale Nutzlast und härtesten Einsatz.',
        longDescription: [
          'Die F-Serie – F10, F11 und F14 – ist die Schwerlast-Liga im Isuzu-Programm. Entwickelt für hohe Nutzlasten, Dauereinsatz und anspruchsvolle Aufbauten.',
          'Typische Einsätze: Bauzulieferung, Kippaufbauten, Koffer- und Kühltransporter, Abrollkipper und spezielle kommunale Anwendungen.',
          'Robuster Antriebsstrang, Euro-6-Diesel, moderne Assistenz- und Sicherheitssysteme – alles gepaart mit klassischer Isuzu-Langlebigkeit.',
        ],
        image: '/images/isuzu/truck-10-14-ton.webp',
        externalUrl: 'https://www.isuzu.ch/de-ch/truck/10-14-ton',
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
