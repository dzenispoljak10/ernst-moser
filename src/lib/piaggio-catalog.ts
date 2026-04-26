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
    label: 'Porter NP6 – Chassis',
    sectionTitle: 'Porter NP6 – Chassis',
    sectionLead:
      'Das bewährte Piaggio-Porter-Chassis in Einzel- oder Zwillingsbereifung. Long-Range CNG-Motorisierung für Gewerbe und Kommunaldienste.',
    models: [
      {
        slug: 'porter-np6-chassis-einzelbereifung',
        title: 'Porter NP6 Chassis Einzelbereifung',
        shortDescription: 'Das klassische Porter-Chassis mit Einzelbereifung – wendig, kompakt, vielseitig.',
        longDescription: [
          'Der Piaggio Porter NP6 mit Einzelbereifung kombiniert die kompakten Aussenmasse des Porter-Platforms mit dem bewährten Chassis-Aufbau – eine solide Basis für individuelle Karosserien.',
          'Long-Range CNG-Motorisierung mit niedrigem Verbrauch und reduzierten Emissionen, ideal für Gewerbe mit Stadtschwerpunkt.',
          'Wendekreis, Ladekapazität und Zuladung bleiben der Porter-DNA treu: klein aussen, gross innen.',
        ],
        image: '/images/products/piaggio-porter-np6-chassis-einzelbereifung/main.webp',
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/chassis/chassis-einzelbereifung-long-range-cng/',
        color: '#C0392B',
      },
      {
        slug: 'porter-np6-chassis-zwillingsbereifung',
        title: 'Porter NP6 Chassis Zwillingsbereifung',
        shortDescription: 'Chassis mit Zwillingsbereifung – mehr Stabilität und höhere Nutzlast.',
        longDescription: [
          'Der Piaggio Porter NP6 mit Zwillingsbereifung hinten erhöht Stabilität und zulässige Nutzlast – erste Wahl für Kipp- und Kofferaufbauten mit hoher Zuladung.',
          'Gleiche Long-Range CNG-Motorisierung wie die Einzel-Variante, kombiniert mit robusterer Hinterachse für den harten Einsatz.',
          'Ideal für Bau- und Gartenunternehmen, die oft bis an die Gewichtsgrenze beladen.',
        ],
        image: '/images/products/piaggio-porter-np6-chassis-zwillingsbereifung/main.webp',
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/chassis/chassis-zwillingsbereifung-long-range-cng/',
        color: '#1F4ED8',
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
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/chassis-npe/chassis-npe-einzelbereifung-electric/',
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
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/pritsche/pritsche-einzelbereifung-electric/',
        color: '#F3F4F6',
      },
      {
        slug: 'porter-npe-heckkipper-einzelbereifung',
        title: 'Porter NPE Heckkipper Einzelbereifung',
        shortDescription: 'Elektro-Heckkipper für effizientes Entladen.',
        longDescription: [
          'Der Porter NPE mit Heckkipper – hydraulisch kippbare Ladefläche für schnelles Entleeren von Aushub, Grünschnitt oder Baumaterial.',
          'Volle Elektroleistung beim Kippen, keine Diesel-Geräusche in Wohngebieten.',
          'Das Lieblingsfahrzeug kommunaler Werkhöfe und privater Gartenbau-Unternehmen.',
        ],
        image: '/images/products/piaggio-porter-npe-heckkipper-einzelbereifung/main.webp',
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/heckkipper/heckkipper-einzelbereifung-electric/',
        color: '#1F4ED8',
      },
      {
        slug: 'porter-npe-heckkipper-grasfanggitter',
        title: 'Porter NPE Heckkipper mit Grasfanggitter',
        shortDescription: 'Heckkipper mit Grasfanggitter – für Grünschnitt und Laub.',
        longDescription: [
          'Der Heckkipper NPE mit montiertem Grasfanggitter ist spezifisch für Grünflächen-Unterhalt und Laubsammeldienste ausgelegt.',
          'Das Fanggitter vergrössert das Ladevolumen für leichtes Material wie Rasenschnitt, Laub und kleines Schnittgut um ein Vielfaches.',
          'Erste Wahl für Gartenbau, Unterhalt von Parks und kommunale Grünpflege.',
        ],
        image: '/images/products/piaggio-porter-npe-heckkipper-grasfanggitter/main.webp',
        externalUrl: 'https://commercial.piaggio.com/de_DE/modelle/heckkipper-mit-grasfanggitter/heckkipper-mit-grasfanggitter-einzelbereifung-electric/',
        color: '#E67E22',
      },
    ],
  },
]

export const PIAGGIO_MODELS = PIAGGIO_SECTIONS.flatMap((s) => s.models)

export function getPiaggioModel(slug: string) {
  return PIAGGIO_MODELS.find((m) => m.slug === slug) ?? null
}
