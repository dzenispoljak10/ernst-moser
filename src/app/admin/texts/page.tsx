import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import TextsClient, { type TextRow } from './TextsClient'

export const dynamic = 'force-dynamic'

async function getTexts(): Promise<TextRow[]> {
  try {
    return await client.fetch<TextRow[]>(
      `*[_type == "textOverride" && !(_id in path("drafts.**"))] | order(_updatedAt desc){_id, page, original, text, _updatedAt}`
    )
  } catch {
    return []
  }
}

export default async function AdminTextsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')
  const texts = await getTexts()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        <TextsClient texts={texts} />
      </div>
    </PageWrapper>
  )
}
