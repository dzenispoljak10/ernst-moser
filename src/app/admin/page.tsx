import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Tag, UserCheck, ArrowUpRight, ArrowRight } from 'lucide-react'

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
    {
      label: 'Teammitglieder',
      value: stats.teamCount,
      icon: Users,
      href: '/admin/team',
      iconBg: '#EFF6FF',
      iconColor: '#1B2D5B',
    },
    {
      label: 'Aktive Marken',
      value: stats.brandCount,
      icon: Tag,
      href: '/admin/brands',
      iconBg: '#F0FDF4',
      iconColor: '#4A7C59',
    },
    {
      label: 'Verkäufer',
      value: stats.salespersonCount,
      icon: UserCheck,
      href: '/admin/salesperson',
      iconBg: '#FEF2F2',
      iconColor: '#C0392B',
    },
  ]

  const quickActions = [
    {
      href: '/admin/team/new',
      label: 'Neues Teammitglied',
      desc: 'Mitglied anlegen und veröffentlichen',
      icon: Users,
      color: '#1B2D5B',
      bg: '#EFF6FF',
    },
    {
      href: '/admin/brands',
      label: 'Marken verwalten',
      desc: 'Logos, Beschreibungen und Status',
      icon: Tag,
      color: '#4A7C59',
      bg: '#F0FDF4',
    },
    {
      href: '/admin/salesperson',
      label: 'Verkäufer verwalten',
      desc: 'Ansprechpartner und Kontaktdaten',
      icon: UserCheck,
      color: '#C0392B',
      bg: '#FEF2F2',
    },
    {
      href: '/admin/settings',
      label: 'Einstellungen',
      desc: 'Konto und System-Informationen',
      icon: Users,
      color: '#64748b',
      bg: '#F8FAFC',
    },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
          Willkommen zurück,{' '}
          <span className="font-semibold text-gray-700">{session?.user?.name ?? 'Administrator'}</span>
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, href, iconBg, iconColor }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: iconBg }}
              >
                <Icon size={20} style={{ color: iconColor }} />
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500 transition-colors"
              />
            </div>
            <div
              className="text-4xl font-black text-gray-900 mb-1"
              style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              {value}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2
          className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4"
        >
          Schnellzugriff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map(({ href, label, desc, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: bg }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
              </div>
              <ArrowRight
                size={15}
                className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
