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

const CENTER_COLORS: Record<string, { bg: string; text: string }> = {
  nutzfahrzeugcenter: { bg: '#EFF6FF', text: '#1B2D5B' },
  kommunalcenter: { bg: '#F0FDF4', text: '#4A7C59' },
  motorgeraetecenter: { bg: '#FEF2F2', text: '#C0392B' },
}

export default async function BrandsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const brands = await getBrands()

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{brands.length} Einträge</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {brands.length === 0 ? (
            <div className="p-16 text-center">
              <Tag size={28} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Noch keine Marken vorhanden.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                    Marke
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Center
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                    Slug
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => {
                  const cc = CENTER_COLORS[b.centerSlug]
                  return (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {b.logoUrl ? (
                            <img
                              src={b.logoUrl}
                              alt={b.name}
                              className="w-10 h-8 object-contain rounded-lg bg-gray-50 p-1"
                            />
                          ) : (
                            <div className="w-10 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                              <Tag size={13} className="text-gray-300" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-900">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {cc ? (
                          <span
                            className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full"
                            style={{ background: cc.bg, color: cc.text }}
                          >
                            {CENTER_LABELS[b.centerSlug]}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">{b.centerSlug}</span>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">
                          {b.slug}
                        </code>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {b.isActive ? (
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
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/brands/${b.id}`}
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
