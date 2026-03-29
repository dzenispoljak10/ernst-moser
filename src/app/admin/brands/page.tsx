import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Tag, Pencil, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

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

export default async function BrandsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const brands = await getBrands()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Tag size={22} className="text-gray-400" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Marken</h1>
            <p className="text-sm text-gray-500 mt-0.5">{brands.length} Marken</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {brands.length === 0 ? (
          <div className="p-12 text-center">
            <Tag size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Noch keine Marken.</p>
            <p className="text-gray-400 text-xs mt-1">
              Führen Sie{' '}
              <code className="bg-gray-100 px-1 rounded">npx tsx prisma/seed.ts</code> aus,
              um Sanity-Daten zu importieren.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">
                  Marke
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  Center
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                  Slug
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {b.logoUrl ? (
                        <img
                          src={b.logoUrl}
                          alt={b.name}
                          className="w-10 h-8 object-contain rounded border border-gray-100 bg-gray-50 p-1"
                        />
                      ) : (
                        <div
                          className="w-10 h-8 rounded border border-gray-100 flex items-center justify-center"
                          style={{ background: '#f9fafb' }}
                        >
                          <Tag size={14} className="text-gray-300" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-900">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      {CENTER_LABELS[b.centerSlug] ?? b.centerSlug}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                      {b.slug}
                    </code>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {b.isActive ? (
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
                    <Link
                      href={`/admin/brands/${b.id}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors inline-flex"
                    >
                      <Pencil size={15} />
                    </Link>
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
