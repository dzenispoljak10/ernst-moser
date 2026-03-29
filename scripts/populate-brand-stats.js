#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Brand Stats & Applications befüllen
 * ========================================================
 * Fügt für ausgewählte Marken stats[] und applications[] hinzu.
 *
 * Ausführen: node scripts/populate-brand-stats.js
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

function key() { return Math.random().toString(36).slice(2, 10) }

function stat(value, suffix, label) {
  return { _type: 'object', _key: key(), value, suffix, label }
}

function app(icon, title, desc) {
  return { _type: 'object', _key: key(), icon, title, desc }
}

// ─── Brand Stats & Applications ─────────────────────────────────────────────

const BRAND_EXTRAS = {

  // ═══ NUTZFAHRZEUGCENTER ═════════════════════════════════════════════════════

  scania: {
    stats: [
      stat(1891, '', 'Gegründet'),
      stat(130, '+', 'Jahre Erfahrung'),
      stat(55000, '+', 'Mitarbeitende weltweit'),
      stat(1500, '+', 'Servicepunkte Europa'),
    ],
    applications: [
      app('Truck',    'Fernverkehr & Logistik',    'Sattelzüge und Fernverkehrs-LKW für effiziente Langstreckentransporte in ganz Europa.'),
      app('Wrench',   'Bau & Schwertransport',     'Robuste Kipper, Mischer und Spezialfahrzeuge für anspruchsvolle Baustelleneinsätze.'),
      app('Leaf',     'Nachhaltige Mobilität',     'Bio-Kraftstoffe, Erdgas (CNG/LNG) und vollelektrische BEV-Lösungen für emissionsarmen Transport.'),
      app('Globe',    'Fernlinienverkehr',          'Hochkomfortable Kabinen und aerodynamische Aufbauten für maximale Wirtschaftlichkeit auf der Langstrecke.'),
      app('Factory',  'Stadtlogistik & Verteilung','Kompakte P- und L-Serie für innerstädtischen Verteilerverkehr mit niedrigem Gesamtgewicht.'),
      app('Activity', 'Fleet-Management',           'Digitale Vernetzung und Telematiksysteme für optimierte Flottenverwaltung und Kostenreduktion.'),
    ],
  },

  fiat: {
    stats: [
      stat(1900, '', 'Gegründet'),
      stat(120, '+', 'Jahre Fahrzeugbau'),
      stat(50, '+', 'Märkte weltweit'),
      stat(8, '+', 'Fahrzeugmodelle'),
    ],
    applications: [
      app('Truck',   'Handwerk & Gewerbe',        'Ducato, Talento und Doblò als perfekte Basis für Handwerksbetriebe, Elektriker und Sanitärfirmen.'),
      app('Droplets','Stadtlieferverkehr',          'Wendige Transporter für den letzten Kilometer – ideal für Kurierdienste und innerstädtische Lieferungen.'),
      app('Zap',     'Elektromobilität',            'E-Ducato und E-Scudo für emissionsfreien Einsatz in Städten mit Fahrverboten und grünen Zonen.'),
      app('Scissors','Kühlfahrzeuge',               'Ausbaufähige Fiat-Basisfahrzeuge für Kühl- und Tiefkühlaufbauten im Lebensmitteltransport.'),
      app('Building','Behörden & Gemeinden',        'Zuverlässige Kommunalfahrzeuge mit wirtschaftlichen Dieselmotoren und grosser Nutzlast.'),
    ],
  },

  isuzu: {
    stats: [
      stat(1916, '', 'Gegründet'),
      stat(100, '+', 'Jahre Expertise'),
      stat(100, '+', 'Länder weltweit'),
      stat(3, '', 'Fahrzeugklassen'),
    ],
    applications: [
      app('Tractor', 'Landwirtschaft & Forstwirtschaft', 'D-Max Pickup für Landwirte, Forstbetriebe und ländliche Einsatzbereiche mit hoher Geländetauglichkeit.'),
      app('HardHat', 'Bau & Tiefbau',                    'Leichte Nutzfahrzeuge NLR/NMR für Bautruppen, Infrastrukturprojekte und Materiallieferungen.'),
      app('Truck',   'Kommunale Fahrzeuge',               'Isuzu NLR als Basis für kommunale Aufbauten wie Hebebühnen, Kipper und Spezialaufbauten.'),
      app('Shield',  'Feuerwehr & Blaulichtorganisationen','Spezialaufbauten auf Isuzu-Basis für Feuerwehrkorps und Blaulichtorganisationen in der Schweiz.'),
      app('Mountain','Berggebiete & Off-Road',            'Allradantrieb D-Max für extreme Geländebedingungen, Bergstrassen und schwieriges Gelände.'),
    ],
  },

  piaggio: {
    stats: [
      stat(1884, '', 'Gegründet'),
      stat(140, '+', 'Jahre Innovation'),
      stat(80, '+', 'Länder präsent'),
      stat(3, '', 'Ape-Baureihen'),
    ],
    applications: [
      app('Car',     'Innerstädtische Lieferung',  'Ape Classic und Ape TM für enge Gassen, Altstadt-Lieferungen und Märkte.'),
      app('Zap',     'Elektromobilität',            'Elektro-Ape für emissionsfreien innerstädtischen Transport und Zero-Emission-Zonen.'),
      app('Leaf',    'Gastronomie & Food Trucks',   'Ape als Basis für mobile Verkaufsstände, Getränkeausschank und Street-Food-Konzepte.'),
      app('Building','Handwerk & Kleingewerbe',     'Kompakte Dreirad-Transporter für Handwerksbetriebe, Gärtner und Kleinunternehmen.'),
    ],
  },

  dhollandia: {
    stats: [
      stat(1981, '', 'Gegründet'),
      stat(40, '+', 'Jahre Expertise'),
      stat(80, '+', 'Länder beliefert'),
      stat(500000, '+', 'Hebebühnen produziert'),
    ],
    applications: [
      app('Truck',   'Lebensmittellogistik',       'Hebebühnen für Kühl-LKW und Tiefkühlfahrzeuge im Lebensmitteltransport.'),
      app('Package', 'Paket- & Kurierverkehr',      'Kompakte Hebebühnen für Paket- und Stückgutfahrzeuge im täglichen Lieferverkehr.'),
      app('Factory', 'Industrie & Produktion',      'Schwere Hebebühnen für Industrielieferungen, Maschinentransporte und Sonderfrachten.'),
      app('Building','Baustelle & Handel',          'Hebebühnen für Baumaterial, Möbel und Grossvolumengüter bei Einzel- und Grosshändlern.'),
    ],
  },

  hilltip: {
    stats: [
      stat(2010, '', 'Gegründet'),
      stat(15, '+', 'Jahre Innovation'),
      stat(30, '+', 'Länder beliefert'),
      stat(20, '+', 'Modellvarianten'),
    ],
    applications: [
      app('Snowflake','Winterdienst Strassen',      'HilltipSpreader für effiziente Salzstreuung auf Strassen, Parkplätzen und Zufahrten.'),
      app('Truck',   'LKW-Aufbau Winterdienst',    'Hilisoar Schneepflüge und Streuer für Kommunalfahrzeuge und Serviceunternehmen.'),
      app('Building','Gebäude & Liegenschaften',    'SprayStriker Flüssigstreuer für präzisen Salzlösungs-Einsatz auf Gehwegen und Einfahrten.'),
      app('Leaf',    'Ökologischer Winterdienst',   'Präzise Dosiertechnik reduziert den Salzverbrauch um bis zu 50% – schont Umwelt und Budget.'),
    ],
  },

  // ═══ KOMMUNALCENTER ═════════════════════════════════════════════════════════

  hako: {
    stats: [
      stat(1956, '', 'Gegründet'),
      stat(60, '+', 'Jahre Erfahrung'),
      stat(100, '+', 'Länder weltweit'),
      stat(2000, '+', 'Mitarbeitende'),
    ],
    applications: [
      app('Building', 'Flughäfen & Grosse Areale',  'Citymaster und Tractiva für grossflächige Reinigung von Flughäfen, Messen und Einkaufszentren.'),
      app('TreePine', 'Gemeinden & Städte',          'Kommunale Kehrmaschinen für Strassen, Plätze und Parks in Städten und Gemeinden.'),
      app('Warehouse','Industrie & Produktion',      'Scheuersaugmaschinen und Kehrmaschinen für Produktionshallen, Lagerhäuser und Fabriken.'),
      app('Leaf',     'Grünanlagen & Golfplätze',    'Multifunktionale Kommunalschlepper für Mähen, Kehren und Winterdienst auf Grünflächen.'),
      app('Snowflake','Winterdienst',                'Hako-Kommunalschlepper mit Winterdienstaufbau für Schneeräumung und Streuung.'),
    ],
  },

  kubota: {
    stats: [
      stat(1890, '', 'Gegründet'),
      stat(130, '+', 'Jahre Tradition'),
      stat(110, '+', 'Länder präsent'),
      stat(48000, '+', 'Mitarbeitende'),
    ],
    applications: [
      app('Tractor',  'Kommunale Grünpflege',        'Kubota-Traktoren für professionelle Rasenpflege, Böschungsmähen und Geländearbeiten.'),
      app('TreePine', 'Landwirtschaft & Gartenbau',  'Kompakttraktoren und Anbaugeräte für Landwirte, Gärtnereien und Baumschulen.'),
      app('Mountain', 'Hanglagen & Steilgelände',     'Allradtraktoren mit Hangausgleich für sicheres Arbeiten an Böschungen und Steillagen.'),
      app('Droplets', 'Bauwirtschaft',                'Kubota Minibagger und Raupendumper für Erdarbeiten, Rohrgräben und Landscaping.'),
    ],
  },

  greentec: {
    stats: [
      stat(1992, '', 'Gegründet'),
      stat(30, '+', 'Jahre Spezialisierung'),
      stat(60, '+', 'Länder beliefert'),
      stat(200, '+', 'Modelle'),
    ],
    applications: [
      app('TreePine', 'Böschungspflege',             'Mulcher und Sägeköpfe für Böschungen, Strassenränder und Bahndämme.'),
      app('Scissors', 'Forstliche Arbeiten',          'Astschere und Forstköpfe für schonende Baumpflege, Entastung und Kronenrückschnitt.'),
      app('Mountain', 'Strassenunterhalt',            'Anbaugeräte für Kommunaltraktoren und Bagger beim Unterhalt von Strassen und Wegen.'),
      app('Recycle',  'Grüngutverarbeitung',          'Mulchköpfe für die Verarbeitung von Schnittgut, Ästen und organischem Material.'),
    ],
  },

  reform: {
    stats: [
      stat(1925, '', 'Gegründet'),
      stat(100, '+', 'Jahre Berglandtechnik'),
      stat(40, '+', 'Länder beliefert'),
      stat(3, '', 'Baureihen'),
    ],
    applications: [
      app('Mountain', 'Steilgelände & Hanglagen',    'Reform-Einachser und Balkenmäher speziell entwickelt für extreme Hanglagen bis 45° und mehr.'),
      app('TreePine', 'Obstbau & Weinbau',            'Gefahrlose Grünpflege zwischen Reihen und an Böschungen von Obstgärten und Weinbergen.'),
      app('Leaf',     'Skigebiete & Berghütten',      'Zuverlässige Berglandtechnik für Gebirgsbauern, Alpen und touristische Einrichtungen.'),
      app('Snowflake','Winterdienst alpin',            'Reform mit Winterdienstausrüstung für Schneeräumung auf Bergstrassen und Zufahrten.'),
    ],
  },

  zaugg: {
    stats: [
      stat(1949, '', 'Gegründet'),
      stat(75, '+', 'Jahre Schweizer Qualität'),
      stat(40, '+', 'Länder beliefert'),
      stat(200, '+', 'Mitarbeitende'),
    ],
    applications: [
      app('Snowflake', 'Pistenräumung & Ski',         'Schneefräsen und Schneekanonen für Skigebiete, Bergbahnen und alpine Einrichtungen.'),
      app('Mountain',  'Alpine Infrastruktur',         'Rotationsfräsen für Bergstrassen, Gebirgspassagen und Bergwerkszufahrten.'),
      app('Building',  'Flughäfen & Grossareale',      'Hochleistungs-Schneefräsen für Flughafen-Rollwege, Logistikflächen und Industrieanlagen.'),
      app('Truck',     'Winterdienst Kommunen',        'Zaugg-Anbaufräsen für Kommunalfahrzeuge und LKW im kommunalen Winterdienst.'),
    ],
  },

  baoli: {
    stats: [
      stat(1985, '', 'Gegründet'),
      stat(40, '+', 'Jahre Erfahrung'),
      stat(80, '+', 'Länder'),
      stat(500, '+', 'Händler weltweit'),
    ],
    applications: [
      app('Warehouse', 'Lager & Logistik',           'Elektro- und Verbrennungsgabelstapler für Lagerhäuser, Verteilzentren und 3PL-Anbieter.'),
      app('Factory',   'Industrie & Produktion',      'Robuste Gabelstapler für den Einsatz in Produktionshallen, Werkstätten und Fabrikhöfen.'),
      app('Building',  'Bauwesen & Materialhandling', 'Gabelstapler für Baumaterialien, Betonelemente und schwere Lasten auf Baustellen.'),
      app('Truck',     'Spedition & Transport',       'Gabelstapler für Be- und Entladung von LKW, Containern und Sattelaufliegern.'),
    ],
  },

  // ═══ MOTORGERÄTECENTER ══════════════════════════════════════════════════════

  stihl: {
    stats: [
      stat(1926, '', 'Gegründet'),
      stat(100, '+', 'Jahre Innovation'),
      stat(160, '+', 'Länder weltweit'),
      stat(42000, '+', 'Mitarbeitende'),
    ],
    applications: [
      app('TreePine', 'Forstwirtschaft',              'Professionelle Kettensägen und Forstgeräte für Holzeinschlag, Waldpflege und Aufarbeitung.'),
      app('Leaf',     'Garten & Grünpflege',           'Rasenmäher, Freischneider und Heckenscheren für private und kommunale Grünpflege.'),
      app('Snowflake','Winterdienst',                  'Laubbläser und Schneefräsen für den professionellen Winterdienst.'),
      app('Building', 'Bauwirtschaft',                 'Trennschleifer, Sägen und Verdichtungsgeräte für Bau, Handwerk und Infrastruktur.'),
      app('Recycle',  'Kompost & Grüngut',             'Häcksler und Kompaktor für professionelle Grüngutverarbeitung und Kompostierung.'),
    ],
  },

  makita: {
    stats: [
      stat(1915, '', 'Gegründet'),
      stat(110, '+', 'Jahre Werkzeugbau'),
      stat(100, '+', 'Länder präsent'),
      stat(40000, '+', 'Produktvarianten'),
    ],
    applications: [
      app('HardHat',  'Bauwirtschaft & Handwerk',     'Akkubohrmaschinen, Winkelschleifer und Kreissägen für Maurer, Zimmermann und Sanitär.'),
      app('Leaf',     'Garten & Outdoor',              'Akkumäher, Laubbläser und Freischneider mit LXT-Akku für lärmarmen Garteneinsatz.'),
      app('Factory',  'Industrie & Montage',           'Präzisionswerkzeuge für industrielle Montage, Fahrzeugbau und Instandhaltung.'),
      app('Zap',      '18V/40V Akku-Ökosystem',        'Über 300 Geräte im LXT-18V und XGT-40V System – ein Akku für alle Geräte.'),
    ],
  },

  nilfisk: {
    stats: [
      stat(1906, '', 'Gegründet'),
      stat(120, '+', 'Jahre Erfahrung'),
      stat(100, '+', 'Länder'),
      stat(5000, '+', 'Mitarbeitende'),
    ],
    applications: [
      app('Factory',   'Industrie & Produktion',      'Industriesauger und Scheuersaugmaschinen für Produktionsstätten, Werkstätten und Fabriken.'),
      app('Building',  'Gebäude & Fassaden',           'Hochdruckreiniger für Fassaden, Fahrzeuge, Anlagen und Gebäudepflege.'),
      app('Warehouse', 'Lager & Logistik',             'Aufsitzscheuersaugmaschinen für grosse Lagerhallen, Supermärkte und Logistikzentren.'),
      app('Leaf',      'Aussenreinigung',               'Outdoor-Reinigungsgeräte für Gehwege, Parkplätze und öffentliche Plätze.'),
    ],
  },

  ambrogio: {
    stats: [
      stat(1998, '', 'Gegründet'),
      stat(25, '+', 'Jahre Mähroboter'),
      stat(40, '+', 'Länder beliefert'),
      stat(100, '+', 'Modelle'),
    ],
    applications: [
      app('Bot',      'Professionelle Rasenpflege',   'Autonome Mähroboter für Golfplätze, Sportanlagen und öffentliche Grünflächen.'),
      app('Building', 'Kommunale Areale',              'Mähroboter für Gemeinden, Schulanlagen, Friedhöfe und öffentliche Parks.'),
      app('Leaf',     'Private Gärten',                'Kompakte Mähroboter für mittlere und grosse Privatgärten mit automatischer Navigation.'),
      app('Wifi',     'Vernetzte Systeme',              'App-Steuerung, GPS-Anbindung und Cloud-Management für Flottenüberwachung.'),
    ],
  },

  stiga: {
    stats: [
      stat(1934, '', 'Gegründet'),
      stat(90, '+', 'Jahre Tradition'),
      stat(60, '+', 'Länder weltweit'),
      stat(2000000, '+', 'Zufriedene Kunden'),
    ],
    applications: [
      app('Leaf',   'Rasenpflege Privat',             'Rasentraktor, Aufsitzmäher und Handmäher für private Gärten aller Grössen.'),
      app('Bot',    'Autonomes Mähen',                 'STIGA E-DOMO Mähroboter für automatisch gepflegte Rasenflächen ohne Begrenzungsdraht.'),
      app('Zap',    'Akku-Geräte E-SERIES',            'Laubbläser, Heckenschere und Rasenmäher mit 48V Hochleistungsakku.'),
      app('Snowflake','Winterdienst',                   'Schneefräsen und Schneeschieber für zuverlässigen Winterdienst auf Wegen und Einfahrten.'),
    ],
  },

  segway: {
    stats: [
      stat(1999, '', 'Gegründet'),
      stat(25, '+', 'Jahre Mobilität'),
      stat(80, '+', 'Länder'),
      stat(100, '', '% Elektrisch'),
    ],
    applications: [
      app('MapPin',   'Last-Mile Delivery',            'Segway Transportroboter für autonome Paketzustellung auf dem letzten Kilometer.'),
      app('Building', 'Messen & Events',               'Segway PT für Sicherheitspersonal, Hostessen und Besucherführungen auf grossen Arealen.'),
      app('Bot',      'Autonome Reinigung',             'Segway Scrubber 50E für autonome Reinigung von Einkaufszentren und Flughäfen.'),
      app('Zap',      'Mikromobilität',                 'E-Scooter und E-Bikes für nachhaltige Personenmobilität im urbanen Umfeld.'),
    ],
  },

  swardman: {
    stats: [
      stat(2008, '', 'Gegründet'),
      stat(15, '+', 'Jahre Spezialisierung'),
      stat(40, '+', 'Länder beliefert'),
      stat(3, '', 'Mähsysteme'),
    ],
    applications: [
      app('Leaf',  'Golfplätze',                       'Cylinder-Mäher und Greenmäher für professionelle Golfplatzmähen nach Greenkeeper-Standard.'),
      app('Star',  'Sportplätze & Stadien',             'Präzisions-Rasenpflege für Fussball-, Baseball- und Tennisanlagen auf höchstem Niveau.'),
      app('Users', 'Anlagenmanagement',                 'Mähsysteme für Parkanlagen, Friedhöfe und kommunale Grünflächen mit hohem Qualitätsanspruch.'),
    ],
  },

  // ═══ NUTZFAHRZEUG – restliche ════════════════════════════════════════════════

  ut: {
    applications: [
      app('Tractor',  'Landwirtschaft',                'Kompakte Transporter für Bauernhöfe, Weinbau und ländliche Betriebe.'),
      app('Mountain', 'Forstbetriebe',                  'Geländegängige Fahrzeuge mit Allradantrieb für Waldarbeiten und Forsttransporte.'),
      app('Building', 'Bauwesen & Kommunen',            'Robuste Kipper und Transporter für Baustellen und Gemeindewerkhöfe.'),
    ],
  },

  wabco: {
    stats: [
      stat(1869, '', 'Gegründet'),
      stat(150, '+', 'Jahre Technologie'),
      stat(50000000, '+', 'Fahrzeuge ausgestattet'),
      stat(40, '+', 'Länder präsent'),
    ],
    applications: [
      app('Shield',   'Schwere Nutzfahrzeuge',         'ABS, EBS und AEBS-Systeme für LKW, Sattelzugmaschinen und Reisebusse.'),
      app('Truck',    'Anhänger & Sattelauflieger',     'WABCO-Bremssysteme und Stabilitätssysteme für Anhänger und Sattelauflieger.'),
      app('Activity', 'Fahrerassistenz',                'Notbremssysteme AEBS, Spurhalteassistent LDWS und Abstandsregelung ACC.'),
      app('Wrench',   'Diagnosestationen',              'Zertifizierter WABCO-Servicepartner mit Spezialwerkzeug und Originalteilen.'),
    ],
  },

  // ═══ KOMMUNAL – restliche ════════════════════════════════════════════════════

  alk: {
    stats: [
      stat(1991, '', 'Gegründet'),
      stat(30, '+', 'Jahre Elektromobilität'),
      stat(50, '+', 'Länder'),
      stat(100, '', '% Elektrisch'),
    ],
    applications: [
      app('Zap',      'Kommunale Werkhöfe',             'Elektrische Transporter und Kipper für lärmarmen, emissionsfreien Betrieb in Gemeinden.'),
      app('TreePine', 'Nationalparks & Naturgebiete',   'Leise Elektrofahrzeuge für Nationalparks, Naturschutzgebiete und sensible Umgebungen.'),
      app('Building', 'Flughäfen & Resorts',            'Alkè ATX für Gepäcktransport, Serviceeinsätze und Reinigung auf Flughäfen und Hotels.'),
      app('Leaf',     'Industrie & Produktion',         'Elektrische Intralogistik auf Werksgeländen für nachhaltige Betriebslogistik.'),
    ],
  },

  envitec: {
    applications: [
      app('Snowflake', 'Kommunaler Winterdienst',       'Edelstahl-Streugeräte für Salz und Splitt auf Gemeindestrassen, Trottoirs und Plätzen.'),
      app('Truck',     'Strassen & Unterhalt',          'Fahrzeugaufbau-Streugeräte für Strassenunterhalt, Werkbetriebe und Strasseninspektorate.'),
      app('Building',  'Flughäfen & Grossareale',       'Hochleistungsstreuer für grossflächige Enteisungsarbeiten auf Flughäfen und Gewerbearealen.'),
      app('HardHat',   'Hauswarte & Privatdienste',     'Kompakte Motorstreuer für Hauswartdienste und private Winterdienstleister.'),
    ],
  },

  'gianni-ferrari': {
    applications: [
      app('Star',     'Golfanlagen',                   'Hochpräzise Mähmaschinen für Greens, Fairways und Rough auf Golfanlagen.'),
      app('Users',    'Sportplätze & Stadien',          'Rasenmäher für professionelle Sportplätze und Veranstaltungsflächen.'),
      app('Leaf',     'Parkanlagen & Kommunen',         'Grossflächenmäher für Parkanlagen, Gemeindeflächen und öffentliche Grünbereiche.'),
      app('Building', 'Firmenliegenschaften',            'Repräsentative Rasenpflege für Unternehmen, Hotels und Bildungseinrichtungen.'),
    ],
  },

  matev: {
    applications: [
      app('Snowflake', 'Winterdienst',                  'Schneefräsen und Streugeräte für Kommunen, Werkhöfe und Privatbetriebe.'),
      app('Leaf',      'Grünpflege Sommer',              'Kehrsaugmaschinen und Kehrgeräte für saubere Strassen und Wege im Sommer.'),
      app('Tractor',   'Kommunal-Traktoren',             'Anbaugeräte für Kubota, Reformwerke und andere Traktoren – ganzjährig einsetzbar.'),
      app('Building',  'Liegenschaften & Areale',        'Kompakte Kehr- und Streugeräte für Parkhäuser, Fabrikgelände und grosse Areale.'),
    ],
  },

  'ligier-professional': {
    stats: [
      stat(1968, '', 'Gegründet'),
      stat(55, '+', 'Jahre Fahrzeugbau'),
      stat(40, '+', 'Länder'),
      stat(100, '', '% Elektrisch möglich'),
    ],
    applications: [
      app('Leaf',     'Kommunale Grünpflege',           'Ligier leichte Fahrzeuge für innerstädtische Grünpflege, Friedhöfe und Parks.'),
      app('Building', 'Gebäude & Areale',               'Kleintransporter für Facility Management, Grosskliniken und Campusanlagen.'),
      app('TreePine', 'Forstbetriebe & Alpwirtschaft',  'Leichte und agile Fahrzeuge für alpine Landwirtschaft, Forstbetriebe und Berggebiete.'),
      app('Zap',      'Elektro-Option',                  'Ligier Pulse E als emissionsfreie Alternative für Kommunen mit Fahrverboten.'),
    ],
  },

  mulchy: {
    applications: [
      app('Scissors', 'Mulchen & Häckseln',             'Mulchgeräte für Laubhäckseln, Rasenmulchen und organische Abfallverarbeitung.'),
      app('Leaf',     'Grüngutverarbeitung',             'Professionelle Mulcher für Kompostierungsanlagen, Gärtnereien und Kommunen.'),
      app('TreePine', 'Strassenpflege',                  'Böschungsmulcher für Strassenbords, Gräben und Randstreifen.'),
    ],
  },

  springer: {
    applications: [
      app('Snowflake', 'Kommunaler Winterdienst',       'Springer Hochleistungsstreuer für präzise Salz- und Splittausbringung auf Strassen.'),
      app('Truck',     'Strassen & Werkbetriebe',       'Fahrzeugaufbau-Streugeräte für Gemeinden, Strasseninspektorate und Werkbetriebe.'),
      app('Building',  'Grossparkplätze & Areale',      'Leistungsstarke Streugeräte für Einkaufszentren, Flughäfen und weitläufige Liegenschaften.'),
      app('HardHat',   'Strassenunterhalt & Notfall',   'Schnelle Streuung bei Eisglätte für Strassenunterhaltsdienste und Notfallbetriebe.'),
    ],
  },

  stema: {
    applications: [
      app('Scissors',  'Wildkrautbekämpfung',           'Stema Wildkrautbürsten und -brenner für Unkrautbeseitigung auf Strassen und Wegen.'),
      app('Tractor',   'Einachser & Motorgeräte',       'Stema Einachser für kommunale Grünpflege, Mähen und Häckseln auf engen Flächen.'),
      app('Leaf',      'Kommunale Grünpflege',          'Motorgeräte-Anbaugeräte für Gemeinden: Mäher, Fräsen und Mulcher auf Stema-Basis.'),
      app('Building',  'Liegenschaften & Parks',        'Kompakte Pflegegeräte für Parkanlagen, Friedhöfe und Liegenschaften.'),
    ],
  },

  timan: {
    applications: [
      app('Leaf',     'Grünpflege & Mähen',             'TIMAN Mähgeräte für professionelle Grünflächenpflege in Kommunen und Betrieben.'),
      app('TreePine', 'Böschungspflege',                 'Auslegermäher für Böschungen, Strassenränder und Grünflächen.'),
      app('Snowflake','Winterdienst',                    'TIMAN Streugeräte für effizienten Salzeinsatz im kommunalen Winterdienst.'),
    ],
  },

  // ═══ MOTORGERÄTE – restliche ════════════════════════════════════════════════

  erco: {
    applications: [
      app('TreePine', 'Waldpflege & Forstwirtschaft',   'Professionelle Waldpflegegeräte für Forstbetriebe, Waldarbeiter und Kommunen.'),
      app('Scissors', 'Grünpflege & Mähen',             'Freischneider, Motorsägen und Mulcher für professionellen Einsatz.'),
      app('Building', 'Kommunaler Einsatz',              'Motorgeräte für Gemeinden, Werkhöfe und öffentliche Grünflächenpflege.'),
    ],
  },

  kaaz: {
    stats: [
      stat(1954, '', 'Gegründet'),
      stat(70, '+', 'Jahre Motorgeräte'),
      stat(50, '+', 'Länder beliefert'),
      stat(3, '', 'Gerätekategorien'),
    ],
    applications: [
      app('Leaf',     'Rasenpflege',                    'KAAZ Aufsitzmäher und Profi-Rasenmäher für Gärten und Grünanlagen.'),
      app('Scissors', 'Heckenschnitt & Freischneiden',  'Kraftvolle Freischneider und Heckenscheren für anspruchsvolle Pflege.'),
      app('TreePine', 'Forstwirtschaft',                 'KAAZ Kettensägen und Forstgeräte für professionelle Waldarbeit.'),
    ],
  },

  'pudu-robotics': {
    stats: [
      stat(2016, '', 'Gegründet'),
      stat(8, '+', 'Jahre Robotik'),
      stat(60, '+', 'Länder'),
      stat(100000, '+', 'Roboter im Einsatz'),
    ],
    applications: [
      app('Bot',      'Gastronomie & Hotellerie',       'Pudu BellaBot und KettyBot für automatisches Servieren und Geschirreinsammeln.'),
      app('Building', 'Pflege & Gesundheit',             'Serviceroboter für Altersheime, Spitäler und Kliniken.'),
      app('Warehouse','Logistik & Retail',               'Autonome Lieferroboter für Lagerhäuser, Supermärkte und Einkaufszentren.'),
      app('Star',     'Events & Messen',                 'Pudu-Roboter als Hingucker und Service-Assistent an Messen und Events.'),
    ],
  },

}

// ─── Hauptfunktion ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗')
  console.log('║   Brand Stats & Applications befüllen               ║')
  console.log('╚══════════════════════════════════════════════════════╝\n')

  const allBrands = await client.fetch(`*[_type == "brand"]{ _id, name, slug }`)

  let updated = 0
  let skipped = 0

  for (const brand of allBrands) {
    const slug = brand.slug?.current
    const extras = BRAND_EXTRAS[slug]

    if (!extras) {
      skipped++
      continue
    }

    const patch = {}
    if (extras.stats?.length)        patch.stats        = extras.stats
    if (extras.applications?.length) patch.applications = extras.applications

    if (Object.keys(patch).length > 0) {
      await client.patch(brand._id).set(patch).commit()
      console.log(`✅  ${brand.name} (${slug}): stats=${extras.stats?.length ?? 0}, apps=${extras.applications?.length ?? 0}`)
      updated++
    }
  }

  console.log(`\n── Zusammenfassung ──`)
  console.log(`   Aktualisiert: ${updated} Marken`)
  console.log(`   Übersprungen: ${skipped} Marken (kein Eintrag in BRAND_EXTRAS)`)
  console.log('\n✅  Fertig!\n')
}

main().catch(err => {
  console.error('\n💥', err.message)
  process.exit(1)
})
