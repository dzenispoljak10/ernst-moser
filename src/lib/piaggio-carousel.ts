import { Package, Gauge, Zap, Truck, Ruler, Shield } from 'lucide-react'
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

export const PIAGGIO_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'porter-np6-chassis-einzelbereifung',
    category: 'Porter NP6',
    title: 'Chassis Einzelbereifung',
    description:
      'Das bewährte Porter-Chassis mit Einzelbereifung – kompakte Abmessungen, hohe Wendigkeit, ideale Basis für individuelle Aufbauten. Long-Range CNG-Motorisierung mit niedrigem Verbrauch.',
    image: '/images/products/piaggio-porter-np6-chassis-einzelbereifung/main.webp',
    imageAlt: 'Piaggio Porter NP6 Chassis Einzelbereifung',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-np6-chassis-einzelbereifung',
    specs: [
      { icon: Gauge, value: 'CNG Long-Range', label: 'Niedriger Verbrauch, Euro 6d' },
      { icon: Ruler, value: 'Einzelbereifung', label: 'Kompakt, wendig' },
      { icon: Package, value: 'Aufbau-fähig', label: 'Basis für individuelle Karosserien' },
    ],
  },
  {
    slug: 'porter-np6-chassis-zwillingsbereifung',
    category: 'Porter NP6',
    title: 'Chassis Zwillingsbereifung',
    description:
      'Chassis mit doppelter Hinterachs-Bereifung für höhere Stabilität und zulässige Nutzlast. Erste Wahl für Kipper- und Kofferaufbauten mit schwerer Zuladung.',
    image: '/images/products/piaggio-porter-np6-chassis-zwillingsbereifung/main.webp',
    imageAlt: 'Piaggio Porter NP6 Chassis Zwillingsbereifung',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-np6-chassis-zwillingsbereifung',
    specs: [
      { icon: Truck, value: 'Zwillingsbereifung', label: 'Höhere Nutzlast, mehr Stabilität' },
      { icon: Gauge, value: 'CNG Long-Range', label: 'Euro 6d-Verbrennungsmotor' },
      { icon: Shield, value: 'Verstärkte Achse', label: 'Für harte Dauereinsätze' },
    ],
  },
  {
    slug: 'porter-npe-chassis-einzelbereifung',
    category: 'Porter NPE',
    title: 'NPE Chassis Einzelbereifung',
    description:
      'Der vollelektrische Porter NPE als Chassis – die emissionsfreie Basis für individuelle Aufbauten. Gleiche Abmessungen wie NP6, kombiniert mit ruhigem, drehmomentstarkem Elektroantrieb.',
    image: '/images/products/piaggio-porter-npe-chassis-einzelbereifung/main.webp',
    imageAlt: 'Piaggio Porter NPE Chassis Einzelbereifung',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-npe-chassis-einzelbereifung',
    specs: [
      { icon: Zap, value: 'Vollelektrisch', label: 'Lokal emissionsfrei' },
      { icon: Gauge, value: 'Hohes Drehmoment', label: 'Sofort verfügbar ab 0 U/min' },
      { icon: Package, value: 'Aufbau-fähig', label: 'Standard-Chassis-Interfaces' },
    ],
  },
  {
    slug: 'porter-npe-pritsche-einzelbereifung',
    category: 'Porter NPE',
    title: 'NPE Pritsche',
    description:
      'Offene Pritsche mit klappbaren Bordwänden auf dem elektrischen Porter-NPE-Chassis. Ideal für Gartenbau, Reinigung und Bauzulieferung mit schneller Beladung von oben.',
    image: '/images/products/piaggio-porter-npe-pritsche-einzelbereifung/main.webp',
    imageAlt: 'Piaggio Porter NPE Pritsche',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-npe-pritsche-einzelbereifung',
    specs: [
      { icon: Zap, value: 'Vollelektrisch', label: 'Flüsterleise, lokal emissionsfrei' },
      { icon: Package, value: 'Offene Pritsche', label: 'Beladung von oben und seitlich' },
      { icon: Ruler, value: 'Kompakte Masse', label: 'Zugänglich in Altstädten' },
    ],
  },
  {
    slug: 'porter-npe-heckkipper-einzelbereifung',
    category: 'Porter NPE',
    title: 'NPE Heckkipper',
    description:
      'Hydraulisch kippbare Ladefläche auf dem elektrischen Porter-Chassis. Schnelles Entleeren von Aushub, Grünschnitt und Baumaterial – komplett emissionsfrei auch beim Kipp-Vorgang.',
    image: '/images/products/piaggio-porter-npe-heckkipper-einzelbereifung/main.webp',
    imageAlt: 'Piaggio Porter NPE Heckkipper',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-npe-heckkipper-einzelbereifung',
    specs: [
      { icon: Zap, value: 'Elektro-Antrieb', label: 'Auch Hydraulik elektrisch' },
      { icon: Truck, value: 'Heckkipper', label: 'Hydraulisches Entleeren' },
      { icon: Shield, value: 'Werkhof-tauglich', label: 'Robust für Dauereinsatz' },
    ],
  },
  {
    slug: 'porter-npe-heckkipper-grasfanggitter',
    category: 'Porter NPE',
    title: 'NPE Heckkipper mit Grasfanggitter',
    description:
      'Heckkipper mit montiertem Fanggitter für leichtes Material – Rasenschnitt, Laub, kleines Schnittgut. Spezifisch für kommunale Grünpflege und Gartenbau-Unterhalt.',
    image: '/images/products/piaggio-porter-npe-heckkipper-grasfanggitter/main.webp',
    imageAlt: 'Piaggio Porter NPE Heckkipper mit Grasfanggitter',
    detailUrl: '/nutzfahrzeugcenter/piaggio/piaggio-porter-npe-heckkipper-grasfanggitter',
    specs: [
      { icon: Package, value: 'Fanggitter', label: 'Grösseres Volumen für Grünschnitt' },
      { icon: Zap, value: 'Elektro-Antrieb', label: 'Geräuscharm in Wohngebieten' },
      { icon: Truck, value: 'Kippfunktion', label: 'Hydraulisches Entleeren' },
    ],
  },
]
