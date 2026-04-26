/**
 * Hilltip Winterdienst-Katalog für /nutzfahrzeugcenter/hilltip/*.
 *
 * 3 Fahrzeugklassen (Streugeräte + Schneepflüge):
 *  1. Pickups & Leichtfahrzeuge   (bis 3,5 t)
 *  2. Leichte LKW                 (3,5–7,5 t)
 *  3. Schwere LKW                 (7,5–26 t)
 *
 * Anfragen für ALLE Klassen → Michael Peter (Hilltip-Spezialist).
 */

export type HilltipCategoryKey = 'pickup' | 'light' | 'heavy'

export interface HilltipHighlight {
  /** Lucide-Icon-Name (Map siehe iconMap.ts) */
  icon: string
  title: string
  text: string
}

export interface HilltipCategory {
  slug: string
  title: string
  /** Tonnage als formatierter String – auf Karte angezeigt */
  tonnage: string
  /** 1-Satz-Hook für die Karte */
  shortDescription: string
  /** Mehrere Absätze für die Detailseite */
  longDescription: string[]
  /** 4–5 technische Highlights für die Detailseite */
  highlights: HilltipHighlight[]
  /** Lokales Bild */
  image: string
  /** Quell-Bild für Sync */
  sourceImageUrl: string
  /** Offizielle Hilltip-Produktseite */
  externalUrl: string
}

export const HILLTIP_CATEGORIES: HilltipCategory[] = [
  {
    slug: 'hilltip-pickups',
    title: 'Pickups & Leichtfahrzeuge',
    tonnage: 'bis 3,5 Tonnen',
    shortDescription:
      'Streugeräte und Schneepflüge für Pickups und leichte Transporter – kompakte, präzise Winterdienst-Lösungen.',
    longDescription: [
      'Hilltip bietet ein umfassendes Winterdienst-Programm für Pickups und Leichtfahrzeuge bis 3,5 Tonnen Gesamtgewicht.',
      'Der IceStriker™ Poly-Salzstreuer (550–1.250 Liter) und der SnowStriker™ Schneepflug bilden zusammen ein vielseitiges System für Strassendienste, Hauswartungen und Liegenschafts­betreiber.',
      'Robuste Stahlbauweise, 12 V/24 V elektrohydraulische Steuerung mit Joystick und optional Vor-Befeuchtungs-Module für besseres Streusalz-Verhalten.',
    ],
    highlights: [
      { icon: 'Truck', title: 'IceStriker™ + SnowStriker™', text: 'Streuer und Schneepflug – das vollständige Pickup-Winterpaket.' },
      { icon: 'Snowflake', title: 'Hochfeste Stahlbauweise', text: 'Konstruiert für extreme Winterbedingungen und tägliche Profi-Einsätze.' },
      { icon: 'Settings', title: '12 V / 24 V Joystick', text: 'Elektrohydraulische Steuerung mit komfortablem Bedienelement im Cockpit.' },
      { icon: 'Droplets', title: 'Optional Flüssig-Modul', text: 'Bis 530 Liter Vor-Befeuchtung – bessere Salzhaftung, weniger Verbrauch.' },
      { icon: 'Navigation', title: 'HTrack™ GPS-Streuung', text: 'Geschwindigkeitsabhängige Salzdosierung dank GPS-Tracking.' },
    ],
    image: '/images/products/hilltip-pickups/main.webp',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2024/07/pickup-sand-salt-spreader-combi-salt-spreader-saltspridare-lautashiekoitin-salzstreuer-winterdienst-saleuses-elektryczna-posypywarka-23.jpg',
    externalUrl: 'https://www.hilltip.com/en/products/spreaders/poly-salt-spreaders/',
  },
  {
    slug: 'hilltip-leichte-lkw',
    title: 'Leichte LKW',
    tonnage: '3,5 – 7,5 Tonnen',
    shortDescription:
      'Winterdienstlösungen für mittlere Fahrzeuge – modulare IceStriker™ Streuer mit dualen Behältern und optionalen Sprühsystemen.',
    longDescription: [
      'Der IceStriker™ Light Truck Salzstreuer (1.600–2.600 Liter) ist auf Lkw der 3,5–7,5-Tonnen-Klasse ausgelegt – die professionelle Lösung für Werkhöfe, Bauhöfe und kommunale Räumdienste.',
      'Doppelboden-Konstruktion aus Edelstahl-Komponenten, modulare Schnecken- oder Kettenfördersysteme und wetterfeste 12 V/24 V Doppel-Motoren machen das System robust und vielseitig konfigurierbar.',
      'Optional kombinierter Salz-/Sprühbetrieb bis 900 Liter und Farbbildschirm-Steuerung mit automatischer Geschwindigkeits­anpassung.',
    ],
    highlights: [
      { icon: 'Truck', title: 'Modulare Konfiguration', text: 'Schnecken- oder Kettenfördersysteme – optimal für jede Streuaufgabe.' },
      { icon: 'Gauge', title: '1.600 – 2.600 Liter', text: 'Doppelboden-Konstruktion mit Edelstahl-Komponenten.' },
      { icon: 'Wrench', title: '12 V / 24 V Doppel-Motor', text: 'Wetterfeste Motoren – zuverlässig im harten Schweizer Winter.' },
      { icon: 'Droplets', title: 'Sprüh-Modul bis 900 L', text: 'Kombinierter Salz- und Sprühbetrieb für maximale Streueffizienz.' },
      { icon: 'Navigation', title: 'Farbbildschirm-Steuerung', text: 'Automatische Anpassung an Fahrgeschwindigkeit und Streubild.' },
    ],
    image: '/images/products/hilltip-leichte-lkw/main.webp',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2023/05/truck-salt-spreader-sandspridare-sirotinautomaatti-aufbaustreuer-saleuse-pour-camion-posypywarka-esparcidor-de-sal-para-camionetas-4-1.jpg',
    externalUrl: 'https://www.hilltip.com/en/products/spreaders/truck-salt-spreader/',
  },
  {
    slug: 'hilltip-schwere-lkw',
    title: 'Schwere LKW',
    tonnage: '7,5 – 26 Tonnen',
    shortDescription:
      'Professionelle Winterdienstlösungen für schwere Fahrzeuge – IceStriker™ Truck und LION Highway-Streuer für höchste Streukapazitäten.',
    longDescription: [
      'Die IceStriker™ Truck-Streuer (3.000–7.000 Liter) und LION Highway-Streuer (6.000–12.000 Liter) sind die industriellen Lösungen für Lkw von 7,5 bis 26 Tonnen.',
      'Edelstahl-Konstruktion sorgt für höchste Korrosionsbeständigkeit; modulare Architektur erlaubt die Konfiguration für Autobahnen, Hauptstrassen und kommunale Streckenbedürfnisse.',
      'Integrierte HTrack™ GPS-Tracking, Doppel-Motorsystem mit optionalen Flüssigsystemen und Sprühbalken für höchste Effizienz auf grossen Flächen.',
    ],
    highlights: [
      { icon: 'Truck', title: '7,5 – 26 Tonnen', text: 'Streuer-Architektur passt zur gesamten Schwerlast-Lkw-Klasse.' },
      { icon: 'Gauge', title: '3.000 – 12.000 Liter', text: 'Modulare Streukapazität – LION-Highway für maximale Touren.' },
      { icon: 'Snowflake', title: 'Edelstahl-Konstruktion', text: 'Höchste Korrosionsbeständigkeit – jahrelang einsatzbereit.' },
      { icon: 'Navigation', title: 'HTrack™ Routenüberwachung', text: 'Integriertes GPS für Streustrecken-Dokumentation und Compliance.' },
      { icon: 'Wrench', title: 'Doppel-Motor + Sprühbalken', text: 'Optionale Flüssigsysteme und Sprühbalken für höchste Streupräzision.' },
    ],
    image: '/images/products/hilltip-schwere-lkw/main.webp',
    sourceImageUrl:
      'https://www.hilltip.com/site/wp-content/uploads/2017/01/IceStriker-7000-spreader.jpg',
    externalUrl: 'https://www.hilltip.com/en/products/spreaders/highway-truck-spreader/',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BY_SLUG: Record<string, HilltipCategory> = Object.fromEntries(
  HILLTIP_CATEGORIES.map((c) => [c.slug, c]),
)

export function getHilltipCategory(productSlug: string): HilltipCategory | null {
  return BY_SLUG[productSlug] ?? null
}

export function getHilltipExternalUrl(productSlug: string): string | null {
  return BY_SLUG[productSlug]?.externalUrl ?? null
}

const HILLTIP_CONTACT_EMAIL = 'michael.peter@ernst-moser.ch'

export function getHilltipAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!BY_SLUG[productSlug]) return null
  const subject = `Anfrage Hilltip Winterdienst ${productName}`
  return `mailto:${HILLTIP_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
