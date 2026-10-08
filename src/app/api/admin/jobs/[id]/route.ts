import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

const FIELDS = ['title', 'kind', 'center', 'centerColor', 'type', 'pensum', 'location', 'duration', 'description', 'pdfUrl', 'order', 'isActive'] as const

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const b = await req.json()
    if ('title' in b && !String(b.title ?? '').trim()) {
      return NextResponse.json({ error: 'Titel fehlt.' }, { status: 400 })
    }
    const set: Record<string, unknown> = {}
    const unset: string[] = []
    for (const f of FIELDS) {
      if (!(f in b)) continue
      const v = typeof b[f] === 'string' ? b[f].trim() : b[f]
      if (v === '' || v === null || v === undefined) unset.push(f)
      else set[f] = f === 'kind' ? (v === 'lehrstelle' ? 'lehrstelle' : 'stelle') : v
    }
    let p = client.patch(id)
    if (Object.keys(set).length) p = p.set(set)
    if (unset.length) p = p.unset(unset)
    const doc = await p.commit()
    revalidatePath('/karriere')
    return NextResponse.json(doc)
  } catch {
    return NextResponse.json({ error: 'Änderungen konnten nicht gespeichert werden.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    await client.delete(id)
    revalidatePath('/karriere')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Eintrag konnte nicht gelöscht werden.' }, { status: 500 })
  }
}
