import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import TeamForm from '../TeamForm'

export default async function NewTeamMemberPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/team"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <Users size={22} className="text-gray-400" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Neues Teammitglied</h1>
          <p className="text-sm text-gray-500 mt-0.5">Neues Mitglied anlegen</p>
        </div>
      </div>

      <TeamForm />
    </div>
  )
}
