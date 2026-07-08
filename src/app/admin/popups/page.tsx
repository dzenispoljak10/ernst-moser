import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { readClient } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import PopupsClient, { PopupRow } from './PopupsClient'

export const dynamic = 'force-dynamic'

async function getPopups(): Promise<PopupRow[]> {
  try {
    return await readClient.fetch<PopupRow[]>(
      `*[_type == "popup"] | order(order asc, _createdAt desc) {
        _id, title, heading, target, delaySeconds, autoCloseSeconds, isActive
      }`
    )
  } catch {
    return []
  }
}

export default async function AdminPopupsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const popups = await getPopups()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-5 max-w-2xl">
          <h1 className="text-[20px] font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
            Pop-ups
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">
            Hinweis-Fenster auf der Website. Neue Pop-ups sind zuerst inaktiv – erst nach dem Aktivieren sichtbar.
          </p>
        </div>
        <PopupsClient popups={popups} />
      </div>
    </PageWrapper>
  )
}
