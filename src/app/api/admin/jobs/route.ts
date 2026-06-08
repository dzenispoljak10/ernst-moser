import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const jobs = await client.fetch(
      `*[_type == "jobPosting"] | order(kind asc, order asc, _createdAt asc) {
        _id, title, kind, center, centerColor, type, pensum, location, duration, description, pdfUrl, order, isActive
      }`
    )
    return NextResponse.json(jobs)
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const b = await req.json()
    if (!b.title) return NextResponse.json({ error: 'Titel fehlt' }, { status: 400 })
    const doc = await client.create({
      _type: 'jobPosting',
      title: b.title,
      kind: b.kind === 'lehrstelle' ? 'lehrstelle' : 'stelle',
      center: b.center || null,
      centerColor: b.centerColor || null,
      type: b.type || null,
      pensum: b.pensum || null,
      location: b.location || null,
      duration: b.duration || null,
      description: b.description || null,
      pdfUrl: b.pdfUrl || null,
      order: typeof b.order === 'number' ? b.order : 0,
      isActive: b.isActive ?? false,
    })
    revalidatePath('/karriere')
    return NextResponse.json(doc, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
