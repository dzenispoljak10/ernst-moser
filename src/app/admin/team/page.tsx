import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import DeleteTeamMember from './DeleteTeamMember'
import PageWrapper from '@/components/admin/PageWrapper'
import { client, imageUrl } from '@/lib/sanity'
import { CENTER_OPTIONS } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  role: string
  email: string | null
  phone: string | null
  photoUrl: string | null
  centerLabel: string | null
  isActive: boolean
  order: number
}

interface SanityRow {
  _id: string
  firstName?: string
  lastName?: string
  role?: string
  email?: string
  phone?: string
  photo?: { asset?: { _ref: string } }
  centerSlug?: string
  isActive?: boolean
  order?: number
}

// Quelle ist Sanity – exakt dieselben Daten, die /unternehmen anzeigt.
async function getTeamMembers(): Promise<{ members: TeamMember[]; failed: boolean }> {
  try {
    const rows = await client.fetch<SanityRow[]>(
      `*[_type == "teamMember" && !(_id in path("drafts.**"))] | order(order asc, lastName asc) {
        _id, firstName, lastName, role, email, phone, photo, order, isActive,
        "centerSlug": center->slug.current
      }`
    )
    return {
      failed: false,
      members: rows.map((r) => ({
        id: r._id,
        firstName: r.firstName ?? '',
        lastName: r.lastName ?? '',
        role: r.role ?? '',
        email: r.email ?? null,
        phone: r.phone ?? null,
        photoUrl: r.photo?.asset ? imageUrl(r.photo) || null : null,
        centerLabel: CENTER_OPTIONS.find((c) => c.value === r.centerSlug)?.label ?? null,
        isActive: r.isActive !== false,
        order: r.order ?? 0,
      })),
    }
  } catch (err) {
    console.error('Admin team list failed:', err)
    return { members: [], failed: true }
  }
}

export default async function TeamPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { members, failed } = await getTeamMembers()

  return (
    <PageWrapper>
      <div className="px-8 py-6">

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[12px] text-gray-400">{members.length} Einträge</span>
          </div>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-white transition-all hover:opacity-90"
            style={{ background: '#1B2D5B' }}
          >
            <Plus size={13} />
            Mitglied hinzufügen
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
          {failed ? (
            <div className="py-16 text-center text-[13px] text-red-500">
              Teammitglieder konnten nicht geladen werden. Bitte Seite neu laden.
            </div>
          ) : members.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-gray-400">
              Noch keine Teammitglieder vorhanden.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Mitglied</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Rolle</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Kontakt</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Status</th>
                  <th className="px-5 py-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors"
                    style={{
                      animation: 'fadeUp 0.2s ease both',
                      animationDelay: `${0.04 + i * 0.02}s`,
                      opacity: 0,
                    }}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {m.photoUrl ? (
                          <img
                            src={m.photoUrl}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-500">
                            {m.firstName.charAt(0)}{m.lastName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-[13px] font-medium text-gray-800 leading-tight">
                            {m.firstName} {m.lastName}
                          </div>
                          {m.centerLabel && (
                            <div className="text-[11px] text-gray-400 mt-0.5">{m.centerLabel}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-gray-500">{m.role}</td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <div className="space-y-0.5">
                        {m.email && <div className="text-[12px] text-gray-400">{m.email}</div>}
                        {m.phone && <div className="text-[12px] text-gray-400">{m.phone}</div>}
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      {m.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Aktiv
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          Inaktiv
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 justify-end">
                        <Link
                          href={`/admin/team/${m.id}`}
                          className="p-1.5 rounded-md text-gray-300 hover:text-[#1B2D5B] hover:bg-[#EEF2FF] transition-all"
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
