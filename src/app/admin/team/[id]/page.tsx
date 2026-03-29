import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import TeamForm from '../TeamForm'

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
          <h1 className="text-xl font-semibold text-gray-900">
            {member.firstName} {member.lastName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Mitglied bearbeiten</p>
        </div>
      </div>

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
  )
}
