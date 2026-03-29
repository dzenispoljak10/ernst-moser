'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  X,
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
  logoUrl?: string | null
  open: boolean
  onClose: () => void
}

export default function Sidebar({ userName, userEmail, logoUrl, open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          flex flex-col h-full z-50 transition-transform duration-300
          fixed lg:relative
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ width: '260px', minWidth: '260px', background: '#0f1729' }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Ernst Moser GmbH"
                  width={120}
                  height={36}
                  className="object-contain brightness-0 invert"
                  unoptimized
                  style={{ maxHeight: '36px', width: 'auto' }}
                />
              ) : (
                <span className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
                  Ernst Moser GmbH
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white/40 hover:text-white/70 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Admin Panel</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 pt-4 overflow-y-auto">
          <div
            className="text-xs uppercase tracking-widest px-4 mb-2"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            Navigation
          </div>
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
              const active = isActive(href, exact)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    background: active ? '#1B2D5B' : 'transparent',
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.50)',
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.50)'
                    }
                  }}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 px-4 py-4 space-y-1">
          {/* User */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: '#1B2D5B' }}
            >
              {userName?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{userName ?? 'Admin'}</div>
              <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {userEmail ?? ''}
              </div>
            </div>
          </div>

          {/* Abmelden */}
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
            style={{ color: 'rgba(255,255,255,0.40)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.90)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.40)'
            }}
          >
            <LogOut size={13} />
            <span>Abmelden</span>
          </button>

          {/* Zur Website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
            style={{ color: 'rgba(255,255,255,0.30)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.60)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.30)'
            }}
          >
            <ExternalLink size={12} />
            <span>Zur Website</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
