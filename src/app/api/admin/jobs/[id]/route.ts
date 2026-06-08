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
    const patch: Record<string, unknown> = {}
    for (const f of FIELDS) if (f in b) patch[f] = b[f]
    const doc = await client.patch(id).set(patch).commit()
    revalidatePath('/karriere')
    return NextResponse.json(doc)
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
    revalidatePath('/karriere')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
