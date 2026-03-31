export interface ChatbotLink {
  label: string
  href: string
}

export interface ChatbotResponse {
  answer: string
  links?: ChatbotLink[]
  chips?: string[]
}

interface Rule {
  keywords: string[]
  answer: string
  links?: ChatbotLink[]
  chips?: string[]
}

const rules: Rule[] = [
  {
    keywords: ['hallo', 'hi', 'hey', 'guten tag', 'grüezi', 'gruezi', 'servus', 'guten morgen', 'guten abend', 'willkommen'],
    answer: 'Grüezi! 👋 Willkommen bei Ernst Moser GmbH.\nWie kann ich Ihnen helfen? Ich beantworte gerne Ihre Fragen zu unseren Centern, Marken und Leistungen.',
    chips: ['Nutzfahrzeuge', 'Kommunal', 'Motorgeräte', 'Kontakt'],
  },
  {
    keywords: ['standort', 'adresse', 'wo', 'finden', 'gerlafingen', 'derendingen', 'besuchen', 'anfahrt'],
    answer: 'Ernst Moser GmbH befindet sich an der Derendingenstrasse 25 in 4563 Gerlafingen SO.\nWir freuen uns auf Ihren Besuch!',
    links: [{ label: 'Auf Karte anzeigen', href: '/unternehmen' }],
    chips: ['Öffnungszeiten', 'Kontakt', 'Team'],
  },
  {
    keywords: ['öffnungszeiten', 'offnungszeiten', 'wann', 'offen', 'geöffnet', 'geoffnet', 'zeiten', 'uhrzeit'],
    answer: 'Unsere Öffnungszeiten:\n🕖 Mo–Fr: 07:00–12:00 / 13:15–17:30\n🕖 Samstag: 07:00–12:00\nSonntag geschlossen.',
    chips: ['Kontakt', 'Standort', 'Team'],
  },
  {
    keywords: ['telefon', 'anrufen', 'kontakt', 'nummer', 'tel', 'mail', 'email', 'pikett', 'erreichbar', 'erreichen'],
    answer: 'Sie erreichen uns unter:\n📞 +41(0)32 675 58 05\n✉️ info@ernst-moser.ch\nPikett: +41 79 485 66 45',
    links: [{ label: 'Kontakt aufnehmen', href: '/unternehmen' }],
    chips: ['Öffnungszeiten', 'Standort', 'Team'],
  },
  {
    keywords: ['nutzfahrzeug', 'lkw', 'truck', 'lastwagen', 'transporter', 'nutzfahrzeugcenter', 'burkhalter', 'roland'],
    answer: 'Unser Nutzfahrzeugcenter bietet Ihnen:\n🚛 Marken: Scania, Fiat, Isuzu, Piaggio, UT, Dhollandia, Wabco, Hilltip\nIhr Ansprechpartner: Roland Burkhalter',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Scania', 'Fiat Professional', 'Reparatur'],
  },
  {
    keywords: ['scania', 'g-serie', 'r-serie', 's-serie', 'sattelzug', 'sattelzugmaschine'],
    answer: 'Scania ist ein führender Hersteller von schweren Nutzfahrzeugen. Ernst Moser ist offizieller Scania Partner für die Region Solothurn.\nModelle: G-Serie, R-Serie, S-Serie, Sattelzugmaschinen, Kipper.\nTechnologien: Super-Motor, Hybridantrieb, LNG.\nAnsprechpartner: Roland Burkhalter',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Fiat Professional', 'Isuzu', 'Reparatur'],
  },
  {
    keywords: ['fiat', 'fiat professional', 'ducato', 'doblo', 'scudo'],
    answer: 'Fiat Professional bietet leichte Nutzfahrzeuge.\nModelle: Ducato, E-Ducato, Doblo, E-Doblo, Scudo, E-Scudo.\nIdeal für Handwerker und Transportunternehmen.',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Scania', 'Isuzu', 'Reparatur'],
  },
  {
    keywords: ['isuzu', 'd-max', 'n-serie', 'f-serie', 'm-serie', 'pickup'],
    answer: 'Isuzu ist bekannt für zuverlässige Trucks.\nModelle: D-Max Pickup, N-Serie, F-Serie, M-Serie.\nBesonders beliebt: D-Max 4x4 für Bergregionen.',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Scania', 'Fiat Professional', 'Reparatur'],
  },
  {
    keywords: ['kommunal', 'municipal', 'kommunalcenter', 'michael', 'peter', 'kehrmaschine', 'kommunalfahrzeug'],
    answer: 'Unser Kommunalcenter bietet kommunale Maschinen und Fahrzeuge:\n🔴 Marken: Hako, Kubota, Reform, Zaugg, Greentec, Baoli, Alkè u.v.m.\nIhr Ansprechpartner: Michael Peter',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kubota', 'Hako', 'Mieten'],
  },
  {
    keywords: ['kubota', 'b-serie', 'l-serie', 'm-serie', 'gr-serie', 'z-serie', 'traktor', 'kompakttraktor'],
    answer: 'Kubota bietet Traktoren und Kommunalgeräte.\nModelle: B-Serie (Kompakttraktoren), L-Serie, M-Serie, GR-Serie (Rasenmäher), Z-Serie.\nFür Landwirtschaft und Kommunalbetriebe.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Hako', 'Reform', 'Kommunal'],
  },
  {
    keywords: ['hako', 'citymaster', 'multicar', 'jonas', 'aufsitzkehrmaschine'],
    answer: 'Hako ist Spezialist für Reinigung und Kommunaltechnik.\nModelle: Citymaster (Kehrmaschinen), Multicar M31/M41, Jonas (Aufsitzkehrmaschine).\nFür Gemeinden und Betriebe.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kubota', 'Reform', 'Kommunal'],
  },
  {
    keywords: ['baoli', 'gabelstapler', 'stapler', 'lagertechnik', 'kion', 'kbd', 'kbe', 'kbp'],
    answer: 'Baoli ist Teil der KION Group und bietet Gabelstapler und Lagertechnik.\nModelle: KBD-Serie, KBE-Serie, KBP-Serie.\nElektrisch und Verbrennungsmotor.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Hako', 'Kubota', 'Kommunal'],
  },
  {
    keywords: ['alkè', 'alke', 'elektrisch', 'atx', 'elektrofahrzeug', 'zero emission'],
    answer: 'Alkè produziert elektrische Nutzfahrzeuge für Industrie und Kommunen.\nModelle: ATX320E, ATX330E, ATX340E.\nZero-Emission Fahrzeuge für Innen- und Aussenbereich.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Baoli', 'Kommunal', 'Kontakt'],
  },
  {
    keywords: ['reform', 'metrac', 'bergmäher', 'bergmaher', 'steilhang', 'h60', 'h70', 'h75', 'h95'],
    answer: 'Reform Metrac – Bergmäher für steiles Gelände.\nModelle: Metrac H60, H70, H75, H95.\nFür Steilhänge bis 50° Neigung.\nÖsterreichische Qualität seit Jahrzehnten.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kubota', 'Hako', 'Kommunal'],
  },
  {
    keywords: ['greentec', 'auslegemulcher', 'böschungsmäher', 'boschmungsmaher', 'scorpion', 'spider', 'fox', 'mulcher'],
    answer: 'GreenTec spezialisiert auf Auslegemulcher und Böschungsmäher.\nModelle: Scorpion-Serie, Spider-Serie, Fox.\nHydraulisch angetrieben für professionellen Einsatz.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kubota', 'Reform', 'Kommunal'],
  },
  {
    keywords: ['zaugg', 'schneefräse', 'schneefrase', 'schneepflug', 'sf-serie', 'berner oberland'],
    answer: 'Zaugg ist Schweizer Hersteller von Schneefräsen und Schneepflügen.\nQualität aus dem Berner Oberland.\nModelle: SF-Serie Schneefräsen, Schneepflüge.\nPräzision im Winterdienst.',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kommunal', 'Winterdienst', 'Kontakt'],
  },
  {
    keywords: ['motorgerät', 'motorgeraet', 'garten', 'mäher', 'maher', 'motorgerätecenter', 'motorgeraetecenter', 'gartenpflege', 'rasenmaher', 'rasenmäher'],
    answer: 'Unser Motorgerätecenter ist Ihr Spezialist für Gartengeräte und Robotertechnik:\n🟢 Marken: Makita, Stihl, Nilfisk, Ambrogio, Segway, Pudu Robotics u.v.m.\nIhr Ansprechpartner: Adrian Moser',
    links: [{ label: 'Zum Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Makita', 'Stihl', 'Roboter'],
  },
  {
    keywords: ['makita', 'xgt', '40v', 'lxt', '18v', 'cxt', '12v', 'elektrowerkzeug', 'kettensäge', 'kettensage', 'freischneider', 'laubbläser', 'laubblaser'],
    answer: 'Makita bietet professionelle Elektrowerkzeuge und Gartengeräte.\nSysteme: XGT 40V max, LXT 18V, CXT 12V.\nProdukte: Kettensägen, Freischneider, Laubbläser, Rasenmäher.',
    links: [{ label: 'Zum Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Stihl', 'Nilfisk', 'Motorgeräte'],
  },
  {
    keywords: ['stihl', 'motorsäge', 'motorsage', 'ms-serie', 'msa', 'freischneider', 'gartengeraet', 'gartengerät'],
    answer: 'Stihl ist Weltmarktführer für Motorsägen und Gartengeräte.\nProdukte: Kettensägen (MS-Serie), Freischneider, Rasenmäher, Akkusystem MSA.\nFür Profis und Hobbygärtner.',
    links: [{ label: 'Zum Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Makita', 'Nilfisk', 'Motorgeräte'],
  },
  {
    keywords: ['nilfisk', 'hochdruckreiniger', 'industriesauger', 'scheuersaugmaschine', 'reinigungsgerät', 'reinigungsgerat'],
    answer: 'Nilfisk ist Spezialist für professionelle Reinigungsgeräte.\nProdukte: Hochdruckreiniger, Industriesauger, Scheuersaugmaschinen, Kehrmaschinen.\nFür Gewerbe und Industrie.',
    links: [{ label: 'Zum Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Makita', 'Stihl', 'Motorgeräte'],
  },
  {
    keywords: ['roboter', 'pudu', 'serviceroboter', 'reinigungsroboter', 'lieferroboter', 'robot', 'autonom', 'raphael', 'maurer'],
    answer: 'Wir sind Ihr Partner für moderne Serviceroboter:\n🤖 Pudu Robotics – Liefer- und Serviceroboter\n🤖 Ambrogio – Mähroboter\n🤖 Segway Navimow – GPS Mähroboter\nBeratung: Raphael Maurer',
    links: [{ label: 'Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Ambrogio', 'Segway Navimow', 'Pudu Robotics'],
  },
  {
    keywords: ['ambrogio', 'mähroboter', 'mahroboter', 'l350i', 'l60', 'l400i', 'rtk', 'begrenzungsdraht'],
    answer: 'Ambrogio ist Pionier der Mähroboter-Technologie.\nModelle: L350i Elite RTK (GPS ohne Begrenzungsdraht), L60 Elite, L400i.\nRevolutionäre RTK-Technologie für präzises Mähen.',
    links: [{ label: 'Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Segway Navimow', 'Pudu Robotics', 'Roboter'],
  },
  {
    keywords: ['pudu robotics', 'bellabot', 'pudubot', 'kettybot', 'cc1', 't300', 'serviceroboter', 'restaurantroboter'],
    answer: 'Pudu Robotics ist führend bei Service-Robotern.\nModelle: BellaBot (Restaurant-Lieferroboter), PuduBot 2, KettyBot Pro, T300 (Industrieroboter), CC1 Pro (Reinigung).\nWeltweit über 75\'000 Roboter im Einsatz.',
    links: [{ label: 'Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Ambrogio', 'Segway Navimow', 'Roboter'],
  },
  {
    keywords: ['segway', 'navimow', 'gps', 'i-serie', 'h-serie', 'x-serie', 'drahtlos', 'ohne draht'],
    answer: 'Segway Navimow – GPS Mähroboter ohne Begrenzungsdraht.\nModelle: i-Serie, H-Serie, X-Serie.\nRTK-Technologie für präzises Mähen bis 5000m².',
    links: [{ label: 'Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Ambrogio', 'Pudu Robotics', 'Roboter'],
  },
  {
    keywords: ['piaggio', 'dhollandia', 'wabco', 'hilltip', 'ladebrücke', 'ladebucke', 'aufbau'],
    answer: 'Für Nutzfahrzeug-Aufbauten und Zubehör bieten wir:\n🚛 Piaggio – Kleintransporter\n🔩 Dhollandia – Hebebühnen und Ladebrücken\n🔩 Wabco – Fahrzeugsysteme\n❄️ Hilltip – Winterdienstaufbauten',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Scania', 'Nutzfahrzeuge', 'Reparatur'],
  },
  {
    keywords: ['winter', 'schnee', 'winterdienst', 'streuer', 'schneeräumung', 'schneeraumung', 'envitec', 'springer'],
    answer: 'Für den Winterdienst bieten wir:\n❄️ Schneepflüge und Streugeräte (Hilltip, Springer, Zaugg, Envitec)\n❄️ Komplette Winterdienstlösungen\n❄️ Service und Wartung',
    links: [{ label: 'Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kommunal', 'Reparatur', 'Kontakt'],
  },
  {
    keywords: ['reparatur', 'service', 'wartung', 'unterhalt', 'defekt', 'kaputt', 'instandhaltung', 'werkstatt', 'inspektion'],
    answer: 'Ernst Moser bietet Reparatur und Service für alle Marken:\n🔧 Reparaturen aller Marken\n🔧 Regelmässiger Service & Unterhalt\n🔧 Schnelle Reaktionszeiten\nKontakt: +41(0)32 675 58 05',
    links: [{ label: 'Mehr zu Leistungen', href: '/nutzfahrzeugcenter' }],
    chips: ['Kontakt', 'Öffnungszeiten', 'Nutzfahrzeuge'],
  },
  {
    keywords: ['preis', 'kosten', 'kaufen', 'occasion', 'neu', 'angebot', 'offerte', 'anfrage', 'budget', 'günstig', 'gunstig', 'gebraucht'],
    answer: 'Für Preisauskünfte und individuelle Angebote kontaktieren Sie uns direkt – wir beraten Sie persönlich und finden die beste Lösung für Ihre Anforderungen.\n📞 +41(0)32 675 58 05',
    chips: ['Finanzierung', 'Kontakt', 'Nutzfahrzeuge'],
  },
  {
    keywords: ['finanzierung', 'leasing', 'abo', 'nutzfahrzeugabo', 'ratenzahlung', 'kredit', 'förderung', 'forderung', 'emobilität', 'e-mobilität'],
    answer: 'Ernst Moser bietet verschiedene Finanzierungsmöglichkeiten:\n💳 Klassische Finanzierung\n💳 Nutzfahrzeug-Abo\n💳 E-Mobilität Förderungen\nSprechen Sie uns an für ein persönliches Angebot.',
    links: [{ label: 'Kaufberatung', href: '/nutzfahrzeugcenter/kaufen' }],
    chips: ['Kontakt', 'Nutzfahrzeuge', 'Angebot'],
  },
  {
    keywords: ['miete', 'mieten', 'mietgerät', 'mietgeraet', 'vermieten', 'ausleihen', 'leihen', 'kurzzeitmiete', 'langzeitmiete'],
    answer: 'Wir vermieten Kommunal- und Motorgeräte:\n🔑 Kurzzeit- und Langzeitmiete verfügbar\n🔑 Professionelle Geräte für jeden Einsatz\nAnfrage: +41(0)32 675 58 05',
    chips: ['Kommunal', 'Motorgeräte', 'Kontakt'],
  },
  {
    keywords: ['karriere', 'job', 'stelle', 'arbeit', 'lehre', 'ausbildung', 'lehrling', 'bewerbung', 'stellen', 'arbeitsplatz'],
    answer: 'Ernst Moser ist ein attraktiver Arbeitgeber in der Region Solothurn!\nWir bieten Stellen und Ausbildungsplätze in den Bereichen:\n👔 Automobilfachmann/frau\n👔 Motorgerätemechaniker/in\n👔 Kaufmännische Berufe',
    links: [{ label: 'Offene Stellen', href: '/karriere' }],
    chips: ['Team', 'Über uns', 'Kontakt'],
  },
  {
    keywords: ['team', 'mitarbeiter', 'ansprechpartner', 'mitarbeitende', 'kontaktperson'],
    answer: 'Unser erfahrenes Team steht Ihnen gerne zur Verfügung:\n👤 Adrian Moser – Geschäftsführer\n👤 Roland Burkhalter – Nutzfahrzeuge\n👤 Michael Peter – Kommunal & Leichtnutzfahrzeuge\n👤 Raphael Maurer – Robotertechnik & Motorgeräte',
    links: [{ label: 'Unser Team', href: '/unternehmen/team' }],
    chips: ['Kontakt', 'Über uns', 'Karriere'],
  },
  {
    keywords: ['über uns', 'uber uns', 'unternehmen', 'geschichte', 'firma', 'ernst moser', 'solothurn', 'mittelland', 'fachcenter'],
    answer: 'Ernst Moser GmbH ist seit über 50 Jahren Ihr kompetenter Partner für Fahrzeuge, Maschinen und Service im Raum Solothurn/Mittelland.\nWir betreiben drei Fachcenter unter einem Dach.',
    links: [{ label: 'Mehr über uns', href: '/unternehmen' }],
    chips: ['Team', 'Karriere', 'Kontakt'],
  },
  {
    keywords: ['danke', 'merci', 'vielen dank', 'dankeschön', 'dankeschen', 'besten dank', 'herzlichen dank'],
    answer: 'Gerne! 😊 Falls Sie weitere Fragen haben, stehe ich jederzeit zur Verfügung.\nEinen schönen Tag wünscht Ihnen Ernst Moser GmbH!',
    chips: ['Nutzfahrzeuge', 'Kommunal', 'Motorgeräte', 'Kontakt'],
  },
  {
    keywords: ['tschüss', 'tschuss', 'tschüs', 'auf wiedersehen', 'bye', 'ciao', 'tschau', 'bis dann'],
    answer: 'Auf Wiedersehen! 👋 Wir freuen uns auf Ihren nächsten Besuch.\nErnst Moser GmbH – Ihr Partner in Gerlafingen.',
    chips: ['Nutzfahrzeuge', 'Kommunal', 'Motorgeräte'],
  },
]

const FALLBACK: ChatbotResponse = {
  answer: 'Für diese Frage kann ich Ihnen am besten persönlich weiterhelfen:\n📞 +41(0)32 675 58 05\n✉️ info@ernst-moser.ch\nOder besuchen Sie uns direkt in Gerlafingen!',
  chips: ['Nutzfahrzeuge', 'Kommunal', 'Motorgeräte', 'Kontakt'],
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function getResponse(userMessage: string): ChatbotResponse {
  const msg = normalize(userMessage)

  for (const rule of rules) {
    for (const kw of rule.keywords) {
      if (msg.includes(normalize(kw))) {
        return { answer: rule.answer, links: rule.links, chips: rule.chips }
      }
    }
  }

  return FALLBACK
}
