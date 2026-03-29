'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          flex flex-col h-full z-50 transition-transform duration-300 ease-out
          fixed lg:relative shrink-0
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ width: '240px', minWidth: '240px', background: '#0B1220' }}
      >
        {/* Logo */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Ernst Moser GmbH"
                width={110}
                height={28}
                className="object-contain brightness-0 invert"
                unoptimized
                style={{ maxHeight: '28px', width: 'auto' }}
              />
            ) : (
              <span className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
                Ernst Moser GmbH
              </span>
            )}
            <button onClick={onClose} className="lg:hidden text-white/30 hover:text-white/60 transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase mt-2">Admin</div>
        </div>

        <div className="border-t border-white/5 mt-2 mb-1" />

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }, i) => {
            const active = isActive(href, exact)
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.2 }}
              >
                <Link
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all"
                  style={{
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors mb-3"
          >
            <ExternalLink size={11} />
            Zurück zur Website
          </Link>

          <div className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[11px] font-bold shrink-0"
              style={{ background: '#1B2D5B' }}
            >
              {userName?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-white font-medium truncate">{userName ?? 'Admin'}</div>
              <div className="text-[10px] text-white/40 truncate">{userEmail ?? ''}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-white/30 hover:text-white/60 transition-colors shrink-0"
              title="Abmelden"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
