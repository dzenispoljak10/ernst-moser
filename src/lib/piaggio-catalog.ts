/**
 * Piaggio model catalog for /nutzfahrzeugcenter/piaggio/*.
 *
 * Zwei Produktfamilien: Porter NP6 (Verbrennung / CNG) und Porter NPE (Elektro).
 * Brand-Seite rendert 2 Sections, jede mit eigenen Karten.
 *
 * Kein Ape — ausgeschlossen per Spec.
 */

export interface PiaggioModel {
  slug: string
  title: string
  shortDescription: string
  longDescription: string[]
  image: string
  externalUrl: string
  color: string
}

export interface PiaggioSection {
  key: 'np6' | 'npe'
  label: string
  sectionTitle: string
  sectionLead: string
  models: PiaggioModel[]
}

// Slugs match Sanity product slugs (product-piaggio-<slug>).
export const PIAGGIO_SECTIONS: PiaggioSection[] = [
  {
    key: 'np6',
    label: 'Porter NP6 – Benzin / Gas',
    sectionTitle: 'Porter NP6 – Benzin / Gas',
    sectionLead:
      'Der Piaggio Porter NP6 mit Benzin- oder CNG-Motorisierung (Gas) – als Chassis mit Einzel- oder Doppelrad sowie als Pickup und 3-Seitenkipper für Gewerbe und Kommunaldienste.',
    models: [
      {
        slug: 'porter-np6-chassis-einzelbereifung',
        title: 'Porter NP6 Chassis Einzelbereifung',
        shortDescription: 'Das klassische Porter-Chassis mit Einzelbereifung – wendig, kompakt, vielseitig.',
        longDescription: [
          'Der Piaggio Porter NP6 mit Einzelbereifung (Einzelrad) kombiniert die kompakten Aussenmasse des Porter-Platforms mit dem bewährten Chassis-Aufbau – eine solide Basis für individuelle Karosserien.',
          'Wahlweise mit Benzin- oder CNG-Motorisierung (Gas) – niedriger Verbrauch und reduzierte Emissionen, ideal für Gewerbe mit Stadtschwerpunkt.',
          'Wendekreis, Ladekapazität und Zuladung bleiben der Porter-DNA treu: klein aussen, gross innen.',
        ],
        image: '/images/products/piaggio-porter-np6-chassis-einzelbereifung/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/chassis/',
        color: '#C0392B',
      },
      {
        slug: 'porter-np6-chassis-zwillingsbereifung',
        title: 'Porter NP6 Chassis Zwillingsbereifung',
        shortDescription: 'Chassis mit Zwillingsbereifung – mehr Stabilität und höhere Nutzlast.',
        longDescription: [
          'Der Piaggio Porter NP6 mit Zwillingsbereifung (Doppelrad) hinten erhöht Stabilität und zulässige Nutzlast – erste Wahl für Kipp- und Kofferaufbauten mit hoher Zuladung.',
          'Wahlweise mit Benzin- oder CNG-Motorisierung (Gas), kombiniert mit robusterer Hinterachse für den harten Einsatz.',
          'Ideal für Bau- und Gartenunternehmen, die oft bis an die Gewichtsgrenze beladen.',
        ],
        image: '/images/products/piaggio-porter-np6-chassis-zwillingsbereifung/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/chassis/',
        color: '#1F4ED8',
      },
      {
        slug: 'porter-np6-pickup',
        title: 'Porter NP6 Pickup',
        shortDescription: 'Pickup mit offener Ladefläche – schnell be- und entladen.',
        longDescription: [
          'Der Piaggio Porter NP6 als Pickup bietet eine offene Ladefläche mit niedriger Ladekante – ideal zum schnellen Be- und Entladen von Material, Werkzeug und Gütern.',
          'Wahlweise mit Benzin- oder CNG-Motorisierung (Gas) und in Einzel- oder Doppelrad-Ausführung erhältlich.',
          'Kompakte Aussenmasse, grosse Wendigkeit – der ideale Begleiter für Handwerk, Gartenbau und kommunale Dienste.',
        ],
        image: '/images/products/piaggio-porter-np6-pickup/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/pick-up-np6-nutzfahrzeug-1/',
        color: '#4A7C59',
      },
      {
        slug: 'porter-np6-dreiseitenkipper',
        title: 'Porter NP6 3-Seitenkipper',
        shortDescription: '3-Seitenkipper – kippbar nach hinten und zu beiden Seiten.',
        longDescription: [
          'Der Piaggio Porter NP6 als 3-Seitenkipper lässt sich nach hinten und zu beiden Seiten kippen – maximale Flexibilität beim Entladen von Aushub, Grünschnitt oder Baumaterial.',
          'Wahlweise mit Benzin- oder CNG-Motorisierung (Gas) und in Einzel- oder Doppelrad-Ausführung für hohe Nutzlast.',
          'Das Arbeitstier für Bau, Gartenbau und kommunalen Unterhalt – kompakt, wendig und robust.',
        ],
        image: '/images/products/piaggio-porter-np6-dreiseitenkipper/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/kipper/',
        color: '#E67E22',
      },
    ],
  },
  {
    key: 'npe',
    label: 'Porter NPE – Elektro',
    sectionTitle: 'Porter NPE – Elektro',
    sectionLead:
      'Die vollelektrische Porter-Generation. Vier Aufbauvarianten auf dem gleichen Chassis – lokal emissionsfrei, leise, ideal für urbane Einsätze und kommunale Dienste.',
    models: [
      {
        slug: 'porter-npe-chassis-einzelbereifung',
        title: 'Porter NPE Chassis Einzelbereifung',
        shortDescription: 'Elektro-Chassis als Basis für individuelle Aufbauten.',
        longDescription: [
          'Der Piaggio Porter NPE als Chassis mit Einzelbereifung – die elektrische Basis für Koffer, Kran, Spezialaufbauten und mehr.',
          'Vollelektrischer Antrieb mit reichhaltiger Drehmoment-Reserve und ruhigem Lauf – ideal für Nachteinsätze und Innenstadt-Verkehrsberuhigungszonen.',
          'Gleiche Abmessungen wie die NP6-Variante; Aufbauten sind oft direkt übertragbar.',
        ],
        image: '/images/products/piaggio-porter-npe-chassis-einzelbereifung/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
        color: '#F5C518',
      },
      {
        slug: 'porter-npe-pritsche-einzelbereifung',
        title: 'Porter NPE Pritsche Einzelbereifung',
        shortDescription: 'Elektro-Pritsche mit offener Ladefläche.',
        longDescription: [
          'Offene Ladefläche mit Bordwänden – die klassische Pritsche als vollelektrische Porter-NPE-Variante.',
          'Perfekt für Gartenbau, Reinigung, Bauzulieferung und alle Einsätze, bei denen Material schnell von oben geladen werden soll.',
          'Vollelektrisch, lokal emissionsfrei und flüsterleise.',
        ],
        image: '/images/products/piaggio-porter-npe-pritsche-einzelbereifung/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
        color: '#F3F4F6',
      },
      {
        slug: 'porter-npe-heckkipper-einzelbereifung',
        title: 'Porter NPE Rückwärtskipper Einzelbereifung',
        shortDescription: 'Elektro-Rückwärtskipper für effizientes Entladen.',
        longDescription: [
          'Der Porter NPE mit Rückwärtskipper – hydraulisch kippbare Ladefläche für schnelles Entleeren von Aushub, Grünschnitt oder Baumaterial.',
          'Volle Elektroleistung beim Kippen, keine Diesel-Geräusche in Wohngebieten.',
          'Das Lieblingsfahrzeug kommunaler Werkhöfe und privater Gartenbau-Unternehmen.',
        ],
        image: '/images/products/piaggio-porter-npe-heckkipper-einzelbereifung/main.webp',
        externalUrl: 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
        color: '#1F4ED8',
      },
    ],
  },
]

export const PIAGGIO_MODELS = PIAGGIO_SECTIONS.flatMap((s) => s.models)

export function getPiaggioModel(slug: string) {
  return PIAGGIO_MODELS.find((m) => m.slug === slug) ?? null
}
