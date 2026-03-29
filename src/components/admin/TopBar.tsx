'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/admin': { title: 'Dashboard', subtitle: 'Übersicht & Schnellzugriff' },
  '/admin/team': { title: 'Teammitglieder', subtitle: 'Alle Mitglieder verwalten' },
  '/admin/team/new': { title: 'Neues Mitglied', subtitle: 'Teammitglied hinzufügen' },
  '/admin/brands': { title: 'Marken', subtitle: 'Logos und Center-Zuordnung' },
  '/admin/salesperson': { title: 'Verkäufer', subtitle: 'Ansprechpartner verwalten' },
  '/admin/settings': { title: 'Einstellungen', subtitle: 'Konto und System' },
}

function getMeta(pathname: string) {
  if (PAGE_META[pathname]) return PAGE_META[pathname]
  if (pathname.startsWith('/admin/team/')) return { title: 'Mitglied bearbeiten', subtitle: 'Daten aktualisieren' }
  if (pathname.startsWith('/admin/brands/')) return { title: 'Marke bearbeiten', subtitle: 'Daten aktualisieren' }
  if (pathname.startsWith('/admin/salesperson/')) return { title: 'Verkäufer bearbeiten', subtitle: 'Daten aktualisieren' }
  return { title: 'Admin', subtitle: '' }
}

interface TopBarProps {
  onMenuOpen: () => void
}

export default function TopBar({ onMenuOpen }: TopBarProps) {
  const pathname = usePathname()
  const [now, setNow] = useState('')
  const meta = getMeta(pathname)

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
    <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1
            className="text-[20px] font-bold text-gray-900 leading-tight"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="text-[13px] text-gray-400 mt-0.5">{meta.subtitle}</p>
          )}
        </div>
      </div>
      {now && (
        <span className="text-[12px] text-gray-400 hidden sm:block">{now}</span>
      )}
    </div>
  )
}
