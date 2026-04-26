import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { readClient as client, imageUrl } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  priceLabel?: string
  mainImage?: { asset: { _ref: string } }
  brand?: { name?: string; slug?: { current: string }; center?: { slug?: { current: string } } }
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const products = await client.fetch<SanityProduct[]>(
      `*[_type == "product" && defined(brand->slug.current) && defined(brand->center->slug.current)] | order(brand->name asc, name asc) {
        _id, name, slug, priceLabel, mainImage,
        "brand": brand->{ name, slug, "center": center->{ slug } }
      }`
    )
    const result = products.map((p) => ({
      id: p._id,
      name: p.name,
      slug: p.slug.current,
      priceLabel: p.priceLabel ?? null,
      imageUrl: p.mainImage ? imageUrl(p.mainImage) : null,
      brandName: p.brand?.name ?? '',
      linkUrl: p.brand?.center?.slug && p.brand?.slug
        ? `/${p.brand.center.slug.current}/${p.brand.slug.current}/${p.slug.current}`
        : null,
    }))
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
