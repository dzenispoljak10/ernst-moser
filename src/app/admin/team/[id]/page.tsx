import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TeamForm from '../TeamForm'
import PageWrapper from '@/components/admin/PageWrapper'

async function getMember(id: string) {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.teamMember.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { id } = await params
  const member = await getMember(id)
  if (!member) notFound()

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
          <TeamForm
            memberId={id}
            defaultValues={{
              firstName: member.firstName,
              lastName: member.lastName,
              role: member.role,
              email: member.email ?? '',
              phone: member.phone ?? '',
              centerId: member.centerId ?? '',
              order: member.order,
              isActive: member.isActive,
              photoUrl: member.photoUrl ?? '',
            }}
          />
        </div>
      </div>
    </PageWrapper>
  )
}
