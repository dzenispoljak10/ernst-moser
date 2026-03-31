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
