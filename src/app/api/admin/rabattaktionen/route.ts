import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await prisma.rabattaktion.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const created = await prisma.rabattaktion.create({
      data: {
        title: body.title ?? 'Neue Aktion',
        subtitle: body.subtitle || null,
        imageUrl: body.imageUrl || null,
        linkUrl: body.linkUrl || null,
        priceLabel: body.priceLabel || null,
        badgeLabel: body.badgeLabel || null,
        description: body.description || null,
        order: typeof body.order === 'number' ? body.order : 0,
        isActive: body.isActive ?? true,
      },
    })
    return NextResponse.json(created)
  } catch {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
