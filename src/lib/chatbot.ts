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
    keywords: ['nutzfahrzeug', 'lkw', 'truck', 'scania', 'fiat', 'isuzu', 'piaggio', 'dhollandia', 'wabco', 'hilltip', 'lastwagen', 'transporter', 'nutzfahrzeugcenter', 'burkhalter', 'roland'],
    answer: 'Unser Nutzfahrzeugcenter bietet Ihnen:\n🚛 Marken: Scania, Fiat, Isuzu, Piaggio, UT, Dhollandia, Wabco, Hilltip\nIhr Ansprechpartner: Roland Burkhalter',
    links: [{ label: 'Zum Nutzfahrzeugcenter', href: '/nutzfahrzeugcenter' }],
    chips: ['Scania', 'Fiat', 'Reparatur'],
  },
  {
    keywords: ['kommunal', 'municipal', 'hako', 'kubota', 'reform', 'zaugg', 'greentec', 'baoli', 'alke', 'alkè', 'kommunalcenter', 'michael', 'peter', 'kehrmaschine', 'kommunalfahrzeug'],
    answer: 'Unser Kommunalcenter bietet kommunale Maschinen und Fahrzeuge:\n🔴 Marken: Hako, Kubota, Reform, Zaugg, Greentec, Baoli, Alkè u.v.m.\nIhr Ansprechpartner: Michael Peter',
    links: [{ label: 'Zum Kommunalcenter', href: '/kommunalcenter' }],
    chips: ['Kubota', 'Hako', 'Mieten'],
  },
  {
    keywords: ['motorgerät', 'motorgeraet', 'garten', 'mäher', 'maher', 'makita', 'stihl', 'nilfisk', 'ambrogio', 'segway', 'navimow', 'motorgerätecenter', 'motorgeraetecenter', 'gartenpflege', 'rasenmaher', 'rasenmäher'],
    answer: 'Unser Motorgerätecenter ist Ihr Spezialist für Gartengeräte und Robotertechnik:\n🟢 Marken: Makita, Stihl, Nilfisk, Ambrogio, Segway, Pudu Robotics u.v.m.\nIhr Ansprechpartner: Adrian Moser',
    links: [{ label: 'Zum Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Makita', 'Stihl', 'Roboter'],
  },
  {
    keywords: ['roboter', 'pudu', 'serviceroboter', 'reinigungsroboter', 'lieferroboter', 'robot', 'autonom', 'raphael', 'maurer'],
    answer: 'Wir sind Ihr Partner für moderne Serviceroboter:\n🤖 Pudu Robotics – Liefer- und Serviceroboter\n🤖 Ambrogio – Mähroboter\n🤖 Segway Navimow – GPS Mähroboter\nBeratung: Raphael Maurer',
    links: [{ label: 'Motorgerätecenter', href: '/motorgeraetecenter' }],
    chips: ['Ambrogio', 'Segway', 'Motorgeräte'],
  },
  {
    keywords: ['winter', 'schnee', 'winterdienst', 'streuer', 'schneepflug', 'schneeräumung', 'schneeraumung', 'envitec', 'springer'],
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
