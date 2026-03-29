import { readClient as client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CenterPageContent from '@/components/pages/CenterPageContent'

export const revalidate = 60

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
