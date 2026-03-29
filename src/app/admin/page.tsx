import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Tag, UserCheck, ArrowUpRight, ArrowRight, Settings } from 'lucide-react'
import PageWrapper from '@/components/admin/PageWrapper'

async function getStats() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const [teamCount, brandCount, salespersonCount] = await Promise.all([
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.brand.count({ where: { isActive: true } }),
      prisma.salesperson.count(),
    ])
    return { teamCount, brandCount, salespersonCount }
  } catch {
    return { teamCount: 0, brandCount: 0, salespersonCount: 0 }
  }
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const stats = await getStats()

  const statCards = [
    { label: 'Teammitglieder', value: stats.teamCount, icon: Users, href: '/admin/team', iconBg: '#EEF2FF', iconColor: '#1B2D5B' },
    { label: 'Aktive Marken', value: stats.brandCount, icon: Tag, href: '/admin/brands', iconBg: '#ECFDF5', iconColor: '#4A7C59' },
    { label: 'Verkäufer', value: stats.salespersonCount, icon: UserCheck, href: '/admin/salesperson', iconBg: '#FEF2F2', iconColor: '#C0392B' },
  ]

  const quickActions = [
    { href: '/admin/team/new', label: 'Neues Teammitglied', desc: 'Mitglied anlegen und veröffentlichen', icon: Users, color: '#1B2D5B', bg: '#EEF2FF' },
    { href: '/admin/brands', label: 'Marken verwalten', desc: 'Logos, Beschreibungen und Status', icon: Tag, color: '#4A7C59', bg: '#ECFDF5' },
    { href: '/admin/salesperson', label: 'Verkäufer verwalten', desc: 'Ansprechpartner und Kontaktdaten', icon: UserCheck, color: '#C0392B', bg: '#FEF2F2' },
    { href: '/admin/settings', label: 'Einstellungen', desc: 'Konto und System-Informationen', icon: Settings, color: '#64748b', bg: '#F1F5F9' },
  ]

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, href, iconBg, iconColor }, i) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all group"
              style={{
                animation: 'fadeUp 0.3s ease both',
                animationDelay: `${i * 0.07}s`,
                opacity: 0,
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: iconBg }}
                >
                  <Icon size={20} style={{ color: iconColor }} />
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-gray-200 group-hover:text-gray-400 transition-colors mt-1"
                />
              </div>
              <div
                className="text-[36px] font-black text-gray-900 mt-3 mb-0.5 leading-none"
                style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
              >
                {value}
              </div>
              <div className="text-[13px] text-gray-400">{label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Schnellzugriff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map(({ href, label, desc, icon: Icon, color, bg }, i) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group flex items-center gap-4"
              style={{
                animation: 'fadeUp 0.3s ease both',
                animationDelay: `${0.18 + i * 0.05}s`,
                opacity: 0,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: bg }}
              >
                <Icon size={17} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-gray-800">{label}</div>
                <div className="text-[12px] text-gray-400 mt-0.5">{desc}</div>
              </div>
              <ArrowRight
                size={14}
                className="text-gray-300 group-hover:text-[#1B2D5B] group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </Link>
          ))}
        </div>

      </div>
    </PageWrapper>
  )
}
