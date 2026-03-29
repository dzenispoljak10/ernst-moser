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

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[13px] text-gray-400">{members.length} Einträge</span>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-all hover:opacity-90"
            style={{ background: '#1B2D5B' }}
          >
            <Plus size={14} />
            Mitglied hinzufügen
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {members.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-gray-400">
              Noch keine Teammitglieder vorhanden.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Mitglied</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Rolle</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Kontakt</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    style={{
                      animation: 'fadeUp 0.25s ease both',
                      animationDelay: `${0.05 + i * 0.03}s`,
                      opacity: 0,
                    }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {m.photoUrl ? (
                          <img src={m.photoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                            style={{ background: 'rgba(27,45,91,0.08)', color: '#1B2D5B' }}
                          >
                            {m.firstName.charAt(0)}{m.lastName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-[14px] font-medium text-gray-900 leading-tight">
                            {m.firstName} {m.lastName}
                          </div>
                          {m.centerId && (
                            <div className="text-[11px] text-gray-400 mt-0.5">{m.centerId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-gray-500">{m.role}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div className="space-y-0.5">
                        {m.email && <div className="text-[12px] text-gray-400">{m.email}</div>}
                        {m.phone && <div className="text-[12px] text-gray-400">{m.phone}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      {m.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                          <CheckCircle2 size={10} />
                          Aktiv
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          <XCircle size={10} />
                          Inaktiv
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-0.5 justify-end">
                        <Link
                          href={`/admin/team/${m.id}`}
                          className="p-1.5 rounded-md text-gray-400 hover:text-[#1B2D5B] hover:bg-[#1B2D5B]/5 transition-colors"
                        >
                          <Pencil size={13} />
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
