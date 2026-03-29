import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Tag, UserCheck, Settings, ArrowRight, Plus } from 'lucide-react'
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

  const navCards = [
    {
      href: '/admin/team',
      label: 'Teammitglieder',
      desc: 'Mitglieder verwalten und veröffentlichen',
      icon: Users,
      count: stats.teamCount,
      countLabel: 'aktiv',
      accent: '#1B2D5B',
      accentBg: '#EEF2FF',
      delay: 0,
    },
    {
      href: '/admin/brands',
      label: 'Marken',
      desc: 'Logos, Beschreibungen und Center-Zuordnung',
      icon: Tag,
      count: stats.brandCount,
      countLabel: 'aktiv',
      accent: '#4A7C59',
      accentBg: '#ECFDF5',
      delay: 0.07,
    },
    {
      href: '/admin/salesperson',
      label: 'Verkäufer',
      desc: 'Ansprechpartner und Kontaktdaten',
      icon: UserCheck,
      count: stats.salespersonCount,
      countLabel: 'gesamt',
      accent: '#C0392B',
      accentBg: '#FEF2F2',
      delay: 0.14,
    },
    {
      href: '/admin/settings',
      label: 'Einstellungen',
      desc: 'Passwort, Konto und System',
      icon: Settings,
      count: null,
      countLabel: '',
      accent: '#64748b',
      accentBg: '#F1F5F9',
      delay: 0.21,
    },
  ]

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 mx-auto">

        {/* Greeting */}
        <div className="mb-8">
          <h2
            className="text-[22px] font-bold text-gray-900 leading-tight"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            Willkommen zurück{session?.user?.name ? `, ${session.user.name}` : ''}
          </h2>
          <p className="text-[13px] text-gray-400 mt-1">Was möchten Sie heute verwalten?</p>
        </div>

        {/* Main Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {navCards.map(({ href, label, desc, icon: Icon, count, countLabel, accent, accentBg, delay }) => (
            <Link
              key={href}
              href={href}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
              style={{
                animation: 'fadeUp 0.35s ease both',
                animationDelay: `${delay}s`,
                opacity: 0,
              }}
            >
              {/* Top color strip */}
              <div
                className="h-1 w-full"
                style={{ background: accent, opacity: 0.7 }}
              />

              <div className="p-6">
                {/* Icon + Arrow */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: accentBg }}
                  >
                    <Icon size={26} style={{ color: accent }} />
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ background: accentBg }}
                  >
                    <ArrowRight size={15} style={{ color: accent }} />
                  </div>
                </div>

                {/* Count */}
                {count !== null && (
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span
                      className="text-[42px] font-black leading-none"
                      style={{ fontFamily: 'var(--font-heading, sans-serif)', color: '#0F172A' }}
                    >
                      {count}
                    </span>
                    <span className="text-[13px] text-gray-400 mb-1">{countLabel}</span>
                  </div>
                )}

                {/* Title */}
                <div
                  className="text-[17px] font-bold text-gray-900 leading-tight"
                  style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
                >
                  {label}
                </div>
                <div className="text-[12px] text-gray-400 mt-1 leading-relaxed">{desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Add Button */}
        <Link
          href="/admin/team/new"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-[13px] font-medium text-gray-400 hover:border-[#1B2D5B]/30 hover:text-[#1B2D5B] hover:bg-[#1B2D5B]/2 transition-all"
          style={{
            animation: 'fadeUp 0.35s ease both',
            animationDelay: '0.3s',
            opacity: 0,
          }}
        >
          <Plus size={15} />
          Neues Teammitglied hinzufügen
        </Link>

      </div>
    </PageWrapper>
  )
}
