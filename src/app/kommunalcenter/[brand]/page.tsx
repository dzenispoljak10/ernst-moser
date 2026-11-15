import BrandPageContent from '@/components/pages/BrandPageContent'
import { readClient as client } from '@/lib/sanity'
import type { Metadata } from 'next'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

// Leere Liste = Seite wird beim ersten Aufruf gebaut und danach zwischengespeichert.
// Ohne diese Funktion wurde sie bei JEDEM Besuch neu gebaut (sehr viele Sanity-Anfragen).
export async function generateStaticParams() {
  return []
}

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
