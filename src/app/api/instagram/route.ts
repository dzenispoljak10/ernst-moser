import { NextResponse } from 'next/server'

/**
 * Liefert die Permalinks der anzuzeigenden Instagram-Posts (max. 6).
 *
 * - Wenn `INSTAGRAM_ACCESS_TOKEN` gesetzt ist, werden die **6 neuesten** Posts
 *   von @e.moser_gmbh live über die Instagram-Graph-API geholt.
 *   (Optional `INSTAGRAM_USER_ID`, sonst `me`.)
 * - Ohne Token wird auf die unten gepflegte feste Liste zurückgefallen.
 *
 * Token NIE ins Repo committen – nur in `.env.local` / Vercel-Env hinterlegen.
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

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID || 'me'

  if (token) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=permalink,media_type,timestamp&limit=6&access_token=${token}`,
        { next: { revalidate: 1800 } }
      )
      if (res.ok) {
        const data = (await res.json()) as { data?: Array<{ permalink?: string }> }
        const posts = (data.data ?? [])
          .map((m) => m.permalink)
          .filter((p): p is string => Boolean(p))
          .slice(0, 6)
        if (posts.length) return NextResponse.json({ posts, source: 'api' })
      }
    } catch {
      // fällt unten auf die feste Liste zurück
    }
  }

  return NextResponse.json({ posts: FALLBACK_POSTS, source: 'fallback' })
}
