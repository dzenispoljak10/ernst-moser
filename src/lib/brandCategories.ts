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
  sortimo: 'zubehoer',     // Fahrzeugeinrichtung (externer Link, www.sortimo.ch)

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
 * Feste Marken-Reihenfolge (Slug-Liste). Marken in dieser Liste werden in genau
 * dieser Reihenfolge zuerst gezeigt; alle übrigen folgen alphabetisch danach.
 * Gilt überall, wo Marken gruppiert/aufgelistet werden (Megamenü, Center-Seite).
 */
export const BRAND_ORDER: string[] = ['scania', 'fiat', 'isuzu', 'piaggio']

/**
 * Externe „Zubehör"-Einträge pro Center, die zusätzlich zu den Sanity-Marken im
 * Zubehör-Bereich erscheinen. Sie verlinken direkt nach aussen (kein interner
 * Marken-Unterseite), z. B. Sortimo → www.sortimo.ch.
 */
export interface ExternalBrandLink {
  slug: string
  name: string
  externalUrl: string
  /** Optionales Logo (öffentlicher Pfad), z. B. '/images/brands/sortimo/logo.svg'. */
  logo?: string
}
export const EXTERNAL_ZUBEHOER_BY_CENTER: Record<string, ExternalBrandLink[]> = {
  nutzfahrzeugcenter: [
    {
      slug: 'sortimo',
      name: 'Sortimo',
      externalUrl: 'https://www.sortimo.ch',
      logo: '/images/brands/sortimo/logo.svg',
    },
  ],
}

/** Liefert die externen Zubehör-Links eines Centers (leer, wenn keine). */
export function externalZubehoerForCenter(centerSlug: string): ExternalBrandLink[] {
  return EXTERNAL_ZUBEHOER_BY_CENTER[centerSlug] ?? []
}

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
 * Sortiert nach fester BRAND_ORDER (zuerst), Rest alphabetisch. Marken ohne
 * Eintrag in BRAND_ORDER behalten untereinander die alphabetische Ordnung.
 */
const byOrderThenName = <T extends BrandLike>(a: T, b: T) => {
  const ai = BRAND_ORDER.indexOf(a.slug.current)
  const bi = BRAND_ORDER.indexOf(b.slug.current)
  const ar = ai === -1 ? Number.MAX_SAFE_INTEGER : ai
  const br = bi === -1 ? Number.MAX_SAFE_INTEGER : bi
  if (ar !== br) return ar - br
  return byName(a, b)
}

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
    return [{ label: 'Marken', brands: [...brands].sort(byOrderThenName) }]
  }
  const fahrzeuge: T[] = []
  const zubehoer: T[] = []
  for (const b of brands) {
    if (BRAND_CATEGORY[b.slug.current] === 'zubehoer') zubehoer.push(b)
    else fahrzeuge.push(b)
  }
  const groups: BrandGroup<T>[] = []
  if (fahrzeuge.length) groups.push({ label: 'Fahrzeuge', brands: fahrzeuge.sort(byOrderThenName) })
  if (zubehoer.length) groups.push({ label: 'Zubehör', brands: zubehoer.sort(byOrderThenName) })
  return groups
}
