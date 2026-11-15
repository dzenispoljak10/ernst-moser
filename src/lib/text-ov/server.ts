import 'server-only'
import { readClient } from '@/lib/sanity'
import { docsToData, type TextOverrideData, type TextOverrideDoc } from './types'

/**
 * Lädt alle Text-Änderungen aus Sanity (mit Wiederholungsversuchen).
 * Schlägt das endgültig fehl, wird ein Fehler geworfen — wie beim Logo, das der
 * Layout ebenfalls aus Sanity lädt. Next.js liefert dann weiter die letzte
 * gültige Version der Seite aus, statt geänderte Texte unbemerkt zu verlieren.
 */
let buildCache: Promise<TextOverrideData> | null = null

export function getTextOverrides(): Promise<TextOverrideData> {
  // Beim Build werden hunderte Seiten vorgerendert -> nur einmal laden.
  // Zur Laufzeit immer frisch laden, damit Änderungen sofort sichtbar sind.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return (buildCache ??= load())
  }
  return load()
}

async function load(): Promise<TextOverrideData> {
  let lastErr: unknown
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const docs = await readClient.fetch<TextOverrideDoc[]>(
        `*[_type == "textOverride" && !(_id in path("drafts.**"))]{_id, page, original, text}`
      )
      return docsToData(Array.isArray(docs) ? docs : [])
    } catch (e) {
      lastErr = e
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }
  console.error('[text-ov] Laden fehlgeschlagen:', lastErr)
  throw lastErr instanceof Error ? lastErr : new Error('Text-Änderungen konnten nicht geladen werden')
}
