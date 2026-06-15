import { NextResponse } from 'next/server'

/**
 * Liefert die 6 anzuzeigenden Instagram-Posts (Permalink + optimiertes Bild).
 *
 * Quellen (erste mit Treffer gewinnt):
 *  1. BEHOLD_FEED_URL          – behold.so-Feed (empfohlen, kostenlos, Bilder inkl.)
 *  2. INSTAGRAM_ACCESS_TOKEN   – Instagram-Graph-API (+ optional INSTAGRAM_USER_ID)
 *  3. Feste Fallback-Liste     – nur Permalinks (Anzeige dann via IG-Embed)
 *
 * URLs/Tokens gehören in die Env (Vercel / .env.local), NICHT ins Repo.
 */
export const revalidate = 1800 // alle 30 Min. aktualisieren

type Post = { permalink: string; image: string | null; alt: string }

const FALLBACK_POSTS: Post[] = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
].map((permalink) => ({ permalink, image: null, alt: 'Instagram Post von @e.moser_gmbh' }))

type BeholdSize = { mediaUrl?: string }
type BeholdPost = {
  permalink?: string
  mediaUrl?: string
  prunedCaption?: string
  caption?: string
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize; full?: BeholdSize }
}

function fromBehold(posts: unknown): Post[] {
  if (!Array.isArray(posts)) return []
  const out: Post[] = []
  for (const p of posts as BeholdPost[]) {
    if (!p?.permalink) continue
    const image =
      p.sizes?.medium?.mediaUrl ?? p.sizes?.large?.mediaUrl ?? p.sizes?.small?.mediaUrl ?? p.mediaUrl ?? null
    const alt = (p.prunedCaption || p.caption || 'Instagram Post von @e.moser_gmbh').replace(/\s+/g, ' ').trim().slice(0, 120)
    out.push({ permalink: p.permalink, image, alt })
    if (out.length >= 6) break
  }
  return out
}

export async function GET() {
  // 1) Behold.so
  const beholdUrl = process.env.BEHOLD_FEED_URL
  if (beholdUrl) {
    try {
      const res = await fetch(beholdUrl, { next: { revalidate: 1800 } })
      if (res.ok) {
        const data = (await res.json()) as { posts?: unknown[] } | unknown[]
        const arr = Array.isArray(data) ? data : data.posts
        const posts = fromBehold(arr)
        if (posts.length) return NextResponse.json({ posts, source: 'behold' })
      }
    } catch {
      /* weiter */
    }
  }

  // 2) Instagram-Graph-API
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID || 'me'
  if (token) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=permalink,media_url,thumbnail_url,caption,media_type&limit=6&access_token=${token}`,
        { next: { revalidate: 1800 } }
      )
      if (res.ok) {
        const data = (await res.json()) as {
          data?: Array<{ permalink?: string; media_url?: string; thumbnail_url?: string; caption?: string }>
        }
        const posts: Post[] = (data.data ?? [])
          .filter((m) => m.permalink)
          .slice(0, 6)
          .map((m) => ({
            permalink: m.permalink as string,
            image: m.thumbnail_url ?? m.media_url ?? null,
            alt: (m.caption || 'Instagram Post von @e.moser_gmbh').replace(/\s+/g, ' ').trim().slice(0, 120),
          }))
        if (posts.length) return NextResponse.json({ posts, source: 'api' })
      }
    } catch {
      /* weiter */
    }
  }

  // 3) Fallback
  return NextResponse.json({ posts: FALLBACK_POSTS, source: 'fallback' })
}
