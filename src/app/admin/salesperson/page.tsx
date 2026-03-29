import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { UserCheck, Pencil } from 'lucide-react'
import Link from 'next/link'
import PageWrapper from '@/components/admin/PageWrapper'

interface Salesperson {
  id: string
  firstName: string
  lastName: string
  title: string
  email: string | null
  phone: string | null
  photoUrl: string | null
  centerSlug: string | null
}

async function getSalespeople(): Promise<Salesperson[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.salesperson.findMany({ orderBy: [{ lastName: 'asc' }] })
  } catch {
    return []
  }
}

const CENTER_LABELS: Record<string, string> = {
  nutzfahrzeugcenter: 'Nutzfahrzeuge',
  kommunalcenter: 'Kommunal',
  motorgeraetecenter: 'Motorgeräte',
}

const CENTER_COLORS: Record<string, { bg: string; text: string }> = {
  nutzfahrzeugcenter: { bg: '#EFF6FF', text: '#1B2D5B' },
  kommunalcenter: { bg: '#F0FDF4', text: '#4A7C59' },
  motorgeraetecenter: { bg: '#FEF2F2', text: '#C0392B' },
}

export default async function SalespersonPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const people = await getSalespeople()

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{people.length} Einträge</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {people.length === 0 ? (
            <div className="p-16 text-center">
              <UserCheck size={28} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Noch keine Verkäufer vorhanden.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                    Person
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Funktion
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                    Kontakt
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Center
                  </th>
                  <th className="px-4 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {people.map((p) => {
                  const cc = p.centerSlug ? CENTER_COLORS[p.centerSlug] : null
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.photoUrl ? (
                            <img
                              src={p.photoUrl}
                              alt={`${p.firstName} ${p.lastName}`}
                              className="w-9 h-9 rounded-xl object-cover"
                            />
                          ) : (
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold"
                              style={{ background: 'rgba(27,45,91,0.1)', color: '#1B2D5B' }}
                            >
                              {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {p.firstName} {p.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {p.title}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="text-xs text-gray-500 space-y-0.5">
                          {p.email && <div>{p.email}</div>}
                          {p.phone && <div>{p.phone}</div>}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {p.centerSlug && cc && (
                          <span
                            className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full"
                            style={{ background: cc.bg, color: cc.text }}
                          >
                            {CENTER_LABELS[p.centerSlug]}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/salesperson/${p.id}`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Pencil size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
