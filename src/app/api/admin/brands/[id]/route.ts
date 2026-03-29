import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { client } from '@/lib/sanity'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const brand = await prisma.brand.findUnique({ where: { id } })
    if (!brand) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(brand)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const body = await req.json()
    const brand = await prisma.brand.update({
      where: { id },
      data: {
        logoUrl: body.logoUrl || null,
        description: body.description || null,
        isActive: body.isActive ?? true,
        order: body.order ?? 0,
      },
    })

    // Sync description to Sanity
    await syncBrandToSanity(brand.slug, { description: brand.description, isActive: brand.isActive })

    return NextResponse.json(brand)
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

async function syncBrandToSanity(
  slug: string,
  data: { description?: string | null; isActive?: boolean }
) {
  try {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "brand" && slug.current == $slug][0]`,
      { slug }
    )
    if (existing && data.description !== undefined) {
      await client
        .patch(existing._id)
        .set({ description: data.description ? [{ _type: 'block', children: [{ _type: 'span', text: data.description }] }] : [] })
        .commit()
    }
  } catch {
    // Non-fatal
  }
}
