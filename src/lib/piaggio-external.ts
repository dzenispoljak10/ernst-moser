/**
 * Piaggio product slug → offizielle deutsche Herstellerseite (piaggio-commercial.ch).
 *
 * Die NP6-Karosserien haben eigene deutsche Seiten (Chassis, Pickup, Kipper).
 * Die NPE-Varianten haben keine feingranularen URLs – alle zeigen auf die
 * NPE-Übersicht /de/nutzfahrzeuge/npe/.
 */

const PIAGGIO_EXTERNAL_URLS: Record<string, string> = {
  'piaggio-porter-np6-chassis-einzelbereifung': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/chassis/',
  'piaggio-porter-np6-chassis-zwillingsbereifung': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/chassis/',
  'piaggio-porter-np6-pickup': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/pick-up-np6-nutzfahrzeug-1/',
  'piaggio-porter-np6-dreiseitenkipper': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/kipper/',
  'piaggio-porter-npe-chassis-einzelbereifung': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
  'piaggio-porter-npe-pritsche-einzelbereifung': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
  'piaggio-porter-npe-heckkipper-einzelbereifung': 'https://piaggio-commercial.ch/de/nutzfahrzeuge/npe/',
}

export function getPiaggioExternalUrl(productSlug: string): string | null {
  return PIAGGIO_EXTERNAL_URLS[productSlug] ?? null
}

/**
 * Deutsche Broschüre / technisches Datenblatt (PDF) pro Produkt.
 * NP6-Karosserien → Porter-NP6-Broschüre, NPE-Varianten → Porter-NPE-Broschüre.
 * Quelle: piaggio-commercial.ch.
 */
const NP6_BROCHURE = 'https://piaggio-commercial.ch/wp-content/uploads/2024/03/MY24_PIAGGIO-PORTER-NP6_01-2024.pdf'
const NPE_BROCHURE = 'https://piaggio-commercial.ch/wp-content/uploads/2024/11/LowRes-DE-Piaggio-Porter-NPE-Brochure-10-2024.pdf'

const PIAGGIO_DATENBLATT_URLS: Record<string, string> = {
  'piaggio-porter-np6-chassis-einzelbereifung': NP6_BROCHURE,
  'piaggio-porter-np6-chassis-zwillingsbereifung': NP6_BROCHURE,
  'piaggio-porter-np6-pickup': NP6_BROCHURE,
  'piaggio-porter-np6-dreiseitenkipper': NP6_BROCHURE,
  'piaggio-porter-npe-chassis-einzelbereifung': NPE_BROCHURE,
  'piaggio-porter-npe-pritsche-einzelbereifung': NPE_BROCHURE,
  'piaggio-porter-npe-heckkipper-einzelbereifung': NPE_BROCHURE,
}

export function getPiaggioDatenblattUrl(productSlug: string): string | null {
  return PIAGGIO_DATENBLATT_URLS[productSlug] ?? null
}
