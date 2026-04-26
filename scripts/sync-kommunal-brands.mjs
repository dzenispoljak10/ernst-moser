#!/usr/bin/env node
/**
 * Ernst Moser GmbH – Kommunalcenter-Marken synchronisieren.
 *
 * 7 Marken: Alkè, Kubota (nur Aufsitzmäher), Gianni Ferrari, Ligier Professional,
 *           TIMAN, Matev, Ecotech.
 *
 *   1. Lädt Produkt-Bilder + Brand-Hero-Bilder herunter
 *   2. Konvertiert nach WebP @ 85 %, max 1200 px Breite (Hero: 1920 px)
 *   3. Speichert lokal:
 *        Produkte → public/images/products/<slug>/main.webp
 *        Heroes  → public/images/brands/<brand>/hero.webp (nur wenn fehlend oder FORCE_HERO=1)
 *   4. Erstellt Ecotech-Brand in Sanity, falls nicht vorhanden
 *   5. Uploadet WebPs nach Sanity, erstellt Produkte mit Brand-Ref
 *   6. Löscht stale Produkte je Marke (Kubota-Traktoren raus etc.)
 *
 * Run:
 *   node --env-file=.env.local scripts/sync-kommunal-brands.mjs
 *
 * Optional:
 *   SKIP_SANITY=1 → nur Bilder herunterladen
 *   FORCE_HERO=1  → bestehende hero.webp überschreiben
 *   FORCE_IMG=1   → bestehende Produkt-Bilder neu herunterladen/konvertieren
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const SKIP_SANITY = process.env.SKIP_SANITY === '1'
const FORCE_HERO = process.env.FORCE_HERO === '1'
const FORCE_IMG = process.env.FORCE_IMG === '1'

const BRANDS = [
  {
    slug: 'alk',
    name: 'Alkè',
    referer: 'https://www.alke.com/',
    heroSourceUrl:
      'https://www.alke.com/de-de/images/stories/articles/0848/banners/1920/elektrofahrzeugen-geschichte-alke.webp',
    products: [
      { slug: 'alke-atx-340e', title: 'Alkè ATX 340E', shortDescription: 'Robustes Elektrofahrzeug für harte Arbeitsbedingungen — 1.630 kg Traglast, 4.500 kg Zuglast.', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0554/1920/elektrisches-nutzfahrzeug-alke-atx340e.webp' },
      { slug: 'alke-atx-440s', title: 'Alkè ATX 440S', shortDescription: 'Wendiger Klein-Transporter — nur 148 cm Breite (Spiegel eingeklappt) und 3 m Wendekreis.', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0859/1920/klein-transporter-elektroantrieb-alke-atx4.webp' },
      { slug: 'alke-atx-440m', title: 'Alkè ATX 440M', shortDescription: 'Meistverkauftes Modell — 1.540 kg Traglast, 5.000 kg Anhängelast, 200 cm Ladefläche.', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0860/1920/professionelle-elektrofahrzeuge-alke-atx4.webp' },
      { slug: 'alke-atx-480', title: 'Alkè ATX 480 (4x4)', shortDescription: 'Allrad-Geländewagen — überwindet bis 40 % Steigung, 1.450 kg Traglast, 5.000 kg Zuglast.', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0856/1920/elektro-gelaendewagen-atx480-alke.webp' },
      { slug: 'alke-atx-ed', title: 'Alkè ATX ED Doppelkabine', shortDescription: '4 Sitze für simultanen Team- und Material-Transport — 1.450 kg Traglast.', sourceImageUrl: 'https://www.alke.com/de-de/images/stories/articles/0521/1920/elektro-transporter-doppelkabine-alke-atx-ed.webp' },
    ],
  },
  {
    slug: 'kubota',
    name: 'Kubota',
    referer: 'https://www.adbachmannag.ch/',
    heroSourceUrl:
      'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/GZD-Serie/gzd21_studio.jpg',
    products: [
      { slug: 'kubota-fc2-serie', title: 'Kubota FC2 Serie', shortDescription: 'Kompakter Front-Aufsitzmäher mit Kubota D902-Motor (22 PS).', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/FC2-Serie/fc2-221-studio-01.jpg' },
      { slug: 'kubota-fc3-serie', title: 'Kubota FC3 Serie', shortDescription: 'Robuster Grossflächenmäher mit 3-Zylinder-Diesel und 800-Liter-Fangbehälter.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/FC3-Serie/fc3-261-studio.jpg' },
      { slug: 'kubota-g-serie', title: 'Kubota G Serie', shortDescription: 'Professioneller Rasentraktor mit HST-Getriebe und kraftvollem Mähdeck.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/G-Serie/g231-studio.jpg' },
      { slug: 'kubota-gr-serie', title: 'Kubota GR Serie', shortDescription: 'Hochwertige Aufsitzmäher mit Diesel-Motoren (13,5 / 21 PS) und Fangbehältern bis 450 Liter.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/GR-Serie/gr2120-studio.jpg' },
      { slug: 'kubota-gzd-serie', title: 'Kubota GZD Serie', shortDescription: 'Zero-Turn-Dieselrasenmäher mit 15 oder 21 PS — beispielhafte Wendigkeit.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/GZD-Serie/gzd21_studio.jpg' },
      { slug: 'kubota-z4-serie', title: 'Kubota Z4 Serie', shortDescription: 'Premium Zero-Turn-Mäher mit exaktem Schnittbild und hoher Flächenleistung.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/Z4-Serie/z4-541-studio-01.jpg' },
      { slug: 'kubota-zd-serie', title: 'Kubota ZD Serie', shortDescription: 'Hochleistungs-Zero-Turn mit 25-PS-Diesel und kraftvoller HST-Übertragung.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/Kubota_Aufsitzmaeher/ZD-Serie/zd-1211_studio-01.jpg' },
    ],
  },
  {
    slug: 'gianni-ferrari',
    name: 'Gianni Ferrari',
    referer: 'https://gianniferrari.com/',
    heroSourceUrl: 'https://gianniferrari.com/wp-content/uploads/2024/07/Gianni_Ferrari-Turbo-v50.jpg',
    products: [
      { slug: 'gianni-ferrari-pg', title: 'PG / PG XPRO', shortDescription: 'Multifunktionale Rasenmäher mit 600–800 Liter Behälter und 22–26 PS — 2WD oder 4WD.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/PG220D-dal-basso-2-scaled.jpg' },
      { slug: 'gianni-ferrari-gtr', title: 'GTR Frontmäher', shortDescription: 'Kompakter Frontmäher mit Briggs & Stratton Motor und 280-Liter-Behälter.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/Gianni_Ferrari-GTR.jpg' },
      { slug: 'gianni-ferrari-turbo-1-2-4', title: 'Turbo 1 / 2 / 4', shortDescription: 'Multifunktions-Mäher mit 1.100–1.300 Liter Behälter, 26 PS Diesel — 4WD-Varianten.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/10/GF-Turbo4.jpg' },
      { slug: 'gianni-ferrari-turbo-v50', title: 'Turbo V50', shortDescription: 'Professioneller 50-PS-Großflächenmäher mit 4WD und elektronischem Kubota-Diesel.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/07/Gianni_Ferrari-Turbo-v50.jpg' },
      { slug: 'gianni-ferrari-turboloader', title: 'Turboloader', shortDescription: 'Multifunktionsmaschine mit Teleskoparm (3 m), 700–900 kg Hubkraft und über 25 Anbaugeräten.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/07/turboloader.jpg' },
      { slug: 'gianni-ferrari-gsr-plus', title: 'GSR Plus (Elektro)', shortDescription: 'Elektrischer Profi-Mäher mit 112 cm Schnittbreite, Li-Ion-Akku und 6–8 Stunden Laufzeit.', sourceImageUrl: 'https://gianniferrari.com/wp-content/uploads/2024/09/GSR-elettric-.jpg' },
    ],
  },
  {
    slug: 'ligier-professional',
    name: 'Ligier Professional',
    referer: 'https://www.adbachmannag.ch/',
    heroSourceUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_4/ligier_pulse_4_studio.jpg',
    products: [
      { slug: 'ligier-pulse-3', title: 'Ligier Pulse 3', shortDescription: 'Dreirädriges Elektrofahrzeug mit Pendelsystem (±30°) — wendig und sicher.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_3/ligier_pulse_3_studio.jpg' },
      { slug: 'ligier-pulse-4', title: 'Ligier Pulse 4', shortDescription: 'Modulares Elektronutzfahrzeug mit Clip-System für Aufbauwechsel in 5 Minuten.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Elektrofahrzeuge/Ligier/PULSE_4/ligier_pulse_4_studio.jpg' },
    ],
  },
  {
    slug: 'timan',
    name: 'TIMAN',
    referer: 'https://www.adbachmannag.ch/',
    heroSourceUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/Tool-Trac_studio.jpg',
    products: [
      { slug: 'timan-tool-trac', title: 'TIMAN Tool-Trac', shortDescription: 'Kompakter Geräteträger mit 65 cm Wendekreis, 4WD und hydraulischem Parallelogrammhub.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/Tool-Trac_studio.jpg' },
      { slug: 'timan-rc-1000', title: 'TIMAN RC-1000', shortDescription: 'Ferngesteuerter Hangmäher mit Einzelradaufhängung und hydraulischer Mähwerkshubfunktion.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC1000_studio.jpg' },
      { slug: 'timan-rc-751', title: 'TIMAN RC-751', shortDescription: 'Funkferngesteuerter Hangmäher für Steigungen bis 50° — 750 mm Schnittbreite.', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/RC-751/Timan_RC751_Studio.jpg' },
      { slug: 'timan-3330', title: 'TIMAN 3330', shortDescription: 'Knickgelenkter Geräteträger mit branchenführend leiser Kabine (68 dB).', sourceImageUrl: 'https://www.adbachmannag.ch/images/stories/Produkte/Kommunal/TIMAN/3330/Timan_3330_Studio.jpg' },
    ],
  },
  {
    slug: 'matev',
    name: 'Matev',
    referer: 'https://www.matev.eu/',
    heroSourceUrl:
      'https://www.matev.eu/01_Produkte/02_MOW/MOW-PT/Marketingbilder/Bannerbild/image-thumb__9390__content-full/mow-pt-155-portalmaehwerk-hero01-matev.jpg',
    products: [
      { slug: 'matev-mow-fm-160', title: 'Matev MOW-FM 160', shortDescription: 'Frontmähwerk 160 cm mit PE-Cover und 5 austauschbaren Mähköpfen.', sourceImageUrl: 'https://www.matev.eu/01_Produkte/02_MOW/MOW-FM/MOW-FM-160/16_Marketingbilder/01_Bilder-main/image-thumb__4572__content-full/mow-fm-160-striegel-frontmaehwerk-main01-matev.jpg' },
      { slug: 'matev-mow-pt-155', title: 'Matev MOW-PT 155', shortDescription: 'Portalmähwerk 155 cm mit insektenschonender Mähtechnik.', sourceImageUrl: 'https://www.matev.eu/01_Produkte/02_MOW/MOW-PT/Marketingbilder/Bannerbild/image-thumb__9390__content-full/mow-pt-155-portalmaehwerk-hero01-matev.jpg' },
      { slug: 'matev-srm-fb-150', title: 'Matev SRM-FB 150', shortDescription: 'Klappschild-Schneepflug 150 cm mit hydraulischer 25°-Winkelverstellung.', sourceImageUrl: 'https://www.matev.eu/01_Produkte/06_SRM/SRM-FB/16_Marketingbilder/Bannerbilder/image-thumb__9418__content-full/srm-fb-150-schneeraeumschild-360grad01-matev.jpg' },
      { slug: 'matev-swe-45', title: 'Matev SWE-45', shortDescription: 'Frontkehrmaschine SWE-45 — ideal für Laub und Schmutz auf Strassen und Grünflächen.', sourceImageUrl: 'https://www.matev.eu/01_Produkte/05_SWE/SWE-45/16_Marketingbilder/Bannerbilder/image-thumb__9383__content-full/swe-14-45-frontkehrmaschine-360grad01-matev.jpg' },
      { slug: 'matev-cls-g-1350-xe', title: 'Matev CLS-G 1350 XE', shortDescription: 'Grasaufnahmegerät 1.350 Liter mit leistungsstarker Turbine und Bodenentladung.', sourceImageUrl: 'https://www.matev.eu/01_Produkte/04_CLS/CLS-XE/16_Marketingbilder/Bannerbilder/image-thumb__9399__content-full/cls-1350-xe-aufnahmegeraet-360grad01-matev.jpg' },
    ],
  },
  {
    slug: 'ecotech',
    name: 'Ecotech',
    referer: 'https://www.ecotech.at/',
    heroSourceUrl: 'https://www.ecotech.at/wp-content/uploads/2020/09/2020-04-08-09.30.59_bearb.jpg',
    products: [
      { slug: 'ecotech-kehrmaschine-r', title: 'Ecotech Kehrmaschine R', shortDescription: 'Strassenkehrmaschine 240 cm mit Wassersprüh-Vorrichtung und 1.000-Liter-Multiwash-Tank.', sourceImageUrl: 'https://www.ecotech.at/wp-content/uploads/2020/09/2020-04-08-09.30.59_bearb.jpg' },
      { slug: 'ecotech-icefighter-solesprueher', title: 'Ecotech IceFighter® Solesprüher', shortDescription: 'Intelligenter Salzlaugen-Sprüher mit ca. 1.300 L Tank — spart bis 75 % Salzkosten.', sourceImageUrl: 'https://www.ecotech.at/wp-content/uploads/2020/05/IceFighter_fuer_Altoetting.jpg' },
      { slug: 'ecotech-wildkrautbuerste', title: 'Ecotech Wildkrautbürste WKT', shortDescription: 'Mechanische Wildkrautentfernung ohne Herbizide für Wege und Plätze.', sourceImageUrl: 'https://www.ecotech.at/wp-content/uploads/2019/10/Ecotech-Wildkrautbuerste-Flachdraht.jpg' },
    ],
  },
  {
    slug: 'envitec',
    name: 'Envitec',
    referer: 'https://www.envitec.ch/',
    heroSourceUrl: 'https://envitec.ch/wp-content/uploads/2021/01/ENS2100R.png',
    products: [
      { slug: 'envitec-anhaengerstreuautomat-0-6-1-5-m', title: 'Anhängerstreuautomat 0.6 – 1.5 m³', shortDescription: 'Schweizer Anhänger-Salzstreuer mit unabhängigem Hydraulikantrieb und V2A-Edelstahlkonstruktion.', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/01/ENS2100R.png' },
      { slug: 'envitec-aufbaustreugeraete-0-3-0-7-m', title: 'Aufbaustreugeräte 0.3 – 0.7 m³', shortDescription: 'Aufbau-Streugerät für Kommunalfahrzeuge — V2A-Edelstahl, Streubreiten 1–8 m.', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-1040.png' },
      { slug: 'envitec-aufbaustreugeraete-0-4-1-5-m-elektrisch', title: 'Aufbaustreugeräte 0.4 – 1.5 m³ Elektrisch', shortDescription: 'Elektrisch angetriebener Streuer (12 V) mit JetSpread Professional Steuerung.', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2022/02/AKP-400-1300-E-1024x576.jpg' },
      { slug: 'envitec-aufbaustreugeraete-1-5-4-0-m', title: 'Aufbaustreugeräte 1.5 – 4.0 m³', shortDescription: 'Grossvolumen-Aufbaustreuer mit Bandförderer und GPS-basierter Steuerung.', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-1040.png' },
      { slug: 'envitec-schleuder-streuer-120-360-lt', title: 'Schleuder-Streuer 500 – 1.200 L', shortDescription: 'Tellerstreuer mit 500–1.200 L Volumen, 1–12 m Streubreite und Hydraulikantrieb.', sourceImageUrl: 'https://envitec.ch/wp-content/uploads/2021/02/ens-554.png' },
    ],
  },
  {
    slug: 'reform',
    name: 'Reform',
    referer: 'https://www.reform.at/',
    heroSourceUrl: 'https://www.reform.at/fileadmin/_processed_/5/5/csm_MetracH75_WEB_04_0015f9eb61.jpg',
    products: [
      { slug: 'reform-motech-cm818-d', title: 'Reform Motech CM818-D', shortDescription: 'Schwerer Einachs-Motormäher mit Differential — robuste Hangmäh-Plattform.', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/8/c/csm_cm818d_50e6334bf8.jpg' },
      { slug: 'reform-motech-erm9041e', title: 'Reform Motech eRM9041e', shortDescription: 'Vollelektrischer Einachs-Hangmäher — emissionsfrei, leise, wartungsarm.', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/b/3/csm_eRM9-with-sweeping-brush-new_4390a22bef.jpg' },
      { slug: 'reform-boki-h140', title: 'Reform Boki H140', shortDescription: 'Kompakter Geräteträger (1,4 m Breite) mit Allradlenkung und 110–129 kW Diesel.', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/7/4/csm_BOKI-H140-27_Pfad_b631c18281.jpg' },
      { slug: 'reform-boki-h170', title: 'Reform Boki H170', shortDescription: 'Geräumiger Kommunal-Geräteträger (1,7 m Breite) mit zwei Radständen und 150–175 PS.', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/c/5/csm_Freisteller_BOKI_H170_Web_NEU_EN_breiter_9fad85d40d.jpg' },
      { slug: 'reform-metrac-h75', title: 'Reform Metrac H75', shortDescription: 'Vielseitiger Hang-Geräteträger mit 75-PS-Perkins, hydrostatischem Antrieb und 4-Radlenkung.', sourceImageUrl: 'https://www.reform.at/fileadmin/_processed_/5/5/csm_MetracH75_WEB_04_0015f9eb61.jpg' },
      { slug: 'reform-muli-t7-x', title: 'Reform Muli T7 X', shortDescription: 'Kommunaltransporter mit 109 PS, Allradantrieb und niedrigem Schwerpunkt.', sourceImageUrl: 'https://reform.at/fileadmin/_processed_/0/0/csm_Reform-Muli-T7x-web_c1cf1a7565.jpg' },
    ],
  },
  {
    slug: 'baoli',
    name: 'Baoli',
    referer: 'https://www.baoli-emea.com/',
    heroSourceUrl: 'https://data.still.de/assets/baoli/Products/Multifunction_Vehicle/KBO_01L/_Produktdetail_Hero_1024x1024.jpg',
    products: [
      { slug: 'baoli-kbd-15-20-kbg-15-20', title: 'Gabelstapler KBD/KBG 15-20', shortDescription: 'Vielseitige Stapler mit Verbrennungsmotor, 1,5–2,0 t Tragfähigkeit.', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Internal_combustion_trucks/KBD_G_15-20/Baoli_Internal_Combustion_Truck_KBD_G_15-20__Header_1024x1024.jpg' },
      { slug: 'baoli-kbe-25-35', title: 'Elektrogabelstapler KBE 25-35', shortDescription: 'Elektrostapler für Standardanwendungen — 2,5–3,5 t Traglast.', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Electric_forklift_trucks/KBE_25-35/Baoli_Electric_Forklift_Truck_KBE_25-35_Header_1024x1024.png' },
      { slug: 'baoli-niederhubwagen', title: 'Niederhubwagen EP 20-111', shortDescription: 'Elektrischer Niederhubwagen mit 2.000 kg Tragfähigkeit.', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Pallet_trucks/EP_20-111/Baoli_Pallet_Truck_EP_20-111_Header_1024x1024.jpg' },
      { slug: 'baoli-kbs-12', title: 'Hochhubwagen KBS 12', shortDescription: 'Einstiegs-Hochhubwagen mit 1,2 t Tragfähigkeit.', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Pallet_stackers/KBS-I-M_12/Baoli_Pallet_Stacker_KBS_12_Header_1024x1024.png' },
      { slug: 'baoli-multifunktionsfahrzeug', title: 'Multifunktionsfahrzeug KBO 01L', shortDescription: 'Neues Multifunktionsfahrzeug mit Greifhöhe bis 5 m.', sourceImageUrl: 'https://data.still.de/assets/baoli/Products/Multifunction_Vehicle/KBO_01L/_Produktdetail_Hero_1024x1024.jpg' },
    ],
  },
  {
    slug: 'mulchy',
    name: 'Mulchy',
    referer: 'https://www.silentag.ch/',
    heroSourceUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Schlegelmulcher/Weidemulcher/SLIDE.jpg',
    products: [
      { slug: 'mulchy-weidemulcher', title: 'Mulchy Weidemulcher', shortDescription: 'Schlegelmulcher mit über 100 Modellen und Arbeitsbreiten bis 250 cm.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Schlegelmulcher/Weidemulcher/SLIDE.jpg' },
      { slug: 'mulchy-landwirtschaft-schlegel', title: 'Mulchy Landwirtschafts-Schlegelmulcher', shortDescription: 'Etablierte Eigenmarke mit über 5.000 verkauften Geräten.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Schlegelmulcher/Schlegelmulcher_Landwirtschaft/SLIDE.jpg' },
      { slug: 'mulchy-sichelmulcher-vario', title: 'Mulchy Sichelmulcher VARIO', shortDescription: 'Vielseitiges Mulchgerät mit stufenlos hydraulisch eingestellter Arbeitsbreite.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/MULCHY_Sichelmulcher/MULCHY_Vario/SLIDE.JPG' },
      { slug: 'mulchy-boeschungsmaeher-kompakt', title: 'Mulchy Böschungsmäher Kompakt', shortDescription: 'Front-Böschungsmäher mit klappbarem Auslegerarm.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Park-und-Arealpflege/Kompakt/SLIDE.jpg' },
      { slug: 'mulchy-einachser-schlegel', title: 'Mulchy Einachser-Schlegelmulcher', shortDescription: 'Mulchgeräte für Einachser mit extremer Schnittleistung.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Haus_und_Garten/WhatsApp_Image_2024-06-10_at_19.38.16_-_Kopie.jpeg' },
      { slug: 'mulchy-ras-weidenmulcher', title: 'Mulchy RAS Weidenmulcher', shortDescription: 'Sichelmulcher mit drei Messern und höhenverstellbaren Laufrollen.', sourceImageUrl: 'https://www.silentag.ch/media/Silent/Obst-und-Weinbau/RAS_Weidenmulcher/SLIDE.JPG' },
    ],
  },
]

let client = null
if (!SKIP_SANITY) {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN (or pass SKIP_SANITY=1)')
    process.exit(1)
  }
  client = createClient({
    projectId: 'owqsc1ph',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
  })
}

async function downloadImage(url, referer) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
      Referer: referer,
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1024) throw new Error(`suspiciously small image: ${buf.length} bytes`)
  return buf
}

async function ensureProductImage(brand, product) {
  const dir = path.join(ROOT, 'public', 'images', 'products', product.slug)
  const out = path.join(dir, 'main.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && fs.statSync(out).size > 1024 && !FORCE_IMG) {
    return { fresh: false }
  }
  const raw = await downloadImage(product.sourceImageUrl, brand.referer)
  const webp = await sharp(raw)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return { fresh: true }
}

async function ensureBrandHero(brand) {
  const dir = path.join(ROOT, 'public', 'images', 'brands', brand.slug)
  const out = path.join(dir, 'hero.webp')
  fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(out) && !FORCE_HERO) {
    return { fresh: false }
  }
  const raw = await downloadImage(brand.heroSourceUrl, brand.referer)
  const webp = await sharp(raw)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(out, webp)
  return { fresh: true }
}

async function getCenterId() {
  const c = await client.fetch(
    `*[_type=="center" && slug.current=="kommunalcenter"][0]{_id}`,
  )
  if (!c) throw new Error('kommunalcenter not found in Sanity')
  return c._id
}

async function ensureBrand(brand, centerId) {
  const existing = await client.fetch(
    `*[_type=="brand" && slug.current==$slug][0]{_id}`,
    { slug: brand.slug },
  )
  if (existing) return existing._id
  const id = `brand-${brand.slug}`
  await client.createOrReplace({
    _id: id,
    _type: 'brand',
    name: brand.name,
    slug: { _type: 'slug', current: brand.slug },
    center: { _type: 'reference', _ref: centerId },
  })
  console.log(`   🆕 Created brand ${brand.slug}`)
  return id
}

async function uploadAsset(filepath, slug) {
  const buf = fs.readFileSync(filepath)
  const asset = await client.assets.upload('image', buf, {
    filename: `${slug}.webp`,
  })
  return asset._id
}

async function ensureProduct(brandId, brand, product) {
  const productId = `product-${product.slug}`
  const localPath = path.join(
    ROOT, 'public', 'images', 'products', product.slug, 'main.webp',
  )
  const assetId = await uploadAsset(localPath, product.slug)
  await client.createOrReplace({
    _id: productId,
    _type: 'product',
    name: product.title,
    slug: { _type: 'slug', current: product.slug },
    brand: { _type: 'reference', _ref: brandId },
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: 's1', text: product.shortDescription, marks: [] },
        ],
      },
    ],
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  })
  return productId
}

async function deleteStale(brandSlug, keepSlugs) {
  const ids = await client.fetch(
    `*[_type=="product" && brand->slug.current==$brand && !(slug.current in $keep)]._id`,
    { brand: brandSlug, keep: keepSlugs },
  )
  for (const id of ids) {
    await client.delete(id)
    console.log(`   🗑  deleted ${id}`)
  }
  if (ids.length === 0) console.log(`   (no stale ${brandSlug} products)`)
}

async function main() {
  console.log()
  for (const brand of BRANDS) {
    console.log(`📋 ${brand.name} – ${brand.products.length} Produkte\n`)

    // Hero
    try {
      const r = await ensureBrandHero(brand)
      console.log(`   ✅ ${brand.name} Hero${r.fresh ? ' - heruntergeladen' : ' - bereits vorhanden'}`)
    } catch (e) {
      console.error(`   ❌ ${brand.name} Hero - ${e.message}`)
    }

    // Produkte
    for (const p of brand.products) {
      try {
        const r = await ensureProductImage(brand, p)
        console.log(
          `   ✅ ${p.title.padEnd(38)} - ${r.fresh ? 'Bild heruntergeladen' : 'Bild bereits vorhanden'}`,
        )
      } catch (e) {
        console.error(`   ❌ ${p.title.padEnd(38)} - ${e.message}`)
      }
    }
    console.log()
  }

  if (SKIP_SANITY) {
    console.log('(SKIP_SANITY=1, Sanity-Sync übersprungen)\n')
    return
  }

  console.log('🛰  Sanity sync…\n')
  const centerId = await getCenterId()

  for (const brand of BRANDS) {
    console.log(`🏭 ${brand.name}`)
    const brandId = await ensureBrand(brand, centerId)
    await deleteStale(brand.slug, brand.products.map((p) => p.slug))
    for (const p of brand.products) {
      try {
        const id = await ensureProduct(brandId, brand, p)
        console.log(`   ✅ ${p.title.padEnd(38)} → ${id}`)
      } catch (e) {
        console.error(`   ❌ ${p.title.padEnd(38)}: ${e.message}`)
      }
    }
    console.log()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
