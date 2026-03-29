'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/team': 'Teammitglieder',
  '/admin/team/new': 'Neues Mitglied',
  '/admin/brands': 'Marken',
  '/admin/salesperson': 'Verkäufer',
  '/admin/settings': 'Einstellungen',
}

function getTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/admin/team/')) return 'Mitglied bearbeiten'
  if (pathname.startsWith('/admin/brands/')) return 'Marke bearbeiten'
  if (pathname.startsWith('/admin/salesperson/')) return 'Verkäufer bearbeiten'
  return 'Admin'
}

interface TopBarProps {
  onMenuOpen: () => void
}

export default function TopBar({ onMenuOpen }: TopBarProps) {
  const pathname = usePathname()
  const [now, setNow] = useState('')

  useEffect(() => {
    const fmt = () =>
      setNow(
        new Date().toLocaleDateString('de-CH', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      )
    fmt()
    const id = setInterval(fmt, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white border-b border-gray-100/80 px-6 lg:px-8 py-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} />
        </button>
        <h1
          className="text-[18px] font-semibold text-gray-900"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          {getTitle(pathname)}
        </h1>
      </div>
      {now && (
        <span className="text-[12px] text-gray-400 hidden sm:block">
          {now}
        </span>
      )}
    </div>
  )
}
