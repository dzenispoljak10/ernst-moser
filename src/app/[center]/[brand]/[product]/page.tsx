import { readClient as client } from '@/lib/sanity'
import type { Metadata } from 'next'
import ProductPageContent from '@/components/pages/ProductPageContent'

export const revalidate = 60

interface Props {
  params: Promise<{ center: string; brand: string; product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { center: centerSlug, brand: brandSlug, product: productSlug } = await params
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $productSlug && brand->slug.current == $brandSlug && brand->center->slug.current == $centerSlug][0]{
      name, "brandName": brand->name, "centerName": brand->center->name
    }`,
    { productSlug, brandSlug, centerSlug }
  )
  if (!product) return {}
  return {
    title: `${product.name} – ${product.brandName} | Ernst Moser GmbH`,
    description: `${product.name} von ${product.brandName} beim ${product.centerName} Ernst Moser GmbH, Gerlafingen.`,
  }
}

export async function generateStaticParams() {
  const products = await client.fetch<Array<{ center: string; brand: string; product: string }>>(
    `*[_type == "product"] {
      "center": brand->center->slug.current,
      "brand": brand->slug.current,
      "product": slug.current
    }`
  )
  return products.filter(p => p.center && p.brand && p.product)
}

export default async function GenericProductPage({ params }: Props) {
  const { center, brand, product } = await params
  return (
    <ProductPageContent
      centerSlug={center}
      brandSlug={brand}
      productSlug={product}
    />
  )
}
