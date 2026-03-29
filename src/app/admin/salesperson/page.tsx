import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Mail, Phone } from 'lucide-react'
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
      <div className="px-8 py-6">

        <div className="mb-4">
          <span className="text-[12px] text-gray-400">{people.length} Einträge</span>
        </div>

        {people.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-[13px] text-gray-400">
            Noch keine Verkäufer vorhanden.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map((p, i) => {
              const cc = p.centerSlug ? CENTER_COLORS[p.centerSlug] : null
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-all"
                  style={{
                    animation: 'fadeUp 0.2s ease both',
                    animationDelay: `${0.04 + i * 0.03}s`,
                    opacity: 0,
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    {p.photoUrl ? (
                      <img
                        src={p.photoUrl}
                        alt={`${p.firstName} ${p.lastName}`}
                        className="w-16 h-16 rounded-xl object-cover mb-3"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-[16px] font-bold text-gray-400 mb-3"
                      >
                        {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                      </div>
                    )}

                    <div className="text-[14px] font-semibold text-gray-800">
                      {p.firstName} {p.lastName}
                    </div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{p.title}</div>

                    {p.centerSlug && cc && (
                      <span
                        className="inline-flex items-center text-[10px] font-medium rounded-full px-2 py-0.5 mt-2"
                        style={{ background: cc.bg, color: cc.color }}
                      >
                        {CENTER_LABELS[p.centerSlug]}
                      </span>
                    )}

                    <div className="mt-3 space-y-1 w-full">
                      {p.email && (
                        <div className="flex items-center gap-1.5 justify-center">
                          <Mail size={11} className="text-gray-300 shrink-0" />
                          <span className="text-[11px] text-gray-400 truncate">{p.email}</span>
                        </div>
                      )}
                      {p.phone && (
                        <div className="flex items-center gap-1.5 justify-center">
                          <Phone size={11} className="text-gray-300 shrink-0" />
                          <span className="text-[11px] text-gray-400">{p.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-50 w-full">
                      <Link
                        href={`/admin/salesperson/${p.id}`}
                        className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#1B2D5B] transition-colors"
                      >
                        <Pencil size={11} />
                        Bearbeiten
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </PageWrapper>
  )
}
