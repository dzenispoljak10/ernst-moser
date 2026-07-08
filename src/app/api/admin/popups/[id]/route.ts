import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client, readClient, imageUrl } from '@/lib/sanity'
import { imageFromAssetId } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

const TARGETS = ['all', 'home', 'nutzfahrzeugcenter', 'kommunalcenter', 'motorgeraetecenter']

function num(v: unknown, fallback: number): number {
  return typeof v === 'number' && !Number.isNaN(v) ? v : fallback
}

interface PopupDoc {
  _id: string
  title: string
  heading?: string
  body?: string
  image?: { asset: { _ref: string } }
  ctaLabel?: string
  ctaUrl?: string
  target?: string
  delaySeconds?: number
  autoCloseSeconds?: number
  reappearDays?: number
  isActive?: boolean
  order?: number
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const p = await readClient.fetch<PopupDoc | null>(
      `*[_type == "popup" && _id == $id][0]{
        _id, title, heading, body, image, ctaLabel, ctaUrl, target, delaySeconds, autoCloseSeconds, reappearDays, isActive, order
      }`,
      { id }
    )
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({
      id: p._id,
      title: p.title,
      heading: p.heading ?? '',
      body: p.body ?? '',
      imageUrl: p.image ? imageUrl(p.image) : '',
      ctaLabel: p.ctaLabel ?? '',
      ctaUrl: p.ctaUrl ?? '',
      target: p.target ?? 'all',
      delaySeconds: typeof p.delaySeconds === 'number' ? p.delaySeconds : 3,
      autoCloseSeconds: typeof p.autoCloseSeconds === 'number' ? p.autoCloseSeconds : 0,
      reappearDays: typeof p.reappearDays === 'number' ? p.reappearDays : 30,
      isActive: p.isActive ?? false,
      order: p.order ?? 0,
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const b = await req.json()
    if (!b.title?.trim()) return NextResponse.json({ error: 'Interner Name fehlt' }, { status: 400 })
    const set: Record<string, unknown> = {
      title: b.title.trim(),
      heading: b.heading?.trim() || undefined,
      body: b.body?.trim() || undefined,
      ctaLabel: b.ctaLabel?.trim() || undefined,
      ctaUrl: b.ctaUrl?.trim() || undefined,
      target: TARGETS.includes(b.target) ? b.target : 'all',
      delaySeconds: num(b.delaySeconds, 3),
      autoCloseSeconds: num(b.autoCloseSeconds, 0),
      reappearDays: num(b.reappearDays, 30),
      isActive: !!b.isActive,
      order: num(b.order, 0),
    }
    // Bild nur ersetzen, wenn ein neues hochgeladen wurde.
    const newImage = imageFromAssetId(b.imageAssetId)
    if (newImage) set.image = newImage

    await client.patch(id).set(set).commit()
    revalidatePath('/api/popups')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const b = await req.json()
    const patch: Record<string, unknown> = {}
    if ('isActive' in b) patch.isActive = !!b.isActive
    if ('order' in b) patch.order = num(b.order, 0)
    await client.patch(id).set(patch).commit()
    revalidatePath('/api/popups')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    await client.delete(id)
    revalidatePath('/api/popups')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
