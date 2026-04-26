#!/usr/bin/env node
/**
 * Fügt deutsche Beschreibungen zu Sanity-Produkten hinzu, denen Text fehlt.
 * Läuft idempotent — überschreibt nichts, was bereits Inhalt hat.
 */
import { createClient } from '@sanity/client'

if (!process.env.SANITY_TOKEN) { console.error('Missing SANITY_TOKEN'); process.exit(1) }
const client = createClient({
  projectId: 'owqsc1ph', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN,
})

const DESCRIPTIONS = {
  // ── Ambrogio (Mähroboter — Info-Karten) ────────────────────────
  'ambrogio-automatisierte-rasenpflege-fuer-jede-flaeche':
    'Ambrogio bietet für jede Rasenfläche den passenden Mähroboter — von kompakten Modellen für kleine Gärten bis hin zu professionellen Robotern für mehrere Hektar. Drahtfreie Begrenzung, GPS-Navigation und intelligente Routenführung sorgen für ein gleichmässiges Schnittbild ohne manuelles Eingreifen.',
  'ambrogio-innovative-technologie-fuer-perfekte-rasenpflege':
    'Modernste Sensor- und Navigationstechnik macht Ambrogio-Roboter zu zuverlässigen Helfern: Hindernis-Erkennung, GPS-Tracking, Smartphone-App-Steuerung und automatische Heimkehr zur Ladestation. Ergebnis ist ein dichter, gepflegter Rasen mit minimalem Aufwand.',
  'ambrogio-smarte-funktionen-und-maximale-sicherheit':
    'Ambrogio-Mähroboter verbinden smarte Funktionen mit höchsten Sicherheitsstandards: Diebstahlschutz, PIN-Code-Sperre, Anhebe- und Kippsensoren sowie regen- und temperaturabhängige Mähpläne. So bleibt der Rasen geschützt, der Roboter sicher und Sie behalten die volle Kontrolle.',

  // ── Nilfisk (Reinigungstechnik-Kategorien) ──────────────────────
  'nilfisk-bodenreinigungsgeraete':
    'Nilfisk Bodenreinigungsgeräte decken den gesamten Bedarf ab — von handgeführten Scheuersaugmaschinen für kleine Verkaufsflächen bis zu Aufsitzmaschinen für grosse Hallen. Robuste Konstruktion, wartungsfreundlicher Aufbau und überzeugende Reinigungsleistung machen sie zur ersten Wahl für Profis im Gebäudereinigungs- und Industriesektor.',
  'nilfisk-gewerbesauger':
    'Nilfisk Gewerbesauger sind ausgelegt für den dauerhaften, harten Einsatz in Hotels, Büros, Werkstätten und im Handwerk. Hohe Saugleistung, ergonomisches Handling und langlebige Komponenten sorgen für ein professionelles Reinigungsergebnis bei niedrigen Betriebskosten.',
  'nilfisk-hochdruckreiniger':
    'Vom kompakten Kaltwasser-Hochdruckreiniger bis zum mobilen Heisswassergerät — Nilfisk Hochdruckreiniger lösen hartnäckigen Schmutz auf Fahrzeugen, Maschinen und Aussenflächen. Profi-Pumpentechnik, durchdachtes Zubehör und robuste Bauweise garantieren Effizienz und lange Lebensdauer.',
  'nilfisk-industriesauger':
    'Nilfisk Industriesauger bewältigen Stäube, Späne, Flüssigkeiten und Sondereinsätze in Industrie und Handwerk. Mit zertifizierten Filtern (auch ATEX/H-Klasse), grossen Behältern und wartungsfreundlichem Aufbau sind sie ideal für Werkstätten, Produktion und Baustellen.',

  // ── Segway / Navimow (Mähroboter-Serien) ────────────────────────
  'segway-navimow-h-series':
    'Die Navimow H-Serie ist Segways drahtfreier Mähroboter für mittlere bis grosse Gärten (bis 5 000 m²). Dank EFLS 2.0 RTK-Navigation arbeitet er ohne Begrenzungsdraht — millimetergenau, wetterfest und mit smarter App-Steuerung. Ideal für anspruchsvolle Privat- und Gemeindeflächen.',
  'segway-navimow-x-series':
    'Die Navimow X-Serie ist Segways Profi-Mähroboter für sehr grosse Flächen (bis 10 000 m²). Mit 360°-Vision-Kamera, KI-Hinderniserkennung und RTK-GPS bewältigt er auch komplexe Topografien zuverlässig — die richtige Wahl für Sportplätze, Hotels und grosse Privatanlagen.',
  'segway-navimow-i-series':
    'Die Navimow i-Serie bringt drahtfreie Mährobotik in den kompakten Gartenbereich (bis 1 500 m²). Schnelle Installation, leiser Betrieb und intuitive Smartphone-App machen sie zur einfachen Lösung für Eigenheim-Gärten ohne aufwendige Drahtverlegung.',

  // ── Swardman (Spindelmäher) ────────────────────────────────────
  'swardman-swardman-edwin-2-1-45':
    'Der Swardman Edwin 2.1 – 45 ist ein Premium-Spindelmäher mit 45 cm Schnittbreite, hergestellt in der Tschechischen Republik. Modulare Mähkassetten ermöglichen den schnellen Wechsel zwischen Mähen, Vertikutieren, Bürsten und Walzen — ideal für englische Rasenflächen, Sportrasen und exklusive Privatanlagen.',
  'swardman-swardman-electra-2-0-55':
    'Der Swardman Electra 2.0 – 55 ist der akkubetriebene Premium-Spindelmäher mit 55 cm Schnittbreite. Vollelektrisch, leise und emissionsfrei — kombiniert er das präzise Schnittbild eines klassischen Spindelmähers mit moderner Lithium-Ionen-Antriebstechnik. Erste Wahl für nachhaltige Pflege von Sportrasen und englischen Rasenflächen.',

  // ── Wabco (Info-Karten) ────────────────────────────────────────
  'wabco-bremssysteme-und-fahrzeugsicherheit':
    'WABCO entwickelt seit Jahrzehnten elektronische Bremssysteme (EBS, ABS), Stabilitätskontrollen (ESP) und assistierende Sicherheitssysteme für Nutzfahrzeuge. Als OE-Lieferant für die meisten europäischen Lkw-Hersteller setzt WABCO den Standard für Bremsperformance und Fahrzeugsicherheit im Schwerverkehr.',
  'wabco-intelligente-fahrzeugtechnologie':
    'Mit Lösungen wie OnLane, OnGuard, OptiFlow und vernetzter Telematik bringt WABCO intelligente Assistenz- und Effizienzsysteme in moderne Nutzfahrzeuge. Spurhalte-, Notbrems- und Abstandsregelsysteme erhöhen Sicherheit und senken Verbrauch — heute Standard in vielen Flotten.',

  // ── Zaugg (Winterdienst-Kategorien) ─────────────────────────────
  'zaugg-zaugg-schneefraesschleudern':
    'Zaugg Schneefrässchleudern sind seit Jahrzehnten der Schweizer Standard für effizienten Winterdienst — vom kompakten Anbaugerät für Kommunalfahrzeuge bis zur leistungsstarken Grossfräse für Flughäfen und Bergstrassen. Robuste Bauweise, hohe Wurfweiten und wartungsfreundliche Konstruktion zeichnen jedes Zaugg-Modell aus.',
  'zaugg-zaugg-schneepfluege':
    'Zaugg Schneepflüge bieten für jede Anwendung den richtigen Aufbau — Vario-, Seitenpflug, Variant-X-Flügel und Spezialvarianten für Lkw, Unimog und Kommunalträger. Schweizer Qualitätsstahl, durchdachte Hydraulik und langlebige Schürfleisten sorgen für zuverlässigen Räumeinsatz selbst unter härtesten Bedingungen.',
}

function asBlocks(text) {
  return [{
    _type: 'block',
    _key: 'd1',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: 's1', text, marks: [] }],
  }]
}

const products = await client.fetch(`
  *[_type=="product" && slug.current in $slugs]{ _id, "slug": slug.current, name }
`, { slugs: Object.keys(DESCRIPTIONS) })

let ok = 0, fail = 0
for (const p of products) {
  const text = DESCRIPTIONS[p.slug]
  if (!text) continue
  try {
    await client.patch(p._id).set({ description: asBlocks(text) }).commit()
    console.log(`✅ ${p.slug}`)
    ok++
  } catch (e) {
    console.error(`❌ ${p.slug}: ${e.message}`)
    fail++
  }
}
console.log(`\nDone — ${ok} updated, ${fail} failed.`)
