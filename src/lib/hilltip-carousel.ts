import { Truck, Snowflake, Droplets, Navigation, Gauge } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'

export const HILLTIP_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'hilltip-pickups',
    category: 'bis 3,5 t',
    title: 'Pickups & Leichtfahrzeuge',
    description:
      'IceStriker™ Poly-Salzstreuer (550–1.250 Liter) und SnowStriker™ Schneepflüge für Pickups und leichte Transporter. 12 V/24 V Joystick, optional Vor-Befeuchtung.',
    image: '/images/products/hilltip-pickups/main.webp',
    imageAlt: 'Hilltip Pickup mit Streuer und Schneepflug',
    detailUrl: '/nutzfahrzeugcenter/hilltip/hilltip-pickups',
    specs: [
      { icon: Truck, value: 'bis 3,5 t', label: 'Pickup-Fahrzeugklasse' },
      { icon: Droplets, value: 'Poly-Streuer', label: '550 – 1.250 Liter' },
      { icon: Snowflake, value: 'SnowStriker™', label: 'Schneepflug-Option' },
    ],
  },
  {
    slug: 'hilltip-leichte-lkw',
    category: '3,5 – 7,5 t',
    title: 'Leichte LKW',
    description:
      'IceStriker™ Light Truck Salzstreuer 1.600–2.600 Liter mit modularer Förderung, Doppelmotor und optional kombinierter Salz-/Sprühbetrieb bis 900 Liter.',
    image: '/images/products/hilltip-leichte-lkw/main.webp',
    imageAlt: 'Hilltip Salzstreuer auf leichtem Lkw',
    detailUrl: '/nutzfahrzeugcenter/hilltip/hilltip-leichte-lkw',
    specs: [
      { icon: Truck, value: '3,5 – 7,5 t', label: 'Mittlere Fahrzeugklasse' },
      { icon: Gauge, value: '1.600 – 2.600 L', label: 'Streukapazität' },
      { icon: Droplets, value: 'Sprüh-Modul', label: 'bis 900 L' },
    ],
  },
  {
    slug: 'hilltip-schwere-lkw',
    category: '7,5 – 26 t',
    title: 'Schwere LKW',
    description:
      'IceStriker™ Truck (3.000–7.000 L) und LION Highway-Streuer (6.000–12.000 L) mit HTrack™ GPS, Doppelmotor und optionaler Sprühbalken-Architektur.',
    image: '/images/products/hilltip-schwere-lkw/main.webp',
    imageAlt: 'Hilltip Schwerlast-Streuer im Einsatz',
    detailUrl: '/nutzfahrzeugcenter/hilltip/hilltip-schwere-lkw',
    specs: [
      { icon: Truck, value: '7,5 – 26 t', label: 'Schwerlast-LKW' },
      { icon: Gauge, value: '3.000 – 12.000 L', label: 'IceStriker™ + LION' },
      { icon: Navigation, value: 'HTrack™ GPS', label: 'Routenüberwachung' },
    ],
  },
]
