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
    // Reinigungsroboter
    { slug: 'pudu-bg1', category: 'Reinigungsroboter', title: 'BG1', shortDescription: 'Kompakter Reinigungsroboter für gewerbliche Böden – autonome Nass- und Trockenreinigung.', longDescription: ['Kompakter Reinigungsroboter für gewerbliche Böden – autonome Nass- und Trockenreinigung.'], image: '/images/products/pudu-bg1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudu-bg1-series' },
    { slug: 'pudu-bg1-pro', category: 'Reinigungsroboter', title: 'BG1 Pro', shortDescription: 'Profi-Reinigungsroboter der BG1-Serie mit erweiterter Reinigungsleistung und Ausdauer.', longDescription: ['Profi-Reinigungsroboter der BG1-Serie mit erweiterter Reinigungsleistung und Ausdauer.'], image: '/images/products/pudu-bg1-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudu-bg1-series' },
    { slug: 'pudu-cc1', category: 'Reinigungsroboter', title: 'CC1', shortDescription: 'Vielseitiger 4-in-1-Reinigungsroboter (Kehren, Schrubben, Saugen, Wischen) für Gewerbeflächen.', longDescription: ['Vielseitiger 4-in-1-Reinigungsroboter (Kehren, Schrubben, Saugen, Wischen) für Gewerbeflächen.'], image: '/images/products/pudu-cc1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/puduCC1' },
    { slug: 'pudu-cc1-pro', category: 'Reinigungsroboter', title: 'CC1 Pro', shortDescription: 'Premium-Variante des CC1 mit erweiterter Sensorik und höherer Reinigungseffizienz.', longDescription: ['Premium-Variante des CC1 mit erweiterter Sensorik und höherer Reinigungseffizienz.'], image: '/images/products/pudu-cc1-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/cc1-pro' },
    { slug: 'pudu-mt1', category: 'Reinigungsroboter', title: 'MT1', shortDescription: 'Modularer Reinigungsroboter für unterschiedliche Bodenarten und Reinigungsaufgaben.', longDescription: ['Modularer Reinigungsroboter für unterschiedliche Bodenarten und Reinigungsaufgaben.'], image: '/images/products/pudu-mt1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1' },
    { slug: 'pudu-mt1-max', category: 'Reinigungsroboter', title: 'MT1 Max', shortDescription: 'Erweiterte MT1-Plattform mit grösserem Reinigungswerkzeug für ausgedehnte Flächen.', longDescription: ['Erweiterte MT1-Plattform mit grösserem Reinigungswerkzeug für ausgedehnte Flächen.'], image: '/images/products/pudu-mt1-max/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1-max' },
    { slug: 'pudu-mt1-vac', category: 'Reinigungsroboter', title: 'MT1 Vac', shortDescription: 'MT1 mit integriertem Industriestaubsauger – autonomes Saugen und Reinigen in einem.', longDescription: ['MT1 mit integriertem Industriestaubsauger – autonomes Saugen und Reinigen in einem.'], image: '/images/products/pudu-mt1-vac/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/mt1-vac' },
    { slug: 'pudu-sh1', category: 'Reinigungsroboter', title: 'SH1', shortDescription: 'Reinigungsroboter für die effiziente, autonome Pflege gewerblicher Hartböden.', longDescription: ['Reinigungsroboter für die effiziente, autonome Pflege gewerblicher Hartböden.'], image: '/images/products/pudu-sh1/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/sh' },
    // Serviceroboter
    { slug: 'pudu-bellabot', category: 'Serviceroboter', title: 'BellaBot', shortDescription: 'Ikonischer Service-/Lieferroboter im Katzen-Design für Restaurants und Cafés.', longDescription: ['Ikonischer Service-/Lieferroboter im Katzen-Design für Restaurants und Cafés.'], image: '/images/products/pudu-bellabot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/bellabot' },
    { slug: 'pudu-bellabot-pro', category: 'Serviceroboter', title: 'BellaBot Pro', shortDescription: 'Premium-Variante des BellaBot mit erweiterter KI und neuem Design.', longDescription: ['Premium-Variante des BellaBot mit erweiterter KI und neuem Design.'], image: '/images/products/pudu-bellabot-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/bellabotpro' },
    { slug: 'pudu-pudubot2', category: 'Serviceroboter', title: 'PuduBot 2', shortDescription: 'Bewährter Serviceroboter der nächsten Generation für vielseitige Liefer-Anwendungen.', longDescription: ['Bewährter Serviceroboter der nächsten Generation für vielseitige Liefer-Anwendungen.'], image: '/images/products/pudu-pudubot2/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudubot2' },
    { slug: 'pudu-swiftbot', category: 'Serviceroboter', title: 'SwiftBot', shortDescription: 'Flexibler Serviceroboter mit offener Tablett-Plattform und smarter Navigation.', longDescription: ['Flexibler Serviceroboter mit offener Tablett-Plattform und smarter Navigation.'], image: '/images/products/pudu-swiftbot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/swiftbot' },
    { slug: 'pudu-flashbot', category: 'Serviceroboter', title: 'FlashBot', shortDescription: 'Autonomer Lieferroboter mit Aufzugsanbindung – ideal für Hotels und Bürogebäude.', longDescription: ['Autonomer Lieferroboter mit Aufzugsanbindung – ideal für Hotels und Bürogebäude.'], image: '/images/products/pudu-flashbot/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/flashbot-new' },
    // Transportroboter
    { slug: 'pudu-t300', category: 'Transportroboter', title: 'T300', shortDescription: 'Industrieller Transport-/Lieferroboter mit hoher Nutzlast für Logistik und Industrie.', longDescription: ['Industrieller Transport-/Lieferroboter mit hoher Nutzlast für Logistik und Industrie.'], image: '/images/products/pudu-t300/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudut300' },
    { slug: 'pudu-t600', category: 'Transportroboter', title: 'T600', shortDescription: 'Leistungsstarker Transportroboter für schwere Lasten im industriellen Materialfluss.', longDescription: ['Leistungsstarker Transportroboter für schwere Lasten im industriellen Materialfluss.'], image: '/images/products/pudu-t600/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/pudut600' },
    // Marketingroboter
    { slug: 'pudu-kettybot-pro', category: 'Marketingroboter', title: 'KettyBot Pro', shortDescription: 'Begrüssungs- und Lieferroboter mit grossem Werbe-Display für Gastronomie und Retail.', longDescription: ['Begrüssungs- und Lieferroboter mit grossem Werbe-Display für Gastronomie und Retail.'], image: '/images/products/pudu-kettybot-pro/main.webp', sourceImageUrl: '', externalUrl: 'https://www.pudurobotics.com/de/products/kettybot_pro' },
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
  sectionTitle: 'Navimow Mähroboter – das ganze Sortiment',
  sectionLead:
    'Segway Navimow ist die nächste Generation Mähroboter — drahtlos, app-gesteuert und präzise. Von der kompakten I-Serie über die H- und X-Modelle bis zu den Terranox-Profimaschinen für jede Gartengrösse das passende Modell.',
  products: [
    { slug: "segway-navimow-i108e", category: "I-Serie", title: "Navimow i108E", shortDescription: "Kompakter Einsteiger-Mähroboter mit RTK-Satellitennavigation – drahtlos, leise und per App gesteuert für Gärten bis 800 m².", longDescription: ["Kompakter Einsteiger-Mähroboter mit RTK-Satellitennavigation – drahtlos, leise und per App gesteuert für Gärten bis 800 m²."], image: '/images/products/segway-navimow-i108e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-i108e-maehroboter-rasenroboter/" },
    { slug: "segway-navimow-i210e", category: "I-Serie", title: "Navimow i210E AWD", shortDescription: "Allrad-Mähroboter (AWD) mit RTK-Navigation für sicheres, kabelloses Mähen – auch an Steigungen.", longDescription: ["Allrad-Mähroboter (AWD) mit RTK-Navigation für sicheres, kabelloses Mähen – auch an Steigungen."], image: '/images/products/segway-navimow-i210e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-i210e-awd-n-rtk-maehroboter/" },
    { slug: "segway-navimow-h206e", category: "H-Serie", title: "Navimow h206E", shortDescription: "Mähroboter mit LiDAR- und RTK-Navigation für zuverlässiges, drahtloses Mähen ohne Begrenzungskabel.", longDescription: ["Mähroboter mit LiDAR- und RTK-Navigation für zuverlässiges, drahtloses Mähen ohne Begrenzungskabel."], image: '/images/products/segway-navimow-h206e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-h206e-lidar-n-rtk-maehroboter/" },
    { slug: "segway-navimow-h210e", category: "H-Serie", title: "Navimow h210E", shortDescription: "Mähroboter mit LiDAR- und RTK-Navigation für präzise, kabellose Rasenpflege.", longDescription: ["Mähroboter mit LiDAR- und RTK-Navigation für präzise, kabellose Rasenpflege."], image: '/images/products/segway-navimow-h210e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-h210e-lidar-n-rtk-maehroboter/" },
    { slug: "segway-navimow-h215e", category: "H-Serie", title: "Navimow h215E", shortDescription: "Leistungsstarker Mähroboter mit LiDAR- und RTK-Navigation für grössere Flächen.", longDescription: ["Leistungsstarker Mähroboter mit LiDAR- und RTK-Navigation für grössere Flächen."], image: '/images/products/segway-navimow-h215e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-h215e-lidar-n-rtk-maehroboter/" },
    { slug: "segway-navimow-h230e", category: "H-Serie", title: "Navimow h230E", shortDescription: "Top-Modell der H-Serie mit LiDAR- und RTK-Navigation für anspruchsvolle Gärten.", longDescription: ["Top-Modell der H-Serie mit LiDAR- und RTK-Navigation für anspruchsvolle Gärten."], image: '/images/products/segway-navimow-h230e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-h230e-lidar-n-rtk-maehroboter/" },
    { slug: "segway-navimow-x315e", category: "X3-Serie", title: "Navimow X315E", shortDescription: "Kabelloser Mähroboter mit GPS, 4G und VisionFence-2.0-Kamera-Hinderniserkennung für Flächen bis 1.500 m².", longDescription: ["Kabelloser Mähroboter mit GPS, 4G und VisionFence-2.0-Kamera-Hinderniserkennung für Flächen bis 1.500 m²."], image: '/images/products/segway-navimow-x315e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x315e-kabelloser-maehroboter-1500m2-inkl-gps-wifi-4g-visionfence-2-0/" },
    { slug: "segway-navimow-x330e", category: "X3-Serie", title: "Navimow X330E", shortDescription: "Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 3.000 m².", longDescription: ["Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 3.000 m²."], image: '/images/products/segway-navimow-x330e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x330e-kabelloser-maehroboter-3000m2-inkl-gps-wifi-4g-visionfence-2-0/" },
    { slug: "segway-navimow-x350e", category: "X3-Serie", title: "Navimow X350E", shortDescription: "Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 5.000 m².", longDescription: ["Kabelloser Mähroboter mit GPS, 4G und VisionFence 2.0 für Flächen bis 5.000 m²."], image: '/images/products/segway-navimow-x350e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x350e-kabelloser-maehroboter-5000m2-inkl-gps-wifi-4g-visionfence-2-0/" },
    { slug: "segway-navimow-x390e", category: "X3-Serie", title: "Navimow X390E", shortDescription: "Profi-Mähroboter mit GPS, 4G und VisionFence 2.0 für grosse Flächen bis 10.000 m².", longDescription: ["Profi-Mähroboter mit GPS, 4G und VisionFence 2.0 für grosse Flächen bis 10.000 m²."], image: '/images/products/segway-navimow-x390e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x390e-kabelloser-maehroboter-10000m2-inkl-gps-wifi-4g-visionfence-2-0/" },
    { slug: "segway-navimow-x420e", category: "X4-Serie", title: "Navimow X420E AWD", shortDescription: "AWD-Mähroboter mit Allradantrieb und VisionFence-Kamera für anspruchsvolles Gelände bis 2.000 m².", longDescription: ["AWD-Mähroboter mit Allradantrieb und VisionFence-Kamera für anspruchsvolles Gelände bis 2.000 m²."], image: '/images/products/segway-navimow-x420e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x420e-awd-kabelloser-maehroboter-bis-2000m2-mit-visionfence/" },
    { slug: "segway-navimow-x430e", category: "X4-Serie", title: "Navimow X430E AWD", shortDescription: "AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².", longDescription: ["AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m²."], image: '/images/products/segway-navimow-x430e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x430e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence/" },
    { slug: "segway-navimow-x450e", category: "X4-Serie", title: "Navimow X450E AWD", shortDescription: "AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m².", longDescription: ["AWD-Mähroboter mit Allradantrieb und VisionFence für anspruchsvolles Gelände bis 3.000 m²."], image: '/images/products/segway-navimow-x450e/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-x450e-awd-kabelloser-maehroboter-bis-3000m2-mit-visionfence/" },
    { slug: "segway-navimow-terranox-cm120", category: "Terranox", title: "Navimow Terranox CM120 M1 AWD", shortDescription: "Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 12.000 m².", longDescription: ["Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 12.000 m²."], image: '/images/products/segway-navimow-terranox-cm120/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-terranox-cm120-m1-awd-kabelloser-maehroboter-bis-12000-m2-mit-visionfence/" },
    { slug: "segway-navimow-terranox-cm240", category: "Terranox", title: "Navimow Terranox CM240 M1 AWD", shortDescription: "Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 24.000 m².", longDescription: ["Profi-Mähroboter mit Allradantrieb und VisionFence für sehr grosse Flächen bis 24.000 m²."], image: '/images/products/segway-navimow-terranox-cm240/main.webp', sourceImageUrl: '', externalUrl: "https://shop.ernst-moser.ch/produkt/segway-navimow-terranox-cm240-m1-awd-kabelloser-maehroboter-bis-24000-m2-mit-visionfence/" },
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
  { slug: 'kaaz', name: 'Kaaz', homepage: 'https://www.kaaz.co.jp/en/LM_Top.html', sectionTitle: 'Kaaz Profi-Rasenmäher', sectionLead: 'Japanische Profi-Rasenmäher mit Hochleistungs-Motoren — robust und langlebig.' },
  { slug: 'makita', name: 'Makita', homepage: 'https://www.makita.ch/', sectionTitle: 'Makita Akkusysteme', sectionLead: 'Das umfangreichste Akkusystem im Profi-Werkzeug — von 7,2 V bis 40 V max XGT.' },
  { slug: 'nilfisk', name: 'Nilfisk', homepage: 'https://www.nilfisk.com/de-ch/', sectionTitle: 'Nilfisk Reinigungstechnik', sectionLead: 'Industrielle Reinigungstechnik aus Dänemark — 120 Jahre Erfahrung in Sauberkeit.' },
  { slug: 'stiga', name: 'Stiga', homepage: 'https://www.stiga.com/int', sectionTitle: 'Stiga Garten- und Rasentechnik', sectionLead: 'Italienische Garten- und Rasentechnik — vom Akkumäher bis zum Spindelmäher.' },
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
// Produkt-spezifische externe URLs für Minimal-Marken (Detail-Seite → richtige
// Kategorie auf der Hersteller-Website). Hat Vorrang vor dem Homepage-Fallback.
const MINIMAL_PRODUCT_URLS: Record<string, string> = {
  'nilfisk-bodenreinigungsgeraete': 'https://www.nilfisk.com/de-ch/professional/produkte/bodenreinigungsgerate/',
  'nilfisk-gewerbesauger': 'https://www.nilfisk.com/de-ch/professional/produkte/gewerbesauger/',
  'nilfisk-hochdruckreiniger': 'https://www.nilfisk.com/de-ch/professional/produkte/hochdruckreiniger/',
  'nilfisk-industriesauger': 'https://www.nilfisk.com/de-ch/professional/produkte/industriesauger/',
  'nilfisk-reinigungsgeraete': 'https://www.nilfisk.com/de-ch/professional/produkte/',
  'erco-es-643p': 'https://www.tamag.ch/ERCO-ES-643P-Akku-Laubsauger-fahrbar-powered-by-PELLENC/ES-643P',
  'erco-eb-9043p': 'https://www.tamag.ch/ERCO-EB-9043P-Akku-Grossflaechenblaeser-powered-by-PELLENC/EB-9043P',
  'erco-ewb-35p': 'https://www.tamag.ch/ERCO-Akku-Wildkrautbuerste-EWB-35P-powered-by-PELLENC/EWB-35P',
  'makita-bohrschrauber-li-ion-integriert': 'https://www.makita.ch/produkte/li-ion-integriert.html',
  'makita-bohrschrauber-li-ion-72v': 'https://www.makita.ch/produkte/li-ion-72v.html',
  'makita-bohrschrauber-cxt-12v': 'https://www.makita.ch/produkte/cxt-li-ion-12v-max-108v.html',
  'makita-bohrschrauber-lxt-18v': 'https://www.makita.ch/produkte/lxt-li-ion-18v.html',
  'makita-bohrschrauber-xgt-40v': 'https://www.makita.ch/produkte/bohrschrauber-xgt-40v-max.html',
  'stiga-park': 'https://www.stiga.com/int/front-deck-lawn-mowers-park',
  'stiga-aufsitzmaeher': 'https://www.stiga.com/int/lawn-tractors-epower-pro',
  'stiga-rasenmaeher': 'https://www.stiga.com/int/lawn-mowers-fulcrum',
  'swardman-edwin': 'https://www.swardman.com/de/edwin-45-spindelmaeher/',
  'swardman-electra': 'https://www.swardman.com/de/electra2-45-spindelmaeher/',
}

// Produkte mit lokal gespeicherter Dokumentation (PDF in public/dokumentation/<slug>.pdf)
const MOTORGERAETE_DOC_SLUGS = new Set<string>([
  'pudu-bg1', 'pudu-bg1-pro', 'pudu-cc1', 'pudu-cc1-pro', 'pudu-mt1', 'pudu-mt1-max',
  'pudu-mt1-vac', 'pudu-sh1', 'pudu-bellabot', 'pudu-bellabot-pro', 'pudu-pudubot2',
  'pudu-swiftbot', 'pudu-flashbot', 'pudu-t300', 'pudu-t600', 'pudu-kettybot-pro',
])

export function getMotorgeraeteDokumentationUrl(productSlug: string): string | null {
  return MOTORGERAETE_DOC_SLUGS.has(productSlug) ? `/dokumentation/${productSlug}.pdf` : null
}

export function getMotorgeraeteExternalUrl(productSlug: string): string | null {
  // 1. Volle Marken
  const ref = PRODUCT_INDEX[productSlug]
  if (ref) return ref.product.externalUrl ?? null
  // 2. Produkt-spezifische URL (Minimal-Marken)
  if (MINIMAL_PRODUCT_URLS[productSlug]) return MINIMAL_PRODUCT_URLS[productSlug]
  // 3. Minimal-Marken: Brand-Slug aus Produkt-Slug-Präfix → Homepage-Fallback
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

const MOTORGERAETE_CONTACT_EMAIL = 'raphael.maurer@ernst-moser.ch'

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
