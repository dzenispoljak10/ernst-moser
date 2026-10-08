/**
 * Gemeinsame Helfer für Admin-Bereiche, die direkt in Sanity schreiben.
 *
 * Sanity ist die einzige Datenquelle der öffentlichen Website (Team, Marken,
 * Verkäufer, Produkte, Stellen, Pop-ups). Der Admin liest und schreibt deshalb
 * ausschliesslich dort — so erscheint jede Änderung garantiert auf der Website.
 */

/** Center-Slug → Sanity-Dokument-ID */
export const CENTER_IDS: Record<string, string> = {
  nutzfahrzeugcenter: 'center-nutzfahrzeug',
  kommunalcenter: 'center-kommunal',
  motorgeraetecenter: 'center-motorgeraete',
}

export const CENTER_OPTIONS = [
  { value: 'nutzfahrzeugcenter', label: 'Nutzfahrzeugcenter' },
  { value: 'kommunalcenter', label: 'Kommunalcenter' },
  { value: 'motorgeraetecenter', label: 'Motorgerätecenter' },
]

export function centerRef(slug?: string | null) {
  const id = slug ? CENTER_IDS[slug] : undefined
  return id ? { _type: 'reference' as const, _ref: id } : undefined
}

/** Leere Strings → undefined (wird dann per unset entfernt). */
export function clean(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t ? t : undefined
}

/** Sanity-Dokument-IDs dürfen nur a-z, 0-9, '-', '_' und '.' enthalten. */
export function isValidDocId(id: string): boolean {
  return /^[a-zA-Z0-9._-]{1,128}$/.test(id) && !id.startsWith('drafts.')
}
