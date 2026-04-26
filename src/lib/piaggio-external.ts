/**
 * Piaggio product slug → offizielle Herstellerseite.
 *
 * Die Piaggio-CH-Webseite hat keine feingranularen Variant-URLs;
 * alle NP6-Chassis-Varianten zeigen auf /modelle/chassis/, alle NPE-Varianten
 * auf /porter-npe/. Darum mappen mehrere Produkte auf dieselbe Ziel-URL.
 */

const PIAGGIO_EXTERNAL_URLS: Record<string, string> = {
  'piaggio-porter-np6-chassis-einzelbereifung': 'https://commercial.piaggio.com/de_DE/modelle/chassis/',
  'piaggio-porter-np6-chassis-zwillingsbereifung': 'https://commercial.piaggio.com/de_DE/modelle/chassis/',
  'piaggio-porter-npe-chassis-einzelbereifung': 'https://commercial.piaggio.com/de_DE/porter-npe/',
  'piaggio-porter-npe-pritsche-einzelbereifung': 'https://commercial.piaggio.com/de_DE/porter-npe/',
  'piaggio-porter-npe-heckkipper-einzelbereifung': 'https://commercial.piaggio.com/de_DE/porter-npe/',
  'piaggio-porter-npe-heckkipper-grasfanggitter': 'https://commercial.piaggio.com/de_DE/porter-npe/',
}

export function getPiaggioExternalUrl(productSlug: string): string | null {
  return PIAGGIO_EXTERNAL_URLS[productSlug] ?? null
}
