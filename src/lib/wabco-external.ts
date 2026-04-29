/**
 * Wabco / ZF Aftermarket — Brand-Homepage als externer Link.
 *
 * Die in Sanity gepflegten Wabco-Einträge sind Themen-/Kategorie-Seiten ohne
 * direkte Hersteller-Modell-URL — daher mappen wir alle auf die offizielle
 * Wabco-Customer-Centre-Seite (heute Teil von ZF).
 */

const WABCO_HOMEPAGE = 'https://www.wabco-customercentre.com/'
const WABCO_CONTACT_EMAIL = 'adrian.moser@ernst-moser.ch'

export function getWabcoExternalUrl(productSlug: string): string | null {
  return productSlug.startsWith('wabco-') ? WABCO_HOMEPAGE : null
}

export function getWabcoAnfrageMailto(
  productSlug: string,
  productName: string,
): string | null {
  if (!productSlug.startsWith('wabco-')) return null
  const trimmed = productName.startsWith('Wabco')
    ? productName
    : `Wabco ${productName}`
  const subject = `Anfrage ${trimmed}`
  return `mailto:${WABCO_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
