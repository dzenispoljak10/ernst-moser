'use client'

import React from 'react'
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
  ArrowLeft,
  X,
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  exact?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

const SECTIONS: NavSection[] = [
  {
    label: 'Übersicht',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Verwaltung',
    items: [
      { href: '/admin/team', label: 'Teammitglieder', icon: Users },
      { href: '/admin/brands', label: 'Marken', icon: Tag },
      { href: '/admin/salesperson', label: 'Verkäufer', icon: UserCheck },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
    ],
  },
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
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          flex flex-col h-full z-50 transition-transform duration-300 ease-out
          fixed lg:relative shrink-0 bg-white border-r border-gray-100
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ width: '220px', minWidth: '220px' }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Ernst Moser GmbH"
                width={100}
                height={24}
                className="object-contain"
                unoptimized
                style={{ maxHeight: '24px', width: 'auto' }}
              />
            ) : (
              <span
                className="text-gray-900 font-bold text-sm"
                style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
              >
                Ernst Moser GmbH
              </span>
            )}
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
              <X size={15} />
            </button>
          </div>
          <div className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mt-1">Admin</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pb-2">
          {SECTIONS.map((section) => (
            <div key={section.label} className="mt-5">
              <div className="px-4 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.1em]">
                {section.label}
              </div>
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`mx-2 flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] transition-colors ${
                      active
                        ? 'bg-[#EEF2FF] text-[#1B2D5B] font-medium'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={15} className="shrink-0" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto border-t border-gray-100 p-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition-colors mb-3"
          >
            <ArrowLeft size={11} />
            Zur Website
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#1B2D5B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {userName?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-gray-700 truncate">{userName ?? 'Admin'}</div>
              <div className="text-[10px] text-gray-400 truncate">{userEmail ?? ''}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
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
