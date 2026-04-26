/**
 * Brand → Ansprechpartner mapping (Nutzfahrzeugcenter).
 *
 * Source of truth: Sanity (`salesperson` Dokumente, referenziert über
 * `brand.salesperson`). Die Rendering-Komponente (BrandSalespersonSection)
 * liest weiterhin Sanity — diese Datei ist die versionierte Sollvorgabe
 * und wird über `scripts/sync-brand-contacts.mjs` nach Sanity synchronisiert,
 * nicht im Frontend überschrieben.
 */

export type BrandContactKey = 'roland' | 'michael'

export const BRAND_CONTACTS: Record<string, BrandContactKey> = {
  // Roland Burkhalter – Betriebsleiter Nutzfahrzeuge
  'scania': 'roland',
  'dhollandia': 'roland',
  'ut': 'roland',
  'wabco': 'roland',

  // Michael Peter – Verkauf / Aussendienst
  'fiat': 'michael',
  'piaggio': 'michael',
  'isuzu': 'michael',
  'hilltip': 'michael',
}

export const CONTACT_SANITY_IDS: Record<BrandContactKey, string> = {
  roland: 'salesperson-roland-burkhalter',
  michael: 'salesperson-michael-peter',
}

export function getBrandContactKey(brandSlug: string): BrandContactKey | null {
  return BRAND_CONTACTS[brandSlug.toLowerCase()] ?? null
}

export function getBrandContactSanityId(brandSlug: string): string | null {
  const key = getBrandContactKey(brandSlug)
  return key ? CONTACT_SANITY_IDS[key] : null
}
