import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TeamForm from '../TeamForm'
import PageWrapper from '@/components/admin/PageWrapper'

export default async function NewTeamMemberPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <div className="mb-5">
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-lg">
          <TeamForm />
        </div>
      </div>
    </PageWrapper>
  )
}
