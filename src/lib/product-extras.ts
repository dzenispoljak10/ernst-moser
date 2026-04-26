/**
 * Zusatz-Sections für Produkt-Detailseiten.
 *
 * Pro Produkt-Slug optional bis zu 2 Sections + optionales Produkt-Video.
 * Wird nur befüllt, wenn wir verifizierte Hersteller-Infos haben.
 * Marken/Produkte ohne Eintrag bekommen keine Zusatz-Sections.
 *
 * Section-Typen:
 *   - applications  : Einsatzbereiche-Grid (icon + label + text)
 *   - highlights    : Was-zeichnet-aus-Karten (icon + title + body)
 *   - techDetail    : Erweiterte Spec-Tabelle (label + value)
 */

export type IconName =
  | 'Truck' | 'Package' | 'Zap' | 'Gauge' | 'Settings' | 'Wrench'
  | 'Snowflake' | 'Wind' | 'Mountain' | 'Leaf' | 'Sparkles' | 'Recycle'
  | 'Droplets' | 'Hammer' | 'Building2' | 'Trees' | 'Users' | 'Ruler'
  | 'Battery' | 'Cpu' | 'Radar' | 'ShieldCheck' | 'Award' | 'Globe'
  | 'Factory' | 'Coffee' | 'Hotel' | 'ShoppingCart' | 'Bot' | 'MapPin'
  | 'Timer' | 'Volume2' | 'Sun' | 'Moon' | 'CloudRain' | 'Wifi'

export interface ApplicationsSection {
  type: 'applications'
  eyebrow: string
  heading: string
  intro?: string
  items: Array<{ icon: IconName; label: string; text: string }>
}

export interface HighlightsSection {
  type: 'highlights'
  eyebrow: string
  heading: string
  intro?: string
  items: Array<{ icon: IconName; title: string; body: string }>
}

export interface TechDetailSection {
  type: 'techDetail'
  eyebrow: string
  heading: string
  intro?: string
  rows: Array<{ label: string; value: string }>
}

export type ExtraSection = ApplicationsSection | HighlightsSection | TechDetailSection

export interface ProductExtras {
  /** 1–2 Sections, die nach der Hero-CTA-Section gerendert werden */
  sections: ExtraSection[]
  /** Optionales offizielles Produkt-Video (YouTube-ID) */
  video?: {
    youtubeId: string
    title?: string
    caption?: string
  }
}

// ──────────────────────────────────────────────────────────────────
// Datenpool — nur verifizierte Hersteller-Infos.
// Quellen pro Eintrag: scania.com, piaggio.com, isuzu, hako.com,
// pudutech.com, segway.com, stihl.ch, fiat-professional, kubota.de.
// ──────────────────────────────────────────────────────────────────

export const PRODUCT_EXTRAS: Record<string, ProductExtras> = {

  // ═══════════════════════════════════════════════════════════════
  // SCANIA — Nutzfahrzeugcenter
  // Quelle: scania.com (Truck-Range)
  // ═══════════════════════════════════════════════════════════════
  'scania-l-baureihe': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Scania L-Baureihe gebaut ist',
        intro: 'Die L-Baureihe ist Scanias Spezialist für den urbanen Verteilerverkehr — niedrig im Einstieg, übersichtlich, ideal für Stop-and-Go.',
        items: [
          { icon: 'ShoppingCart', label: 'City-Distribution', text: 'Lebensmittellogistik, Paketdienste, Getränketransport im urbanen Raum.' },
          { icon: 'Recycle', label: 'Kommunaldienst', text: 'Müllsammlung, Strassenreinigung, Winterdienst — niedriger Einstieg für häufige Aus- und Einstiege.' },
          { icon: 'Building2', label: 'Baulogistik', text: 'Materialzulieferung in Stadtzentren mit eingeschränkter Höhe und engen Strassen.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'L-Baureihe Highlights',
        heading: 'Was die L-Baureihe auszeichnet',
        items: [
          { icon: 'Ruler', title: 'Tiefer Einstieg', body: 'Niedrigste Cab-Bauhöhe der Scania-Familie — bis zu 30 Mal pro Schicht ein- und aussteigen ohne Belastung.' },
          { icon: 'Radar', title: 'Volle Sicht', body: 'Tiefes Frontfenster und grosse Beifahrertür-Fenster für maximale Sicht auf Radfahrer und Fussgänger.' },
          { icon: 'Zap', title: 'Hybrid & Gas', body: 'Verfügbar als Plug-in-Hybrid sowie für Biogas/CNG — ideal für emissionsarme Innenstadt-Zonen.' },
        ],
      },
    ],
  },

  'scania-p-baureihe': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Scania P-Baureihe gebaut ist',
        intro: 'Der vielseitige Allrounder der Scania-Familie — kompakt genug für die Stadt, robust genug für die Baustelle.',
        items: [
          { icon: 'Truck', label: 'Verteilerverkehr', text: 'Regionale Distribution, mittellange Strecken, häufige Stopps.' },
          { icon: 'Building2', label: 'Bau & Kipper', text: 'Kipper-, Beton- und Tieflader-Aufbauten für die Baustelle.' },
          { icon: 'Recycle', label: 'Spezialaufbauten', text: 'Müllpresse, Strassenreinigung, Spülfahrzeuge — die richtige Plattform für jeden Aufbau.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'P-Baureihe Highlights',
        heading: 'Was die P-Baureihe auszeichnet',
        items: [
          { icon: 'Settings', title: 'Modulare Plattform', body: 'Über 10 Kabinenvarianten, vier Achskonfigurationen — anpassbar für jeden Einsatz.' },
          { icon: 'Gauge', title: 'Effiziente Antriebe', body: '7- bis 13-Liter-Motoren mit Scania-Driver-Support — bis zu 5 % Treibstoffersparnis.' },
          { icon: 'ShieldCheck', title: 'Top Sicherheit', body: 'AEB, Spurassistent, Adaptive Cruise Control, optional Side-Detection für Lkw mit Reifenpression.' },
        ],
      },
    ],
    video: {
      youtubeId: 'J-p_dK1h-iQ',
      title: 'Scania – Driving the shift',
      caption: 'Innovation in Aktion: nachhaltige Antriebe für moderne Schwerverkehre.',
    },
  },

  'scania-r-baureihe': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Scania R-Baureihe gebaut ist',
        intro: 'Die R-Baureihe ist Scanias Long-Haul-Workhorse — der Truck, mit dem Profi-Fahrer Europa durchqueren.',
        items: [
          { icon: 'Globe', label: 'Fernverkehr Europa', text: 'Tausende Kilometer pro Woche, höchste Anforderungen an Komfort und Effizienz.' },
          { icon: 'Package', label: 'Schwerlast & Tank', text: 'Schwerlast-, Tank- und Silotransport mit bis zu 60 t Zuggewicht.' },
          { icon: 'Truck', label: 'Sattelzug', text: 'Klassischer Sattelzug-Einsatz mit dem berühmten Scania V8 für höchste Performance.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'R-Baureihe Highlights',
        heading: 'Was die R-Baureihe auszeichnet',
        items: [
          { icon: 'Hotel', title: 'Premium-Kabine', body: 'Stehhöhe in der Highline-Kabine, separater Schlafbereich, Fernfahrer-zertifizierte Ergonomie.' },
          { icon: 'Battery', title: 'Bewährter V8', body: 'Bis 770 PS aus dem legendären Scania-V8 — höchste Leistung in der Klasse.' },
          { icon: 'Cpu', title: 'Smart Connectivity', body: 'Scania Driver Coaching, Predictive Maintenance, OptiCruise — Effizienz in Echtzeit.' },
        ],
      },
    ],
  },

  'scania-s-baureihe': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Scania S-Baureihe gebaut ist',
        intro: 'Die S-Baureihe ist Scanias Flaggschiff — flacher Boden, maximale Stehhöhe, der Truck für den anspruchsvollsten Fernverkehr.',
        items: [
          { icon: 'Globe', label: 'Premium-Fernverkehr', text: 'Internationale Long-Haul-Touren mit höchstem Anspruch an Wohnkomfort.' },
          { icon: 'Award', label: 'Repräsentations-Fuhrpark', text: 'Showtruck-Qualität: maximaler Markenwert auf der Strasse, Premium-Fahrer-Wertschätzung.' },
          { icon: 'Truck', label: 'Speditions-Allrounder', text: 'Komplexe Logistik-Routen mit hohen Servicestandards und Fahrer-Bindung.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'S-Baureihe Highlights',
        heading: 'Was die S-Baureihe auszeichnet',
        items: [
          { icon: 'Ruler', title: 'Flacher Boden', body: 'Komplett flacher Kabinenboden für volle Stehhöhe und maximalen Bewegungsraum.' },
          { icon: 'Hotel', title: 'Premium Interior', body: 'Premium-Sitze, Klimakomfort, Schlafkabine mit Hotelqualität — der Fernfahrer-Traum.' },
          { icon: 'Sparkles', title: 'International Truck of the Year', body: 'Mehrfach ausgezeichnet — Branchenstandard für Premium-Fernverkehrslösungen.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PIAGGIO — Nutzfahrzeugcenter
  // Quelle: commercial.piaggio.com
  // ═══════════════════════════════════════════════════════════════
  'piaggio-porter-np6-chassis-einzelbereifung': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Porter NP6 Chassis gebaut ist',
        intro: 'Die Chassis-Variante des Porter NP6 ist die universelle Plattform für individuelle Aufbauten — kompakt, vielseitig, road-zugelassen.',
        items: [
          { icon: 'Building2', label: 'Kommunaldienst', text: 'Strassenreinigung, kleinere Wartungs- und Reparaturfahrzeuge der Gemeinde.' },
          { icon: 'Trees', label: 'Garten- & Landschaftsbau', text: 'Werkzeug- und Materialtransport, Baumkronenpflege mit Hubarbeitsbühnen-Aufbau.' },
          { icon: 'Hammer', label: 'Handwerker-Aufbauten', text: 'Pritsche, Box, Werkstattfahrzeug, Kühltransport — flexibel ausbaubar.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Porter NP6 Highlights',
        heading: 'Was den Porter NP6 auszeichnet',
        items: [
          { icon: 'Ruler', title: 'Kompakt & wendig', body: '1,52 m Aussenbreite, 8,8 m Wendekreis — passt in fast jede Stadtlücke.' },
          { icon: 'Zap', title: 'Multi-Fuel', body: 'Verfügbar als Benziner, Bi-Fuel LPG/CNG — auch für Umweltzonen geeignet.' },
          { icon: 'Truck', title: 'Bis 1’000 kg Nutzlast', body: 'Hohe Nutzlast bei kompakter Bauweise — der Stadt-Profi für jedes Gewerbe.' },
        ],
      },
    ],
    video: {
      youtubeId: 'J-vq0wKCHMw',
      title: 'Piaggio Porter NP6 — Der CityTruck',
      caption: 'Die neue Generation des italienischen City-Allrounders im Detail.',
    },
  },

  'piaggio-porter-np6-chassis-zwillingsbereifung': {
    sections: [
      {
        type: 'highlights',
        eyebrow: 'Porter NP6 Zwillingsbereifung',
        heading: 'Was die Zwillingsbereifung bringt',
        items: [
          { icon: 'Truck', title: 'Höhere Nutzlast', body: 'Doppelt bereifte Hinterachse erlaubt grössere Aufbauten und höhere Lasten.' },
          { icon: 'ShieldCheck', title: 'Bessere Stabilität', body: 'Ideal bei Kipper-Aufbau und Spezialfahrzeugen mit Schwerpunkt im Heck.' },
          { icon: 'Mountain', title: 'Geländegängiger', body: 'Mehr Traktion auf Baustellen, Feldwegen und unbefestigtem Untergrund.' },
        ],
      },
    ],
  },

  'piaggio-porter-npe-chassis-einzelbereifung': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Porter NPE Chassis gebaut ist',
        intro: 'Der vollelektrische Porter NPE ist die emissionsfreie Antwort für innerstädtische Logistik und Kommunaldienste.',
        items: [
          { icon: 'Leaf', label: 'Emissionsfreie Zonen', text: 'Uneingeschränkter Zugang zu Umweltzonen, Stadtkernen und sensiblen Bereichen.' },
          { icon: 'Building2', label: 'Kommunale Flotten', text: 'Müllsammlung, Wartung, Reinigung — leise und CO₂-neutral.' },
          { icon: 'ShoppingCart', label: 'Last-Mile Delivery', text: 'Optimiert für die letzte Meile in dichten Stadtgebieten.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Porter NPE Highlights',
        heading: 'Was den vollelektrischen Porter auszeichnet',
        items: [
          { icon: 'Battery', title: 'Bis 110 km Reichweite', body: 'WLTP-City-Reichweite bis 110 km — perfekt für Tagesrouten in der Stadt.' },
          { icon: 'Volume2', title: 'Lautlos', body: 'Leiser Elektroantrieb für Frühschichten in Wohngebieten und Innenhöfe.' },
          { icon: 'Zap', title: 'Schnelles Laden', body: 'AC-Laden über Nacht oder schnelles Aufladen über CCS-Ladepunkte.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ISUZU — Nutzfahrzeugcenter
  // Quelle: isuzu.de + isuzuv.com
  // ═══════════════════════════════════════════════════════════════
  'isuzu-d-max': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Isuzu D-Max gebaut ist',
        intro: 'Der D-Max ist Isuzus harter Pickup — gebaut für Arbeit, Gelände und Schweizer Bergstrassen gleichermassen.',
        items: [
          { icon: 'Hammer', label: 'Bau & Handwerk', text: 'Werkzeugtransport, Material zur Baustelle, robuste Ladefläche für Schmutzeinsatz.' },
          { icon: 'Mountain', label: 'Off-Road', text: 'Permanenter 4WD, Differenzialsperre, 800 mm Wattiefe — unaufhaltsam im Gelände.' },
          { icon: 'Truck', label: 'Anhängerbetrieb', text: 'Bis 3,5 t Anhängelast — perfekt für Bootstrailer, Pferdetransport, Baumaterial.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'D-Max Highlights',
        heading: 'Was den D-Max auszeichnet',
        items: [
          { icon: 'ShieldCheck', title: '5 Jahre Garantie', body: 'Isuzus Vertrauen in den D-Max — 5 Jahre / 200’000 km Werksgarantie.' },
          { icon: 'Cpu', title: 'ADAS Assistenz-Paket', body: 'Notbrems-, Spurhalte-, Verkehrszeichen-Erkennung — moderne Sicherheit serienmässig.' },
          { icon: 'Battery', title: '1,9 l BluePower-Diesel', body: 'Effizienter 1,9 l Diesel mit 164 PS und 360 Nm — Zugkraft trifft Verbrauch.' },
        ],
      },
    ],
    video: {
      youtubeId: 'yG04GnJ-oVM',
      title: 'Isuzu D-Max V-Cross 2026',
      caption: 'Die neue Generation des D-Max im Detail-Check.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // HAKO — Kommunalcenter
  // Quelle: hako.com
  // ═══════════════════════════════════════════════════════════════
  'hako-citymaster-1600': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Hako Citymaster gebaut ist',
        intro: 'Der Citymaster ist die Antwort auf städtische Reinigungsaufgaben — kompakt, leise und multifunktional.',
        items: [
          { icon: 'Building2', label: 'Innenstadt-Reinigung', text: 'Fussgängerzonen, Plätze, enge Gassen — überall, wo grosse Maschinen nicht hinkommen.' },
          { icon: 'Snowflake', label: 'Winterdienst', text: 'Mit Schneepflug, Streuer und Salzsole-System auch im Winter im Einsatz.' },
          { icon: 'Trees', label: 'Grünflächenpflege', text: 'Dank Anbaugeräten ganzjährig nutzbar für Mähen, Laub und Pflege.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Citymaster Highlights',
        heading: 'Was den Citymaster auszeichnet',
        items: [
          { icon: 'Volume2', title: 'AGR-Qualitätssiegel', body: 'Einzige Kommunalmaschine mit AGR-Auszeichnung für rückenfreundliches Arbeiten.' },
          { icon: 'Recycle', title: 'Multifunktional', body: 'Saugkehrmaschine, Winterdienst, Mähen — eine Plattform für 12 Monate Einsatz.' },
          { icon: 'ShieldCheck', title: 'PKW-Führerschein', body: '3,5-t-Klasse — fahrbar mit Kategorie B, einsetzbar in Tag- und Nachtschichten.' },
        ],
      },
    ],
    video: {
      youtubeId: 'TE5N19BK3eo',
      title: 'Hako Citymaster 1650 im Einsatz',
      caption: 'Die multifunktionale Saugkehrmaschine in der professionellen Stadtreinigung.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PUDU ROBOTICS — Motorgerätecenter
  // Quelle: pudutech.com
  // ═══════════════════════════════════════════════════════════════
  'pudu-bellabot': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür BellaBot gebaut ist',
        intro: 'BellaBot ist Pudus charmanter Servier-Roboter — der Star in Restaurants, Hotels und Pflegeheimen weltweit.',
        items: [
          { icon: 'Coffee', label: 'Restaurants', text: 'Speisen vom Pass zum Tisch, Geschirr-Rückläufe — entlastet Servicekräfte spürbar.' },
          { icon: 'Hotel', label: 'Hotels', text: 'Roomservice, Buffet-Logistik und Begrüssungs-Animation für Gäste.' },
          { icon: 'Users', label: 'Pflege & Senioren', text: 'Mahlzeiten- und Medikamentendistribution mit freundlicher Mensch-Maschine-Interaktion.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'BellaBot Highlights',
        heading: 'Was BellaBot auszeichnet',
        items: [
          { icon: 'Bot', title: 'Charme-Faktor', body: 'Katzen-Gesicht-Display, sanfte Bewegungen, Streichel-Reaktion — Gäste lieben ihn.' },
          { icon: 'Package', title: '4 Tabletts à 10 kg', body: 'Bis zu 40 kg Tragelast pro Fahrt, 4 separate Ebenen für gleichzeitige Mehrtisch-Service.' },
          { icon: 'Radar', title: 'SLAM-Navigation', body: 'PUDU-eigene SLAM-Technologie — präzise Routen, sichere Mensch-Erkennung.' },
        ],
      },
    ],
    video: {
      youtubeId: 'z-WcJTlnaP4',
      title: 'BellaBot Official Commercial',
      caption: 'Der charmante Servier-Roboter, der Gastronomie weltweit verändert.',
    },
  },

  'pudu-kettybot': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür KettyBot Pro gebaut ist',
        intro: 'KettyBot Pro ist der schmale Servier- und Werbe-Roboter — perfekt für enge Restaurants und Empfangs-Szenarien.',
        items: [
          { icon: 'Coffee', label: 'Schmale Restaurants', text: 'Nur 53 cm Breite — passt durch enge Tisch-Gänge und kleine Servierwege.' },
          { icon: 'Hotel', label: 'Empfang & Gästeführung', text: '"Follow Me"-Modus führt Gäste zum Tisch, Display für Werbung und Begrüssung.' },
          { icon: 'ShoppingCart', label: 'Einzelhandel', text: 'Verkaufs-Promotion direkt am Kunden via integrierter 18,5-Zoll-Werbedisplay.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'KettyBot Pro Highlights',
        heading: 'Was KettyBot Pro auszeichnet',
        items: [
          { icon: 'Ruler', title: 'Schmal & wendig', body: 'Nur 53 cm Breite mit dynamischer Hinderniserkennung in 360°.' },
          { icon: 'Sparkles', title: 'Eingebauter Bildschirm', body: '18,5-Zoll-Display für Speisekarten, Promotion oder Begrüssungs-Animationen.' },
          { icon: 'Cpu', title: 'PUDU SLAM 3.0', body: 'Neueste Navigationsgeneration — schnellere Reaktion in dynamischen Umgebungen.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SEGWAY NAVIMOW — Motorgerätecenter
  // Quelle: navimow.segway.com
  // ═══════════════════════════════════════════════════════════════
  'segway-navimow-h-series': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Navimow H-Serie gebaut ist',
        intro: 'Die H-Serie ist Segways Mähroboter ohne Begrenzungsdraht — RTK-präzise für mittlere bis grosse Privatgärten.',
        items: [
          { icon: 'Trees', label: 'Privatgärten', text: 'Hausgärten von 800 m² bis 5 000 m² — mit RTK auf den Zentimeter genau gemäht.' },
          { icon: 'Building2', label: 'Mehrfamilien-Anlagen', text: 'Gemeinschaftsflächen, Innenhöfe und Vorgärten — wartungsfrei automatisiert.' },
          { icon: 'Award', label: 'Anspruchsvolle Rasen', text: 'Englische Rasen, Sportrasen und Repräsentationsflächen mit gleichmässigem Schnittbild.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Navimow H Highlights',
        heading: 'Was die H-Serie auszeichnet',
        items: [
          { icon: 'Radar', title: 'EFLS 2.0 RTK', body: 'Drahtfreie Navigation per RTK-GPS — millimetergenau ohne Begrenzungskabel-Verlegung.' },
          { icon: 'Wifi', title: 'App-Steuerung', body: 'Routen, Mähpläne und Live-Tracking direkt vom Smartphone — von überall.' },
          { icon: 'CloudRain', title: 'Wetter-Adaption', body: 'Regensensor und intelligente Mähplan-Anpassung an Wetter und Wachstum.' },
        ],
      },
    ],
    video: {
      youtubeId: 'GzHaG_UUIjM',
      title: 'Segway Navimow — Das ist Mährobotik',
      caption: 'Die nächste Generation drahtfreier Mähroboter im Detail.',
    },
  },

  'segway-navimow-x-series': {
    sections: [
      {
        type: 'highlights',
        eyebrow: 'Navimow X Highlights',
        heading: 'Was die X-Serie als Profi-Modell auszeichnet',
        intro: 'Die X-Serie ist Segways Top-Modell für sehr grosse, anspruchsvolle Flächen.',
        items: [
          { icon: 'Radar', title: '360°-Vision', body: 'Vision-Kamera mit KI-Hinderniserkennung — erkennt Tiere, Spielzeug und Gartenmöbel zuverlässig.' },
          { icon: 'Mountain', title: 'Steigfähigkeit', body: 'Bis 45 % Steigung — auch hügelige Grundstücke werden zuverlässig gemäht.' },
          { icon: 'Cpu', title: 'KI-Routing', body: 'Lernfähige Routenplanung optimiert mit jedem Mähvorgang Effizienz und Schnittbild.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KUBOTA — Kommunalcenter (Aufsitzmäher)
  // Quelle: kdg.kubota-eu.com
  // ═══════════════════════════════════════════════════════════════
  'kubota-z4-serie': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür die Kubota Z4-Serie gebaut ist',
        intro: 'Die Z4-Serie ist Kubotas Premium-Zero-Turn-Linie — präziser Schnitt für anspruchsvolle Profis und exklusive Privatkunden.',
        items: [
          { icon: 'Trees', label: 'Grosse Privatanlagen', text: 'Repräsentations-Rasen mit höchstem Schnittbild-Anspruch.' },
          { icon: 'Building2', label: 'Hotellerie & Resorts', text: 'Repräsentationsflächen mit grosser Mähleistung pro Stunde.' },
          { icon: 'Award', label: 'Sportplätze', text: 'Golfclubs, Sportplätze und Parks mit höchsten Anforderungen an Schnittqualität.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Z4-Serie Highlights',
        heading: 'Was die Z4-Serie auszeichnet',
        items: [
          { icon: 'Gauge', title: 'Null-Wenderadius', body: 'Echter Zero-Turn — wendet auf der Stelle, kein Hin- und Herrangieren.' },
          { icon: 'Sparkles', title: 'Pro Commercial Deck', body: 'Robustes 5-mm-Stahl-Mähdeck für gleichmässigen Schnitt auch unter härtester Belastung.' },
          { icon: 'Battery', title: 'Kubota-Diesel', body: 'Hauseigene Kubota-Dieselmotoren — sparsam, langlebig und drehmomentstark.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ALKÈ — Kommunalcenter (Elektro-Nutzfahrzeuge)
  // Quelle: alke.com
  // ═══════════════════════════════════════════════════════════════
  'alke-atx-440m': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Alkè ATX 440M gebaut ist',
        intro: 'Der ATX 440M ist Alkès Bestseller — ein vollelektrisches Profi-Nutzfahrzeug mit Strassenzulassung der Kategorie N1.',
        items: [
          { icon: 'Building2', label: 'Werkhöfe', text: 'Werkstoff-, Werkzeug- und Personentransport auf Industrie- und Werkhof-Geländen.' },
          { icon: 'Recycle', label: 'Kommunaldienst', text: 'Strassenreinigung, Grünflächenpflege, Müll- und Wertstoffsammlung.' },
          { icon: 'Hotel', label: 'Resorts & Campus', text: 'Hotels, Universitätsgelände, Industrieparks — leiser, emissionsfreier Service.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'ATX 440M Highlights',
        heading: 'Was den ATX 440M auszeichnet',
        items: [
          { icon: 'Truck', title: '1’540 kg Nutzlast', body: 'Hohe Zuladung in der N1-Klasse — ideal für schwere Werkstoff- und Materialtransporte.' },
          { icon: 'Battery', title: 'Vollelektrisch', body: 'Lithium-Eisen-Phosphat-Batterie mit bis zu 200 km Reichweite (NEDC).' },
          { icon: 'ShieldCheck', title: 'EU-Strassenzulassung', body: 'Kategorie N1 — uneingeschränkter Strasseneinsatz wie ein klassischer Transporter.' },
        ],
      },
    ],
    video: {
      youtubeId: 'ObfN5N54SbI',
      title: 'Alkè ATX4 — Goodbye traditional vans',
      caption: 'Vollelektrische Profi-Nutzfahrzeuge der nächsten Generation.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // SWARDMAN — Motorgerätecenter (Spindelmäher)
  // Quelle: swardman.com
  // ═══════════════════════════════════════════════════════════════
  'swardman-swardman-edwin-2-1-45': {
    sections: [
      {
        type: 'applications',
        eyebrow: 'Einsatzbereiche',
        heading: 'Wofür der Swardman Edwin gebaut ist',
        intro: 'Edwin ist der Premium-Spindelmäher aus Tschechien — gebaut für Liebhaber des perfekten Rasens.',
        items: [
          { icon: 'Award', label: 'English Lawn', text: 'Klassischer englischer Rasen mit messerscharfen Schnittlinien und tiefem Grün.' },
          { icon: 'Trees', label: 'Sportrasen', text: 'Cricket-, Tennis- und Bowling-Greens mit professionellem Schnittbild.' },
          { icon: 'Building2', label: 'Repräsentationsflächen', text: 'Schloss-, Park- und Villengärten mit höchstem ästhetischem Anspruch.' },
        ],
      },
      {
        type: 'highlights',
        eyebrow: 'Edwin Highlights',
        heading: 'Was Edwin als Premium-Spindelmäher auszeichnet',
        items: [
          { icon: 'Wrench', title: 'Modulare Mähkassetten', body: 'Wechselbare Kassetten für Mähen, Vertikutieren, Bürsten und Walzen — 4-in-1-Maschine.' },
          { icon: 'Ruler', title: '45 cm Schnittbreite', body: 'Optimale Balance aus Wendigkeit und Effizienz für mittlere Premium-Rasen.' },
          { icon: 'Hammer', title: 'Made in Czech Republic', body: 'Manufaktur-Qualität mit hochwertigen Materialien und Lebensdauer-Engineering.' },
        ],
      },
    ],
  },
}

// ═══════════════════════════════════════════════════════════════
// FIAT PROFESSIONAL — Nutzfahrzeugcenter
// Quelle: fiatprofessional.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['fiat-ducato'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Fiat Ducato gebaut ist',
      intro: 'Der meistverkaufte Transporter Europas — der Ducato ist seit über 40 Jahren das Rückgrat von Handwerk, Logistik und Reisemobilbau.',
      items: [
        { icon: 'Hammer', label: 'Handwerk', text: 'Werkstatt-, Werkzeug- und Materialtransport mit grossem Laderaum bis 17 m³.' },
        { icon: 'Package', label: 'Kurier & Logistik', text: 'Paket- und Lieferdienste mit hoher Nutzlast bis 2’100 kg in der 4,25-t-Klasse.' },
        { icon: 'Trees', label: 'Reisemobilbau', text: 'Plattform für 80 % aller Reisemobile in Europa — bewährte Basis für jedes Camper-Layout.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Ducato Highlights',
      heading: 'Was den Ducato auszeichnet',
      items: [
        { icon: 'Truck', title: '8 Karosserievarianten', body: 'Vom L1H1 bis L4H3 — die richtige Grösse für jeden Bedarf.' },
        { icon: 'Battery', title: 'Multijet 3 Diesel', body: 'Effiziente 2,2-l-Diesel mit 120–180 PS und bis zu 9-Gang-Automatik.' },
        { icon: 'Cpu', title: 'ADAS Level 2', body: 'Adaptive Cruise Control, Spurhalte- und Notbremsassistent — moderne Sicherheit serienmässig.' },
      ],
    },
  ],
  video: { youtubeId: 'pfCIqAG60pU', title: 'Fiat Professional — The Ant', caption: 'Die Ameise als Sinnbild für Stärke und Ausdauer.' },
}

PRODUCT_EXTRAS['fiat-e-ducato'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Fiat E-Ducato gebaut ist',
      intro: 'Die vollelektrische Version des meistverkauften Transporters — emissionsfrei, leise, mit unverändertem Laderaum.',
      items: [
        { icon: 'Leaf', label: 'Umweltzonen', text: 'Uneingeschränkter Zugang zu allen Stadtkernen und Low-Emission-Zonen.' },
        { icon: 'Building2', label: 'Stadt-Logistik', text: 'Last-Mile-Delivery, Wäscherei-Routen, Pharma-Transport mit Cold-Chain-Anforderungen.' },
        { icon: 'Volume2', label: 'Nachtbetrieb', text: 'Geräuscharme Auslieferung in Wohngebieten auch ausserhalb Geräuschsperrzeiten.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'E-Ducato Highlights',
      heading: 'Was den E-Ducato auszeichnet',
      items: [
        { icon: 'Battery', title: '110-kWh-Batterie', body: 'Bis 370 km WLTP-Reichweite — eine volle Tagesroute auch ohne Zwischenladung.' },
        { icon: 'Zap', title: 'Schnellladen 150 kW DC', body: 'In 55 Min. von 0 auf 80 % — passt in eine Mittagspause.' },
        { icon: 'Truck', title: 'Voller Laderaum', body: 'Identisches Volumen wie der Diesel-Ducato — keine Kompromisse beim Nutzraum.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['fiat-dobl'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Fiat Doblò gebaut ist',
      intro: 'Der kompakte City-Transporter — wendig, sparsam, mit überraschend grossem Laderaum für seine Klasse.',
      items: [
        { icon: 'ShoppingCart', label: 'City-Lieferdienste', text: 'Pakete, Lebensmittel, Wäsche — die letzte Meile in der Stadt mit minimalem Platzbedarf.' },
        { icon: 'Hammer', label: 'Service-Handwerk', text: 'Sanitär, Elektro, IT-Service — kompakt genug für Tiefgaragen, gross genug für Werkzeug.' },
        { icon: 'Users', label: 'Personentransport', text: 'Bis zu 7 Sitze in der Combi-Version — für Familien-Gewerbe und Fahrdienste.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Doblò Highlights',
      heading: 'Was den Doblò auszeichnet',
      items: [
        { icon: 'Ruler', title: 'Bis 4,4 m³ Laderaum', body: 'Klassenbestes Volumen in der Hochdach-Version — passt mehr rein als gedacht.' },
        { icon: 'Gauge', title: 'BlueHDi & E-Variante', body: 'Sparsamer 1,5-l-Diesel oder 100 % elektrisch als E-Doblò.' },
        { icon: 'ShieldCheck', title: 'Hill Descent Control', body: 'Standard-Sicherheitspaket mit Spurhalte-, Notbrems- und Müdigkeitsassistent.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['fiat-scudo'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Fiat Scudo gebaut ist',
      intro: 'Der mittlere Transporter im Fiat-Programm — die ideale Lücke zwischen kompaktem Doblò und grossem Ducato.',
      items: [
        { icon: 'Package', label: 'Mittlere Lieferdienste', text: 'Bis 1’450 kg Nutzlast und 6,6 m³ Laderaum — perfekt für Express- und Service-Logistik.' },
        { icon: 'Hammer', label: 'Profi-Handwerk', text: 'Mit Trennwand und Werkzeug-Setup ideal als Servicewagen für Elektriker, Sanitäre, Schlosser.' },
        { icon: 'Trees', label: 'Camping-Basis', text: 'Beliebte Basis für kompakte Campervan-Ausbauten in der 5-m-Klasse.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Scudo Highlights',
      heading: 'Was den Scudo auszeichnet',
      items: [
        { icon: 'Ruler', title: 'L2 oder L3', body: 'Zwei Längen — bis 6,6 m³ Volumen, bis 4 m Innenlänge bei umgeklappter Beifahrersitzlehne.' },
        { icon: 'Battery', title: 'Diesel oder Elektro', body: 'BlueHDi 100/145 oder vollelektrischer E-Scudo mit bis 350 km WLTP-Reichweite.' },
        { icon: 'Cpu', title: 'Magic Mirror', body: 'Digitales Spiegel-System ersetzt Trennwand-Sichtprobleme — sicher rückwärts rangieren.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['fiat-e-scudo'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'E-Scudo Highlights',
      heading: 'Was den E-Scudo auszeichnet',
      intro: 'Vollelektrische Variante des mittleren Fiat-Transporters — gleicher Laderaum, null Emissionen.',
      items: [
        { icon: 'Battery', title: 'Bis 350 km Reichweite', body: '75-kWh-Batterie mit WLTP-Reichweite bis 350 km — Tagestour ohne Zwischenstopp.' },
        { icon: 'Zap', title: 'DC-Schnellladen', body: '100 kW DC-Laden — von 0 auf 80 % in 45 Minuten.' },
        { icon: 'Truck', title: 'Identischer Laderaum', body: 'Bis 6,6 m³ Laderaum bleiben erhalten — Batterie unter dem Boden, kein Platzverlust.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// HAKO — Kommunalcenter (zusätzliche Produkte)
// Quelle: hako.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['hako-sweepmaster-650'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Hako Sweepmaster 650 gebaut ist',
      intro: 'Kompakte Handgeführte Kehrsaugmaschine — ideal für Innenflächen mit hartem Boden und Teppich.',
      items: [
        { icon: 'Building2', label: 'Verkaufsflächen', text: 'Supermärkte, Baumärkte, Lager — kraftvolles Kehren in engen Gängen.' },
        { icon: 'Hotel', label: 'Hotellerie', text: 'Lobbys, Konferenzbereiche, Parkhäuser — schnelle Reinigung mit Teppich-Kit.' },
        { icon: 'Factory', label: 'Industrie', text: 'Werkstätten, Lager, Produktionsbereiche mit Staub- und Schmutzbelastung.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Sweepmaster 650 Highlights',
      heading: 'Was den Sweepmaster 650 auszeichnet',
      items: [
        { icon: 'Gauge', title: '2’600–3’525 m²/h', body: 'Hohe Flächenleistung — mit Seitenbesen bis 3’525 m² pro Stunde reinigen.' },
        { icon: 'Battery', title: 'Akku oder Benzin', body: 'B650 elektrisch oder P650 mit Honda-Benzinmotor — flexibel je nach Einsatz.' },
        { icon: 'Sparkles', title: 'Optionales Carpet-Kit', body: 'Mit Teppich-Aufsatz wird der Sweepmaster zur sanften Teppichreinigungsmaschine.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['hako-hakomatic-b-450'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür die Hakomatic / Scrubmaster gebaut ist',
      intro: 'Aufsitz-Scheuersaugmaschinen für die professionelle Bodenreinigung in Hallen und grossen Innenflächen.',
      items: [
        { icon: 'Factory', label: 'Industriehallen', text: 'Produktion, Lager, Logistik-Drehkreuze mit täglich grossen zu reinigenden Flächen.' },
        { icon: 'Building2', label: 'Einkaufszentren', text: 'Mall-Bodenflächen, Eingangshallen, Tiefgarage-Reinigung in einer Tour.' },
        { icon: 'Hotel', label: 'Veranstaltungs-Locations', text: 'Messehallen, Sportarenen, Veranstaltungs-Foyers nach Events.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Scrubmaster Highlights',
      heading: 'Was die Scrubmaster auszeichnet',
      items: [
        { icon: 'Users', title: 'Ergonomischer Arbeitsplatz', body: 'Aufsitz-Position mit übersichtlicher Bedienung — ermüdungsarm auch bei Langzeiteinsatz.' },
        { icon: 'Recycle', title: 'AquaStop Pro', body: 'Hakos AquaStop reduziert Wasser- und Reinigungsmittelverbrauch deutlich.' },
        { icon: 'Battery', title: 'Lithium-Option', body: 'Modernste Lithium-Akku-Technologie für längere Laufzeit und schnelles Zwischenladen.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// PIAGGIO PORTER NPE — weitere Varianten
// Quelle: commercial.piaggio.com/de_DE/porter-npe
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['piaggio-porter-npe-pritsche-einzelbereifung'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Porter NPE Pritsche',
      heading: 'Was die elektrische Pritschen-Version auszeichnet',
      intro: 'Vollelektrische Pritsche für offenen Material- und Werkzeugtransport.',
      items: [
        { icon: 'Truck', title: 'Offene Pritsche', body: 'Schnelles Be- und Entladen, ideal für sperriges Material und Bauwerkzeug.' },
        { icon: 'Leaf', title: 'Lokal emissionsfrei', body: 'Ideal für Bauhöfe, Hotelresorts, Universitätscampus — leise und sauber.' },
        { icon: 'Battery', title: 'Bis 110 km WLTP-City', body: 'Genug Reichweite für eine volle Tagesroute auf dem Werksgelände.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['piaggio-porter-npe-heckkipper-einzelbereifung'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Porter NPE Heckkipper',
      heading: 'Was den elektrischen Heckkipper auszeichnet',
      intro: 'Vollelektrischer Mini-Kipper für Materialhandling auf Bauhöfen, Anlagen und Industriegelände.',
      items: [
        { icon: 'Hammer', title: 'Hydraulik-Kipper', body: 'Elektrohydraulisch betriebener Heckkipper für müheloses Abladen.' },
        { icon: 'Volume2', title: 'Leise Kipp-Aktion', body: 'Im Gegensatz zu Diesel-Pendants kein Motorenlärm beim Abkippen — auch nachts einsetzbar.' },
        { icon: 'Recycle', title: 'Werkhof-Logistik', body: 'Schutt, Erde, Splitt und Material — der Allrounder für die emissionsfreie Werkhof-Tour.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// PUDU ROBOTICS — Motorgerätecenter (weitere Modelle)
// Quelle: pudutech.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['pudu-flashbot'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der FlashBot Max gebaut ist',
      intro: 'FlashBot Max ist Pudus autonomer Lieferroboter — entwickelt für Hotels, Krankenhäuser und Bürogebäude.',
      items: [
        { icon: 'Hotel', label: 'Hotels', text: 'Roomservice, Amenity-Lieferungen und Empfangs-Aufgaben rund um die Uhr.' },
        { icon: 'Building2', label: 'Krankenhäuser', text: 'Medikamenten-, Proben- und Wäsche-Transport zwischen Stationen — kontaktfrei.' },
        { icon: 'Factory', label: 'Bürogebäude', text: 'Dokumenten- und Pakettransport in mehrstöckigen Bürotürmen mit Aufzug-Integration.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'FlashBot Max Highlights',
      heading: 'Was FlashBot Max auszeichnet',
      items: [
        { icon: 'Cpu', title: 'Aufzug-Integration', body: 'Selbstständige Bedienung von IoT-Aufzügen — keine menschliche Begleitung nötig.' },
        { icon: 'ShieldCheck', title: 'Sichere Auslieferung', body: 'Versperrtes Fach mit Authentifizierung — Pakete kommen nur beim richtigen Empfänger an.' },
        { icon: 'Radar', title: 'PUDU SLAM 3.0', body: 'Neueste Navigation für komplexe Mehrstockwerks-Umgebungen.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['pudu-pudubot'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'PuduBot 2 Highlights',
      heading: 'Was PuduBot 2 auszeichnet',
      intro: 'Der PuduBot 2 ist Pudus offener Servierroboter — gross dimensioniert für Tabletts und mehrere Service-Tische gleichzeitig.',
      items: [
        { icon: 'Package', title: 'Grosse Tablett-Fläche', body: 'Offene Auslieferung-Plattform für mehrere grosse Tabletts in einer Fahrt.' },
        { icon: 'Coffee', title: 'Restaurant-Allrounder', body: 'Grossraum-Restaurants, Buffets und Hotel-Speisesäle mit hohem Auslieferungsvolumen.' },
        { icon: 'Cpu', title: 'PUDU SLAM 2.0', body: 'Bewährte Navigation für sichere Mensch-Roboter-Interaktion auf engen Wegen.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['pudu-robotics-pudu-cc1'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der PUDU CC1 gebaut ist',
      intro: 'CC1 ist Pudus Profi-Reinigungsroboter — autonomes Scheuersaugen für gewerbliche Innenflächen.',
      items: [
        { icon: 'Building2', label: 'Einkaufszentren', text: 'Nachts autonome Mall-Bodenreinigung ohne Personalbindung.' },
        { icon: 'Factory', label: 'Produktion & Lager', text: 'Hallenflächen mit definierter Geometrie — präzise Reinigung Nacht für Nacht.' },
        { icon: 'Hotel', label: 'Verkehrsknoten', text: 'Bahnhöfe, Flughäfen, U-Bahn-Stationen mit hoher Frequenz und Schmutzanfall.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'CC1 Highlights',
      heading: 'Was den CC1 auszeichnet',
      items: [
        { icon: 'Droplets', title: '4-in-1-Reinigung', body: 'Saugen, Scheuern, Wischen und Mopen in einem Arbeitsgang.' },
        { icon: 'Bot', title: 'Autonom', body: 'Unbeaufsichtigter Nachteinsatz mit automatischer Heimkehr zur Ladestation.' },
        { icon: 'Radar', title: 'Multi-Sensor', body: 'LiDAR + 3D-Tiefensensor + Kamera — sichere Erkennung von Hindernissen und Personen.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// SEGWAY NAVIMOW — i-Series
// Quelle: navimow.segway.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['segway-navimow-i-series'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür die Navimow i-Serie gebaut ist',
      intro: 'Die i-Serie ist die Einsteiger-Klasse von Segway Navimow — kompakte Mähroboter für Privatgärten bis 1’500 m².',
      items: [
        { icon: 'Trees', label: 'Hausgärten', text: 'Klassische Eigenheim-Gärten von 200 bis 1’500 m² mit gepflegtem Rasenanspruch.' },
        { icon: 'Sun', label: 'Reihenhaus-Anlagen', text: 'Vorgärten und Innenhöfe in Reihenhaus-Siedlungen — kompakte Bauweise passt überall.' },
        { icon: 'Building2', label: 'Kleine Gewerbeflächen', text: 'Eingangsbereiche von KMU, Praxis-Vorgärten, kleine Hofflächen.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Navimow i Highlights',
      heading: 'Was die i-Serie auszeichnet',
      items: [
        { icon: 'Wifi', title: 'Drahtfrei', body: 'Keine Begrenzungskabel-Verlegung — virtuelle Begrenzung per RTK-GPS in der App.' },
        { icon: 'Volume2', title: 'Sehr leise', body: 'Unter 60 dB im Betrieb — auch früh morgens oder spät abends ohne Lärmkonflikte.' },
        { icon: 'Sparkles', title: 'Schnelle Installation', body: 'Setup in unter einer Stunde — Antenne aufstellen, App-Setup, Mähen kann beginnen.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// ALKÈ — weitere Modelle (Kommunalcenter)
// Quelle: alke.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['alke-atx-480'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Alkè ATX 480 4x4 gebaut ist',
      intro: 'Der ATX 480 ist Alkès Allrad-Variante — gebaut für Gelände, Forst und harte Bauhöfe.',
      items: [
        { icon: 'Mountain', label: 'Forst & Naturschutz', text: 'Wegunterhalt, Pflanzpflege und Materialtransport in Wald und Naturparks.' },
        { icon: 'Hammer', label: 'Bau & Werkhöfe', text: 'Unbefestigter Boden, Schutt und Kies — kein Problem dank 4WD-Antrieb.' },
        { icon: 'Recycle', label: 'Gemeinde-Aussenbereiche', text: 'Bachpflege, Uferbereiche, Friedhöfe — Zugang zu schwierigen Topografien.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'ATX 480 Highlights',
      heading: 'Was den ATX 480 auszeichnet',
      items: [
        { icon: 'Mountain', title: '40 % Steigfähigkeit', body: 'Echtes Gelände-Profi mit hoher Bodenfreiheit und 4WD.' },
        { icon: 'Truck', title: '1’450 kg Nutzlast', body: 'Hohe Zuladung trotz Gelände-Auslegung — Werkstoff und Material in einer Tour.' },
        { icon: 'Battery', title: 'Vollelektrisch', body: 'Kein Lärm, keine Abgase — auch in Naturschutzgebieten und Erholungsräumen erlaubt.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['alke-atx-ed'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'ATX ED Doppelkabine',
      heading: 'Was die Doppelkabine auszeichnet',
      intro: 'Die ED-Variante mit 4 Sitzplätzen — Team und Werkzeug gleichzeitig zur Einsatzstelle.',
      items: [
        { icon: 'Users', title: '4 Sitzplätze', body: 'Crew-Cab mit voller zweiter Sitzreihe — bis zu 4 Mitarbeiter ohne Zweitfahrzeug.' },
        { icon: 'Truck', title: 'Pritsche dahinter', body: 'Trotz Doppelkabine bleibt eine offene Pritsche für Werkzeug und Material.' },
        { icon: 'ShieldCheck', title: 'EU-Strassenzulassung', body: 'Kategorie N1 mit europäischer Zulassung — uneingeschränkt strassentauglich.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// KUBOTA — weitere Mäher-Serien
// Quelle: kdg.kubota-eu.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['kubota-fc3-serie'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Kubota FC3-Serie',
      heading: 'Was die FC3-Serie als Grossflächen-Frontmäher auszeichnet',
      intro: 'Die FC3-Serie ist Kubotas Profi-Frontmäher für grosse Flächen — Sportplätze, Parks, Gemeindeflächen.',
      items: [
        { icon: 'Battery', title: '3-Zylinder-Diesel', body: 'Kraftvoller Kubota-Diesel mit hoher Drehmomentreserve auch bei dichtem Gras.' },
        { icon: 'Package', title: '800-l-Fangbehälter', body: 'Grosse Sammelkapazität reduziert Entleerungsstopps und steigert Effizienz.' },
        { icon: 'Award', title: 'Profi-Schnittbild', body: 'Hochwertige Mähdeck-Konstruktion für gleichmässige Schnittqualität auch bei hohen Geschwindigkeiten.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['kubota-gzd-serie'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Kubota GZD-Serie',
      heading: 'Was die GZD-Serie als Diesel-Zero-Turn auszeichnet',
      intro: 'Die GZD-Serie verbindet die Wendigkeit eines Zero-Turn-Mähers mit der Drehmoment-Stärke eines Kubota-Diesels.',
      items: [
        { icon: 'Gauge', title: 'Zero-Turn', body: 'Wendet auf der Stelle — ideal für Flächen mit Hindernissen wie Bäumen und Beeten.' },
        { icon: 'Battery', title: 'Diesel-Antrieb', body: 'Kubota-Dieselmotor mit höherem Drehmoment und längerer Lebensdauer als Benziner.' },
        { icon: 'Recycle', title: 'Direkte Grasaufnahme', body: 'Direkter Wurf vom Mähdeck in den Behälter — keine Stauungen.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// STIHL — Kategorien (Motorgerätecenter)
// Quelle: stihl.ch
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['stihl-akkusystem-ap'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür das STIHL Akkusystem AP gebaut ist',
      intro: 'Das STIHL AP-System ist das Profi-Akkusystem für hohe Anforderungen — ein Akku, viele Geräte.',
      items: [
        { icon: 'Trees', label: 'Profi-Garten- und Forst', text: 'Kettensägen, Heckenscheren, Freischneider, Laubbläser mit gleichem Akku.' },
        { icon: 'Building2', label: 'Kommunal & Service', text: 'Geräuscharme Pflegearbeit in Wohngebieten und Erholungszonen.' },
        { icon: 'Volume2', label: 'Lärmsensible Bereiche', text: 'Friedhöfe, Krankenhäuser, Schulen — leiser Betrieb auch in sensiblen Umgebungen.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'AP-System Highlights',
      heading: 'Was das AP-System auszeichnet',
      items: [
        { icon: 'Battery', title: 'Hochleistungs-Akku', body: 'AP-Akkus mit bis zu 337 Wh — Profi-Laufzeit für ganze Arbeitstage.' },
        { icon: 'Recycle', title: 'Cross-Compatible', body: 'Über 30 Geräte mit demselben Akku — Investitionsschutz und Flexibilität.' },
        { icon: 'Zap', title: 'Schnellladen', body: 'AL 500 Schnellladegerät lädt einen AP 300 S in 25 Minuten zu 80 %.' },
      ],
    },
  ],
  video: { youtubeId: '4qi5G3cnZtI', title: 'STIHL — Cleaning power', caption: 'Akku-Power für Profis: STIHL AP im Einsatz.' },
}

PRODUCT_EXTRAS['stihl-kettensaegen'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür STIHL Kettensägen gebaut sind',
      intro: 'STIHL ist seit 1926 die führende Marke bei Motor- und Akku-Kettensägen — von der Hobbysäge bis zur Profi-Forstmaschine.',
      items: [
        { icon: 'Trees', label: 'Forstwirtschaft', text: 'Profi-Maschinen wie MS 462 / MS 661 für Holzernte, Durchforstung und Sturmholz.' },
        { icon: 'Hammer', label: 'Brennholzaufbereitung', text: 'Mittlere Klasse-Sägen für Brennholz und Stammzerkleinerung.' },
        { icon: 'Sparkles', label: 'Garten & Hobby', text: 'Akku-Sägen wie MSA 200 C-B für leichte Pflege, Astwerk und Brennholz im Eigengebrauch.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'STIHL Sägen Highlights',
      heading: 'Was STIHL Sägen auszeichnet',
      items: [
        { icon: 'Award', title: 'Marktführer seit 1926', body: 'STIHL erfand die motorisierte Kettensäge — bis heute Synonym für die Maschine.' },
        { icon: 'Wrench', title: 'Schweizer Service', body: 'Service- und Ersatzteilversorgung über das dichte Schweizer Händlernetz.' },
        { icon: 'Battery', title: 'Akku oder Benzin', body: 'Vollständige Range — von der 2-Takt-Profimaschine bis zur leisen Akku-Säge.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['stihl-rasenmaeher'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'STIHL Rasenmäher',
      heading: 'Was STIHL Rasenmäher auszeichnet',
      intro: 'STIHL bietet Rasenmäher in allen Klassen — vom Akku- bis zum Benzinmäher, vom Garten bis zum Profi-Einsatz.',
      items: [
        { icon: 'Battery', title: 'Akku oder Benzin', body: 'AP-Akkumäher mit RMA-Serie oder klassische Benzin-Mäher der RM-Serie.' },
        { icon: 'Sparkles', title: 'Mulch & Sammeln', body: 'Mulchsystem oder Grasfangbox — je nach Wunsch und Rasenbeschaffenheit.' },
        { icon: 'Wrench', title: 'Profi-Qualität', body: 'Hochwertige Mähdecks aus Stahl- oder ABS-Material — langlebig und schnittfest.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// STIGA — Motorgerätecenter
// Quelle: stiga.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['stiga-park-aufsitzmaeher'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Stiga Park & Aufsitzmäher',
      heading: 'Was die Stiga Park-Serie auszeichnet',
      intro: 'Die Stiga Park-Serie ist Stigas Front-Aufsitzmäher-Familie — mit Knicklenkung und über 20 Anbaugeräten.',
      items: [
        { icon: 'Settings', title: 'Knicklenkung', body: 'Präzises Manövrieren um Bäume und Beete — kein doppeltes Mähen am Rand.' },
        { icon: 'Wrench', title: 'Über 20 Anbaugeräte', body: 'Mähdeck, Schneeschild, Streuer, Bürste — eine Maschine fürs ganze Jahr.' },
        { icon: 'Battery', title: 'Diesel & ePower', body: 'Klassischer Briggs & Stratton-Benzinmotor oder vollelektrische ePower-Variante.' },
      ],
    },
  ],
  video: { youtubeId: 'ujUNX5hOUNk', title: 'Stiga Estate 798e — Voll elektrisch', caption: 'Aufsitzmäher der Zukunft: leise, emissionsfrei, kraftvoll.' },
}

PRODUCT_EXTRAS['stiga-maehroboter'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Stiga Mähroboter',
      heading: 'Was Stiga Mähroboter auszeichnet',
      intro: 'Stiga bietet drahtfreie Mähroboter mit AGS-Navigation — ohne lästige Drahtverlegung im Garten.',
      items: [
        { icon: 'Radar', title: 'AGS-Navigation', body: 'Active Guidance System mit GPS und Sensor-Fusion — drahtfrei und präzise.' },
        { icon: 'Wifi', title: 'App-Steuerung', body: 'Stiga.GO-App für Routen, Mähpläne und Live-Tracking — von überall.' },
        { icon: 'Battery', title: 'Lithium-Ionen', body: 'Moderne Akku-Technologie für lange Mähzyklen und schnelles Aufladen.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// NILFISK — Reinigungstechnik (Motorgerätecenter)
// Quelle: nilfisk.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['nilfisk-hochdruckreiniger'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür Nilfisk Hochdruckreiniger gebaut sind',
      intro: 'Nilfisk ist seit 1906 dänischer Pionier der Reinigungstechnik — Hochdruckreiniger für Profi und Heimwerker.',
      items: [
        { icon: 'Hammer', label: 'Bau & Industrie', text: 'Baumaschinen-, Werkzeug- und Fassadenreinigung mit Heisswasser-Hochdruck.' },
        { icon: 'Truck', label: 'Fuhrpark-Reinigung', text: 'Lkw-, Maschinen- und Anhänger-Reinigung mit mobilen Profi-Geräten.' },
        { icon: 'Building2', label: 'Liegenschaften', text: 'Terrassen-, Hof- und Hausfassaden-Reinigung — kompakt und kraftvoll.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Nilfisk Highlights',
      heading: 'Was Nilfisk Hochdruckreiniger auszeichnet',
      items: [
        { icon: 'Award', title: 'Dänische Qualität', body: 'Über 115 Jahre Engineering aus Dänemark — Industriestandard für Profi-Reinigung.' },
        { icon: 'Droplets', title: 'Heisswasser-Option', body: 'Profi-Heisswassergeräte für hartnäckige Öl-, Fett- und Schmutzbelastungen.' },
        { icon: 'Battery', title: 'Akku-Modelle', body: 'Mobile Akku-Hochdruckreiniger für Einsätze ohne Stromanschluss.' },
      ],
    },
  ],
}

PRODUCT_EXTRAS['nilfisk-industriesauger'] = {
  sections: [
    {
      type: 'highlights',
      eyebrow: 'Nilfisk Industriesauger',
      heading: 'Was Nilfisk Industriesauger auszeichnet',
      intro: 'Profi-Sauger für Industrie, Werkstatt, Bau und Sondereinsätze.',
      items: [
        { icon: 'ShieldCheck', title: 'ATEX & H-Klasse', body: 'Zertifizierte Sauger für Ex-Zonen und gesundheitsgefährdende Stäube (H-Filter).' },
        { icon: 'Package', title: 'Grosse Behälter', body: 'Industriebehälter bis 100 l — selten entleeren, lange durcharbeiten.' },
        { icon: 'Wrench', title: 'Wartungsfreundlich', body: 'Filterreinigung per Knopfdruck oder automatisch im Betrieb.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════
// SWARDMAN — Electra (Motorgerätecenter)
// Quelle: swardman.com
// ═══════════════════════════════════════════════════════════════
PRODUCT_EXTRAS['swardman-swardman-electra-2-0-55'] = {
  sections: [
    {
      type: 'applications',
      eyebrow: 'Einsatzbereiche',
      heading: 'Wofür der Swardman Electra 2.0 – 55 gebaut ist',
      intro: 'Der elektrische Premium-Spindelmäher — emissionsfrei, leise und mit Schnittbild eines klassischen Profi-Spindelmähers.',
      items: [
        { icon: 'Award', label: 'Premium-Privatgärten', text: 'Englische Rasen, Repräsentationsflächen und Showgärten — leise auch früh morgens.' },
        { icon: 'Trees', label: 'Sportrasen', text: 'Cricket, Tennis, Bowling-Greens — präziser Schnitt mit moderner Lithium-Antriebstechnik.' },
        { icon: 'Building2', label: 'Hotellerie & Resorts', text: 'Repräsentationsflächen mit höchsten Anspruch an Pflegezustand und ruhigen Betrieb.' },
      ],
    },
    {
      type: 'highlights',
      eyebrow: 'Electra 2.0 Highlights',
      heading: 'Was den Electra auszeichnet',
      items: [
        { icon: 'Battery', title: 'Lithium-Ionen-Antrieb', body: 'Moderner Elektroantrieb — vollständig emissionsfrei und mit Akku-Wechselsystem.' },
        { icon: 'Volume2', title: 'Sehr leise', body: 'Im Gegensatz zu Benzin-Spindelmähern flüsterleise — auch in Wohngebieten kein Konflikt.' },
        { icon: 'Wrench', title: 'Modulare Kassetten', body: 'Wechselbare Kassetten für Mähen, Vertikutieren, Bürsten und Walzen.' },
      ],
    },
  ],
}

export function getProductExtras(slug: string): ProductExtras | null {
  return PRODUCT_EXTRAS[slug] ?? null
}
