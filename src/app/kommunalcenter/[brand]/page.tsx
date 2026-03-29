import BrandPageContent from '@/components/pages/BrandPageContent'
import { readClient as client } from '@/lib/sanity'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ brand: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug } = await params
  const brand = await client.fetch(
    `*[_type == "brand" && slug.current == $s && center->slug.current == "kommunalcenter"][0]{ name }`,
    { s: brandSlug }
  )
  return brand ? { title: brand.name } : {}
}

export default async function KommunalBrandPage({ params }: Props) {
  const { brand } = await params
  return <BrandPageContent centerSlug="kommunalcenter" brandSlug={brand} />
}
