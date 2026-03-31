import { NextResponse } from 'next/server'

const POSTS = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
]

export const revalidate = 3600

export async function GET() {
  const results = await Promise.all(
    POSTS.map(async (url) => {
      try {
        const res = await fetch(
          `https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`,
          { next: { revalidate: 3600 } }
        )
        if (!res.ok) return { url, thumbnail: null }
        const data = await res.json()
        return { url, thumbnail: (data.thumbnail_url as string) ?? null }
      } catch {
        return { url, thumbnail: null }
      }
    })
  )
  return NextResponse.json(results)
}
