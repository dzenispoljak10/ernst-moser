/**
 * Kommunalcenter-Katalog für 13 Marken.
 *
 *   Alkè · Kubota (nur Aufsitzmäher) · Ligier Professional ·
 *   TIMAN · Matev · Ecotech · Envitec · Reform · Baoli · Mulchy · Springer
 *
 * Anfragen für ALLE Kommunalcenter-Marken → Michael Peter.
 */

import { Truck, Gauge, Zap, Package, Settings, Snowflake, Sparkles, Recycle, Wind, Hammer, Wrench, Mountain, Leaf, Droplets } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'

export interface KommunalProduct {
  slug: string
  title: string
  shortDescription: string
  longDescription?: string[]
  image: string
  sourceImageUrl: string
  /** Externe Hersteller-/Händler-URL. Optional – fehlt sie, gibt es keinen „ansehen"-Button. */
  externalUrl?: string
  /** Optionales deutsches Prospekt / Datenblatt (PDF) */
  prospektUrl?: string
  /** Optionale Kategorie für gruppierte Darstellung (z. B. Reform) */
  category?: string
}

export interface KommunalBrand {
  brandSlug: string
  brandName: string
  /** Beschriftung des „Bei X ansehen"-Buttons */
  externalCtaLabel: string
  /** Hersteller-Homepage (für Brand-Level-CTA auf der Markenseite) */
  homepageUrl?: string
  /** Optionaler Flyer / Prospekt (PDF) auf Brand-Ebene */
  flyerUrl?: string
  /** true → Produkt-Karten verlinken extern statt auf eigene Unterseiten */
  externalCards?: boolean
  /** true → reine Bilder-Galerie ohne Produktnamen/-texte */
  gallery?: boolean
  carouselEyebrow: string
  carouselHeading: string
  carouselAriaLabel: string
  sectionEyebrow: string
  sectionTitle: string
  sectionLead: string
  products: KommunalProduct[]
}

const ALKE_PROSPEKT =
  'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Alke/alke-atx-elektrofahrzeuge-katalog-de-2023.pdf'

const ALKE: KommunalBrand = {
  brandSlug: 'alk',
  brandName: 'Alkè',
  externalCtaLabel: 'Bei Alkè ansehen',
  homepageUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range.html',
  carouselEyebrow: 'Die Alkè ATX-Range',
  carouselHeading: 'Vollelektrische Profi-Nutzfahrzeuge',
  carouselAriaLabel: 'Alkè ATX-Modelle',
  sectionEyebrow: 'Alkè ATX-Range',
  sectionTitle: 'Elektrische Profi-Nutzfahrzeuge',
  sectionLead:
    'Alkè ATX-Modelle sind kompakte, robuste vollelektrische Nutzfahrzeuge — strassenzulassungsfähig und kompromisslos professionell.',
  products: [
    { slug: 'alke-atx310e', title: 'Alkè ATX310E', shortDescription: 'Kompakt und wendig für beengte Innenstadt- und Werkhof-Einsätze — vollelektrisch und strassenzulassungsfähig.', longDescription: ['Der Alkè ATX310E ist das kompakte Modell der ATX-Range — ideal für enge Gassen, Innenhöfe und Bereiche mit eingeschränktem Platz.', 'Vollelektrischer Antrieb, robuste Bauweise und volle Strassenzulassung machen ihn zum wendigen Helfer für Kommunaldienste, Werkhöfe und Industrie.'], image: '/images/products/alke-atx310e/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Alke/ATX310E/atx310e-urban-restricted-spaces.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range/atx310e.html', prospektUrl: ALKE_PROSPEKT },
    { slug: 'alke-atx320e', title: 'Alkè ATX320E', shortDescription: 'Vielseitiges Elektro-Nutzfahrzeug mit höherer Nutzlast — der Allrounder der ATX-Range.', longDescription: ['Der Alkè ATX320E erweitert die ATX-Range um mehr Nutzlast und Vielseitigkeit bei kompakten Aussenmassen.', 'Vollelektrisch, emissionsfrei und mit Strassenzulassung — bewährt im täglichen Profi-Einsatz auf Werkhöfen und in Kommunen.'], image: '/images/products/alke-atx320e/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Alke/ATX320E/atx320e.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range/atx320e.html', prospektUrl: ALKE_PROSPEKT },
    { slug: 'alke-atx330e', title: 'Alkè ATX330E', shortDescription: 'Leistungsstarkes Elektrofahrzeug mit hoher Trag- und Zuglast für anspruchsvolle Aufgaben.', longDescription: ['Der Alkè ATX330E bietet mehr Trag- und Anhängelast für anspruchsvollere Transport- und Zugaufgaben.', 'Robuster Stahlrahmen und kompromissloser Elektroantrieb — die professionelle Lösung für Bau, Garten und Kommunaltechnik.'], image: '/images/products/alke-atx330e/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Alke/ATX330E/atx330e.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range/atx330e.html', prospektUrl: ALKE_PROSPEKT },
    { slug: 'alke-atx340e', title: 'Alkè ATX340E', shortDescription: 'Das Schwerlast-Modell der ATX-Range — höchste Traglast und Zugkraft, komplett emissionsfrei.', longDescription: ['Der Alkè ATX340E ist das Schwerlast-Flaggschiff der ATX-Range mit höchster Trag- und Anhängelast.', 'Für die härtesten Einsätze in Industrie und auf dem Werkhof — robust, zuverlässig und vollelektrisch.'], image: '/images/products/alke-atx340e/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Alke/ATX340E/atx340e.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range/atx340e.html', prospektUrl: ALKE_PROSPEKT },
    { slug: 'alke-atx330-340ed', title: 'Alkè ATX330/340ED Doppelkabine', shortDescription: 'Doppelkabine für Team und Material gleichzeitig — auf der Schwerlast-Basis von ATX330/340.', longDescription: ['Der Alkè ATX330/340ED kombiniert die Schwerlast-Basis von ATX330/340 mit einer Doppelkabine — Mannschaft und Material in einem Fahrzeug.', 'Vollelektrisch und strassenzulassungsfähig — ideal für Teams im kommunalen und industriellen Einsatz.'], image: '/images/products/alke-atx330-340ed/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Alke/ATX330_340ED/double-cab-electric-vehicles-alke-atx-ed.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/alke-atx-range/atx330-340ed.html', prospektUrl: ALKE_PROSPEKT },
  ],
}

const KUBOTA_MAEH = 'https://www.adbachmannag.ch/de/produkte/kommunaltechnik/kubota-aufsitzmaeher'
const KUBOTA_TRAK = 'https://www.adbachmannag.ch/de/produkte/kommunaltechnik/kubota-kompakttraktoren'
const ADB_IMG = 'https://www.adbachmannag.ch/images/stories/Produkte'

const KUBOTA: KommunalBrand = {
  brandSlug: 'kubota',
  brandName: 'Kubota',
  externalCtaLabel: 'Bei Kubota ansehen',
  homepageUrl: 'https://www.adbachmannag.ch/de/produkte/kommunaltechnik/kubota-aufsitzmaeher.html',
  carouselEyebrow: 'Kubota Programm',
  carouselHeading: 'Aufsitzmäher, Traktoren & Geländefahrzeuge',
  carouselAriaLabel: 'Kubota Modelle',
  sectionEyebrow: 'Kubota',
  sectionTitle: 'Aufsitzmäher, Kompakttraktoren & Geländefahrzeuge',
  sectionLead:
    'Kubota — vom wendigen Aufsitzmäher über den vielseitigen Kompakttraktor bis zum robusten RTV-Geländefahrzeug. Profi-Technik für Kommunen, Landschaftspflege und Landwirtschaft.',
  products: [
    { slug: 'kubota-gr-serie', category: 'Aufsitzmäher', title: 'Kubota GR-Serie', shortDescription: 'Kompakte Aufsitzmäher der GR-Serie mit Glide-Steer-Lenkung für präzises Mähen.', longDescription: ['Die Kubota GR-Serie überzeugt mit Glide-Steer-Lenkung und präzisem Mähbild für Gärten und Grünflächen.'], image: '/images/products/kubota-gr-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/GR-Serie/gr2120-studio.jpg', externalUrl: KUBOTA_MAEH + '/gr-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/GR-Serie/Prospekt_GR-Serie.pdf' },
    { slug: 'kubota-g-serie', category: 'Aufsitzmäher', title: 'Kubota G-Serie', shortDescription: 'Wendige Aufsitzmäher der G-Serie für Gärten und mittlere Grünflächen.', longDescription: ['Die Kubota G-Serie bietet wendige Aufsitzmäher mit robustem Antrieb für die zuverlässige Rasenpflege.'], image: '/images/products/kubota-g-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/G-Serie/g231-studio.jpg', externalUrl: KUBOTA_MAEH + '/g-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/G-Serie/G-Prospekt.pdf' },
    { slug: 'kubota-gzd-serie', category: 'Aufsitzmäher', title: 'Kubota GZD-Serie', shortDescription: 'Diesel-Zero-Turn-Mäher der GZD-Serie für die professionelle Flächenpflege.', longDescription: ['Die Kubota GZD-Serie kombiniert Diesel-Power mit Zero-Turn-Wendigkeit für hohe Flächenleistung.'], image: '/images/products/kubota-gzd-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/GZD-Serie/gzd21_studio.jpg', externalUrl: KUBOTA_MAEH + '/gzd-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/GZD-Serie/Prospekt_GZD15.pdf' },
    { slug: 'kubota-fc2-serie', category: 'Aufsitzmäher', title: 'Kubota FC2-Serie', shortDescription: 'Wendige Frontmäher der FC2-Serie für den vielseitigen, ganzjährigen Einsatz.', longDescription: ['Die Kubota FC2-Serie bietet wendige Frontmäher, die sich mit Anbaugeräten ganzjährig einsetzen lassen.'], image: '/images/products/kubota-fc2-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC2-Serie/fc2-221-studio-01.jpg', externalUrl: KUBOTA_MAEH + '/fc2-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC2-Serie/Prospekt_FC2-221.pdf' },
    { slug: 'kubota-fc3-serie', category: 'Aufsitzmäher', title: 'Kubota FC3-Serie', shortDescription: 'Leistungsstarke Frontmäher der FC3-Serie für mittlere bis grosse Flächen.', longDescription: ['Die Kubota FC3-Serie liefert mehr Leistung für die professionelle Pflege mittlerer und grosser Flächen.'], image: '/images/products/kubota-fc3-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC3-Serie/fc3-261-studio.jpg', externalUrl: KUBOTA_MAEH + '/fc3-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC3-Serie/Prospekt_FC3-261.pdf' },
    { slug: 'kubota-fc4-serie', category: 'Aufsitzmäher', title: 'Kubota FC4-Serie', shortDescription: 'Profi-Frontmäher der FC4-Serie mit hoher Motorleistung für anspruchsvolle Einsätze.', longDescription: ['Die Kubota FC4-Serie ist für anspruchsvolle Profi-Einsätze mit hoher Motorleistung ausgelegt.'], image: '/images/products/kubota-fc4-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC4-Serie/fc4-501-studio.jpg', externalUrl: KUBOTA_MAEH + '/fc4-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/FC4-Serie/Prospekt_FC4-501.pdf' },
    { slug: 'kubota-f-serie', category: 'Aufsitzmäher', title: 'Kubota F-Serie', shortDescription: 'Frontmäher der F-Serie mit Allradantrieb für die professionelle Grünflächenpflege.', longDescription: ['Die Kubota F-Serie bietet allradgetriebene Frontmäher für die professionelle Grünflächenpflege.'], image: '/images/products/kubota-f-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/F-Serie/f391-studio-01.jpg', externalUrl: KUBOTA_MAEH + '/f-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/F-Serie/Prospekt_F-251-F-391.pdf' },
    { slug: 'kubota-z1-serie', category: 'Aufsitzmäher', title: 'Kubota Z1-Serie', shortDescription: 'Zero-Turn-Mäher der Z1-Serie für wendiges, schnelles Mähen.', longDescription: ['Die Kubota Z1-Serie ermöglicht mit Zero-Turn-Technik wendiges und schnelles Mähen.'], image: '/images/products/kubota-z1-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z1-Serie/z1-421-studio-01.jpg', externalUrl: KUBOTA_MAEH + '/z1-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z1-Serie/Prospekt_Z1-421.pdf' },
    { slug: 'kubota-z2-serie', category: 'Aufsitzmäher', title: 'Kubota Z2-Serie', shortDescription: 'Zero-Turn-Mäher der Z2-Serie für mittlere bis grosse Flächen.', longDescription: ['Die Kubota Z2-Serie bietet Zero-Turn-Mäher für die effiziente Pflege mittlerer und grosser Flächen.'], image: '/images/products/kubota-z2-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z2-Serie/z2-481-studio-01.jpg', externalUrl: KUBOTA_MAEH + '/z2-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z2-Serie/Prospekt_Z2-481.pdf' },
    { slug: 'kubota-z4-serie', category: 'Aufsitzmäher', title: 'Kubota Z4-Serie', shortDescription: 'Profi-Zero-Turn-Mäher der Z4-Serie mit hoher Flächenleistung.', longDescription: ['Die Kubota Z4-Serie liefert hohe Flächenleistung für den professionellen Zero-Turn-Einsatz.'], image: '/images/products/kubota-z4-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z4-Serie/z4-541-studio-01.jpg', externalUrl: KUBOTA_MAEH + '/z4-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Z4-Serie/Prospekt_Z4-541.pdf' },
    { slug: 'kubota-zd-serie', category: 'Aufsitzmäher', title: 'Kubota ZD-Serie', shortDescription: 'Diesel-Zero-Turn-Mäher der ZD-Serie für den professionellen Dauereinsatz.', longDescription: ['Die Kubota ZD-Serie ist mit Diesel-Antrieb für den professionellen Dauereinsatz konzipiert.'], image: '/images/products/kubota-zd-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/ZD-Serie/zd-1211_studio-01.jpg', externalUrl: KUBOTA_MAEH + '/zd-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/ZD-Serie/Prospekt_ZD-1211.pdf' },
    { slug: 'kubota-ze-serie', category: 'Aufsitzmäher', title: 'Kubota Ze-Serie', shortDescription: 'Zero-Turn-Mäher der Ze-Serie mit komfortabler Ausstattung.', longDescription: ['Die Kubota Ze-Serie verbindet Zero-Turn-Wendigkeit mit komfortabler Ausstattung.'], image: '/images/products/kubota-ze-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Ze-Serie/ze-481_studio-01.jpg', externalUrl: KUBOTA_MAEH + '/ze-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Aufsitzmaeher/Ze-Serie/Prospekt_Ze-Serie.pdf' },
    { slug: 'kubota-bx-serie', category: 'Kompakttraktoren', title: 'Kubota BX-Serie', shortDescription: 'Kompakttraktoren der BX-Serie — wendig und vielseitig für Garten und Grundstück.', longDescription: ['Die Kubota BX-Serie bietet wendige Kompakttraktoren für vielseitige Aufgaben rund um Garten und Grundstück.'], image: '/images/products/kubota-bx-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/BX-Serie/bx231-studio.jpg', externalUrl: KUBOTA_TRAK + '/bx-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/BX-Serie/Prospekt_BX-Serie.pdf' },
    { slug: 'kubota-b1-serie', category: 'Kompakttraktoren', title: 'Kubota B1-Serie', shortDescription: 'Kompakttraktoren der B1-Serie für vielseitige Aufgaben in Garten und Kommunaldienst.', longDescription: ['Die Kubota B1-Serie liefert vielseitige Kompakttraktoren für Garten-, Kommunal- und Landschaftspflege.'], image: '/images/products/kubota-b1-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/B1-Serie/b1181-studio.jpg', externalUrl: KUBOTA_TRAK + '/b1-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/B1-Serie/Prospekt_B1-Serie.pdf' },
    { slug: 'kubota-b2-serie', category: 'Kompakttraktoren', title: 'Kubota B2-Serie', shortDescription: 'Kompakttraktoren der B2-Serie mit mehr Leistung für anspruchsvolle Einsätze.', longDescription: ['Die Kubota B2-Serie bietet mehr Motorleistung für anspruchsvolle Aufgaben in Landwirtschaft und Kommunaldienst.'], image: '/images/products/kubota-b2-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/B2-Serie/b2261-studio-01.jpg', externalUrl: KUBOTA_TRAK + '/b2-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/B2-Serie/Prospekt_B2.pdf' },
    { slug: 'kubota-lx-serie', category: 'Kompakttraktoren', title: 'Kubota LX-Serie', shortDescription: 'Kompakttraktoren der LX-Serie mit moderner Ausstattung und hohem Komfort.', longDescription: ['Die Kubota LX-Serie verbindet moderne Ausstattung mit hohem Bedienkomfort für vielseitige Einsätze.'], image: '/images/products/kubota-lx-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/LX-Serie/lx401-studio.jpg', externalUrl: KUBOTA_TRAK + '/lx-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/LX-Serie/LX-Prospekt.pdf' },
    { slug: 'kubota-l1-serie', category: 'Kompakttraktoren', title: 'Kubota L1-Serie', shortDescription: 'Kompakttraktoren der L1-Serie für Landwirtschaft und Kommunaltechnik.', longDescription: ['Die Kubota L1-Serie bietet robuste Kompakttraktoren für Landwirtschaft und Kommunaltechnik.'], image: '/images/products/kubota-l1-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/L1-Serie/l1501-studio.jpg', externalUrl: KUBOTA_TRAK + '/l1-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/L1-Serie/L1-Prospekt.pdf' },
    { slug: 'kubota-l2-serie', category: 'Kompakttraktoren', title: 'Kubota L2-Serie', shortDescription: 'Leistungsstarke Kompakttraktoren der L2-Serie für professionelle Aufgaben.', longDescription: ['Die Kubota L2-Serie liefert leistungsstarke Kompakttraktoren für anspruchsvolle professionelle Aufgaben.'], image: '/images/products/kubota-l2-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/L2-Serie/l2622-studio.jpg', externalUrl: KUBOTA_TRAK + '/l2-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/L2-Serie/L2-Prospekt.pdf' },
    { slug: 'kubota-ek1-serie', category: 'Kompakttraktoren', title: 'Kubota EK1-Serie', shortDescription: 'Kompakte Einsteiger-Traktoren der EK1-Serie — robust und wirtschaftlich.', longDescription: ['Die Kubota EK1-Serie bietet robuste, wirtschaftliche Einsteiger-Kompakttraktoren.'], image: '/images/products/kubota-ek1-serie/main.webp', sourceImageUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/EK1-Serie/ek1-261_studio.jpg', externalUrl: KUBOTA_TRAK + '/ek1-serie.html', prospektUrl: ADB_IMG + '/Kommunal/Kubota_Kompakttraktoren/EK1-Serie/Prospekt_EK1-Serie.pdf' },
    { slug: 'kubota-rtv', category: 'Geländefahrzeug', title: 'Kubota RTV-X1110', shortDescription: 'Robustes Geländefahrzeug (UTV) mit Allradantrieb und Kabine für jedes Terrain.', longDescription: ['Der Kubota RTV-X1110 ist ein robustes Geländefahrzeug mit Allradantrieb, Differenzialsperre und Kabine.', 'Ideal für Kommunaldienst, Landwirtschaft und Arbeiten in schwierigem Gelände.'], image: '/images/products/kubota-rtv/main.webp', sourceImageUrl: ADB_IMG + '/Gelaendefahrzeuge/Kubota_RTV/rtv-x1110/rtv-x1110-studio-01.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/gelaendefahrzeuge/kubota-rtv.html', prospektUrl: ADB_IMG + '/Gelaendefahrzeuge/Kubota_RTV/rtv-x1110/Prospekt-RTV-X1110.pdf' },
  ],
}

const LIGIER: KommunalBrand = {
  brandSlug: 'ligier-professional',
  brandName: 'Ligier Professional',
  externalCtaLabel: 'Bei Ligier Professional ansehen',
  homepageUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/ligier-professional.html',
  carouselEyebrow: 'Die Ligier-Pulse-Flotte',
  carouselHeading: 'Vollelektrische Leichtfahrzeuge',
  carouselAriaLabel: 'Ligier Pulse Modelle',
  sectionEyebrow: 'Ligier Pulse',
  sectionTitle: 'Vollelektrische Leichtfahrzeuge',
  sectionLead:
    'Ligier Pulse 3 (3-rädrig) und Pulse 4 (4-rädrig) — vollelektrische Leichtfahrzeuge für Stadt-Logistik, Gemeinden und Kurzstrecken.',
  products: [
    { slug: 'ligier-pulse-3', title: 'Ligier Pulse 3', shortDescription: 'Dreirädriges Elektrofahrzeug mit Pendelsystem (±30°) — wendig und sicher für Kurzstrecken-Logistik.', longDescription: ['Der Pulse 3 ist Ligiers dreirädriges Elektrofahrzeug mit exklusivem Pendelsystem für ±30° Kurvenneigung.', 'Ideal für Kurzstrecken-Logistik, Paketdienste und urbanen Verkehr.'], image: '/images/products/ligier-pulse-3/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_3/ligier_pulse_3_studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/ligier-professional/pulse-3.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_3/Prospekt_Ligier_PULSE_3_DE_06-2025.pdf' },
    { slug: 'ligier-pulse-4', title: 'Ligier Pulse 4', shortDescription: 'Modulares Elektronutzfahrzeug mit Clip-System für Aufbauwechsel in 5 Minuten.', longDescription: ['Der Pulse 4 ist Ligiers vierrädriges, modulares Elektronutzfahrzeug — austauschbares Clip-System.', '5-Minuten-Anbau, vielfältige Anwendungen.'], image: '/images/products/ligier-pulse-4/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_4/ligier_pulse_4_studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/elektrofahrzeuge/ligier-professional/pulse-4.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_4/Prospekt_Ligier_PULSE_4_DE_06-2025.pdf' },
  ],
}

const TIMAN: KommunalBrand = {
  brandSlug: 'timan',
  brandName: 'TIMAN',
  externalCtaLabel: 'Bei TIMAN ansehen',
  homepageUrl: 'https://www.adbachmannag.ch/de/produkte/geraetetraeger.html',
  carouselEyebrow: 'TIMAN Geräteträger',
  carouselHeading: 'Ferngesteuerte Kommunalmaschinen',
  carouselAriaLabel: 'TIMAN Modelle',
  sectionEyebrow: 'TIMAN',
  sectionTitle: 'Geräteträger und Funkmäher',
  sectionLead:
    'Vom kompakten Tool-Trac bis zum funkferngesteuerten Hangmäher — TIMAN-Geräteträger sind die vielseitige Profi-Plattform für Werkhöfe und Anlagenpflege.',
  products: [
    { slug: 'timan-tool-trac', title: 'TIMAN Tool-Trac', shortDescription: 'Kompakter Geräteträger mit 65 cm Wendekreis, 4WD und hydraulischem Parallelogrammhub.', longDescription: ['Der TIMAN Tool-Trac ist ein kompakter Multifunktions-Geräteträger.', 'Hydraulischer Parallelogrammhub für vielseitige Einsätze.'], image: '/images/products/timan-tool-trac/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/Tool-Trac_studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/geraetetraeger/timan-tool-trac.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/Tool-Trac/Timan_Tool_Trac_DE_Prospekt.pdf' },
    { slug: 'timan-rc-1000', title: 'TIMAN RC-1000', shortDescription: 'Ferngesteuerter Hangmäher mit Einzelradaufhängung und hydraulischer Mähwerkshubfunktion.', longDescription: ['Der RC-1000 ist TIMANs Funkferngesteuerter Hangmäher.', 'Speziell für Flächen unter Rohrleitungen, Böschungen und Verkehrsinseln.'], image: '/images/products/timan-rc-1000/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC1000_studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/geraetetraeger/timan-rc-1000.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC-1000/Timan_RC1000_Prospekt.pdf' },
    { slug: 'timan-rc-751', title: 'TIMAN RC-751', shortDescription: 'Funkferngesteuerter Hangmäher für Steigungen bis 50° — 750 mm Schnittbreite, nur 330 kg.', longDescription: ['Der RC-751 erlaubt sicheres Mähen extremer Hänge bis 50°.', '750 mm Schnittbreite, nur 330 kg Eigengewicht.'], image: '/images/products/timan-rc-751/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC-751/Timan_RC751_Studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/geraetetraeger/timan-rc-751.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC-751/Timan_RC751_Prospekt.pdf' },
    { slug: 'timan-3330', title: 'TIMAN 3330', shortDescription: 'Knickgelenkter Geräteträger mit branchenführend leiser Kabine (68 dB) — vollhydraulisch und wartungsarm.', longDescription: ['Der 3330 ist TIMANs grösster knickgelenkter Geräteträger.', 'Vollhydraulisch, wartungsarm, drei universelle Anbaupositionen.'], image: '/images/products/timan-3330/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/3330/Timan_3330_Studio.jpg', externalUrl: 'https://www.adbachmannag.ch/de/produkte/geraetetraeger/timan-3330.html', prospektUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/3330/Timan_3330_Prospekt.pdf' },
  ],
}

const MATEV_PAGE = 'https://www.adbachmannag.ch/de/produkte/kommunaltechnik/matev-anbauger%C3%A4te.html'
const MATEV_IMG = 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/matev_Anbaugeraete'

const MATEV: KommunalBrand = {
  brandSlug: 'matev',
  brandName: 'Matev',
  externalCtaLabel: 'Bei Matev ansehen',
  homepageUrl: MATEV_PAGE,
  externalCards: true,
  gallery: true,
  carouselEyebrow: 'Matev Anbaugeräte',
  carouselHeading: 'Anbaugeräte für Kommunaltraktoren',
  carouselAriaLabel: 'Matev Anbaugeräte',
  sectionEyebrow: 'Matev Anbaugeräte',
  sectionTitle: 'Anbaugeräte von Matev',
  sectionLead:
    'Die Anbaugeräte von Matev sind speziell auf die Kubota Kompakt- und Kommunaltraktoren abgestimmt. Sie bieten durchdachte Lösungen für Grünflächenpflege, Reinigung und Winterdienst – flexibel, robust und effizient im täglichen Einsatz.',
  products: [
    { slug: 'matev-mow-160', category: 'Anbaugeräte', title: 'Matev MOW 160 Frontmähwerk', shortDescription: 'Robustes Frontmähwerk (MOW 160) für die professionelle Grünflächenpflege.', longDescription: ['Das Matev MOW 160 ist ein robustes Frontmähwerk für die professionelle Pflege von Grünflächen.', 'Vielseitig einsetzbar an Kommunal- und Kompakttraktoren.'], image: '/images/products/matev-mow-160/main.webp', sourceImageUrl: MATEV_IMG + '/matev_mow-160-frontmaehwerk.jpg', externalUrl: MATEV_PAGE },
    { slug: 'matev-cls-aufnahmegeraet', category: 'Anbaugeräte', title: 'Matev CLS Grasaufnahmegerät', shortDescription: 'CLS Grasaufnahmegerät — sammelt Schnittgut und Laub effizient auf.', longDescription: ['Das Matev CLS Aufnahmegerät sammelt Gras, Schnittgut und Laub zuverlässig auf.', 'Hohe Behälterkapazität für effizientes Arbeiten.'], image: '/images/products/matev-cls-aufnahmegeraet/main.webp', sourceImageUrl: MATEV_IMG + '/matev_cls-aufnahmegeraet.jpg', externalUrl: MATEV_PAGE },
    { slug: 'matev-swe-57', category: 'Anbaugeräte', title: 'Matev SWE 57 Kehrmaschine', shortDescription: 'Frontkehrmaschine SWE 57 für Laub und Schmutz auf Strassen und Plätzen.', longDescription: ['Die Matev SWE 57 ist eine Frontkehrmaschine für die Reinigung von Strassen, Wegen und Plätzen.', 'Effizientes Kehren von Laub und Schmutz.'], image: '/images/products/matev-swe-57/main.webp', sourceImageUrl: MATEV_IMG + '/matev_swe-57-kehrmaschine.jpg', externalUrl: MATEV_PAGE },
    { slug: 'matev-swe-ku-140', category: 'Anbaugeräte', title: 'Matev SWE-KU 140 Kehrmaschine', shortDescription: 'Kehrmaschine SWE-KU 140 mit Kehrgutbehälter für die gründliche Flächenreinigung.', longDescription: ['Die Matev SWE-KU 140 reinigt Flächen gründlich und sammelt das Kehrgut im Behälter.', 'Ideal für den kommunalen Unterhalt.'], image: '/images/products/matev-swe-ku-140/main.webp', sourceImageUrl: MATEV_IMG + '/matev_swe-ku-140-kehrmaschine.jpg', externalUrl: MATEV_PAGE },
    { slug: 'matev-spr-ds', category: 'Anbaugeräte', title: 'Matev SPR-DS Schleuderstreuer', shortDescription: 'Schleuderstreuer SPR-DS für Salz, Splitt und Dünger im Ganzjahreseinsatz.', longDescription: ['Der Matev SPR-DS Schleuderstreuer verteilt Salz, Splitt und Dünger gleichmässig.', 'Vielseitig für Winterdienst und Grünpflege.'], image: '/images/products/matev-spr-ds/main.webp', sourceImageUrl: MATEV_IMG + '/matev_spr-ds-schleuderstreuer.jpg', externalUrl: MATEV_PAGE },
    { slug: 'matev-wts-bewaesserung', category: 'Anbaugeräte', title: 'Matev WTS Bewässerungssystem', shortDescription: 'WTS Bewässerungssystem mit Giessarm und Trailer für die mobile Bewässerung.', longDescription: ['Das Matev WTS Bewässerungssystem (TS 2000, Trailer TRL 3D 20, Giessarm WA 420H) ermöglicht die mobile Bewässerung von Bäumen und Grünflächen.', 'Flexibel kombinierbar für den professionellen Einsatz.'], image: '/images/products/matev-wts-bewaesserung/main.webp', sourceImageUrl: MATEV_IMG + '/matev_wts-ts-2000-bewaesserungssystem-trl-3d-20-trailer-wts-wa-420h-giessarm.jpg', externalUrl: MATEV_PAGE },
  ],
}

const ECOTECH_FLYER =
  'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/PF-D-Kubota_online-1.pdf'
const ECOTECH_PAGE =
  'https://www.adbachmannag.ch/de/produkte/kommunaltechnik/ecotech-anbauger%C3%A4te.html'

const ECOTECH: KommunalBrand = {
  brandSlug: 'ecotech',
  brandName: 'Ecotech',
  externalCtaLabel: 'Bei Ecotech ansehen',
  homepageUrl: ECOTECH_PAGE,
  flyerUrl: ECOTECH_FLYER,
  externalCards: true,
  carouselEyebrow: 'Ecotech Anbaugeräte',
  carouselHeading: 'Kommunale Anbaugeräte',
  carouselAriaLabel: 'Ecotech Anbaugeräte',
  sectionEyebrow: 'Ecotech Anbaugeräte',
  sectionTitle: 'Kommunale Anbaugeräte von Ecotech',
  sectionLead:
    'Kehrmaschinen, Wildkrautbürsten, Wasch- und Giesssysteme, Streuer und Schneepflüge — robuste Anbaugeräte für den kommunalen Ganzjahres-Einsatz.',
  products: [
    { slug: 'ecotech-heckhydraulikaggregat', title: 'Heckhydraulikaggregat', shortDescription: 'Hydraulische Versorgung von Anbaugeräten am Heck des Trägerfahrzeugs.', image: '/images/products/ecotech-heckhydraulikaggregat/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_heckhydraulikaggregat.jpg', externalUrl: ECOTECH_PAGE },
    { slug: 'ecotech-kehrmaschine-rs', title: 'Kehrmaschine RS', shortDescription: 'Anbau-Kehrmaschine für die effiziente Reinigung von Strassen, Wegen und Plätzen.', image: '/images/products/ecotech-kehrmaschine-rs/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_kehrmaschine_rs.jpg', externalUrl: ECOTECH_PAGE },
    { slug: 'ecotech-wildkrautbuerste-wkt-7', title: 'Wildkrautbürste WKT-7', shortDescription: 'Chemiefreie Unkrautbeseitigung auf Hartflächen mit rotierender Bürste.', image: '/images/products/ecotech-wildkrautbuerste-wkt-7/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_wildkrautbuerste_wkt-7.jpg', externalUrl: ECOTECH_PAGE },
    { slug: 'ecotech-multiwash-giessarm', title: 'Multiwash Giessarm', shortDescription: 'Giessarm-System zum effizienten Bewässern von Bäumen, Beeten und Grünflächen.', image: '/images/products/ecotech-multiwash-giessarm/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_multiwash_giessarm.jpg', externalUrl: ECOTECH_PAGE },
    { slug: 'ecotech-salzstreuer-schneepflug', title: 'Salzstreuer & Schneepflug', shortDescription: 'Streuer- und Schneepflug-Kombination für den professionellen Winterdienst.', image: '/images/products/ecotech-salzstreuer-schneepflug/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_salzstreuer_schneepflueg.jpg', externalUrl: ECOTECH_PAGE },
    { slug: 'ecotech-schneepfluege', title: 'Schneepflüge', shortDescription: 'Robuste Schneepflüge und Schneeschilder für die zuverlässige Schneeräumung.', image: '/images/products/ecotech-schneepfluege/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/ecotech_Anbaugeraete/ecotech_schneepfluege.jpg', externalUrl: ECOTECH_PAGE },
  ],
}

// ─── Neue Brands ─────────────────────────────────────────────────────────────

const ENVITEC: KommunalBrand = {
  brandSlug: 'envitec',
  brandName: 'Envitec',
  externalCtaLabel: 'Bei Envitec ansehen',
  homepageUrl: 'https://www.envitec.ch/',
  carouselEyebrow: 'Envitec Streutechnik',
  carouselHeading: 'Schweizer Streumaschinen für den Winterdienst',
  carouselAriaLabel: 'Envitec Streumaschinen',
  sectionEyebrow: 'Envitec',
  sectionTitle: 'Streumaschinen für den professionellen Winterdienst',
  sectionLead:
    'Envitec ist Schweizer Hersteller von Streu- und Sprühsystemen — Anhängerstreuautomaten, Aufbaustreugeräte und Solesprüher mit V2A-Edelstahl-Konstruktion.',
  products: [
    { slug: 'envitec-anhaengerstreuautomat-0-6-1-5-m', title: 'Anhängerstreuautomat 0.6 – 1.5 m³', shortDescription: 'Schweizer Anhänger-Salzstreuer mit unabhängigem Hydraulikantrieb und V2A-Edelstahlkonstruktion.', longDescription: ['Der Anhängerstreuautomat 0.6–1.5 m³ ist ein Schweizer Anhänger-Salzstreuer mit unabhängigem Hydraulikantrieb.', 'V2A-Edelstahlkonstruktion und wegabhängige digitale Dosierung für konstante Streumengen 2–40 g/m².'], image: '/images/products/envitec-anhaengerstreuautomat-0-6-1-5-m/main.webp', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/01/ENS2100R.png', externalUrl: 'https://envitec.ch/anhaengerstreuautomat-0-6-1-5m3/' },
    { slug: 'envitec-aufbaustreugeraete-0-3-0-7-m', title: 'Aufbaustreugeräte 0.3 – 0.7 m³', shortDescription: 'Aufbau-Streugerät für Kommunalfahrzeuge — V2A-Edelstahl, Streubreiten 1–8 m.', longDescription: ['Aufbaustreugerät für Kommunalfahrzeuge mit 0.3–0.7 m³ Volumen.', 'V2A-Edelstahl-Konstruktion, Streubreiten 1–8 m und niedriger Leistungsbedarf.'], image: '/images/products/envitec-aufbaustreugeraete-0-3-0-7-m/main.webp', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-1040.png', externalUrl: 'https://envitec.ch/aufbaustreugeraete-0-3-0-7m3/' },
    { slug: 'envitec-aufbaustreugeraete-0-4-1-5-m-elektrisch', title: 'Aufbaustreugeräte 0.4 – 1.5 m³ Elektrisch', shortDescription: 'Elektrisch angetriebener Streuer (12 V) mit JetSpread Professional Steuerung.', longDescription: ['Elektrisch angetriebene Streumaschine mit 12 V Bordnetz und 0.4–1.5 m³ Volumen.', 'Digitale JetSpread Professional Steuerung für gleichmässige Materialverteilung.'], image: '/images/products/envitec-aufbaustreugeraete-0-4-1-5-m-elektrisch/main.webp', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2022/02/AKP-400-1300-E-1024x576.jpg', externalUrl: 'https://envitec.ch/aufbaustreugeraete-0-4-1-5m3-elektrisch/' },
    { slug: 'envitec-aufbaustreugeraete-1-5-4-0-m', title: 'Aufbaustreugeräte 1.5 – 4.0 m³', shortDescription: 'Grossvolumen-Aufbaustreuer mit Bandförderer und GPS-basierter Steuerung.', longDescription: ['Grossvolumen-Aufbaustreuer in sechs Grössen (1.5–4.0 m³) für Lkw und schwere Geräteträger.', 'Bandförderer-Austrag und GPS-basierte digitale Steuerung.'], image: '/images/products/envitec-aufbaustreugeraete-1-5-4-0-m/main.webp', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-1040.png', externalUrl: 'https://envitec.ch/aufbaustreugeraete-1-5-4m3/' },
    { slug: 'envitec-schleuder-streuer-120-360-lt', title: 'Schleuder-Streuer 500 – 1.200 L', shortDescription: 'Tellerstreuer mit 500–1.200 L Volumen, 1–12 m Streubreite und Hydraulikantrieb.', longDescription: ['Der Tellerstreuer hat 500–1.200 L Volumen und 1–12 m Streubreite.', 'V2A-Edelstahlrahmen mit Hydraulikantrieb für robusten Dauereinsatz.'], image: '/images/products/envitec-schleuder-streuer-120-360-lt/main.webp', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-554.png', externalUrl: 'https://envitec.ch/schleuderstreuer-500-1200lt/' },
  ],
}

const REFORM: KommunalBrand = {
  brandSlug: 'reform',
  brandName: 'Reform',
  externalCtaLabel: 'Bei Reform ansehen',
  homepageUrl: 'https://www.reform-werke.com/de/',
  carouselEyebrow: 'Die Reform-Familie',
  carouselHeading: 'Spezialfahrzeuge und Geräteträger aus Österreich',
  carouselAriaLabel: 'Reform Modelle',
  sectionEyebrow: 'Reform',
  sectionTitle: 'Motech Hangmäher und Geräteträger',
  sectionLead:
    'Reform fertigt seit Jahrzehnten Spezialmaschinen für Berglandwirtschaft, Kommunalbetriebe und Transportlogistik — robust, präzise, vielseitig.',
  products: [
    // Hangmäher (Motech)
    { slug: 'reform-motech-cm818-d', category: 'Motech Hangmäher', title: 'Reform Motech CM818-D', shortDescription: 'Schwerer Einachs-Motormäher mit Differential — robuste Hangmäh-Plattform für anspruchsvolle Steilflächen.', longDescription: ['Der Reform Motech CM818-D ist ein schwerer Einachs-Motormäher mit Differential.', 'Hangmähwerk mit grosser Bandbreite an Anbaugeräten — die Profi-Plattform für Steilflächen.'], image: '/images/products/reform-motech-cm818-d/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/8/c/csm_cm818d_50e6334bf8.jpg', externalUrl: 'https://www.reform.at/en/products/motech/cm818-d' },
    { slug: 'reform-motech-erm9041e', category: 'Motech Hangmäher', title: 'Reform Motech eRM9041e', shortDescription: 'Vollelektrischer Einachs-Hangmäher — emissionsfrei, leise, wartungsarm.', longDescription: ['Der eRM9041e ist Reforms vollelektrischer Einachs-Hangmäher der neuen Generation.', 'Emissionsfrei, geräuscharm und wartungsarm — die Zukunft der Hangmähtechnik.'], image: '/images/products/reform-motech-erm9041e/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/b/3/csm_eRM9-with-sweeping-brush-new_4390a22bef.jpg', externalUrl: 'https://www.reform.at/en/products/motech/erm9041e' },
    // Geräteträger (Boki)
    { slug: 'reform-boki-h140', category: 'Geräteträger', title: 'Reform Boki H140', shortDescription: 'Kompakter Geräteträger (1,4 m Breite) mit Allradlenkung und 110–129 kW Diesel.', longDescription: ['Der Boki H140 ist ein kompakter Kommunal-Geräteträger mit 1,4 m Breite.', '110–129 kW Diesel, Allradlenkung und modulare Arbeitshydraulik — ganzjährig einsatzbereit.'], image: '/images/products/reform-boki-h140/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/7/4/csm_BOKI-H140-27_Pfad_b631c18281.jpg', externalUrl: 'https://www.reform.at/en/products/boki/boki-models/h140' },
    { slug: 'reform-boki-h170', category: 'Geräteträger', title: 'Reform Boki H170', shortDescription: 'Geräumiger Kommunal-Geräteträger (1,7 m Breite) mit zwei Radständen und 150–175 PS.', longDescription: ['Der Boki H170 ist ein geräumiger Kommunal-Geräteträger mit 1,7 m Breite.', 'Zwei Radstände, FPT-Dieselmotoren mit 150–175 PS und intuitive Joystick-Bedienung.'], image: '/images/products/reform-boki-h170/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/c/5/csm_Freisteller_BOKI_H170_Web_NEU_EN_breiter_9fad85d40d.jpg', externalUrl: 'https://www.reform.at/en/products/boki/boki-models/h170' },
    // Geräteträger (Muli)
    { slug: 'reform-muli-t15-v', category: 'Geräteträger', title: 'Reform Muli T15 V', shortDescription: 'Kommunaltransporter der Oberklasse — hohe Nutzlast, Komfortkabine und vielseitige Aufbauten.', longDescription: ['Der Reform Muli T15 V ist der Kommunaltransporter der Oberklasse mit hoher Nutzlast.', 'Komfortable Kabine, Allradantrieb und vielseitige Aufbauten für den ganzjährigen Einsatz.'], image: '/images/products/reform-muli-t15-v/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/a/0/csm_Kommunaltransporter-Muli-T15V-neue-Oberklasse-Kipper_0b8d34207a.jpg', externalUrl: 'https://www.reform.at/en/products/muli/muli-models/t15-v' },
    { slug: 'reform-muli-t10-x-hybridshift', category: 'Geräteträger', title: 'Reform Muli T10 X HybridShift', shortDescription: 'Transporter mit innovativem HybridShift-Antrieb — kraftvoll, effizient und vielseitig.', longDescription: ['Der Reform Muli T10 X HybridShift verbindet hydrostatischen und mechanischen Antrieb für hohe Effizienz.', 'Kraftvoll und vielseitig — ideal für Kommunaldienst und Transport in schwierigem Gelände.'], image: '/images/products/reform-muli-t10-x-hybridshift/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/f/6/csm_Muli-T10X-HybridShift-Trilety-Studio-07-2017-w_89ccdf8769.jpg', externalUrl: 'https://www.reform.at/en/products/muli/t10-x-hybridshift' },
    { slug: 'reform-muli-t7-x', category: 'Geräteträger', title: 'Reform Muli T7 X', shortDescription: 'Kommunaltransporter mit 109 PS, Allradantrieb und niedrigem Schwerpunkt — ganzjährig einsatzbereit.', longDescription: ['Der Reform Muli T7 X ist ein professioneller Kommunal- und Bergtransporter.', '80 kW / 109 PS, robuste Geländegängigkeit, niedriger Schwerpunkt — vielseitig im ganzjährigen Einsatz.'], image: '/images/products/reform-muli-t7-x/main.webp', sourceImageUrl: 'https://reform.at/fileadmin/_processed_/0/0/csm_Reform-Muli-T7x-web_c1cf1a7565.jpg', externalUrl: 'https://www.reform.at/en/products/muli/muli-models/t7-x' },
  ],
}

const BAOLI_BASE = 'https://www.baoli-emea.com/de-CH/gabelstapler'

const BAOLI: KommunalBrand = {
  brandSlug: 'baoli',
  brandName: 'Baoli',
  externalCtaLabel: 'Bei Baoli ansehen',
  homepageUrl: 'https://www.baoli-emea.com/de-CH/',
  carouselEyebrow: 'Baoli Material Handling',
  carouselHeading: 'Stapler und Lagertechnik',
  carouselAriaLabel: 'Baoli Modelle',
  sectionEyebrow: 'Baoli',
  sectionTitle: 'Stapler und Lagertechnik',
  sectionLead:
    'Baoli liefert robuste Gabelstapler und Lagertechnik mit ausgezeichnetem Preis-Leistungs-Verhältnis — Niederhub- und Hochhubwagen, Schubmast-, Elektro- und Verbrennungs-Stapler sowie Multifunktionsfahrzeuge.',
  products: [
    { slug: 'baoli-ep-15-03', category: 'Niederhubwagen', title: 'Baoli EP 15-03', shortDescription: 'Effizienter Elektro-Niederhubwagen für den ermüdungsfreien Transport von Paletten und Gütern.', longDescription: ['Der Baoli EP 15-03 ist ein wendiger Elektro-Niederhubwagen für den wirtschaftlichen innerbetrieblichen Transport.', 'Kompakt, robust und einfach zu bedienen.'], image: '/images/products/baoli-ep-15-03/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/ep-15-03' },
    { slug: 'baoli-kbp-15l', category: 'Niederhubwagen', title: 'Baoli KBP 15L', shortDescription: 'Kompakter Niederhubwagen für den flexiblen innerbetrieblichen Palettentransport.', longDescription: ['Der Baoli KBP 15L ist ein handlicher Niederhubwagen für leichte bis mittlere Transportaufgaben.', 'Wendig und zuverlässig im täglichen Einsatz.'], image: '/images/products/baoli-kbp-15l/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/kbp-15l' },
    { slug: 'baoli-kbp-14-20', category: 'Niederhubwagen', title: 'Baoli KBP 14-20', shortDescription: 'Robuster Niederhubwagen für den zuverlässigen Transport von Lasten bis 2.000 kg.', longDescription: ['Der Baoli KBP 14-20 transportiert Paletten und Güter bis 2.000 kg zuverlässig.', 'Robuste Bauweise für den Dauereinsatz.'], image: '/images/products/baoli-kbp-14-20/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/kbp-14-20' },
    { slug: 'baoli-kbp-14h', category: 'Niederhubwagen', title: 'Baoli KBP 14H', shortDescription: 'Niederhubwagen mit Hochlift-Funktion für ergonomisches Arbeiten und Transport.', longDescription: ['Der Baoli KBP 14H hebt die Last auf Arbeitshöhe und ermöglicht ergonomisches Kommissionieren.', 'Vielseitig im Lager und Warenumschlag.'], image: '/images/products/baoli-kbp-14h/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/kbp-14h' },
    { slug: 'baoli-ep-16-20-25-n', category: 'Niederhubwagen', title: 'Baoli EP 16-N01 / 20-N04 / 25-N02', shortDescription: 'Elektro-Niederhubwagen zum Be- und Entladen von Fahrzeugen und für den Warenumschlag.', longDescription: ['Die Baoli EP-N-Reihe eignet sich ideal zum Be- und Entladen von Fahrzeugen und für mittelschwere Einsätze.', 'Tragfähigkeiten von 1.600 bis 2.500 kg.'], image: '/images/products/baoli-ep-16-20-25-n/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/ep-16-n01-/-ep-20-n04-/-ep-25-n02' },
    { slug: 'baoli-ep-20-111', category: 'Niederhubwagen', title: 'Baoli EP 20-111 / 20-111Li', shortDescription: 'Elektro-Niederhubwagen für den Transport von Lasten über mittlere und grosse Distanzen.', longDescription: ['Der Baoli EP 20-111 ist für den Transport über mittlere und grosse Entfernungen ausgelegt.', 'Gute Manövrierbarkeit, wahlweise mit Lithium-Ionen-Akku.'], image: '/images/products/baoli-ep-20-111/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/niederhubwagen/ep-20-111-/-ep-20-111li' },
    { slug: 'baoli-kbs-12', category: 'Hochhubwagen', title: 'Baoli KBS 12 / KBSI 12 / KBSM 12', shortDescription: 'Vielseitiger Hochhubwagen für flexibles Stapeln und Einlagern bei geringer Einsatzintensität.', longDescription: ['Der Baoli KBS/KBSI/KBSM 12 ist die flexible Wahl für gelegentliches Stapeln und Einlagern.', 'Kompakt und einfach zu handhaben.'], image: '/images/products/baoli-kbs-12/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/hochhubwagen/kbs-12-/-kbsi-12-/-kbsm-12' },
    { slug: 'baoli-es-12-16-n', category: 'Hochhubwagen', title: 'Baoli ES 12-N03 / ES 16-N02', shortDescription: 'Elektro-Hochhubwagen zum Transportieren und Einlagern von Lasten zwischen 1.200 und 1.600 kg.', longDescription: ['Die Baoli ES 12-N03 und ES 16-N02 transportieren und stapeln Lasten von 1.200 bis 1.600 kg.', 'Ideal für Lager und Warenumschlag.'], image: '/images/products/baoli-es-12-16-n/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/hochhubwagen/es-12-n03-/-es-16-n02' },
    { slug: 'baoli-kbr-14-20', category: 'Schubmaststapler', title: 'Baoli KBR 14-20', shortDescription: 'Schubmaststapler für die platzsparende Lagerung mit grosser Hubhöhe und kompakter Bauweise.', longDescription: ['Der Baoli KBR 14-20 (Reach Truck) ermöglicht platzsparendes Lagern in grosser Höhe.', 'Kompakte Bauweise für schmale Gänge, 1.400–2.000 kg Tragfähigkeit.'], image: '/images/products/baoli-kbr-14-20/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/reach-trucks/kbr-14-20' },
    { slug: 'baoli-kbet-15-20li', category: 'Gegengewichtstapler Elektro', title: 'Baoli KBET 15-20Li', shortDescription: 'Kompakter Elektro-Gegengewichtsstapler mit Lithium-Ionen-Technik für 1.500–2.000 kg.', longDescription: ['Der Baoli KBET 15-20Li ist ein kompakter Elektrostapler mit Lithium-Ionen-Akku.', 'Emissionsfrei, leise und wendig — 1.500 bis 2.000 kg Tragfähigkeit.'], image: '/images/products/baoli-kbet-15-20li/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/elektrogabelstapler/kbet-15-20-li-ion' },
    { slug: 'baoli-kbe-18-20li', category: 'Gegengewichtstapler Elektro', title: 'Baoli KBE 18-20Li', shortDescription: 'Elektro-Gegengewichtsstapler mit Li-Ion-Akku für leisen, emissionsfreien Betrieb.', longDescription: ['Der Baoli KBE 18-20Li bietet emissionsfreien Betrieb mit Lithium-Ionen-Technik.', 'Tragfähigkeit 1.800–2.000 kg, ideal für den Innen- und Ausseneinsatz.'], image: '/images/products/baoli-kbe-18-20li/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/elektrogabelstapler/kbe-18-20li' },
    { slug: 'baoli-kbe-25-35', category: 'Gegengewichtstapler Elektro', title: 'Baoli KBE 25-35 / 25-35Li', shortDescription: 'Leistungsstarker Elektro-Gegengewichtsstapler für Traglasten von 2.500 bis 3.500 kg.', longDescription: ['Der Baoli KBE 25-35 ist ein leistungsstarker Elektrostapler für 2.500 bis 3.500 kg.', 'Wahlweise mit Blei-Säure- oder Lithium-Ionen-Batterie.'], image: '/images/products/baoli-kbe-25-35/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/elektrogabelstapler/kbe-25-35-/-kbe-25-35li' },
    { slug: 'baoli-kbd-kbg-15-20', category: 'Gegengewichtstapler Verbrennungsmotor', title: 'Baoli KBD/KBG 15-20', shortDescription: 'Robuster Diesel-/Treibgasstapler für 1.500–2.000 kg — einfach, robust und produktiv.', longDescription: ['Der Baoli KBD/KBG 15-20+ ist ein robuster Verbrennungsstapler (Diesel oder Treibgas).', '1.500–2.000 kg Tragfähigkeit mit herausragender Stabilität.'], image: '/images/products/baoli-kbd-kbg-15-20/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/gabelstapler-mit-verbrennungsmotor/kbd-15-20-/-kbg-15-20' },
    { slug: 'baoli-kbd-kbg-25-35', category: 'Gegengewichtstapler Verbrennungsmotor', title: 'Baoli KBD/KBG 25-35', shortDescription: 'Vielseitiger Verbrennungsstapler (Diesel/Treibgas) für Traglasten von 2.500 bis 3.500 kg.', longDescription: ['Der Baoli KBD/KBG 25-35 ist ein vielseitiger Verbrennungsstapler für 2.500 bis 3.500 kg.', 'Robust und produktiv im Dauereinsatz.'], image: '/images/products/baoli-kbd-kbg-25-35/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/gabelstapler-mit-verbrennungsmotor/kbd-25-35-/-kbg-25-35' },
    { slug: 'baoli-kbd-kbg-40-50s', category: 'Gegengewichtstapler Verbrennungsmotor', title: 'Baoli KBD/KBG 40-50S', shortDescription: 'Kräftiger Verbrennungsstapler für raue Arbeitsumgebungen und Lasten bis 5.000 kg.', longDescription: ['Der Baoli KBD/KBG 40-50S meistert raue Arbeitsumgebungen und präzise Anwendungen.', 'Tragfähigkeit bis 5.000 kg.'], image: '/images/products/baoli-kbd-kbg-40-50s/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/gabelstapler-mit-verbrennungsmotor/kbd-40-50s-/-kbg-40-50s' },
    { slug: 'baoli-kbd-50-100', category: 'Gegengewichtstapler Verbrennungsmotor', title: 'Baoli KBD 50-100', shortDescription: 'Schwerlast-Verbrennungsstapler der Baureihe KBD für Traglasten von 5 bis 10 Tonnen.', longDescription: ['Die Baoli KBD 50-100 Baureihe ist die solide Wahl im Schwerlastbereich.', 'Traglasten von 5.000 bis 10.000 kg ohne unnötige Optionen.'], image: '/images/products/baoli-kbd-50-100/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/gabelstapler-mit-verbrennungsmotor/kbd-50-100' },
    { slug: 'baoli-kbo-01l', category: 'Multifunktionsfahrzeug', title: 'Baoli KBO 01L', shortDescription: 'Wendiges Multifunktionsfahrzeug für flexible Transport- und Logistikaufgaben.', longDescription: ['Der Baoli KBO 01L ist ein vielseitiges Multifunktionsfahrzeug für flexible Einsätze.', 'Maximale Flexibilität im innerbetrieblichen Transport.'], image: '/images/products/baoli-kbo-01l/main.webp', sourceImageUrl: 'baoli-emea', externalUrl: BAOLI_BASE + '/multifunktionsfahrzeuge/kbo-01l' },
  ],
}

const MULCHY: KommunalBrand = {
  brandSlug: 'mulchy',
  brandName: 'Mulchy',
  externalCtaLabel: 'Anfrage senden',
  carouselEyebrow: 'Mulchy Mulchtechnik',
  carouselHeading: 'Mulch- und Mähtechnik für Profis',
  carouselAriaLabel: 'Mulchy Modelle',
  sectionEyebrow: 'Mulchy',
  sectionTitle: 'Mulch- und Mähtechnik',
  sectionLead:
    'Schweizer Profi-Mulchtechnik für Landwirtschaft, Park- und Anlagenpflege — Bläser, Böschungsmäher und Sichelmulcher.',
  products: [
    { slug: 'mulchy-laub-abfallblaser', category: 'Bläser', title: 'Laub- und Abfallbläser', shortDescription: 'Leistungsstarker Laub- und Abfallbläser für die effiziente Reinigung von Wegen, Plätzen und Grünflächen.', longDescription: ['Der Mulchy Laub- und Abfallbläser entfernt Laub, Schnittgut und Abfall schnell und kraftvoll von Hartflächen und Rasen.', 'Robust gebaut für den professionellen Dauereinsatz in Kommunen, Werkhöfen und der Anlagenpflege.'], image: '/images/products/mulchy-laub-abfallblaser/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Laubblaeser/IMG_8115.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/44d2bf1aaa6a8dea1a5bd9866e8f8469514a61d2.pdf' },
    { slug: 'mulchy-ferri-smart', category: 'Böschungsmäher', title: 'Ferri Böschungsmäher Smart', shortDescription: 'Kompakter Ausleger-Böschungsmäher für Trägerfahrzeuge — wendig für Böschungen, Gräben und Strassenränder.', longDescription: ['Der Ferri Smart ist ein kompakter Ausleger-Böschungsmäher für die Pflege von Böschungen, Gräben und Strassenrändern.', 'Robuste Hydraulik und Ferri-Profitechnik für den täglichen Kommunal- und Strassenunterhalt.'], image: '/images/products/mulchy-ferri-smart/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/FERRI/SMART/WhatsApp_Image_2020-10-22_at_13.14.01.jpeg', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/a0e11ddbdd449b2afafe2c520ee229b24a58cd83.pdf' },
    { slug: 'mulchy-ferri-t250-320a', category: 'Böschungsmäher', title: 'Ferri Böschungsmäher T250 / T320A', shortDescription: 'Ausleger-Böschungsmäher mit grosser Reichweite — für anspruchsvolle Böschungs- und Grabenpflege.', longDescription: ['Die Ferri T250A / T320A bieten grössere Auslegerreichweite für Böschungen, Gräben und Hecken.', 'Leistungsstarke Hydraulik für den professionellen Strassen- und Grünflächenunterhalt.'], image: '/images/products/mulchy-ferri-t250-320a/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/FERRI/WhatsApp_Image_2021-05-05_at_11.36.45.jpg', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/a0e11ddbdd449b2afafe2c520ee229b24a58cd83.pdf' },
    { slug: 'mulchy-ferri-tp-tsi', category: 'Böschungsmäher', title: 'Ferri Böschungsmäher TP / TSI', shortDescription: 'Front- und Heck-Ausleger-Mähsysteme von Ferri für die professionelle Böschungs- und Grünpflege.', longDescription: ['Die Ferri TP / TSI sind Ausleger-Mähsysteme für die Böschungs-, Hecken- und Grünflächenpflege.', 'Vielseitig kombinierbar mit unterschiedlichen Mähköpfen für Träger- und Nutzfahrzeuge.'], image: '/images/products/mulchy-ferri-tp-tsi/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/FERRI/TP_TSI/DSCN5038.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/376204ae72f83352bdb16b74ed913e85eca34b3e.pdf' },
    { slug: 'mulchy-ferri-tsh', category: 'Böschungsmäher', title: 'Ferri Böschungsmäher TSH', shortDescription: 'Schwerer Ausleger-Böschungsmäher von Ferri für grosse Reichweiten und harte Dauereinsätze.', longDescription: ['Der Ferri TSH ist ein leistungsstarker Ausleger-Böschungsmäher mit grosser Reichweite.', 'Für anspruchsvolle Böschungs-, Graben- und Heckenpflege im professionellen Unterhalt.'], image: '/images/products/mulchy-ferri-tsh/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/FERRI/TSH/WhatsApp_Image_2020-09-11_at_16.36.33_1_.jpeg', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/e3b242b224acf99fbff8713ed1450ee02404f66e.pdf' },
    { slug: 'mulchy-glm-gl4', category: 'Sichelmulcher', title: 'Schwenkarmmulcher GLM / GL4', shortDescription: 'Schwenkarmmulcher mit seitlich verstellbarem Sichelmähwerk für Wegränder und Hindernisse.', longDescription: ['Der Mulchy GLM / GL4 ist ein Schwenkarmmulcher mit seitlich verstellbarem Sichelmähwerk.', 'Ideal zum Mulchen entlang von Wegrändern, Zäunen, Bäumen und Hindernissen.'], image: '/images/products/mulchy-glm-gl4/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_GLM_GL4/DSC01588.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-sichelmulcher-vario', category: 'Sichelmulcher', title: 'Sichelmulcher Vario', shortDescription: 'Sichelmulcher mit stufenlos hydraulisch einstellbarer Arbeitsbreite — vielseitig und gleichmässig.', longDescription: ['Der Mulchy Vario ist ein vielseitiges Sichel-Mulchgerät mit stufenlos einstellbarer Arbeitsbreite.', 'Gegenläufig drehende Messerkreisel sorgen für ein sauberes, gleichmässiges Mulchbild.'], image: '/images/products/mulchy-sichelmulcher-vario/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_Vario/DSC02294.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-baumstreifenmulcher-sl', category: 'Sichelmulcher', title: 'Baumstreifenmulcher SL', shortDescription: 'Baumstreifenmulcher für den Obst- und Weinbau — pflegt den Boden unter Reihen und Bäumen.', longDescription: ['Der Mulchy SL ist ein Baumstreifenmulcher für die Boden- und Unterstockpflege im Obst- und Weinbau.', 'Mulcht zuverlässig den Baum- und Rebstreifen — robust und wartungsarm.'], image: '/images/products/mulchy-baumstreifenmulcher-sl/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_SL3/MULCHY_SL3_1_.jpeg', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-sichelmulcher-slf', category: 'Sichelmulcher', title: 'Sichelmulcher SLF', shortDescription: 'Sichelmulcher SLF für den Obstbau — sauberes Mulchen unter Bäumen und in Reihen.', longDescription: ['Der Mulchy SLF ist ein Sichelmulcher für die Obstbau-Bodenpflege.', 'Mulcht Gras und Schnittgut gleichmässig — auch unter tief hängenden Ästen.'], image: '/images/products/mulchy-sichelmulcher-slf/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_SLF/DSCN2001.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-glm-gl-fix', category: 'Sichelmulcher', title: 'Sichelmulcher GLM / GL Fix', shortDescription: 'Sichelmulcher mit festem Anbau — robustes Mulchen von Grünflächen und Wegrändern.', longDescription: ['Der Mulchy GLM / GL Fix ist ein Sichelmulcher mit festem Anbau für Grünflächen und Wegränder.', 'Robuste Bauweise für den professionellen Dauereinsatz.'], image: '/images/products/mulchy-glm-gl-fix/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/GLM_GL2/IMG_1072.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-schwenkarmmulcher', category: 'Sichelmulcher', title: 'Schwenkarmmulcher Einachser', shortDescription: 'Schwenkarmmulcher für Einachser — seitlich schwenkbares Sichelmähwerk für enge Bereiche.', longDescription: ['Der Mulchy Schwenkarmmulcher für Einachser bringt das Mähwerk auch in enge und seitliche Bereiche.', 'Ideal für Böschungen, Wegränder und Flächen, die mit dem Trägerfahrzeug schwer erreichbar sind.'], image: '/images/products/mulchy-schwenkarmmulcher/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Obst-und-Weinbau/MULCHY_Schwenkarmmulcher_Einachser/IMG_1131.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-ras-weidenmulcher', category: 'Sichelmulcher', title: 'RAS Weidenmulcher', shortDescription: 'Robuster Sichelmulcher für die Pflege von Weiden und extensiven Flächen.', longDescription: ['Der RAS Weidenmulcher mulcht zuverlässig Weiden, Wiesen und extensive Grünflächen.', 'Robust gebaut für unebenes Gelände und harten Dauereinsatz.'], image: '/images/products/mulchy-ras-weidenmulcher/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Obst-und-Weinbau/RAS_Weidenmulcher/IMG_2170.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-messerwalze', category: 'Sichelmulcher', title: 'Mulch-Messerwalze', shortDescription: 'Messerwalze zum Anwalzen und Zerkleinern von Aufwuchs und Zwischenfrüchten.', longDescription: ['Die Mulchy Messerwalze walzt und zerkleinert Aufwuchs, Gründüngung und Zwischenfrüchte.', 'Fördert die schnelle Verrottung und eine gleichmässige Bodenbedeckung.'], image: '/images/products/mulchy-messerwalze/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Obst-und-Weinbau/Mulchwalze/IMG_0577.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
    { slug: 'mulchy-kreiselschwenkscheibe', category: 'Sichelmulcher', title: 'Kreiselschwenkscheibe', shortDescription: 'Kreiselschwenkscheibe für die randnahe Pflege entlang von Hindernissen und Bäumen.', longDescription: ['Die Mulchy Kreiselschwenkscheibe pflegt Flächen randnah entlang von Bäumen, Pfosten und Hindernissen.', 'Schwenkt automatisch aus und sorgt für ein sauberes Mähbild bis an die Kante.'], image: '/images/products/mulchy-kreiselschwenkscheibe/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/Kreiselschwenkscheibe/IMG_8513.JPG', prospektUrl: 'https://cdn.sanity.io/files/owqsc1ph/production/9a9aa2441e77a08d1156f0eea70cc201239ed388.pdf' },
  ],
}

const SPRINGER: KommunalBrand = {
  brandSlug: 'springer',
  brandName: 'Springer',
  externalCtaLabel: 'Bei Springer ansehen',
  homepageUrl: 'https://springer-ku.com/',
  carouselEyebrow: 'Springer Streutechnik',
  carouselHeading: 'Streumaschinen und Spezialfahrzeuge',
  carouselAriaLabel: 'Springer Modelle',
  sectionEyebrow: 'Springer',
  sectionTitle: 'Streumaschinen und Spezialfahrzeuge',
  sectionLead:
    'Springer fertigt professionelle Streumaschinen und Spezialfahrzeuge für Winterdienst und Kommunalanwendungen — robust, wirtschaftlich, einsatzbewährt.',
  products: [
    { slug: 'springer-as-100-185', title: 'Springer AS 100 – 185', shortDescription: 'Anhängestreuer der Mittelklasse — vielseitig einsetzbar für Winterdienst und Streckenpflege.', longDescription: ['Der AS 100–185 ist ein Anhängestreuer der Mittelklasse.', 'Vielseitig einsetzbar für Winterdienst, Streckenpflege und Kommunalanwendungen.'], image: '/images/products/springer-as-100-185/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/aufsatz-streuautomat-100-185/' },
    { slug: 'springer-as-150-280', title: 'Springer AS 150 – 280', shortDescription: 'Anhängestreuer mit grösserem Volumen für intensiven Winterdiensteinsatz.', longDescription: ['Der AS 150–280 hat grösseres Behältervolumen.', 'Für intensiven Winterdiensteinsatz auf grösseren Strecken konzipiert.'], image: '/images/products/springer-as-150-280/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/aufsatz-streuautomat-150-280/' },
    { slug: 'springer-as-400', title: 'Springer AS 400', shortDescription: 'Grossvolumen-Anhängestreuer für anspruchsvolle Winterdienst-Streuaufgaben.', longDescription: ['Der AS 400 ist Springers Grossvolumen-Anhängestreuer.', 'Für anspruchsvolle Winterdienst-Streuaufgaben auf langen Strecken.'], image: '/images/products/springer-as-400/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/aufsatz-streuautomat-400/' },
    { slug: 'springer-ase-225-280', title: 'Springer ASE 225 – 280', shortDescription: 'Aufbau-Streumaschine für direkten Lkw-Einsatz mit 225–280 L Volumen.', longDescription: ['Die ASE 225–280 ist eine Aufbau-Streumaschine für Lkw.', '225–280 L Volumen, optimiert für direkten Aufbau-Einsatz.'], image: '/images/products/springer-ase-225-280/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/aufsatz-streuautomat-ase-225-280/' },
    { slug: 'springer-ase-400', title: 'Springer ASE 400', shortDescription: 'Grossvolumen-Aufbau-Streumaschine — direkter Lkw-Einsatz mit 400 L Volumen.', longDescription: ['Die ASE 400 ist eine Grossvolumen-Aufbau-Streumaschine.', '400 L Volumen für direkten Lkw-Einsatz auf grossen Strecken.'], image: '/images/products/springer-ase-400/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/' },
    { slug: 'springer-sta', title: 'Springer STA', shortDescription: 'Spezialaufbau für Traktor-Streufahrzeuge — flexibel konfigurierbar.', longDescription: ['Der Springer STA ist ein Spezialaufbau für Traktor-Streufahrzeuge.', 'Flexibel konfigurierbar für unterschiedliche Streuanforderungen.'], image: '/images/products/springer-sta/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/einschnecken-streuautomat-sta/' },
    { slug: 'springer-traktor-doppelkammer-selbstladestreuer', title: 'Springer Traktor Doppelkammer-Selbstladestreuer', shortDescription: 'Doppelkammer-Selbstladestreuer für Traktoren mit getrennter Salz-/Sand-Lagerung.', longDescription: ['Doppelkammer-Selbstladestreuer ermöglicht getrennte Salz- und Sand-Lagerung.', 'Für Traktoren konzipiert, optimiert für effizienten Winterdienst.'], image: '/images/products/springer-traktor-doppelkammer-selbstladestreuer/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/traktor-doppelkammer-selbstladestreuer/' },
    { slug: 'springer-traktor-selbstladewalzenstreuer', title: 'Springer Traktor Selbstladewalzenstreuer', shortDescription: 'Selbstladewalzenstreuer für Traktoren — präzise Streumengensteuerung über Walzendrehzahl.', longDescription: ['Selbstladewalzenstreuer mit präziser Streumengensteuerung über Walzendrehzahl.', 'Für Traktoren konzipiert mit hohem Bedienungskomfort.'], image: '/images/products/springer-traktor-selbstladewalzenstreuer/main.webp', sourceImageUrl: 'https://placeholder.springer.local', externalUrl: 'https://springer-ku.com/produkte/traktor-selbstladewalzenstreuer/' },
  ],
}

const GREENTEC: KommunalBrand = {
  brandSlug: 'greentec',
  brandName: 'Greentec',
  externalCtaLabel: 'Bei Greentec ansehen',
  homepageUrl: 'https://www.silentag.ch/de/green-tec',
  carouselEyebrow: 'GreenTec Mulchtechnik',
  carouselHeading: 'Profi-Mulch- und Mähtechnik',
  carouselAriaLabel: 'GreenTec Modelle',
  sectionEyebrow: 'GreenTec',
  sectionTitle: 'Mulch- und Mähtechnik',
  sectionLead:
    'GreenTec — funkferngesteuerte Böschungsmäher, Auslegemulcher und Multiträger für extreme Hänge und die professionelle Grünflächenpflege.',
  products: [
    { slug: 'greentec-spider', title: 'GreenTec Böschungsmäher Spider', shortDescription: 'Funkferngesteuerter Böschungsmäher für extreme Hänge und schwer zugängliche Flächen.', longDescription: ['Der GreenTec Spider ist ein funkferngesteuerter Böschungsmäher für extreme Steigungen und schwer zugängliche Flächen.', 'Sicheres Mähen an Böschungen, Deichen und Hängen ohne Gefährdung des Bedieners.'], image: '/images/products/greentec-spider/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/GreenTec/SPIDER/DSC_7911.JPG', externalUrl: 'https://www.silentag.ch/de/green-tec-boschungsmaher-spider' },
    { slug: 'greentec-scorpion', title: 'GreenTec Scorpion', shortDescription: 'Profi-Auslegemulcher für Trägerfahrzeuge — Hecken, Böschungen und Grünflächen mit grosser Reichweite.', longDescription: ['Der GreenTec Scorpion ist ein leistungsstarker Auslegemulcher für Trägerfahrzeuge und Traktoren.', 'Vielseitig für die Hecken-, Böschungs- und Grünflächenpflege mit grosser Reichweite.'], image: '/images/products/greentec-scorpion/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/GreenTec/Scorpion/SLDIE_GT.jpg', externalUrl: 'https://www.silentag.ch/de/green-tec' },
    { slug: 'greentec-multitraeger-puma', title: 'GreenTec Multiträger Puma', shortDescription: 'Vielseitige Trägermaschine (Puma) für GreenTec-Anbaugeräte in der Grün- und Landschaftspflege.', longDescription: ['Der GreenTec Multiträger Puma ist eine wendige Trägermaschine für vielfältige Anbaugeräte.', 'Ideal für die professionelle Grün- und Landschaftspflege.'], image: '/images/products/greentec-multitraeger-puma/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/GreenTec/PUMA/DSC01756_1_.JPG', externalUrl: 'https://www.silentag.ch/de/green-tec-multitrager-puma' },
  ],
}

export const KOMMUNAL_BRANDS: Record<string, KommunalBrand> = {
  alk: ALKE,
  kubota: KUBOTA,
  'ligier-professional': LIGIER,
  timan: TIMAN,
  matev: MATEV,
  ecotech: ECOTECH,
  envitec: ENVITEC,
  reform: REFORM,
  baoli: BAOLI,
  mulchy: MULCHY,
  springer: SPRINGER,
  greentec: GREENTEC,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRODUCT_INDEX: Record<
  string,
  { brand: KommunalBrand; product: KommunalProduct }
> = {}
for (const brand of Object.values(KOMMUNAL_BRANDS)) {
  for (const product of brand.products) {
    PRODUCT_INDEX[product.slug] = { brand, product }
  }
}

export function getKommunalBrand(brandSlug: string): KommunalBrand | null {
  return KOMMUNAL_BRANDS[brandSlug] ?? null
}

export function getKommunalProduct(productSlug: string): {
  brand: KommunalBrand
  product: KommunalProduct
} | null {
  return PRODUCT_INDEX[productSlug] ?? null
}

// ─── Zusätzliche Marken (Stema/Zaugg mit Brand-Fallback) ─

const EXTRA_PRODUCT_URLS: Record<string, { url: string; label: string; prospekt?: string }> = {
  'stema-balkenmaeher':            { url: 'https://www.stema.ch/produkte/balkenmaeher/', label: 'Bei Stema ansehen' },
  'stema-saehmaschinen':           { url: 'https://www.stema.ch/produkte/saemaschine/', label: 'Bei Stema ansehen' },
  'stema-vertikutiergeraete':      { url: 'https://www.stema.ch/produkte/vertikutiergeraet/', label: 'Bei Stema ansehen' },
  'zaugg-schneepfluege':           { url: 'https://www.zaugg.swiss/?section=2163&language=de_DE', label: 'Bei Zaugg ansehen', prospekt: '/prospekte/zaugg-schneepfluege.pdf' },
  'zaugg-schneefraesschleudern':   { url: 'https://www.zaugg.swiss/?section=2168&language=de_DE', label: 'Bei Zaugg ansehen', prospekt: '/prospekte/zaugg-schneefraesschleudern.pdf' },
}

const EXTRA_BRAND_HOMEPAGES: Array<{ slug: string; homepage: string; label: string; brandName: string; email?: string }> = [
  { slug: 'stema', homepage: 'https://www.stema.ch/', label: 'Bei Stema ansehen', brandName: 'Stema', email: 'raphael.maurer@ernst-moser.ch' },
  { slug: 'zaugg', homepage: 'https://www.zaugg.swiss/', label: 'Bei Zaugg ansehen', brandName: 'Zaugg', email: 'raphael.maurer@ernst-moser.ch' },
]

function findExtraBrandFallback(productSlug: string) {
  return EXTRA_BRAND_HOMEPAGES.find((b) => productSlug.startsWith(`${b.slug}-`)) ?? null
}

export function getKommunalExternalUrl(productSlug: string): string | null {
  return (
    PRODUCT_INDEX[productSlug]?.product.externalUrl ??
    EXTRA_PRODUCT_URLS[productSlug]?.url ??
    findExtraBrandFallback(productSlug)?.homepage ??
    null
  )
}

export function getKommunalExternalLabel(productSlug: string): string | null {
  return (
    PRODUCT_INDEX[productSlug]?.brand.externalCtaLabel ??
    EXTRA_PRODUCT_URLS[productSlug]?.label ??
    findExtraBrandFallback(productSlug)?.label ??
    null
  )
}

export function getKommunalProspektUrl(productSlug: string): string | null {
  return (
    PRODUCT_INDEX[productSlug]?.product.prospektUrl ??
    EXTRA_PRODUCT_URLS[productSlug]?.prospekt ??
    null
  )
}

const KOMMUNAL_CONTACT_EMAIL = 'michael.peter@ernst-moser.ch'

export function getKommunalAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  const ref = PRODUCT_INDEX[productSlug]
  let brandName: string | null = null
  let contactEmail = KOMMUNAL_CONTACT_EMAIL
  if (ref) {
    brandName = ref.brand.brandName
  } else {
    const fallback = findExtraBrandFallback(productSlug)
    if (fallback) {
      brandName = fallback.brandName
      if (fallback.email) contactEmail = fallback.email
    } else if (EXTRA_PRODUCT_URLS[productSlug]) brandName = 'Greentec'
  }
  if (!brandName) return null
  const trimmed = productName.startsWith(brandName)
    ? productName
    : `${brandName} ${productName}`
  const subject = `Anfrage ${trimmed}`
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`
}

// ─── Karussell-Slides pro Marke ───────────────────────────────────────────────

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
    detailUrl: `/kommunalcenter/${brand.brandSlug}/${product.slug}`,
    specs,
  }
}

export const KOMMUNAL_CAROUSEL_SLIDES: Record<string, CarouselSlide[]> = {
  alk: [
    makeSlide(ALKE, ALKE.products[0], 'ATX310E', [
      { icon: Wind, value: 'Kompakt', label: 'Für beengte Räume' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Emissionsfrei' },
      { icon: Gauge, value: 'Strassenzulassung', label: 'Kategorie N1' },
    ]),
    makeSlide(ALKE, ALKE.products[1], 'ATX320E', [
      { icon: Truck, value: 'Vielseitig', label: 'Der Allrounder' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Emissionsfrei' },
      { icon: Gauge, value: 'Strassenzulassung', label: 'Kategorie N1' },
    ]),
    makeSlide(ALKE, ALKE.products[2], 'ATX330E', [
      { icon: Truck, value: 'Hohe Nutzlast', label: 'Profi-Klasse' },
      { icon: Package, value: 'Hohe Zuglast', label: 'Anhängelast' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Emissionsfrei' },
    ]),
    makeSlide(ALKE, ALKE.products[3], 'ATX340E', [
      { icon: Truck, value: 'Schwerlast', label: 'Höchste Traglast' },
      { icon: Package, value: 'Hohe Zugkraft', label: 'Anhängelast' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Industrieklasse' },
    ]),
    makeSlide(ALKE, ALKE.products[4], 'ATX330/340ED', [
      { icon: Truck, value: 'Doppelkabine', label: 'Team + Material' },
      { icon: Package, value: 'Schwerlast-Basis', label: 'ATX330/340' },
      { icon: Zap, value: 'Strassenzulassung', label: 'EU-konform' },
    ]),
  ],
  kubota: KUBOTA.products.map((p) => {
    return makeSlide(KUBOTA, p, p.category ?? 'Kubota', [
      { icon: Settings, value: 'Kubota', label: 'Japanische Qualität' },
      { icon: Gauge, value: 'HST', label: 'Stufenloses Getriebe' },
      { icon: Sparkles, value: 'Profi-Klasse', label: 'Tägliche Belastung' },
    ])
  }),
  'ligier-professional': LIGIER.products.map((p, i) => {
    return makeSlide(LIGIER, p, p.title, [
      { icon: Zap, value: 'Vollelektrisch', label: 'Emissionsfrei' },
      { icon: Truck, value: i === 0 ? '3-Räder' : '4-Räder', label: 'Stadt-Logistik' },
      { icon: Settings, value: i === 0 ? '±30°' : 'Modular', label: i === 0 ? 'Pendelsystem' : 'Clip-System' },
    ])
  }),
  timan: TIMAN.products.map((p) => {
    const cat = p.title.replace('TIMAN ', '')
    return makeSlide(TIMAN, p, cat, [
      { icon: Settings, value: 'Multifunktion', label: 'Geräteträger' },
      { icon: Mountain, value: 'Hangtauglich', label: 'Bis 50° Steigung' },
      { icon: Wrench, value: 'Profi', label: 'Werkhof & Anlagenpflege' },
    ])
  }),
  envitec: ENVITEC.products.map((p) => {
    const cat = 'Streutechnik'
    return makeSlide(ENVITEC, p, cat, [
      { icon: Snowflake, value: 'Winterdienst', label: 'Salz & Sand' },
      { icon: Droplets, value: 'V2A-Edelstahl', label: 'Korrosionsbeständig' },
      { icon: Settings, value: 'Schweiz', label: 'Hersteller in Bauma' },
    ])
  }),
  reform: REFORM.products.map((p) => {
    return makeSlide(REFORM, p, p.category ?? 'Reform', [
      { icon: Settings, value: 'Reform', label: 'Wels, Österreich' },
      { icon: Mountain, value: p.category ?? 'Allround', label: 'Profi-Plattform' },
      { icon: Wrench, value: 'Anbaugeräte', label: 'Modulares System' },
    ])
  }),
  baoli: BAOLI.products.map((p) => {
    return makeSlide(BAOLI, p, p.category ?? 'Baoli', [
      { icon: Truck, value: 'Material Handling', label: 'Stapler & Lager' },
      { icon: Settings, value: 'Profi-Klasse', label: 'Robuste Bauweise' },
      { icon: Gauge, value: 'P/L-Verhältnis', label: 'Ausgezeichnet' },
    ])
  }),
  mulchy: MULCHY.products.map((p) => {
    return makeSlide(MULCHY, p, p.category ?? 'Mulchy', [
      { icon: Leaf, value: 'Mulch & Mäh', label: 'Profi-Technik' },
      { icon: Settings, value: 'Schweiz', label: 'Mulchtechnik' },
      { icon: Wrench, value: 'Robust', label: 'Vielseitig einsetzbar' },
    ])
  }),
  springer: SPRINGER.products.map((p) => {
    return makeSlide(SPRINGER, p, 'Springer', [
      { icon: Snowflake, value: 'Winterdienst', label: 'Streumaschinen' },
      { icon: Settings, value: 'Profi', label: 'Kommunal-Einsatz' },
      { icon: Wrench, value: 'Robust', label: 'Lange Lebensdauer' },
    ])
  }),
}
