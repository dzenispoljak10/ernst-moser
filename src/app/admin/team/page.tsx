import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import DeleteTeamMember from './DeleteTeamMember'

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
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users size={22} className="text-gray-400" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Teammitglieder</h1>
            <p className="text-sm text-gray-500 mt-0.5">{members.length} Einträge</p>
          </div>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ background: '#1B2D5B' }}
        >
          <Plus size={16} />
          Mitglied hinzufügen
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {members.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Noch keine Teammitglieder.</p>
            <p className="text-gray-400 text-xs mt-1">
              Führen Sie erst{' '}
              <code className="bg-gray-100 px-1 rounded">npx prisma db push && npx tsx prisma/seed.ts</code>{' '}
              aus.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">
                  Mitglied
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">
                  Rolle
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                  Kontakt
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {m.photoUrl ? (
                        <img
                          src={m.photoUrl}
                          alt={`${m.firstName} ${m.lastName}`}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ background: '#1B2D5B' }}
                        >
                          {m.firstName.charAt(0)}{m.lastName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {m.firstName} {m.lastName}
                        </div>
                        {m.centerId && (
                          <div className="text-xs text-gray-400">{m.centerId}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{m.role}</td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-xs text-gray-500 space-y-0.5">
                      {m.email && <div>{m.email}</div>}
                      {m.phone && <div>{m.phone}</div>}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {m.isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={11} />
                        Aktiv
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        <XCircle size={11} />
                        Inaktiv
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <Link
                        href={`/admin/team/${m.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Pencil size={15} />
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
  )
}
