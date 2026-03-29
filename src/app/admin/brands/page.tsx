import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Tag, Pencil, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import PageWrapper from '@/components/admin/PageWrapper'

interface Brand {
  id: string
  name: string
  slug: string
  centerSlug: string
  logoUrl: string | null
  description: string | null
  isActive: boolean
  order: number
}

async function getBrands(): Promise<Brand[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.brand.findMany({ orderBy: [{ centerSlug: 'asc' }, { order: 'asc' }, { name: 'asc' }] })
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

export default async function BrandsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const brands = await getBrands()

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-5">
          <span className="text-[13px] text-gray-400">{brands.length} Einträge</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {brands.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-gray-400">
              Noch keine Marken vorhanden.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Marke</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Center</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Slug</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {brands.map((b, i) => {
                  const cc = CENTER_COLORS[b.centerSlug]
                  return (
                    <tr
                      key={b.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      style={{
                        animation: 'fadeUp 0.25s ease both',
                        animationDelay: `${0.05 + i * 0.03}s`,
                        opacity: 0,
                      }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {b.logoUrl ? (
                            <img
                              src={b.logoUrl}
                              alt={b.name}
                              className="w-10 h-8 object-contain bg-gray-50 rounded-lg p-1"
                            />
                          ) : (
                            <div className="w-10 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                              <Tag size={12} className="text-gray-300" />
                            </div>
                          )}
                          <span className="text-[14px] font-medium text-gray-900">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        {cc ? (
                          <span
                            className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md"
                            style={{ background: cc.bg, color: cc.color }}
                          >
                            {CENTER_LABELS[b.centerSlug]}
                          </span>
                        ) : (
                          <span className="text-[12px] text-gray-400">{b.centerSlug}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <code className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                          {b.slug}
                        </code>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        {b.isActive ? (
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
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/brands/${b.id}`}
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
