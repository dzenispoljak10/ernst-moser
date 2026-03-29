import { auth } from '@/auth'
import Link from 'next/link'
import { Users, Tag, UserCheck, ArrowRight, LayoutDashboard } from 'lucide-react'

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
  const stats = await getStats()

  const statCards = [
    {
      label: 'Teammitglieder',
      value: stats.teamCount,
      icon: Users,
      href: '/admin/team',
      color: '#1B2D5B',
    },
    {
      label: 'Marken',
      value: stats.brandCount,
      icon: Tag,
      href: '/admin/brands',
      color: '#2a6496',
    },
    {
      label: 'Verkäufer',
      value: stats.salespersonCount,
      icon: UserCheck,
      href: '/admin/salesperson',
      color: '#1a7a4a',
    },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard size={22} className="text-gray-400" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Willkommen, {session?.user?.name ?? 'Administrator'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Ernst Moser GmbH — Admin Dashboard
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <ArrowRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Schnellzugriff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/admin/team/new', label: 'Neues Teammitglied anlegen', icon: Users },
            { href: '/admin/brands', label: 'Marken verwalten', icon: Tag },
            { href: '/admin/salesperson', label: 'Verkäufer verwalten', icon: UserCheck },
            { href: '/admin/settings', label: 'Einstellungen', icon: UserCheck },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <Icon size={16} className="text-gray-400 group-hover:text-gray-600" />
              {label}
              <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
