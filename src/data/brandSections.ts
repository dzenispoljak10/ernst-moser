// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrandFeature {
  icon?: string
  title: string
  text: string
}

export interface BrandStat {
  value: string
  label: string
  suffix?: string
}

export interface BrandMilestone {
  year: string
  text: string
}

export interface BrandAward {
  name: string
  year: string
  org: string
}

// Innovation / Neuheiten: image split + feature list
export interface InnovationSection {
  type: 'innovation'
  badge?: string
  headline: string
  subline?: string
  body: string
  image?: string
  imageAlt?: string
  imageRight?: boolean   // false = image left (default), true = image right
  features: BrandFeature[]
}

// Tech Deep Dive: dark panel with specs grid
export interface TechSection {
  type: 'tech'
  badge?: string
  headline: string
  subline?: string
  body: string
  image?: string
  imageAlt?: string
  specs: { label: string; value: string }[]
  features?: BrandFeature[]
}

// Heritage / Geschichte: horizontal milestone timeline
export interface HeritageSection {
  type: 'heritage'
  badge?: string
  headline: string
  body: string
  image?: string
  imageAlt?: string
  milestones: BrandMilestone[]
}

// Sustainability / Nachhaltigkeit: stat counters + image
export interface SustainabilitySection {
  type: 'sustainability'
  badge?: string
  headline: string
  body: string
  image?: string
  imageAlt?: string
  stats: BrandStat[]
  features?: BrandFeature[]
}

// YouTube Video embed
export interface VideoSection {
  type: 'video'
  badge?: string
  headline: string
  body?: string
  videoId: string
  features?: BrandFeature[]
}

// Awards: badge cards
export interface AwardsSection {
  type: 'awards'
  badge?: string
  headline: string
  body?: string
  awards: BrandAward[]
}

export type BrandSection =
  | InnovationSection
  | TechSection
  | HeritageSection
  | SustainabilitySection
  | VideoSection
  | AwardsSection

// ─── Brand Data ───────────────────────────────────────────────────────────────
// Keys = brand slug (exact Sanity slug)

export const BRAND_EXTRA_SECTIONS: Record<string, BrandSection[]> = {

  // ════════════════════════════════════════════════════════════════
  // NUTZFAHRZEUGCENTER
  // ════════════════════════════════════════════════════════════════

  scania: [
    {
      type: 'innovation',
      badge: 'Scania Super',
      headline: 'Die effizienteste Scania aller Zeiten',
      subline: 'Scania Super — Neu definiert',
      body: 'Der Scania Super Antriebsstrang setzt neue Massstäbe in Sachen Effizienz und Leistung. Mit einem überarbeiteten 13-Liter-Motor, optimierter Aerodynamik und dem neuen Super-Getriebe erreicht Scania Kraftstoffeinsparungen von bis zu 8 % im Vergleich zur Vorgängergeneration — und das bei gleichzeitig gesteigerter Fahrleistung.',
      image: '/images/brand-sections/scania/hero1.jpg',
      imageAlt: 'Scania S500 Sattelzugmaschine',
      imageRight: false,
      features: [
        { icon: 'Zap', title: 'Bis zu 8% weniger Verbrauch', text: 'Optimierter Antriebsstrang spart signifikant Kraftstoff im Vergleich zur Vorgängergeneration.' },
        { icon: 'Settings', title: 'Super-Getriebe', text: 'Neues Overdrive-Getriebe mit optimierter Übersetzung für maximale Effizienz im Fernverkehr.' },
        { icon: 'Wind', title: 'Verbesserte Aerodynamik', text: 'Neue Fahrerhaus-Verkleidungen und optimierter Luftwiderstand für weniger Verbrauch auf der Autobahn.' },
      ],
    },
    {
      type: 'sustainability',
      badge: 'Nachhaltigkeit',
      headline: 'Auf dem Weg zur fossilen Emission-Null',
      body: 'Scania verfolgt eine klare Strategie zur Dekarbonisierung des Transports. Mit elektrischen, LNG- und HVO-kompatiblen Fahrzeugen sowie einem umfassenden Nachhaltigkeitsprogramm arbeitet Scania konsequent an einer saubereren Transportzukunft — auch hier in der Schweiz.',
      image: '/images/brand-sections/scania/sustainability.jpg',
      imageAlt: 'Neue Generation Scania R & S',
      stats: [
        { value: '50', label: 'CO₂-Reduktion', suffix: '%' },
        { value: '350', label: 'Reichweite elektrisch', suffix: ' km' },
        { value: '2030', label: 'Ziel: Majoritär elektrisch', suffix: '' },
      ],
      features: [
        { icon: 'Leaf', title: 'HVO-kompatibel', text: 'Alle Scania Diesel-Motoren können mit HVO-Kraftstoff (Hydrotreated Vegetable Oil) betrieben werden — sofort, ohne Umrüstung.' },
        { icon: 'Zap', title: 'Scania BEV', text: 'Elektrische Scania-Trucks mit bis zu 350 km Reichweite für emissionsfreie Transporte in der Schweiz.' },
      ],
    },
  ],

  fiat: [
    {
      type: 'innovation',
      headline: 'E-Ducato — Der elektrische Transporter',
      subline: 'Null Emission. Volle Nutzlast.',
      body: 'Der Fiat E-Ducato ist der ideale Transporter für emissionsfreie Last-Mile-Delivery. Mit einer Nutzlast von bis zu 1.375 kg, einer Reichweite von bis zu 320 km und dem robusten Fiat-Ducato-Chassis — jetzt vollständig elektrisch. Perfekt für den Einsatz in Schweizer Städten und Lieferzonen.',
      image: '/images/brand-sections/fiat/ducato.jpg',
      imageAlt: 'Fiat Ducato Transporter',
      imageRight: true,
      features: [
        { icon: 'Zap', title: 'Bis zu 320 km Reichweite', text: 'Grosse 79 kWh Batterie für ausreichend Reichweite im Tagesbetrieb ohne Zwischenladen.' },
        { icon: 'Package', title: '1.375 kg Nutzlast', text: 'Volle gewerbliche Nutzlast trotz Elektroantrieb — keine Kompromisse beim Transportsvolumen.' },
        { icon: 'Settings', title: 'Wechselrichter DC/AC', text: 'Integrierter Wechselrichter ermöglicht das Betreiben von Elektrowerkzeug direkt aus dem Fahrzeug.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1925',
      headline: '100 Jahre Fiat Nutzfahrzeuge',
      body: 'Fiat baut seit 1925 Nutzfahrzeuge. Vom ersten Fiat-Lastwagen bis zum modernen E-Ducato hat die Marke über ein Jahrhundert lang die Mobilität von Handwerkern, Gewerbetreibenden und Logistikunternehmen geprägt. In der Schweiz ist Ernst Moser Ihr zuverlässiger Fiat Professional Partner.',
      milestones: [
        { year: '1925', text: 'Fiat startet Nutzfahrzeugproduktion' },
        { year: '1978', text: 'Einführung des legendären Fiat Ducato' },
        { year: '2001', text: 'Gründung der Marke Fiat Professional' },
        { year: '2021', text: 'Launch des vollelektrischen E-Ducato' },
      ],
    },
  ],

  isuzu: [
    // Innovation-Section "Unschlagbare Nutzlast" durch das Flotten-Carousel
    // auf der Brand-Seite ersetzt (siehe IsuzuFleetCarousel).
    {
      type: 'heritage',
      badge: 'Seit 1916',
      headline: 'Über 100 Jahre japanische Zuverlässigkeit',
      body: 'Isuzu Motors wurde 1916 gegründet und ist einer der ältesten Nutzfahrzeughersteller der Welt. Heute fertigt Isuzu über 500.000 Fahrzeuge pro Jahr und ist in der Schweiz bekannt für aussergewöhnliche Zuverlässigkeit und Langlebigkeit seiner Dieselmotoren.',
      milestones: [
        { year: '1916', text: 'Gründung Isuzu Motors in Japan' },
        { year: '1959', text: 'Erste Isuzu-Dieselmotoren für Nutzfahrzeuge' },
        { year: '2002', text: 'Einführung des ersten D-Max Pick-ups' },
        { year: '2012', text: 'Auszeichnung: Zuverlässigster Pick-up (Japan)' },
        { year: '2024', text: 'Neue Generation D-Max mit Euro 6d-Standard' },
      ],
    },
  ],

  piaggio: [
    {
      type: 'innovation',
      badge: 'NEU — Elektrisch',
      headline: 'Porter NP6 Electric — Null Emission im Lieferbetrieb',
      body: 'Der Piaggio Porter NP6 Electric ist der ideale emissionsfreie Kleintransporter für Schweizer Stadtlieferungen und Gewerbetreibende. Mit einer Nutzlast von 870 kg, einer Reichweite von bis zu 160 km und kompakter Bauform kommt er auch in engen Gassen und Altstadtbereichen problemlos zurecht.',
      image: '/images/brand-sections/piaggio/porter.jpg',
      imageAlt: 'Piaggio Porter NP6',
      imageRight: true,
      features: [
        { icon: 'Zap', title: 'Bis zu 160 km Reichweite', text: 'Ausreichend Reichweite für einen vollen Arbeitstag im städtischen Lieferbetrieb.' },
        { icon: 'Package', title: '870 kg Nutzlast', text: 'Trotz Elektroantrieb volle gewerbliche Nutzlast für den täglichen Einsatz.' },
        { icon: 'MapPin', title: 'Kompakte Abmessungen', text: 'Nur 3.95 m Länge — perfekt für Innenstädte, Altstädte und enge Lieferumgebungen.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1884',
      headline: 'Piaggio — Italiens Innovationslegende',
      body: 'Die Piaggio Group wurde 1884 in Genua gegründet und ist heute Europas grösster Hersteller von Motorrädern und Nutzfahrzeugen. Mit dem Ape (1948) und dem Porter revolutionierte Piaggio den Kleintransport in Europa. Die Tradition der kompakten, effizienten Nutzfahrzeuge wird heute mit Elektroantrieb fortgeführt.',
      milestones: [
        { year: '1884', text: 'Gründung Piaggio in Genua, Italien' },
        { year: '1948', text: 'Einführung des legendären Ape-Dreirads' },
        { year: '1992', text: 'Markteinführung des Porter Kastenwagens' },
        { year: '2021', text: 'Launch Porter NP6 Electric — volle Elektrifizierung' },
        { year: '2024', text: 'Erweiterte Reichweite und Schnellladefunktion' },
      ],
    },
  ],

  dhollandia: [],

  hilltip: [],

  // ════════════════════════════════════════════════════════════════
  // KOMMUNALCENTER
  // ════════════════════════════════════════════════════════════════

  alke: [
    {
      type: 'innovation',
      badge: 'Zero Emission',
      headline: 'ATX Electric — Null Emission. Volle Power.',
      body: 'Die Alkè ATX-Elektrofahrzeuge sind die perfekte Lösung für emissionsfreie Arbeitseinsätze in Innenstädten, auf Campingplätzen, in Parks und in Logistikzentren. Mit einer Nutzlast von bis zu 1.230 kg, einer Reichweite von bis zu 100 km und Höchstgeschwindigkeiten bis 50 km/h sind sie vollwertige Nutzfahrzeuge — ohne jede Emission.',
      image: '/images/brand-sections/alke/electric.jpg',
      imageAlt: 'Elektrisches Nutzfahrzeug im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Zap', title: 'Bis 1.230 kg Nutzlast', text: 'Vollwertige Nutzlast für Transporte im gewerblichen Umfeld — trotz kompakter elektrischer Bauweise.' },
        { icon: 'Navigation', title: 'Bis 100 km Reichweite', text: 'Grosse Batteriekapazität für ganztägige Arbeitseinsätze ohne Zwischenladen.' },
        { icon: 'Leaf', title: 'Zero Emission', text: 'Keine lokalen Emissionen — ideal für Einsatz in Städten, Schutzgebieten und geschlossenen Hallen.' },
      ],
    },
    {
      type: 'tech',
      badge: 'ATX Plattform',
      headline: 'Die ATX Plattform — Modular & Vielseitig',
      body: 'Die Alkè ATX-Plattform ist modular aufgebaut und kann mit verschiedensten Aufbauten konfiguriert werden: Kipper, Koffer, Transporter, Kommunalfahrzeug oder Spezialaufbau. Alle Varianten teilen sich denselben zuverlässigen Elektroantrieb.',
      specs: [
        { label: 'Nutzlast max.', value: '1.230 kg' },
        { label: 'Reichweite', value: 'bis 100 km' },
        { label: 'Höchstgeschwindigkeit', value: '50 km/h' },
        { label: 'Aufbau-Varianten', value: '15+ Konfigurationen' },
      ],
      features: [],
    },
  ],

  hako: [
    {
      type: 'innovation',
      badge: 'Citymaster 2000',
      headline: 'Citymaster 2000 — Die neue Stadtreinigungs-Benchmark',
      body: 'Der Hako Citymaster 2000 setzt neue Massstäbe in der kommunalen Strassenreinigung. Mit einer Arbeitsbreite von bis zu 4.50 m, einem Schmutzbehälter von 2.000 Litern und optionalem Elektroantrieb ist der Citymaster 2000 das leistungsstärkste kompakte Kehrfahrzeug auf dem Markt — und seit 2024 auch emissionsfrei verfügbar.',
      image: '/images/brand-sections/hako/sweeper.jpg',
      imageAlt: 'Kommunales Kehrfahrzeug im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Settings', title: '4,50 m Arbeitsbreite', text: 'Grösste Kehrbreite in der Klasse — maximale Flächenleistung bei minimalem Zeitaufwand.' },
        { icon: 'Package', title: '2.000 L Schmutzbehälter', text: 'Grosser Schmutzbehälter reduziert Entleerungsfahrten und erhöht die Netto-Kehrzeit.' },
        { icon: 'Zap', title: 'Optional vollelektrisch', text: 'Elektrischer Citymaster 2000 für emissionsfreie Stadtreinigung in Umweltzonen.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1948',
      headline: '75 Jahre Hako — Pionier der Reinigungstechnik',
      body: 'Hako wurde 1948 in Bad Oldesloe gegründet und ist seither ein Synonym für professionelle Reinigungsmaschinen. Was mit einfachen Handgeräten begann, ist heute ein weltweit agierendes Unternehmen mit über 1.800 Mitarbeitenden und Produkten für Kommunen, Industrie und Gebäudereinigung.',
      milestones: [
        { year: '1948', text: 'Gründung Hako in Bad Oldesloe, Deutschland' },
        { year: '1966', text: 'Einführung der ersten Kehrmaschine' },
        { year: '1985', text: 'Markteinführung des Citymaster — Branchenrevolution' },
        { year: '2003', text: 'Hako wird international: Expansion in 50 Länder' },
        { year: '2024', text: 'Citymaster 2000 E: Das erste vollelektrische Modell' },
      ],
    },
  ],

  kubota: [
    {
      type: 'innovation',
      badge: 'M7-Serie',
      headline: 'Kubota M7 — Leistung trifft japanische Präzision',
      body: 'Die Kubota M7-Traktorserie vereint beeindruckende Motorleistung von bis zu 170 PS mit dem Komfort eines modernen Kabinentraktors. Ausgestattet mit dem KVT-Stufenlosgetriebe, automatischer Hydraulikregelung und dem optionalen Kubota Precision Farming System ist der M7 der ideale Traktor für Schweizer Landwirtschaft und Kommunalbetriebe.',
      image: '/images/brand-sections/kubota/tractor.jpg',
      imageAlt: 'Kubota M7-173 Premium KVT',
      imageRight: false,
      features: [
        { icon: 'Zap', title: 'Bis 170 PS Motorleistung', text: 'Kubota-eigene Dieselmotoren mit Euro Stage V-Konformität und bester Kraftstoffeffizienz.' },
        { icon: 'Settings', title: 'KVT Stufenlosgetriebe', text: 'Stufenloses Kubota-Vario-Getriebe für optimale Zugkraft in jeder Situation ohne Schalten.' },
        { icon: 'Navigation', title: 'Precision Farming', text: 'GPS-gesteuertes Lenksystem mit Spurführung für effiziente und bodenschonende Feldbearbeitung.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1890',
      headline: 'Über 130 Jahre japanische Ingenieurskunst',
      body: 'Kubota wurde 1890 in Osaka gegründet und ist eines der ältesten und angesehensten Industrieunternehmen Japans. Von der Bewässerungspumpe zur Weltmarke in Kompakttraktoren: Kubota steht seit über einem Jahrhundert für aussergewöhnliche Qualität, Langlebigkeit und technologische Innovation.',
      milestones: [
        { year: '1890', text: 'Gründung Kubota Corporation in Osaka, Japan' },
        { year: '1960', text: 'Erste Kubota-Kompakttraktoren — Beginn einer Revolution' },
        { year: '1972', text: 'Eintritt in den US-Markt: Kubota wird global' },
        { year: '1998', text: 'Einführung der L-Serie — bis heute meistverkauft' },
        { year: '2021', text: 'Kubota M7 mit autonomem Fahrsystem-Option' },
      ],
    },
  ],

  greentec: [
    {
      type: 'innovation',
      badge: 'HC-Serie',
      headline: 'Greentec HC-Auslegemulcher — Reichweite neu definiert',
      body: 'Die Greentec HC-Auslegemulcher-Serie ermöglicht das Mähen und Mulchen von Böschungen, Gräben und Geländeabschnitten, die für konventionelle Maschinen unzugänglich sind. Mit einer Auslegerreichweite von bis zu 7,5 Metern und hochwertigem dänischem Engineering sind die HC-Modelle die erste Wahl für Kommunen und Strassenbauunternehmen.',
      image: '/images/brand-sections/greentec/mulcher.jpg',
      imageAlt: 'Traktor-Anbau-Mulchgerät im Böschungseinsatz',
      imageRight: false,
      features: [
        { icon: 'Settings', title: 'Bis 7,5 m Auslegerreichweite', text: 'Massgebende Reichweite für die Böschungspflege ohne Sicherheitsrisiko.' },
        { icon: 'Leaf', title: 'Präzisions-Mulchen', text: 'Gleichmässiges Mulchergebnis auch an steilsten Böschungen dank intelligenter Druckregelung.' },
        { icon: 'Wrench', title: 'Universalanbau', text: 'Kompatibel mit allen gängigen Trägern von 40–200 PS — maximale Flexibilität.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Danish Engineering',
      headline: 'Precision-Cut Technologie',
      body: 'Greentec Maschinen sind konsequent auf maximale Schnittqualität und Langlebigkeit ausgelegt. Die proprietäre Klingen-Geometrie und der gehärtete Rotorkörper garantieren saubere Schnittergebnisse auch im härtesten Dauerbetrieb — made in Dänemark seit 1993.',
      specs: [
        { label: 'Auslegerreichweite max.', value: '7,5 m' },
        { label: 'Hydraulikbedarf', value: '80–220 l/min' },
        { label: 'Träger-Kompatibilität', value: '40–200 PS' },
        { label: 'Hergestellt', value: 'Dänemark seit 1993' },
      ],
      features: [],
    },
  ],

  reform: [
    {
      type: 'innovation',
      badge: 'Mounty / Muli',
      headline: 'Reform Bergfahrzeuge — Wo andere aufgeben, fängt Reform an',
      body: 'Reform Bergfahrzeuge aus Österreich sind speziell für den Einsatz in steilem Gelände konzipiert. Mit Steigfähigkeiten von bis zu 45° meistern Mounty und Muli Hänge, die für normale Traktoren absolut unzugänglich sind. Jede Reform-Maschine ist ein Unikat, handgefertigt in Österreich für extreme Anforderungen.',
      image: '/images/brand-sections/reform/mountain-tractor.jpg',
      imageAlt: 'Bergtraktor im Steilhangeinsatz',
      imageRight: false,
      features: [
        { icon: 'Mountain', title: 'Bis 45° Hangneigung', text: 'Speziell entwickeltes Fahrwerk für sicheren Betrieb auf extremsten Steilhängen.' },
        { icon: 'Wrench', title: 'Handgefertigt in Österreich', text: 'Jede Reform-Maschine wird in österreichischer Manufaktur individuell für den Einsatzbereich gebaut.' },
        { icon: 'Shield', title: 'ROPS-Sicherheitskabine', text: 'Integrierter Überrollschutz nach EN 15695 für maximale Sicherheit am Steilhang.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1949',
      headline: '75 Jahre Reform — Österreichische Bergfahrzeug-Tradition',
      body: 'Reform wurde 1949 in Wels, Österreich gegründet und ist seither Pionier in der Entwicklung von Bergfahrzeugen für die Landwirtschaft und den Kommunalbereich. Die Marke steht für österreichische Ingenieurskunst, extreme Robustheit und die Leidenschaft für das, was andere für unmöglich halten.',
      milestones: [
        { year: '1949', text: 'Gründung Reform in Wels, Österreich' },
        { year: '1965', text: 'Erstes Reform Bergfahrzeug für extreme Hanglagen' },
        { year: '1985', text: 'Einführung des Muli-Transporter — wird zur Ikone' },
        { year: '2001', text: 'Neuer Mounty mit Vierradlenkung für extreme Manöver' },
        { year: '2023', text: 'Reform Mounty 100V: Erste Hybrid-Option für Bergfahrzeuge' },
      ],
    },
  ],

  zaugg: [
    {
      type: 'innovation',
      badge: 'Swiss Made',
      headline: 'Zaugg Schneefräsen — Schweizer Präzision für den Winter',
      body: 'Zaugg AG Langnau fertigt seit Jahrzehnten die zuverlässigsten Schneefräsen der Welt. Mit Räumbreiten von 100 bis 300 cm und Schnitttiefen bis zu 120 cm meistern Zaugg-Maschinen die härtesten Schweizer Wintersituationen — zuverlässig, wartungsarm und made in Switzerland.',
      image: '/images/brand-sections/zaugg/snowblower.jpg',
      imageAlt: 'Schneefräse auf dem Simplon Pass, Schweiz',
      imageRight: false,
      features: [
        { icon: 'Snowflake', title: 'Bis 300 cm Räumbreite', text: 'Breiteste Fräsenmodelle für die maximale Flächenleistung bei Strassen und Plätzen.' },
        { icon: 'Zap', title: 'Bis 120 cm Schnitttiefe', text: 'Auch tiefe Schneeverwehungen werden sicher und vollständig geräumt.' },
        { icon: 'Settings', title: 'Swiss Engineering', text: 'Alle Zaugg-Maschinen werden in Langnau im Emmental, Schweiz entwickelt und gefertigt.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Technik',
      headline: 'Zwei-Stufen-Fräsen-Technologie',
      body: 'Die Zaugg-Zweistufenfräse ist das Herzstück aller grossen Schneefräsen. Ein robustes Schneckenrad zerkleinert zuerst den Schnee, ein leistungsstarkes Impeller-System schleudert ihn dann präzise in die gewünschte Richtung. Das Resultat: maximale Räumleistung bei minimalstem Kraftaufwand.',
      specs: [
        { label: 'Räumbreite', value: '100 – 300 cm' },
        { label: 'Schnitttiefe', value: 'bis 120 cm' },
        { label: 'Wurfweite', value: 'bis 20 m' },
        { label: 'Standort', value: 'Langnau, Schweiz' },
      ],
      features: [],
    },
  ],

  ligier: [
    {
      type: 'innovation',
      badge: 'JS50 L',
      headline: 'Ligier Professional — Leichte Nutzfahrzeuge ohne Kompromiss',
      body: 'Die Ligier Professional JS50 L-Serie ist speziell für den professionellen Einsatz entwickelt worden. Als leichtes Nutzfahrzeug (L6e/L7e) benötigt der JS50 L in vielen Ländern keinen PKW-Führerschein — trotzdem bietet er 450 kg Nutzlast und ist in zahlreichen Aufbau-Varianten erhältlich.',
      image: '/images/brand-sections/ligier/vehicle.jpg',
      imageAlt: 'Leichtes gewerbliches Nutzfahrzeug',
      imageRight: true,
      features: [
        { icon: 'Package', title: '450 kg Nutzlast', text: 'Vollwertige Transportkapazität für den täglichen gewerblichen Einsatz.' },
        { icon: 'Zap', title: 'Elektrisch verfügbar', text: 'Ligier JS50 auch als vollelektrische Variante für emissionsfreie Einsatzbereiche.' },
        { icon: 'Settings', title: 'Viele Aufbauvarianten', text: 'Kipper, Koffer, Plattform — individuell konfigurierbar für jeden Einsatz.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1980',
      headline: 'Ligier — Französische Nutzfahrzeug-Tradition',
      body: 'Die Ligier Group blickt auf eine reiche Geschichte zurück, die mit dem Rennsport begann und heute in professionellen Leichtfahrzeugen kulminiert. Seit 1980 baut Ligier Kleinstfahrzeuge und Nutzfahrzeuge, die durch ihre Kompaktheit, Wirtschaftlichkeit und Vielseitigkeit überzeugen.',
      milestones: [
        { year: '1968', text: 'Guy Ligier gründet das Ligier-Unternehmen' },
        { year: '1980', text: 'Einführung der ersten Ligier-Kleinstfahrzeuge' },
        { year: '2001', text: 'Gründung Ligier Professional — Sparte Nutzfahrzeuge' },
        { year: '2018', text: 'Einführung der JS50 L-Serie für gewerbliche Anwendungen' },
        { year: '2023', text: 'JS50 L Electric: emissionsfreies Nutzfahrzeug' },
      ],
    },
  ],

  baoli: [
    {
      type: 'innovation',
      badge: 'KBE-Serie',
      headline: 'Baoli Elektro-Stapler — Effizienz ohne Emission',
      body: 'Die Baoli KBE-Elektrostaplerserie bietet zuverlässige und effiziente Hubarbeit ohne lokale Emissionen. Mit Traglast von 1,0 bis 3,5 Tonnen, modernem AC-Antrieb und robuster Bauweise sind die Baoli-Stapler die wirtschaftliche Lösung für Lagerhaltung, Produktion und Logistik.',
      image: '/images/brand-sections/baoli/forklift.jpg',
      imageAlt: 'Elektro-Gabelstapler im Lager',
      imageRight: false,
      features: [
        { icon: 'Package', title: '1,0 – 3,5 t Traglast', text: 'Breites Traglastspektrum für nahezu alle Lagerhaltungs- und Logistikaufgaben.' },
        { icon: 'Zap', title: 'AC-Antrieb', text: 'Moderner Wechselstrom-Antrieb für maximale Effizienz und minimalen Wartungsaufwand.' },
        { icon: 'Settings', title: 'KION Group Technologie', text: 'Baoli gehört zur renommierten KION Group und profitiert von Weltklasse-Ingenieurskunst.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Technologie',
      headline: 'Baoli CBD-Serie — Kommissionierstapler der Extraklasse',
      body: 'Die Baoli CBD-Kommissionierstapler sind speziell für den effizienten Einsatz im Hochregal-Lager entwickelt. Mit Hubhöhen bis zu 5,5 Metern, ergonomischem Fahrerstand und intuitiver Bedienung setzen sie Standards in der modernen Lagerlogistik.',
      image: '/images/brand-sections/baoli/reach-truck.jpg',
      imageAlt: 'Schmalgang-Stapler im Hochregal',
      specs: [
        { label: 'Traglast', value: '1,0 – 3,5 t' },
        { label: 'Hubhöhe', value: 'bis 7,0 m' },
        { label: 'Antrieb', value: 'Elektro (AC)' },
        { label: 'Hersteller-Gruppe', value: 'KION Group' },
      ],
      features: [],
    },
  ],

  matev: [
    {
      type: 'innovation',
      badge: 'Anbaugeräte',
      headline: 'matev — Das universelle Anbausystem',
      body: 'matev ist das Anbaugeräte-System für Kompakttraktoren und Einachser. Das einzigartige Schnellwechsel-System erlaubt den Gerätewechsel in Sekunden — ohne Werkzeug. Mit über 60 Anbaugeräten für Sommer und Winter ist matev das vielseitigste System seiner Art auf dem Markt.',
      image: '/images/brand-sections/matev/attachment.jpg',
      imageAlt: 'Kompakttraktor mit Anbaugerät im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Settings', title: 'Schnellwechsel ohne Werkzeug', text: 'Gerätewechsel in Sekunden: Frontkehrmaschine, Schneeschild, Streuer — alles in einem System.' },
        { icon: 'Wrench', title: '60+ Anbaugeräte', text: 'Umfangreichstes Anbaugeräteprogramm für Kompakttraktoren und Einachser.' },
        { icon: 'ShieldCheck', title: 'Kompatibilität', text: 'matev-kompatibel mit allen gängigen Trägerfahrzeugen — eine Investition für alle Geräte.' },
      ],
    },
    {
      type: 'tech',
      badge: 'System',
      headline: 'matev Vier-Jahreszeiten-System',
      body: 'Das matev-System ist konsequent auf ganzjährigen Einsatz ausgelegt: Im Sommer Kehrmaschinen, Mähwerke und Laubbläser — im Winter Schneeschilde, Streugeräte und Frässysteme. Ein Träger, ein Anschlusssystem, alle Jahreszeiten abgedeckt.',
      specs: [
        { label: 'Anbaugeräte', value: '60+ Varianten' },
        { label: 'Jahreszeiten', value: '4 — Sommer & Winter' },
        { label: 'Wechselzeit', value: 'unter 30 Sekunden' },
        { label: 'Kompatibilität', value: 'Alle Standardmaschinen' },
      ],
      features: [],
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // MOTORGERÄTECENTER
  // ════════════════════════════════════════════════════════════════

  makita: [
    {
      type: 'tech',
      badge: 'XGT 40V Max',
      headline: 'Makita XGT — Das stärkste Akku-System der Welt',
      subline: 'Über 80 Geräte. Ein Akku. Grenzenlos.',
      body: 'Das Makita XGT 40V Max-System revolutioniert professionelles Arbeiten mit Akkuwerkzeug. Mit über 80 kompatiblen Geräten — von der Kettensäge bis zum Rasenmäher — bietet XGT die Leistung von Elektrowerkzeug mit der Freiheit von Akkubetrieb. Ein Akku-Ökosystem für alle Aufgaben.',
      image: '/images/brand-sections/makita/tool.jpg',
      imageAlt: 'Makita Akku-Winkelschleifer DGA504',
      specs: [
        { label: 'Akkuspannung', value: '40V Max' },
        { label: 'Kompatible Geräte', value: '80+' },
        { label: 'Akku-Kapazitäten', value: '2,5 – 8,0 Ah' },
        { label: 'Ladezeit (4Ah)', value: '28 min (Schnelllader)' },
      ],
      features: [],
    },
    {
      type: 'heritage',
      badge: 'Seit 1915',
      headline: '110 Jahre Makita — Pionier der Profi-Werkzeuge',
      body: 'Makita wurde 1915 in Nagoya, Japan gegründet und ist heute einer der weltgrössten Hersteller von Elektrowerkzeugen und Gartengeräten. Von der ersten Elektrohobel-Einheit bis zum modernen XGT-40V-System steht Makita für Innovation, Qualität und die Leidenschaft für professionelles Arbeiten.',
      image: '/images/brand-sections/makita/headquarters.jpg',
      imageAlt: 'Makita Hauptsitz Nagoya, Japan',
      milestones: [
        { year: '1915', text: 'Gründung Makita in Nagoya, Japan — Elektromotoren-Reparatur' },
        { year: '1958', text: 'Erster Makita Elektrobohrer — Beginn der Werkzeugproduktion' },
        { year: '1978', text: 'Erste Makita Akku-Bohrmaschine — Pionierarbeit' },
        { year: '2005', text: 'Einführung LXT 18V — das meistverkaufte Akku-System der Welt' },
        { year: '2020', text: 'Launch XGT 40V Max — nächste Akku-Generation' },
        { year: '2024', text: 'Über 80 XGT-Geräte — vom Hammer bis zum Rasenmäher' },
      ],
    },
  ],

  stihl: [
    {
      type: 'innovation',
      badge: 'AK-System',
      headline: 'Stihl AK-Akku-System — Profi-Power, Null Lärm',
      body: 'Das Stihl AK-Akku-System ist das leistungsstärkste 36V-System für professionelle Gartenpflege. Heckenscheren, Rasenmäher, Laubbläser, Trimmer — alle Geräte teilen sich denselben AK-Akku. Stihl-Qualität, jetzt geräuschlos und emissionsfrei.',
      image: '/images/brand-sections/stihl/trimmer.jpg',
      imageAlt: 'Stihl Akku-Trimmer im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Zap', title: '36V Hochleistungs-Akku', text: 'Das AK-System liefert Profi-Leistung ohne Abgase, Lärm oder Kabelgewirr.' },
        { icon: 'Settings', title: 'Alle Gartengeräte kompatibel', text: 'Ein Akku für Heckenschere, Rasenmäher, Laubbläser und Trimmer — maximale Wirtschaftlichkeit.' },
        { icon: 'Leaf', title: 'Zero Emission, minimal noise', text: 'Ideal für sensible Bereiche: Krankenhäuser, Schulen, Wohnsiedlungen.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1926',
      headline: 'Andreas Stihl — Der Erfinder der Motorsäge',
      body: 'Andreas Stihl erfand 1926 in Stuttgart die erste elektrische Motorsäge der Welt. Was mit dieser revolutionären Erfindung begann, ist heute das weltgrösste Motorsägen-Unternehmen. Stihl produziert über 300 Gerätetypen — alle im deutschen Waiblingen und internationalen Werken.',
      milestones: [
        { year: '1926', text: 'Andreas Stihl erfindet die elektrische Motorsäge — Weltpremiere' },
        { year: '1950', text: 'Erste Stihl Benzin-Motorsäge für den Forstbetrieb' },
        { year: '1971', text: 'Weltweiter Marktführer bei Motorsägen' },
        { year: '2009', text: 'Launch Stihl iMow — der erste Stihl-Roboterrasenmäher' },
        { year: '2019', text: 'Stihl AK-System: Professionelles Akkusystem für Garten' },
        { year: '2024', text: 'Über 300 Gerätetypen, 45 Länder, Weltmarktführer' },
      ],
    },
  ],

  nilfisk: [
    {
      type: 'innovation',
      badge: 'SC500B',
      headline: 'Nilfisk SC500B — Professionelle Bodenreinigung',
      body: 'Die Nilfisk SC500B ist eine kompakte Scheuersaugmaschine für professionelle Bodenreinigung in kleinen und mittleren Flächen. Mit einer Reinigungsbreite von 530 mm, einem 40-Liter-Frisch- und Schmutzwassertank und intuitiver Bedienung reinigt die SC500B bis zu 2.100 m² pro Stunde.',
      image: '/images/brand-sections/nilfisk/cleaning-robot.jpg',
      imageAlt: 'Professionelle Reinigungsmaschine im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Settings', title: '530 mm Reinigungsbreite', text: 'Optimale Breite für Gänge, Produktionsflächen und Lagerbereiche.' },
        { icon: 'Droplets', title: '40 L Tanksystem', text: 'Grosser Frischwasser- und Schmutzwassertank für lange Reinigungsintervalle.' },
        { icon: 'Activity', title: 'Bis 2.100 m²/h', text: 'Hohe Flächenleistung für maximale Produktivität im gewerblichen Reinigungsbetrieb.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Seit 1906',
      headline: 'Nilfisk — 120 Jahre Reinigungstechnologie',
      body: 'Nilfisk wurde 1906 in Kopenhagen, Dänemark gegründet und ist heute einer der weltweit führenden Anbieter von professionellen Reinigungsgeräten. Über 120 Jahre Innovation haben Nilfisk zum Synonym für professionelle Sauber-Lösungen gemacht — von industriellen Nass-Trockensaugern bis zu vollautomatischen Scheuersaugmaschinen.',
      image: '/images/brand-sections/nilfisk/factory1954.jpg',
      imageAlt: 'Nilfisk Fabrik 1954, Kopenhagen',
      milestones: [
        { year: '1906', text: 'Gründung Nilfisk in Kopenhagen, Dänemark' },
        { year: '1910', text: 'Erster elektrischer Industriestaubsauger — Weltpremiere' },
        { year: '1955', text: 'Nilfisk GD10 — Ikone der Industriesauger' },
        { year: '1988', text: 'Entwicklung erster automatischer Scheuersaugmaschinen' },
        { year: '2024', text: 'KI-gestützte autonome Reinigungsroboter-Lösungen' },
      ],
    },
  ],

  stiga: [
    {
      type: 'innovation',
      badge: 'NEU 2024',
      headline: 'STIGA Swift 5e — Roboter-Rasenmähen der neuen Generation',
      body: 'Der STIGA Swift 5e ist ein vollständig kabelfreier Roboter-Rasenmäher, der per GPS und STIGA-eigener Technologie ohne Begrenzungskabel auskommt. Mit einer Mähfläche bis 1.000 m² und dem integrierten STIGA-Akku-System ist der Swift 5e der ideale Einstieg in die automatisierte Rasenpflege.',
      image: '/images/brand-sections/stiga/robot-mower.jpg',
      imageAlt: 'Roboter-Rasenmäher mit GPS auf Rasenfläche',
      imageRight: false,
      features: [
        { icon: 'Navigation', title: 'GPS — kein Kabel nötig', text: 'Modernste GPS-Technologie ersetzt das lästige Begrenzungskabel vollständig.' },
        { icon: 'Leaf', title: 'Bis 1.000 m² Mähfläche', text: 'Kompakte Bauweise, grosse Leistung: der Swift 5e mäht Gärten bis 1.000 m² vollständig autonom.' },
        { icon: 'Zap', title: 'STIGA e-Power Akku', text: 'Kompatibel mit dem STIGA e-Power 48V Akku-System — ein Akku für alle STIGA-Geräte.' },
      ],
    },
    {
      type: 'sustainability',
      badge: 'e-Power',
      headline: 'STIGA e-Power — Elektrisch für alle Jahreszeiten',
      body: 'Das STIGA e-Power 48V Akku-Ökosystem umfasst über 25 elektrische Gartengeräte — vom Robotermäher bis zur Heckenschere. Alle Geräte teilen denselben Akku, alle sind emissionsfrei, leise und wartungsarm. STIGA e-Power ist der elektrische Standard für professionelle Gartenpflege.',
      stats: [
        { value: '25+', label: 'e-Power Geräte' },
        { value: '48', label: 'Volt Systemspannung', suffix: 'V' },
        { value: '0', label: 'Lokale Emissionen', suffix: '%' },
      ],
      features: [
        { icon: 'Leaf', title: 'Zero Emission', text: 'Alle e-Power Geräte arbeiten ohne Abgase — ideal für Wohnsiedlungen und ökologisch sensible Bereiche.' },
        { icon: 'Settings', title: 'Kompatibles Akkusystem', text: 'Ein STIGA-Akku für alle 25+ Geräte im e-Power-System — maximale Wirtschaftlichkeit.' },
      ],
    },
  ],

  segway: [
    {
      type: 'innovation',
      badge: 'RTK GPS',
      headline: 'Segway Navimow — Roboter-Mähen ohne Begrenzungskabel',
      body: 'Der Segway Navimow nutzt RTK-GPS-Technologie für zentimetergenaue Navigation ohne Begrenzungskabel. Das EFLS-System (Exact Fusion Locating System) kombiniert RTK-GPS, IMU und Bilderkennung für höchste Genauigkeit — auch bei Bewölkung und in schwierigen Geländebedingungen.',
      image: '/images/brand-sections/segway/navimow.jpg',
      imageAlt: 'Autonome Roboter-Rasenmäher auf Golfplatz',
      imageRight: false,
      features: [
        { icon: 'Navigation', title: 'RTK-GPS Zentimetergenau', text: 'Real-Time Kinematic GPS liefert ±2,5 cm Genauigkeit — kein Kabel, kein Aufwand.' },
        { icon: 'Wifi', title: 'EFLS Technologie', text: 'Exact Fusion Locating System kombiniert GPS, IMU und Kamera für robuste Navigation.' },
        { icon: 'Settings', title: 'Bis 3.000 m² Mähfläche', text: 'H800E-Modell bewältigt Rasenflächen bis zu 3.000 m² vollständig autonom.' },
      ],
    },
    {
      type: 'tech',
      badge: 'EFLS System',
      headline: 'Technologie, die Grenzen überwindet',
      body: 'Der Navimow ist mehr als ein Rasenmäher: Es ist ein hochpräzises GPS-System in einem Gartengerät. Mit dem EFLS-Fusion-Algorithmus und integrierter Hinderniserkennung navigiert der Navimow sicher durch komplexe Gärten — auch mit Bäumen, Blumenbeeten und unregelmässigen Formen.',
      specs: [
        { label: 'GPS-Genauigkeit', value: '±2,5 cm (RTK)' },
        { label: 'Mähfläche max.', value: '3.000 m² (H800E)' },
        { label: 'Schnittbreite', value: '22 cm' },
        { label: 'App-Steuerung', value: 'iOS & Android' },
      ],
      features: [],
    },
  ],

  ambrogio: [
    {
      type: 'innovation',
      badge: 'L400i Elite',
      headline: 'Ambrogio L400i Elite — Professionelles RTK-Mähen bis 6.000 m²',
      body: 'Der Ambrogio L400i Elite ist der leistungsstärkste kabellose Roboterrasenmäher für professionelle Anwendungen. Mit RTK-GPS-Navigation, einer Mähfläche bis 6.000 m² und einem robusten Gehäuse für den Dauerbetrieb setzt der L400i Elite neue Standards für gewerbliche Rasenpflege.',
      image: '/images/brand-sections/ambrogio/robot.jpg',
      imageAlt: 'Professioneller Roboter-Rasenmäher auf Sportanlage',
      imageRight: false,
      features: [
        { icon: 'Navigation', title: 'RTK GPS Navigation', text: 'Zentimetergenaue Positionierung ohne Begrenzungskabel — ideal für grosse und komplexe Rasenflächen.' },
        { icon: 'Leaf', title: 'Bis 6.000 m² Mähfläche', text: 'Klasse-führende Flächenleistung für Parks, Sportanlagen und Grossgärten.' },
        { icon: 'Settings', title: 'Professionelles Chassis', text: 'Robustes Design für den täglichen gewerblichen Dauerbetrieb in anspruchsvollsten Bedingungen.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Wire-Free',
      headline: 'Wire-Free Technology — Die Zukunft des Rasenmähens',
      body: 'Ambrogio entwickelte die Wire-Free-Technologie als eine der ersten Marken weltweit. GPS, RTK und proprietäre Lokalisierungs-Algorithmen ersetzen das Begrenzungskabel vollständig — die Installation dauert statt Stunden nur Minuten, und das Ergebnis ist präziser als je zuvor.',
      specs: [
        { label: 'Mähfläche', value: 'bis 6.000 m²' },
        { label: 'GPS-System', value: 'RTK (centimetric)' },
        { label: 'Installation', value: 'unter 10 Minuten' },
        { label: 'Hersteller', value: 'Zucchetti Centro Sistemi, IT' },
      ],
      features: [],
    },
  ],

  'pudu-robotics': [
    {
      type: 'innovation',
      badge: 'Kommerzielle Reinigung',
      headline: 'Pudu CC1 & MT1 — Autonome Reinigungsroboter für Profis',
      body: 'Der Pudu CC1 und MT1 VAC sind vollautonome Gewerbe-Reinigungsroboter für grosse Flächen in Einkaufszentren, Flughäfen, Spitälern und Logistikhallen. Mit LiDAR-SLAM-Navigation, automatischem Schmutzwassermanagement und App-gesteuertem Flottenmanagement ersetzen sie manuelle Bodenreinigung effizient und zuverlässig.',
      image: '/images/products/pudu-robotics-kommerzielle-reinigungsroboter/main.webp',
      imageAlt: 'Pudu CC1 gewerblicher Reinigungsroboter',
      imageRight: false,
      features: [
        { icon: 'Bot', title: 'Autonome Navigation', text: 'LiDAR-SLAM ermöglicht selbstständiges Kartieren und Navigieren ohne externe Infrastruktur.' },
        { icon: 'Settings', title: 'Automatisches Wasser-Management', text: 'Selbstständiges Befüllen und Entleeren — minimaler Personalaufwand beim Betrieb.' },
        { icon: 'Activity', title: 'Flottenmanagement', text: 'Mehrere Roboter zentral steuern, überwachen und planen — via App oder PuduCloud.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Technologie',
      headline: 'Pudu Robotics — KI-Plattform für professionellen Einsatz',
      body: 'Alle Pudu-Roboter basieren auf der proprietären Pudu-AI-Plattform mit Multi-Sensor-Fusion, Deep-Learning-Hinderniserkennung und Echtzeit-Flottenmanagement. Das PuduCloud-System ermöglicht die zentrale Steuerung aller Geräte — ob Reinigungsroboter CC1/MT1 oder Serviceroboter T150/T300.',
      image: '/images/products/pudu-robotics-pudu-mt1-vac/main.webp',
      imageAlt: 'Pudu MT1 VAC Saugroboter für Gewerbe',
      specs: [
        { label: 'Navigation', value: 'SLAM + LiDAR' },
        { label: 'Reinigungsbreite CC1', value: '550 mm' },
        { label: 'Akkuautonomie', value: 'bis 8h Betrieb' },
        { label: 'Einsatzorte', value: 'Gewerbe, Logistik, Pflege' },
      ],
      features: [],
    },
  ],

  swardman: [
    {
      type: 'innovation',
      badge: 'Edwin 3G RTK',
      headline: 'Swardman Edwin 3G — Roboter-Spindelmäher für Profis',
      body: 'Der Swardman Edwin 3G RTK ist der weltweit erste autonome Spindelmäher mit RTK-GPS-Navigation. Entwickelt für Golf-Fairways, Fussballfelder und professionelle Sportturfanlagen liefert der Edwin 3G den perfekten Spindelmäherschnitt — autonom, präzise und ohne Begrenzungskabel.',
      image: '/images/brand-sections/swardman/reel-mower.jpg',
      imageAlt: 'Autonomer elektrischer Spindelmäher auf Sportanlage',
      imageRight: false,
      features: [
        { icon: 'Navigation', title: 'RTK GPS — centimetrisch', text: 'Zentimetergenaue Positionierung für gleichmässige Mähstreifen ohne Abweichungen.' },
        { icon: 'Settings', title: 'Spindelmäher-Qualität', text: 'Klassischer Spindelmäherschnitt für Turnier-Qualität auf Golfplätzen und Sportfeldern.' },
        { icon: 'Activity', title: 'Professioneller Turf', text: 'Speziell entwickelt für Golf-Fairways, Fussballrasen und professionelle Sportanlagen.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Spindel-Tech',
      headline: 'Warum Spindelmähen? Der Unterschied ist sichtbar.',
      body: 'Spindelmäher schneiden Grashalme wie eine Schere — sauber, gleichmässig, ohne Risse. Das Resultat: Turnier-Qualität mit idealer Rasendichte und -optik. Der Edwin 3G bringt diese Profi-Schnitttechnik mit moderner RTK-Automation zusammen.',
      specs: [
        { label: 'Schnitttechnik', value: 'Spindel (Cylinder)' },
        { label: 'GPS-System', value: 'RTK (centimetric)' },
        { label: 'Schnitthöhe', value: '5 – 25 mm' },
        { label: 'Anwendung', value: 'Golf, Fussball, Profi-Turf' },
      ],
      features: [],
    },
  ],

  kaaz: [
    {
      type: 'innovation',
      badge: 'Japanische Präzision',
      headline: 'Kaaz Mehrfachklingen-Mäher — Japanische Schnittperfektion',
      body: 'Kaaz aus Japan entwickelt seit Jahrzehnten Mehrfachklingen-Rasenmäher für professionelle Anwendungen. Die einzigartige Multi-Blade-Technologie sorgt für einen deutlich gleichmässigeren Schnitt als konventionelle Mäher — ideal für Flächen mit höchsten Ansprüchen an Rasenpflege.',
      image: '/images/brand-sections/kaaz/mower.jpg',
      imageAlt: 'Professioneller Rasenmäher mit Mehrfachklingen',
      imageRight: false,
      features: [
        { icon: 'Settings', title: 'Multi-Blade Technologie', text: 'Mehrere Klingen pro Einheit sorgen für feinsten Schnitt und gleichmässige Rasendichte.' },
        { icon: 'Wrench', title: 'Japanische Qualität', text: 'Kaaz-Produkte werden in Japan gefertigt und entsprechen höchsten Qualitätsstandards.' },
        { icon: 'Leaf', title: 'Profi-Ergebnis', text: 'Turniermässige Schnittqualität für hochwertige Rasenflächen und anspruchsvolle Gärten.' },
      ],
    },
    {
      type: 'heritage',
      badge: 'Japan',
      headline: 'Kaaz — Traditionsmarke aus Japan',
      body: 'Kaaz Corporation ist ein japanischer Hersteller hochwertiger Gartengeräte und Rasenmäher. Mit dem Fokus auf Mehrfachklingen-Mäher und professionelle Gartengeräte hat Kaaz eine treue internationale Fangemeinde aufgebaut, die die japanische Qualität und Langlebigkeit schätzt.',
      milestones: [
        { year: '1967', text: 'Gründung Kaaz Corporation in Japan' },
        { year: '1975', text: 'Einführung der ersten Mehrfachklingen-Mäher' },
        { year: '1990', text: 'Internationale Expansion — Kaaz wird in Europa bekannt' },
        { year: '2010', text: 'Einführung leichter Profi-Trimmer-Modelle' },
        { year: '2024', text: 'Neue Modellgeneration mit verbesserter Schneidetechnologie' },
      ],
    },
  ],

  erco: [
    {
      type: 'innovation',
      badge: 'Spindelmäher',
      headline: 'Erco Spindelmäher — Für den perfekten Rasen',
      body: 'Erco Spindelmäher sind die Wahl professioneller Rasenpfleger für höchste Ansprüche. Die Spindel-Schertechnik schneidet jeden Grashalm sauber und gleichmässig wie eine Schere — das Resultat ist ein dichter, gleichmässiger Rasen von Turnier-Qualität.',
      image: '/images/brand-sections/erco/reel-mower.jpg',
      imageAlt: 'Professioneller Spindelmäher auf Sportanlage',
      imageRight: false,
      features: [
        { icon: 'Settings', title: 'Spindel-Schertechnik', text: 'Jeder Grashalm wird wie mit einer Schere geschnitten — kein Reissen, kein Verdichten.' },
        { icon: 'Leaf', title: 'Rasen-Turnier-Qualität', text: 'Verwendet auf Golfplätzen, Bowling Greens und Sportrasen für höchste Schnittqualität.' },
        { icon: 'Wrench', title: 'Professionelle Bauweise', text: 'Robuste Metallkonstruktion für den täglichen professionellen Dauerbetrieb.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Schnitttechnik',
      headline: 'Warum Spindelmähen den Unterschied macht',
      body: 'Konventionelle Schlegelmäher reissen Grashalme und verursachen braune Spitzen. Spindelmäher schneiden sauber und präzise — das Gras wächst gleichmässiger, dichter und gesünder. Erco-Spindelmäher sind die Profi-Lösung für anspruchsvollste Rasenpflege.',
      specs: [
        { label: 'Schnitttechnik', value: 'Cylinder / Spindel' },
        { label: 'Schnitthöhe', value: '4 – 30 mm einstellbar' },
        { label: 'Schneidqualität', value: 'Turnier-Standard' },
        { label: 'Anwendung', value: 'Golf, Sport, Profi-Rasen' },
      ],
      features: [],
    },
  ],

  timan: [
    {
      type: 'innovation',
      badge: 'RC-Technologie',
      headline: 'TIMAN — Ferngesteuerte Sicherheit am Steilhang',
      body: 'TIMAN Fernsteuer-Mäher ermöglichen das sichere Mähen von extremen Steilhängen bis 55° Neigung — ohne dass der Bediener die gefährliche Zone betreten muss. Mit dem digitalen Funksystem und bis zu 300 m Reichweite bleibt der Bediener stets in sicherer Distanz zur Maschine.',
      image: '/images/brand-sections/timan/rc-mower.jpg',
      imageAlt: 'Motorgerät an steilem Hang im Einsatz',
      imageRight: false,
      features: [
        { icon: 'Shield', title: 'Bis 55° Hangneigung', text: 'Sicherer Betrieb an extremen Steilhängen — der Bediener bleibt in sicherer Distanz.' },
        { icon: 'Wifi', title: 'Digitalfunk bis 300 m', text: 'Zuverlässige digitale Fernsteuerung mit bis zu 300 Meter Reichweite in jedem Gelände.' },
        { icon: 'Settings', title: 'Swiss Design', text: 'TIMAN — entwickelt und produziert in der Schweiz für Schweizer Anforderungen.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Sicherheit',
      headline: 'Sicherheit durch Fernsteuerung — TIMAN RC-System',
      body: 'Das TIMAN RC-System ist speziell für den professionellen Kommunal- und Strassenbau-Einsatz entwickelt. Mit intuitivem Joystick-Controller, Echtzeit-Rückmeldung und ausfallsicherer Totmannschaltung bietet TIMAN maximale Sicherheit bei minimalem Risiko.',
      specs: [
        { label: 'Neigung max.', value: '55°' },
        { label: 'Funkreichweite', value: '300 m digital' },
        { label: 'Sicherheit', value: 'Totmann-Schaltung' },
        { label: 'Entwicklung', value: 'Schweiz' },
      ],
      features: [],
    },
  ],

  envitec: [
    {
      type: 'innovation',
      badge: 'Winterdienst',
      headline: 'Envitec Streugeräte — Effizienter Winterdienst',
      body: 'Envitec Streugeräte sind die zuverlässige Lösung für den professionellen Winterdienst. Mit präziser Streubreiten-Einstellung, robusten Edelstahlkomponenten und bewährter Technik sorgen Envitec-Geräte für sichere Strassen — auch unter härtesten Winterbedingungen.',
      image: '/images/brand-sections/envitec/snowplow.jpg',
      imageAlt: 'Winterdienstfahrzeug beim Strasseneinsatz',
      imageRight: false,
      features: [
        { icon: 'Snowflake', title: 'Präzise Streubreite', text: 'Einstellbare Streubreite für optimale Salzverteilung auf jeder Strassenbreite.' },
        { icon: 'Settings', title: 'Edelstahl-Konstruktion', text: 'Langlebige Edelstahlkomponenten für jahrelanges zuverlässiges Arbeiten im Salzeinsatz.' },
        { icon: 'Wrench', title: 'Einfache Wartung', text: 'Servicefreundliche Konstruktion für schnelle Wartung und minimale Ausfallzeiten.' },
      ],
    },
    {
      type: 'tech',
      badge: 'Streuer-Technik',
      headline: 'Professionelle Streuer-Technologie',
      body: 'Envitec bietet Streugeräte für alle Trägerfahrzeuge — von Kleinstreuern für Fussgänger bis zu Grossstreuern für Kommunalfahrzeuge. Alle Modelle sind TÜV-geprüft und entsprechen den Anforderungen des professionellen Winterdienstes in der Schweiz.',
      specs: [
        { label: 'Streumaterial', value: 'Salz, Sand, Splitt' },
        { label: 'Behältervolumen', value: 'variabel je Modell' },
        { label: 'Streubreite', value: 'einstellbar' },
        { label: 'Prüfung', value: 'TÜV-zertifiziert' },
      ],
      features: [],
    },
  ],

  springer: [
    {
      type: 'innovation',
      badge: 'Hochleistung',
      headline: 'Springer Hochleistungsstreuer — Maximale Leistung im Winterdienst',
      body: 'Springer Hochleistungsstreuer sind speziell für den anspruchsvollen kommunalen Winterdienst entwickelt. Mit grossen Volumina, präziser Elektronik und robuster Mechanik sorgen Springer-Geräte für effizientes und gleichmässiges Streuen — auch bei extremen Winterbedingungen.',
      image: '/images/brand-sections/springer/salt-truck.jpg',
      imageAlt: 'Salzstreuer-LKW im kommunalen Winterdienst',
      imageRight: false,
      features: [
        { icon: 'Snowflake', title: 'Hochleistungs-Streuwerk', text: 'Optimiertes Streuwerk für gleichmässige Salz- und Splittverteilung auch bei grosser Arbeitsbreite.' },
        { icon: 'Settings', title: 'Elektronische Steuerung', text: 'Präzise elektronische Mengendosierung für optimalen Salzverbrauch und maximale Effizienz.' },
        { icon: 'Wrench', title: 'Kommunal-Standard', text: 'Entwickelt nach Anforderungen kommunaler Betriebe — zuverlässig und langlebig.' },
      ],
    },
  ],

  stema: [
    {
      type: 'innovation',
      badge: 'Einachser',
      headline: 'Stema Einachser — Vielseitig im Einsatz',
      body: 'Stema Einachser und Motorgeräte sind universell einsetzbare Kraftpakete für Garten, Landwirtschaft und Kommunalbetrieb. Mit dem bewährten Motorgeräte-Konzept, robusten Anbaugeräten und einfacher Bedienung sind Stema-Maschinen die verlässliche Arbeitsgrundlage für viele Einsatzbereiche.',
      image: '/images/brand-sections/stema/tractor.jpg',
      imageAlt: 'Einachser mit Anhänger in der Landwirtschaft',
      imageRight: false,
      features: [
        { icon: 'Settings', title: 'Universeller Einsatz', text: 'Von Bodenfräsen über Häcksler bis zu Pumpen — Stema-Einachser sind für alles gerüstet.' },
        { icon: 'Wrench', title: 'Robust & langlebig', text: 'Solide Verarbeitung und hochwertige Komponenten für jahrelangen zuverlässigen Betrieb.' },
        { icon: 'Package', title: 'Anbaugeräte-Vielfalt', text: 'Breites Sortiment an kompatiblen Anbaugeräten für alle Jahreszeiten und Aufgaben.' },
      ],
    },
  ],

  mulchy: [
    {
      type: 'innovation',
      badge: 'Mulchtechnik',
      headline: 'Mulchy Mulchgeräte — Effiziente Vegetationspflege',
      body: 'Mulchy Mulchgeräte sind die professionelle Lösung für Böschungspflege, Strassenrandpflege und Vegetationsmanagement. Mit leistungsstarken Mulchköpfen, robusten Rotoren und vielfältigen Anbauvarianten bieten Mulchy-Geräte optimale Ergebnisse in anspruchsvollsten Pflegesituationen.',
      image: '/images/brand-sections/mulchy/sweeper.jpg',
      imageAlt: 'Trägerfahrzeug mit Mulch-Anbaugerät',
      imageRight: false,
      features: [
        { icon: 'Leaf', title: 'Effizientes Mulchen', text: 'Vegetation wird gemulcht und direkt als Dünger auf der Fläche verteilt — natürlich und bodenschonend.' },
        { icon: 'Settings', title: 'Profi-Rotortechnik', text: 'Hochwertige Rotorblätter für sauberes und gleichmässiges Mulchergebnis auch bei starkem Bewuchs.' },
        { icon: 'Wrench', title: 'Anbau-Flexibilität', text: 'Kompatibel mit verschiedenen Trägern für maximale Einsatzflexibilität.' },
      ],
    },
  ],

  'gianni-ferrari': [
    {
      type: 'heritage',
      badge: 'Seit 1966',
      headline: 'Gianni Ferrari — Italiens Spitzenmäher-Tradition',
      body: 'Gianni Ferrari wurde 1966 in der Emilia-Romagna, Italien gegründet und ist seither Spezialist für hochwertige Frontkopf-Rasenmäher und Turf-Mäher. Die Polo- und GT-Modelle gelten als Massstab für professionelle Rasenpflege auf Sportanlagen, Golf-Fairways und Parkanlagen.',
      image: '/images/brand-sections/gianni-ferrari/mower.jpg',
      imageAlt: 'Professionelle Rasenmäher auf Golf-Fairway',
      milestones: [
        { year: '1966', text: 'Gründung Gianni Ferrari in der Emilia-Romagna, Italien' },
        { year: '1975', text: 'Einführung des ersten Frontkopf-Mähers — Markenzeichen' },
        { year: '1990', text: 'Polo-Serie: Benchmark für Profi-Rasenmäher' },
        { year: '2005', text: 'GT-Serie: Höchstleistung für Sportrasen und Golf' },
        { year: '2024', text: 'Neue GT-Generation mit verbesserter Schnittqualität' },
      ],
    },
    {
      type: 'tech',
      badge: 'Frontkopf-System',
      headline: 'Frontkopf-Technologie — Der Gianni Ferrari Unterschied',
      body: 'Das Gianni Ferrari Frontkopf-System positioniert das Mähwerk vorne für optimale Sicht und maximale Manövrierbarkeit. Das Ergebnis: gleichmässiger Schnitt auch an Hindernissen, Bäumen und Rasenrändern — für professionelle Ergebnisse in jedem Garten.',
      specs: [
        { label: 'System', value: 'Frontkopf-Mähwerk' },
        { label: 'Modelle', value: 'Polo, GT, Record' },
        { label: 'Schnitthöhe', value: '25 – 100 mm' },
        { label: 'Herkunft', value: 'Emilia-Romagna, Italien' },
      ],
      features: [],
    },
  ],

  wabco: [
    {
      type: 'tech',
      badge: 'Sicherheitstechnik',
      headline: 'WABCO — Weltführer in Bremssteuerungs-Technologie',
      body: 'WABCO (heute Teil der ZF-Gruppe) ist der weltweit führende Anbieter von Brems- und Fahrerassistenzsystemen für Nutzfahrzeuge. Das TEBS (Trailer Electronic Braking System) von WABCO ist der globale Standard für elektronische Anhänger-Bremssysteme — mit über 10 Millionen installierten Einheiten.',
      image: '/images/brand-sections/wabco/abs-system.jpg',
      imageAlt: 'Elektronisches Bremssystem Hydraulik-Steuereinheit',
      specs: [
        { label: 'TEBS-Einheiten', value: '10 Mio. + weltweit' },
        { label: 'Gegründet', value: '1869 in New York' },
        { label: 'ZF-Integration', value: 'Seit 2020' },
        { label: 'Einsatz', value: 'Alle Nutzfahrzeug-Typen' },
      ],
      features: [],
    },
    {
      type: 'innovation',
      badge: 'OnGuard',
      headline: 'OnGuard — Intelligente Kollisionsvermeidung',
      body: 'Das WABCO OnGuard-System ist eines der fortschrittlichsten Kollisionsvermeidungssysteme für Nutzfahrzeuge. Mit Radar-Sensor, automatischem Notbremsen und Fahrer-Warnungen verhindert OnGuard Auffahrunfälle — und rettet Leben auf Schweizer Strassen.',
      imageRight: true,
      features: [
        { icon: 'ShieldCheck', title: 'Automatisches Notbremsen', text: 'OnGuard erkennt drohende Kollisionen und leitet automatisch Notbremsungen ein.' },
        { icon: 'Activity', title: 'Radar-Sensor 250 m', text: 'Hochpräziser Radarsensor erfasst vorausfahrende Fahrzeuge bis 250 m Distanz.' },
        { icon: 'Users', title: 'Fahrer-Warnsystem', text: 'Akustische und visuelle Warnung bei zu kleinem Sicherheitsabstand.' },
      ],
    },
  ],

}
