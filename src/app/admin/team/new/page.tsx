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
      <div className="p-6 lg:p-8 mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={15} />
            Zurück
          </Link>
        </div>
        <TeamForm />
      </div>
    </PageWrapper>
  )
}
