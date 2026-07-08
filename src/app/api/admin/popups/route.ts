import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client, readClient } from '@/lib/sanity'
import { imageFromAssetId } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

const TARGETS = ['all', 'home', 'nutzfahrzeugcenter', 'kommunalcenter', 'motorgeraetecenter']

function num(v: unknown, fallback: number): number {
  return typeof v === 'number' && !Number.isNaN(v) ? v : fallback
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const popups = await readClient.fetch(
      `*[_type == "popup"] | order(order asc, _createdAt desc) {
        _id, title, heading, target, delaySeconds, autoCloseSeconds, reappearDays, isActive, order
      }`
    )
    return NextResponse.json(popups)
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const b = await req.json()
    if (!b.title?.trim()) return NextResponse.json({ error: 'Interner Name fehlt' }, { status: 400 })
    const doc = await client.create({
      _type: 'popup',
      title: b.title.trim(),
      heading: b.heading?.trim() || undefined,
      body: b.body?.trim() || undefined,
      image: imageFromAssetId(b.imageAssetId),
      ctaLabel: b.ctaLabel?.trim() || undefined,
      ctaUrl: b.ctaUrl?.trim() || undefined,
      target: TARGETS.includes(b.target) ? b.target : 'all',
      delaySeconds: num(b.delaySeconds, 3),
      autoCloseSeconds: num(b.autoCloseSeconds, 0),
      reappearDays: num(b.reappearDays, 30),
      isActive: !!b.isActive,
      order: num(b.order, 0),
    })
    revalidatePath('/api/popups')
    return NextResponse.json({ id: doc._id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
