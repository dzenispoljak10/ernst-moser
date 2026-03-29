import { readClient as client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BrandPageContent from '@/components/pages/BrandPageContent'

export const revalidate = 60

interface Props {
  params: Promise<{ center: string; brand: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { center: centerSlug, brand: brandSlug } = await params
  const brand = await client.fetch(
    `*[_type == "brand" && slug.current == $brandSlug && center->slug.current == $centerSlug][0]{
      name,
      "centerName": center->name
    }`,
    { centerSlug, brandSlug }
  )
  if (!brand) return {}
  return {
    title: `${brand.name} – ${brand.centerName}`,
    description: `${brand.name} bei Ernst Moser GmbH – ${brand.centerName}, Gerlafingen.`,
  }
}

export default async function BrandPage({ params }: Props) {
  const { center: centerSlug, brand: brandSlug } = await params
  return <BrandPageContent centerSlug={centerSlug} brandSlug={brandSlug} />
}
