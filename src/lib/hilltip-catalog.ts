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
    externalUrl: 'https://www.hilltip.com/de/produkte/streuer/icestriker-kombistreuer/',
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
    externalUrl: 'https://www.hilltip.com/de/produkte/streuer/icestriker-lkw-kombistreuer/',
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
    externalUrl: 'https://www.hilltip.com/de/produkte/streuer/aufbaustreuer-fuer-lkw/',
  },
]

// ─── Schneepflug-Produkte (SnowStriker™) ────────────────────────────────────────

export interface HilltipSnowplow {
  /** Produkt-Slug → eigene Unterseite /nutzfahrzeugcenter/hilltip/<slug> */
  slug: string
  name: string
  /** Modell-/Serien-Bezeichnung */
  model: string
  /** z. B. "9 Größen" – nur erwähnt, nicht einzeln aufgeschlüsselt */
  sizes: string
  /** Kurzbeschreibung für die Detailseite */
  description: string
  /** Lokales Bild (/images/products/<slug>/main.webp) */
  image: string
  /** Quell-Bild für Sync */
  sourceImageUrl: string
  /** Offizielle deutsche Hilltip-Produktseite */
  externalUrl: string
}

const DE = 'https://www.hilltip.com/de/produkte/schneepflug/'
const img = (slug: string) => `/images/products/${slug}/main.webp`

export const HILLTIP_SNOWPLOWS: HilltipSnowplow[] = [
  {
    slug: 'hilltip-snowstriker-vp-pickup',
    name: 'V-Schneepflug für Pick-up',
    model: 'SnowStriker™ 1650-3200 VP/VMP',
    sizes: '9 Größen',
    description:
      'Der SnowStriker™ V-Schneepflug für Pickups räumt in V-, Keil-, Schräg- und Geradstellung – maximale Flexibilität bei jedem Schneebild. Robuste Stahlbauweise mit elektrohydraulischer Joystick-Steuerung.',
    image: img('hilltip-snowstriker-vp-pickup'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/SnowStriker-VP-340x220-2.jpg',
    externalUrl: `${DE}snowstriker-v-pflug-fur-pickup/`,
  },
  {
    slug: 'hilltip-snowstriker-sp-pickup',
    name: 'Gerades Schneeschild für Pick-up',
    model: 'SnowStriker™ 1650-3000 SP/SMP',
    sizes: '1 Größe',
    description:
      'Das gerade SnowStriker™ Schneeschild für Pickups – die einfache, robuste Lösung für den schnellen Winterdienst. Hydraulische Schwenkung links/rechts für effizientes Räumen.',
    image: img('hilltip-snowstriker-sp-pickup'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/SnowStrikerSP-ledlights-off.jpg',
    externalUrl: `${DE}snowstriker-gerade-pflug-fur-pickup/`,
  },
  {
    slug: 'hilltip-snowstriker-sfp-pickup',
    name: 'Teleskop-Schneepflug für Pick-up',
    model: 'SnowStriker™ 1650-2600 SFP',
    sizes: '7 Größen',
    description:
      'Der ausfahrbare SnowStriker™ Teleskop-Pflug für Pickups passt die Räumbreite stufenlos an – ideal für wechselnde Strassen- und Platzverhältnisse.',
    image: img('hilltip-snowstriker-sfp-pickup'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/Flex-snow-plow-straight-blade-zoom-plow-snowplow3.png',
    externalUrl: `${DE}ausfahrbarer-schneepflug/`,
  },
  {
    slug: 'hilltip-snowstriker-vutv',
    name: 'V-Schneepflug für UTV',
    model: 'SnowStriker™ 1450-2600 VUTV',
    sizes: '10 Größen',
    description:
      'Kompakter SnowStriker™ V-Schneepflug speziell für UTV und Side-by-Side-Fahrzeuge. Vier Räumstellungen für höchste Wendigkeit auf engem Raum.',
    image: img('hilltip-snowstriker-vutv'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/UTV-V-plow.jpg',
    externalUrl: `${DE}snowstriker-v-schneepflug-utv/`,
  },
  {
    slug: 'hilltip-snowstriker-sutv',
    name: 'Gerades Schneeschild für UTV',
    model: 'SnowStriker™ 1450-2600 LS/SUTV',
    sizes: '10 Größen',
    description:
      'Gerades SnowStriker™ Schneeschild für UTV – leicht, robust und schnell montiert. Die ideale Lösung für Liegenschaften, Wege und Plätze.',
    image: img('hilltip-snowstriker-sutv'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2024/06/snowplow-for-utv-snoplog-lumiaura-utv-schneeschild-lame-a-neige-biaise-plug-odsniezny-quitanieves-para-utv-1.jpg',
    externalUrl: `${DE}snowstriker-schneepflug-utv/`,
  },
  {
    slug: 'hilltip-snowstriker-vtr-traktor',
    name: 'V-Schneepflug für Traktoren',
    model: 'SnowStriker™ 1450-3200 VTR/VMT',
    sizes: '10 Größen',
    description:
      'Der SnowStriker™ V-Schneepflug für Traktoren bewältigt grosse Schneemengen in V-, Keil- und Schrägstellung. Für Front- und Heckanbau erhältlich.',
    image: img('hilltip-snowstriker-vtr-traktor'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2025/05/Snow-plow-v-plow-snowplow-for-trctor-1.jpg',
    externalUrl: `${DE}snowstriker-v-pflug-fur-traktoren/`,
  },
  {
    slug: 'hilltip-snowstriker-str-traktor',
    name: 'Gerades Schneeschild für Traktoren',
    model: 'SnowStriker™ 1450-3000 STR/SMT',
    sizes: '3 Größen',
    description:
      'Gerades SnowStriker™ Schneeschild für Traktoren – die bewährte, robuste Lösung für Werkhöfe, Bauhöfe und Gemeinden mit hydraulischer Schwenkung.',
    image: img('hilltip-snowstriker-str-traktor'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/snowplow-kubota-compact-tractor.jpg',
    externalUrl: `${DE}snowstriker-gerade-pflug-fur-traktoren/`,
  },
  {
    slug: 'hilltip-snowstriker-sft-traktor',
    name: 'Teleskop-Schneepflug für Traktoren',
    model: 'SnowStriker™ SFT Flex',
    sizes: '3 Größen',
    description:
      'Der SnowStriker™ SFT Flex Teleskop-Pflug für Traktoren passt die Arbeitsbreite stufenlos an und meistert unterschiedlichste Räumaufgaben effizient.',
    image: img('hilltip-snowstriker-sft-traktor'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/snowplow-for-tractor-traktor-snoplog-lumiaura-traktorille-schneeschild-lame-a-neige-biaise-plug-odsniezny-quitanieves-para-tractor-1.png',
    externalUrl: `${DE}teleskop-schneeschild-fur-traktoren/`,
  },
  {
    slug: 'hilltip-snowstriker-lkw',
    name: 'Gerader & V-Schneepflug für LKW',
    model: 'SnowStriker™ 2600-3200 SML/VML',
    sizes: '3 Größen',
    description:
      'Die SnowStriker™ Schneepflüge für LKW – als gerades Schild (SML) oder V-Pflug (VML) – sind für den professionellen Strassen- und Autobahnwinterdienst ausgelegt.',
    image: img('hilltip-snowstriker-lkw'),
    sourceImageUrl: 'https://www.hilltip.com/site/wp-content/uploads/2017/01/snowplow-for-truck-snoplog-vikplog-nivelaura-lumiaura-kuormaautoille-LKW-schneepflug-schneeschild-Chasse-neige-Plugi-sniezne-1.jpg',
    externalUrl: `${DE}lkw-schneepflug/`,
  },
]

const SNOWPLOW_BY_SLUG: Record<string, HilltipSnowplow> = Object.fromEntries(
  HILLTIP_SNOWPLOWS.map((p) => [p.slug, p]),
)

export function getHilltipSnowplow(productSlug: string): HilltipSnowplow | null {
  return SNOWPLOW_BY_SLUG[productSlug] ?? null
}

export function getHilltipSnowplowExternalUrl(productSlug: string): string | null {
  return SNOWPLOW_BY_SLUG[productSlug]?.externalUrl ?? null
}

export function getHilltipSnowplowAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!SNOWPLOW_BY_SLUG[productSlug]) return null
  const subject = `Anfrage Hilltip Schneepflug ${productName}`
  return `mailto:${HILLTIP_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

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
