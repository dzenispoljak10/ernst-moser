import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Mail, Phone } from 'lucide-react'
import PageWrapper from '@/components/admin/PageWrapper'
import { client } from '@/lib/sanity'
import { salespersonPhotoUrl } from '@/lib/serverImages'

export const dynamic = 'force-dynamic'

interface Salesperson {
  id: string
  firstName: string
  lastName: string
  title: string
  email: string | null
  phone: string | null
  photoUrl: string | null
  centerSlugs: string[]
}

// Quelle ist Sanity – dieselben Ansprechpartner, die auf der Website erscheinen.
async function getSalespeople(): Promise<{ people: Salesperson[]; failed: boolean }> {
  try {
    const rows = await client.fetch<
      Array<{
        _id: string
        firstName?: string
        lastName?: string
        title?: string
        email?: string
        phone?: string
        photo?: { asset?: { _ref: string } }
        photoFromAdmin?: boolean
        centers?: string[]
      }>
    >(
      `*[_type == "salesperson" && !(_id in path("drafts.**"))] | order(lastName asc) {
        _id, firstName, lastName, title, email, phone, photo, photoFromAdmin,
        "centers": centers[]->slug.current
      }`
    )
    return {
      failed: false,
      people: rows.map((r) => ({
        id: r._id,
        firstName: r.firstName ?? '',
        lastName: r.lastName ?? '',
        title: r.title ?? '',
        email: r.email ?? null,
        phone: r.phone ?? null,
        photoUrl: salespersonPhotoUrl(r),
        centerSlugs: (r.centers ?? []).filter(Boolean),
      })),
    }
  } catch (err) {
    console.error('Admin salesperson list failed:', err)
    return { people: [], failed: true }
  }
}

const CENTER_LABELS: Record<string, string> = {
  nutzfahrzeugcenter: 'Nutzfahrzeuge',
  kommunalcenter: 'Kommunal',
  motorgeraetecenter: 'Motorgeräte',
}

const CENTER_COLORS: Record<string, { bg: string; color: string }> = {
  nutzfahrzeugcenter: { bg: '#EEF2FF', color: '#1B2D5B' },
  kommunalcenter:     { bg: '#FEF2F2', color: '#C0392B' },
  motorgeraetecenter: { bg: '#ECFDF5', color: '#4A7C59' },
}

export default async function SalespersonPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { people, failed } = await getSalespeople()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">

        <div className="mb-4">
          <span className="text-[12px] text-gray-400">{people.length} Einträge</span>
        </div>

        {failed ? (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-[13px] text-red-500">
            Verkäufer konnten nicht geladen werden. Bitte Seite neu laden.
          </div>
        ) : people.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-[13px] text-gray-400">
            Noch keine Verkäufer vorhanden.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map((p, i) => {
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

                    {p.centerSlugs.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {p.centerSlugs.map((slug) => {
                          const cc = CENTER_COLORS[slug]
                          return cc ? (
                            <span
                              key={slug}
                              className="inline-flex items-center text-[10px] font-medium rounded-full px-2 py-0.5"
                              style={{ background: cc.bg, color: cc.color }}
                            >
                              {CENTER_LABELS[slug]}
                            </span>
                          ) : null
                        })}
                      </div>
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
