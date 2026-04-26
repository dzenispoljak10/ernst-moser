/**
 * Scania Baureihen-Katalog für /nutzfahrzeugcenter/scania/*.
 *
 * 10 Baureihen (LKW). Pro Baureihe:
 *  - lokales Produktbild  (public/images/products/<slug>/main.webp)
 *  - externe Hersteller-URL (scania.com/ch)
 *  - Karten-Beschreibung
 *  - Lange Beschreibung für Detailseite (siehe Sanity)
 *
 * Anfragen gehen an Roland (alle Scania-LKW = schwer).
 */

export interface ScaniaModel {
  slug: string
  title: string
  shortDescription: string
  longDescription: string[]
  image: string
  /** Quell-Bild für den Sync-Schritt (scania.com CDN) */
  sourceImageUrl: string
  /** Offizielle Scania-CH-Seite für die Baureihe */
  externalUrl: string
}

const SCANIA_BASE = 'https://www.scania.com'

export const SCANIA_MODELS: ScaniaModel[] = [
  {
    slug: 'scania-l-baureihe',
    title: 'Scania L-Baureihe',
    shortDescription:
      'Niedrige Einstiegshöhe und beste Sicht – ideal für urbane Verteilung, Kommunaldienste und enge Stadtmanöver.',
    longDescription: [
      'Die Scania L-Baureihe ist auf den urbanen Verteilerverkehr und kommunale Dienste spezialisiert. Mit niedriger Fahrerhauseinstiegshöhe und großzügiger Glasfläche bietet sie maximale Übersicht im Stadtverkehr und bei häufigen Ein- und Ausstiegen.',
      'Niedrige Rahmenhöhe für einfaches Auf- und Abbauen, kompakte Außenmaße für enge Gassen – perfekt für Müllabfuhr, City-Logistik und Lieferdienste mit häufigen Stopps.',
    ],
    image: '/images/products/scania-l-baureihe/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/l-series/_jcr_content/root/responsivegrid/responsivegrid/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1687257082209/19108-031.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks/l-series.html`,
  },
  {
    slug: 'scania-p-baureihe',
    title: 'Scania P-Baureihe',
    shortDescription:
      'Vielseitiger Allrounder für Stadt-, Regional- und anspruchsvolle Geländeeinsätze – zuverlässig auf allen Streckentypen.',
    longDescription: [
      'Die P-Baureihe ist Scanias Allrounder. Sie deckt das mittlere Segment vom Verteilverkehr bis zum Bauverkehr ab und wird in unzähligen Konfigurationen bestellt – Pritsche, Koffer, Kipper, Müll, Kommunal.',
      'Mit drei Fahrerhausvarianten und einer Vielzahl an Achsanordnungen passt sie sich präzise an Ihre Aufgabe an, ohne Kompromisse bei Effizienz oder Komfort.',
    ],
    image: '/images/products/scania-p-baureihe/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/p-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1658383790893/20091-011.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks/p-series.html`,
  },
  {
    slug: 'scania-g-baureihe',
    title: 'Scania G-Baureihe',
    shortDescription:
      'Komfort trifft Eleganz – großzügiges Fahrerhaus mit umfangreichem Stauraum, das ideale Allroundtalent für mittelschwere Anwendungen.',
    longDescription: [
      'Die G-Baureihe vereint Komfort und Eleganz mit einem großzügigen Fahrerhaus und umfangreichem Stauraum. Sie ist die Wahl für Fahrer, die viel Zeit unterwegs sind, ohne in der Premium-Klasse zu fahren.',
      'Ideal für mittelschwere Verteilung, Bau, Kommunal und gelegentlichen Fernverkehr – mit dem großzügigen Innenraum eines Highline-Fahrerhauses, ohne den vollen Premium-Aufpreis.',
    ],
    image: '/images/products/scania-g-baureihe/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/g-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1635412314936/19246-001.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks/g-series.html`,
  },
  {
    slug: 'scania-r-baureihe',
    title: 'Scania R-Baureihe',
    shortDescription:
      'Premium-Fernverkehr mit charakteristisch robustem Design – die erste Wahl für professionelle Langstrecke und schwere Lasten.',
    longDescription: [
      'Die R-Baureihe ist Scanias Klassiker im Premium-Fernverkehr. Mehrfacher „Truck of the Year“ und seit Jahrzehnten der Maßstab für robuste, effiziente Langstrecken-Lkw.',
      'Mit hoher Ergonomie, komfortablem Bett, umfangreichen Assistenzsystemen und wahlweise Reihensechszylinder oder Scania V8 ist die R-Baureihe für anspruchsvolle Speditionen das Mittel der Wahl.',
    ],
    image: '/images/products/scania-r-baureihe/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/r-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1672325508517/19280-059.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks/r-series.html`,
  },
  {
    slug: 'scania-s-baureihe',
    title: 'Scania S-Baureihe',
    shortDescription:
      'Premium-Fernverkehr mit flachem Boden und luxuriöser Innenausstattung – maximaler Komfort und Effizienz auf langen Strecken.',
    longDescription: [
      'Die S-Baureihe ist das Flaggschiff der Scania-Lkw-Familie. Flacher Kabinenboden, üppiger Stehraum und Premium-Innenausstattung machen das Fahrerhaus zum mobilen Zuhause für anspruchsvolle Fernfahrer.',
      'Stark in Aerodynamik und Verbrauch – die S-Baureihe ist für Speditionen gedacht, die Fahrer-Komfort als Wettbewerbsvorteil verstehen.',
    ],
    image: '/images/products/scania-s-baureihe/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/s-series/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_15030/responsivegrid/heroimage.coreimg.85.1920.jpeg/1672325529118/20118-026.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks/s-series.html`,
  },
  {
    slug: 'scania-xt',
    title: 'Scania XT',
    shortDescription:
      'Gebaut für wechselhafte Bedingungen und schwieriges Gelände – der robuste Offroad- und Baustellen-LKW.',
    longDescription: [
      'Scania XT steht für „eXtra Tough“. Verstärkter Stoßfänger, robuster Unterfahrschutz, hochgezogene Lufteinlässe und das markante Stahl-Bullbar machen die XT-Familie zum bevorzugten Werkzeug auf Baustellen, in Steinbrüchen und im Forst.',
      'Der XT-Aufbau ist als Option für die P-, G-, R- und S-Baureihe verfügbar und kombiniert Scania-Komfort mit echter Geländetauglichkeit.',
    ],
    image: '/images/products/scania-xt/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/xt/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_copy/heroimage.coreimg.85.1920.jpeg/1635412280442/20190-026.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/xt.html`,
  },
  {
    slug: 'scania-super',
    title: 'Scania Super (V8)',
    shortDescription:
      'Hocheffizienz-Antriebsstrang mit V8-Power – Spitzenleistung, Premium-Drehmoment, ikonischer Sound.',
    longDescription: [
      'Der Scania Super ist der neue, hocheffiziente Antriebsstrang von Scania – mit überarbeitetem Motor, neuem Overdrive-Getriebe und optimierter Hinterachse für bis zu 8 % weniger Verbrauch gegenüber der vorherigen Generation.',
      'Wahlweise mit dem ikonischen Scania V8 (530–770 PS) für Schwerlast und Premium-Anwendungen – unverwechselbarer Sound, kompromisslose Leistung.',
    ],
    image: '/images/products/scania-super/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/trucks/v8/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid_copy/heroimage.coreimg.85.1920.jpeg/1724239683418/v8-hero.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/v8.html`,
  },
  {
    slug: 'scania-batteriebetrieben',
    title: 'Scania Batteriebetrieben',
    shortDescription:
      'Vollelektrisch, lokal emissionsfrei – die nachhaltige Lkw-Lösung für urbane und regionale Transporte.',
    longDescription: [
      'Scania bietet vollelektrische Lkw von 4×2 Verteilerverkehr bis 6×2 Regional. Mit Reichweiten bis 350 km, Megawatt-Schnellladung und einer wachsenden Modellpalette ist Scania einer der Vorreiter der Elektrifizierung im Schwerlastverkehr.',
      'Lokal emissionsfrei, geräuscharm – ideal für nachhaltige Stadtbelieferung, Kommunaldienste und regionale Logistik.',
    ],
    image: '/images/products/scania-batteriebetrieben/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/emobility/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid/responsivegrid_copy/responsivegrid_459490170/responsivegrid_1772426439/heroimage.coreimg.85.1920.jpeg/1711552232887/23166-067.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/bev.html`,
  },
  {
    slug: 'scania-gasmotor',
    title: 'Scania Gasmotor',
    shortDescription:
      'CNG- und LNG-Lkw mit Reihensechszylinder – die wirtschaftliche und CO₂-arme Alternative für Fern- und Verteilverkehr.',
    longDescription: [
      'Scania Gas-Lkw fahren mit CNG (Erdgas) oder LNG (Flüssigerdgas) und reduzieren CO₂-Emissionen deutlich – mit Bio-Gas sogar nahezu klimaneutral.',
      'Reichweiten bis zu 1.400 km mit LNG, Reichweite und Nutzlast vergleichbar zu Diesel-Trucks – die ideale Brückentechnologie für Speditionen, die heute schon CO₂ sparen wollen.',
    ],
    image: '/images/products/scania-gasmotor/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/www/ch/de/home/products/attributes/alternative-fuels/_jcr_content/root/responsivegrid/responsivegrid_copy_/responsivegrid/heroimage.coreimg.85.1920.jpeg/1625146344720/19113-018.jpeg`,
    externalUrl: `${SCANIA_BASE}/ch/de/alternative-fuels.html`,
  },
  {
    slug: 'scania-schwerlastzugmaschine',
    title: 'Scania Schwerlastzugmaschine',
    shortDescription:
      'Konfigurierte Schwerlast- und Sondertransport-Lkw mit V8-Power – für Gewichte jenseits der Standard-Klassen.',
    longDescription: [
      'Scania-Schwerlastzugmaschinen sind speziell für Sondertransporte und Gesamtzuggewichte bis 250 t und mehr ausgelegt. Verstärkte Rahmen, zusätzliche Achsen, Scania-V8-Antriebsstrang und Allrad-Konfigurationen ermöglichen den Transport schwerster Lasten – Maschinen, Bauteile, Kraftwerkskomponenten.',
      'Jede Konfiguration wird individuell aufgebaut. Beratung, Konfiguration und Service erhalten Sie direkt bei Ernst Moser GmbH.',
    ],
    image: '/images/products/scania-schwerlastzugmaschine/main.webp',
    sourceImageUrl:
      `${SCANIA_BASE}/content/dam/group/products-and-services/trucks/r-series/16122-057.jpg`,
    externalUrl: `${SCANIA_BASE}/ch/de/home/products/trucks.html`,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BY_SLUG: Record<string, ScaniaModel> = Object.fromEntries(
  SCANIA_MODELS.map((m) => [m.slug, m]),
)

export function getScaniaModel(productSlug: string): ScaniaModel | null {
  return BY_SLUG[productSlug] ?? null
}

export function getScaniaExternalUrl(productSlug: string): string | null {
  return BY_SLUG[productSlug]?.externalUrl ?? null
}

const SCANIA_CONTACT_EMAIL = 'roland.burkhalter@ernst-moser.ch'

export function getScaniaAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!BY_SLUG[productSlug]) return null
  const subject = `Anfrage ${productName}`
  return `mailto:${SCANIA_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
