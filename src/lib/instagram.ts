/**
 * Die 6 neuesten Instagram-Posts von @e.moser_gmbh.
 *
 * Quellen (erste mit Treffer gewinnt):
 *  1. BEHOLD_FEED_URL        – behold.so-Feed (kostenlos; hostet die Bilder selbst)
 *  2. INSTAGRAM_ACCESS_TOKEN – Instagram-Graph-API (+ optional INSTAGRAM_USER_ID)
 *  3. Feste Fallback-Liste   – nur Permalinks, Anzeige dann via Instagram-Embed
 *
 * Tokens/URLs gehören in die Env (Vercel bzw. .env.local), NICHT ins Repo.
 */

export type InstagramPost = { permalink: string; image: string | null; alt: string }

const ALT_DEFAULT = 'Instagram Post von @e.moser_gmbh'

// Behold aktualisiert im Gratis-Tarif 1x täglich – 6h Cache reicht und hält uns
// deutlich unter dem monatlichen Abruf-Limit.
const CACHE_SECONDS = 21600

export const FALLBACK_POSTS: InstagramPost[] = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
].map((permalink) => ({ permalink, image: null, alt: ALT_DEFAULT }))

function toAlt(caption?: string) {
  return (caption || ALT_DEFAULT).replace(/\s+/g, ' ').trim().slice(0, 120)
}

type BeholdSize = { mediaUrl?: string }
type BeholdPost = {
  permalink?: string
  mediaUrl?: string
  thumbnailUrl?: string
  mediaType?: string
  prunedCaption?: string
  caption?: string
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize; full?: BeholdSize }
}

// sizes.* liegt auf Beholds CDN (stabil, webp). mediaUrl zeigt auf cdninstagram.com –
// signiert und nach Stunden tot – und ist bei Videos die mp4 selbst, nie ein Bild.
function beholdImage(p: BeholdPost): string | null {
  const fromSizes = p.sizes?.medium?.mediaUrl ?? p.sizes?.large?.mediaUrl ?? p.sizes?.small?.mediaUrl
  if (fromSizes) return fromSizes
  if (p.mediaType === 'VIDEO') return p.thumbnailUrl ?? null
  return p.mediaUrl ?? null
}

async function fromBehold(url: string): Promise<InstagramPost[]> {
  const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } })
  if (!res.ok) return []

  const data = (await res.json()) as { posts?: unknown } | unknown
  const raw = Array.isArray(data) ? data : (data as { posts?: unknown })?.posts
  if (!Array.isArray(raw)) return []

  return (raw as BeholdPost[])
    .filter((p) => p?.permalink)
    .slice(0, 6)
    .map((p) => ({
      permalink: p.permalink as string,
      image: beholdImage(p),
      alt: toAlt(p.prunedCaption || p.caption),
    }))
}

async function fromGraphApi(token: string, userId: string): Promise<InstagramPost[]> {
  const res = await fetch(
    `https://graph.instagram.com/${userId}/media?fields=permalink,media_url,thumbnail_url,caption,media_type&limit=6&access_token=${token}`,
    { next: { revalidate: CACHE_SECONDS } }
  )
  if (!res.ok) return []

  const data = (await res.json()) as {
    data?: Array<{ permalink?: string; media_url?: string; thumbnail_url?: string; caption?: string }>
  }

  return (data.data ?? [])
    .filter((m) => m.permalink)
    .slice(0, 6)
    .map((m) => ({
      permalink: m.permalink as string,
      image: m.thumbnail_url ?? m.media_url ?? null,
      alt: toAlt(m.caption),
    }))
}

export async function getInstagramPosts(): Promise<{ posts: InstagramPost[]; source: string }> {
  const beholdUrl = process.env.BEHOLD_FEED_URL
  if (beholdUrl) {
    try {
      const posts = await fromBehold(beholdUrl)
      if (posts.length) return { posts, source: 'behold' }
    } catch {
      /* nächste Quelle versuchen */
    }
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (token) {
    try {
      const posts = await fromGraphApi(token, process.env.INSTAGRAM_USER_ID || 'me')
      if (posts.length) return { posts, source: 'api' }
    } catch {
      /* nächste Quelle versuchen */
    }
  }

  return { posts: FALLBACK_POSTS, source: 'fallback' }
}
