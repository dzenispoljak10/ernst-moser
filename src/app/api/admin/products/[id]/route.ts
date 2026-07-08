import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client, readClient, imageUrl } from '@/lib/sanity'
import { slugify, textToBlocks, blocksToText, imageFromAssetId, PortableBlock } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

/** Revalidiert Markenseite + Produkt-Detailseite anhand der Marke. */
async function revalidateForBrand(brandId?: string, productSlug?: string) {
  if (!brandId) return
  try {
    const info = await readClient.fetch<{ brand?: string; center?: string } | null>(
      `*[_type == "brand" && _id == $brandId][0]{ "brand": slug.current, "center": center->slug.current }`,
      { brandId }
    )
    if (info?.center && info?.brand) {
      revalidatePath(`/${info.center}/${info.brand}`)
      if (productSlug) revalidatePath(`/${info.center}/${info.brand}/${productSlug}`)
    }
  } catch {
    // best-effort
  }
}

interface ProductDoc {
  _id: string
  name: string
  slug?: { current: string }
  brandId?: string
  price?: number
  priceLabel?: string
  description?: PortableBlock[]
  mainImage?: { asset: { _ref: string } }
  specs?: Array<{ label?: string; value?: string }>
  isNew?: boolean
  isOccasion?: boolean
  showOnBrandPage?: boolean
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const p = await readClient.fetch<ProductDoc | null>(
      `*[_type == "product" && _id == $id][0]{
        _id, name, slug, price, priceLabel, description, mainImage, specs, isNew, isOccasion, showOnBrandPage,
        "brandId": brand._ref
      }`,
      { id }
    )
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({
      id: p._id,
      name: p.name,
      slug: p.slug?.current ?? '',
      brandId: p.brandId ?? '',
      price: typeof p.price === 'number' ? p.price : null,
      priceLabel: p.priceLabel ?? '',
      description: blocksToText(p.description),
      mainImageUrl: p.mainImage ? imageUrl(p.mainImage) : '',
      specs: (p.specs ?? []).map((s) => ({ label: s.label ?? '', value: s.value ?? '' })),
      isNew: p.isNew ?? false,
      isOccasion: p.isOccasion ?? false,
      showOnBrandPage: p.showOnBrandPage ?? false,
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
    if (!b.name?.trim()) return NextResponse.json({ error: 'Name fehlt' }, { status: 400 })
    if (!b.brandId) return NextResponse.json({ error: 'Marke fehlt' }, { status: 400 })

    const current = (b.slug?.trim() ? slugify(b.slug) : slugify(b.name)) || slugify(b.name)

    const set: Record<string, unknown> = {
      name: b.name.trim(),
      slug: { _type: 'slug', current },
      brand: { _type: 'reference', _ref: b.brandId },
      priceLabel: b.priceLabel?.trim() || undefined,
      price: typeof b.price === 'number' ? b.price : undefined,
      description: textToBlocks(b.description) ?? [],
      specs: Array.isArray(b.specs)
        ? b.specs
            .filter((s: { label?: string; value?: string }) => s?.label?.trim() || s?.value?.trim())
            .map((s: { label?: string; value?: string }, i: number) => ({
              _type: 'spec', _key: `sp${i}`, label: s.label ?? '', value: s.value ?? '',
            }))
        : [],
      isNew: !!b.isNew,
      isOccasion: !!b.isOccasion,
      showOnBrandPage: !!b.showOnBrandPage,
    }
    // Hauptbild nur ersetzen, wenn ein neues hochgeladen wurde.
    const newImage = imageFromAssetId(b.mainImageAssetId)
    if (newImage) set.mainImage = newImage

    await client.patch(id).set(set).commit()
    await revalidateForBrand(b.brandId, current)
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
    const info = await readClient.fetch<{ brandId?: string; slug?: string } | null>(
      `*[_type == "product" && _id == $id][0]{ "brandId": brand._ref, "slug": slug.current }`,
      { id }
    )
    await client.delete(id)
    await revalidateForBrand(info?.brandId, info?.slug)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
