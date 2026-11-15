export interface TextOverrideData {
  /** Gilt auf allen Seiten: Originaltext -> neuer Text */
  global: Record<string, string>
  /** Gilt nur auf einer Seite: Pfad -> (Originaltext -> neuer Text) */
  pages: Record<string, Record<string, string>>
}

export interface TextOverrideDoc {
  _id: string
  page: string // Pfad, z.B. "/kommunalcenter" oder "*" für alle Seiten
  original: string
  text: string
}

export const GLOBAL_PAGE = '*'

export function emptyData(): TextOverrideData {
  return { global: {}, pages: {} }
}

export function docsToData(docs: TextOverrideDoc[]): TextOverrideData {
  const data = emptyData()
  for (const d of docs) {
    if (typeof d?.original !== 'string' || typeof d?.text !== 'string' || !d.text.trim()) continue
    if (d.page === GLOBAL_PAGE) data.global[d.original] = d.text
    else if (typeof d.page === 'string') (data.pages[d.page] ??= {})[d.original] = d.text
  }
  return data
}

/** Pfad vereinheitlichen: ohne Query/Hash, ohne abschliessenden Slash. */
export function normalizePath(p: string): string {
  let path = (p || '/').split(/[?#]/)[0]
  try { path = decodeURI(path) } catch { /* ignore */ }
  if (path.length > 1) path = path.replace(/\/+$/, '')
  return path || '/'
}
