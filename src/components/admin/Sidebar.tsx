'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  Tag,
  UserCheck,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/team', label: 'Teammitglieder', icon: Users },
  { href: '/admin/brands', label: 'Marken', icon: Tag },
  { href: '/admin/salesperson', label: 'Verkäufer', icon: UserCheck },
  { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
]

interface SidebarProps {
  userName?: string | null
  userEmail?: string | null
}

export default function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside
      className="flex flex-col h-full"
      style={{ width: '280px', minWidth: '280px', background: '#0f1729' }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: '#1B2D5B' }}
          >
            EM
          </div>
          <div>
            <div className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
              Ernst Moser GmbH
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <div className="text-xs font-semibold uppercase tracking-widest px-4 mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Navigation
        </div>
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? '#1B2D5B' : 'transparent',
                color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                }
              }}
            >
              <Icon size={17} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/8 pt-4">
        {/* User row */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: '#1B2D5B' }}
          >
            {userName?.charAt(0)?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{userName ?? 'Admin'}</div>
            <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{userEmail ?? ''}</div>
          </div>
        </div>

        {/* Abmelden */}
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(192,57,43,0.15)'
            e.currentTarget.style.color = '#f87171'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
          }}
        >
          <LogOut size={15} />
          <span>Abmelden</span>
        </button>

        {/* Zur Website */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all mt-1"
          style={{ color: 'rgba(255,255,255,0.30)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.60)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.30)'
          }}
        >
          <ExternalLink size={12} />
          ← Zur Website
        </Link>
      </div>
    </aside>
  )
}
