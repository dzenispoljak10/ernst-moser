import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Tag, UserCheck, Package, ChevronRight, MapPin, Phone, Mail, BadgePercent } from 'lucide-react'
import PageWrapper from '@/components/admin/PageWrapper'

async function getStats() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { readClient } = await import('@/lib/sanity')
    const [teamCount, brandCount, salespersonCount, productCount, rabattCount] = await Promise.all([
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.brand.count({ where: { isActive: true } }),
      prisma.salesperson.count(),
      readClient.fetch<number>('count(*[_type == "product"])').catch(() => 0),
      prisma.rabattaktion.count({ where: { isActive: true } }).catch(() => 0),
    ])
    return { teamCount, brandCount, salespersonCount, productCount: productCount ?? 0, rabattCount }
  } catch {
    return { teamCount: 0, brandCount: 0, salespersonCount: 0, productCount: 0, rabattCount: 0 }
  }
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const stats = await getStats()

  const statCards = [
    {
      label: 'Teammitglieder',
      sub: 'aktiv',
      count: stats.teamCount,
      icon: Users,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
      delay: 0,
    },
    {
      label: 'Marken',
      sub: 'aktiv',
      count: stats.brandCount,
      icon: Tag,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      delay: 0.04,
    },
    {
      label: 'Verkäufer',
      sub: 'gesamt',
      count: stats.salespersonCount,
      icon: UserCheck,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      delay: 0.08,
    },
    {
      label: 'Produkte',
      sub: 'in Sanity',
      count: stats.productCount,
      icon: Package,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      delay: 0.12,
    },
    {
      label: 'Rabattaktionen',
      sub: 'aktiv',
      count: stats.rabattCount,
      icon: BadgePercent,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      delay: 0.16,
    },
  ]

  const quickLinks = [
    {
      href: '/admin/team',
      label: 'Teammitglieder',
      sub: 'Mitglieder verwalten und veröffentlichen',
      icon: Users,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
    },
    {
      href: '/admin/brands',
      label: 'Marken',
      sub: 'Logos, Beschreibungen und Center-Zuordnung',
      icon: Tag,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      href: '/admin/salesperson',
      label: 'Verkäufer',
      sub: 'Ansprechpartner und Kontaktdaten',
      icon: UserCheck,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      href: '/admin/rabattaktionen',
      label: 'Rabattaktionen',
      sub: 'Aktionen für Startseite und Rabatt-Seite',
      icon: BadgePercent,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
    },
  ]

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, sub, count, icon: Icon, iconBg, iconColor, delay }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 p-5"
              style={{
                animation: 'fadeUp 0.25s ease both',
                animationDelay: `${delay}s`,
                opacity: 0,
              }}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBg}`}>
                <Icon size={17} className={iconColor} />
              </div>
              <div
                className="text-[28px] font-bold text-gray-900 leading-none"
                style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
              >
                {count}
              </div>
              <div className="text-[13px] text-gray-600 font-medium mt-1">{label}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">

          {/* Schnellzugriff */}
          <div
            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5"
            style={{
              animation: 'fadeUp 0.25s ease both',
              animationDelay: '0.18s',
              opacity: 0,
            }}
          >
            <h2 className="text-[14px] font-semibold text-gray-800 mb-4">Schnellzugriff</h2>
            <div className="space-y-0.5">
              {quickLinks.map(({ href, label, sub, icon: Icon, iconBg, iconColor }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Icon size={15} className={iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-gray-700">{label}</div>
                    <div className="text-[11px] text-gray-400">{sub}</div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div
            className="col-span-1 bg-white rounded-xl border border-gray-100 p-5"
            style={{
              animation: 'fadeUp 0.25s ease both',
              animationDelay: '0.22s',
              opacity: 0,
            }}
          >
            <h2 className="text-[14px] font-semibold text-gray-800 mb-4">Ernst Moser GmbH</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="text-gray-300 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[12px] text-gray-600">Industrie Ost 17</div>
                  <div className="text-[12px] text-gray-600">4563 Gerlafingen SO</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="text-gray-300 shrink-0" />
                <div className="text-[12px] text-gray-600">+41 32 674 25 25</div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} className="text-gray-300 shrink-0" />
                <div className="text-[12px] text-gray-600">info@ernst-moser.ch</div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-50">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">System</div>
              <div className="text-[11px] text-gray-400">Sanity: <span className="font-mono text-gray-500">owqsc1ph</span></div>
              <div className="text-[11px] text-gray-400 mt-0.5">Dataset: <span className="font-mono text-gray-500">production</span></div>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
