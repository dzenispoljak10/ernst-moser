import { existsSync } from 'fs'
import { join } from 'path'

/**
 * Returns the local image path for a product slug if a main.webp exists,
 * otherwise returns null. Server-only — uses fs.
 */
export function productImageBySlug(slug: string): string | null {
  if (!slug) return null
  const rel = `/images/products/${slug}/main.webp`
  const abs = join(process.cwd(), 'public', rel)
  return existsSync(abs) ? rel : null
}

/**
 * Slugify-Helper kompatibel zu den /images/team/ Dateinamen
 * (z. B. "Daniela Gräf" → "daniela-gr-f", "Michael Peter" → "michael-peter").
 * Umlaute werden zu '-' (kein Sonderzeichen-Mapping) — passt zur bestehenden
 * Datei-Namens-Konvention im Repo.
 */
function slugifyName(first: string, last: string): string {
  return `${first} ${last}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Sucht ein lokales Team-Foto unter /images/team/<slug>.webp passend zum
 * Vor-/Nachnamen einer Person. Falls keine Datei existiert → null, dann
 * fällt der Caller auf das Sanity-Asset zurück.
 *
 * Wird sowohl mit normalem Slugify als auch mit der Repo-spezifischen
 * Variante "ä→-" probiert (siehe daniela-gr-f.webp).
 */
export function teamPhotoByName(firstName?: string, lastName?: string): string | null {
  if (!firstName || !lastName) return null
  const tries = new Set<string>()
  tries.add(slugifyName(firstName, lastName))
  // Variante mit ä/ö/ü → '-' (matched daniela-gr-f, fabian-k-nzi etc.)
  const dashUmlaut = `${firstName} ${lastName}`
    .toLowerCase()
    .replace(/[äöüß]/g, '-')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  tries.add(dashUmlaut)

  for (const slug of tries) {
    const rel = `/images/team/${slug}.webp`
    const abs = join(process.cwd(), 'public', rel)
    if (existsSync(abs)) return rel
  }
  return null
}
