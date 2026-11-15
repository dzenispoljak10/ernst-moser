import { readClient as client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BrandPageContent from '@/components/pages/BrandPageContent'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

// Leere Liste = Seite wird beim ersten Aufruf gebaut und danach zwischengespeichert.
// Ohne diese Funktion wurde sie bei JEDEM Besuch neu gebaut (sehr viele Sanity-Anfragen).
export async function generateStaticParams() {
  return []
}

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
