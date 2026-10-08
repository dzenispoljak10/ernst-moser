/**
 * Client-seitiger Fetch-Helfer für den Admin: wirft bei Fehlern eine
 * verständliche deutsche Meldung statt rohem JSON.
 */
export async function adminFetch<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, init)
  } catch {
    throw new Error('Keine Verbindung zum Server. Bitte Internetverbindung prüfen und erneut versuchen.')
  }
  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    // keine JSON-Antwort
  }
  if (res.status === 401) {
    throw new Error('Ihre Sitzung ist abgelaufen. Bitte neu anmelden.')
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error
    throw new Error(msg || `Speichern fehlgeschlagen (Fehler ${res.status}).`)
  }
  return data as T
}

const MAX_UPLOAD_BYTES = 3.5 * 1024 * 1024 // Vercel-Limit liegt bei 4.5 MB pro Anfrage
const MAX_DIMENSION = 2400

/**
 * Verkleinert grosse Fotos (z. B. direkt vom Handy) im Browser, damit der
 * Upload nie am Server-Limit scheitert. Kleine Dateien bleiben unverändert.
 */
async function shrinkIfNeeded(file: File): Promise<File> {
  if (file.size <= 1.5 * 1024 * 1024 || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    return file // Format kann der Browser nicht dekodieren (z. B. HEIC) → Original versuchen
  }
  const baseName = file.name.replace(/\.[^.]+$/, '')
  // Safari kann kein WebP aus dem Canvas erzeugen (liefert dann PNG) → JPEG verwenden.
  const encode = async (canvas: HTMLCanvasElement, quality: number): Promise<File | null> => {
    const webp = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/webp', quality))
    if (webp && webp.type === 'image/webp') return new File([webp], `${baseName}.webp`, { type: 'image/webp' })
    const jpeg = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', quality))
    return jpeg ? new File([jpeg], `${baseName}.jpg`, { type: 'image/jpeg' }) : null
  }
  try {
    // Stufenweise kleiner werden, bis das Bild sicher unter dem Limit liegt.
    for (const maxDim of [MAX_DIMENSION, 1800, 1200]) {
      const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(bitmap.width * scale)
      canvas.height = Math.round(bitmap.height * scale)
      const ctx = canvas.getContext('2d')
      if (!ctx) return file
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
      for (const quality of [0.88, 0.78]) {
        const out = await encode(canvas, quality)
        if (out && out.size <= MAX_UPLOAD_BYTES) return out
      }
    }
  } finally {
    bitmap.close()
  }
  return file
}

/** Lädt ein Bild hoch und liefert Vorschau-URL + Sanity-Asset-ID. */
export async function uploadImage(original: File): Promise<{ url: string; assetId: string }> {
  if (!original.type.startsWith('image/')) {
    throw new Error('Bitte eine Bilddatei (JPG, PNG, WebP) auswählen.')
  }
  const file = await shrinkIfNeeded(original)
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Das Bild ist zu gross. Bitte ein kleineres Bild (JPG/PNG unter 3 MB) verwenden.')
  }
  const fd = new FormData()
  fd.append('file', file)
  const data = await adminFetch<{ url?: string; assetId?: string }>('/api/admin/upload', {
    method: 'POST',
    body: fd,
  })
  if (!data.url || !data.assetId) throw new Error('Bild-Upload fehlgeschlagen.')
  return { url: data.url, assetId: data.assetId }
}

/** Lädt ein PDF (z. B. Stellenbeschrieb) hoch und liefert dessen öffentliche URL. */
export async function uploadPdf(file: File): Promise<string> {
  if (file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) {
    throw new Error('Bitte eine PDF-Datei auswählen.')
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Das PDF ist zu gross (max. 3.5 MB).')
  }
  const fd = new FormData()
  fd.append('file', file)
  const data = await adminFetch<{ url?: string }>('/api/admin/upload', { method: 'POST', body: fd })
  if (!data.url) throw new Error('PDF-Upload fehlgeschlagen.')
  return data.url
}
