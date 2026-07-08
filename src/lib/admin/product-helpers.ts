/**
 * Helfer für die Produkt-Verwaltung im Admin (Sanity `product`).
 * Wird von den API-Routen geteilt, damit Erstellen und Bearbeiten identisch arbeiten.
 */

export interface PortableBlock {
  _type: 'block'
  _key?: string
  style?: string
  children?: Array<{ _type: 'span'; _key?: string; text: string; marks?: string[] }>
  markDefs?: unknown[]
}

/** Erzeugt einen URL-tauglichen Slug aus einem Namen. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96)
}

/** Plain-Text (Absätze durch Leerzeilen) → Portable-Text-Blöcke. */
export function textToBlocks(text?: string): PortableBlock[] | undefined {
  if (!text || !text.trim()) return undefined
  return text
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para, i) => ({
      _type: 'block' as const,
      _key: `b${i}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span' as const, _key: `s${i}`, text: para, marks: [] }],
    }))
}

/** Portable-Text-Blöcke → Plain-Text (für die Bearbeitungs-Maske). */
export function blocksToText(blocks?: PortableBlock[]): string {
  if (!blocks?.length) return ''
  return blocks
    .map((b) => (b._type === 'block' && b.children ? b.children.map((c) => c.text).join('') : ''))
    .join('\n\n')
    .trim()
}

/** Baut aus einer Asset-ID (vom Upload-Endpoint) ein Sanity-Bildobjekt. */
export function imageFromAssetId(assetId?: string | null) {
  if (!assetId) return undefined
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: assetId } }
}
