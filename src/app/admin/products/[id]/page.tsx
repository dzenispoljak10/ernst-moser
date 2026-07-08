import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { readClient, imageUrl } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import ProductForm, { BrandOption, ProductFormData } from '../ProductForm'
import { blocksToText, PortableBlock } from '@/lib/admin/product-helpers'

export const dynamic = 'force-dynamic'

async function getBrandOptions(): Promise<BrandOption[]> {
  try {
    const brands = await readClient.fetch<Array<{ _id: string; name: string; center?: string }>>(
      `*[_type == "brand"] | order(name asc){ _id, name, "center": center->name }`
    )
    return brands.map((b) => ({ value: b._id, label: b.center ? `${b.name} — ${b.center}` : b.name }))
  } catch {
    return []
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

async function getProduct(id: string): Promise<Partial<ProductFormData> | null> {
  try {
    const p = await readClient.fetch<ProductDoc | null>(
      `*[_type == "product" && _id == $id][0]{
        _id, name, slug, price, priceLabel, description, mainImage, specs, isNew, isOccasion, showOnBrandPage,
        "brandId": brand._ref
      }`,
      { id }
    )
    if (!p) return null
    return {
      name: p.name,
      brandId: p.brandId ?? '',
      slug: p.slug?.current ?? '',
      priceLabel: p.priceLabel ?? '',
      price: typeof p.price === 'number' ? String(p.price) : '',
      description: blocksToText(p.description),
      specs: (p.specs ?? []).map((s) => ({ label: s.label ?? '', value: s.value ?? '' })),
      isNew: p.isNew ?? false,
      isOccasion: p.isOccasion ?? false,
      showOnBrandPage: p.showOnBrandPage ?? false,
      mainImageUrl: p.mainImage ? imageUrl(p.mainImage) : '',
      mainImageAssetId: '',
    }
  } catch {
    return null
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { id } = await params
  const [brands, product] = await Promise.all([getBrandOptions(), getProduct(id)])
  if (!product) notFound()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <div className="mb-5">
          <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-[20px] font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
            Produkt bearbeiten
          </h1>
          <ProductForm brands={brands} productId={id} defaultValues={product} />
        </div>
      </div>
    </PageWrapper>
  )
}
