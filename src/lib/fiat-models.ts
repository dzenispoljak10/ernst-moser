export const FIAT_MODEL_IDS = {
  'scudo': 'Scudo',
  'e-scudo': 'E-Scudo',
  'doblo': 'Doblò',
  'e-doblo': 'E-Doblò',
  'ducato': 'Ducato',
  'e-ducato': 'E-Ducato',
  'ulysse': 'Ulysse',
  'e-ulysse': 'E-Ulysse',
  'chassis-cab-pickup': 'Chassis Cab & Pickup',
} as const

export type FiatModelSlug = keyof typeof FIAT_MODEL_IDS

export const getFiatQuoteUrl = (slug: FiatModelSlug): string | null => {
  const mId = FIAT_MODEL_IDS[slug]
  if (!mId) return null
  return `https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=${encodeURIComponent(mId)}`
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
