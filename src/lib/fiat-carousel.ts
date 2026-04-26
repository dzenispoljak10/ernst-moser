import { Package, Gauge, Zap, Truck, Ruler, Users } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'

export const FIAT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'fiat-ducato',
    category: 'Ducato',
    title: 'Ducato',
    description:
      'Das bewährte Transporter-Flaggschiff für Profis – in zahlreichen Varianten als Kastenwagen, Kombi, Panorama oder Chassis. Robust, vielseitig und seit Jahrzehnten Marktführer.',
    image: '/images/products/fiat-ducato/main.webp',
    imageAlt: 'Fiat Ducato',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-ducato',
    specs: [
      { icon: Package, value: 'Bis 17 m³', label: 'Ladevolumen' },
      { icon: Truck, value: 'Vielseitig', label: 'Kasten, Kombi, Chassis' },
      { icon: Gauge, value: 'Euro 6d', label: 'Effiziente Diesel-Motoren' },
    ],
  },
  {
    slug: 'fiat-e-ducato',
    category: 'Ducato',
    title: 'E-Ducato',
    description:
      'Der vollelektrische Fiat E-Ducato kombiniert das bewährte Ducato-Konzept mit emissionsfreiem Antrieb. Bis zu 320 km Reichweite und 1.375 kg Nutzlast – ideal für den urbanen Lieferverkehr.',
    image: '/images/products/fiat-e-ducato/main.webp',
    imageAlt: 'Fiat E-Ducato',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-e-ducato',
    specs: [
      { icon: Zap, value: 'Bis 320 km', label: 'Elektrische Reichweite' },
      { icon: Package, value: '1.375 kg', label: 'Volle Nutzlast' },
      { icon: Gauge, value: '79 kWh', label: 'Batteriekapazität' },
    ],
  },
  {
    slug: 'fiat-scudo',
    category: 'Scudo',
    title: 'Scudo',
    description:
      'Der kompakte Transporter mit viel Ladevolumen, wendigem Handling und modernem Arbeitsplatz-Komfort. Die ideale Mittelklasse für Handwerk, Service und urbane Logistik.',
    image: '/images/products/fiat-scudo/main.webp',
    imageAlt: 'Fiat Scudo',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-scudo',
    specs: [
      { icon: Package, value: 'Bis 6,6 m³', label: 'Ladevolumen' },
      { icon: Ruler, value: 'Kompakt', label: 'Wendig in der Stadt' },
      { icon: Gauge, value: 'Euro 6d', label: 'Sparsame Motorisierung' },
    ],
  },
  {
    slug: 'fiat-e-scudo',
    category: 'Scudo',
    title: 'E-Scudo',
    description:
      '100 % elektrisch, 100 % Scudo. Ideal für City-Logistik und emissionsfreies Arbeiten im urbanen Raum. Volle Funktionalität ohne Kompromisse beim Ladevolumen.',
    image: '/images/products/fiat-e-scudo/main.webp',
    imageAlt: 'Fiat E-Scudo',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-e-scudo',
    specs: [
      { icon: Zap, value: 'Bis 330 km', label: 'Elektrische Reichweite' },
      { icon: Package, value: 'Bis 6,6 m³', label: 'Volles Ladevolumen' },
      { icon: Gauge, value: '75 kWh', label: 'Schnellladefähig' },
    ],
  },
  {
    slug: 'fiat-dobl',
    category: 'Doblò',
    title: 'Doblò',
    description:
      'Der vielseitige Hochdach-Kombi für Gewerbe und Familien mit großzügigem Ladevolumen. Praktischer Alleskönner für kleine bis mittlere Transportaufgaben.',
    image: '/images/products/fiat-dobl/main.webp',
    imageAlt: 'Fiat Doblò',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-dobl',
    specs: [
      { icon: Package, value: 'Bis 4,4 m³', label: 'Ladevolumen' },
      { icon: Ruler, value: 'Kompakt', label: 'Hochdach-Konzept' },
      { icon: Gauge, value: 'Euro 6d', label: 'Diesel & Benzin' },
    ],
  },
  {
    slug: 'fiat-e-dobl',
    category: 'Doblò',
    title: 'E-Doblò',
    description:
      'Der vollelektrische Fiat E-Doblò ist die umweltfreundliche Antwort auf moderne Transportbedürfnisse in der Stadt. Kompakt, leise und lokal emissionsfrei.',
    image: '/images/products/fiat-e-dobl/main.webp',
    imageAlt: 'Fiat E-Doblò',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-e-dobl',
    specs: [
      { icon: Zap, value: 'Bis 280 km', label: 'Elektrische Reichweite' },
      { icon: Package, value: 'Bis 4,4 m³', label: 'Volles Volumen' },
      { icon: Gauge, value: '50 kWh', label: 'Batteriekapazität' },
    ],
  },
  {
    slug: 'fiat-ulysse',
    category: 'Ulysse',
    title: 'Ulysse',
    description:
      'Der 8-plätzige Personentransporter für Shuttle-Services, VIP-Transport und große Familien. Komfortables Reisen mit Stil und Variabilität.',
    image: '/images/products/fiat-ulysse/main.webp',
    imageAlt: 'Fiat Ulysse',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-ulysse',
    specs: [
      { icon: Users, value: '8 Plätze', label: 'Personentransport' },
      { icon: Package, value: 'Variabel', label: 'Flexibles Sitzkonzept' },
      { icon: Gauge, value: 'Euro 6d', label: 'Diesel-Effizienz' },
    ],
  },
  {
    slug: 'fiat-e-ulysse',
    category: 'Ulysse',
    title: 'E-Ulysse',
    description:
      'Der Fiat E-Ulysse bringt elektrische Mobilität in den Personentransport. Lokal emissionsfrei, leise und komfortabel – ideal für nachhaltige Shuttle-Konzepte.',
    image: '/images/products/fiat-e-ulysse/main.webp',
    imageAlt: 'Fiat E-Ulysse',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-e-ulysse',
    specs: [
      { icon: Zap, value: 'Bis 330 km', label: 'Elektrische Reichweite' },
      { icon: Users, value: '8 Plätze', label: 'Emissionsfrei reisen' },
      { icon: Gauge, value: '75 kWh', label: 'Batteriekapazität' },
    ],
  },
  {
    slug: 'fiat-ducato-chassis',
    category: 'Ducato',
    title: 'Ducato Chassis Cab & Pickup',
    description:
      'Die flexible Basis für Aufbauten, Kipper, Kofferaufbauten und individuelle Nutzfahrzeuglösungen. Das Ducato-Chassis als Plattform für maßgeschneiderte Aufbauten.',
    image: '/images/products/fiat-ducato-chassis/main.webp',
    imageAlt: 'Fiat Ducato Chassis Cab & Pickup',
    detailUrl: '/nutzfahrzeugcenter/fiat/fiat-ducato-chassis',
    specs: [
      { icon: Truck, value: 'Chassis & Pickup', label: 'Aufbau-fähig' },
      { icon: Package, value: 'Individuell', label: 'Kipper, Koffer, Pritsche' },
      { icon: Gauge, value: 'Bis 4.250 kg', label: 'Zulässiges Gesamtgewicht' },
    ],
  },
]
