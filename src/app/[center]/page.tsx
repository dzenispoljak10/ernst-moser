import { readClient as client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CenterPageContent from '@/components/pages/CenterPageContent'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

// Leere Liste = Seite wird beim ersten Aufruf gebaut und danach zwischengespeichert.
// Ohne diese Funktion wurde sie bei JEDEM Besuch neu gebaut (sehr viele Sanity-Anfragen).
export async function generateStaticParams() {
  return []
}

interface Props {
  params: Promise<{ center: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { center: slug } = await params
  const center = await client.fetch(
    `*[_type == "center" && slug.current == $slug][0]{ name, description }`,
    { slug }
  )
  if (!center) return {}
  return { title: center.name, description: center.description }
}

export default async function CenterPage({ params }: Props) {
  const { center: centerSlug } = await params

  // Make sure it's a real center (otherwise 404 cleanly)
  const exists = await client.fetch(
    `*[_type == "center" && slug.current == $slug][0]{ _id }`,
    { slug: centerSlug }
  )
  if (!exists) notFound()

  return <CenterPageContent centerSlug={centerSlug} />
}
