import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const brands = await client.fetch(
      `*[_type == "brand" && !(_id in path("drafts.**"))] | order(name asc) {
        _id, name, "slug": slug.current, "centerSlug": center->slug.current
      }`
    )
    return NextResponse.json(brands)
  } catch {
    return NextResponse.json({ error: 'Marken konnten nicht geladen werden.' }, { status: 500 })
  }
}
