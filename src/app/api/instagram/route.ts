import { NextResponse } from 'next/server'

/**
 * Liefert die Permalinks der anzuzeigenden Instagram-Posts (max. 6).
 *
 * Reihenfolge der Quellen (erste mit Treffer gewinnt):
 *  1. BEHOLD_FEED_URL   – Feed-URL von behold.so (No-Code, empfohlen, kostenlos).
 *                         Liefert automatisch die neuesten Posts von @e.moser_gmbh.
 *  2. INSTAGRAM_ACCESS_TOKEN (+ optional INSTAGRAM_USER_ID) – Instagram-Graph-API.
 *  3. Feste Fallback-Liste (unten), falls nichts gesetzt ist.
 *
 * Tokens/URLs gehören in die Env (Vercel / .env.local), NICHT ins Repo.
 */
const FALLBACK_POSTS = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
]

export const revalidate = 1800 // alle 30 Min. neu prüfen

function pickPermalinks(items: unknown): string[] {
  if (!Array.isArray(items)) return []
  return items
    .map((it) => (it && typeof it === 'object' ? (it as Record<string, unknown>).permalink : undefined))
    .filter((p): p is string => typeof p === 'string' && p.includes('instagram.com'))
    .slice(0, 6)
}

export async function GET() {
  // 1) Behold.so Feed
  const beholdUrl = process.env.BEHOLD_FEED_URL
  if (beholdUrl) {
    try {
      const res = await fetch(beholdUrl, { next: { revalidate: 1800 } })
      if (res.ok) {
        const data = (await res.json()) as unknown
        const arr = Array.isArray(data)
          ? data
          : (data as { posts?: unknown[]; data?: unknown[] }).posts ?? (data as { data?: unknown[] }).data
        const posts = pickPermalinks(arr)
        if (posts.length) return NextResponse.json({ posts, source: 'behold' })
      }
    } catch {
      // weiter zu Graph-API / Fallback
    }
  }

  // 2) Instagram-Graph-API
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID || 'me'
  if (token) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=permalink,media_type,timestamp&limit=6&access_token=${token}`,
        { next: { revalidate: 1800 } }
      )
      if (res.ok) {
        const data = (await res.json()) as { data?: unknown[] }
        const posts = pickPermalinks(data.data)
        if (posts.length) return NextResponse.json({ posts, source: 'api' })
      }
    } catch {
      // weiter zum Fallback
    }
  }

  // 3) Fallback
  return NextResponse.json({ posts: FALLBACK_POSTS, source: 'fallback' })
}
