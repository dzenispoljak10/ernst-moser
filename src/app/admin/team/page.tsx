import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, CheckCircle2, XCircle } from 'lucide-react'
import DeleteTeamMember from './DeleteTeamMember'
import PageWrapper from '@/components/admin/PageWrapper'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  role: string
  email: string | null
  phone: string | null
  photoUrl: string | null
  centerId: string | null
  isActive: boolean
  order: number
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.teamMember.findMany({ orderBy: [{ order: 'asc' }, { lastName: 'asc' }] })
  } catch {
    return []
  }
}

export default async function TeamPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const members = await getTeamMembers()

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{members.length} Einträge</p>
          <Link
            href="/admin/team/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:brightness-110"
            style={{ background: '#1B2D5B' }}
          >
            <Plus size={15} />
            Mitglied hinzufügen
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {members.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-400 text-sm">Noch keine Teammitglieder vorhanden.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                    Mitglied
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">
                    Rolle
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                    Kontakt
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {m.photoUrl ? (
                          <img
                            src={m.photoUrl}
                            alt={`${m.firstName} ${m.lastName}`}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                        ) : (
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold"
                            style={{ background: 'rgba(27,45,91,0.1)', color: '#1B2D5B' }}
                          >
                            {m.firstName.charAt(0)}{m.lastName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {m.firstName} {m.lastName}
                          </div>
                          {m.centerId && (
                            <div className="text-xs text-gray-400 mt-0.5">{m.centerId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{m.role}</td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="text-xs text-gray-500 space-y-0.5">
                        {m.email && <div>{m.email}</div>}
                        {m.phone && <div>{m.phone}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {m.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 size={11} />
                          Aktiv
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                          <XCircle size={11} />
                          Inaktiv
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <Link
                          href={`/admin/team/${m.id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteTeamMember id={m.id} name={`${m.firstName} ${m.lastName}`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
