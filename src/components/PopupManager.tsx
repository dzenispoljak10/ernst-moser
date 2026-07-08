'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { X } from 'lucide-react'

interface Popup {
  id: string
  rev: string
  heading: string
  body: string
  imageUrl: string | null
  ctaLabel: string
  ctaUrl: string
  target: string
  delaySeconds: number
  autoCloseSeconds: number
  reappearDays: number
}

function matchesPath(target: string, pathname: string): boolean {
  if (target === 'all') return true
  if (target === 'home') return pathname === '/'
  // Center-Slug
  return pathname === `/${target}` || pathname.startsWith(`/${target}/`)
}

function isSuppressed(p: Popup): boolean {
  try {
    const raw = localStorage.getItem(`em_popup_${p.id}`)
    if (!raw) return false
    const { rev, ts } = JSON.parse(raw) as { rev?: string; ts?: number }
    // Inhalt geändert → wieder anzeigen
    if (rev !== p.rev) return false
    // reappearDays == 0 → nie wieder anzeigen
    if (!p.reappearDays) return true
    const ageDays = (Date.now() - (ts ?? 0)) / (1000 * 60 * 60 * 24)
    return ageDays < p.reappearDays
  } catch {
    return false
  }
}

export default function PopupManager() {
  const pathname = usePathname()
  const [active, setActive] = useState<Popup | null>(null)
  const [visible, setVisible] = useState(false)

  // Auf Admin-Seiten nie anzeigen
  const onAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    if (onAdmin) return
    let cancelled = false
    let showTimer: ReturnType<typeof setTimeout> | undefined

    ;(async () => {
      try {
        const res = await fetch('/api/popups')
        if (!res.ok) return
        const popups: Popup[] = await res.json()
        if (cancelled) return
        const eligible = popups.find((p) => matchesPath(p.target, pathname) && !isSuppressed(p))
        if (!eligible) return
        showTimer = setTimeout(() => {
          if (!cancelled) {
            setActive(eligible)
            setVisible(true)
          }
        }, Math.max(0, eligible.delaySeconds) * 1000)
      } catch {
        // still – kein Pop-up
      }
    })()

    return () => {
      cancelled = true
      if (showTimer) clearTimeout(showTimer)
    }
  }, [pathname, onAdmin])

  // Auto-Schliessen
  useEffect(() => {
    if (!visible || !active?.autoCloseSeconds) return
    const t = setTimeout(() => close(), active.autoCloseSeconds * 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, active])

  function remember(p: Popup) {
    try {
      localStorage.setItem(`em_popup_${p.id}`, JSON.stringify({ rev: p.rev, ts: Date.now() }))
    } catch {
      // localStorage nicht verfügbar → einfach ignorieren
    }
  }

  function close() {
    if (active) remember(active)
    setVisible(false)
    setTimeout(() => setActive(null), 250)
  }

  if (!active || !visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'emPopupFade 0.25s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', background: '#fff', borderRadius: 18,
          maxWidth: 440, width: '100%', overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.30)', animation: 'emPopupPop 0.28s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button
          onClick={close}
          aria-label="Schliessen"
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 2,
            width: 32, height: 32, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <X size={16} color="#333" />
        </button>

        {active.imageUrl && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#f3f4f6' }}>
            <Image src={active.imageUrl} alt={active.heading || ''} fill style={{ objectFit: 'cover' }} unoptimized sizes="440px" />
          </div>
        )}

        <div style={{ padding: '24px 24px 26px' }}>
          {active.heading && (
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1B2D5B', fontFamily: 'var(--font-heading, sans-serif)' }}>
              {active.heading}
            </h3>
          )}
          {active.body && (
            <p style={{ margin: active.heading ? '10px 0 0' : 0, fontSize: 14.5, lineHeight: 1.55, color: '#444', whiteSpace: 'pre-line' }}>
              {active.body}
            </p>
          )}
          {active.ctaLabel && active.ctaUrl && (
            <a
              href={active.ctaUrl}
              onClick={() => active && remember(active)}
              style={{
                display: 'inline-block', marginTop: 18, padding: '11px 22px', borderRadius: 12,
                background: '#1B2D5B', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              {active.ctaLabel}
            </a>
          )}
        </div>
      </div>

      <style>{`
        @keyframes emPopupFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes emPopupPop { from { opacity: 0; transform: translateY(12px) scale(0.97) } to { opacity: 1; transform: none } }
      `}</style>
    </div>
  )
}
