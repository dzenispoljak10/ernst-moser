import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TeamForm from '../TeamForm'

export default async function NewTeamMemberPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return (
    <div className="p-8 max-w-2xl mx-auto">
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
  )
}
