import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { readClient, imageUrl } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import ProductsClient, { ProductRow } from './ProductsClient'

export const dynamic = 'force-dynamic'

interface SanityProduct {
  _id: string
  name: string
  slug?: { current: string }
  priceLabel?: string
  isNew?: boolean
  isOccasion?: boolean
  mainImage?: { asset: { _ref: string } }
  brand?: { name?: string; slug?: { current: string }; center?: { slug?: { current: string } } }
}

async function getProducts(): Promise<ProductRow[]> {
  try {
    const products = await readClient.fetch<SanityProduct[]>(
      `*[_type == "product"] | order(brand->name asc, name asc) {
        _id, name, slug, priceLabel, isNew, isOccasion, mainImage,
        "brand": brand->{ name, slug, "center": center->{ slug } }
      }`
    )
    return products.map((p) => ({
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
  } catch {
    return []
  }
}

export default async function AdminProductsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const products = await getProducts()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        <ProductsClient products={products} />
      </div>
    </PageWrapper>
  )
}
