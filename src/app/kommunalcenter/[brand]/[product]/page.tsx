import { readClient as client } from '@/lib/sanity'
import type { Metadata } from 'next'
import ProductPageContent from '@/components/pages/ProductPageContent'

export const revalidate = 60

interface Props {
  params: Promise<{ brand: string; product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, product: productSlug } = await params
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $productSlug && brand->slug.current == $brandSlug && brand->center->slug.current == "kommunalcenter"][0]{
      name, "brandName": brand->name
    }`,
    { productSlug, brandSlug }
  )
  if (!product) return {}
  return {
    title: `${product.name} – ${product.brandName} | Ernst Moser GmbH`,
    description: `${product.name} von ${product.brandName} beim Kommunalcenter Ernst Moser GmbH, Gerlafingen.`,
  }
}

export async function generateStaticParams() {
  const products = await client.fetch<Array<{ brand: string; product: string }>>(
    `*[_type == "product" && brand->center->slug.current == "kommunalcenter"] {
      "brand": brand->slug.current,
      "product": slug.current
    }`
  )
  return products.filter(p => p.brand && p.product)
}

export default async function KommunalProductPage({ params }: Props) {
  const { brand, product } = await params
  return (
    <ProductPageContent
      centerSlug="kommunalcenter"
      brandSlug={brand}
      productSlug={product}
    />
  )
}
