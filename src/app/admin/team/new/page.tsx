import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TeamForm from '../TeamForm'
import PageWrapper from '@/components/admin/PageWrapper'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

// Neue Mitglieder standardmässig ans Ende der Team-Liste setzen.
async function nextOrder(): Promise<number> {
  try {
    const max = await client.fetch<number | null>(
      `math::max(*[_type == "teamMember" && !(_id in path("drafts.**"))].order)`
    )
    return (typeof max === 'number' ? max : 0) + 1
  } catch {
    return 99
  }
}

export default async function NewTeamMemberPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const order = await nextOrder()
  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
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
          <TeamForm defaultValues={{ order }} />
        </div>
      </div>
    </PageWrapper>
  )
}
