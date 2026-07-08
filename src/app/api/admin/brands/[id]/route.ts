import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { client } from '@/lib/sanity'
import { textToBlocks } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

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

    // Tagline lebt nur in Sanity (nicht in Prisma) → dazuladen.
    let tagline = ''
    try {
      const s = await client.fetch<{ tagline?: string } | null>(
        `*[_type == "brand" && slug.current == $slug][0]{ tagline }`,
        { slug: brand.slug }
      )
      tagline = s?.tagline ?? ''
    } catch {
      // Sanity nicht erreichbar → Tagline leer lassen
    }

    return NextResponse.json({ ...brand, tagline })
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

    // Texte in Sanity spiegeln (öffentliche Markenseite liest aus Sanity).
    await syncBrandToSanity(brand.slug, {
      description: brand.description,
      tagline: typeof body.tagline === 'string' ? body.tagline : undefined,
    })

    // Markenseite neu bauen, damit Änderungen sofort erscheinen.
    if (brand.centerSlug && brand.slug) revalidatePath(`/${brand.centerSlug}/${brand.slug}`)

    return NextResponse.json({ ...brand, tagline: body.tagline ?? '' })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

async function syncBrandToSanity(
  slug: string,
  data: { description?: string | null; tagline?: string }
) {
  try {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "brand" && slug.current == $slug][0]`,
      { slug }
    )
    if (!existing) return

    const patch: Record<string, unknown> = {}
    if (data.description !== undefined) {
      patch.description = data.description ? (textToBlocks(data.description) ?? []) : []
    }
    if (data.tagline !== undefined) {
      patch.tagline = data.tagline.trim() || undefined
    }
    if (Object.keys(patch).length) {
      await client.patch(existing._id).set(patch).commit()
    }
  } catch {
    // Non-fatal
  }
}
