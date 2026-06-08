// mId = exakter Modellname (`modelName_DE`) aus dem Fiat-Professional-Offerten-
// Portal. Verifiziert gegen die Portal-API (dwsModels). Achtung: das Portal
// kennt KEIN „E-Doblò" und KEIN „Chassis Cab & Pickup" – diese verweisen daher
// auf das nächstgelegene reale Modell (Doblò bzw. Ducato).
export const FIAT_MODEL_IDS = {
  'scudo': 'Scudo',
  'e-scudo': 'E-Scudo',
  'doblo': 'Doblò',
  'e-doblo': 'Doblò',           // E-Doblò existiert im Portal nicht → Doblò
  'ducato': 'Ducato',
  'e-ducato': 'E-Ducato',
  'ulysse': 'Ulysse',
  'e-ulysse': 'E-Ulysse',
  'chassis-cab-pickup': 'Ducato', // Chassis basiert auf Ducato
} as const

export type FiatModelSlug = keyof typeof FIAT_MODEL_IDS

export const getFiatQuoteUrl = (slug: FiatModelSlug): string | null => {
  const mId = FIAT_MODEL_IDS[slug]
  if (!mId) return null
  return `https://ernst-moser.garage.fiatprofessional.ch/forms/request-quote?mId=${encodeURIComponent(mId)}`
}

// Maps Sanity product slugs to Fiat model config keys.
// Sanity slugs were generated from product names with `ò` stripped, so the
// mapping is explicit rather than algorithmic.
const PRODUCT_SLUG_TO_MODEL: Record<string, FiatModelSlug> = {
  'fiat-scudo': 'scudo',
  'fiat-e-scudo': 'e-scudo',
  'fiat-dobl': 'doblo',
  'fiat-e-dobl': 'e-doblo',
  'fiat-ducato': 'ducato',
  'fiat-e-ducato': 'e-ducato',
  'fiat-ulysse': 'ulysse',
  'fiat-e-ulysse': 'e-ulysse',
  'fiat-ducato-chassis': 'chassis-cab-pickup',
}

export function getFiatQuoteUrlForProduct(productSlug: string): string | null {
  const modelSlug = PRODUCT_SLUG_TO_MODEL[productSlug]
  return modelSlug ? getFiatQuoteUrl(modelSlug) : null
}

// Direkte deutsche Preislisten-PDFs (aufgelöst über die offiziellen
// Fiat-Professional-Portal-Links `pricelistLink_DE`, die per 302 auf das aktuelle
// PDF weiterleiten). Quelle: cockpit.astara-partner.com / dwsModels.
// Bei einem Modelljahr-Wechsel ggf. neu auflösen.
const FIAT_PRICELIST_PDF_DE: Record<FiatModelSlug, string> = {
  'ulysse':   'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/ulysse/2026/02/Preisliste_FIATPRO_Ulysse_Serie_4_MY26_DE_0226.pdf',
  'e-ulysse': 'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/ulysse/2026/02/Preisliste_FIATPRO_Ulysse_Serie_4_MY26_DE_0226.pdf',
  'doblo':    'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/doblo/2026/04/Preisliste_Doblo_MY26_DE_042026.pdf',
  'e-doblo':  'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/doblo/2026/04/Preisliste_Doblo_MY26_DE_042026.pdf',
  'scudo':    'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/scudo/2026/06/Preisliste_Scudo_MY26_DE_042026_1.pdf',
  'e-scudo':  'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/scudo/2026/06/Preisliste_Scudo_MY26_DE_042026_1.pdf',
  'ducato':   'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/ducato/2026/04/new/Preisliste_Ducato_VAN_MY26_DE_042026_V3.pdf',
  'e-ducato': 'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/ducato/Preisliste_Ducato_BEV_%20MY26_DE.pdf',
  'chassis-cab-pickup': 'https://www.fiat.ch/content/dam/fiat2023/ch/professional/pricelists/ducato/2026/04/new/Preisliste_Ducato_VAN_MY26_DE_042026_V3.pdf',
}

export function getFiatPricelistUrlForProduct(productSlug: string): string | null {
  const modelSlug = PRODUCT_SLUG_TO_MODEL[productSlug]
  return modelSlug ? (FIAT_PRICELIST_PDF_DE[modelSlug] ?? null) : null
}
