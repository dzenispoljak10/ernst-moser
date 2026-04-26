import { readClient as client, imageUrl } from './sanity'
import { productImageBySlug } from './serverImages'

export interface RabattCard {
  id: string
  title: string
  subtitle?: string
  imageUrl?: string
  linkUrl?: string
  priceLabel?: string
  badgeLabel?: string
  description?: string
}

interface SanityProductLite {
  _id: string
  name: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  priceLabel?: string
  brand?: { name?: string; slug?: { current: string }; center?: { slug?: { current: string } } }
}

async function fetchRandomProductCards(limit: number): Promise<RabattCard[]> {
  const products = await client.fetch<SanityProductLite[]>(
    `*[_type == "product" && defined(brand->slug.current) && defined(brand->center->slug.current)]{
      _id, name, slug, mainImage, priceLabel,
      "brand": brand->{ name, slug, "center": center->{ slug } }
    }`
  ).catch(() => [] as SanityProductLite[])

  const shuffled = [...products].sort(() => Math.random() - 0.5).slice(0, limit)

  return shuffled.map((p) => {
    const localImg = productImageBySlug(p.slug.current)
    const img = localImg ?? (p.mainImage ? imageUrl(p.mainImage) : undefined)
    return {
      id: p._id,
      title: p.name,
      subtitle: p.brand?.name,
      imageUrl: img,
      linkUrl: '/rabattaktionen',
      priceLabel: p.priceLabel,
    }
  })
}

export async function getRabattaktionen(limit?: number): Promise<RabattCard[]> {
  try {
    const { prisma } = await import('./prisma')
    const rows = await prisma.rabattaktion.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      ...(limit ? { take: limit } : {}),
    })

    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: r.subtitle ?? undefined,
        imageUrl: r.imageUrl ?? undefined,
        linkUrl: r.linkUrl ?? undefined,
        priceLabel: r.priceLabel ?? undefined,
        badgeLabel: r.badgeLabel ?? undefined,
        description: r.description ?? undefined,
      }))
    }
  } catch {
    // fall through to random products
  }

  return fetchRandomProductCards(limit ?? 4)
}
