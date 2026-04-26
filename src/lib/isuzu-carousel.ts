import { Package, Gauge, Mountain, Users, Truck, IdCard, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface CarouselSpec {
  icon: LucideIcon
  value: string
  label: string
}

export interface CarouselSlide {
  slug: string
  category: string
  title: string
  description: string
  image: string
  imageAlt: string
  detailUrl: string
  specs: [CarouselSpec, CarouselSpec, CarouselSpec]
}

export const ISUZU_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'd-max-single',
    category: 'D-Max',
    title: 'D-Max Single',
    description:
      'Maximale Ladefläche für Gewerbe, Bau und Landwirtschaft. Die kompakte Einzelkabine mit dem kraftvollen 1.9 DDi Bi-Turbo-Diesel. Permanenter 4×4-Antrieb serienmässig für jedes Gelände.',
    image: '/images/isuzu/d-max-single.webp',
    imageAlt: 'Isuzu D-Max Single Cab',
    detailUrl: '/nutzfahrzeugcenter/isuzu/d-max/single',
    specs: [
      { icon: Package, value: 'bis 1’100 kg', label: 'Nutzlast' },
      { icon: Gauge, value: '163 PS', label: '1.9 DDi Bi-Turbo-Diesel' },
      { icon: Mountain, value: '4×4 permanent', label: 'Allradantrieb mit Untersetzung' },
    ],
  },
  {
    slug: 'd-max-space',
    category: 'D-Max',
    title: 'D-Max Space',
    description:
      'Die goldene Mitte zwischen Arbeitstier und Alltagsfahrzeug. Erweiterte Kabine mit Notsitzen hinten, volle Ladekapazität vorne. Ideal für Handwerksbetriebe mit gelegentlichem Zweitfahrer.',
    image: '/images/isuzu/d-max-space.webp',
    imageAlt: 'Isuzu D-Max Space Cab',
    detailUrl: '/nutzfahrzeugcenter/isuzu/d-max/space',
    specs: [
      { icon: Users, value: '2+2 Sitze', label: 'Extended Cab mit Notsitzen' },
      { icon: Gauge, value: '163 PS', label: '1.9 DDi Bi-Turbo-Diesel' },
      { icon: Truck, value: '3’500 kg', label: 'Anhängelast' },
    ],
  },
  {
    slug: 'd-max-crew',
    category: 'D-Max',
    title: 'D-Max Crew',
    description:
      'Vollwertige Doppelkabine mit fünf Sitzplätzen und separatem Ladebereich. Das ideale Fahrzeug für Teams, die Mannschaft und Material gemeinsam zur Einsatzstelle bringen müssen.',
    image: '/images/isuzu/d-max-crew.webp',
    imageAlt: 'Isuzu D-Max Crew Cab',
    detailUrl: '/nutzfahrzeugcenter/isuzu/d-max/crew',
    specs: [
      { icon: Users, value: '5 Sitze', label: 'Doppelkabine' },
      { icon: Gauge, value: '163 PS', label: '1.9 DDi Bi-Turbo-Diesel' },
      { icon: Mountain, value: '4×4 permanent', label: '3’500 kg Anhängelast' },
    ],
  },
  {
    slug: 'truck-3-5-ton',
    category: 'Truck',
    title: '3.5 Tonnen Klasse',
    description:
      'Mit Führerausweis Kategorie B fahrbar. M21 und M27 bieten kompakte Wendigkeit für Stadtzentren und schwer zugängliche Gebiete. Ideal als Kipper, Kofferaufbau oder Pritsche für Handwerk und Transport.',
    image: '/images/isuzu/truck-3-5-ton.webp',
    imageAlt: 'Isuzu M21 3.5-Tonnen-Truck',
    detailUrl: '/nutzfahrzeugcenter/isuzu/truck/3-5-ton',
    specs: [
      { icon: IdCard, value: 'Kat. B', label: 'Mit PW-Ausweis fahrbar' },
      { icon: Gauge, value: '120 PS', label: 'Euro 6d Commonrail-Diesel' },
      { icon: Truck, value: '3’500 kg', label: 'Zulässiges Gesamtgewicht' },
    ],
  },
  {
    slug: 'truck-6-7-5-ton',
    category: 'Truck',
    title: '6 bis 7.5 Tonnen Klasse',
    description:
      'Die vielseitigen Mittelklasse-Trucks M29 und M30H. Wendekreis von nur 5.30 m trotz hoher Nutzlast. Verfügbar mit 150 PS (3.0 L) oder 190 PS (5.2 L) Turbodiesel, auf Wunsch als Single oder Crew Cab.',
    image: '/images/isuzu/truck-6-7-5-ton.webp',
    imageAlt: 'Isuzu M30 Crew Cab',
    detailUrl: '/nutzfahrzeugcenter/isuzu/truck/6-7-5-ton',
    specs: [
      { icon: Package, value: 'bis 3’600 kg', label: 'Nutzlast' },
      { icon: Gauge, value: '150 oder 190 PS', label: 'Euro 6d OBD-E' },
      { icon: Truck, value: '7’490 kg', label: 'Gesamtgewicht (M30H)' },
    ],
  },
  {
    slug: 'truck-10-14-ton',
    category: 'Truck',
    title: '10 bis 14 Tonnen Klasse',
    description:
      'Die Schwerlast-Trucks der F-Serie für maximale Nutzlast und härtesten Einsatz. Robust konstruiert für Bau, Logistik und Schwertransport. Verstärkte Kabine und variable Geometrie-Turbolader für optimale Effizienz unter Last.',
    image: '/images/isuzu/truck-10-14-ton.webp',
    imageAlt: 'Isuzu F10 Schwerlast-Truck',
    detailUrl: '/nutzfahrzeugcenter/isuzu/truck/10-14-ton',
    specs: [
      { icon: Package, value: 'bis 10 t', label: 'Nutzlast' },
      { icon: Gauge, value: 'F-Serie Euro 6d', label: 'Commonrail-Diesel' },
      { icon: Shield, value: 'Verstärkte Kabine', label: 'Sicherheit nach aktuellen Crashtests' },
    ],
  },
]
