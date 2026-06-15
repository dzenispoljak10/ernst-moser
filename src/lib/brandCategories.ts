import type { SanityBrand } from './queries'

/**
 * Manuelle Zuordnung Marke → Kategorie für die Megamenü-Aufteilung in
 * „Fahrzeuge" und „Zubehör". Schlüssel = Brand-Slug.
 * Marken ohne Eintrag landen standardmässig unter „Fahrzeuge".
 */
export const BRAND_CATEGORY: Record<string, 'fahrzeuge' | 'zubehoer'> = {
  // ── Nutzfahrzeugcenter ──────────────────────────────────────────
  scania: 'fahrzeuge',
  isuzu: 'fahrzeuge',
  fiat: 'fahrzeuge',
  piaggio: 'fahrzeuge',
  ut: 'zubehoer',          // Aufbauten & Mulden
  wabco: 'zubehoer',       // Bremssysteme / Teile
  dhollandia: 'zubehoer',  // Hubladebühnen
  hilltip: 'zubehoer',     // Streu- & Winterdienstgeräte

  // ── Kommunalcenter ──────────────────────────────────────────────
  alk: 'fahrzeuge',                 // Alkè – E-Nutzfahrzeuge
  baoli: 'fahrzeuge',               // Gabelstapler
  kubota: 'fahrzeuge',              // Traktoren / Utility
  'ligier-professional': 'fahrzeuge',
  reform: 'fahrzeuge',              // Transporter / Geräteträger
  stema: 'zubehoer',                // Anhänger
  timan: 'fahrzeuge',               // Geräteträger
  springer: 'zubehoer',             // Anbaugeräte / Geräteträger
  ecotech: 'zubehoer',
  envitec: 'zubehoer',
  greentec: 'zubehoer',             // Mulch- & Heckenmähgeräte
  matev: 'zubehoer',                // Anbaugeräte
  mulchy: 'zubehoer',               // Mulchgeräte
  zaugg: 'zubehoer',                // Schneefräsen / Anbaugeräte
  nilfisk: 'zubehoer',              // Reinigungsgeräte (zusätzlich in Kommunal gelistet)
}

/** Center, deren Marken in „Fahrzeuge" / „Zubehör" aufgeteilt werden. */
export const SPLIT_CENTERS = new Set(['nutzfahrzeugcenter', 'kommunalcenter'])

/**
 * Marken, die im Megamenü eines Centers ZUSÄTZLICH gelistet werden, obwohl
 * ihre eigentliche Marken-Seite in einem anderen Center liegt. Schlüssel =
 * Center-Slug, Werte = Brand-Slugs. Die Verlinkung zeigt weiterhin auf die
 * Original-Seite der Marke (deren Heim-Center).
 */
export const EXTRA_BRANDS_BY_CENTER: Record<string, string[]> = {
  kommunalcenter: ['nilfisk'],
}

/** Hängt die für ein Center quergelisteten Fremd-Marken an die Markenliste an. */
export function withExtraBrands(
  centerSlug: string,
  brands: SanityBrand[],
  allBrands: SanityBrand[],
): SanityBrand[] {
  const extraSlugs = EXTRA_BRANDS_BY_CENTER[centerSlug]
  if (!extraSlugs || extraSlugs.length === 0) return brands
  const present = new Set(brands.map((b) => b.slug.current))
  const extras = extraSlugs
    .filter((s) => !present.has(s))
    .map((s) => allBrands.find((b) => b.slug.current === s))
    .filter((b): b is SanityBrand => Boolean(b))
  return [...brands, ...extras]
}

/** Minimal-Form einer Marke, die zum Gruppieren/Sortieren genügt. */
type BrandLike = { slug: { current: string }; name: string }

export interface BrandGroup<T = SanityBrand> {
  label: string
  brands: T[]
}

const byName = <T extends BrandLike>(a: T, b: T) =>
  a.name.localeCompare(b.name, 'de', { sensitivity: 'base' })

/**
 * Gruppiert + sortiert die Marken eines Centers (Megamenü UND Center-Seite).
 * Split-Center → [Fahrzeuge, Zubehör], sonst eine einzelne „Marken"-Liste.
 * Jede Liste alphabetisch. Generisch über den konkreten Marken-Typ.
 */
export function groupBrandsForCenter<T extends BrandLike>(
  centerSlug: string,
  brands: T[],
): BrandGroup<T>[] {
  if (!SPLIT_CENTERS.has(centerSlug)) {
    return [{ label: 'Marken', brands: [...brands].sort(byName) }]
  }
  const fahrzeuge: T[] = []
  const zubehoer: T[] = []
  for (const b of brands) {
    if (BRAND_CATEGORY[b.slug.current] === 'zubehoer') zubehoer.push(b)
    else fahrzeuge.push(b)
  }
  const groups: BrandGroup<T>[] = []
  if (fahrzeuge.length) groups.push({ label: 'Fahrzeuge', brands: fahrzeuge.sort(byName) })
  if (zubehoer.length) groups.push({ label: 'Zubehör', brands: zubehoer.sort(byName) })
  return groups
}
