import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { UserCheck, Pencil } from 'lucide-react'
import Link from 'next/link'

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

export default async function SalespersonPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const people = await getSalespeople()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <UserCheck size={22} className="text-gray-400" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Verkäufer</h1>
          <p className="text-sm text-gray-500 mt-0.5">{people.length} Einträge</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {people.length === 0 ? (
          <div className="p-12 text-center">
            <UserCheck size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Noch keine Verkäufer.</p>
            <p className="text-gray-400 text-xs mt-1">
              Führen Sie{' '}
              <code className="bg-gray-100 px-1 rounded">npx tsx prisma/seed.ts</code> aus.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">
                  Person
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  Funktion
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                  Kontakt
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  Center
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {people.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.photoUrl ? (
                        <img
                          src={p.photoUrl}
                          alt={`${p.firstName} ${p.lastName}`}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ background: '#2a6496' }}
                        >
                          {p.firstName.charAt(0)}{p.lastName.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {p.firstName} {p.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">
                    {p.title}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-xs text-gray-500 space-y-0.5">
                      {p.email && <div>{p.email}</div>}
                      {p.phone && <div>{p.phone}</div>}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {p.centerSlug && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                        {CENTER_LABELS[p.centerSlug] ?? p.centerSlug}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/salesperson/${p.id}`}
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
