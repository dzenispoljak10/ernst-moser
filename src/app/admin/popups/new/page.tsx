import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageWrapper from '@/components/admin/PageWrapper'
import PopupForm from '../PopupForm'

export const dynamic = 'force-dynamic'

export default async function NewPopupPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <div className="mb-5">
          <Link href="/admin/popups" className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-[20px] font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
            Neues Pop-up
          </h1>
          <PopupForm />
        </div>
      </div>
    </PageWrapper>
  )
}
