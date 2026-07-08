import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client, readClient, imageUrl } from '@/lib/sanity'
import { slugify, textToBlocks, imageFromAssetId } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  priceLabel?: string
  isNew?: boolean
  isOccasion?: boolean
  mainImage?: { asset: { _ref: string } }
  brand?: { name?: string; slug?: { current: string }; center?: { slug?: { current: string } } }
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const products = await readClient.fetch<SanityProduct[]>(
      `*[_type == "product"] | order(brand->name asc, name asc) {
        _id, name, slug, priceLabel, isNew, isOccasion, mainImage,
        "brand": brand->{ name, slug, "center": center->{ slug } }
      }`
    )
    const result = products.map((p) => ({
      id: p._id,
      name: p.name,
      slug: p.slug?.current ?? '',
      priceLabel: p.priceLabel ?? null,
      isNew: p.isNew ?? false,
      isOccasion: p.isOccasion ?? false,
      imageUrl: p.mainImage ? imageUrl(p.mainImage) : null,
      brandName: p.brand?.name ?? '',
      linkUrl: p.brand?.center?.slug && p.brand?.slug
        ? `/${p.brand.center.slug.current}/${p.brand.slug.current}/${p.slug?.current ?? ''}`
        : null,
    }))
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const b = await req.json()
    if (!b.name?.trim()) return NextResponse.json({ error: 'Name fehlt' }, { status: 400 })
    if (!b.brandId) return NextResponse.json({ error: 'Marke fehlt' }, { status: 400 })

    const current = (b.slug?.trim() ? slugify(b.slug) : slugify(b.name)) || slugify(b.name)

    const doc = await client.create({
      _type: 'product',
      name: b.name.trim(),
      slug: { _type: 'slug', current },
      brand: { _type: 'reference', _ref: b.brandId },
      priceLabel: b.priceLabel?.trim() || undefined,
      price: typeof b.price === 'number' ? b.price : undefined,
      description: textToBlocks(b.description),
      mainImage: imageFromAssetId(b.mainImageAssetId),
      specs: Array.isArray(b.specs)
        ? b.specs
            .filter((s: { label?: string; value?: string }) => s?.label?.trim() || s?.value?.trim())
            .map((s: { label?: string; value?: string }, i: number) => ({
              _type: 'spec', _key: `sp${i}`, label: s.label ?? '', value: s.value ?? '',
            }))
        : undefined,
      isNew: !!b.isNew,
      isOccasion: !!b.isOccasion,
      showOnBrandPage: !!b.showOnBrandPage,
    })

    await revalidateForBrand(b.brandId, current)
    return NextResponse.json({ id: doc._id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}

/** Revalidiert Markenseite + Produkt-Detailseite anhand der Marke. */
async function revalidateForBrand(brandId: string, productSlug?: string) {
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
    // Revalidierung ist best-effort; ein Fehler darf das Speichern nicht verhindern.
  }
}
