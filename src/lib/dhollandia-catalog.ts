/**
 * Dhollandia Hebebühnen-Katalog für /nutzfahrzeugcenter/dhollandia/*.
 *
 * 6 Kategorien (nur Nutzfahrzeug-Hebebühnen, KEINE Personenlifte):
 *  1. Kastenwagen Hebebühnen   (light → Michael)
 *  2. Standard Hebebühnen       (heavy → Roland)
 *  3. Unterfahrbare Hebebühnen  (heavy → Roland)
 *  4. Vertikallifte             (heavy → Roland)
 *  5. Falthebebühnen            (heavy → Roland)
 *  6. Spezialausführungen       (heavy → Roland)
 *
 * Slug-Konvention: dhollandia-<modell-lowercase> (z. B. dhollandia-dh-lm-10).
 * Externe URL: offizielle dhollandia.com/CH/de Produktseite.
 */

export type DhollandiaCategoryKey =
  | 'kastenwagen'
  | 'standard'
  | 'unterfahrbar'
  | 'vertikal'
  | 'falt'
  | 'spezial'

export type DhollandiaWeightClass = 'light' | 'heavy'

export interface DhollandiaModel {
  /** Sanity / URL slug (full, mit Marken-Prefix) */
  slug: string
  /** Modellbezeichnung */
  title: string
  /** Karten-Beschreibung 1–2 Sätze */
  shortDescription: string
  /** Detail-Beschreibung in Absätzen */
  longDescription: string[]
  /** Lokales Produktbild */
  image: string
  /** Originalbild-URL für den Sync-Schritt */
  sourceImageUrl: string
  /** Offizielle Dhollandia-Produktseite */
  externalUrl: string
  /** Eingewichtklasse → routet die Anfrage-Mail */
  weightClass: DhollandiaWeightClass
}

export interface DhollandiaSection {
  key: DhollandiaCategoryKey
  label: string
  sectionTitle: string
  sectionLead: string
  models: DhollandiaModel[]
}

const BASE = 'https://www.dhollandia.com/library/product/large'

export const DHOLLANDIA_SECTIONS: DhollandiaSection[] = [
  // ─── 1. Kastenwagen Hebebühnen (LIGHT) ──────────────────────────────────────
  {
    key: 'kastenwagen',
    label: 'Kastenwagen Hebebühnen',
    sectionTitle: 'Kastenwagen Hebebühnen',
    sectionLead:
      'Kompakte Hubladebühnen für Lieferwagen und Kleintransporter – ideal für City-Logistik, Handwerk und Paketzustellung.',
    models: [
      {
        slug: 'dhollandia-dh-lsp-07',
        title: 'DH-LSP.07',
        shortDescription:
          'VAN-Lift mit maximaler Plattformfläche für Kastenwagen – einfache Montage ohne Chassis-Ausschnitte.',
        longDescription: [
          'Innovativer Van-Lift, der ohne Chassis-Ausschnitte montiert wird und maximale Plattformfläche für Kastenwagen bietet.',
          'Die kompakte Bauform schont die Restnutzlast und ermöglicht eine schnelle Werkstatt-Installation.',
        ],
        image: '/images/products/dhollandia-dh-lsp-07/main.webp',
        sourceImageUrl: `${BASE}/8pX5IatsUaohDA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/441',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-lsp-10',
        title: 'DH-LSP.10',
        shortDescription:
          'Speziell für Iveco Daily entwickelt – 2 Hubzylinder für hervorragende Plattformstabilität.',
        longDescription: [
          'Speziell für Iveco Daily Kastenwagen entwickelte Hubladebühne mit 2 Hubzylindern.',
          'Hervorragende Plattformstabilität auch unter ungleichmässiger Last – ideal für Paletten und Rollwagen.',
        ],
        image: '/images/products/dhollandia-dh-lsp-10/main.webp',
        sourceImageUrl: `${BASE}/wbMRItyhO7JhQg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/150',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-p2-05',
        title: 'DH-P2.05',
        shortDescription:
          'Vollautomatischer 2-Armenlift mit verstärkter Konstruktion für maximale Plattformstabilität.',
        longDescription: [
          'Vollautomatischer 2-Armenlift mit verstärkter Konstruktion.',
          'Sehr hohe Plattformstabilität, geeignet für die meisten gängigen Kastenwagen-Modelle.',
        ],
        image: '/images/products/dhollandia-dh-p2-05/main.webp',
        sourceImageUrl: `${BASE}/cBSbcClX4AacWQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/66',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-p1-03',
        title: 'DH-P1.03',
        shortDescription:
          'Kompakter 1-Arm Hubwagen für Kastenwagen mit automatischer Abrollsicherung.',
        longDescription: [
          'Kompakter 1-Arm-Lift für Kastenwagen und kleine Transporter.',
          'Automatische Abrollsicherung erhöht die Sicherheit beim Be- und Entladen.',
        ],
        image: '/images/products/dhollandia-dh-p1-03/main.webp',
        sourceImageUrl: `${BASE}/yQQ4MnbbruYG6Q.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/82',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-c001-03',
        title: 'DH-C001.03',
        shortDescription:
          'Kassetten-Lift: Plattform verschwindet unter dem Ladeboden – Hecktüren bleiben frei zugänglich.',
        longDescription: [
          'Plattform wird in einer verschlossenen Kassettenbox unter dem Ladeboden verstaut.',
          'Hecktüren bleiben frei zugänglich – ideal für Mischbetrieb mit häufigem Türöffnen.',
        ],
        image: '/images/products/dhollandia-dh-c001-03/main.webp',
        sourceImageUrl: `${BASE}/zfiZb1oAZM6szw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/87',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-vz-03',
        title: 'DH-VZ.03',
        shortDescription:
          'Innenvertikallift mit seitlich rotierender Plattform – passend für viele Kastenwagen.',
        longDescription: [
          'Innenvertikallift, ideal für viele Fahrzeugtypen.',
          'Plattform rotiert seitlich nach aussen, behält wertvolle Ladekapazität.',
        ],
        image: '/images/products/dhollandia-dh-vz-03/main.webp',
        sourceImageUrl: `${BASE}/bui3a82WhoJbqw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/77',
        weightClass: 'light',
      },
      {
        slug: 'dhollandia-dh-ai12',
        title: 'DH-AI12 / AI13',
        shortDescription:
          'Manuell klappbare Aluminium-Rampen mit Gasdruckdämpfern – leicht, robust, vielseitig.',
        longDescription: [
          'Manuell klappbare Rampen aus Aluminium mit Gasdruckdämpfern.',
          'Geeignet für verschiedene Fahrzeugtypen – flexible Lösung für unterschiedliche Einsatzszenarien.',
        ],
        image: '/images/products/dhollandia-dh-ai12/main.webp',
        sourceImageUrl: `${BASE}/FTbAefMGSaTJfg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/64/product/161',
        weightClass: 'light',
      },
    ],
  },

  // ─── 2. Standard Hebebühnen (HEAVY) ─────────────────────────────────────────
  {
    key: 'standard',
    label: 'Standard Hebebühnen',
    sectionTitle: 'Standard Hebebühnen',
    sectionLead:
      'Klassische Hubladebühnen für LKW und Anhänger – vom Einsteigermodell bis zur 6-Tonnen-Schwerlastausführung.',
    models: [
      {
        slug: 'dhollandia-dh-le-08',
        title: 'DH-LE.08',
        shortDescription:
          'Leichte 2-Zylinder-Hebebühne für Fahrzeuge mit kurzem Überhang – behält die Reserveradposition.',
        longDescription: [
          'Leichte 2-Zylinder-Hebebühne für Fahrzeuge mit sehr kurzem Überhang.',
          'Spart Gewicht und behält die Reserveradposition – flexibel einsetzbar bis 750 kg.',
        ],
        image: '/images/products/dhollandia-dh-le-08/main.webp',
        sourceImageUrl: `${BASE}/p6bfnupRaDGDfg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/34',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lm-10',
        title: 'DH-LM.10',
        shortDescription:
          '4-Zylinder-Spitzenreiter mit hervorragender Stabilität – ideal für Fahrzeuge bis 7,5 t.',
        longDescription: [
          '4-Zylinder-Hubladebühne mit hervorragender Stabilität und Zuverlässigkeit.',
          'Ideal für Fahrzeuge bis 7,5 Tonnen Gesamtgewicht – das Standardmodell für mittelschwere Verteilung.',
        ],
        image: '/images/products/dhollandia-dh-lm-10/main.webp',
        sourceImageUrl: `${BASE}/p0laqdnLQl2hOA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/37',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lm-15',
        title: 'DH-LM.15',
        shortDescription:
          'Leistungsstarke 4-Zylinder-Ladebordwand für LKW von 7,5 bis 12 Tonnen Gesamtgewicht.',
        longDescription: [
          'Leistungsstarke, stabile 4-Zylinder-Ladebordwand für LKW von 7,5 bis 12 Tonnen.',
          'Geeignet für Speditionen, Bauzulieferung und gewerblichen Mehrschichtbetrieb.',
        ],
        image: '/images/products/dhollandia-dh-lm-15/main.webp',
        sourceImageUrl: `${BASE}/gk94ydEjCyRfvQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/39',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lm-20',
        title: 'DH-LM.20',
        shortDescription:
          'Vielseitige 2-Tonnen-Klasse für Fahrzeuge über 7,5 t, Anhänger und Auflieger.',
        longDescription: [
          'Besonders vielseitig einsetzbar für Nutzfahrzeuge über 7,5 t sowie für Anhänger und Auflieger.',
          'Plattformlängen bis 2.250 mm – passend für nationale wie internationale Logistik.',
        ],
        image: '/images/products/dhollandia-dh-lm-20/main.webp',
        sourceImageUrl: `${BASE}/Hz4TXrMrSejBcQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/40',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lm-30',
        title: 'DH-LM.30',
        shortDescription:
          'Schwerlast-Hubladebühne für extreme Bedingungen – ideal für Getränke- und Lebensmittelhandel.',
        longDescription: [
          'Leistungsstarke Hubladebühne für schwere Arbeiten unter extremen Bedingungen.',
          'Ideal für Getränke- und Lebensmittelhandel mit hohem Umschlagvolumen.',
        ],
        image: '/images/products/dhollandia-dh-lm-30/main.webp',
        sourceImageUrl: `${BASE}/swau5nPzbSD4Ew.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/41',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lsu-40',
        title: 'DH-LSU.40',
        shortDescription:
          'Schwere Hubladebühne für 4 t mit verstärktem Hubmechanismus – für ungünstigen Lastschwerpunkt.',
        longDescription: [
          'Hubladebühne für schwere Lasten auf ungünstigem Lastschwerpunkt.',
          'Verstärkter Hubmechanismus für anspruchsvolle Industrie- und Maschinenanwendungen.',
        ],
        image: '/images/products/dhollandia-dh-lsu-40/main.webp',
        sourceImageUrl: `${BASE}/ac5Q9Q0BbOHtIQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/42',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-lsu-60',
        title: 'DH-LSU.60',
        shortDescription:
          'Hochleistungs-Hubladebühne bis 6 t – für schwere Maschinen, Gabelstapler, Industrietransport.',
        longDescription: [
          'Hochleistungs-Hubladebühne mit extremer Hubkapazität.',
          'Hauptsächlich für Transport schwerer Maschinen und Gabelstapler eingesetzt.',
        ],
        image: '/images/products/dhollandia-dh-lsu-60/main.webp',
        sourceImageUrl: `${BASE}/h48PK2obNAnFjA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/33/product/43',
        weightClass: 'heavy',
      },
    ],
  },

  // ─── 3. Unterfahrbare Hebebühnen (HEAVY) ────────────────────────────────────
  {
    key: 'unterfahrbar',
    label: 'Unterfahrbare Hebebühnen',
    sectionTitle: 'Unterfahrbare Hebebühnen',
    sectionLead:
      'Plattform verschwindet komplett unter dem Chassis – freier Heckzugang, sauberer Look, ideal für City-Verteilung.',
    models: [
      {
        slug: 'dhollandia-dh-sc-05',
        title: 'DH-SC.05',
        shortDescription:
          'CITY SLIDER für Kastenwagen – Plattform verstaut sich unter dem Chassis in Fahrtposition.',
        longDescription: [
          'Hochleistungs-CITY-SLIDER-Hubladebühne für Kastenwagen.',
          'Sichere Verstauung unter dem Chassis in Fahrtposition – Hecktüren bleiben uneingeschränkt nutzbar.',
        ],
        image: '/images/products/dhollandia-dh-sc-05/main.webp',
        sourceImageUrl: `${BASE}/c3PjAj5KMr7fQw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/31/product/46',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-sm-15',
        title: 'DH-SM.15',
        shortDescription:
          'Leichteste unterfahrbare Hubladebühne – einfach gefaltete Plattform, kompakte Installation.',
        longDescription: [
          'Leichteste unterfahrbare Hubladebühne mit einfach gefalteter Plattform.',
          'Kompakte Installationsdimensionen – ideal für gewichtssensible Fahrzeuge.',
        ],
        image: '/images/products/dhollandia-dh-sm-15/main.webp',
        sourceImageUrl: `${BASE}/sq8yVG5gxWVgtA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/31/product/47',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-sm-30',
        title: 'DH-SM.30',
        shortDescription:
          'Unterfahrbare Hochleistungs-Hubladebühne mit verstärkter Plattform – für Verteilfahrzeuge.',
        longDescription: [
          'Unterfahrbare Hochleistungs-Hubladebühne mit robustem Hubwerk.',
          'Verstärkte Plattform für anspruchsvollen Dauereinsatz im Verteilverkehr.',
        ],
        image: '/images/products/dhollandia-dh-sm-30/main.webp',
        sourceImageUrl: `${BASE}/BguCmMDyVVfr0A.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/31/product/48',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-soc-10',
        title: 'DH-SO(C).10',
        shortDescription:
          'Leichteste unterfahrbare Bühne mit doppelt gefalteter Plattform – für kurzen Überhang.',
        longDescription: [
          'Leichteste unterfahrbare Hubladebühne mit doppelt gefalteter Plattform.',
          'Ideal für Fahrzeuge mit kurzem Überhang – maximale Plattformfläche bei minimalem Bauraum.',
        ],
        image: '/images/products/dhollandia-dh-soc-10/main.webp',
        sourceImageUrl: `${BASE}/iYtPQTPHcK6Rjg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/31/product/51',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-so7-20',
        title: 'DH-SO7.20',
        shortDescription:
          'Doppelt gefaltete Plattform speziell für Auslieferfahrzeuge und Paketzustellung.',
        longDescription: [
          'Unterfahrbare Hubladebühne mit doppelt gefalteter Plattform.',
          'Speziell für Auslieferfahrzeuge und Paketzustellung mit hoher Touren-Frequenz.',
        ],
        image: '/images/products/dhollandia-dh-so7-20/main.webp',
        sourceImageUrl: `${BASE}/fjP5ZcQ2HO9yDQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/31/product/52',
        weightClass: 'heavy',
      },
    ],
  },

  // ─── 4. Vertikallifte (HEAVY) ───────────────────────────────────────────────
  {
    key: 'vertikal',
    label: 'Vertikallifte',
    sectionTitle: 'Vertikallifte',
    sectionLead:
      'Vertikal hubende Plattformen mit dichtschliessender Hecktür – ideal für temperaturgeführte Logistik und Kühl-Transporte.',
    models: [
      {
        slug: 'dhollandia-dh-vo-07-k1',
        title: 'DH-VO.07.K1',
        shortDescription:
          'Single-Deck-Lift bis 7,5 t mit einteiliger Aluminium-Plattform – maximaler Wirkungsgrad.',
        longDescription: [
          'Single-Deck-Lift für Nutzfahrzeuge bis 7,5 t.',
          'Einteilige Aluminium-Plattform in Standardausführung – maximaler Wirkungsgrad bei niedrigem Eigengewicht.',
        ],
        image: '/images/products/dhollandia-dh-vo-07-k1/main.webp',
        sourceImageUrl: `${BASE}/cdMar4zroQimxw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/131/product/111',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-vo-10-k1',
        title: 'DH-VO.10.K1',
        shortDescription:
          'Mittelschwerer Vertikallift bis 15 t – manuell oder hydraulisch schliessbare Plattform.',
        longDescription: [
          'Mittelschwerer Vertikallift mit manuell oder hydraulisch schliessbarer Plattform.',
          'Ideal für Fahrzeuge bis 15 Tonnen und für temperaturgeführte Aufbauten.',
        ],
        image: '/images/products/dhollandia-dh-vo-10-k1/main.webp',
        sourceImageUrl: `${BASE}/vcEqUMN5vCIwHw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/131/product/112',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-vo-15-k1',
        title: 'DH-VO.15.K1',
        shortDescription:
          'Schwerlast-Vertikallift mit Aluminium- oder Stahlplattform und verstärkten Säulen.',
        longDescription: [
          'Schwerlast-Vertikallift mit Aluminium- oder robuster Stahl-Plattform.',
          'Verstärkte Stahlsäulen für höchste Lasten und langjährigen Einsatz im Schwerlastbereich.',
        ],
        image: '/images/products/dhollandia-dh-vo-15-k1/main.webp',
        sourceImageUrl: `${BASE}/2ug57mryhvXl2Q.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/131/product/113',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-vo-20-k9',
        title: 'DH-VO.20.K9',
        shortDescription:
          'Leistungsstärkster Kettenlift mit bis zu 2.000 kg Hubkraft und verstärkter Stahlausführung.',
        longDescription: [
          'Leistungsstärkste Ausführung in Kettenliftsystemen mit bis zu 2.000 kg Hubkraft.',
          'Verstärkte Stahlkomponenten für Schwerlastanwendungen wie Maschinen-Transport.',
        ],
        image: '/images/products/dhollandia-dh-vo-20-k9/main.webp',
        sourceImageUrl: `${BASE}/nptj0in65V1wuw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/131/product/122',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-vb-15-e1',
        title: 'DH-VB.15.E1',
        shortDescription:
          'Robuster Einzelstock-Vertikallift – speziell für Supermarkt- und Lebensmittelhandel.',
        longDescription: [
          'Robuster Einzelstock-Vertikallift speziell für anspruchsvolle Einsätze.',
          'Standardausstattung für Supermarkt-Belieferung und Lebensmittelhandel.',
        ],
        image: '/images/products/dhollandia-dh-vb-15-e1/main.webp',
        sourceImageUrl: `${BASE}/M7NUzDsg77WPfw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/131/product/116',
        weightClass: 'heavy',
      },
    ],
  },

  // ─── 5. Falthebebühnen (HEAVY) ──────────────────────────────────────────────
  {
    key: 'falt',
    label: 'Falthebebühnen',
    sectionTitle: 'Falthebebühnen',
    sectionLead:
      'Faltbare Plattformen mit «Half-Dip»-Bewegung – wirtschaftliche Lösung für Paletten- und Kistenentladung.',
    models: [
      {
        slug: 'dhollandia-dh-rp-10',
        title: 'DH-RP.10',
        shortDescription:
          'Leichte, robuste Half-Dip-Hubladebühne mit hervorragendem Preis-Leistungs-Verhältnis.',
        longDescription: [
          'Leichte, robuste faltbare Hubladebühne mit Half-Dip-Plattformbewegung.',
          'Verstaut sich unter dem Chassis – hervorragendes Preis-Leistungs-Verhältnis für mittlere Lasten.',
        ],
        image: '/images/products/dhollandia-dh-rp-10/main.webp',
        sourceImageUrl: `${BASE}/yHhuzU1tyihEYw.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/55/product/57',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-rp-15',
        title: 'DH-RP.15',
        shortDescription:
          'Schwerlast-Falthebebühne mit Half-Dip-Bewegung – wirtschaftliche Paletten- und Kistenentladung.',
        longDescription: [
          'Schwerlast Falt-Hubladebühne mit Half-Dip-Plattformbewegung.',
          'Wirtschaftliche Lösung für Paletten- und Kistenentladung im Verteilverkehr.',
        ],
        image: '/images/products/dhollandia-dh-rp-15/main.webp',
        sourceImageUrl: `${BASE}/ORQazDz1lp9ohg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/55/product/61',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-rc-10',
        title: 'DH-RC.10',
        shortDescription:
          'Leichte Falthebebühne mit waagerechter Plattform und automatischer Bodenangleichung.',
        longDescription: [
          'Leichte Falt-Hubladebühne mit waagerechter Plattform.',
          'Automatische Bodenangleichung – ideal für häufige Ladevorgänge an Rampen und Bordsteinen.',
        ],
        image: '/images/products/dhollandia-dh-rc-10/main.webp',
        sourceImageUrl: `${BASE}/bNoyIDDWRBvdrg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/55/product/62',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-rc-15',
        title: 'DH-RC.15',
        shortDescription:
          'Falthebebühne für mittelschwere Nutzfahrzeuge – waagerechte Plattform mit Auto-Bodenangleichung.',
        longDescription: [
          'Faltbare Hubladebühne für mittelschwere Nutzfahrzeuge.',
          'Waagerechte Plattform mit automatischer Bodenangleichung für effiziente Ladevorgänge.',
        ],
        image: '/images/products/dhollandia-dh-rc-15/main.webp',
        sourceImageUrl: `${BASE}/ZVBVStJwIUpAiQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/55/product/58',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-rm-20',
        title: 'DH-RM.20',
        shortDescription:
          'Hochleistungs-Falthebebühne mit 2 Hubzylindern und breiter Hubschwinge.',
        longDescription: [
          'Hochleistungs-Falt-Hubladebühne mit 2 Hubzylindern und breiter Hubschwinge.',
          'Automatische Bodenangleichung – die professionelle Lösung für anspruchsvolle Verteilfahrzeuge.',
        ],
        image: '/images/products/dhollandia-dh-rm-20/main.webp',
        sourceImageUrl: `${BASE}/ZsTZtEI5l8dBbA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/55/product/59',
        weightClass: 'heavy',
      },
    ],
  },

  // ─── 6. Spezialausführungen (HEAVY) ─────────────────────────────────────────
  {
    key: 'spezial',
    label: 'Spezialausführungen',
    sectionTitle: 'Spezialausführungen',
    sectionLead:
      'Massgeschneiderte Lösungen für besondere Aufgaben – Rampen, Brücken-Hebebühnen und industrielle Schwerlast-Anwendungen.',
    models: [
      {
        slug: 'dhollandia-dh-am-25',
        title: 'DH-AM.25',
        shortDescription:
          'Leichte, robuste manuelle Aluminium-Rampe mit integrierten Torsionsfedern.',
        longDescription: [
          'Leichte aber robuste manuelle Rampe mit Vollaluminium-Plattform.',
          'Integrierte Torsionsfedern für komfortables Öffnen und Schliessen – auch für eine Person.',
        ],
        image: '/images/products/dhollandia-dh-am-25/main.webp',
        sourceImageUrl: `${BASE}/bG01HpfkO7qG0w.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/69/product/71',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-ach-10',
        title: 'DH-ACH.10.01',
        shortDescription:
          'Leichte hydraulische Aluminium-Rampe mit elegant in die Türen integriertem Schliessmechanismus.',
        longDescription: [
          'Leichte hydraulische Rampe mit Aluminium-Plattform und eleganter Konstruktion.',
          'Schliessmechanismus ist in die Fahrzeugtüren integriert – ein cleaner, effizienter Look.',
        ],
        image: '/images/products/dhollandia-dh-ach-10/main.webp',
        sourceImageUrl: 'https://www.dhollandia.com/library/product/large/m5NBRkpYcBRqYg.jpg',
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/69/product/70',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-ar11',
        title: 'DH-AR11 / AR12',
        shortDescription:
          'Hydraulische Hochleistungs-Rampen mit einteiliger Stahlplattform – bis 20 t mit individueller Konfiguration.',
        longDescription: [
          'Hydraulische Hochleistungs-Rampen mit einteiliger Stahlplattform.',
          'Umfangreiche Optionen zur individuellen Ausführung – bis zu 20 Tonnen Tragfähigkeit für Industrie und Logistik.',
        ],
        image: '/images/products/dhollandia-dh-ar11/main.webp',
        sourceImageUrl: `${BASE}/NzJVYUpwySATbg.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/69/product/73',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-ap-25',
        title: 'DH-AP.25',
        shortDescription:
          'Aluminium-Rampen für Motorwagen mit Anhänger – zwei klappbare Rampen für Ladungstransfer.',
        longDescription: [
          'Aluminium-Rampen für Motorwagen mit Anhänger.',
          'Zwei klappbare Rampen (je 1.250 × 1.200 mm) ermöglichen Ladungsbewegung zwischen Fahrzeug und Anhänger.',
        ],
        image: '/images/products/dhollandia-dh-ap-25/main.webp',
        sourceImageUrl: `${BASE}/pUjau4blRjUZEA.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/69/product/72',
        weightClass: 'heavy',
      },
      {
        slug: 'dhollandia-dh-dr-90',
        title: 'DH-DR.90',
        shortDescription:
          'Brücken-Rampe mit 5 t- oder 9 t-Kapazität zwischen Laderampe und Fahrzeug – hydraulisch höhenverstellbar.',
        longDescription: [
          'Robuste Stahlplattform-Rampe mit 5 t- oder 9 t-Brückenkapazität zwischen Laderampe und Nutzfahrzeug.',
          'Hydraulische Höhenverstellung gleicht unterschiedliche Ladehöhen mühelos aus.',
        ],
        image: '/images/products/dhollandia-dh-dr-90/main.webp',
        sourceImageUrl: `${BASE}/Cw1VLCaNcoGTaQ.jpg`,
        externalUrl: 'https://www.dhollandia.com/CH/de/8/category/69/product/154',
        weightClass: 'heavy',
      },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALL_MODELS: DhollandiaModel[] = DHOLLANDIA_SECTIONS.flatMap((s) => s.models)

const BY_SLUG: Record<string, DhollandiaModel> = Object.fromEntries(
  ALL_MODELS.map((m) => [m.slug, m]),
)

export function getDhollandiaModel(productSlug: string): DhollandiaModel | null {
  return BY_SLUG[productSlug] ?? null
}

export function getDhollandiaExternalUrl(productSlug: string): string | null {
  return BY_SLUG[productSlug]?.externalUrl ?? null
}

const ROLAND_EMAIL = 'roland.burkhalter@ernst-moser.ch'
const MICHAEL_EMAIL = 'michael.peter@ernst-moser.ch'

export function getDhollandiaAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  const model = BY_SLUG[productSlug]
  if (!model) return null
  const recipient = model.weightClass === 'light' ? MICHAEL_EMAIL : ROLAND_EMAIL
  const subject = `Anfrage ${productName}`
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}`
}

export function getAllDhollandiaModels(): DhollandiaModel[] {
  return ALL_MODELS
}
