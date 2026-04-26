/**
 * Hako product slug → offizielle Herstellerseite.
 *
 * Citymaster 1600 und Hakomatic B 450 sind ältere Bezeichnungen — auf
 * hako.com werden sie durch die aktuellen Nachfolge-Modelle (Citymaster
 * 1650 / Scrubmaster B45) repräsentiert. Für den Hakotrac 1700D existiert
 * keine eigene Detailseite mehr; der Link zeigt auf die Multifunktions-
 * Kommunalfahrzeug-Übersicht.
 */

const HAKO_EXTERNAL_URLS: Record<string, string> = {
  'hako-citymaster-1600':
    'https://www.hako.com/en/products/municipal-technology/multifunctional-outdoor-cleaning-machines/citymaster-1650',
  'hako-hakomatic-b-450':
    'https://www.hako.com/en/products/cleaning-technology/scrubber-driers/walk-behind-scrubber-driers/scrubmaster-b45',
  'hako-sweepmaster-650':
    'https://www.hako.com/en/products/cleaning-technology/sweepers-and-vacuum-sweepers/walk-behind-vacuum-sweepers/sweepmaster-650',
  'hako-hakotrac-1700d':
    'https://www.hako.com/en/products/municipal-technology/multifunctional-outdoor-cleaning-machines/overview',
}

const HAKO_CONTACT_EMAIL = 'michael.peter@ernst-moser.ch'

export function getHakoExternalUrl(productSlug: string): string | null {
  return HAKO_EXTERNAL_URLS[productSlug] ?? null
}

export function getHakoAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!HAKO_EXTERNAL_URLS[productSlug]) return null
  const trimmed = productName.startsWith('Hako')
    ? productName
    : `Hako ${productName}`
  const subject = `Anfrage ${trimmed}`
  return `mailto:${HAKO_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
