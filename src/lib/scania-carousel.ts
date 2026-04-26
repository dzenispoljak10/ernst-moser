import { Truck, Gauge, Zap, Package, Mountain, Award, Users, Flame, Wind, Layers } from 'lucide-react'
import type { CarouselSlide } from './piaggio-carousel'

export const SCANIA_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    slug: 'scania-l-baureihe',
    category: 'L-Baureihe',
    title: 'L-Baureihe',
    description:
      'Niedrige Einstiegshöhe, beste Sicht und kompakte Maße – die L-Baureihe ist die Wahl für urbane Verteilung, Müllabfuhr und Kommunaldienste mit häufigen Stopps.',
    image: '/images/products/scania-l-baureihe/main.webp',
    imageAlt: 'Scania L-Baureihe',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-l-baureihe',
    specs: [
      { icon: Users, value: 'Niedriger Einstieg', label: 'Stadtverkehr & Verteilung' },
      { icon: Wind, value: 'Beste Sicht', label: 'Großzügige Glasfläche' },
      { icon: Truck, value: 'Kompakt', label: 'Wendig in engen Gassen' },
    ],
  },
  {
    slug: 'scania-p-baureihe',
    category: 'P-Baureihe',
    title: 'P-Baureihe',
    description:
      'Vielseitiger Allrounder vom Stadtverkehr bis zum Bauverkehr. Drei Fahrerhausvarianten und zahllose Achsanordnungen passen die P-Baureihe präzise an Ihre Aufgabe an.',
    image: '/images/products/scania-p-baureihe/main.webp',
    imageAlt: 'Scania P-Baureihe',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-p-baureihe',
    specs: [
      { icon: Layers, value: '3 Kabinen', label: 'Day, Sleeper, CrewCab' },
      { icon: Truck, value: 'Vielseitig', label: 'Verteiler bis Bauverkehr' },
      { icon: Gauge, value: 'Euro 6', label: 'Effiziente Reihensechszylinder' },
    ],
  },
  {
    slug: 'scania-g-baureihe',
    category: 'G-Baureihe',
    title: 'G-Baureihe',
    description:
      'Komfort trifft Eleganz: großzügiges Fahrerhaus mit umfangreichem Stauraum für Fahrer, die viel unterwegs sind. Das ideale Allroundtalent für mittelschwere Anwendungen.',
    image: '/images/products/scania-g-baureihe/main.webp',
    imageAlt: 'Scania G-Baureihe',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-g-baureihe',
    specs: [
      { icon: Award, value: 'Komfort', label: 'Großzügiges Fahrerhaus' },
      { icon: Package, value: 'Stauraum', label: 'Schränke, Betten, Ablagen' },
      { icon: Truck, value: 'Allround', label: 'Verteiler, Bau, Fern' },
    ],
  },
  {
    slug: 'scania-r-baureihe',
    category: 'R-Baureihe',
    title: 'R-Baureihe',
    description:
      'Premium-Fernverkehr mit charakteristisch robustem Design. Mehrfacher „Truck of the Year“ und seit Jahrzehnten der Maßstab für effiziente, komfortable Langstrecken-Lkw.',
    image: '/images/products/scania-r-baureihe/main.webp',
    imageAlt: 'Scania R-Baureihe',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-r-baureihe',
    specs: [
      { icon: Award, value: 'Truck of the Year', label: 'Mehrfacher Award-Sieger' },
      { icon: Gauge, value: 'R6 oder V8', label: 'Bis 770 PS' },
      { icon: Truck, value: 'Fernverkehr', label: 'Premium-Langstrecke' },
    ],
  },
  {
    slug: 'scania-s-baureihe',
    category: 'S-Baureihe',
    title: 'S-Baureihe',
    description:
      'Flacher Kabinenboden, üppiger Stehraum, Premium-Innenausstattung – das Flaggschiff der Scania-Lkw-Familie. Für Speditionen, die Fahrer-Komfort als Wettbewerbsvorteil sehen.',
    image: '/images/products/scania-s-baureihe/main.webp',
    imageAlt: 'Scania S-Baureihe',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-s-baureihe',
    specs: [
      { icon: Award, value: 'Flat Floor', label: 'Stehbar, mobiles Zuhause' },
      { icon: Wind, value: 'Aerodynamik', label: 'Optimaler Verbrauch' },
      { icon: Users, value: 'Premium', label: 'Komfort als Vorteil' },
    ],
  },
  {
    slug: 'scania-xt',
    category: 'XT',
    title: 'XT — eXtra Tough',
    description:
      'Verstärkter Stoßfänger, robuster Unterfahrschutz, Stahl-Bullbar – die XT-Familie kombiniert Scania-Komfort mit echter Geländetauglichkeit für Bau, Forst und Steinbruch.',
    image: '/images/products/scania-xt/main.webp',
    imageAlt: 'Scania XT',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-xt',
    specs: [
      { icon: Mountain, value: 'eXtra Tough', label: 'Bau & Forst' },
      { icon: Truck, value: 'P/G/R/S', label: 'Auf vier Baureihen verfügbar' },
      { icon: Layers, value: 'Stahl-Bullbar', label: 'Robuste Frontpartie' },
    ],
  },
  {
    slug: 'scania-super',
    category: 'Super',
    title: 'Scania Super (V8)',
    description:
      'Hocheffizienz-Antriebsstrang mit überarbeitetem Motor und Overdrive-Getriebe. Wahlweise mit dem ikonischen Scania V8 (530–770 PS) für Schwerlast-Premium-Anwendungen.',
    image: '/images/products/scania-super/main.webp',
    imageAlt: 'Scania Super V8',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-super',
    specs: [
      { icon: Flame, value: 'V8', label: 'Bis 770 PS' },
      { icon: Gauge, value: '−8 % Verbrauch', label: 'Neuer Antriebsstrang' },
      { icon: Award, value: 'Premium', label: 'Ikonischer Sound' },
    ],
  },
  {
    slug: 'scania-batteriebetrieben',
    category: 'Elektro',
    title: 'Batteriebetrieben',
    description:
      'Vollelektrische Lkw von 4×2 Verteilerverkehr bis 6×2 Regional. Reichweiten bis 350 km, Megawatt-Schnellladung, lokal emissionsfrei – die nachhaltige Lkw-Lösung.',
    image: '/images/products/scania-batteriebetrieben/main.webp',
    imageAlt: 'Scania Batteriebetrieben',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-batteriebetrieben',
    specs: [
      { icon: Zap, value: 'Bis 350 km', label: 'Elektrische Reichweite' },
      { icon: Gauge, value: 'MW-Charging', label: 'Schnelles Nachladen' },
      { icon: Truck, value: '4×2 bis 6×2', label: 'Verteiler bis Regional' },
    ],
  },
  {
    slug: 'scania-gasmotor',
    category: 'Gas',
    title: 'Gasmotor',
    description:
      'CNG- und LNG-Lkw mit Reihensechszylinder. Reichweite bis 1.400 km mit LNG, deutlich reduzierte CO₂-Emissionen – mit Bio-Gas nahezu klimaneutral.',
    image: '/images/products/scania-gasmotor/main.webp',
    imageAlt: 'Scania Gasmotor',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-gasmotor',
    specs: [
      { icon: Flame, value: 'CNG / LNG', label: 'Erdgas oder Flüssigerdgas' },
      { icon: Truck, value: 'Bis 1.400 km', label: 'Reichweite mit LNG' },
      { icon: Wind, value: 'Bio-Gas-fähig', label: 'Nahezu klimaneutral' },
    ],
  },
  {
    slug: 'scania-schwerlastzugmaschine',
    category: 'Schwerlast',
    title: 'Schwerlastzugmaschine',
    description:
      'Konfigurierte Sondertransport-Lkw bis 250 t Gesamtzuggewicht und mehr. Verstärkte Rahmen, zusätzliche Achsen, V8-Antriebsstrang und Allrad – für Schwerstes.',
    image: '/images/products/scania-schwerlastzugmaschine/main.webp',
    imageAlt: 'Scania Schwerlastzugmaschine',
    detailUrl: '/nutzfahrzeugcenter/scania/scania-schwerlastzugmaschine',
    specs: [
      { icon: Mountain, value: 'Bis 250 t+', label: 'Gesamtzuggewicht' },
      { icon: Flame, value: 'V8-Power', label: 'Drehmoment-Spitze' },
      { icon: Layers, value: 'Verstärkter Rahmen', label: 'Mehr Achsen, Allrad' },
    ],
  },
]
