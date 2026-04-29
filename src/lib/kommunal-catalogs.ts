/**
 * Kommunalcenter-Katalog für 13 Marken.
 *
 *   Alkè · Kubota (nur Aufsitzmäher) · Gianni Ferrari · Ligier Professional ·
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
  longDescription: string[]
  image: string
  sourceImageUrl: string
  externalUrl: string
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
  carouselEyebrow: string
  carouselHeading: string
  carouselAriaLabel: string
  sectionEyebrow: string
  sectionTitle: string
  sectionLead: string
  products: KommunalProduct[]
}

const ALKE: KommunalBrand = {
  brandSlug: 'alk',
  brandName: 'Alkè',
  externalCtaLabel: 'Bei Alkè ansehen',
  homepageUrl: 'https://www.alke.com/de-de/',
  carouselEyebrow: 'Die Alkè-Flotte',
  carouselHeading: 'Vollelektrische Profi-Nutzfahrzeuge',
  carouselAriaLabel: 'Alkè ATX-Modelle',
  sectionEyebrow: 'Alkè ATX-Programm',
  sectionTitle: 'Elektrische Profi-Nutzfahrzeuge',
  sectionLead:
    'Alkè ATX-Modelle sind kompakte, robuste vollelektrische Nutzfahrzeuge — straßenzulassungsfähig und kompromisslos professionell.',
  products: [
    { slug: 'alke-atx-340e', title: 'Alkè ATX 340E', shortDescription: 'Robustes Elektrofahrzeug für harte Arbeitsbedingungen — 1.630 kg Traglast, 4.500 kg Zuglast.', longDescription: ['Der ATX 340E ist Alkès Schwerlast-Modell der ersten Generation: bis 1.630 kg Traglast, 4.500 kg Anhängelast.', 'Robuster Stahlrahmen und kompromissloser Elektroantrieb — die Workhorse-Variante für Industrie- und Werkhof-Einsätze.'], image: '/images/products/alke-atx-340e/main.webp', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0554/1920/elektrisches-nutzfahrzeug-alke-atx340e.webp', externalUrl: 'https://www.alke.com/de-de/elektrisches-nutzfahrzeug-atx340e' },
    { slug: 'alke-atx-440s', title: 'Alkè ATX 440S', shortDescription: 'Wendiger Klein-Transporter — nur 148 cm Breite (Spiegel eingeklappt) und 3 m Wendekreis.', longDescription: ['Der ATX 440S ist die kompakteste Variante der neuen ATX4-Plattform — 148 cm Breite mit eingeklappten Spiegeln, 3 m Wendekreis.', '1.550 kg Traglast bei voller Strassenzulassung (Kategorie N1) — perfekt für engen Innenstadt- und Werkhof-Betrieb.'], image: '/images/products/alke-atx-440s/main.webp', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0859/1920/klein-transporter-elektroantrieb-alke-atx4.webp', externalUrl: 'https://www.alke.com/de-de/kleintransporter-elektroantrieb-atx310e' },
    { slug: 'alke-atx-440m', title: 'Alkè ATX 440M', shortDescription: 'Meistverkauftes Modell — 1.540 kg Traglast, 5.000 kg Anhängelast, 200 cm Ladefläche.', longDescription: ['Der ATX 440M ist das Bestsellermodell der ATX4-Plattform: 1.540 kg Traglast, 5.000 kg Anhängelast, 200 cm Ladefläche.', 'Volle Strassenzulassung (Kategorie N1) — der Allrounder für Kommunaldienste, Werkhöfe und Industrie.'], image: '/images/products/alke-atx-440m/main.webp', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0860/1920/professionelle-elektrofahrzeuge-alke-atx4.webp', externalUrl: 'https://www.alke.com/de-de/elektrofahrzeuge-atx320e' },
    { slug: 'alke-atx-480', title: 'Alkè ATX 480 (4x4)', shortDescription: 'Allrad-Geländewagen — überwindet bis 40 % Steigung, 1.450 kg Traglast, 5.000 kg Zuglast.', longDescription: ['Der ATX 480 mit Allradantrieb 4x4 erschliesst auch schwieriges Gelände: bis 40 % Steigung, 1.450 kg Traglast, 5.000 kg Zuglast.', 'Robust für Forst, Bau und Werkhöfe in unwegsamem Gelände — komplett emissionsfrei.'], image: '/images/products/alke-atx-480/main.webp', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0856/1920/elektro-gelaendewagen-atx480-alke.webp', externalUrl: 'https://www.alke.com/de-de/elektro-gelaendewagen-atx330e' },
    { slug: 'alke-atx-ed', title: 'Alkè ATX ED Doppelkabine', shortDescription: '4 Sitze für simultanen Team- und Material-Transport — 1.450 kg Traglast, 4.000 kg Anhängelast.', longDescription: ['Der ATX ED bietet eine Doppelkabine mit 4 Sitzplätzen — Team und Material gleichzeitig transportieren.', '1.450 kg Traglast, 4.000 kg Anhängelast, europäische Strassenzulassung — die Crewcab-Variante der ATX-Familie.'], image: '/images/products/alke-atx-ed/main.webp', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0521/1920/elektro-transporter-doppelkabine-alke-atx-ed.webp', externalUrl: 'https://www.alke.com/de-de/elektro-transporter-doppelkabine' },
  ],
}

const KUBOTA: KommunalBrand = {
  brandSlug: 'kubota',
  brandName: 'Kubota',
  externalCtaLabel: 'Bei Kubota ansehen',
  homepageUrl: 'https://kdg.kubota-eu.com/groundcare/?country=de',
  carouselEyebrow: 'Kubota Aufsitzmäher',
  carouselHeading: 'Für jede Rasenfläche der passende Mäher',
  carouselAriaLabel: 'Kubota Aufsitzmäher-Modelle',
  sectionEyebrow: 'Kubota Aufsitzmäher',
  sectionTitle: 'Kubota-Aufsitzmäher-Programm',
  sectionLead: 'Vom kompakten Frontmäher bis zum Premium-Zero-Turn — robuste Diesel- und Benzin-Aufsitzmäher für Profis und anspruchsvolle Privatkunden.',
  products: [
    { slug: 'kubota-fc2-serie', title: 'Kubota FC2 Serie', shortDescription: 'Kompakter Front-Aufsitzmäher mit Kubota D902-Motor (22 PS).', longDescription: ['Der FC2 ist Kubotas kompakter Front-Aufsitzmäher mit dem bewährten D902-Dieselmotor (22 PS).', 'Die kleinen Abmessungen ermöglichen den Einsatz in Bereichen, die mit grösseren Maschinen unzugänglich sind.'], image: '/images/products/kubota-fc2-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/FC2-Serie/fc2-221-studio-01.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/fc2/' },
    { slug: 'kubota-fc3-serie', title: 'Kubota FC3 Serie', shortDescription: 'Robuster Grossflächenmäher mit 3-Zylinder-Diesel und 800-Liter-Fangbehälter.', longDescription: ['Der FC3 ist der Grossflächen-Frontmäher von Kubota mit kraftvollem 3-Zylinder-Dieselmotor.', '800-Liter-Fangbehälter und hohe Schnittleistung.'], image: '/images/products/kubota-fc3-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/FC3-Serie/fc3-261-studio.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/fc3/' },
    { slug: 'kubota-g-serie', title: 'Kubota G Serie', shortDescription: 'Professioneller Rasentraktor mit HST-Getriebe und kraftvollem Mähdeck.', longDescription: ['Die G-Serie ist Kubotas Allrounder im Rasentraktoren-Segment.', 'HST-Getriebe, robuste Kubota-Motoren und kraftvolle Mähdecks.'], image: '/images/products/kubota-g-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/G-Serie/g231-studio.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/g-serie/' },
    { slug: 'kubota-gr-serie', title: 'Kubota GR Serie', shortDescription: 'Hochwertige Aufsitzmäher mit Diesel-Motoren (13,5 / 21 PS).', longDescription: ['Die GR-Serie ist die gehobene Privatkunden-Klasse.', 'Diesel-Motoren mit 13,5 oder 21 PS, Fangbehälter bis 450 Liter.'], image: '/images/products/kubota-gr-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/GR-Serie/gr2120-studio.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/gr-serie/' },
    { slug: 'kubota-gzd-serie', title: 'Kubota GZD Serie', shortDescription: 'Zero-Turn-Dieselrasenmäher mit 15 oder 21 PS — beispielhafte Wendigkeit.', longDescription: ['Die GZD-Serie kombiniert Zero-Turn-Wendigkeit mit kraftvollem Diesel-Antrieb.', '15 oder 21 PS, direkte Grasaufnahme.'], image: '/images/products/kubota-gzd-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/GZD-Serie/gzd21_studio.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/gzd-serie/' },
    { slug: 'kubota-z4-serie', title: 'Kubota Z4 Serie', shortDescription: 'Premium Zero-Turn-Mäher mit exaktem Schnittbild und hoher Flächenleistung.', longDescription: ['Die Z4-Serie ist Kubotas Premium-Zero-Turn-Linie.', 'Null-Wenderadius vereinfacht das Manövrieren.'], image: '/images/products/kubota-z4-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/Z4-Serie/z4-541-studio-01.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/z4-serie/' },
    { slug: 'kubota-zd-serie', title: 'Kubota ZD Serie', shortDescription: 'Hochleistungs-Zero-Turn mit 25-PS-Diesel und kraftvoller HST-Übertragung.', longDescription: ['Die ZD-Serie ist Kubotas Hochleistungs-Zero-Turn.', 'Kraftvolle HST-Übertragung mit präzisem Schnittbild.'], image: '/images/products/kubota-zd-serie/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/ZD-Serie/zd-1211_studio-01.jpg', externalUrl: 'https://kdg.kubota-eu.com/groundcare/series/zd-serie/' },
  ],
}

const GIANNI_FERRARI: KommunalBrand = {
  brandSlug: 'gianni-ferrari',
  brandName: 'Gianni Ferrari',
  externalCtaLabel: 'Bei Gianni Ferrari ansehen',
  homepageUrl: 'https://www.gianniferrari.com/de/',
  carouselEyebrow: 'Die Gianni-Ferrari-Flotte',
  carouselHeading: 'Profi-Rasenmäher aus Italien',
  carouselAriaLabel: 'Gianni Ferrari Modelle',
  sectionEyebrow: 'Gianni Ferrari',
  sectionTitle: 'Profi-Rasenmäher und Multifunktionsmaschinen',
  sectionLead:
    'Italienische Premium-Rasenmäher und Multifunktionsmaschinen für Kommunal-, Sport- und Anlagenpflege — robust, präzise, vielseitig.',
  products: [
    { slug: 'gianni-ferrari-pg', title: 'PG / PG XPRO', shortDescription: 'Multifunktionale Rasenmäher mit 600–800 Liter Behälter und 22–26 PS — 2WD oder 4WD.', longDescription: ['Der PG / PG XPRO ist Gianni Ferraris Multifunktions-Aufsitzmäher mit 22–26 PS und 600–800 Liter Sammelbehälter.', 'Erhältlich in 2WD oder 4WD, mit umfangreichem Anbaugeräte-Programm.'], image: '/images/products/gianni-ferrari-pg/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/PG220D-dal-basso-2-scaled.jpg', externalUrl: 'https://gianniferrari.com/prodotti/rasaerba-professionali-multifunzione-pg-pgxpro/' },
    { slug: 'gianni-ferrari-gtr', title: 'GTR Frontmäher', shortDescription: 'Kompakter Frontmäher mit Briggs & Stratton Motor und 280-Liter-Behälter.', longDescription: ['Der GTR ist Gianni Ferraris kompakter Frontmäher mit Briggs & Stratton Motor und 280-Liter-Sammelbehälter.', 'Hervorragende Sicht auf die Arbeitsfläche und Präzision in der Kantenbearbeitung.'], image: '/images/products/gianni-ferrari-gtr/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/Gianni_Ferrari-GTR.jpg', externalUrl: 'https://gianniferrari.com/prodotti/trattorino-tagliaerba-frontale-gtr/' },
    { slug: 'gianni-ferrari-turbo-1-2-4', title: 'Turbo 1 / 2 / 4', shortDescription: 'Multifunktions-Mäher mit 1.100–1.300 Liter Behälter, 26 PS Diesel — 4WD-Varianten.', longDescription: ['Die Turbo-Familie (1, 2, 4) ist Gianni Ferraris Profi-Multifunktions-Linie.', '4WD-Varianten und 13–18 km/h Geschwindigkeit machen sie ideal für unebenes Gelände.'], image: '/images/products/gianni-ferrari-turbo-1-2-4/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/GF-Turbo4.jpg', externalUrl: 'https://gianniferrari.com/prodotti/trattorini-tagliaerba-multifunzione-turbo-1-2-4/' },
    { slug: 'gianni-ferrari-turbo-v50', title: 'Turbo V50', shortDescription: 'Professioneller 50-PS-Großflächenmäher mit 4WD und elektronischem Kubota-Diesel.', longDescription: ['Der Turbo V50 ist das Flaggschiff für Großflächen.', 'Wahlweise mit ROPS-Plattform oder luxuriöser Cruiser-Kabine.'], image: '/images/products/gianni-ferrari-turbo-v50/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/07/Gianni_Ferrari-Turbo-v50.jpg', externalUrl: 'https://gianniferrari.com/prodotti/tagliaerba-professionale-grandi-superfici-turbo-v50/' },
    { slug: 'gianni-ferrari-turboloader', title: 'Turboloader', shortDescription: 'Multifunktionsmaschine mit Teleskoparm (3 m), 700–900 kg Hubkraft und über 25 Anbaugeräten.', longDescription: ['Der Turboloader ist eine knickgelenkte Multifunktionsmaschine mit Teleskoparm.', 'Über 25 austauschbare Anbaugeräte.'], image: '/images/products/gianni-ferrari-turboloader/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/07/turboloader.jpg', externalUrl: 'https://gianniferrari.com/prodotti/macchina-multifunzione-turboloader/' },
    { slug: 'gianni-ferrari-gsr-plus', title: 'GSR Plus (Elektro)', shortDescription: 'Elektrischer Profi-Mäher mit 112 cm Schnittbreite, Li-Ion-Akku und 6–8 Stunden Laufzeit.', longDescription: ['Der GSR Plus ist Gianni Ferraris elektrische Antwort auf den Profi-Aufsitzmäher.', 'Li-Ion-Akku, 9 kW Leistung, emissionsfrei und geräuscharm.'], image: '/images/products/gianni-ferrari-gsr-plus/main.webp', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/09/GSR-elettric-.jpg', externalUrl: 'https://gianniferrari.com/prodotti/trattorino-tagliaerba-a-batteria-gsr-plus/' },
  ],
}

const LIGIER: KommunalBrand = {
  brandSlug: 'ligier-professional',
  brandName: 'Ligier Professional',
  externalCtaLabel: 'Bei Ligier Professional ansehen',
  homepageUrl: 'https://www.ligier-professional.com/',
  carouselEyebrow: 'Die Ligier-Pulse-Flotte',
  carouselHeading: 'Vollelektrische Leichtfahrzeuge',
  carouselAriaLabel: 'Ligier Pulse Modelle',
  sectionEyebrow: 'Ligier Pulse',
  sectionTitle: 'Vollelektrische Leichtfahrzeuge',
  sectionLead:
    'Ligier Pulse 3 (3-rädrig) und Pulse 4 (4-rädrig) — vollelektrische Leichtfahrzeuge für Stadt-Logistik, Gemeinden und Kurzstrecken.',
  products: [
    { slug: 'ligier-pulse-3', title: 'Ligier Pulse 3', shortDescription: 'Dreirädriges Elektrofahrzeug mit Pendelsystem (±30°) — wendig und sicher für Kurzstrecken-Logistik.', longDescription: ['Der Pulse 3 ist Ligiers dreirädriges Elektrofahrzeug mit exklusivem Pendelsystem für ±30° Kurvenneigung.', 'Ideal für Kurzstrecken-Logistik, Paketdienste und urbanen Verkehr.'], image: '/images/products/ligier-pulse-3/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_3/ligier_pulse_3_studio.jpg', externalUrl: 'https://www.ligier-professional.com/product/pulse-3/' },
    { slug: 'ligier-pulse-4', title: 'Ligier Pulse 4', shortDescription: 'Modulares Elektronutzfahrzeug mit Clip-System für Aufbauwechsel in 5 Minuten.', longDescription: ['Der Pulse 4 ist Ligiers vierrädriges, modulares Elektronutzfahrzeug — austauschbares Clip-System.', '5-Minuten-Anbau, vielfältige Anwendungen.'], image: '/images/products/ligier-pulse-4/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_4/ligier_pulse_4_studio.jpg', externalUrl: 'https://www.ligier-professional.com/product/pulse-4/' },
  ],
}

const TIMAN: KommunalBrand = {
  brandSlug: 'timan',
  brandName: 'TIMAN',
  externalCtaLabel: 'Bei TIMAN ansehen',
  homepageUrl: 'https://timan.dk/de/',
  carouselEyebrow: 'TIMAN Geräteträger',
  carouselHeading: 'Ferngesteuerte Kommunalmaschinen',
  carouselAriaLabel: 'TIMAN Modelle',
  sectionEyebrow: 'TIMAN',
  sectionTitle: 'Geräteträger und Funkmäher',
  sectionLead:
    'Vom kompakten Tool-Trac bis zum funkferngesteuerten Hangmäher — TIMAN-Geräteträger sind die vielseitige Profi-Plattform für Werkhöfe und Anlagenpflege.',
  products: [
    { slug: 'timan-tool-trac', title: 'TIMAN Tool-Trac', shortDescription: 'Kompakter Geräteträger mit 65 cm Wendekreis, 4WD und hydraulischem Parallelogrammhub.', longDescription: ['Der TIMAN Tool-Trac ist ein kompakter Multifunktions-Geräteträger.', 'Hydraulischer Parallelogrammhub für vielseitige Einsätze.'], image: '/images/products/timan-tool-trac/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/Tool-Trac_studio.jpg', externalUrl: 'https://timan.dk/de/maschinen/geraetetraeger/' },
    { slug: 'timan-rc-1000', title: 'TIMAN RC-1000', shortDescription: 'Ferngesteuerter Hangmäher mit Einzelradaufhängung und hydraulischer Mähwerkshubfunktion.', longDescription: ['Der RC-1000 ist TIMANs Funkferngesteuerter Hangmäher.', 'Speziell für Flächen unter Rohrleitungen, Böschungen und Verkehrsinseln.'], image: '/images/products/timan-rc-1000/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC1000_studio.jpg', externalUrl: 'https://timan.dk/de/maschinen/hangmaeher/ferngesteuerte-geraetetraeger/' },
    { slug: 'timan-rc-751', title: 'TIMAN RC-751', shortDescription: 'Funkferngesteuerter Hangmäher für Steigungen bis 50° — 750 mm Schnittbreite, nur 330 kg.', longDescription: ['Der RC-751 erlaubt sicheres Mähen extremer Hänge bis 50°.', '750 mm Schnittbreite, nur 330 kg Eigengewicht.'], image: '/images/products/timan-rc-751/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC-751/Timan_RC751_Studio.jpg', externalUrl: 'https://timan.dk/de/maschinen/hangmaeher/ferngesteuerte-hangmaeher/' },
    { slug: 'timan-3330', title: 'TIMAN 3330', shortDescription: 'Knickgelenkter Geräteträger mit branchenführend leiser Kabine (68 dB) — vollhydraulisch und wartungsarm.', longDescription: ['Der 3330 ist TIMANs grösster knickgelenkter Geräteträger.', 'Vollhydraulisch, wartungsarm, drei universelle Anbaupositionen.'], image: '/images/products/timan-3330/main.webp', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/3330/Timan_3330_Studio.jpg', externalUrl: 'https://timan.dk/de/maschinen/geraetetraeger/geraetetraeger-mit-komfortkabine/' },
  ],
}

const MATEV: KommunalBrand = {
  brandSlug: 'matev',
  brandName: 'Matev',
  externalCtaLabel: 'Bei Matev ansehen',
  homepageUrl: 'https://www.matev.eu/de/',
  carouselEyebrow: 'Matev Anbaugeräte',
  carouselHeading: 'Anbaugeräte für Profi-Traktoren',
  carouselAriaLabel: 'Matev Anbaugeräte',
  sectionEyebrow: 'Matev',
  sectionTitle: 'Anbaugeräte für Kommunalfahrzeuge',
  sectionLead: 'Matev liefert hochwertige Anbaugeräte für Kompakttraktoren und Geräteträger — Mähwerke, Schneepflüge, Kehrmaschinen und mehr.',
  products: [
    { slug: 'matev-mow-fm-160', title: 'Matev MOW-FM 160', shortDescription: 'Frontmähwerk 160 cm mit PE-Cover und 5 austauschbaren Mähköpfen.', longDescription: ['Das MOW-FM 160 ist ein professionelles Frontmähwerk mit 160 cm Arbeitsbreite.', 'Fünf austauschbare Mähköpfe und 360°-Schutzräder.'], image: '/images/products/matev-mow-fm-160/main.webp', sourceImageUrl: 'https://www.matev.eu/01_Produkte/02_MOW/MOW-FM/MOW-FM-160/16_Marketingbilder/01_Bilder-main/image-thumb__4572__content-full/mow-fm-160-striegel-frontmaehwerk-main01-matev.jpg', externalUrl: 'https://www.matev.eu/de/gruenpflege/maehwerke/frontmaehwerk-mow-fm-160' },
    { slug: 'matev-mow-pt-155', title: 'Matev MOW-PT 155', shortDescription: 'Portalmähwerk 155 cm mit insektenschonender Mähtechnik und DUROCUT®-Hartmetall-Doppelmesser.', longDescription: ['Das MOW-PT 155 ist ein Portalmähwerk mit insektenschonender Gegenläufer-Mähmesser-Technik.', 'DUROCUT® Hartmetall-Doppelmesser, einheitliche Grasableitung.'], image: '/images/products/matev-mow-pt-155/main.webp', sourceImageUrl: 'https://www.matev.eu/01_Produkte/02_MOW/MOW-PT/Marketingbilder/Bannerbild/image-thumb__9390__content-full/mow-pt-155-portalmaehwerk-hero01-matev.jpg', externalUrl: 'https://www.matev.eu/de/gruenpflege/maehwerke/portalmaehwerk-mow-pt-155' },
    { slug: 'matev-srm-fb-150', title: 'Matev SRM-FB 150', shortDescription: 'Klappschild-Schneepflug 150 cm mit hydraulischer 25°-Winkelverstellung und Pendelaufhängung.', longDescription: ['Das SRM-FB 150 ist ein Klappschild-Schneepflug für Kompakttraktoren bis 36 kW.', 'Automatische Sicherheitsmechanik, Pendelaufhängung.'], image: '/images/products/matev-srm-fb-150/main.webp', sourceImageUrl: 'https://www.matev.eu/01_Produkte/06_SRM/SRM-FB/16_Marketingbilder/Bannerbilder/image-thumb__9418__content-full/srm-fb-150-schneeraeumschild-360grad01-matev.jpg', externalUrl: 'https://www.matev.eu/de/winterdienst/schneeraeumschilde/umklappschild-srm-fb-150' },
    { slug: 'matev-swe-45', title: 'Matev SWE-45', shortDescription: 'Frontkehrmaschine SWE-45 — ideal für Laub und Schmutz auf Strassen und Grünflächen.', longDescription: ['Die SWE-45 ist eine Frontkehrmaschine mit 450 mm Bürstendurchmesser für Profi-Traktoren.', 'Starke Kehrwalzen mit innovativem Besatz.'], image: '/images/products/matev-swe-45/main.webp', sourceImageUrl: 'https://www.matev.eu/01_Produkte/05_SWE/SWE-45/16_Marketingbilder/Bannerbilder/image-thumb__9383__content-full/swe-14-45-frontkehrmaschine-360grad01-matev.jpg', externalUrl: 'https://www.matev.eu/de/flaechenpflege/kehrmaschinen/frontkehrmaschine-swe-14-45' },
    { slug: 'matev-cls-g-1350-xe', title: 'Matev CLS-G 1350 XE', shortDescription: 'Grasaufnahmegerät 1.350 Liter mit leistungsstarker Turbine und Bodenentladung.', longDescription: ['Das CLS-G 1350 XE ist ein Grasaufnahmegerät mit 1.350 Liter Volumen.', 'PE-Kunststoff-Behälter, Makrolon-Sichtfenster.'], image: '/images/products/matev-cls-g-1350-xe/main.webp', sourceImageUrl: 'https://www.matev.eu/01_Produkte/04_CLS/CLS-XE/16_Marketingbilder/Bannerbilder/image-thumb__9399__content-full/cls-1350-xe-aufnahmegeraet-360grad01-matev.jpg', externalUrl: 'https://www.matev.eu/de/gruenpflege/materialaufnahmegeraete/materialaufnahmegeraet-cls-g-1350-xe' },
  ],
}

const ECOTECH: KommunalBrand = {
  brandSlug: 'ecotech',
  brandName: 'Ecotech',
  externalCtaLabel: 'Bei Ecotech ansehen',
  homepageUrl: 'https://www.ecotech.at/',
  carouselEyebrow: 'Ecotech Kommunaltechnik',
  carouselHeading: 'Komplettprogramm für Kommunalbetriebe',
  carouselAriaLabel: 'Ecotech Modelle',
  sectionEyebrow: 'Ecotech',
  sectionTitle: 'Kommunaltechnik aus Österreich',
  sectionLead:
    'Ecotech (Lebring, Österreich) entwickelt Spezialgeräte in elf Kategorien — Kehrmaschinen, Schneepflüge, Streuer, Wildkrautbürsten, Multiwash-Systeme und mehr.',
  products: [
    { slug: "ecotech-grasabsaugung-gs1s", category: "Grasabsaugungen", title: "Ecotech Grasabsaugung GS1S - für effizientes Gras- und Laubsammeln", shortDescription: "Mit der ecotech Grasabsaugung GS1S lässt sich Gras- und Laub schnell und effizient einsammeln. Eine leistungsstarke Saugturbine sorgt für bestes Ergebnis.", longDescription: ["Mit der ecotech Grasabsaugung GS1S lässt sich Gras- und Laub schnell und effizient einsammeln. Eine leistungsstarke Saugturbine sorgt für bestes Ergebnis."], image: "/images/products/ecotech-grasabsaugung-gs1s/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Grasabsaugung-GS1S3-Vorschaubild-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-grasabsaugung-gs1s/" },
    { slug: "ecotech-grasabsaugung-gs01", category: "Grasabsaugungen", title: "Ecotech Grasabsaugung GS01 - mit Boden und Hochentleerung", shortDescription: "Die ecotech Grasabsaugung GS01 eignet sich zum Sammeln von Gras und Laub. Sie verfügt über eine äusserst leise und leistungsstarke Saugturbine mit abgestimmtem Hochentleerungs-System für effizienten Einsatz auf Sport-, Park- und Grünanlagen.", longDescription: ["Die ecotech Grasabsaugung GS01 eignet sich zum Sammeln von Gras und Laub. Sie verfügt über eine äusserst leise und leistungsstarke Saugturbine mit abgestimmtem Hochentleerungs-System für effizienten Einsatz auf Sport-, Park- und Grünanlagen."], image: "/images/products/ecotech-grasabsaugung-gs01/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Grassauger_GS01_2.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-grasabsaugung-gs01/" },
    { slug: "ecotech-grasabsaugung-gs01-fuer-john-deere-x-serie", category: "Grasabsaugungen", title: "Ecotech Grasabsaugung GS01 für John Deere (X-Serie) - mit Boden und Hochentleerung", shortDescription: "Die ecotech Grasabsaugung GS01 eignet sich zum Sammeln von Gras und Laub. Sie verfügt über eine äusserst leise und leistungsstarke Saugturbine mit abgestimmtem Hochentleerungs-System für effizienten Einsatz auf Sport-, Park- und Grünanlagen.", longDescription: ["Die ecotech Grasabsaugung GS01 eignet sich zum Sammeln von Gras und Laub. Sie verfügt über eine äusserst leise und leistungsstarke Saugturbine mit abgestimmtem Hochentleerungs-System für effizienten Einsatz auf Sport-, Park- und Grünanlagen."], image: "/images/products/ecotech-grasabsaugung-gs01-fuer-john-deere-x-serie/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2024/04/Ecotech-Grassauger_GS01.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-grasabsaugung-gs01-fuer-john-deere-x-serie/" },
    { slug: "ecotech-heckhydraulikaggregat", category: "Heckhydraulikaggregate", title: "Ecotech Heckhydraulikaggregat - für Traktoren ohne Frontzapfwelle", shortDescription: "Das ecotech Heckhydraulikaggregat wird eingesetzt, wenn das Trägerfahrzeug keine Frontzapfwelle oder eine unzureichende Hydraulikleistung hat. Es liefert die nötige Hydraulikleistung für Front-Anbaugeräte und macht so auch ältere Traktoren universell einsetzbar.", longDescription: ["Das ecotech Heckhydraulikaggregat wird eingesetzt, wenn das Trägerfahrzeug keine Frontzapfwelle oder eine unzureichende Hydraulikleistung hat. Es liefert die nötige Hydraulikleistung für Front-Anbaugeräte und macht so auch ältere Traktoren universell einsetzbar."], image: "/images/products/ecotech-heckhydraulikaggregat/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2022/06/Heckhydraulikaggregat_ohne_Wassertank.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-heckhydraulikaggregat/" },
    { slug: "ecotech-kanalspuelgeraet-ksg", category: "Kanalspülgeräte", title: "Ecotech Kanalspülgerät KSG - zum Reinigen mit Hochdruck", shortDescription: "Mit den ecotech Kanalspülgerät KSG werden Rohre (bis 60 cm Durchmesser) und Rinnen mit Hochdruck gereinigt - dazu der Multiwash-Wassertank.", longDescription: ["Mit den ecotech Kanalspülgerät KSG werden Rohre (bis 60 cm Durchmesser) und Rinnen mit Hochdruck gereinigt - dazu der Multiwash-Wassertank."], image: "/images/products/ecotech-kanalspuelgeraet-ksg/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2021/05/KSG_Deutz-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kanalspuelgeraet-ksg/" },
    { slug: "ecotech-kanalspuelgeraet-ksg-fuer-unimog", category: "Kanalspülgeräte", title: "Ecotech Kanalspülgerät KSG für Unimog - zum Reinigen mit Hochdruck", shortDescription: "Mit den ecotech Kanalspülgerät KSG werden Rohre (bis 60 cm Durchmesser) und Rinnen mit Hochdruck gereinigt - dazu der Multiwash-Wassertank.", longDescription: ["Mit den ecotech Kanalspülgerät KSG werden Rohre (bis 60 cm Durchmesser) und Rinnen mit Hochdruck gereinigt - dazu der Multiwash-Wassertank."], image: "/images/products/ecotech-kanalspuelgeraet-ksg-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2021/05/Unimog_KSG-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kanalspuelgeraet-ksg-fuer-unimog/" },
    { slug: "ecotech-kehrmaschine-r", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine R - nur zum Freikehren - für den Dauereinsatz", shortDescription: "Die ecotech Kehrmaschine R eignet sich für Straßen und Flächen, die ohne Kehrgutaufnahme im Dauereinsatz gekehrt werden sollen.", longDescription: ["Die ecotech Kehrmaschine R eignet sich für Straßen und Flächen, die ohne Kehrgutaufnahme im Dauereinsatz gekehrt werden sollen."], image: "/images/products/ecotech-kehrmaschine-r/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/photoworker_0092_w-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-r/" },
    { slug: "ecotech-kehrmaschine-r-fuer-unimog", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine R für Unimog - für den schweren Dauereinsatz", shortDescription: "Die ecotech Kehrmaschine R ist passend für den Unimog gebaut und für den schweren Dauereinsatz konzipiert. Bestes Kehrergebnis garantiert!", longDescription: ["Die ecotech Kehrmaschine R ist passend für den Unimog gebaut und für den schweren Dauereinsatz konzipiert. Bestes Kehrergebnis garantiert!"], image: "/images/products/ecotech-kehrmaschine-r-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/photoworkers-50009-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-r-fuer-unimog/" },
    { slug: "ecotech-kehrmaschine-rs", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine RS - nur zum Freikehren - für den Dauereinsatz", shortDescription: "Die ecotech Kehrmaschine RS ist nur für das Freikehren gebaut und eignet sich für den professionellen Dauereinsatz beim Schmutz- und Schneekehren.", longDescription: ["Die ecotech Kehrmaschine RS ist nur für das Freikehren gebaut und eignet sich für den professionellen Dauereinsatz beim Schmutz- und Schneekehren."], image: "/images/products/ecotech-kehrmaschine-rs/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Kehrmaschine-RS-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-rs/" },
    { slug: "ecotech-kehrmaschine-lig", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine LIG - speziell für große Radlader oder Stapler", shortDescription: "Die ecotech Kehrmaschine LIG wurde speziell für große Radlader, Gabelstapler und Baggerlader entwickelt, um mit ihnen wirtschaftlich zu reinigen.", longDescription: ["Die ecotech Kehrmaschine LIG wurde speziell für große Radlader, Gabelstapler und Baggerlader entwickelt, um mit ihnen wirtschaftlich zu reinigen."], image: "/images/products/ecotech-kehrmaschine-lig/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/LEI4265-3-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-lig/" },
    { slug: "ecotech-kehrmaschine-klig", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine KLIG - speziell für Radlader und Stapler entwickelt", shortDescription: "Die ecotech Kehrmaschine KLIG wurde speziell für Hof- und Radlader, Stapler und Bagger entwickelt und sorgt für wirtschaftliches und zeitsparendes Kehren.", longDescription: ["Die ecotech Kehrmaschine KLIG wurde speziell für Hof- und Radlader, Stapler und Bagger entwickelt und sorgt für wirtschaftliches und zeitsparendes Kehren."], image: "/images/products/ecotech-kehrmaschine-klig/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Kehrmaschine-KLIG-Vorschaubild.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-klig/" },
    { slug: "ecotech-kehrmaschine-ws", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine WS - ideal für Hoflader, Radlader und Gabelstapler", shortDescription: "Die ecotech Kehrmaschine WS garantiert optimale Kehrergebnisse. Sie wurde speziell für den Einsatz auf Hoflader, Radlader und Gabelstapler konzipiert.", longDescription: ["Die ecotech Kehrmaschine WS garantiert optimale Kehrergebnisse. Sie wurde speziell für den Einsatz auf Hoflader, Radlader und Gabelstapler konzipiert."], image: "/images/products/ecotech-kehrmaschine-ws/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/ecotech_stl_004_ws-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-ws/" },
    { slug: "ecotech-kehrmaschine-gbs", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine GBS - Für den Landwirt", shortDescription: "Die ecotech Kehrmaschine GBS wurde speziell für Landwirte entwickelt und eignet sich hervorragend für die tägliche Betriebspflege.", longDescription: ["Die ecotech Kehrmaschine GBS wurde speziell für Landwirte entwickelt und eignet sich hervorragend für die tägliche Betriebspflege."], image: "/images/products/ecotech-kehrmaschine-gbs/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/DSC_8212.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-gbs/" },
    { slug: "ecotech-kehrmaschine-s", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine S - in Kehrbreiten von 140 - 170 cm", shortDescription: "Die ecotech Kehrmaschine S ist in Kehrbreiten von 140 - 170 cm verfügbar und eignet sich zum Sammeln und Freikehren mit optimalem Ergebnis.", longDescription: ["Die ecotech Kehrmaschine S ist in Kehrbreiten von 140 - 170 cm verfügbar und eignet sich zum Sammeln und Freikehren mit optimalem Ergebnis."], image: "/images/products/ecotech-kehrmaschine-s/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Kehrmaschine-S-Vorschaubild-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-s/" },
    { slug: "ecotech-kehrmaschine-sk", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine SK - zum Sammeln und Freikehren", shortDescription: "Die ecotech Kehrmaschine SK zum Sammeln und Freikehren sorgt mit ihrem leistungsstarken Hydraulikmotor für optimale Kehrergebnisse.", longDescription: ["Die ecotech Kehrmaschine SK zum Sammeln und Freikehren sorgt mit ihrem leistungsstarken Hydraulikmotor für optimale Kehrergebnisse."], image: "/images/products/ecotech-kehrmaschine-sk/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Kehrmaschine-SK-kleiner.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-sk/" },
    { slug: "ecotech-kehrmaschine-sgk", category: "Kehrmaschinen", title: "Ecotech Kehrmaschine SGK - mit Gelenkwellenantrieb", shortDescription: "Die ecotech Kehrmaschine SGK wird über eine Gelenkwelle angetrieben und eignet sich für Trägerfahrzeuge wie Kompakttraktoren mit Frontzapfwelle.", longDescription: ["Die ecotech Kehrmaschine SGK wird über eine Gelenkwelle angetrieben und eignet sich für Trägerfahrzeuge wie Kompakttraktoren mit Frontzapfwelle."], image: "/images/products/ecotech-kehrmaschine-sgk/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/LEI8022-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrmaschine-sgk/" },
    { slug: "ecotech-airport-kehrmaschine-asw-nur-fuer-flughaefen", category: "Kehrmaschinen", title: "Ecotech Airport Kehrmaschine ASW - NUR FÜR FLUGHÄFEN -", shortDescription: "Die ecotech Airport Kehrmaschine ASW wurde speziell für das Schneekehren auf Flughäfen entwickelt. Sie ist die leistungsstärkste ecotech Kehrmaschine.", longDescription: ["Die ecotech Airport Kehrmaschine ASW wurde speziell für das Schneekehren auf Flughäfen entwickelt. Sie ist die leistungsstärkste ecotech Kehrmaschine."], image: "/images/products/ecotech-airport-kehrmaschine-asw-nur-fuer-flughaefen/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/DSC_4994-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-airport-kehrmaschine-asw-nur-fuer-flughaefen/" },
    { slug: "ecotech-kehrsprueheinheit-kse", category: "Kehrmaschinen", title: "Ecotech Kehrsprüheinheit KSE - gleichzeitig kehren und sprühen", shortDescription: "Die ecotech Kehrsprüheinheit KSE ist eine Kombination aus Kehrmaschine und IceFighter®-Solesprüher und erledigt zwei Tätigkeiten in nur einem Arbeitsschritt", longDescription: ["Die ecotech Kehrsprüheinheit KSE ist eine Kombination aus Kehrmaschine und IceFighter®-Solesprüher und erledigt zwei Tätigkeiten in nur einem Arbeitsschritt"], image: "/images/products/ecotech-kehrsprueheinheit-kse/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/Eco-KSE-min-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-kehrsprueheinheit-kse/" },
    { slug: "ecotech-frontmaehwerk-mf", category: "Mähwerke", title: "Ecotech Frontmähwerk MF - zum Mähen, Mulchen und mit Heckauswurf", shortDescription: "Das ecotech Frontmähwerk MF hat ein robustes Stahlgehäuse und eignet sich zum Mähen,Mulchen und verfügt über einen Seitenauswurf oder optionalen Heckauswurf", longDescription: ["Das ecotech Frontmähwerk MF hat ein robustes Stahlgehäuse und eignet sich zum Mähen,Mulchen und verfügt über einen Seitenauswurf oder optionalen Heckauswurf"], image: "/images/products/ecotech-frontmaehwerk-mf/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Frontmaehwerk-MF-im-Einsatz-3.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-frontmaehwerk-mf/" },
    { slug: "ecotech-multiwash-fronatwaschbalken", category: "Multiwash Frontwaschbalken", title: "Ecotech Multiwash Frontwaschbalken - zum Reinigen von Straßen", shortDescription: "Mit den ecotech Multiwash Frontwaschbalken werden Straßen und Flächen mit Wasser gereinigt.Die Waschbalken gibt es in Nieder- Mittel-und Hochdruckausführung", longDescription: ["Mit den ecotech Multiwash Frontwaschbalken werden Straßen und Flächen mit Wasser gereinigt.Die Waschbalken gibt es in Nieder- Mittel-und Hochdruckausführung"], image: "/images/products/ecotech-multiwash-fronatwaschbalken/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Frontwaschbalken-Steyr1-min-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-multiwash-fronatwaschbalken/" },
    { slug: "ecotech-multiwash-frontwaschbalken-fuer-unimog", category: "Multiwash Frontwaschbalken", title: "Ecotech Multiwash Frontwaschbalken für Unimog - zum Reinigen", shortDescription: "Der ecotech Multiwash Frontwaschbalken eignet sich für Reinigungsarbeiten mit dem Unimog. Er ist als Nieder- Mittel- oder Hochdruckausführung verfügbar.", longDescription: ["Der ecotech Multiwash Frontwaschbalken eignet sich für Reinigungsarbeiten mit dem Unimog. Er ist als Nieder- Mittel- oder Hochdruckausführung verfügbar."], image: "/images/products/ecotech-multiwash-frontwaschbalken-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/Ecotech-Multiwash-Frontwaschbalken-Anbaubeispiel-5-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-multiwash-frontwaschbalken-fuer-unimog/" },
    { slug: "ecotech-giessarm-ga3-2", category: "Multiwash Giessarme", title: "Ecotech Gießarm GA3 - für effizientes und wirtschaftliches Gießen", shortDescription: "Der ecotech Gießarm GA3 hat eine Reichweite von bis zu 6,3 m und ermöglicht mit praktischen Raffinessen effizientes Gießen", longDescription: ["Der ecotech Gießarm GA3 hat eine Reichweite von bis zu 6,3 m und ermöglicht mit praktischen Raffinessen effizientes Gießen"], image: "/images/products/ecotech-giessarm-ga3-2/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/07/Giessarm-GA3-min-2.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-giessarm-ga3-2/" },
    { slug: "ecotech-giessarm-ga4-5-6", category: "Multiwash Giessarme", title: "Ecotech Gießarm GA4/5/6 - für einfaches Gießen - bis zu 8,5 m Reichweite", shortDescription: "Der ecotech Gießarm GA4/5/6 ermöglicht effizientes Gießen mit einer Reichweite von bis zu 8,5 m. Bedienung über Fahrzeughydraulik, Bedienpult oder Joystick", longDescription: ["Der ecotech Gießarm GA4/5/6 ermöglicht effizientes Gießen mit einer Reichweite von bis zu 8,5 m. Bedienung über Fahrzeughydraulik, Bedienpult oder Joystick"], image: "/images/products/ecotech-giessarm-ga4-5-6/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Gießarm-GA4-6-2.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-giessarm-ga4-5-6/" },
    { slug: "ecotech-giessarm-ga4-5-6-fuer-unimog", category: "Multiwash Giessarme", title: "Ecotech Gießarm GA4/5/6 für Unimog - für effizientes Gießen", shortDescription: "Der ecotech Gießarm GA4/5/6 für Unimog hat eine max. Reichweite von 8,5 m und ermöglicht effizientes Gießen von Blumen, Bäumen usw.", longDescription: ["Der ecotech Gießarm GA4/5/6 für Unimog hat eine max. Reichweite von 8,5 m und ermöglicht effizientes Gießen von Blumen, Bäumen usw."], image: "/images/products/ecotech-giessarm-ga4-5-6-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/Ecotech-gießarm-G4-6-Unimog2.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-giessarm-ga4-5-6-fuer-unimog/" },
    { slug: "ecotech-multiwash-dreipunktanbau", category: "Multiwash Wassertanks", title: "Ecotech Multiwash Dreipunktanbau - der mobile Wassertank", shortDescription: "Der ecotech Multiwash Dreipunktanbau ist ein mobiler Wassertank zum Gießen, Waschen, Schwemmen und Hochdruckreinigen.Verfügbare Tankvolumen: 300-1.600 Liter", longDescription: ["Der ecotech Multiwash Dreipunktanbau ist ein mobiler Wassertank zum Gießen, Waschen, Schwemmen und Hochdruckreinigen.Verfügbare Tankvolumen: 300-1.600 Liter"], image: "/images/products/ecotech-multiwash-dreipunktanbau/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Multiwash-Dreipunktanbau-min-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-multiwash-dreipunktanbau/" },
    { slug: "ecotech-multiwash-pritschenaufbau", category: "Multiwash Wassertanks", title: "Ecotech Multiwash Pritschenaufbau - für Gieß- und Reinigungsarbeiten", shortDescription: "Der ecotech Multiwash Pritschenaufbau ist ein mobiles Wassertank-System, das individuell auf die Pritsche des Fahrzeuges angepasst wird. Zum Giessen und Reinigen.", longDescription: ["Der ecotech Multiwash Pritschenaufbau ist ein mobiles Wassertank-System, das individuell auf die Pritsche des Fahrzeuges angepasst wird. Zum Giessen und Reinigen."], image: "/images/products/ecotech-multiwash-pritschenaufbau/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Multiwash-Pritschenaufbau-Anbaubeispiel1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-multiwash-pritschenaufbau/" },
    { slug: "ecotech-multiwash-pritschenaufbau-fuer-unimog", category: "Multiwash Wassertanks", title: "Ecotech Multiwash Pritschenaufbau für Unimog - zum Gießen und Reinigen", shortDescription: "Der ecotech Multiwash Pritschenaufbau für den Unimog ist ein mobiles Wassertanksystem und eignet sich für Gieß- und Reinigungsarbeiten mit dem Unimog.", longDescription: ["Der ecotech Multiwash Pritschenaufbau für den Unimog ist ein mobiles Wassertanksystem und eignet sich für Gieß- und Reinigungsarbeiten mit dem Unimog."], image: "/images/products/ecotech-multiwash-pritschenaufbau-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/Ecotech-Multiwash-Pritschenaufbau-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-multiwash-pritschenaufbau-fuer-unimog/" },
    { slug: "ecotech-wassertank", category: "Multiwash Wassertanks", title: "Ecotech Wassertank - gemeinsam mit Kehrmaschinen zum Staubbinden", shortDescription: "Der ecotech Wassertank kann ideal mit Kehrmaschinen zum Binden von Staub kombiniert werden. Es sind sieben Behältergrößen von 200 - 1600 Litern verfügbar.", longDescription: ["Der ecotech Wassertank kann ideal mit Kehrmaschinen zum Binden von Staub kombiniert werden. Es sind sieben Behältergrößen von 200 - 1600 Litern verfügbar."], image: "/images/products/ecotech-wassertank/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Wassertank-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-wassertank/" },
    { slug: "ecotech-schneepflug-es0", category: "Schneepflüge", title: "Ecotech Schneepflug ES0 - mit 140 cm Pflugbreite für Kompakttraktoren", shortDescription: "Der ecotech Schneepflug ES0 bzw. das ecotech Schneeschild hat eine Pflugbreite von 140 cm und ist speziell für den Einsatz auf Kompakttraktoren gebaut.", longDescription: ["Der ecotech Schneepflug ES0 bzw. das ecotech Schneeschild hat eine Pflugbreite von 140 cm und ist speziell für den Einsatz auf Kompakttraktoren gebaut."], image: "/images/products/ecotech-schneepflug-es0/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Vorschaubild-Schneepflug-ES0-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-schneepflug-es0/" },
    { slug: "ecotech-schneepflug-ep01", category: "Schneepflüge", title: "Ecotech Schneepflug EP01 - das Schneeschild für den Kompakttraktor", shortDescription: "Der ecotech Schneepflug EP01 ist in Breiten von 125 - 180 cm erhältlich und kann auf Kompakttraktoren, UTV und Knicklenkern bis 1,5t betrieben werden.", longDescription: ["Der ecotech Schneepflug EP01 ist in Breiten von 125 - 180 cm erhältlich und kann auf Kompakttraktoren, UTV und Knicklenkern bis 1,5t betrieben werden."], image: "/images/products/ecotech-schneepflug-ep01/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Schneepflug-EP01-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-schneepflug-ep01/" },
    { slug: "ecotech-schneepflug-es2", category: "Schneepflüge", title: "Ecotech Schneepflug ES2 - das Schneeschild für den Kompakttraktor", shortDescription: "Der ecotech Schneepflug ES2 ist in vier unterschiedlichen Breiten von 125 - 160 cm erhältlich und eignet sich bestens für Kompakttraktoren und Knicklenker", longDescription: ["Der ecotech Schneepflug ES2 ist in vier unterschiedlichen Breiten von 125 - 160 cm erhältlich und eignet sich bestens für Kompakttraktoren und Knicklenker"], image: "/images/products/ecotech-schneepflug-es2/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Schneepflug-ES2-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-schneepflug-es2/" },
    { slug: "ecotech-schneepflug-epa3", category: "Schneepflüge", title: "Ecotech Schneepflug EPA3 - perfekt für alpine Schneeverhältnisse", shortDescription: "Der ecotech Schneepflug EPA3 ist das profi Schneeschild von Eco Technologies und wurde für alpine Schneeverhältnisse entwickelt. Pflugbreiten: 160 - 220 cm", longDescription: ["Der ecotech Schneepflug EPA3 ist das profi Schneeschild von Eco Technologies und wurde für alpine Schneeverhältnisse entwickelt. Pflugbreiten: 160 - 220 cm"], image: "/images/products/ecotech-schneepflug-epa3/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Schneepflug-EPA3-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-schneepflug-epa3/" },
    { slug: "ecotech-schneepflug-epk2", category: "Schneepflüge", title: "Ecotech Federklappenpflug EPK2 - für Trägerfahrzeuge bis max. 1240 kg", shortDescription: "Der ecotech Federklappenpflug EPK2 hat eine Pflughöhe von 55 cm und ist für Trägerfahrzeuge bis max. 1.240 kg gebaut. Beste Schneeräumung garantiert!", longDescription: ["Der ecotech Federklappenpflug EPK2 hat eine Pflughöhe von 55 cm und ist für Trägerfahrzeuge bis max. 1.240 kg gebaut. Beste Schneeräumung garantiert!"], image: "/images/products/ecotech-schneepflug-epk2/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Federklappenpflug-EPK2-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-schneepflug-epk2/" },
    { slug: "ecotech-federklappenpflug-epk3", category: "Schneepflüge", title: "Ecotech Federklappenpflug EPK3 - für Trägerfahrzeuge bis 1.750 kg", shortDescription: "Der ecotech Federklappenpflug EPK3 hat eine Pflughöhe von 65 cm und wird zum wirtschaftlichen Räumen von Straßen und Plätzen eingesetzt.", longDescription: ["Der ecotech Federklappenpflug EPK3 hat eine Pflughöhe von 65 cm und wird zum wirtschaftlichen Räumen von Straßen und Plätzen eingesetzt."], image: "/images/products/ecotech-federklappenpflug-epk3/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Federklappenpflug-EPK3-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-federklappenpflug-epk3/" },
    { slug: "ecotech-variopflug-epv3", category: "Schneepflüge", title: "Ecotech Variopflug EPV3 - mit zwei separat ansteuerbaren Pflughälften", shortDescription: "Der ecotech Variopflug EPV3 ist mit klappbarer Schürfleiste und zwei separat verstellbaren Pflughälften ausgestattet. Verfügbare Pflugbreiten:130,156,182 cm", longDescription: ["Der ecotech Variopflug EPV3 ist mit klappbarer Schürfleiste und zwei separat verstellbaren Pflughälften ausgestattet. Verfügbare Pflugbreiten:130,156,182 cm"], image: "/images/products/ecotech-variopflug-epv3/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Variopflug-EPV3-1-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-variopflug-epv3/" },
    { slug: "ecotech-variopflug-epv4", category: "Schneepflüge", title: "Ecotech Variopflug EPV4 - mit zwei separat steuerbaren Pflughälften", shortDescription: "Der ecotech Variopflug EPV4 besteht aus zwei Pflughälften und ist mit dem Eco-Federklappenmechanismus ausgestattet. Verfügbare Pflugbreiten:156, 182, 208 cm", longDescription: ["Der ecotech Variopflug EPV4 besteht aus zwei Pflughälften und ist mit dem Eco-Federklappenmechanismus ausgestattet. Verfügbare Pflugbreiten:156, 182, 208 cm"], image: "/images/products/ecotech-variopflug-epv4/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Variopflug-EPV4-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-variopflug-epv4/" },
    { slug: "ecotech-tellerstreuer-xtb", category: "Streuer", title: "Ecotech Tellerstreuer XTB - oder auch Schleuderstreuer genannt", shortDescription: "Der ecotech Tellerstreuer XTB wird auch Schleuderstreuer genannt und dient zum wirtschaftlichen Ausbringen von Streumaterial wie Salz und Splitt", longDescription: ["Der ecotech Tellerstreuer XTB wird auch Schleuderstreuer genannt und dient zum wirtschaftlichen Ausbringen von Streumaterial wie Salz und Splitt"], image: "/images/products/ecotech-tellerstreuer-xtb/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Vorschaubild-XTB-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-tellerstreuer-xtb/" },
    { slug: "ecotech-walzenstreuer-xga-xha", category: "Streuer", title: "Ecotech Walzenstreuer XGA/XHA - zum exakten Streuen", shortDescription: "Der ecotech Walzenstreuer XGA/XHA wurde zum exakten Streuen von Salz und Splitt entwickelt. Er ist in Größen von 170 - 400 Litern verfügbar.", longDescription: ["Der ecotech Walzenstreuer XGA/XHA wurde zum exakten Streuen von Salz und Splitt entwickelt. Er ist in Größen von 170 - 400 Litern verfügbar."], image: "/images/products/ecotech-walzenstreuer-xga-xha/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2021/06/XAG-XHA-auf-Iseki-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-walzenstreuer-xga-xha/" },
    { slug: "ecotech-walzenstreuer-xg-xh", category: "Streuer", title: "Ecotech Walzenstreuer XG/XH - zum exakten Streuen von Salz und Splitt", shortDescription: "Der ecotech Walzenstreuer XG/XH wurde zum exakten Streuen von Salz und Splitt entwickelt. Er ist in Behältergrößen von 170 - 400 Litern verfügbar.", longDescription: ["Der ecotech Walzenstreuer XG/XH wurde zum exakten Streuen von Salz und Splitt entwickelt. Er ist in Behältergrößen von 170 - 400 Litern verfügbar."], image: "/images/products/ecotech-walzenstreuer-xg-xh/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Walzenstreuer-XG-XH-2-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-walzenstreuer-xg-xh/" },
    { slug: "ecotech-selbstladestreuer-xl", category: "Streuer", title: "Ecotech Selbstladestreuer XL - für Kompakt- und große Traktoren", shortDescription: "Der ecotech Selbstladestreuer XL kann an kleinen und großen Traktoren betrieben werden und ermöglicht schnelles und eigenständiges Befüllen des Streuers.", longDescription: ["Der ecotech Selbstladestreuer XL kann an kleinen und großen Traktoren betrieben werden und ermöglicht schnelles und eigenständiges Befüllen des Streuers."], image: "/images/products/ecotech-selbstladestreuer-xl/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Selbstladestreuer-XL.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-selbstladestreuer-xl/" },
    { slug: "ecotech-selbstladestreuer-xlr", category: "Streuer", title: "Ecotech Selbstladestreuer XLR - zum Streuen mit Rad- und Hofladern", shortDescription: "Der ecotech Selbstladestreuer XLR wurde zum Streuen mit Rad- und Hofladern entwickelt. Er lässt sich rasch über die Schnellwechseleinrichtung aufnehmen.", longDescription: ["Der ecotech Selbstladestreuer XLR wurde zum Streuen mit Rad- und Hofladern entwickelt. Er lässt sich rasch über die Schnellwechseleinrichtung aufnehmen."], image: "/images/products/ecotech-selbstladestreuer-xlr/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Selbstladdestreuer-XLR-scaled.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-selbstladestreuer-xlr/" },
    { slug: "ecotech-wildkrautbuerste-wkt-7", category: "Wildkrautbürsten", title: "Ecotech Wildkrautbürste WKT-7 - für umweltfreundliche Unkrautbeseitigung", shortDescription: "Mit der ecotech Wildkrautbürste WKT-7 lässt sich Unkraut wirtschaftlich, effizient und vor allem umweltfreundlich, ohne Chemie beseitigen.", longDescription: ["Mit der ecotech Wildkrautbürste WKT-7 lässt sich Unkraut wirtschaftlich, effizient und vor allem umweltfreundlich, ohne Chemie beseitigen."], image: "/images/products/ecotech-wildkrautbuerste-wkt-7/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/WKT-7-John-Deere3045R-1.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-wildkrautbuerste-wkt-7/" },
    { slug: "ecotech-wildkrautbuerste-wkt-kommunal-pro", category: "Wildkrautbürsten", title: "Ecotech Wildkrautbürste WKT-Kommunal Pro - zur Unkrautbeseitigung", shortDescription: "Die ecotech Wildkrautbürste WKT-Kommunal Pro eignet sich zur wirtschaftlichen und umweltfreundlichen Beseitigung von Unkraut mit großen Trägerfahrzeugen", longDescription: ["Die ecotech Wildkrautbürste WKT-Kommunal Pro eignet sich zur wirtschaftlichen und umweltfreundlichen Beseitigung von Unkraut mit großen Trägerfahrzeugen"], image: "/images/products/ecotech-wildkrautbuerste-wkt-kommunal-pro/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-WildkrautbuersteKommunalPro2-min.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-wildkrautbuerste-wkt-kommunal-pro/" },
    { slug: "ecotech-wildkrautbuerste-wkt-kommunal-pro-fuer-unimog", category: "Wildkrautbürsten", title: "Ecotech Wildkrautbürste WKT-Kommunal Pro für Unimog", shortDescription: "Die ecotech Wildkrautbürste WKT-Kommunal Pro eignet sich zur wirtschaftlichen und umweltfreundlichen Unkrautbeseitigung mit dem Unimog.", longDescription: ["Die ecotech Wildkrautbürste WKT-Kommunal Pro eignet sich zur wirtschaftlichen und umweltfreundlichen Unkrautbeseitigung mit dem Unimog."], image: "/images/products/ecotech-wildkrautbuerste-wkt-kommunal-pro-fuer-unimog/main.webp", sourceImageUrl: "https://www.ecotech.at/wp-content/uploads/2019/11/WKT-KommunalProUnimog-min.jpg", externalUrl: "https://www.ecotech.at/produkt/ecotech-wildkrautbuerste-wkt-kommunal-pro-fuer-unimog/" },
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
  sectionTitle: 'Hangmäher, Geräteträger und Transporter',
  sectionLead:
    'Reform fertigt seit Jahrzehnten Spezialmaschinen für Berglandwirtschaft, Kommunalbetriebe und Transportlogistik — robust, präzise, vielseitig.',
  products: [
    // Hangmäher (Motech)
    { slug: 'reform-motech-cm818-d', category: 'Hangmäher', title: 'Reform Motech CM818-D', shortDescription: 'Schwerer Einachs-Motormäher mit Differential — robuste Hangmäh-Plattform für anspruchsvolle Steilflächen.', longDescription: ['Der Reform Motech CM818-D ist ein schwerer Einachs-Motormäher mit Differential.', 'Hangmähwerk mit grosser Bandbreite an Anbaugeräten — die Profi-Plattform für Steilflächen.'], image: '/images/products/reform-motech-cm818-d/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/8/c/csm_cm818d_50e6334bf8.jpg', externalUrl: 'https://www.reform.at/en/products/motech/cm818-d' },
    { slug: 'reform-motech-erm9041e', category: 'Hangmäher', title: 'Reform Motech eRM9041e', shortDescription: 'Vollelektrischer Einachs-Hangmäher — emissionsfrei, leise, wartungsarm.', longDescription: ['Der eRM9041e ist Reforms vollelektrischer Einachs-Hangmäher der neuen Generation.', 'Emissionsfrei, geräuscharm und wartungsarm — die Zukunft der Hangmähtechnik.'], image: '/images/products/reform-motech-erm9041e/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/b/3/csm_eRM9-with-sweeping-brush-new_4390a22bef.jpg', externalUrl: 'https://www.reform.at/en/products/motech/erm9041e' },
    // Geräteträger (Boki)
    { slug: 'reform-boki-h140', category: 'Geräteträger', title: 'Reform Boki H140', shortDescription: 'Kompakter Geräteträger (1,4 m Breite) mit Allradlenkung und 110–129 kW Diesel.', longDescription: ['Der Boki H140 ist ein kompakter Kommunal-Geräteträger mit 1,4 m Breite.', '110–129 kW Diesel, Allradlenkung und modulare Arbeitshydraulik — ganzjährig einsatzbereit.'], image: '/images/products/reform-boki-h140/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/7/4/csm_BOKI-H140-27_Pfad_b631c18281.jpg', externalUrl: 'https://www.reform.at/en/products/boki/boki-models/h140' },
    { slug: 'reform-boki-h170', category: 'Geräteträger', title: 'Reform Boki H170', shortDescription: 'Geräumiger Kommunal-Geräteträger (1,7 m Breite) mit zwei Radständen und 150–175 PS.', longDescription: ['Der Boki H170 ist ein geräumiger Kommunal-Geräteträger mit 1,7 m Breite.', 'Zwei Radstände, FPT-Dieselmotoren mit 150–175 PS und intuitive Joystick-Bedienung.'], image: '/images/products/reform-boki-h170/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/c/5/csm_Freisteller_BOKI_H170_Web_NEU_EN_breiter_9fad85d40d.jpg', externalUrl: 'https://www.reform.at/en/products/boki/boki-models/h170' },
    // Metrac
    { slug: 'reform-metrac-h75', category: 'Metrac', title: 'Reform Metrac H75', shortDescription: 'Vielseitiger Hang-Geräteträger mit 75-PS-Perkins, hydrostatischem Antrieb und 4-Radlenkung.', longDescription: ['Der Metrac H75 ist Reforms vielseitiger Hang-Geräteträger mit 75-PS-Perkins-Diesel.', 'Hydrostatischer Antrieb, 4-Radlenkung in 5 Modi und kraftvolle Front-/Heckhydraulik.'], image: '/images/products/reform-metrac-h75/main.webp', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/5/5/csm_MetracH75_WEB_04_0015f9eb61.jpg', externalUrl: 'https://www.reform.at/en/products/metrac/metrac-h75' },
    // Muli
    { slug: 'reform-muli-t7-x', category: 'Muli', title: 'Reform Muli T7 X', shortDescription: 'Kommunaltransporter mit 109 PS, Allradantrieb und niedrigem Schwerpunkt — ganzjährig einsatzbereit.', longDescription: ['Der Reform Muli T7 X ist ein professioneller Kommunal- und Bergtransporter.', '80 kW / 109 PS, robuste Geländegängigkeit, niedriger Schwerpunkt — vielseitig im ganzjährigen Einsatz.'], image: '/images/products/reform-muli-t7-x/main.webp', sourceImageUrl: 'https://reform.at/fileadmin/_processed_/0/0/csm_Reform-Muli-T7x-web_c1cf1a7565.jpg', externalUrl: 'https://www.reform.at/en/products/muli/muli-models/t7-x' },
  ],
}

const BAOLI: KommunalBrand = {
  brandSlug: 'baoli',
  brandName: 'Baoli',
  externalCtaLabel: 'Bei Baoli ansehen',
  homepageUrl: 'https://www.baoli-emea.ch/',
  carouselEyebrow: 'Baoli Material Handling',
  carouselHeading: 'Stapler und Lagertechnik',
  carouselAriaLabel: 'Baoli Modelle',
  sectionEyebrow: 'Baoli',
  sectionTitle: 'Stapler und Lagertechnik',
  sectionLead:
    'Baoli liefert robuste Gabelstapler und Lagertechnik mit ausgezeichnetem Preis-Leistungs-Verhältnis — Verbrennungsmotor, Elektro- und Lithium-Ionen-Varianten.',
  products: [
    { slug: 'baoli-kbd-15-20-kbg-15-20', title: 'Gabelstapler KBD/KBG 15-20', shortDescription: 'Vielseitige Stapler mit Verbrennungsmotor, 1,5–2,0 t Tragfähigkeit und robuster Konstruktion.', longDescription: ['Der KBD/KBG 15-20 ist Baolis robuster Verbrennungsmotor-Stapler.', '1,5–2,0 t Tragfähigkeit, hervorragende Stabilität für vielseitige Anwendungen.'], image: '/images/products/baoli-kbd-15-20-kbg-15-20/main.webp', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Internal_combustion_trucks/KBD_G_15-20/Baoli_Internal_Combustion_Truck_KBD_G_15-20__Header_1024x1024.jpg', externalUrl: 'https://www.baoli-emea.com/de-CH/gabelstapler/gabelstapler-mit-verbrennungsmotor/kbd-15-20-/-kbg-15-20' },
    { slug: 'baoli-kbe-25-35', title: 'Elektrogabelstapler KBE 25-35', shortDescription: 'Elektrostapler für Standardanwendungen — 2,5–3,5 t Traglast, optionale Lithium-Ionen-Batterien.', longDescription: ['Der KBE 25-35 ist Baolis Elektrostapler für Standardanwendungen.', '2,5–3,5 t Traglast, optionale Li-Ion-Batterien für längere Schichten.'], image: '/images/products/baoli-kbe-25-35/main.webp', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Electric_forklift_trucks/KBE_25-35/Baoli_Electric_Forklift_Truck_KBE_25-35_Header_1024x1024.png', externalUrl: 'https://www.baoli-emea.com/de-CH/gabelstapler/elektrogabelstapler/kbe-25-35-/-kbe-25-35li' },
    { slug: 'baoli-niederhubwagen', title: 'Niederhubwagen EP 20-111', shortDescription: 'Elektrischer Niederhubwagen mit 2.000 kg Tragfähigkeit für mittlere und lange Strecken.', longDescription: ['Der EP 20-111 ist Baolis Elektro-Niederhubwagen mit 2.000 kg Tragfähigkeit.', 'Speziell für Transporte auf mittleren und langen Strecken konzipiert.'], image: '/images/products/baoli-niederhubwagen/main.webp', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Pallet_trucks/EP_20-111/Baoli_Pallet_Truck_EP_20-111_Header_1024x1024.jpg', externalUrl: 'https://www.baoli-emea.com/de-CH/gabelstapler/niederhubwagen/ep-20-111-/-ep-20-111li' },
    { slug: 'baoli-kbs-12', title: 'Hochhubwagen KBS 12', shortDescription: 'Einstiegs-Hochhubwagen mit 1,2 t Tragfähigkeit und bis 3.600 mm Hubhöhe.', longDescription: ['Der KBS 12 ist das Einstiegsmodell der elektrischen Hochhubwagen.', '1,2 t Tragfähigkeit, bis 3.600 mm Hubhöhe — ideal für kleine bis mittelgrosse Lager.'], image: '/images/products/baoli-kbs-12/main.webp', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Pallet_stackers/KBS-I-M_12/Baoli_Pallet_Stacker_KBS_12_Header_1024x1024.png', externalUrl: 'https://www.baoli-emea.com/de-CH/gabelstapler/hochhubwagen/kbs-12-/-kbsi-12-/-kbsm-12' },
    { slug: 'baoli-multifunktionsfahrzeug', title: 'Multifunktionsfahrzeug KBO 01L', shortDescription: 'Neues Multifunktionsfahrzeug mit Greifhöhe bis 5 m für Kommissionierung und Plattformarbeiten.', longDescription: ['Der KBO 01L ist ein Multifunktionsfahrzeug mit intuitiver Bedienung.', 'Greifhöhe bis 5,0 m für Kommissionierung und Plattformarbeiten bis 3,0 m.'], image: '/images/products/baoli-multifunktionsfahrzeug/main.webp', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Multifunction_Vehicle/KBO_01L/_Produktdetail_Hero_1024x1024.jpg', externalUrl: 'https://www.baoli-emea.com/de-CH/gabelstapler/multifunktionsfahrzeuge/kbo-01l' },
  ],
}

const MULCHY: KommunalBrand = {
  brandSlug: 'mulchy',
  brandName: 'Mulchy',
  externalCtaLabel: 'Bei Silent AG ansehen',
  homepageUrl: 'https://www.silentag.ch/',
  carouselEyebrow: 'Mulchy Mulchtechnik',
  carouselHeading: 'Mulch- und Mähtechnik für Profis',
  carouselAriaLabel: 'Mulchy Modelle',
  sectionEyebrow: 'Mulchy',
  sectionTitle: 'Mulch- und Mähtechnik',
  sectionLead:
    'Schweizer Profi-Mulcher für Landwirtschaft, Park- und Anlagenpflege — vielseitige Schlegel-, Sichel- und Böschungsmäher (vertrieben über Silent AG).',
  products: [
    { slug: 'mulchy-weidemulcher', title: 'Mulchy Weidemulcher', shortDescription: 'Schlegelmulcher mit über 100 Modellen und Arbeitsbreiten bis 250 cm — die Profi-Lösung seit den 1970er Jahren.', longDescription: ['Der Mulchy Weidemulcher ist ein professioneller Schlegelmulcher seit den 1970er Jahren.', 'Über 100 Modelle und Arbeitsbreiten bis 250 cm für vielfältige Anforderungen.'], image: '/images/products/mulchy-weidemulcher/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Schlegelmulcher/Weidemulcher/SLIDE.jpg', externalUrl: 'https://www.silentag.ch/de/mulchy-weidenmulcher' },
    { slug: 'mulchy-landwirtschaft-schlegel', title: 'Mulchy Landwirtschafts-Schlegelmulcher', shortDescription: 'Etablierte Eigenmarke mit über 5.000 verkauften Geräten — 150–250 cm Arbeitsbreite.', longDescription: ['Mit über 5.000 verkauften Geräten in 40 Jahren etabliert.', 'Modelle von 150 bis 250 cm Arbeitsbreite mit verschiedenen Werkzeugvarianten.'], image: '/images/products/mulchy-landwirtschaft-schlegel/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Schlegelmulcher/Schlegelmulcher_Landwirtschaft/SLIDE.jpg', externalUrl: 'https://www.silentag.ch/de/mulchy-landwirtschafts-schlegelmulcher' },
    { slug: 'mulchy-sichelmulcher-vario', title: 'Mulchy Sichelmulcher VARIO', shortDescription: 'Vielseitiges Mulchgerät mit stufenlos hydraulisch eingestellter Arbeitsbreite.', longDescription: ['Der Mulchy Vario ist ein vielseitiges Mulchgerät mit stufenlos einstellbarer Arbeitsbreite.', 'Zwei gegenläufig drehende Messerkreisel für gleichmässiges Mulchen.'], image: '/images/products/mulchy-sichelmulcher-vario/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_Vario/SLIDE.JPG', externalUrl: 'https://www.silentag.ch/de/mulchy-sichelmulcher-vario' },
    { slug: 'mulchy-boeschungsmaeher-kompakt', title: 'Mulchy Böschungsmäher Kompakt', shortDescription: 'Front-Böschungsmäher mit klappbarem Auslegerarm — patentierte Schnellwechselplatten.', longDescription: ['Der Mulchy Kompakt ist ein Front-Böschungsmäher mit klappbarem Auslegerarm.', 'Optimale Sichtfreiheit bei Strassenfahrten und patentierte Schnellwechselplatten.'], image: '/images/products/mulchy-boeschungsmaeher-kompakt/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/Kompakt/SLIDE.jpg', externalUrl: 'https://www.silentag.ch/de/mulchy-boeschungsmaeher-kappbar' },
    { slug: 'mulchy-einachser-schlegel', title: 'Mulchy Einachser-Schlegelmulcher', shortDescription: 'Mulchgeräte für Einachser mit extremer Schnittleistung und Sicherheitsfeatures.', longDescription: ['Professionelle Mulchgeräte mit extremer Schnittleistung.', 'Sicherheitsfeatures wie Gerätebremse und ausgewuchtete Messerwelle.'], image: '/images/products/mulchy-einachser-schlegel/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Haus_und_Garten/WhatsApp_Image_2024-06-10_at_19.38.16_-_Kopie.jpeg', externalUrl: 'https://www.silentag.ch/de/mulchy-einachser-mulchgerate' },
    { slug: 'mulchy-ras-weidenmulcher', title: 'Mulchy RAS Weidenmulcher', shortDescription: 'Sichelmulcher mit drei Messern und höhenverstellbaren Laufrollen.', longDescription: ['Der Mulchy RAS ist ein Sichelmulcher mit drei Messern.', 'Höhenverstellbare Laufrollen für professionelle Anwendungen.'], image: '/images/products/mulchy-ras-weidenmulcher/main.webp', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Obst-und-Weinbau/RAS_Weidenmulcher/SLIDE.JPG', externalUrl: 'https://www.silentag.ch/de/mulchy-ras-weidenmulcher' },
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

export const KOMMUNAL_BRANDS: Record<string, KommunalBrand> = {
  alk: ALKE,
  kubota: KUBOTA,
  'gianni-ferrari': GIANNI_FERRARI,
  'ligier-professional': LIGIER,
  timan: TIMAN,
  matev: MATEV,
  ecotech: ECOTECH,
  envitec: ENVITEC,
  reform: REFORM,
  baoli: BAOLI,
  mulchy: MULCHY,
  springer: SPRINGER,
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

// ─── Zusätzliche Marken (Greentec mit Deep-Links, Stema/Zaugg/Hako-Spezialfall: Hako läuft separat) ─

const EXTRA_PRODUCT_URLS: Record<string, { url: string; label: string }> = {
  // Greentec — Profi-Astsägen / Mulcher
  'greentec-fox': { url: 'https://greentec.eu/de/produkt/fox/', label: 'Bei Greentec ansehen' },
  'greentec-puma-2303': { url: 'https://greentec.eu/de/produkt/puma-2303/', label: 'Bei Greentec ansehen' },
  'greentec-scorpion-330-plus': { url: 'https://greentec.eu/de/produkt/scorpion-330-plus/', label: 'Bei Greentec ansehen' },
  'greentec-scorpion-430-plus-basic-front': { url: 'https://greentec.eu/de/produkt/scorpion-430-plus/', label: 'Bei Greentec ansehen' },
  'greentec-scorpion-490-plus': { url: 'https://greentec.eu/de/produkt/scorpion-490-plus/', label: 'Bei Greentec ansehen' },
  'greentec-scorpion-630-plus': { url: 'https://greentec.eu/de/produkt/scorpion-630-plus/', label: 'Bei Greentec ansehen' },
  'greentec-spider-620-plus': { url: 'https://greentec.eu/de/produkt/spider-620-plus/', label: 'Bei Greentec ansehen' },
}

const EXTRA_BRAND_HOMEPAGES: Array<{ slug: string; homepage: string; label: string; brandName: string }> = [
  { slug: 'greentec', homepage: 'https://greentec.eu/de/', label: 'Bei Greentec ansehen', brandName: 'Greentec' },
  { slug: 'stema', homepage: 'https://www.stema.ch/', label: 'Bei Stema ansehen', brandName: 'Stema' },
  { slug: 'zaugg', homepage: 'https://www.zaugg.swiss/', label: 'Bei Zaugg ansehen', brandName: 'Zaugg' },
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

const KOMMUNAL_CONTACT_EMAIL = 'michael.peter@ernst-moser.ch'

export function getKommunalAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  const ref = PRODUCT_INDEX[productSlug]
  let brandName: string | null = null
  if (ref) {
    brandName = ref.brand.brandName
  } else {
    const fallback = findExtraBrandFallback(productSlug)
    if (fallback) brandName = fallback.brandName
    else if (EXTRA_PRODUCT_URLS[productSlug]) brandName = 'Greentec'
  }
  if (!brandName) return null
  const trimmed = productName.startsWith(brandName)
    ? productName
    : `${brandName} ${productName}`
  const subject = `Anfrage ${trimmed}`
  return `mailto:${KOMMUNAL_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
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
    makeSlide(ALKE, ALKE.products[0], 'ATX 340E', [
      { icon: Truck, value: '1.630 kg', label: 'Traglast' },
      { icon: Package, value: '4.500 kg', label: 'Anhängelast' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Industrieklasse' },
    ]),
    makeSlide(ALKE, ALKE.products[1], 'ATX 440S', [
      { icon: Wind, value: '148 cm', label: 'Schmalste Variante' },
      { icon: Gauge, value: '3 m', label: 'Wendekreis' },
      { icon: Zap, value: 'Strassenzulassung', label: 'Kategorie N1' },
    ]),
    makeSlide(ALKE, ALKE.products[2], 'ATX 440M', [
      { icon: Truck, value: '1.540 kg', label: 'Traglast' },
      { icon: Package, value: '5.000 kg', label: 'Anhängelast' },
      { icon: Gauge, value: '200 cm', label: 'Ladefläche' },
    ]),
    makeSlide(ALKE, ALKE.products[3], 'ATX 480 4x4', [
      { icon: Mountain, value: '40 %', label: 'Steigfähigkeit' },
      { icon: Truck, value: '4WD', label: 'Allradantrieb' },
      { icon: Zap, value: 'Vollelektrisch', label: 'Emissionsfrei' },
    ]),
    makeSlide(ALKE, ALKE.products[4], 'ATX ED', [
      { icon: Truck, value: '4 Sitzplätze', label: 'Doppelkabine' },
      { icon: Package, value: '1.450 kg', label: 'Traglast' },
      { icon: Zap, value: 'Strassenzulassung', label: 'EU-konform' },
    ]),
  ],
  kubota: KUBOTA.products.map((p) => {
    const cat = p.title.replace('Kubota ', '')
    return makeSlide(KUBOTA, p, cat, [
      { icon: Settings, value: 'Diesel', label: 'Robust & langlebig' },
      { icon: Gauge, value: 'HST', label: 'Stufenloses Getriebe' },
      { icon: Sparkles, value: 'Profi-Klasse', label: 'Tägliche Belastung' },
    ])
  }),
  'gianni-ferrari': GIANNI_FERRARI.products.map((p) => {
    const cat = p.title.replace(' / PG XPRO', '').replace(' Frontmäher', '').replace(' (Elektro)', '')
    return makeSlide(GIANNI_FERRARI, p, cat, [
      { icon: Settings, value: 'Italienisch', label: 'Premium-Qualität' },
      { icon: Gauge, value: 'Multifunktion', label: 'Anbaugeräte verfügbar' },
      { icon: Recycle, value: 'Profi', label: 'Anlagen- und Sportplatzpflege' },
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
  matev: MATEV.products.map((p) => {
    const title = p.title.replace('Matev ', '')
    const cat = title.split(' ')[0]
    return makeSlide(MATEV, p, cat, [
      { icon: Wrench, value: 'Anbaugerät', label: 'Für Kompakttraktoren' },
      { icon: Settings, value: 'Profi-Klasse', label: 'Werkhof-tauglich' },
      { icon: Hammer, value: 'Robust', label: 'Lange Lebensdauer' },
    ])
  }),
  ecotech: ECOTECH.products.map((p) => {
    const cat = p.title.replace('Ecotech ', '').split(' ')[0]
    return makeSlide(ECOTECH, p, cat, [
      { icon: Recycle, value: 'Spezialgerät', label: 'Reinigung & Winterdienst' },
      { icon: Snowflake, value: 'Österreich', label: 'Lebring' },
      { icon: Settings, value: 'Profi-Klasse', label: 'Kommunal-Einsatz' },
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
    return makeSlide(BAOLI, p, 'Baoli', [
      { icon: Truck, value: 'Material Handling', label: 'Stapler & Lager' },
      { icon: Settings, value: 'Profi-Klasse', label: 'Robuste Bauweise' },
      { icon: Gauge, value: 'P/L-Verhältnis', label: 'Ausgezeichnet' },
    ])
  }),
  mulchy: MULCHY.products.map((p) => {
    return makeSlide(MULCHY, p, 'Mulchy', [
      { icon: Leaf, value: 'Mulch & Mäh', label: 'Profi-Technik' },
      { icon: Settings, value: 'Schweiz', label: 'Silent AG' },
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
