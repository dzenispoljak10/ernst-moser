#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Brand-Inhalte befüllen
 * ==========================================
 * Schreibt für jede Marke: description, tagline, highlights, features, products
 * Ausführen: node scripts/populate-brand-content.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

function block(text) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  }
}

function blocks(...texts) {
  return texts.map(block)
}

function highlight(icon, label, desc) {
  return { _type: 'object', _key: Math.random().toString(36).slice(2, 10), icon, label, desc }
}

function feature(icon, title, desc) {
  return { _type: 'object', _key: Math.random().toString(36).slice(2, 10), icon, title, desc }
}

function product(name, info) {
  return { _type: 'object', _key: Math.random().toString(36).slice(2, 10), name, info }
}

// ─── Brand-Inhalte ─────────────────────────────────────────────────────────────

const BRAND_CONTENT = {

  // ═══════════════════════════════════════════════════════
  // NUTZFAHRZEUGCENTER (#1B2D5B)
  // ═══════════════════════════════════════════════════════

  scania: {
    tagline: 'The new Scania. Effizienz neu definiert.',
    description: blocks(
      'Scania ist einer der weltweit führenden Hersteller von schweren Nutzfahrzeugen, Motoren und Dienstleistungen für den Personen- und Gütertransport sowie für die Industrie. Seit über 130 Jahren steht Scania für Qualität, Innovation und Zuverlässigkeit.',
      'Als offizieller Scania-Partner in der Region Gerlafingen bietet Ernst Moser GmbH die komplette Palette an Lastwagen, Bussen und Serviceleistungen. Ob Fernverkehr, Verteilerverkehr oder Sonderfahrzeuge – wir finden die optimale Lösung für Ihren Betrieb.',
      'Scania-Fahrzeuge zeichnen sich durch modernste Motorentechnologie aus, die sowohl Leistung als auch Wirtschaftlichkeit maximiert. Mit umfangreichen Konnektivitätslösungen und vorausschauendem Service senken Sie Ihre Betriebskosten nachhaltig.'
    ),
    highlights: [
      highlight('Truck', 'Über 130 Jahre Erfahrung', 'Scania gehört zu den ältesten Nutzfahrzeugherstellern der Welt – gegründet 1891 in Schweden.'),
      highlight('Leaf', 'Nachhaltige Antriebe', 'Scania bietet HVO-, Biodiesel-, Erdgas- und vollelektrische Lösungen für emissionsarmen Transport.'),
      highlight('Settings', 'Individuelle Konfiguration', 'Jedes Scania-Fahrzeug wird nach Kundenwunsch konfiguriert – Motor, Getriebe, Kabine und Aufbau.'),
      highlight('Shield', 'Scania Assistance 24/7', 'Europaweite Pannenhilfe und Werkstattnetz garantieren maximale Verfügbarkeit Ihrer Flotte.'),
    ],
    features: [
      feature('Truck', 'Fahrzeugverkauf & Beratung', 'Komplette Scania-Modellpalette: Sattelzugmaschinen, Fernverkehrs-LKW, Kipper und Sonderfahrzeuge mit persönlicher Beratung.'),
      feature('Wrench', 'Zertifizierter Scania-Service', 'Autorisierte Werkstatt mit Original-Ersatzteilen, Garantiearbeiten und vorbeugender Wartung nach Scania-Vorgaben.'),
      feature('BarChart2', 'Fleet Management', 'Scania Fleet Management optimiert Routen, Fahrverhalten und Wartungsintervalle – spart bis zu 10% Kraftstoff.'),
      feature('Clock', 'Express-Notfallservice', 'Schnelle Reaktionszeiten bei Pannen und dringenden Reparaturen – damit Ihre Flotte rollt.'),
    ],
    products: [
      product('Scania R-Serie', 'Fernverkehrs-LKW mit SuperCab – der Klassiker für lange Strecken'),
      product('Scania S-Serie', 'Topline-Kabine mit höchstem Fahrkomfort für den Langstreckenprofi'),
      product('Scania P-Serie', 'Kompakter Verteilerverkehrs-LKW für Stadt und Region'),
      product('Scania G-Serie', 'Vielseitiger Allround-LKW für Bau, Industrie und Fernverkehr'),
      product('Scania L-Serie', 'Niederflur-Stadtfahrzeug für Verteilerverkehr mit niedrigem Einstieg'),
      product('Scania BEV', 'Batterieelektrischer Scania für emissionsfreien Stadtverkehr'),
    ],
  },

  fiat: {
    tagline: 'Fiat Professional. Made for Work.',
    description: blocks(
      'Fiat Professional ist die Nutzfahrzeugmarke des Stellantis-Konzerns und steht für zuverlässige, wirtschaftliche Transportlösungen im Leicht-LKW- und Transporter-Segment. Weltweit vertrauen Unternehmen auf Ducato, Doblò und Fiorino.',
      'Ernst Moser GmbH ist autorisierter Fiat Professional Partner in der Zentralschweiz. Wir bieten die gesamte Modellpalette – vom Stadtlieferwagen bis zum Schwertransporter – mit vollständigem Service und Garantieleistungen.',
      'Mit modernsten Euro-6-Motoren, optionalen Elektrovarianten und cleveren Ladungsmanagement-Systemen setzt Fiat Professional neue Massstäbe in Wirtschaftlichkeit und Umweltfreundlichkeit.'
    ),
    highlights: [
      highlight('Package', 'Europas meistverkaufter Transporter', 'Der Fiat Ducato ist seit Jahrzehnten Marktführer im Segment der leichten Nutzfahrzeuge in Europa.'),
      highlight('Zap', 'E-Ducato & E-Doblò', 'Fiat Professional bietet vollelektrische Modelle für emissionsfreie Stadtlogistik.'),
      highlight('Settings', 'Flexible Aufbaulösungen', 'Kastenwagen, Pritsche, Kipper, Krankenwagen – Fiat Professional passt sich jedem Bedarf an.'),
      highlight('ShieldCheck', 'Stellantis-Service-Netz', 'Dichtes Werkstattnetz in der ganzen Schweiz für schnelle Reparaturen und Wartung.'),
    ],
    features: [
      feature('Package', 'Leichte Nutzfahrzeuge', 'Fiat Ducato, Doblò Cargo und Fiorino für Handwerk, Logistik und gewerbliche Nutzung.'),
      feature('Wrench', 'Fiat Professional Service', 'Autorisierter Werkstattbetrieb mit Original-Ersatzteilen und Garantieabwicklung.'),
      feature('Zap', 'Elektro-Transporter', 'E-Ducato und E-Doblò für emissionsfreie Stadtlogistik und Letzte-Meile-Lieferungen.'),
      feature('Users', 'Flottenberatung', 'Massgeschneiderte Lösungen und Sonderkonditionen für Flottenkonditionen ab 3 Fahrzeugen.'),
    ],
    products: [
      product('Fiat Ducato', 'Klassiker der leichten Nutzfahrzeuge – als Kastenwagen, Pritsche oder Fahrgestell'),
      product('Fiat E-Ducato', 'Vollelektrische Version des Ducato für emissionsfreie Stadtlogistik'),
      product('Fiat Doblò Cargo', 'Kompakter Kastenwagen für den Handwerker in der Stadt'),
      product('Fiat Scudo', 'Mittelgroßer Transporter mit viel Ladevolumen und Fahrerkomfort'),
      product('Fiat Fiorino Cargo', 'Der kompakte Stadtlieferwagen für enge Gassen und schnelle Stopps'),
    ],
  },

  isuzu: {
    tagline: 'Isuzu. Go Beyond.',
    description: blocks(
      'Isuzu ist der weltweit grösste Hersteller von mittelschweren und schweren Diesel-LKW. Seit über 100 Jahren produziert Isuzu zuverlässige Nutzfahrzeuge, die in über 100 Ländern eingesetzt werden – vom Pick-up bis zum 20-Tonner.',
      'In der Schweiz vertraut man auf Isuzu D-Max, N-Serie und F-Serie für anspruchsvolle Transportaufgaben. Ernst Moser GmbH ist Ihr Isuzu-Spezialist in der Region – mit vollständiger Modellpalette, Service und Ersatzteilversorgung.',
      'Der Isuzu D-Max ist Schweizer Marktführer im Pick-up-Segment und überzeugt durch Geländetauglichkeit, Robustheit und wirtschaftlichen Dieselantrieb. Für Forstbetriebe, Baufirmen und Landwirte ist er die erste Wahl.'
    ),
    highlights: [
      highlight('Truck', 'Weltmarktführer LKW', 'Isuzu produziert mehr LKW als jeder andere Hersteller – über 700.000 Einheiten pro Jahr weltweit.'),
      highlight('Mountain', 'Unschlagbare Geländetauglichkeit', 'Isuzu D-Max mit 4×4-Allrad und hoher Bodenfreiheit – auch für extremstes Gelände geeignet.'),
      highlight('Fuel', 'Wirtschaftliche Dieselmotoren', 'Isuzu-Motoren gehören zu den sparsamsten und wartungsärmsten Dieselaggregaten der Branche.'),
      highlight('Award', 'Pick-up des Jahres', 'Der Isuzu D-Max wurde mehrfach mit internationalen Automobilpreisen ausgezeichnet.'),
    ],
    features: [
      feature('Truck', 'Pick-up & Transporter', 'Isuzu D-Max, N-Serie und F-Serie für Land- und Forstwirtschaft, Bauwesen und Transport.'),
      feature('Mountain', 'Gelände & Offroad', 'Isuzu D-Max 4×4 für anspruchsvolles Gelände, Feuerwehreinsatz und Forstwirtschaft in der Schweiz.'),
      feature('Wrench', 'Isuzu-Werkstatt', 'Zertifizierter Isuzu-Service mit Originalteilen – schnell, kompetent und preiswert.'),
      feature('Package', 'Aufbauten & Sonderfahrzeuge', 'Feuerwehr, Kipper, Kran-LKW – wir realisieren Ihren individuellen Isuzu-Aufbau.'),
    ],
    products: [
      product('Isuzu D-Max 4×4', 'Schweizer Bestseller-Pick-up mit Allradantrieb – für Gelände und Strasse'),
      product('Isuzu D-Max 4×2', 'Wirtschaftlicher Pick-up mit Hinterradantrieb für gewerbliche Nutzung'),
      product('Isuzu N-Serie NLR 85', 'Leichter LKW für Stadtlieferung und Gewerbe bis 5 Tonnen'),
      product('Isuzu N-Serie NMR', 'Mittelschwerer LKW für Baustelle und Transport'),
      product('Isuzu F-Serie', 'Schwerer LKW bis 16 Tonnen für Industrie und Bauwesen'),
    ],
  },

  piaggio: {
    tagline: 'Piaggio Commercial. Die smarte Lösung für die letzte Meile.',
    description: blocks(
      'Piaggio Commercial ist die Nutzfahrzeugsparte des italienischen Piaggio-Konzerns und steht für kompakte, wendige Transportlösungen für städtische Logistik und Gewerbe. Von Dreirädern bis zu elektrischen Kleintransportern bietet Piaggio einzigartige Fahrzeuglösungen.',
      'Die Piaggio Porter-Familie und der Ape Cargo sind besonders für enge Gassen, Märkte und Innenstädte geeignet, wo herkömmliche Lieferwagen nicht hinkommen. Ernst Moser GmbH vertreibt Piaggio Commercial Fahrzeuge und bietet vollständigen Service.',
      'Mit dem Elektro-Porter und dem Ape E-City setzt Piaggio auf nachhaltige Stadtlogistik – leise, emissionsfrei und überaus wirtschaftlich.'
    ),
    highlights: [
      highlight('Navigation', 'Wendig wie kein anderer', 'Piaggio-Fahrzeuge mit kleinstem Wendekreis – ideal für enge Gassen und Innenstädte der Schweiz.'),
      highlight('Zap', 'Elektromobilität vorn', 'Piaggio Porter Electric und Ape E-City für emissionsfreie Letzte-Meile-Logistik.'),
      highlight('Package', 'Kompaktes Ladevolumen', 'Überraschend grosses Nutzvolumen trotz kleiner Abmessungen – perfekt für Handwerk und Handel.'),
      highlight('Award', 'Made in Italy', '100 Jahre Piaggio-Qualität – von der Vespa bis zum modernen Elektrolieferwagen.'),
    ],
    features: [
      feature('Navigation', 'Stadtlogistik-Spezialisten', 'Piaggio Porter und Ape Cargo für Märkte, Innenstädte und Lieferdienste in der Schweiz.'),
      feature('Zap', 'Elektro-Fahrzeuge', 'Piaggio Porter Electric und Ape E-City für emissionsfreie und leise Stadtlieferung.'),
      feature('Wrench', 'Piaggio Service', 'Autorisierter Service mit Originalersatzteilen und Garantieabwicklung.'),
      feature('Users', 'Beratung & Demo', 'Probefahrten und individuelle Beratung für Gewerbe, Kommunen und Lieferdienste.'),
    ],
    products: [
      product('Piaggio Porter 700', 'Kompakter Transporter mit 700kg Nutzlast – Diesel und Elektro'),
      product('Piaggio Porter Electric', 'Vollelektrischer Stadtlieferwagen – leise und emissionsfrei'),
      product('Piaggio Ape TM 703', 'Das Original – dreirädiger Kleinsttransporter für enge Gassen'),
      product('Piaggio Ape E-City', 'Elektrischer Dreiradtransporter für den Stadthandel'),
    ],
  },

  ut: {
    tagline: 'UT Trucks. Zuverlässigkeit für die Schweizer Landwirtschaft.',
    description: blocks(
      'UT (Universal Transporter) steht für robuste, vielseitige Transportlösungen speziell für die Landwirtschaft und das Gewerbe in der Schweiz. Die kompakten Fahrzeuge sind besonders für schwieriges Gelände und den täglichen Einsatz auf dem Hof konzipiert.',
      'Ernst Moser GmbH ist Ihr Ansprechpartner für UT-Fahrzeuge in der Region Solothurn. Wir beraten Sie zu den verschiedenen Modellen und bieten vollständigen Service und Ersatzteilversorgung.',
      'Mit hoher Bodenfreiheit, Allradantrieb und robusten Pritschenaufbauten sind UT-Fahrzeuge der ideale Begleiter für Landwirte, Forstbetriebe und Kommunen.'
    ),
    highlights: [
      highlight('Mountain', 'Geländetauglich', 'Hohe Bodenfreiheit und Allradantrieb für den Einsatz auf Wiesen, Wegen und Baustellen.'),
      highlight('Truck', 'Robust & Langlebig', 'Solide Konstruktion für den täglichen Schweizer Einsatz in Landwirtschaft und Gewerbe.'),
      highlight('Wrench', 'Einfache Wartung', 'Unkomplizierte Technik für kostengünstige Unterhaltung und lange Lebensdauer.'),
      highlight('Package', 'Flexible Aufbauten', 'Pritsche, Kipper, Wechselaufbau – UT passt sich Ihrem Bedarf an.'),
    ],
    features: [
      feature('Truck', 'Fahrzeugverkauf', 'UT Transportfahrzeuge für Landwirtschaft, Forst und Kommunalbetriebe.'),
      feature('Mountain', 'Geländefahrzeuge', 'Allradantrieb und hohe Bodenfreiheit für anspruchsvolle Einsätze.'),
      feature('Wrench', 'Service & Reparatur', 'Fachgerechte Wartung und Reparatur mit Originalersatzteilen.'),
      feature('Package', 'Aufbau & Zubehör', 'Individuelle Pritschenaufbauten und Zubehör nach Kundenwunsch.'),
    ],
    products: [
      product('UT Transporter', 'Kompakter Geländetransporter für Landwirtschaft und Forst'),
      product('UT Kipper', 'Robuster Kipptransporter für Schüttgut und Erdarbeiten'),
      product('UT Pritsche', 'Vielseitige Ladefläche für flexible Nutzung auf dem Hof'),
    ],
  },

  dhollandia: {
    tagline: 'Dhollandia. Europas Nummer 1 bei Hebebühnen.',
    description: blocks(
      'Dhollandia ist der europäische Marktführer für Fahrzeughebebühnen und Ladebordwände. Seit 1962 produziert das belgische Unternehmen zuverlässige Lösungen für den einfachen Be- und Entladevorgang von Nutzfahrzeugen.',
      'Von einfachen Falthebebühnen bis zu vollautomatischen Schiebeportalbühnen bietet Dhollandia die grösste Produktpalette auf dem Markt. Ernst Moser GmbH ist autorisierter Dhollandia-Partner und Servicestützpunkt in der Zentralschweiz.',
      'Mit über 800.000 verkauften Hebebühnen in Europa ist Dhollandia bekannt für Qualität, Langlebigkeit und exzellenten Kundendienst. Die TÜV-geprüften Produkte erfüllen alle europäischen Sicherheitsnormen.'
    ),
    highlights: [
      highlight('Award', 'Europas Marktführer', 'Dhollandia ist mit über 800.000 verkauften Hebebühnen Europas führender Hersteller.'),
      highlight('Shield', 'TÜV-geprüfte Sicherheit', 'Alle Dhollandia-Hebebühnen entsprechen EN 1756 und europäischen Sicherheitsstandards.'),
      highlight('Settings', 'Grösste Produktpalette', 'Von 750 kg bis 3.000 kg Traglast – Dhollandia hat die passende Lösung für jedes Fahrzeug.'),
      highlight('Wrench', 'Langer Lebenszyklus', 'Robuste Konstruktion und einfache Wartung für minimale Ausfallzeiten.'),
    ],
    features: [
      feature('Package', 'Hebebühnen-Verkauf', 'Gesamte Dhollandia-Palette: Falthebebühne, Hubladebühne, Schiebebühne für alle Fahrzeugtypen.'),
      feature('Settings', 'Montage & Installation', 'Professionelle Montage von Dhollandia-Hebebühnen an Neu- und Gebrauchtfahrzeugen.'),
      feature('Wrench', 'Service & Inspektion', 'Jährliche Prüfungen, Reparaturen und UVV-Abnahmen nach europäischen Normen.'),
      feature('ShieldCheck', 'Originalteile & Garantie', 'Ausschliesslich Dhollandia-Originalersatzteile für maximale Sicherheit und Haltbarkeit.'),
    ],
    products: [
      product('Dhollandia DH-QL Falthebebühne', 'Platzsparende Falthebebühne für Kastenwagen und LKW'),
      product('Dhollandia DH-AM Klappbordwand', 'Kompakte Schiebelösungen für leichte Nutzfahrzeuge'),
      product('Dhollandia DH-PS Hubladebühne', 'Schwere Hubladebühne bis 3.000 kg für Sattelauflieger'),
      product('Dhollandia DH-EC Elektrisch', 'Vollelektrische Hebebühne für emissionsarme Logistik'),
    ],
  },

  wabco: {
    tagline: 'WABCO. Technologie für sicheres Bremsen.',
    description: blocks(
      'WABCO (heute ZF CV Systems) ist der weltweit führende Anbieter von Brems- und Stabilitätssystemen für Nutzfahrzeuge. Das Unternehmen entwickelt lebensrettende Technologien wie ABS, ESP, AEBS und automatische Bremssysteme für LKW, Busse und Anhänger.',
      'Ernst Moser GmbH ist autorisierter WABCO-Servicepartner und bietet Diagnose, Wartung und Reparatur aller WABCO-Systeme. Als zertifizierter Betrieb verfügen wir über das notwendige Fachwissen und Spezialwerkzeug.',
      'WABCO-Systeme sind in nahezu allen modernen Nutzfahrzeugen verbaut – von ABS und EBS bis zu modernsten Fahrerassistenzsystemen. Regelmässige Wartung und korrekte Diagnose sind entscheidend für die Verkehrssicherheit.'
    ),
    highlights: [
      highlight('Shield', 'Weltmarktführer Bremssysteme', 'WABCO-Systeme sind in über 50 Millionen Fahrzeugen weltweit verbaut.'),
      highlight('Activity', 'Lebensrettende Technologie', 'ABS, ESP, AEBS – WABCO-Systeme verhindern tausende Unfälle pro Jahr.'),
      highlight('Settings', 'Vollständige Diagnose', 'Speziell ausgebildete Techniker mit WABCO-Diagnosegeräten und Originalteilen.'),
      highlight('ShieldCheck', 'Zertifizierter Servicepartner', 'Offizieller WABCO-Servicepartner mit direktem Zugang zu technischer Dokumentation.'),
    ],
    features: [
      feature('Activity', 'ABS & Bremssystem-Service', 'Diagnose, Wartung und Reparatur aller WABCO ABS, EBS und Druckluftbremssysteme.'),
      feature('Shield', 'Fahrerassistenzsysteme', 'Wartung und Kalibrierung von AEBS, LDWS, ACC und weiteren Assistenzsystemen.'),
      feature('Settings', 'Anhänger-Systeme', 'WABCO-Systeme für Sattelauflieger, Anhänger und Kipper – Diagnose und Reparatur.'),
      feature('Wrench', 'Original-Ersatzteile', 'Ausschliesslich WABCO-Originalteile für sichere und gesetzeskonforme Reparaturen.'),
    ],
    products: [
      product('WABCO ABS System', 'Antiblockiersystem für LKW und Anhänger – Diagnose und Service'),
      product('WABCO EBS', 'Elektronisches Bremssystem für höchste Bremspräzision'),
      product('WABCO AEBS', 'Automatisches Notbremssystem – gesetzlich vorgeschrieben ab 2024'),
      product('WABCO OptiFlow', 'Aerodynamiklösungen zur Kraftstoffreduzierung'),
    ],
  },

  hilltip: {
    tagline: 'HillTip. Winterdienst auf höchstem Niveau.',
    description: blocks(
      'HillTip ist ein finnischer Hersteller von professionellen Winterdienst- und Streugeräten für LKW, Pick-ups und Kommunalfahrzeuge. Die robusten Geräte sind speziell für den professionellen Einsatz bei härtesten Winterbedingungen entwickelt.',
      'Von Streuer und Pflug bis zu GPS-gesteuerten Multi-Funktion-Systemen bietet HillTip alles für effizienten Winterdienst. Ernst Moser GmbH ist autorisierter HillTip-Partner und bietet Beratung, Verkauf und Service.',
      'HillTip-Geräte überzeugen durch hohe Materialqualität, einfache Bedienung und digitale Integration – inklusive GPS-Tracking und Dokumentation für den Nachweis erbrachter Winterdienstleistungen.'
    ),
    highlights: [
      highlight('Snowflake', 'Winterdienst-Spezialisten', 'HillTip ist auf professionellen Winterdienst spezialisiert – entwickelt für härteste Bedingungen.'),
      highlight('Navigation', 'GPS & Dokumentation', 'Integriertes GPS-System für lückenlose Dokumentation aller Winterdiensteinsätze.'),
      highlight('Settings', 'Einfache Bedienung', 'Intuitive Steuerung und Montage – schnell bereit für den nächsten Einsatz.'),
      highlight('Shield', 'Robuste Qualität', 'Edelstahl- und Polyethylenbehälter für maximale Korrosionsbeständigkeit und lange Lebensdauer.'),
    ],
    features: [
      feature('Snowflake', 'Streuer & Salzgeräte', 'HillTip Spreader für Granulat, Salz und Splitt – für LKW und Pick-up.'),
      feature('Settings', 'Pflüge & Räumgeräte', 'Schneepflüge und Kehrgeräte für professionellen Winterdienst.'),
      feature('Navigation', 'IceStriker GPS-System', 'Digitale Dokumentation und GPS-Tracking für Nachweis und Abrechnung.'),
      feature('Wrench', 'Montage & Service', 'Professionelle Montage und jährlicher Service für maximale Einsatzbereitschaft.'),
    ],
    products: [
      product('HillTip 600L Spreader', 'Streuautomat 600 Liter für LKW – Granulat und Streusalz'),
      product('HillTip 1000L Pick-up Spreader', 'Aufbaustreuer für Pick-up und leichte Nutzfahrzeuge'),
      product('HillTip SnowStriker Pflug', 'Schneepflug für Pick-up und 3,5t-Transporter'),
      product('HillTip IceStriker GPS', 'Smarte Steuereinheit mit GPS-Dokumentation für Streuer'),
    ],
  },

  // ═══════════════════════════════════════════════════════
  // KOMMUNALCENTER (#C0392B)
  // ═══════════════════════════════════════════════════════

  alk: {
    tagline: 'Alkè. Elektrofahrzeuge für Profis.',
    description: blocks(
      'Alkè ist ein italienischer Hersteller von elektrischen Nutzfahrzeugen für Industrie, Kommunen, Flughäfen und Resorts. Die robusten E-Fahrzeuge vereinen Umweltfreundlichkeit mit hoher Leistungsfähigkeit im professionellen Einsatz.',
      'Als offizieller Alkè-Partner bietet Ernst Moser GmbH elektrische Transporter, Kipperfahrzeuge und Kommunalfahrzeuge für Gemeinden, Werkhöfe und Industriebetriebe in der Schweiz.',
      'Alkè-Fahrzeuge sind in Nationalparks, Ferienresorts, Flughäfen und Gemeinden weltweit im Einsatz – leise, emissionsfrei und überaus wartungsarm.'
    ),
    highlights: [
      highlight('Zap', '100% Elektrisch', 'Alle Alkè-Fahrzeuge fahren vollelektrisch – null Emissionen, null Lärm, minimale Betriebskosten.'),
      highlight('Truck', 'Bis 3.5 Tonnen', 'Alkè ATX bietet erstaunliche Traglast trotz kompakter Abmessungen und Elektroantrieb.'),
      highlight('Leaf', 'Ideal für Kommunen', 'Geräuscharmer Einsatz auch in Naturschutzgebieten, Resorts und belebten Fussgängerzonen.'),
      highlight('Settings', 'Aufbauflexibilität', 'Kipper, Pritsche, Reinigung, Feuerwehr – Alkè wird für jeden Bedarf ausgerüstet.'),
    ],
    features: [
      feature('Zap', 'Elektrofahrzeuge', 'Alkè ATX Elektrotransporter für Kommunen, Industrie, Flughäfen und Naturgebiete.'),
      feature('Truck', 'Kommunalaufbauten', 'Kipper, Kehrsauger, Grünschnitt-Aufbauten für Gemeindewerkhöfe.'),
      feature('Wrench', 'Service & Wartung', 'Fachgerechter E-Fahrzeug-Service mit Originalersatzteilen.'),
      feature('Leaf', 'Nachhaltige Mobilität', 'Zero-Emission-Lösungen für umweltbewusste Kommunen und Betriebe.'),
    ],
    products: [
      product('Alkè ATX 320E', 'Elektro-Transporter 1.500 kg Nutzlast für Kommunen'),
      product('Alkè ATX 340E Kipper', 'Elektrischer Kipptransporter für Werkhöfe'),
      product('Alkè ATX 330E', 'Grossräumiges E-Fahrzeug für Industriebetriebe'),
    ],
  },

  baoli: {
    tagline: 'Baoli. Staplerqualität aus dem Kion-Konzern.',
    description: blocks(
      'Baoli ist eine Marke des Kion-Konzerns (KION Group), dem zweitgrössten Flurfördergeräte-Hersteller der Welt. Baoli steht für wirtschaftliche, zuverlässige Stapler und Lagertechnik mit hervorragendem Preis-Leistungs-Verhältnis.',
      'Ernst Moser GmbH ist autorisierter Baoli-Händler in der Region. Wir bieten Gegengewichtsstapler, Schubmaststapler, Palettenhubwagen und Kommissionierer für Industrie, Handel und Logistik.',
      'Baoli-Stapler sind für mittlere Betriebe konzipiert, die professionelle Qualität zu erschwinglichen Konditionen suchen. Mit Diesel-, LPG- und Elektroantrieb gibt es für jeden Bedarf die passende Lösung.'
    ),
    highlights: [
      highlight('Building', 'Kion-Konzern Qualität', 'Baoli gehört zur KION Group – weltweiter Marktführer für Flurfördergeräte.'),
      highlight('Zap', 'Alle Antriebsarten', 'Diesel, LPG und Elektro – Baoli hat für jeden Einsatzort die richtige Energieform.'),
      highlight('Package', 'Komplettes Sortiment', 'Von Palettenhubwagen bis 10-Tonnen-Stapler – alles aus einer Hand.'),
      highlight('DollarSign', 'Bestes Preis-Leistungs-Verhältnis', 'Professionelle Stapler-Qualität zu wirtschaftlichen Konditionen für KMUs.'),
    ],
    features: [
      feature('Package', 'Stapler & Lagertechnik', 'Baoli Gegengewichtsstapler, Schubmaststapler und Lagertechnik für alle Branchen.'),
      feature('Wrench', 'Service & Wartung', 'Jährliche Inspektionen, Reparaturen und UVV-Prüfungen durch zertifizierte Techniker.'),
      feature('Settings', 'Miet- & Leasing', 'Flexible Miet- und Leasinglösungen für saisonale Bedarfsspitzen.'),
      feature('Shield', 'Originalteile', 'Schnelle Ersatzteilversorgung für minimale Ausfallzeiten.'),
    ],
    products: [
      product('Baoli KBD 20 Diesel', 'Gegengewichtsstapler 2.0 Tonnen, Dieselantrieb'),
      product('Baoli KBG 20 LPG', 'Gasstapler 2.0 Tonnen für Innen- und Ausseneinsatz'),
      product('Baoli KBE 20 Elektro', 'Elektrischer Gegengewichtsstapler 2.0 Tonnen'),
      product('Baoli KBS 12 Schubmast', 'Schubmaststapler für Hochregallager bis 12m'),
      product('Baoli KBP 14H Ameise', 'Elektrischer Palettenhubwagen für effiziente Lagerlogistik'),
    ],
  },

  envitec: {
    tagline: 'Envitec. Professionelle Streugeräte für den Winterdienst.',
    description: blocks(
      'Envitec ist ein Spezialist für professionelle Streugeräte aus hochwertigem Edelstahl – für maximale Korrosionsbeständigkeit und lange Lebensdauer. Die Streugeräte werden für den kommunalen und industriellen Winterdienst eingesetzt.',
      'Das Sortiment umfasst Aufbaustreugeräte, Schleuder-Streuer und Solestreuer in verschiedenen Grössen – von 0.3 m³ für leichte Nutzfahrzeuge bis zu 1.2 m³ für schwere Einsätze. Langlebige Materialien und effiziente Streutechnik reduzieren Ressourcenverbrauch und Betriebskosten.',
      'Ernst Moser GmbH ist Ihr Ansprechpartner für Envitec-Streugeräte in der Region Solothurn – mit Beratung, Verkauf und Serviceleistungen.'
    ),
    highlights: [
      highlight('Snowflake', 'Edelstahl-Qualität', 'Alle Envitec-Streugeräte aus hochwertigem Edelstahl – maximale Korrosionsbeständigkeit und jahrelange Haltbarkeit.'),
      highlight('Settings', 'Vollständiges Sortiment', 'Aufbaustreuer, Schleuder-Streuer und Solestreuer in allen Grössen für jeden Fahrzeugtyp.'),
      highlight('Shield', 'Effiziente Streutechnik', 'Präzise Dosierung reduziert Salzverbrauch und schont die Umwelt.'),
      highlight('Leaf', 'Niedrige Betriebskosten', 'Wartungsarme Konstruktion und hochwertige Komponenten für kosteneffizienten Winterdienst.'),
    ],
    features: [
      feature('Snowflake', 'Aufbaustreugeräte', 'Envitec Aufbaustreuer 0.3–1.2 m³ für Pickup, leichte Nutzfahrzeuge und LKW.'),
      feature('Settings', 'Schleuder- und Solestreuer', 'Leistungsstarke Schleuder-Streuer 500–1200 Liter und Solestreuer für professionellen Glättebekämpfung.'),
      feature('Wrench', 'Service & Wartung', 'Fachgerechte Wartung und Reparatur durch ausgebildete Techniker.'),
      feature('Shield', 'Sicherheit im Winter', 'Zuverlässige Streutechnik für sichere Strassen, Wege und Plätze im Winterdienst.'),
    ],
    products: [
      product('Envitec Aufbaustreugerät 0.3–0.7 m³', 'Kompakte Aufbaustreuer für Pickup und leichte Nutzfahrzeuge'),
      product('Envitec Aufbaustreugerät 0.6/0.8 m³', 'Mittelgrosse Streuer für professionellen Winterdienstbetrieb'),
      product('Envitec Schleuder-Streuer 500–1200 L', 'Leistungsstarke Grossstreuer für Gemeinden und Dienstleister'),
      product('Envitec ENS1060H', 'Kompakter Aufbaustreuer für Pickup-Einsatz'),
      product('Envitec Solestreuer', 'Solestreuer für effiziente und umweltschonende Glättebekämpfung'),
    ],
  },

  greentec: {
    tagline: 'Greentec. Mulchen. Mähen. Professionell.',
    description: blocks(
      'Greentec ist ein dänischer Hersteller von professionellen Mulch- und Mähgeräten für Traktoren, Kommunalfahrzeuge und Ausleger. Die Geräte werden für anspruchsvolle Vegetationspflege an Strassen, Böschungen und Gewässerufern eingesetzt.',
      'Mit über 30 Jahren Erfahrung produziert Greentec robuste, langlebige Mulchköpfe und Auslegersysteme für Kommunen, Strassenbauunternehmen und Lohnunternehmer. Ernst Moser GmbH ist Ihr Greentec-Spezialist in der Zentralschweiz.',
      'Greentec-Geräte sind bekannt für ihre Leistungsstärke, geringen Wartungsaufwand und lange Lebensdauer – selbst im härtesten Dauereinsatz bei Böschungspflege und Heckenschnitt.'
    ),
    highlights: [
      highlight('Scissors', 'Professionelle Vegetationspflege', 'Greentec-Mulcher für Strassenbords, Böschungen, Gewässerrandstreifen und Parks.'),
      highlight('Settings', 'Modulare Ausleger', 'Greentec Trimax und Multi-Ausleger bis 6m Reichweite für schwierige Lagen.'),
      highlight('Shield', 'Robuste Konstruktion', 'Verstärkte Gehäuse und hochwertige Schlegelmesser für langen Lebenszyklus.'),
      highlight('Award', 'Dänische Qualität', '30+ Jahre Erfahrung im Profi-Mulchgerätebau – gewählt von Kommunen in über 40 Ländern.'),
    ],
    features: [
      feature('Scissors', 'Mulchgeräte & Mäher', 'Greentec Schlegelmulcher und Sichelmäher für Traktoren und Kommunalfahrzeuge.'),
      feature('Settings', 'Auslegertechnik', 'Greentec Multisaw und Ausleger für Böschungen, Hecken und Strassenbords.'),
      feature('Wrench', 'Service & Verschleiss', 'Schlegelmesser-Wechsel, Riemenwartung und Saisonservice durch Fachbetrieb.'),
      feature('Users', 'Beratung & Demo', 'Produktdemonstrationen vor Ort für Kommunen und Lohnunternehmer.'),
    ],
    products: [
      product('Greentec HFS 280', 'Frontmulcher 280 cm für Kommunalfahrzeuge'),
      product('Greentec RM 2800 Auslegermulcher', 'Böschungsmulcher mit 6m-Ausleger für Strassenbauunternehmen'),
      product('Greentec HC 260', 'Hecken- und Böschungsschneider mit Ausleger'),
      product('Greentec Mulchkopf', 'Austauschbarer Mulchkopf für Bagger und Radlader'),
    ],
  },

  'gianni-ferrari': {
    tagline: 'Gianni Ferrari. Präzision für den Perfektionisten.',
    description: blocks(
      'Gianni Ferrari ist ein italienischer Hersteller von professionellen Rasenmähern und Pflegemaschinen für Sport-, Golf- und Freizeitanlagen. Das Unternehmen steht für höchste Präzision beim Schnittbild und exzellente Verarbeitung.',
      'Ernst Moser GmbH bietet Gianni Ferrari Rasenmäher, Pflegemaschinen und Zubehör für Sportplätze, Golfanlagen und hochwertige Grünanlagen in der Schweiz.',
      'Die Maschinen von Gianni Ferrari vereinen Robustheit mit Präzision – für ein perfektes Schnittbild auch auf grossen Flächen und bei professionellem Dauereinsatz.'
    ),
    highlights: [
      highlight('Scissors', 'Perfektes Schnittbild', 'Gianni Ferrari-Messer schneiden präzise und gleichmässig – auf Golfgrün bis Sportplatz.'),
      highlight('Settings', 'Profi-Antriebe', 'Leistungsstarke Benzin- und Dieselmotoren für grösste Flächen im Dauereinsatz.'),
      highlight('Award', 'Made in Italy', 'Handwerkliche Fertigung und hochwertige Materialien aus Italian Manufacturing.'),
      highlight('Users', 'Ideal für Sportstätten', 'Speziell entwickelt für Fussball-, Leichtathletik- und Golfflächen.'),
    ],
    features: [
      feature('Scissors', 'Aufsitzmäher & Grossflächenmäher', 'Gianni Ferrari Mähmaschinen für Sportplätze, Golfanlagen und Parkanlagen.'),
      feature('Settings', 'Pflege & Wartung', 'Saisonservice, Messerschärfung und Generalüberholung durch geschulte Techniker.'),
      feature('Package', 'Zubehör & Anbaugeräte', 'Belüfter, Vertikutierer und Kehrgeräte als Anbaugeräte für Gianni Ferrari-Maschinen.'),
      feature('Users', 'Beratung für Sportstätten', 'Individuelle Beratung für Clubs, Gemeinden und Golfanlagen.'),
    ],
    products: [
      product('Gianni Ferrari Turbo 4', 'Profi-Aufsitzmäher mit 4-Rad-Antrieb für Sportflächen'),
      product('Gianni Ferrari Super Roller', 'Hochfrequenz-Mähmaschine für Golfgreens und Rasenpflege'),
      product('Gianni Ferrari PG 210', 'Grossflächenmäher 210 cm für Parkanlagen'),
    ],
  },

  hako: {
    tagline: 'Hako. Reinigung und Kommunaltechnik aus einer Hand.',
    description: blocks(
      'Hako ist ein renommierter deutscher Hersteller von Reinigungs- und Kommunalmaschinen. Seit 1948 entwickelt Hako innovative Lösungen für Strassen-, Hallen- und Aussenflächenreinigung sowie für kommunale Pflege- und Winterdienstaufgaben.',
      'Von Kehrmaschinen über Bodenreiniger bis zu Geländefahrzeugen bietet Hako ein umfassendes Programm für Gemeinden, Gebäudereiniger und Industriebetriebe. Ernst Moser GmbH ist autorisierter Hako-Händler und Servicepartner.',
      'Hako-Maschinen sind bekannt für ihre Langlebigkeit, einfache Bedienung und niedrigen Betriebskosten. Das dichte Servicenetz garantiert schnelle Hilfe bei allen Anliegen.'
    ),
    highlights: [
      highlight('Sparkles', '75+ Jahre Reinigungserfahrung', 'Hako steht seit 1948 für Innovation in der professionellen Reinigungs- und Kommunaltechnik.'),
      highlight('Leaf', 'Nachhaltige Technologie', 'Wassersparende Reinigungssysteme und elektrische Antriebe für umweltbewusste Kommunen.'),
      highlight('Settings', 'Komplettanbieter', 'Kehrmaschinen, Bodenreiniger, Winterdienstgeräte und Kommunalmaschinen – alles von Hako.'),
      highlight('Shield', 'Hako-Service-Netz', 'Dichte Serviceabdeckung in der gesamten Schweiz für maximale Verfügbarkeit.'),
    ],
    features: [
      feature('Sparkles', 'Kehrmaschinen & Reiniger', 'Hako Citymaster, Hakomatic und Scrubmaster für Strassen, Hallen und Aussenflächen.'),
      feature('Snowflake', 'Winterdienst', 'Hako Winterdienstgeräte für Streuen, Räumen und Kehren in Kommunen.'),
      feature('Wrench', 'Hako-Service', 'Autorisierter Servicebetrieb mit Originalteilen und Garantieleistungen.'),
      feature('Users', 'Miet- & Leasingangebote', 'Flexible Mietlösungen für saisonale Reinigungsaufgaben und Eventveranstaltungen.'),
    ],
    products: [
      product('Hako Citymaster 1600', 'Saugkehrmaschine für Strassen und Plätze'),
      product('Hako Hakomatic B 450', 'Scheuersaugmaschine für Hallenböden'),
      product('Hako Sweepmaster 650', 'Kompakt-Kehrmaschine für Innenhöfe und Fussgängerzonen'),
      product('Hako Hakotrac 1700D', 'Kommunalfahrzeug für Sommer- und Winterdienst'),
    ],
  },

  kubota: {
    tagline: 'Kubota. For Earth, For Life.',
    description: blocks(
      'Kubota ist ein japanischer Weltkonzern mit über 130 Jahren Geschichte und führender Hersteller von Traktoren, Kompaktbaumaschinen, Rasenmähern und Motorgeräten. In über 110 Ländern vertrauen Landwirte, Kommunen und Gärtner auf Kubota.',
      'Ernst Moser GmbH ist Ihre Kubota-Anlaufstelle in der Region Solothurn. Wir bieten die komplette Kubota-Palette für Landwirtschaft, Kommunalpflege und Grünanlagen – mit vollständigem Service und Ersatzteilversorgung.',
      'Kubota-Maschinen stehen für japanische Präzision, hohe Zuverlässigkeit und innovative Technologie. Ob Subkompakttraktor, Multicar oder Aufsitzmäher – Kubota liefert die passende Lösung.'
    ),
    highlights: [
      highlight('Globe', '130+ Jahre Welterfahrung', 'Kubota gehört zu den ältesten und vertrauenswürdigsten Maschinenbaukonzernen weltweit.'),
      highlight('Leaf', 'Für Erde und Leben', 'Kubotas Unternehmensphilosophie "For Earth, For Life" steht für Nachhaltigkeit und Verantwortung.'),
      highlight('Settings', 'Umfassendstes Sortiment', 'Traktoren, Bagger, Mäher, Ladegeräte – Kubota deckt alle Bereiche der Grün- und Landtechnik ab.'),
      highlight('Award', 'Tractor of the Year', 'Kubota-Traktoren wurden mehrfach mit internationalen Auszeichnungen prämiert.'),
    ],
    features: [
      feature('Tractor', 'Traktoren & Kommunalfahrzeuge', 'Kubota Traktoren und Multicar für Landwirtschaft, Kommunen und Grünpflege.'),
      feature('Scissors', 'Rasenmäher & Mähroboter', 'Kubota Aufsitzmäher, Zeroturner und Mähroboter für grosse und kleine Flächen.'),
      feature('Wrench', 'Kubota-Werkstatt', 'Autorisierter Service mit Originalteilen – schnell und fachkundig.'),
      feature('Package', 'Anbaugeräte & Zubehör', 'Frontlader, Heckschaufel, Streuer und weitere Anbaugeräte für Kubota-Traktoren.'),
    ],
    products: [
      product('Kubota BX Serie', 'Subkompakttraktor 15–25 PS für Garten und kleines Grün'),
      product('Kubota B Serie', 'Kompakttraktor 20–35 PS für Weinbau und Kommunalpflege'),
      product('Kubota L Serie', 'Vielseitiger Traktor 35–60 PS für Landwirtschaft und Kommunen'),
      product('Kubota F Serie Frontmäher', 'Profi-Frontmäher für grosse Rasenflächen'),
      product('Kubota G Serie Aufsitzmäher', 'Aufsitzmäher für Privatgärten und kleine Parks'),
    ],
  },

  matev: {
    tagline: 'matev. Anbaugeräte für Traktor und Transportfahrzeuge.',
    description: blocks(
      'matev ist ein bayerischer Hersteller von professionellen Anbaugeräten für Traktoren, Transporter und Kommunalfahrzeuge. Das Produktprogramm umfasst Kehrgeräte, Kehrsaugmaschinen, Schneefräsen und Streugeräte für ganzjährigen Einsatz.',
      'Ernst Moser GmbH bietet matev-Anbaugeräte für Kommunen, Lohnunternehmer und Forstbetriebe in der Region Solothurn. Mit matev-Geräten werden Standard-Fahrzeuge zu leistungsstarken Kommunalmaschinen.',
      'Ob Winterdienst, Strassenunterhalt oder Grünpflege – matev hat für jede Jahreszeit und jeden Einsatz das passende Anbaugerät. Kompromisslose Qualität "Made in Bavaria".'
    ),
    highlights: [
      highlight('Settings', 'Universal-Anbausystem', 'matev-Geräte passen an fast alle Traktoren und Transporter mit Standardhydraulik.'),
      highlight('Snowflake', 'Ganzjahreseinsatz', 'Sommer: Kehren und Fegen. Winter: Schneeräumen und Streuen. Ein Fahrzeug – alle Jahreszeiten.'),
      highlight('Award', 'Made in Bavaria', 'Präzise gefertigt im bayerischen Zorneding – für höchste Qualität und Langlebigkeit.'),
      highlight('Wrench', 'Einfache Montage', 'Schnellwechselsystem für einfachen Gerätewechsel ohne Werkzeug.'),
    ],
    features: [
      feature('Sparkles', 'Kehr- und Kehrsauggeräte', 'matev Kehrmaschinenvorsätze für Traktoren und 3,5t-Transporter.'),
      feature('Snowflake', 'Winterdienstgeräte', 'matev Schneefräsen, Pflüge und Streuautomaten für Traktor und Transporter.'),
      feature('Settings', 'Anbausystem', 'matev Schnellwechselsystem für schnellen Gerätewechsel.'),
      feature('Wrench', 'Service & Ersatzteile', 'Schnelle Ersatzteilversorgung und Reparatur.'),
    ],
    products: [
      product('matev Kehrvorsatz K-650', 'Kehrgerät 650 cm für Transporter und Traktor'),
      product('matev Schneefräse SF-200', 'Zweistufige Schneefräse 200 cm für Traktor-Front'),
      product('matev Kehrsaugmaschine KSM', 'Kehrsauger mit Wassersprüheinrichtung'),
      product('matev Streuautomat SA', 'Salzstreuer für Winterdienst auf Traktor'),
    ],
  },

  'ligier-professional': {
    tagline: 'Ligier Professional. Leichte Nutzfahrzeuge für Profis.',
    description: blocks(
      'Ligier Professional ist die Nutzfahrzeugsparte des französischen Ligier-Konzerns und bietet führerscheinfreie sowie leichte Nutzfahrzeuge für Kommunen, Handwerksbetriebe und Logistik. Die Fahrzeuge sind speziell für enge Stadtstrassen und Innenhöfe konzipiert.',
      'Ernst Moser GmbH bietet Ligier Professional Fahrzeuge für Kommunen, Reinigungsunternehmen und Handwerker in der Schweiz. Mit Elektro- und Dieselantrieb sind die Ligier-Fahrzeuge vielseitig einsetzbar.',
      'Ligier Professional Fahrzeuge sind die ideale Lösung für Kommunen, die ein wendiges, kostengünstiges Nutzfahrzeug für Unterhalt, Reinigung und Transport suchen.'
    ),
    highlights: [
      highlight('Navigation', 'Extrem wendig', 'Kleiner Wendekreis für engstes Stadtgebiet, Fussgängerzonen und Parkanlagen.'),
      highlight('Zap', 'Diesel und Elektro', 'Ligier Professional in Diesel und Elektro – für jeden Einsatz die passende Energie.'),
      highlight('Shield', 'Führerscheinfrei', 'Bestimmte Ligier-Modelle sind führerscheinfrei – ideal für kommunale Hilfsarbeiten.'),
      highlight('Award', 'Französische Qualität', 'Ligier ist seit 1969 in der Fahrzeugentwicklung tätig – mit bewährter Zuverlässigkeit.'),
    ],
    features: [
      feature('Navigation', 'Kommunalfahrzeuge', 'Ligier Professional für Strassenunterhalt, Grünpflege und Kommunalarbeiten.'),
      feature('Zap', 'Elektro-Versionen', 'Vollelektrische Ligier-Fahrzeuge für emissionsarme Stadtmobilität.'),
      feature('Wrench', 'Service & Wartung', 'Regelmässige Wartung und Reparatur durch geschulte Techniker.'),
      feature('Users', 'Beratung & Probefahrt', 'Individuelle Beratung und Probefahrten für Gemeinden und Betriebe.'),
    ],
    products: [
      product('Ligier JS50 L', 'Leichtes Nutzfahrzeug für Stadtbetrieb und Kommunen'),
      product('Ligier Pulse 4', 'Elektro-Kleintransporter für emissionsfreie Letzte Meile'),
    ],
  },

  mulchy: {
    tagline: 'Mulchy. Der Experte für Grüngutpflege.',
    description: blocks(
      'Mulchy ist ein Spezialist für Mulch- und Häckselmaschinen für professionellen Einsatz in Kommunen, Gartenbau und Landwirtschaft. Die Maschinen verarbeiten Grüngut, Äste und organische Materialien effizient zu wertvollem Mulch.',
      'Ernst Moser GmbH bietet Mulchy-Maschinen für Grünanlagenunterhalt, Kompostierungsanlagen und Landwirtschaftsbetriebe in der Region Solothurn.',
      'Mit verschiedenen Maschinentypen für jede Betriebsgrösse und jeden Einsatz bietet Mulchy massgeschneiderte Lösungen für die professionelle Grüngutverarbeitung.'
    ),
    highlights: [
      highlight('Scissors', 'Effiziente Grüngutverarbeitung', 'Mulchy-Häcksler verarbeiten Äste, Strauchschnitt und Grünabfälle effizient zu Mulch.'),
      highlight('Leaf', 'Nachhaltiger Kreislauf', 'Mulch aus eigenem Grünschnitt spart Entsorgungskosten und düngt natürlich.'),
      highlight('Settings', 'Profi-Technik', 'Hochwertige Messer und Rotor-Systeme für langen Betrieb und geringe Wartung.'),
      highlight('Truck', 'Anbau & Selbstfahrend', 'Mulchy-Maschinen als Traktor-Anbaugeräte oder selbstfahrend erhältlich.'),
    ],
    features: [
      feature('Scissors', 'Häcksler & Mulchmaschinen', 'Mulchy für Kommunen, Gartenbaubetriebe und Lohnunternehmer.'),
      feature('Leaf', 'Kompostierungsanlagen', 'Hochleistungshäcksler für grosse Kompostierungsanlagen.'),
      feature('Wrench', 'Service & Messer', 'Messerwechsel, Schärfung und Wartung für optimale Schnittleistung.'),
      feature('Users', 'Beratung vor Ort', 'Demonstration und Beratung direkt auf Ihrer Anlage.'),
    ],
    products: [
      product('Mulchy PTO 200', 'Anbau-Häcksler 200 cm für Traktor'),
      product('Mulchy TR 300', 'Trommelhäcksler für grosse Mengen Grüngut'),
    ],
  },

  reform: {
    tagline: 'Reform. Berglandtechnik seit 1949.',
    description: blocks(
      'Reform ist ein österreichischer Hersteller von Spezialmaschinen für den Berglandbereich. Seit 1949 produziert Reform in Wels Motormäher, Bergmähmaschinen, Mehrzweckgeräte und Transporter speziell für die Anforderungen der Alpenlandwirtschaft.',
      'Reform-Maschinen sind in der Schweiz bei Bergbauern, Alpgenossenschaften und Kommunen unverzichtbar. Ihre Konstruktion ist auf Hangarbeit, extreme Steigungen und rauhes Gelände ausgelegt.',
      'Ernst Moser GmbH ist Ihr Reform-Partner in der Region. Wir beraten Sie zu Motormähern, Mehrzweckgeräten und Anbaugeräten für die Berglandwirtschaft.'
    ),
    highlights: [
      highlight('Mountain', 'Berg-Spezialist seit 1949', 'Reform entwickelt seit über 75 Jahren Maschinen speziell für die Alplandwirtschaft.'),
      highlight('Shield', 'Extrem sicher an Hängen', 'Spezialkonstruktion mit tiefem Schwerpunkt und Sicherheitssystemen für steile Hänge.'),
      highlight('Settings', 'Vielseitig einsetzbar', 'Von Motormähern bis Transporter – Reform-Maschinen decken alle Bergbetrieb-Aufgaben ab.'),
      highlight('Award', 'Österreichische Qualität', 'Solide Konstruktion und höchste Fertigungsstandards aus dem österreichischen Wels.'),
    ],
    features: [
      feature('Mountain', 'Bergmäher & Motormäher', 'Reform Motormäher für steile Hänge, schmale Bergwiesen und schwieriges Gelände.'),
      feature('Truck', 'Mehrzweckgeräte', 'Reform Mounty Mehrzweckfahrzeuge für Mähen, Transport und Winterdienst im Berggebiet.'),
      feature('Scissors', 'Anbaugeräte', 'Mähwerke, Zetter, Heuer und Frontlader als Anbaugeräte für Reform-Maschinen.'),
      feature('Wrench', 'Service & Reparatur', 'Fachgerechter Service und Originalersatzteile für Reform-Maschinen.'),
    ],
    products: [
      product('Reform Motormäher M 2.60', 'Handgeführter Motormäher für Hangwiesen bis 45°'),
      product('Reform Mounty 100V', 'Mehrzweck-Bergfahrzeug für Mähen, Laden und Transportieren'),
      product('Reform Muli 600V', 'Bergтранспорter mit 4-Rad-Antrieb für alpines Gelände'),
    ],
  },

  springer: {
    tagline: 'Springer. Hochleistungsstreuer für professionellen Winterdienst.',
    description: blocks(
      'SPRINGER ist ein Spezialist für Hochleistungsstreuer und Streuautomaten für den kommunalen und gewerblichen Winterdienst. Die Geräte überzeugen durch Prozesssicherheit, Qualität und Innovation – jahrzehntelange Praxis im Winterdienst macht SPRINGER zu einem verlässlichen Partner.',
      'Das Sortiment umfasst Aufbaustreugeräte, Dreipunkt-Streuautomaten, Einschnecken- und Aufsatz-Streuautomaten sowie Kombi-Solestreuer und Traktor-Selbstladestreuer für alle Fahrzeugtypen.',
      'Ernst Moser GmbH ist Ihr Springer-Ansprechpartner in der Region Solothurn für Beratung, Verkauf und Service. Springer garantiert fehlerfreie Abläufe – von der Konstruktion bis zum täglichen Einsatz.'
    ),
    highlights: [
      highlight('Snowflake', 'Hochleistungsstreuer', 'Springer produziert Profi-Streugeräte für den anspruchsvollen kommunalen Winterdienst.'),
      highlight('Shield', 'Prozesssicherheit', 'Fehlerfreie Abläufe – von der Konstruktion bis zum täglichen Einsatz garantiert.'),
      highlight('Settings', 'Umfassendes Sortiment', 'Aufbaustreuer, Dreipunkt, Selbstlader, Solestreuer, Unimog-Einhänger – alles von Springer.'),
      highlight('Award', 'Innovation & Qualität', 'Jahrzehntelange Praxis im Winterdienst machen Springer zum führenden Hersteller.'),
    ],
    features: [
      feature('Snowflake', 'Aufbau- & Dreipunkt-Streuer', 'Springer Aufbaustreugeräte und Dreipunkt-Streuautomaten für Traktor und Fahrzeug.'),
      feature('Settings', 'Traktor-Selbstladestreuer', 'TSS-1200 und TSS-1300 Doppelkammer für maximale Effizienz im Winterdienst.'),
      feature('Droplets', 'Solestreuer & Kombisysteme', 'Kombi-Solestreuer für präzise und umweltschonende Glättebekämpfung.'),
      feature('Wrench', 'Service & Wartung', 'Fachgerechte Wartung und Reparatur durch unsere ausgebildeten Techniker.'),
    ],
    products: [
      product('Springer Aufbaustreugeräte 0.3–0.7 m³', 'Kompakte Aufbaustreuer für Pickup und leichte Nutzfahrzeuge'),
      product('Springer Aufbaustreugeräte 0.6/0.8 m³', 'Mittelgrosse Aufbaustreuer für professionellen Winterdienst'),
      product('Springer Schleuder-Streuer 500–1200 L', 'Leistungsstarke Grossstreuer für Gemeinden und Dienstleister'),
      product('Springer SD-211 Dreipunkt-Streuautomat', 'Dreipunkt-Streuautomat für Traktoreinsatz'),
      product('Springer STA-550 Einschnecken-Streuautomat', 'Einschnecken-Streuautomat für präzise Streumittelausbringung'),
      product('Springer ASE-250/400 Aufsatz-Streuautomat', 'Aufsatz-Streuautomat für Fahrzeugaufbau'),
      product('Springer Kombi-Solestreuer', 'Kombisystem für Salz und Sole für effiziente Glättebekämpfung'),
      product('Springer TSS-1200/1300 Selbstladestreuer', 'Traktor-Selbstladestreuer bis 1300 Liter'),
    ],
  },

  stema: {
    tagline: 'Stema. Kommunale Motorgeräte für Profis.',
    description: blocks(
      'Stema ist ein Hersteller von kommunalen Motorgeräten und Maschinen – speziell für den Schweizer Markt entwickelt und nach Kundenwünschen gefertigt. Das Produktsortiment umfasst Einachser, Kombimaschinen, Mulchmäher, Balkenmäher sowie Geräte zur Wildkrautbekämpfung.',
      'Die Stema Einachser und Kombimaschinen sind leistungsstarke Allrounder für kommunale Grünpflege, Wegesanierung und Flächenunterhalt. Wildkrautbürsten und Wildkrautbrenner ermöglichen chemiefreie Unkrautbekämpfung auf befestigten Flächen.',
      'Ernst Moser GmbH ist Ihr Stema-Partner in der Region Solothurn für Beratung, Verkauf und Service.'
    ),
    highlights: [
      highlight('Leaf', 'Kommunale Motorgeräte', 'Einachser, Kombimaschinen und Mulchmäher für professionelle Grünpflege.'),
      highlight('Scissors', 'Wildkrautbekämpfung', 'Mechanische Bürsten und thermische Brenner für chemiefreie Unkrautbekämpfung.'),
      highlight('Shield', 'Schweizer Markt', 'Teilweise speziell für den Schweizer Markt und nach Kundenwünschen entwickelt.'),
      highlight('Settings', 'Vielseitigkeit', 'Von Einachser bis Aufsitzmäher – Stema deckt den gesamten Kommunalbereich ab.'),
    ],
    features: [
      feature('Leaf', 'Einachser & Kombimaschinen', 'Stema Einachser MAK-17-S und Kombimaschinen für professionellen Einsatz.'),
      feature('Scissors', 'Mulch- & Balkenmäher', 'Schlegel-Mulchmäher TTR-680 und Sichelmulchmäher für grosse Flächen.'),
      feature('Leaf', 'Wildkrautbekämpfung', 'Mechanische Wildkrautbürsten und thermische Brenner ohne Chemie.'),
      feature('Wrench', 'Service & Reparatur', 'Fachgerechte Wartung und Reparatur aller Stema-Motorgeräte.'),
    ],
    products: [
      product('Stema Einachser MAK-17-S 2-Zyl.', 'Leistungsstarker Einachser mit 2-Zylinder-Motor für Kommunaleinsatz'),
      product('Stema Kombimaschine KAM-13-S', 'Vielseitige Kombimaschine mit Benzinantrieb für verschiedene Anbaugeräte'),
      product('Stema Schlegel-Mulchmäher TTR-680', 'Schlegelmulchmäher 680 cm für professionellen kommunalen Einsatz'),
      product('Stema Aufsitz-Wildwuchsmäher', 'Aufsitzender Wildwuchsmäher für grosse Flächen'),
      product('Stema Wildkrautbürsten', 'Mechanische Wildkrautbekämpfung ohne Chemie'),
      product('Stema Wildkrautbrenner', 'Thermische Wildkrautbekämpfung für befestigte Flächen'),
    ],
  },

  timan: {
    tagline: 'TIMAN. Hangmäher und Forsttechnik für schwieriges Gelände.',
    description: blocks(
      'TIMAN ist ein österreichischer Hersteller von ferngesteuerten Hangmähern und Forsttechnik für Forstbetriebe, Land- und Kommunalwirtschaft. Das Flaggschiff ist der TIMAN RC-751 – ein leistungsstarker funkferngesteuerter Hangmäher für Arbeiten in steilem und schwer zugänglichem Gelände.',
      'Durch die Fernsteuerung kann der Bediener sicher am Böschungsrand arbeiten, während die Maschine selbstständig Hänge, Böschungen und unzugängliche Flächen mäht. Dies maximiert Sicherheit und Effizienz in extremem Gelände.',
      'Ernst Moser GmbH ist Ihr TIMAN-Ansprechpartner in der Region Solothurn – für Hangpflege, kommunale Böschungsmahd und Forstarbeiten in der Schweiz.'
    ),
    highlights: [
      highlight('Mountain', 'Ferngesteuerter Hangmäher', 'TIMAN RC-751: sicheres Mähen in steilem und schwer zugänglichem Gelände per Funk.'),
      highlight('Shield', 'Maximale Sicherheit', 'Bediener bleibt sicher am Böschungsrand – keine Unfallgefahr durch Umkippen.'),
      highlight('Wrench', 'Österreichische Qualität', 'Robuste Stahlkonstruktion für den harten Dauereinsatz im Berggebiet.'),
      highlight('Settings', 'Individuelle Aufbauten', 'Forstanhänger, Kipperaufbauten und Spezialausführungen nach Kundenwunsch.'),
    ],
    features: [
      feature('Mountain', 'Hangmäher RC-751', 'Ferngesteuerter Hangmäher für Böschungen, Hänge und schwer zugängliche Flächen.'),
      feature('TreePine', 'Forstanhänger & Forsttechnik', 'TIMAN Forstanhänger für den Holztransport im Berggelände.'),
      feature('Package', 'Kipper & Transport', 'TIMAN Kipper für Schüttgut, Erde und Forstmaterial.'),
      feature('Wrench', 'Service & Reparatur', 'Fachgerechte Wartung und Reparatur aller TIMAN-Produkte.'),
    ],
    products: [
      product('TIMAN Forstanhänger', 'Robuster Forstanhänger für den Holztransport'),
      product('TIMAN Kipper', 'Geländetauglicher Kipperanhänger für Forst und Landwirtschaft'),
    ],
  },

  zaugg: {
    tagline: 'Zaugg. Schneefräsen aus der Schweiz.',
    description: blocks(
      'Zaugg AG Eggiwil ist ein Schweizer Unternehmen mit über 70 Jahren Erfahrung in der Herstellung von Schneefräsen, Schneepflügen und Schneekanonen für professionellen Winterdienst. Die Maschinen werden kompromisslos für den Einsatz bei extremen Schweizer Winterbedingungen entwickelt.',
      'Zaugg-Schneefräsen sind in Schweizer Gemeinden, Skistationen und Bergbahnen allgegenwärtig. Die robusten, leistungsstarken Maschinen bewältigen auch härteste Schneemengen und Eisplatten zuverlässig.',
      'Ernst Moser GmbH ist Ihr Zaugg-Partner in der Region Solothurn – für Beratung, Verkauf und den kompletten Service aller Zaugg-Produkte.'
    ),
    highlights: [
      highlight('Snowflake', 'Schweizer Winterdienst-Legende', 'Zaugg produziert seit 1948 Schneefräsen speziell für Schweizer Verhältnisse.'),
      highlight('Mountain', 'Extrembedingungen-erprobt', 'Zaugg-Geräte arbeiten zuverlässig auch bei -25°C und in Hochlagen über 3.000m.'),
      highlight('Shield', 'Langlebigkeit garantiert', 'Massiver Stahlbau und hochwertige Komponenten für jahrzehntelangen Betrieb.'),
      highlight('Award', 'Made in Switzerland', 'Echter Schweizer Qualitätsbau – entwickelt und produziert in Eggiwil BE.'),
    ],
    features: [
      feature('Snowflake', 'Schneefräsen & Pflüge', 'Zaugg Anbau-Schneefräsen und Schneepflüge für Traktor und Kommunalfahrzeug.'),
      feature('Mountain', 'Schneekanonen & Beschneiung', 'Zaugg Schneekanonen für Skigebiete und Beschneiungsanlagen.'),
      feature('Wrench', 'Zaugg-Werkstatt', 'Autorisierter Schweizer Service mit Originalteilen und Garantiearbeiten.'),
      feature('Settings', 'Saisonservices', 'Vor-Saison-Service und Einlagerung für maximale Winterdienst-Bereitschaft.'),
    ],
    products: [
      product('Zaugg Anbaufräse SF 75', 'Traktor-Anbaufräse 75 cm Wurfweite für Gemeinden'),
      product('Zaugg Anbaufräse SF 165', 'Leistungsstarke Grossfräse 165 cm für Bergbahnen'),
      product('Zaugg Schneepflug PS 65', 'Strassenpflug für Traktor – Privat und Kommunal'),
      product('Zaugg Schneekanone', 'Propellerkanone für Skigebiete und Beschneiungsanlagen'),
    ],
  },

  // ═══════════════════════════════════════════════════════
  // MOTORGERÄTECENTER (#4A7C59)
  // ═══════════════════════════════════════════════════════

  ambrogio: {
    tagline: 'Ambrogio. Der intelligente Mähroboter.',
    description: blocks(
      'Ambrogio ist ein führender italienischer Hersteller von Mährobotern für private und professionelle Grünanlagen. Die Mähroboter von Ambrogio gelten als besonders zuverlässig, leise und smart – mit fortschrittlichster KI-Technologie und GPS-Navigation.',
      'Von kompakten Heimgartenrobotern bis zu gewerblichen Grossflächengeräten bietet Ambrogio Lösungen für jede Rasengrösse. Ernst Moser GmbH ist autorisierter Ambrogio-Partner und bietet Verkauf, Installation und Service.',
      'Ambrogio-Mähroboter sind in der Schweiz sehr beliebt – dank Mehrzonenmanagement, GPS-Diebstahlschutz und der Möglichkeit, ohne Begrenzungsdraht zu arbeiten.'
    ),
    highlights: [
      highlight('Bot', 'Ohne Begrenzungsdraht', 'Ambrogio Twenty ist einer der wenigen Mähroboter ohne lästigen Draht im Boden – dank GPS.'),
      highlight('Navigation', 'GPS-Navigation', 'Präzise GPS-Ortung für effiziente Mährouten und genaue Positionierung.'),
      highlight('Wifi', 'App-Steuerung', 'Volle Kontrolle via Smartphone-App – Zeitpläne, Statusabfragen und Fehlermeldungen.'),
      highlight('Leaf', 'Leise & Ökologisch', 'Elektrischer Antrieb – ideal für ruhige Wohngebiete und ökologische Grünanlagen.'),
    ],
    features: [
      feature('Bot', 'Mähroboter-Verkauf', 'Ambrogio Mähroboter für Privatgärten 200–5.000 m² und gewerbliche Flächen.'),
      feature('Settings', 'Installation & Einrichtung', 'Professionelle Installation inkl. Begrenzungsdraht oder GPS-Einrichtung.'),
      feature('Wrench', 'Winterservice & Wartung', 'Saisonservice, Messerservice und Reinigung für optimale Mähleistung.'),
      feature('Wifi', 'App & Konnektivität', 'Einrichtung der Ambrogio-App und WLAN-Verbindung durch unsere Techniker.'),
    ],
    products: [
      product('Ambrogio L15 Deluxe', 'Mähroboter bis 600 m² – kompakt und zuverlässig'),
      product('Ambrogio L30 Elite', 'Mähroboter bis 1.500 m² mit GPS und App-Steuerung'),
      product('Ambrogio L85 Elite', 'Gewerblicher Mähroboter bis 5.000 m²'),
      product('Ambrogio Twenty', 'Drahtlos-Mähroboter ohne Begrenzungsdraht – GPS-gesteuert'),
    ],
  },

  erco: {
    tagline: 'Erco. Professionelle Geräte für Garten und Forst.',
    description: blocks(
      'Erco ist ein Schweizer Spezialimporteur für professionelle Gartengeräte, Forstmaschinen und Kleintraktoren. Das Sortiment umfasst sorgfältig ausgewählte Marken und Maschinen für den professionellen Einsatz in Gartenbau und Forstwirtschaft.',
      'Ernst Moser GmbH bietet Erco-Geräte für Gartenbauunternehmen, Forstbetriebe und anspruchsvolle Gartenbesitzer in der Region Solothurn.',
      'Erco steht für Qualität, Service und Fachberatung – mit einem Sortiment, das den Schweizer Bedürfnissen entspricht.'
    ),
    highlights: [
      highlight('Scissors', 'Schweizer Fachauswahl', 'Erco wählt die besten Geräte aus internationalen Marken für den Schweizer Markt aus.'),
      highlight('Award', 'Profi-Qualität', 'Nur Geräte für den professionellen Dauereinsatz – keine Hobby-Kompromisse.'),
      highlight('Wrench', 'Kompetenter Service', 'Erco-zertifizierte Techniker für Wartung und Reparatur.'),
      highlight('Shield', 'Ersatzteil-Garantie', 'Langfristige Ersatzteilversorgung für alle Erco-Maschinen.'),
    ],
    features: [
      feature('Scissors', 'Gartengeräte', 'Professionelle Rasenmäher, Heckenscheren und Gartenpflegegeräte von Erco.'),
      feature('Mountain', 'Forstmaschinen', 'Motorsägen, Holzspalter und Forstgeräte für den professionellen Einsatz.'),
      feature('Wrench', 'Service & Reparatur', 'Fachkundige Wartung und Reparatur aller Erco-Geräte und Marken.'),
      feature('Users', 'Beratung & Demonstration', 'Persönliche Beratung und Probeeinheiten für Fachanwender.'),
    ],
    products: [
      product('Erco Kleintraktoren', 'Kompakttraktoren für Gartenbau und Pflege grosser Grundstücke'),
      product('Erco Motormäher', 'Handgeführte Motormäher für schwieriges Gelände'),
      product('Erco Holzspalter', 'Elektrische und benzinbetriebene Holzspalter für den Forstbetrieb'),
    ],
  },

  kaaz: {
    tagline: 'Kaaz. Japanische Präzision für Rasenpflege.',
    description: blocks(
      'Kaaz ist ein japanischer Hersteller von hochwertigen Motormähern, Aufsitzmähern und Gartengeräten. Die Maschinen sind bekannt für ihre japanische Fertigungsqualität, Langlebigkeit und präzises Schnittbild.',
      'Ernst Moser GmbH vertreibt Kaaz-Maschinen für Privatgärten, Kommunen und Gartenbauunternehmen. Kaaz-Rasenmäher überzeugen durch robuste Konstruktion und einfache Bedienung.',
      'Mit über 50 Jahren Erfahrung in der Herstellung von Gartengeräten liefert Kaaz zuverlässige Qualität aus Japan – für den professionellen und privaten Einsatz.'
    ),
    highlights: [
      highlight('Award', 'Japanische Qualität', 'Kaaz produziert seit über 50 Jahren Rasenmäher nach japanischen Qualitätsprinzipien.'),
      highlight('Scissors', 'Präzises Schnittbild', 'Hochwertige Klingen und exakt eingestellte Mähwerke für makellosen Rasen.'),
      highlight('Settings', 'Langlebige Motoren', 'Robuste Einzylinder-Motoren für jahrelangen zuverlässigen Betrieb.'),
      highlight('Leaf', 'Einfach zu warten', 'Unkomplizierte Technik für einfache Wartung und günstige Betriebskosten.'),
    ],
    features: [
      feature('Scissors', 'Rasenmäher & Motormäher', 'Kaaz Motormäher und Aufsitzmäher für Privatgärten und Kommunalflächen.'),
      feature('Settings', 'Saisonservice', 'Messerschleifen, Ölwechsel und Vergaser-Einstellung für optimale Leistung.'),
      feature('Wrench', 'Reparatur', 'Schnelle Reparaturen und Ersatzteilversorgung für alle Kaaz-Modelle.'),
      feature('Users', 'Beratung', 'Persönliche Beratung für die Auswahl des richtigen Mähers.'),
    ],
    products: [
      product('Kaaz LM 5360SH', 'Selbstfahrender Benzinrasenmäher 53 cm Schnittbreite'),
      product('Kaaz LM 4630', 'Kompakter Rasenmäher für Gärten bis 600 m²'),
      product('Kaaz FG 550VE', 'Frontmäher mit elektrischem Anlasser für grosse Gärten'),
    ],
  },

  makita: {
    tagline: 'Makita. Die Kraft der Innovation.',
    description: blocks(
      'Makita ist ein japanischer Weltmarktführer in der Herstellung von Profi-Elektrowerkzeugen und Gartengeräten. Seit 1915 entwickelt Makita leistungsstarke, zuverlässige Werkzeuge für professionellen Einsatz in Handwerk, Bau und Gartenpflege.',
      'Das Makita-Programm umfasst über 1.400 Produkte – von Akkuschraubern und Sägen bis zu Rasenmähern, Laubbläsern und Heckenscheren. Die LXT- und XGT-Akkutechnologie setzt Massstäbe in Leistung und Laufzeit.',
      'Ernst Moser GmbH bietet Makita-Gartengeräte und Outdoor-Produkte für Gartenbauunternehmen, Forstbetriebe und professionelle Anwender – mit vollständigem Service und Garantieleistungen.'
    ),
    highlights: [
      highlight('Zap', 'LXT & XGT Akkutechnologie', 'Makitas 18V LXT und 40V XGT-Akkusystem: Kompatibel mit über 400 Werkzeugen und Geräten.'),
      highlight('Award', 'Weltmarktführer', 'Makita ist mit über 10 Millionen verkauften Akkusystemen pro Jahr Weltmarktführer.'),
      highlight('Leaf', 'Lärm- und Emissionsfrei', 'Akkugeräte ohne Abgas und mit minimalem Lärm – ideal für Wohngebiete.'),
      highlight('Shield', '3 Jahre Garantie', 'Makita bietet 3 Jahre Herstellergarantie auf alle registrierten Geräte.'),
    ],
    features: [
      feature('Scissors', 'Gartengeräte & Outdoor', 'Makita Rasenmäher, Heckenscheren, Kettensägen und Laubbläser für Profis.'),
      feature('Zap', 'Akku-Systeme', 'Kompatible LXT und XGT Akkus und Ladegeräte für alle Makita-Geräte.'),
      feature('Wrench', 'Makita-Service', 'Autorisierte Makita-Reparaturwerkstatt mit Originalteilen und Garantieabwicklung.'),
      feature('Package', 'Profi-Beratung', 'Beratung für Gartenbauunternehmen, Forstbetriebe und gewerbliche Anwender.'),
    ],
    products: [
      product('Makita DLM532 Akku-Rasenmäher', '18V LXT Akku-Rasenmäher 53 cm – leise und emissionsfrei'),
      product('Makita DUH602 Akku-Heckenschere', 'Akku-Heckenschere 60 cm – professioneller Schnitt ohne Kabel'),
      product('Makita DUC254 Akku-Kettensäge', '25cm Akku-Kettensäge für Gartenpflege und leichte Forstarbeiten'),
      product('Makita DUB363 Akku-Laubbläser', 'Kräftiger 36V Akku-Laubbläser für grosse Flächen'),
    ],
  },

  nilfisk: {
    tagline: 'Nilfisk. Sauberkeit auf professionellem Niveau.',
    description: blocks(
      'Nilfisk ist ein dänischer Weltmarktführer in der professionellen Reinigungstechnologie. Seit 1906 entwickelt und produziert Nilfisk Hochdruckreiniger, Industriestaubsauger, Kehrmaschinen und Bodenreiniger für professionellen Einsatz.',
      'Nilfisk-Produkte sind in Industrie, Handel, Kommunen und dem Garten- und Landschaftsbau unverzichtbar. Ernst Moser GmbH ist autorisierter Nilfisk-Händler und bietet die gesamte Produktpalette mit Serviceleistungen.',
      'Ob Hochdruckreiniger für Maschinen und Fahrzeuge, Industriestaubsauger für Werkstätten oder Bodenreiniger für Hallen – Nilfisk hat die passende Lösung.'
    ),
    highlights: [
      highlight('Sparkles', '120 Jahre Reinigungserfahrung', 'Nilfisk ist einer der ältesten und erfahrensten Reinigungstechnik-Hersteller der Welt.'),
      highlight('Shield', 'Profi-Qualität', 'Nilfisk-Produkte sind für professionellen Dauereinsatz entwickelt – robust und langlebig.'),
      highlight('Leaf', 'Wasser- und Energiesparend', 'Nilfisk-Technologie spart bis zu 30% Wasser und Energie gegenüber konventionellen Geräten.'),
      highlight('Settings', 'Komplettes Sortiment', 'Hochdruckreiniger, Staubsauger, Kehrmaschinen und Bodenreiniger aus einer Hand.'),
    ],
    features: [
      feature('Droplets', 'Hochdruckreiniger', 'Nilfisk Hochdruckreiniger für Fahrzeuge, Maschinen, Fassaden und Aussenbereich.'),
      feature('Sparkles', 'Industriestaubsauger', 'Nilfisk Industriesauger für Werkstätten, Betriebe und Baustellen.'),
      feature('Wrench', 'Service & Reparatur', 'Autorisierter Nilfisk-Service mit Originalteilen und Garantieleistungen.'),
      feature('Package', 'Zubehör & Verbrauchsmaterial', 'Nilfisk Originalzubehör, Reinigungsmittel und Verbrauchsteile.'),
    ],
    products: [
      product('Nilfisk Core 140 HD', 'Hochdruckreiniger 140 bar für Garten und Fahrzeugreinigung'),
      product('Nilfisk Alto P160 Profi', 'Profi-Hochdruckreiniger für Landwirtschaft und Werkstatt'),
      product('Nilfisk VL200 Industriesauger', 'Robuster Industriestaubsauger für Werkstätten'),
      product('Nilfisk SW 5500 Kehrmaschine', 'Kompakt-Kehrmaschine für Hallen und Aussenanlagen'),
    ],
  },

  'pudu-robotics': {
    tagline: 'Pudu Robotics. Serviceroboter für die Zukunft.',
    description: blocks(
      'Pudu Robotics ist ein chinesischer Weltmarktführer für Serviceroboter in der Gastronomie, Hotellerie und dem Gesundheitswesen. Die KI-gesteuerten Roboter BellaBot, KettyBot und HolaBot revolutionieren den Servicebereich durch autonome Essens- und Getränkelieferung.',
      'Pudu-Roboter sind weltweit in über 60 Ländern im Einsatz – in Restaurants, Hotels, Spitälern und Pflegeheimen. Ernst Moser GmbH ist Ihr Pudu-Partner in der Schweiz und bietet Beratung, Installation und Service.',
      'Mit fortschrittlichster KI-Navigation, Obstacle-Avoidance und hoher Traglast bieten Pudu-Roboter eine wirtschaftliche Lösung für Fachkräftemangel und Effizienzsteigerung.'
    ),
    highlights: [
      highlight('Bot', 'KI-gesteuerte Navigation', 'Pudu-Roboter navigieren autonom durch Räume – ohne Bodenmarkierungen oder Spezialinfrastruktur.'),
      highlight('Globe', 'Über 60 Länder', 'Pudu Robotics ist weltweit vertreten – über 1 Million Serviceroboter weltweit ausgeliefert.'),
      highlight('Shield', 'Zuverlässiger Betrieb', 'Pudu-Roboter arbeiten 12+ Stunden pro Tag mit minimaler Ausfallrate.'),
      highlight('Users', 'Personalmangel lösen', 'Pudu-Roboter übernehmen repetitive Aufgaben und entlasten das Servicepersonal.'),
    ],
    features: [
      feature('Bot', 'Serviceroboter', 'Pudu BellaBot, KettyBot und HolaBot für Gastronomie, Hotel und Pflege.'),
      feature('Settings', 'Installation & Einrichtung', 'Komplette Inbetriebnahme, Kartierung und Schulung durch Pudu-Techniker.'),
      feature('Wifi', 'Software & Updates', 'Regelmässige OTA-Updates für neue Features und verbesserte Navigation.'),
      feature('Wrench', 'Service & Support', '24/7 Fernüberwachung und schneller Service bei technischen Problemen.'),
    ],
    products: [
      product('Pudu BellaBot', 'Katzchen-Roboter für Essens- und Getränkelieferung im Restaurant'),
      product('Pudu KettyBot', 'Empfangs- und Lieferroboter mit interaktivem Display für Hotels'),
      product('Pudu HolaBot', 'Grosser Lieferroboter mit 4 Tabletts für Grossküchen und Buffets'),
      product('Pudu FlashBot', 'Schneller Lieferroboter für grosse Gastro-Betriebe'),
    ],
  },

  segway: {
    tagline: 'Segway. Smarte Mobilität neu gedacht.',
    description: blocks(
      'Segway ist ein weltbekanntes amerikanisches Unternehmen, bekannt für seine wegweisenden Gleichgewichts-Transportgeräte und elektrischen Outdoor-Fahrzeuge. Im Bereich Rasenpflege bietet Segway innovative autonome Rasenmäher-Lösungen.',
      'Ernst Moser GmbH vertreibt Segway Navimow Mähroboter – die smarten, GPS-gestützten Rasenmäher ohne Begrenzungsdraht. Mit präziser RTK-GPS-Technologie mähen sie akkurat und zuverlässig.',
      'Der Segway Navimow arbeitet ohne Installationsaufwand, ohne Begrenzungsdraht und mit höchster Präzision – per App steuerbar und konnektivitätsfähig.'
    ),
    highlights: [
      highlight('Navigation', 'RTK-GPS ohne Draht', 'Segway Navimow nutzt präzises RTK-GPS statt Begrenzungsdraht – einfach und genau.'),
      highlight('Wifi', 'App & KI', 'Vollständige Steuerung via App, KI-gestützte Mähplanung und smarte Hinderniserkennung.'),
      highlight('Leaf', '100% Elektrisch', 'Leiser Elektromotor für emissionsfreien, geräuscharmen Betrieb.'),
      highlight('Shield', 'Diebstahlschutz', 'GPS-Tracking und PIN-Schutz gegen Diebstahl.'),
    ],
    features: [
      feature('Navigation', 'Navimow Mähroboter', 'Segway Navimow ohne Begrenzungsdraht – für Gärten bis 3.000 m².'),
      feature('Settings', 'Einrichtung ohne Draht', 'Einfache Einrichtung in wenigen Stunden – keine Grabarbeiten, kein Draht.'),
      feature('Wifi', 'App-Steuerung', 'Mähpläne, Echtzeit-Tracking und Diagnose via Segway-App.'),
      feature('Wrench', 'Service & Messertausch', 'Schneller Saisonservice und Messertausch durch unsere Techniker.'),
    ],
    products: [
      product('Segway Navimow H500E', 'Mähroboter bis 3.000 m² ohne Begrenzungsdraht'),
      product('Segway Navimow H800E', 'Premium-Mähroboter bis 5.000 m² mit erweitertem GPS'),
      product('Segway Navimow i105E', 'Einsteiger-Navimow für Gärten bis 1.000 m²'),
    ],
  },

  stiga: {
    tagline: 'Stiga. Leidenschaft für Rasenpflege.',
    description: blocks(
      'Stiga ist ein schwedischer Hersteller von Rasenmähern, Traktoren und Gartenpflegegeräten für Privat- und professionelle Anwender. Seit 1934 steht Stiga für Innovation, Design und hohe Schnittqualität.',
      'Ernst Moser GmbH bietet Stiga Rasenmäher, Aufsitztraktoren, Mähroboter und Handgeräte für Privatgärten und professionelle Grünanlagen in der Region Solothurn.',
      'Stiga vereint schwedisches Design mit zuverlässiger Technik – für präzises Schnittbild und höchsten Bedienkomfort. Das breite Sortiment deckt alle Gartengrössen und Bedürfnisse ab.'
    ),
    highlights: [
      highlight('Award', '90 Jahre Rasenpflege', 'Stiga ist seit 1934 auf Rasenpflege spezialisiert – ein Synonym für Qualität.'),
      highlight('Scissors', 'Perfektes Schnittbild', 'Stiga-Messer und Mähwerke liefern gleichmässiges, professionelles Schnittbild.'),
      highlight('Bot', 'Mähroboter-Innovation', 'Stiga Autoclip Mähroboter mit neuester Navigations- und Vernetzungstechnologie.'),
      highlight('Leaf', 'Elektrisch & Nachhaltig', 'Stiga SWIFT Akku-Geräte für emissionsarmen, leisen Gartenbetrieb.'),
    ],
    features: [
      feature('Scissors', 'Rasenmäher & Traktoren', 'Stiga Aufsitzmäher, Handmäher und Traktoren für alle Gartengrössen.'),
      feature('Bot', 'Mähroboter', 'Stiga Autoclip Mähroboter für automatische Rasenpflege.'),
      feature('Zap', 'SWIFT Akku-Geräte', 'Stiga SWIFT Akku-Linie: Mäher, Heckenschere, Laubbläser.'),
      feature('Wrench', 'Saisonservice', 'Frühjahrsservice, Messerschleifen und Generalüberholung.'),
    ],
    products: [
      product('Stiga Twinclip 50 SQ', 'Benzin-Rasenmäher mit Mulch- und Sammelfunktion'),
      product('Stiga Estate 598e Aufsitzmäher', 'Elektrischer Aufsitzrasenmäher für grosse Gärten'),
      product('Stiga Autoclip 535 SQ Mähroboter', 'Autonomer Mähroboter bis 1.800 m²'),
      product('Stiga SWIFT 5S Akku-Mäher', '48V Akku-Rasenmäher leise und emissionsfrei'),
    ],
  },

  stihl: {
    tagline: 'Stihl. Zuverlässigkeit für den Profi.',
    description: blocks(
      'Stihl ist der weltweit meistverkaufte Hersteller von Motorsägen und professionellen Outdoor-Geräten. Seit 1926 entwickelt Stihl innovative Geräte für Forstwirtschaft, Landwirtschaft, Kommunalpflege und Gartenbau – mit höchsten Qualitäts- und Sicherheitsstandards.',
      'Das Stihl-Programm umfasst Motorsägen, Motorsensen, Rückentragsprüher, Laubbläser, Hochdruckreiniger und vieles mehr – erhältlich als Benzin-, Akku- und Elektrogeräte.',
      'Ernst Moser GmbH ist autorisierter Stihl-Fachhandelspartner. Wir führen die komplette Stihl-Produktpalette und bieten vollständigen Service mit Original-Ersatzteilen und Garantieleistungen.'
    ),
    highlights: [
      highlight('Award', 'Weltmarktführer Motorsägen', 'Stihl ist Weltmarktführer bei Motorsägen – mehr als jeder andere Hersteller verkauft.'),
      highlight('Zap', 'AK Akku-System', 'Stihl AK-Akku-System: Kompatibel mit über 30 Geräten für kabellosen Gartenbetrieb.'),
      highlight('Shield', 'Höchste Sicherheit', 'Stihl-Geräte übertreffen alle Sicherheitsnormen – zertifiziert für professionellen Einsatz.'),
      highlight('Leaf', 'STIHL iMOW Roboter', 'Der intelligente STIHL iMOW Mähroboter für automatische Rasenpflege.'),
    ],
    features: [
      feature('Scissors', 'Motorsägen & Motorsensen', 'Komplette Stihl-Produktlinie für Forst, Landwirtschaft und Kommunalpflege.'),
      feature('Bot', 'iMOW Mähroboter', 'STIHL iMOW für automatische Rasenpflege – einfach einzurichten und zuverlässig.'),
      feature('Wrench', 'Autorisierter Stihl-Service', 'Reparaturen, Originalteile und Garantieabwicklung durch zertifizierte Techniker.'),
      feature('Zap', 'Akku-Beratung', 'Beratung zu Stihl AK-Akku-System für den Umstieg auf elektrische Gartengeräte.'),
    ],
    products: [
      product('Stihl MS 261 Motorsäge', 'Professionelle Motorsäge für Forstarbeiten und Brennholz'),
      product('Stihl FS 55 Motorsense', 'Leichte Motorsense für Gras, Unkraut und Böschungen'),
      product('Stihl BG 50 Laubbläser', 'Kompakter Laubbläser für Herbstlaub und Reinigung'),
      product('Stihl iMOW 6 EVO', 'Mähroboter bis 2.700 m² mit App-Steuerung'),
      product('Stihl HSA 94 T Heckenschere', 'Akku-Heckenschere Profi für formalen Schnitt'),
    ],
  },

  swardman: {
    tagline: 'Swardman. Profi-Rasenpflege aus Tschechien.',
    description: blocks(
      'Swardman ist ein tschechischer Hersteller von professionellen Walzenrasenmähern und Greensmähern für Golfanlagen, Sportplätze und hochwertige Rasenflächen. Die Maschinen erzeugen das charakteristische Muster und höchste Schnittqualität auf anspruchsvollen Rasenflächen.',
      'Ernst Moser GmbH vertreibt Swardman-Maschinen für Golfanlagen, Fussballplätze und professionelle Grünanlagen in der Schweiz. Swardman ist eine Alternative zu den teuren grossen Marken – mit professionellem Ergebnis zu wettbewerbsfähigen Preisen.',
      'Swardman Walzenrasenmäher sind besonders bei Greenkeeper und professionellen Rasenpflegern geschätzt – für das exklusive Streifenmuster und das präzise Schnittbild auf Spielflächen höchster Qualität.'
    ),
    highlights: [
      highlight('Scissors', 'Perfekte Streifenmuster', 'Swardman-Walzenrasenmäher erzeugen das charakteristische Streifenmuster auf Sportflächen.'),
      highlight('Award', 'Golf & Sportplatz-Qualität', 'Entwickelt für höchste Ansprüche in der Golfanlage und auf dem Sportplatz.'),
      highlight('Settings', 'Tschechische Präzisionsfertigung', 'Solide Konstruktion und präzise Verarbeitung für langen Betrieb.'),
      highlight('Leaf', 'Mulch & Fangkorb', 'Flexible Schnittgutentsorgung durch Mulchen oder Fangkorb-Option.'),
    ],
    features: [
      feature('Scissors', 'Walzenrasenmäher', 'Swardman Walzenrasenmäher für Golfgreens, Fairways und Sportplätze.'),
      feature('Settings', 'Greensmäher', 'Swardman Elektro- und Benzin-Greensmäher für Golfanlagen.'),
      feature('Wrench', 'Service & Einstellung', 'Schnitthöhen-Einstellung, Wartung und Reparatur durch Fachtechniker.'),
      feature('Users', 'Beratung für Anlagen', 'Persönliche Beratung für Golfanlagen, Gemeinden und Sportstätten.'),
    ],
    products: [
      product('Swardman Electra 47', 'Elektrischer Walzenrasenmäher 47 cm für Greenkeeper'),
      product('Swardman Edwin 4.0 WD', 'Walzenrasenmäher 53 cm mit Allradantrieb'),
      product('Swardman Greens Mäher', 'Präzisions-Greensmäher für Golfanlagen'),
    ],
  },
}

// ─── Hauptprogramm ─────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║  Ernst Moser – Brand-Inhalte befüllen               ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  const token = process.env.SANITY_TOKEN
  if (!token) { console.error('❌  SANITY_TOKEN fehlt'); process.exit(1) }

  // Alle Brands aus Sanity holen
  const brands = await client.fetch(
    `*[_type == "brand"]{ _id, name, slug, "center": center->{ _id, slug } }`
  )
  console.log(`   ${brands.length} Marken in Sanity gefunden\n`)

  let updated = 0, skipped = 0, errors = 0

  for (const brand of brands) {
    const slug = brand.slug?.current
    const content = BRAND_CONTENT[slug]

    if (!content) {
      console.log(`   ⚠️  Kein Content für: ${brand.name} (${slug})`)
      skipped++
      continue
    }

    try {
      await client
        .patch(brand._id)
        .set({
          tagline:    content.tagline,
          description: content.description,
          highlights: content.highlights,
          features:   content.features,
          products:   content.products,
        })
        .commit()

      console.log(`   ✅  ${brand.name.padEnd(28)} (${slug})`)
      updated++
    } catch (err) {
      console.error(`   ❌  ${brand.name}: ${err.message}`)
      errors++
    }
  }

  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║                   Zusammenfassung                   ║')
  console.log('╚══════════════════════════════════════════════════════╝')
  console.log(`   Aktualisiert: ${updated}`)
  console.log(`   Kein Content: ${skipped}`)
  console.log(`   Fehler:       ${errors}`)
  console.log('\n🎉  Fertig!\n')
}

main().catch((err) => {
  console.error('\n💥', err.message)
  process.exit(1)
})
