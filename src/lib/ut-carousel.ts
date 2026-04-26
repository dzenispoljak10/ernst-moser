import { Truck, Package, Layers, Recycle, Hammer, Mountain, Gauge, Box, Wrench, Shield } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'

export const UT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'ut-gigant-12t-comfort',
    category: 'Absetzkipper',
    title: 'GIGANT 12T Comfort',
    description:
      'Der wendige Teleskop-Absetzkipper für leichte Transporte mit geringem Kilometerpreis. Ideal zum Stellen leerer Mulden und für leichte Wertstoffe.',
    image: '/images/products/ut-gigant-12t-comfort/main.webp',
    imageAlt: 'UT GIGANT 12T Comfort',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-gigant-12t-comfort',
    specs: [
      { icon: Truck, value: 'Teleskop', label: 'Wendig & kompakt' },
      { icon: Gauge, value: 'Niedriger km-Preis', label: 'Wirtschaftlich' },
      { icon: Recycle, value: 'Wertstoffe', label: 'Leerstellen leicht' },
    ],
  },
  {
    slug: 'ut-gigant-260t',
    category: 'Absetzkipper',
    title: 'GIGANT 260T',
    description:
      'Teleskop-Absetzkipper für dreiachsige Lkw – sicherer Transport schwer beladener Mulden mit patentierter FIX-Click Muldensicherung.',
    image: '/images/products/ut-gigant-260t/main.webp',
    imageAlt: 'UT GIGANT 260T',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-gigant-260t',
    specs: [
      { icon: Truck, value: '3-Achser', label: 'Schwerlast-Variante' },
      { icon: Shield, value: 'FIX-Click', label: 'Patentierte Sicherung' },
      { icon: Mountain, value: 'Volllast', label: 'Schwer beladene Mulden' },
    ],
  },
  {
    slug: 'ut-gigant-180k',
    category: 'Absetzkipper',
    title: 'GIGANT 180K',
    description:
      'Knickarm-Absetzkipper als Standardmodell für Baustellen und Entsorgungswirtschaft – bis 18.000 kg Hebekraft, robust und zuverlässig.',
    image: '/images/products/ut-gigant-180k/main.webp',
    imageAlt: 'UT GIGANT 180K',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-gigant-180k',
    specs: [
      { icon: Hammer, value: '18.000 kg', label: 'Hebekraft' },
      { icon: Truck, value: 'Knickarm', label: 'Vielseitige Einsätze' },
      { icon: Mountain, value: 'Bau & Entsorgung', label: 'Standardmodell' },
    ],
  },
  {
    slug: 'ut-gigant-180tk-flat',
    category: 'Absetzkipper',
    title: 'GIGANT 180T/K Flat',
    description:
      'Knickarm-Absetzkipper mit flacher Bauform – optimierte Aerodynamik und Ladungssicherheit für Verteilfahrzeuge mit Höhenrestriktionen.',
    image: '/images/products/ut-gigant-180tk-flat/main.webp',
    imageAlt: 'UT GIGANT 180T/K Flat',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-gigant-180tk-flat',
    specs: [
      { icon: Layers, value: 'Flat', label: 'Niedrige Aufbauhöhe' },
      { icon: Gauge, value: 'Aerodynamik', label: 'Optimierter Verbrauch' },
      { icon: Shield, value: 'Ladungssicher', label: 'Stabil & sicher' },
    ],
  },
  {
    slug: 'ut-saurier-26tr-avanti',
    category: 'Abrollkipper',
    title: 'SAURIER 26TR Avanti',
    description:
      'Robuster 26-Tonnen-Abrollkipper mit bis zu 30 % schnellerem Auf- und Abkippen – höhere Touren-Frequenz im Sammelbetrieb.',
    image: '/images/products/ut-saurier-26tr-avanti/main.webp',
    imageAlt: 'UT SAURIER 26TR Avanti',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-saurier-26tr-avanti',
    specs: [
      { icon: Hammer, value: '26 t', label: 'Hebekraft' },
      { icon: Gauge, value: '+30 % Speed', label: 'Schnelleres Kippen' },
      { icon: Truck, value: '4-Achser', label: 'Sammel- & Verteilbetrieb' },
    ],
  },
  {
    slug: 'ut-saurier-32tr-varitec',
    category: 'Abrollkipper',
    title: 'SAURIER 32TR Varitec',
    description:
      'Schwerlast-Abrollkipper als 5-Achser mit 32 Tonnen Hebekraft – maximale Transportkapazität für Steinbruch und Schwerschrott.',
    image: '/images/products/ut-saurier-32tr-varitec/main.webp',
    imageAlt: 'UT SAURIER 32TR Varitec',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-saurier-32tr-varitec',
    specs: [
      { icon: Hammer, value: '32 t', label: 'Hebekraft' },
      { icon: Mountain, value: '5-Achser', label: 'Schwerlast-Konfiguration' },
      { icon: Wrench, value: 'Industrie', label: 'Steinbruch & Schwerschrott' },
    ],
  },
  {
    slug: 'ut-normalmulde-no',
    category: 'Absetz-Mulde',
    title: 'Normalmulde (NO)',
    description:
      'Symmetrische Schiffchenmulde – formstabil, robust, vielseitig einsetzbar. Die Allzweck-Mulde für Recycling und Entsorgung.',
    image: '/images/products/ut-normalmulde-no/main.webp',
    imageAlt: 'UT Normalmulde NO',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-normalmulde-no',
    specs: [
      { icon: Box, value: 'Schiffchen', label: 'Symmetrische Form' },
      { icon: Shield, value: 'Formstabil', label: 'Robuste Kippfüsse' },
      { icon: Recycle, value: 'Allzweck', label: 'Recycling & Entsorgung' },
    ],
  },
  {
    slug: 'ut-schrottmulde-sr',
    category: 'Absetz-Mulde',
    title: 'Schrottmulde (SR)',
    description:
      'Spezialisierte Mulde für Schrotthandling – verstärkte Konstruktion, hohe Wandstärke, robuste Kippfüsse. Hält harten Recycling-Einsätzen stand.',
    image: '/images/products/ut-schrottmulde-sr/main.webp',
    imageAlt: 'UT Schrottmulde SR',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-schrottmulde-sr',
    specs: [
      { icon: Hammer, value: 'Verstärkt', label: 'Hohe Wandstärke' },
      { icon: Recycle, value: 'Schrott', label: 'Recycling-spezialisiert' },
      { icon: Shield, value: 'Robust', label: 'Harte Einsätze' },
    ],
  },
  {
    slug: 'ut-bauschuttmulde-br-bf',
    category: 'Absetz-Mulde',
    title: 'Bauschuttmulde (BR/BF)',
    description:
      'Robuste Mulde für Bauschutt- und Abbruchtransporte – erhöhte Tragfähigkeit, verschleissfeste Ausführung. Standard für Baustellen und Recyclinghöfe.',
    image: '/images/products/ut-bauschuttmulde-br-bf/main.webp',
    imageAlt: 'UT Bauschuttmulde BR/BF',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-bauschuttmulde-br-bf',
    specs: [
      { icon: Mountain, value: 'Hohe Tragkraft', label: 'Bauschutt & Abbruch' },
      { icon: Hammer, value: 'Verschleissfest', label: 'Lange Lebensdauer' },
      { icon: Wrench, value: 'Baustellen', label: 'Standard-Lösung' },
    ],
  },
  {
    slug: 'ut-abrollcontainer-klassisch',
    category: 'Abroll-Container',
    title: 'Abrollcontainer klassisch',
    description:
      'In drei Ausführungen (HEAVY, MEDIUM, LIGHT) erhältlich – das innovative UT-Tunnelprofil garantiert hohe Formstabilität.',
    image: '/images/products/ut-abrollcontainer-klassisch/main.webp',
    imageAlt: 'UT Abrollcontainer klassisch',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-abrollcontainer-klassisch',
    specs: [
      { icon: Layers, value: '3 Klassen', label: 'HEAVY / MEDIUM / LIGHT' },
      { icon: Shield, value: 'Tunnelprofil', label: 'UT-Innovation' },
      { icon: Recycle, value: 'Sekundärrohstoff', label: 'Vielseitig einsetzbar' },
    ],
  },
  {
    slug: 'ut-cobra-standard',
    category: 'Abroll-Container',
    title: 'COBRA Standard',
    description:
      'Standardcontainer mit hohem Nutzen – robuste Konstruktion und vielseitige Einsatzmöglichkeiten. Effizient für Abfallwirtschaft und Logistik.',
    image: '/images/products/ut-cobra-standard/main.webp',
    imageAlt: 'UT COBRA Standard',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-cobra-standard',
    specs: [
      { icon: Box, value: 'Standard', label: 'Hoher Nutzwert' },
      { icon: Recycle, value: 'Allround', label: 'Abfall & Logistik' },
      { icon: Shield, value: 'Robust', label: 'Bewährte Konstruktion' },
    ],
  },
  {
    slug: 'ut-orca-spantenlos',
    category: 'Abroll-Container',
    title: 'ORCA spantenlos',
    description:
      'Innovativ spantenlos konstruiert – glatte Innenwand, optimierter Platzbedarf und einfachere Reinigung für maximale Effizienz.',
    image: '/images/products/ut-orca-spantenlos/main.webp',
    imageAlt: 'UT ORCA spantenlos',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-orca-spantenlos',
    specs: [
      { icon: Box, value: 'Spantenlos', label: 'Glatte Innenwand' },
      { icon: Wrench, value: 'Reinigungsfreundlich', label: 'Wartungsarm' },
      { icon: Layers, value: 'Optimiert', label: 'Platzbedarf reduziert' },
    ],
  },
  {
    slug: 'ut-presscontainer-absetzkipper',
    category: 'Presscontainer',
    title: 'Presscontainer Absetzkipper',
    description:
      'Reduziert das Abfallvolumen um das 5- bis 10-fache – ideal für platzsparende Entsorgung auf kleineren Stellplätzen.',
    image: '/images/products/ut-presscontainer-absetzkipper/main.webp',
    imageAlt: 'UT Presscontainer für Absetzkipper',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-presscontainer-absetzkipper',
    specs: [
      { icon: Package, value: '−80–90 %', label: 'Volumen-Reduktion' },
      { icon: Recycle, value: 'Platzsparend', label: 'Kleine Stellplätze' },
      { icon: Gauge, value: 'Wirtschaftlich', label: 'Weniger Touren' },
    ],
  },
  {
    slug: 'ut-presscontainer-abrollkipper',
    category: 'Presscontainer',
    title: 'Presscontainer Abrollkipper',
    description:
      'Spezialisierter Presscontainer für Abrollkipper-Systeme – Volumen-Reduktion 5- bis 10-fach für effiziente Sammelfahrten.',
    image: '/images/products/ut-presscontainer-abrollkipper/main.webp',
    imageAlt: 'UT Presscontainer für Abrollkipper',
    detailUrl: '/nutzfahrzeugcenter/ut/ut-presscontainer-abrollkipper',
    specs: [
      { icon: Package, value: '−80–90 %', label: 'Volumen-Reduktion' },
      { icon: Truck, value: 'Abrollkipper', label: 'Systemkompatibel' },
      { icon: Recycle, value: 'Weniger CO₂', label: 'Effiziente Sammelfahrten' },
    ],
  },
]
