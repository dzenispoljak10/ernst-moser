import type { Metadata } from 'next'
import { getIsuzuModel, getAllIsuzuRoutes } from '@/lib/isuzu-catalog'
import IsuzuModelPageContent from '@/components/pages/IsuzuModelPageContent'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

interface Props {
  params: Promise<{ category: string; model: string }>
}

export function generateStaticParams() {
  return getAllIsuzuRoutes()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, model } = await params
  const match = getIsuzuModel(category, model)
  if (!match) return {}
  return {
    title: `Isuzu ${match.model.title} – ${match.category.label} | Ernst Moser GmbH`,
    description: match.model.shortDescription,
  }
}

export default async function IsuzuModelPage({ params }: Props) {
  const { category, model } = await params
  return <IsuzuModelPageContent categorySlug={category} modelSlug={model} />
}
