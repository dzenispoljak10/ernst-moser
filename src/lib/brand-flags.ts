/**
 * Marken-Feature-Flags.
 *
 * WABCO ist aktuell „on standby" und wird deshalb aus Megamenü, Center-Seiten
 * und Marken-Auflistungen ausgeblendet. Die Marke bleibt in Sanity und im Code
 * vollständig erhalten — zum Reaktivieren einfach den Slug aus `DISABLED_BRANDS`
 * entfernen (eine Zeile), dann taucht WABCO überall wieder auf.
 */
export const DISABLED_BRANDS = new Set<string>([
  'wabco', // WABCO on standby — Slug hier entfernen, um wieder zu aktivieren
])

/** True, wenn die Marke aktuell ausgeblendet (deaktiviert) ist. */
export function isBrandDisabled(slug: string): boolean {
  return DISABLED_BRANDS.has(slug.toLowerCase())
}

/** Entfernt deaktivierte Marken aus einer Marken-Liste. */
export function filterDisabledBrands<T extends { slug: { current: string } }>(
  brands: T[],
): T[] {
  if (DISABLED_BRANDS.size === 0) return brands
  return brands.filter((b) => !isBrandDisabled(b.slug.current))
}
