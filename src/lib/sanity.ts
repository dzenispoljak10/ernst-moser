import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { existsSync } from 'fs'
import { join } from 'path'
import localImages from './localImages.json'
import localExternalImages from './localExternalImages.json'

// Read-only client — no token needed, uses CDN for public dataset reads
export const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'owqsc1ph',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Write client — requires SANITY_TOKEN, used only in admin API routes
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'owqsc1ph',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Returns the local image path for a product slug if a main.webp exists,
 * otherwise returns null. Checked before Sanity ref lookup.
 */
export function productImageBySlug(slug: string): string | null {
  const rel = `/images/products/${slug}/main.webp`
  const abs = join(process.cwd(), 'public', rel)
  return existsSync(abs) ? rel : null
}

/**
 * Returns a local image path if available, otherwise falls back to the Sanity CDN URL.
 * Use this instead of urlFor(source).url() for simple (untransformed) image URLs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function imageUrl(source: any): string {
  if (!source) return ''
  // Handle plain string URLs (hardcoded external URLs)
  if (typeof source === 'string') {
    return (localExternalImages as Record<string, string>)[source] ?? source
  }
  // Handle Sanity image objects
  const ref: string | undefined = source?.asset?._ref ?? source?.asset?._id
  if (ref) {
    const local = (localImages as Record<string, string>)[ref]
    if (local) return local
  }
  try {
    return urlFor(source).url()
  } catch {
    return ''
  }
}
