'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  userName?: string | null
}

export default function TopBar({ userName }: TopBarProps) {
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
    <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shrink-0">
      <h1
        className="text-xl font-bold text-gray-900"
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        {getTitle(pathname)}
      </h1>
      <div className="flex items-center gap-4">
        {now && (
          <span className="text-sm text-gray-400 hidden sm:block">{now}</span>
        )}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
          style={{ background: '#1B2D5B' }}
        >
          {userName?.charAt(0)?.toUpperCase() ?? 'A'}
        </div>
      </div>
    </div>
  )
}
