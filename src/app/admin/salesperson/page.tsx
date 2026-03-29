import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Pencil } from 'lucide-react'
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

const CENTER_COLORS: Record<string, { bg: string; color: string }> = {
  nutzfahrzeugcenter: { bg: '#EEF2FF', color: '#1B2D5B' },
  kommunalcenter:     { bg: '#ECFDF5', color: '#4A7C59' },
  motorgeraetecenter: { bg: '#FEF2F2', color: '#C0392B' },
}

export default async function SalespersonPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const people = await getSalespeople()

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-5">
          <span className="text-[13px] text-gray-400">{people.length} Einträge</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {people.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-gray-400">
              Noch keine Verkäufer vorhanden.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Person</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Funktion</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Kontakt</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Center</th>
                  <th className="px-4 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {people.map((p, i) => {
                  const cc = p.centerSlug ? CENTER_COLORS[p.centerSlug] : null
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      style={{
                        animation: 'fadeUp 0.25s ease both',
                        animationDelay: `${0.05 + i * 0.03}s`,
                        opacity: 0,
                      }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {p.photoUrl ? (
                            <img src={p.photoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                              style={{ background: 'rgba(27,45,91,0.08)', color: '#1B2D5B' }}
                            >
                              {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                            </div>
                          )}
                          <span className="text-[14px] font-medium text-gray-900">
                            {p.firstName} {p.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] text-gray-500 hidden sm:table-cell">{p.title}</td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <div className="space-y-0.5">
                          {p.email && <div className="text-[12px] text-gray-400">{p.email}</div>}
                          {p.phone && <div className="text-[12px] text-gray-400">{p.phone}</div>}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        {p.centerSlug && cc && (
                          <span
                            className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md"
                            style={{ background: cc.bg, color: cc.color }}
                          >
                            {CENTER_LABELS[p.centerSlug]}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/salesperson/${p.id}`}
                            className="p-1.5 rounded-md text-gray-400 hover:text-[#1B2D5B] hover:bg-[#1B2D5B]/5 transition-colors"
                          >
                            <Pencil size={13} />
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
