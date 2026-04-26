/**
 * Motorgerätecenter-Katalog für 10 Marken.
 *
 *   Ambrogio · Erco · Kaaz · Makita · Nilfisk · Stiga · Swardman
 *   + Pudu Robotics (eigene Produkte) · Segway/Navimow · Stihl (kategorisiert)
 *
 * Anfragen für ALLE Motorgerätecenter-Marken → Adrian Moser.
 *
 * Für Marken mit existierenden Sanity-Produkten kommt eine einfache
 * Brand-Homepage-Map zum Einsatz (alle Produkte zeigen dann auf die
 * Hersteller-Homepage). Für Pudu/Segway/Stihl gibt es vollständige
 * Brand-Catalogs mit Pro-Produkt-URLs.
 */

import { Truck, Gauge, Zap, Package, Settings, Recycle, Wrench, Bot, Trees, Snowflake, Battery, Layers, Hammer } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'
import type { KommunalBrand, KommunalProduct } from './kommunal-catalogs'

// ─── Brand-Homepages ─────────────────────────────────────────────────────────
// Für „minimal-work"-Marken: Brand-Homepage als Fallback-externalUrl + Label
const BRAND_HOMEPAGES: Record<string, { homepage: string; label: string; brandName: string }> = {
  ambrogio: { homepage: 'https://www.ambrogiorobot.com/de', label: 'Bei Ambrogio ansehen', brandName: 'Ambrogio' },
  erco: { homepage: 'https://www.erco-werkzeuge.de/', label: 'Bei Erco ansehen', brandName: 'Erco' },
  kaaz: { homepage: 'https://www.kaaz.com/', label: 'Bei Kaaz ansehen', brandName: 'Kaaz' },
  makita: { homepage: 'https://www.makita.ch/', label: 'Bei Makita ansehen', brandName: 'Makita' },
  nilfisk: { homepage: 'https://www.nilfisk.com/de-ch/', label: 'Bei Nilfisk ansehen', brandName: 'Nilfisk' },
  stiga: { homepage: 'https://www.stiga.com/ch/', label: 'Bei Stiga ansehen', brandName: 'Stiga' },
  swardman: { homepage: 'https://www.swardman.com/', label: 'Bei Swardman ansehen', brandName: 'Swardman' },
}

// ─── Volle Marken (Pudu, Segway, Stihl) ──────────────────────────────────────

const PUDU: KommunalBrand = {
  brandSlug: 'pudu-robotics',
  brandName: 'Pudu Robotics',
  externalCtaLabel: 'Bei Pudu ansehen',
  // homepageUrl bewusst NICHT gesetzt — Brand-Level-CTA wird ausgeblendet,
  // Hersteller-Link erscheint nur auf den Produkt-Detailseiten.
  carouselEyebrow: 'Pudu Service-Roboter',
  carouselHeading: 'Service- und Reinigungsroboter',
  carouselAriaLabel: 'Pudu Roboter',
  sectionEyebrow: 'Pudu Robotics',
  sectionTitle: 'Autonome Service- und Reinigungsroboter',
  sectionLead:
    'Pudu Robotics fertigt autonome Service- und Reinigungsroboter für Gastronomie, Hotellerie, Pflege und Gewerbe — KI-gestützt und einsatzbereit ab Tag 1.',
  products: [
    { slug: 'pudu-robotics-pudu-cc1', title: 'PUDU CC1', shortDescription: 'Kompakter Reinigungsroboter für mittlere Gewerbeflächen — autonome Boden- und Staubreinigung.', longDescription: ['Der PUDU CC1 ist ein kompakter Reinigungsroboter für mittlere Gewerbeflächen.', 'Autonome Boden- und Staubreinigung mit KI-Navigation.'], image: '/images/products/pudu-robotics-pudu-cc1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/puduCC1' },
    { slug: 'pudu-robotics-pudu-cc1-pro', title: 'PUDU CC1 Pro', shortDescription: 'Premium-Reinigungsroboter mit erweiterter Sensorik und längerer Batterie-Laufzeit.', longDescription: ['Der CC1 Pro ist die Premium-Variante mit erweiterter Sensorik.', 'Längere Batterie-Laufzeit und höhere Reinigungseffizienz.'], image: '/images/products/pudu-robotics-pudu-cc1-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/puduCC1' },
    { slug: 'pudu-robotics-pudu-mt1', title: 'PUDU MT1', shortDescription: 'Vielseitiger Multifunktions-Reinigungsroboter für unterschiedliche Bodenarten.', longDescription: ['Der MT1 ist ein vielseitiger Multifunktions-Reinigungsroboter.', 'Geeignet für unterschiedliche Bodenarten und Reinigungsaufgaben.'], image: '/images/products/pudu-robotics-pudu-mt1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1' },
    { slug: 'pudu-robotics-pudu-mt1-vac', title: 'PUDU MT1 VAC', shortDescription: 'Multifunktions-Roboter mit integriertem Industriestaubsauger für gewerbliche Reinigung.', longDescription: ['Der MT1 VAC kombiniert MT1-Plattform mit Industriestaubsauger.', 'Autonome Saug- und Reinigungsfunktion in einem Gerät.'], image: '/images/products/pudu-robotics-pudu-mt1-vac/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1' },
    { slug: 'pudu-robotics-pudu-mt1-max', title: 'PUDU MT1 Max', shortDescription: 'Erweiterte MT1-Plattform mit grösserem Reinigungswerkzeug für ausgedehnte Flächen.', longDescription: ['Der MT1 Max ist die erweiterte MT1-Plattform.', 'Grösseres Reinigungswerkzeug, optimiert für ausgedehnte Flächen.'], image: '/images/products/pudu-robotics-pudu-mt1-max/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1' },
    { slug: 'pudu-robotics-pudu-t300', title: 'PUDU T300', shortDescription: 'Industrieller Lieferroboter mit hoher Nutzlast für Logistik und Krankenhaus-Einsatz.', longDescription: ['Der T300 ist Pudus industrieller Lieferroboter mit hoher Nutzlast.', 'Konzipiert für Logistik, Krankenhaus und Industrie.'], image: '/images/products/pudu-robotics-pudu-t300/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudut300' },
    { slug: 'pudu-bellabot', title: 'BellaBot', shortDescription: 'Cat-themed Service-Roboter — der ikonische Lieferroboter für Restaurants und Cafés.', longDescription: ['Der BellaBot ist Pudus ikonischer Service-Roboter mit Katzen-Design.', 'Liefert Speisen und Getränke direkt an den Tisch — beliebt in Restaurants weltweit.'], image: '/images/products/pudu-bellabot/main.webp', sourceImageUrl: 'https://www.pudurobotics.com/cdn/products/bellabot-hero.webp', externalUrl: 'https://www.pudurobotics.com/de/products/bellabot' },
    { slug: 'pudu-bellabot-pro', title: 'BellaBot Pro', shortDescription: 'Premium-Variante des BellaBot mit erweiterter KI und neuem Design — der nächste Schritt.', longDescription: ['Der BellaBot Pro ist die Premium-Variante des Service-Roboters.', 'Erweiterte KI-Navigation, neues Design und längere Akku-Laufzeit.'], image: '/images/products/pudu-bellabot-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/bellabotpro' },
    { slug: 'pudu-kettybot', title: 'KettyBot', shortDescription: 'Kompakter Begrüssungs- und Lieferroboter mit Werbe-Display für Gastronomie und Retail.', longDescription: ['Der KettyBot kombiniert Lieferfunktion mit interaktivem Werbe-Display.', 'Begrüsst Gäste, leitet zum Tisch und liefert Speisen — die All-in-One-Lösung.'], image: '/images/products/pudu-kettybot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/kettybot' },
    { slug: 'pudu-pudubot', title: 'PuduBot', shortDescription: 'Klassischer Service-Roboter — bewährte Plattform für vielseitige Liefer-Anwendungen.', longDescription: ['Der PuduBot ist Pudus bewährter Service-Roboter der ersten Generation.', 'Solide Plattform für vielseitige Liefer-Anwendungen.'], image: '/images/products/pudu-pudubot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudubot' },
    { slug: 'pudu-flashbot', title: 'FlashBot', shortDescription: 'Hotel-Lieferroboter mit Aufzugsanbindung — autonom durch alle Etagen.', longDescription: ['Der FlashBot ist Pudus Hotel-Spezialist mit Aufzugsanbindung.', 'Autonome Navigation durch alle Etagen — der unermüdliche Concierge.'], image: '/images/products/pudu-flashbot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/flashbot-new' },
  ],
}

const SEGWAY: KommunalBrand = {
  brandSlug: 'segway',
  brandName: 'Segway Navimow',
  externalCtaLabel: 'Im Shop ansehen',
  // homepageUrl bewusst NICHT gesetzt — Brand-Level-CTA nur auf Detail-Seiten
  carouselEyebrow: 'Segway Navimow',
  carouselHeading: 'Mähroboter der nächsten Generation',
  carouselAriaLabel: 'Segway Navimow Modelle',
  sectionEyebrow: 'Segway Navimow',
  sectionTitle: 'Mähroboter ohne Begrenzungskabel',
  sectionLead:
    'Segway Navimow ist die nächste Generation Mähroboter — RTK-GPS-Navigation ohne Begrenzungskabel, drei Serien für Gärten von 200 m² bis über 10.000 m².',
  products: [
    { slug: 'segway-navimow-i-series', title: 'Navimow i-Serie', shortDescription: 'Einsteiger-Serie für Gärten bis 1.500 m² — RTK-GPS, kabellose Installation, App-Steuerung.', longDescription: ['Die Navimow i-Serie ist Segways Einsteiger-Linie für Hausgärten.', 'RTK-GPS-Navigation ohne Begrenzungskabel, App-Steuerung, leiser Betrieb.'], image: '/images/products/segway-navimow-i-series/main.webp', sourceImageUrl: '', externalUrl: 'https://shop.ernst-moser.ch/' },
    { slug: 'segway-navimow-h-series', title: 'Navimow H-Serie', shortDescription: 'Mittelklasse-Serie für Gärten bis 5.000 m² — leistungsstarker Akku, hohe Steigfähigkeit.', longDescription: ['Die Navimow H-Serie deckt mittelgrosse Gärten ab — bis 5.000 m² Mähfläche.', 'Leistungsstarker Akku, hohe Steigfähigkeit, professionelle Funktionen.'], image: '/images/products/segway-navimow-h-series/main.webp', sourceImageUrl: '', externalUrl: 'https://shop.ernst-moser.ch/' },
    { slug: 'segway-navimow-x-series', title: 'Navimow X-Serie', shortDescription: 'Profi-Serie für grosse Anlagen über 10.000 m² — robuste Konstruktion, Allwetter-Einsatz.', longDescription: ['Die Navimow X-Serie ist die Profi-Linie für grosse Anlagen über 10.000 m².', 'Robuste Konstruktion, Allwetter-Einsatz, Multi-Zonen-Verwaltung.'], image: '/images/products/segway-navimow-x-series/main.webp', sourceImageUrl: '', externalUrl: 'https://shop.ernst-moser.ch/' },
  ],
}

const STIHL: KommunalBrand = {
  brandSlug: 'stihl',
  brandName: 'Stihl',
  externalCtaLabel: 'Bei Stihl ansehen',
  // homepageUrl bewusst NICHT gesetzt — Brand-Level-CTA nur auf Detail-Seiten
  carouselEyebrow: 'Stihl Programm',
  carouselHeading: 'Profi-Geräte für Wald, Garten und Gewerbe',
  carouselAriaLabel: 'Stihl Kategorien',
  sectionEyebrow: 'Stihl',
  sectionTitle: 'Stihl — sechs Profi-Kategorien',
  sectionLead:
    'Vom Kettensägen-Klassiker bis zum modernen Akkusystem AP — Stihl-Programm in sechs Kategorien für Forst, Garten und Gewerbe.',
  products: [
    { slug: 'stihl-kettensaegen', title: 'Kettensägen & Motorsägen', shortDescription: 'Stihl Kettensägen — vom kompakten Astsäger bis zur Profi-Motorsäge für Forst und Holzschlag.', longDescription: ['Stihl ist die Referenz im Kettensägen-Markt.', 'Vom kompakten Astsäger bis zur Profi-Motorsäge für Forst und Holzschlag.'], image: '/images/products/stihl-kettensaegen/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/c/kettensaegen-motorsaegen-98176', externalUrl: 'https://www.stihl.ch/de/c/kettensaegen-motorsaegen-98176' },
    { slug: 'stihl-freischneider-trimmer', title: 'Freischneider & Trimmer', shortDescription: 'Motorsensen, Rasentrimmer und Freischneider für jedes Einsatzszenario — Benzin, Akku und Elektro.', longDescription: ['Stihl Motorsensen und Rasentrimmer für Privat und Profi.', 'Benzin-, Akku- und Elektromodelle für jedes Einsatzszenario.'], image: '/images/products/stihl-freischneider-trimmer/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/c/rasentrimmer-motorsensen-freischneider-98236', externalUrl: 'https://www.stihl.ch/de/c/rasentrimmer-motorsensen-freischneider-98236' },
    { slug: 'stihl-heckenscheren', title: 'Heckenscheren', shortDescription: 'Heckenscheren und Heckenschneider — präziser Schnitt, ergonomischer Griff, leise im Akku-Betrieb.', longDescription: ['Stihl Heckenscheren bieten präzisen Schnitt und ergonomischen Griff.', 'Akku-Modelle für leisen, emissionsfreien Einsatz.'], image: '/images/products/stihl-heckenscheren/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/c/heckenscheren-heckenschneider-98171', externalUrl: 'https://www.stihl.ch/de/c/heckenscheren-heckenschneider-98171' },
    { slug: 'stihl-laubblaeser', title: 'Laubbläser & Saughäcksler', shortDescription: 'Laubbläser, Blasgeräte und Saughäcksler für Garten- und Anlagen­pflege — vom kompakten Akku bis zum Profi-Rückentragegerät.', longDescription: ['Stihl Laubbläser und Saughäcksler für Garten- und Anlagenpflege.', 'Vom kompakten Akku bis zum Profi-Rückentragegerät.'], image: '/images/products/stihl-laubblaeser/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/c/laubblaeser-blasgeraete-saughaecksler-97976', externalUrl: 'https://www.stihl.ch/de/c/laubblaeser-blasgeraete-saughaecksler-97976' },
    { slug: 'stihl-rasenmaeher', title: 'Rasenmäher', shortDescription: 'Stihl Rasenmäher — Akku, Benzin oder Elektro für jeden Garten und jede Rasenfläche.', longDescription: ['Stihl Rasenmäher mit Akku, Benzin oder Elektroantrieb.', 'Für jeden Garten die richtige Lösung — vom Hausgarten bis zum Park.'], image: '/images/products/stihl-rasenmaeher/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/c/rasenmaeher-97983', externalUrl: 'https://www.stihl.ch/de/c/rasenmaeher-97983' },
    { slug: 'stihl-akkusystem-ap', title: 'Akkusystem AP & Akkugeräte', shortDescription: 'Profi-Akkusystem AP für 70+ Stihl-Geräte — emissionsfrei, leise und kompromisslos leistungsstark.', longDescription: ['Das Stihl AP-Akkusystem versorgt über 70 Profi-Geräte mit Energie.', 'Emissionsfrei, leise und kompromisslos leistungsstark — die Zukunft des Profi-Werkzeugs.'], image: '/images/products/stihl-akkusystem-ap/main.webp', sourceImageUrl: 'https://www.stihl.ch/de/professional/akku-loesungen', externalUrl: 'https://www.stihl.ch/de/professional/akku-loesungen' },
  ],
}

// ─── „Minimal-work"-Marken: Generisch via Sanity-Produkte ────────────────────
// Diese Brands haben bereits Produkte in Sanity. Wir definieren eine
// Brand-Hülle, die nur Brand-Level-Infos enthält. Die Karten werden
// dynamisch aus Sanity gerendert (Standard-Brand-Page-Flow).
//
// Hinweis: Für Produkt-Detail-Seiten wird in `getMotorgeraeteExternalUrl`
// die Brand-Homepage als Fallback ausgegeben (siehe Helpers).

const MINIMAL_BRAND_LIST: Array<{
  slug: string
  name: string
  homepage: string
  sectionTitle: string
  sectionLead: string
}> = [
  { slug: 'ambrogio', name: 'Ambrogio', homepage: 'https://www.ambrogiorobot.com/de', sectionTitle: 'Ambrogio Mähroboter', sectionLead: 'Italienische Mähroboter für jeden Garten — autonome Rasenpflege seit Jahrzehnten.' },
  { slug: 'erco', name: 'Erco', homepage: '', sectionTitle: 'Erco Profi-Geräte', sectionLead: 'Schweizer Spezialimporteur für professionelle Garten- und Forstgeräte.' },
  { slug: 'kaaz', name: 'Kaaz', homepage: 'https://www.kaaz.com/', sectionTitle: 'Kaaz Profi-Rasenmäher', sectionLead: 'Japanische Profi-Rasenmäher mit Hochleistungs-Motoren — robust und langlebig.' },
  { slug: 'makita', name: 'Makita', homepage: 'https://www.makita.ch/', sectionTitle: 'Makita Akkusysteme', sectionLead: 'Das umfangreichste Akkusystem im Profi-Werkzeug — von 7,2 V bis 40 V max XGT.' },
  { slug: 'nilfisk', name: 'Nilfisk', homepage: 'https://www.nilfisk.com/de-ch/', sectionTitle: 'Nilfisk Reinigungstechnik', sectionLead: 'Industrielle Reinigungstechnik aus Dänemark — 120 Jahre Erfahrung in Sauberkeit.' },
  { slug: 'stiga', name: 'Stiga', homepage: 'https://www.stiga.com/ch/', sectionTitle: 'Stiga Garten- und Rasentechnik', sectionLead: 'Italienische Garten- und Rasentechnik — vom Akkumäher bis zum Spindelmäher.' },
  { slug: 'swardman', name: 'Swardman', homepage: 'https://www.swardman.com/', sectionTitle: 'Swardman Spindelmäher', sectionLead: 'Tschechische Spindelmäher für höchste Schnitt-Qualität auf Sport- und Zierrasen.' },
]

// ─── Brand-Map ───────────────────────────────────────────────────────────────

export const MOTORGERAETE_BRANDS: Record<string, KommunalBrand> = {
  'pudu-robotics': PUDU,
  segway: SEGWAY,
  stihl: STIHL,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRODUCT_INDEX: Record<
  string,
  { brand: KommunalBrand; product: KommunalProduct }
> = {}
for (const brand of Object.values(MOTORGERAETE_BRANDS)) {
  for (const product of brand.products) {
    PRODUCT_INDEX[product.slug] = { brand, product }
  }
}

export function getMotorgeraeteBrand(brandSlug: string): KommunalBrand | null {
  return MOTORGERAETE_BRANDS[brandSlug] ?? null
}

export function getMotorgeraeteProduct(productSlug: string): {
  brand: KommunalBrand
  product: KommunalProduct
} | null {
  return PRODUCT_INDEX[productSlug] ?? null
}

/**
 * Wenn das Produkt Teil einer Pudu/Segway/Stihl-Detail-Definition ist,
 * gib die spezifische externalUrl zurück. Sonst (für Ambrogio/Kaaz/etc.)
 * fall back auf die Brand-Homepage anhand des Produkt-Slug-Präfixes.
 */
export function getMotorgeraeteExternalUrl(productSlug: string): string | null {
  // 1. Volle Marken
  const ref = PRODUCT_INDEX[productSlug]
  if (ref) return ref.product.externalUrl
  // 2. Minimal-Marken: Brand-Slug aus Produkt-Slug-Präfix
  for (const meta of MINIMAL_BRAND_LIST) {
    if (productSlug.startsWith(`${meta.slug}-`)) {
      return meta.homepage || null
    }
  }
  return null
}

export function getMotorgeraeteExternalLabel(productSlug: string): string | null {
  const ref = PRODUCT_INDEX[productSlug]
  if (ref) return ref.brand.externalCtaLabel
  for (const meta of MINIMAL_BRAND_LIST) {
    if (productSlug.startsWith(`${meta.slug}-`)) return `Bei ${meta.name} ansehen`
  }
  return null
}

const MOTORGERAETE_CONTACT_EMAIL = 'adrian.moser@ernst-moser.ch'

export function getMotorgeraeteAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  const ref = PRODUCT_INDEX[productSlug]
  let brandName: string | null = null
  if (ref) {
    brandName = ref.brand.brandName
  } else {
    for (const meta of MINIMAL_BRAND_LIST) {
      if (productSlug.startsWith(`${meta.slug}-`)) {
        brandName = meta.name
        break
      }
    }
  }
  if (!brandName) return null
  const trimmed = productName.startsWith(brandName)
    ? productName
    : `${brandName} ${productName}`
  const subject = `Anfrage ${trimmed}`
  return `mailto:${MOTORGERAETE_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

// ─── Karussell-Slides ────────────────────────────────────────────────────────

function makeSlide(
  brand: KommunalBrand,
  product: KommunalProduct,
  category: string,
  specs: CarouselSlide['specs'],
): CarouselSlide {
  return {
    slug: product.slug,
    category,
    title: product.title.replace(`${brand.brandName} `, ''),
    description: product.shortDescription,
    image: product.image,
    imageAlt: product.title,
    detailUrl: `/motorgeraetecenter/${brand.brandSlug}/${product.slug}`,
    specs,
  }
}

export const MOTORGERAETE_CAROUSEL_SLIDES: Record<string, CarouselSlide[]> = {
  'pudu-robotics': PUDU.products.map((p) => {
    const cat = p.title.replace('PUDU ', '').replace('Pudu ', '')
    return makeSlide(PUDU, p, cat, [
      { icon: Bot, value: 'KI', label: 'Autonome Navigation' },
      { icon: Settings, value: 'Service', label: 'Gastronomie & Logistik' },
      { icon: Battery, value: 'Profi-Akku', label: 'Lange Laufzeit' },
    ])
  }),
  segway: SEGWAY.products.map((p) => {
    return makeSlide(SEGWAY, p, p.title.replace('Navimow ', ''), [
      { icon: Bot, value: 'RTK-GPS', label: 'Ohne Begrenzungskabel' },
      { icon: Trees, value: 'Mähroboter', label: 'Vollautomatisch' },
      { icon: Battery, value: 'Akku-Technik', label: 'Lange Laufzeit' },
    ])
  }),
  stihl: STIHL.products.map((p) => {
    return makeSlide(STIHL, p, p.title.split(' ')[0], [
      { icon: Hammer, value: 'Profi-Klasse', label: 'Stihl-Qualität' },
      { icon: Zap, value: 'Akku-System', label: 'AP-Plattform' },
      { icon: Wrench, value: 'Service', label: 'Schweizer Vertrieb' },
    ])
  }),
}

// ─── Re-export für Komponenten ───────────────────────────────────────────────

export { MINIMAL_BRAND_LIST }
