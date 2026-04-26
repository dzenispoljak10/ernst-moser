/**
 * UT (UT-AG.CH) Aufbauten-Katalog für /nutzfahrzeugcenter/ut/*.
 *
 * UT AG ist Schweizer Hersteller von Nutzfahrzeug-Aufbauten:
 *  - Absetzkipper
 *  - Abrollkipper
 *  - Mulden und Container für Absetzkipper
 *  - Container für Abrollkipper
 *  - Presscontainer
 *
 * Anfragen gehen an Roland (UT = schwer/Nutzfahrzeug-Aufbauten).
 */

export type UTCategoryKey =
  | 'absetzkipper'
  | 'abrollkipper'
  | 'absetz-mulden'
  | 'abroll-container'
  | 'presscontainer'

export interface UTModel {
  slug: string
  title: string
  category: UTCategoryKey
  shortDescription: string
  longDescription: string[]
  image: string
  /** Quell-Bild für Sync */
  sourceImageUrl: string
  /** Offizielle UT-Produktseite */
  externalUrl: string
}

const BASE = 'https://www.ut-ag.ch'

export const UT_MODELS: UTModel[] = [
  // ── Absetzkipper ──────────────────────────────────────────────────
  {
    slug: 'ut-gigant-12t-comfort',
    title: 'Teleskop-Absetzkipper GIGANT 12T Comfort',
    category: 'absetzkipper',
    shortDescription:
      'Der Wendige für leichte Transporte mit geringem Kilometerpreis – ideal zum Stellen leerer Mulden und Transport leichter Wertstoffe.',
    longDescription: [
      'Der Teleskop-Absetzkipper GIGANT 12T Comfort eignet sich optimal für leichte Transporte mit geringem Kilometerpreis.',
      'Dieses Modell wird besonders zum Stellen leerer Mulden und für den Transport leichter Wertstoffe geschätzt – kompakt, wirtschaftlich und vielseitig.',
    ],
    image: '/images/products/ut-gigant-12t-comfort/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Teleskop-Absetzkipper-GIGANT-12T-Comfort.jpg`,
    externalUrl: `${BASE}/kipper/teleskop-absetzkipper-gigant-12t-comfort/`,
  },
  {
    slug: 'ut-gigant-260t',
    title: 'Teleskop-Absetzkipper GIGANT 260T',
    category: 'absetzkipper',
    shortDescription:
      'Für dreiachsige Lkw konzipiert – sicherer Transport schwer beladener Mulden mit patentierter FIX-Click Muldensicherung.',
    longDescription: [
      'Der Teleskop-Absetzkipper GIGANT 260T ist für dreiachsige Lastwagen konzipiert und ermöglicht den sicheren Transport schwer beladener Mulden und Container.',
      'Patentierte FIX-Click Muldensicherung sorgt für maximale Sicherheit auch bei harten Einsätzen.',
    ],
    image: '/images/products/ut-gigant-260t/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Teleskop-Absetzkipper-GIGANT-260T.jpg`,
    externalUrl: `${BASE}/kipper/teleskop-absetzkipper-gigant-260t/`,
  },
  {
    slug: 'ut-gigant-180k',
    title: 'Knickarm-Absetzkipper GIGANT 180K',
    category: 'absetzkipper',
    shortDescription:
      'Standardmodell für Baustellen und Entsorgungswirtschaft – effizientes Auf- und Abladen von Mulden mit bis zu 18.000 kg Hebekraft.',
    longDescription: [
      'Der vielseitig einsetzbare GIGANT 180K ist das Standardmodell für Baustellen und Entsorgungswirtschaft.',
      'Lädt Mulden und Container mit bis zu 18.000 kg Hebekraft effizient auf und ab – robust, zuverlässig, wartungsarm.',
    ],
    image: '/images/products/ut-gigant-180k/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Knickarm-Absetzkipper-GIGANT-180K.png`,
    externalUrl: `${BASE}/kipper/knickarm-absetzkipper-gigant-180k/`,
  },
  {
    slug: 'ut-gigant-180tk-flat',
    title: 'Knickarm-Absetzkipper GIGANT 180T/K Flat',
    category: 'absetzkipper',
    shortDescription:
      'Flache Bauform mit Knickarm-Mechanismus für vielseitige Transportaufgaben mit optimierter Aerodynamik und Ladungssicherheit.',
    longDescription: [
      'Der GIGANT 180T/K Flat kombiniert flache Bauform mit Knickarm-Mechanismus.',
      'Optimierte Aerodynamik, geringere Aufbauhöhe und hohe Ladungssicherheit – ideal für Verteilfahrzeuge mit Höhenrestriktionen.',
    ],
    image: '/images/products/ut-gigant-180tk-flat/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Knickarm-Absetzkipper-GIGANT-180TK-Flat.png`,
    externalUrl: `${BASE}/kipper/knickarm-absetzkipper-gigant-180t-k-flat/`,
  },

  // ── Abrollkipper ──────────────────────────────────────────────────
  {
    slug: 'ut-saurier-26tr-avanti',
    title: 'Haken-Abrollkipper SAURIER 4-Achser 26TR Avanti',
    category: 'abrollkipper',
    shortDescription:
      'Robuster 26-Tonnen-Abrollkipper mit bis zu 30 % schnellerem Auf- und Abkippen gegenüber Vorgängermodellen.',
    longDescription: [
      'Der SAURIER 26TR Avanti bietet 26 Tonnen Hebekraft für sichere Containerbeförderung.',
      'Bis zu 30 % schnelleres Auf- und Abkippen gegenüber Vorgängermodellen – höhere Touren-Frequenz, höhere Wirtschaftlichkeit.',
    ],
    image: '/images/products/ut-saurier-26tr-avanti/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/06/Haken-Abrollkipper-SAURIER-4-Achser-26TR-Avanti.jpg`,
    externalUrl: `${BASE}/kipper/haken-abrollkipper-saurier-4-achser-26tr-avanti/`,
  },
  {
    slug: 'ut-saurier-32tr-varitec',
    title: 'Haken-Abrollkipper SAURIER 5-Achser 32TR Varitec',
    category: 'abrollkipper',
    shortDescription:
      'Schwerlast-Abrollkipper in 5-Achser-Ausführung mit 32 Tonnen Hebekraft – maximale Transportkapazität und Stabilität.',
    longDescription: [
      'Der SAURIER 32TR Varitec ist die Schwerlast-Variante in 5-Achser-Ausführung.',
      '32 Tonnen Hebekraft für maximale Transportkapazität – ideal für Steinbruch, Schwerschrott und industrielle Logistik.',
    ],
    image: '/images/products/ut-saurier-32tr-varitec/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/06/Haken-Abrollkipper-SAURIER-5-Achser-32TR.jpg`,
    externalUrl: `${BASE}/kipper/haken-abrollkipper-saurier-5-achser-32tr-varitec/`,
  },

  // ── Mulden und Container für Absetzkipper ────────────────────────
  {
    slug: 'ut-normalmulde-no',
    title: 'Normalmulde (NO)',
    category: 'absetz-mulden',
    shortDescription:
      'Symmetrisch aufgebaute Schiffchenmulde – formstabil, robust, vielseitig einsetzbar für gemischte Transportaufgaben.',
    longDescription: [
      'Die Normalmulde NO ist eine symmetrisch aufgebaute Schiffchenmulde für vielseitige Transportaufgaben.',
      'Hohe Formstabilität, robuste Kippfüsse und sichere Handhabung machen sie zur Allzweck-Mulde im Recycling- und Entsorgungseinsatz.',
    ],
    image: '/images/products/ut-normalmulde-no/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/06/Normalmulde.png`,
    externalUrl: `${BASE}/container-und-mulde/normalmulde-no/`,
  },
  {
    slug: 'ut-schrottmulde-sr',
    title: 'Schrottmulde (SR)',
    category: 'absetz-mulden',
    shortDescription:
      'Spezialisierte Mulde für Schrotthandling mit verstärkter Konstruktion – ideal für Recycling und Entsorgung.',
    longDescription: [
      'Die Schrottmulde SR ist auf Schrotthandling optimiert.',
      'Verstärkte Konstruktion, hohe Wandstärke und robuste Kippfüsse halten harten Recycling-Einsätzen stand.',
    ],
    image: '/images/products/ut-schrottmulde-sr/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Schrottmulde.png`,
    externalUrl: `${BASE}/container-und-mulde/schrottmulde-sr/`,
  },
  {
    slug: 'ut-bauschuttmulde-br-bf',
    title: 'Bauschuttmulde (BR/BF)',
    category: 'absetz-mulden',
    shortDescription:
      'Robuste Mulde speziell für Bauschutt- und Abbruchtransporte – erhöhte Tragfähigkeit, verschleissfeste Ausführung.',
    longDescription: [
      'Die Bauschuttmulde BR/BF ist speziell für Bauschutt- und Abbruchtransporte ausgelegt.',
      'Erhöhte Tragfähigkeit und verschleissfeste Ausführung – die Standardlösung für Baustellen und Recyclinghöfe.',
    ],
    image: '/images/products/ut-bauschuttmulde-br-bf/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Bauschuttmulde.png`,
    externalUrl: `${BASE}/container-und-mulde/bauschuttmulde-br-bf/`,
  },

  // ── Container für Abrollkipper ────────────────────────────────────
  {
    slug: 'ut-abrollcontainer-klassisch',
    title: 'Abrollcontainer klassisch',
    category: 'abroll-container',
    shortDescription:
      'Vielseitiger Container in HEAVY/MEDIUM/LIGHT – das innovative UT-Tunnelprofil garantiert hohe Formstabilität.',
    longDescription: [
      'Der klassische Abrollcontainer ist in drei Ausführungen erhältlich (HEAVY, MEDIUM, LIGHT).',
      'Das innovative UT-Tunnelprofil garantiert hohe Formstabilität – die richtige Lösung für Entsorgung und Sekundärrohstoff-Transport.',
    ],
    image: '/images/products/ut-abrollcontainer-klassisch/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Abrollcontainer-klassisch.png`,
    externalUrl: `${BASE}/container-und-mulde/abrollcontainer-klassisch/`,
  },
  {
    slug: 'ut-cobra-standard',
    title: 'COBRA Standard',
    category: 'abroll-container',
    shortDescription:
      'Standardcontainer mit hohem Nutzen und vielseitigen Einsatzmöglichkeiten – effizient für Abfallwirtschaft und Logistik.',
    longDescription: [
      'Der COBRA Standard ist der Allrounder unter den Abrollcontainern.',
      'Hohe Nutzlast, robuste Konstruktion, vielseitige Einsatzmöglichkeiten – ideal für Abfallwirtschaft, Recycling und allgemeine Logistik.',
    ],
    image: '/images/products/ut-cobra-standard/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/COBRA-Standard.png`,
    externalUrl: `${BASE}/container-und-mulde/cobra-standard/`,
  },
  {
    slug: 'ut-orca-spantenlos',
    title: 'ORCA spantenlose Abrollcontainer',
    category: 'abroll-container',
    shortDescription:
      'Innovativ spantenlos konstruiert – optimierter Platzbedarf und verbesserte Ein- und Ausladevorgänge für maximale Effizienz.',
    longDescription: [
      'Der ORCA-Container ist spantenlos konstruiert – die Innenwand ist glatt, ohne Versteifungsrippen.',
      'Optimierter Platzbedarf, verbesserte Ein- und Ausladevorgänge und einfachere Reinigung – die moderne Antwort auf klassische Container-Konstruktionen.',
    ],
    image: '/images/products/ut-orca-spantenlos/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Abrollcontainer-ORCA.png`,
    externalUrl: `${BASE}/container-und-mulde/orca-spantenlose-abrollcontainer/`,
  },

  // ── Presscontainer ────────────────────────────────────────────────
  {
    slug: 'ut-presscontainer-absetzkipper',
    title: 'Presscontainer für Absetzkipper',
    category: 'presscontainer',
    shortDescription:
      'Reduziert das Abfallvolumen um das 5- bis 10-fache – ideal für platzsparende Entsorgung auf kleineren Stellplätzen.',
    longDescription: [
      'Presscontainer für Absetzkipper reduzieren das Abfallvolumen um das Fünf- bis Zehnfache.',
      'Ideal für platzsparende Entsorgung auf kleineren Stellplätzen – weniger Touren, geringere Logistikkosten, höhere Wirtschaftlichkeit.',
    ],
    image: '/images/products/ut-presscontainer-absetzkipper/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Presscontainer-fuer-Absetzkipper.jpg`,
    externalUrl: `${BASE}/container-und-mulde/presscontainer-fuer-absetzkipper/`,
  },
  {
    slug: 'ut-presscontainer-abrollkipper',
    title: 'Presscontainer für Abrollkipper',
    category: 'presscontainer',
    shortDescription:
      'Spezialisierter Presscontainer für Abrollkipper-Systeme – Volumenreduktion um das 5- bis 10-fache.',
    longDescription: [
      'Presscontainer für Abrollkipper-Systeme reduzieren das Abfallvolumen um das Fünf- bis Zehnfache.',
      'Höhere Effizienz im Sammelbetrieb, weniger Leerfahrten, geringerer CO₂-Fussabdruck.',
    ],
    image: '/images/products/ut-presscontainer-abrollkipper/main.webp',
    sourceImageUrl: `${BASE}/dw/uploads/2025/07/Presscontainer-fuer-Abrollkipper.jpg`,
    externalUrl: `${BASE}/container-und-mulde/presscontainer-fuer-abrollkipper/`,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BY_SLUG: Record<string, UTModel> = Object.fromEntries(
  UT_MODELS.map((m) => [m.slug, m]),
)

export function getUTModel(productSlug: string): UTModel | null {
  return BY_SLUG[productSlug] ?? null
}

export function getUTExternalUrl(productSlug: string): string | null {
  return BY_SLUG[productSlug]?.externalUrl ?? null
}

const UT_CONTACT_EMAIL = 'roland.burkhalter@ernst-moser.ch'

export function getUTAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!BY_SLUG[productSlug]) return null
  const subject = `Anfrage UT ${productName}`
  return `mailto:${UT_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
