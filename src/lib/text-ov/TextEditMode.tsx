/** @jsxImportSource react */
'use client'

/**
 * Bearbeitungsmodus für Admins direkt auf der Webseite.
 * Text anklicken -> Panel öffnet sich -> speichern. Die Seite selbst wird dabei
 * nicht verändert (alle Hilfselemente sind position:fixed und liegen darüber).
 * Eigene Texte dieses Panels sind bewusst NICHT bearbeitbar (jsxImportSource react).
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MutableRefObject } from 'react'
import type { LocalEdit } from './TextOverrideProvider'

type Effective = { global: Record<string, string>; pages: Record<string, Record<string, string>> }

interface Props {
  pathname: string
  effective: Effective
  registry: MutableRefObject<Map<string, number>>
  setEditing: (v: boolean) => void
  applyLocal: (e: LocalEdit) => void
  onExit: () => void
}

interface Target {
  node: Text
  original: string | null // null = nicht bearbeitbar
  displayed: string
}

const UI_ATTR = 'data-em-textedit-ui'
const Z = 2147483000

function rectsOf(node: Text): DOMRect[] {
  const r = document.createRange()
  r.selectNodeContents(node)
  return Array.from(r.getClientRects())
}

function boundsOf(node: Text): DOMRect | null {
  const r = document.createRange()
  r.selectNodeContents(node)
  const b = r.getBoundingClientRect()
  return b.width || b.height ? b : null
}

function hits(node: Text, x: number, y: number): boolean {
  if (!node.data.trim()) return false
  return rectsOf(node).some((r) => x >= r.left - 1 && x <= r.right + 1 && y >= r.top - 1 && y <= r.bottom + 1)
}

function isUi(n: Node | null): boolean {
  const el = n && (n.nodeType === 1 ? (n as Element) : n.parentElement)
  return !!el?.closest(`[${UI_ATTR}]`)
}

/** Findet den Textknoten unter dem Mauszeiger (auch unter transparenten Overlays). */
function textNodeAt(x: number, y: number): Text | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = document as any
  let node: Node | null = null
  try {
    if (typeof d.caretPositionFromPoint === 'function') node = d.caretPositionFromPoint(x, y)?.offsetNode ?? null
    else if (typeof d.caretRangeFromPoint === 'function') node = d.caretRangeFromPoint(x, y)?.startContainer ?? null
  } catch { /* ignore */ }
  if (node && node.nodeType === 3 && !isUi(node) && hits(node as Text, x, y)) return node as Text

  for (const el of document.elementsFromPoint(x, y).slice(0, 12)) {
    if (isUi(el)) continue
    for (const c of Array.from(el.childNodes)) {
      if (c.nodeType === 3 && hits(c as Text, x, y)) return c as Text
    }
  }
  return null
}

export default function TextEditMode({ pathname, effective, registry, setEditing, applyLocal, onExit }: Props) {
  const [auth, setAuth] = useState<'checking' | 'ok' | 'denied'>('checking')
  const [active, setActive] = useState(true)
  const [hover, setHover] = useState<{ rect: DOMRect; editable: boolean } | null>(null)
  const [sel, setSel] = useState<Target | null>(null)
  const [selRect, setSelRect] = useState<DOMRect | null>(null)
  const [value, setValue] = useState('')
  const [everywhere, setEverywhere] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [barH, setBarH] = useState(48)
  const effRef = useRef(effective)
  effRef.current = effective

  // Original-Texte registrieren lassen
  useEffect(() => {
    setEditing(true)
    return () => setEditing(false)
  }, [setEditing])

  // Anmeldung prüfen
  useEffect(() => {
    fetch('/api/admin/texts?check=1', { cache: 'no-store' })
      .then((r) => setAuth(r.ok ? 'ok' : 'denied'))
      .catch(() => setAuth('denied'))
  }, [])

  // Panel schliessen bei Seitenwechsel
  useEffect(() => { setSel(null); setMsg(null) }, [pathname])

  const resolveFor = useCallback(
    (s: string) => {
      const e = effRef.current
      const p = e.pages[pathname]?.[s]
      if (p !== undefined) return p
      const g = e.global[s]
      return g !== undefined ? g : s
    },
    [pathname]
  )

  /** Ermittelt den Originaltext zum angezeigten Text. */
  const findOriginal = useCallback(
    (displayed: string): string | null => {
      const reg = registry.current
      if (reg.has(displayed) && resolveFor(displayed) === displayed) return displayed
      const e = effRef.current
      for (const [orig, txt] of Object.entries(e.pages[pathname] ?? {})) {
        if (txt === displayed && reg.has(orig)) return orig
      }
      for (const [orig, txt] of Object.entries(e.global)) {
        if (txt === displayed && reg.has(orig) && resolveFor(orig) === displayed) return orig
      }
      for (const orig of reg.keys()) if (resolveFor(orig) === displayed) return orig
      return null
    },
    [registry, resolveFor, pathname]
  )

  const enabled = auth === 'ok' && active

  // Hover-Markierung
  useEffect(() => {
    if (!enabled) { setHover(null); return }
    let raf = 0
    const onMove = (ev: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (isUi(ev.target as Node)) { setHover(null); return }
        const n = textNodeAt(ev.clientX, ev.clientY)
        const b = n && boundsOf(n)
        setHover(n && b ? { rect: b, editable: findOriginal(n.data) !== null } : null)
      })
    }
    const onScroll = () => setHover(null)
    window.addEventListener('mousemove', onMove, true)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove, true)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [enabled, findOriginal])

  // Klick abfangen (Links/Buttons lösen im Bearbeiten-Modus nichts aus)
  useEffect(() => {
    if (!enabled) return
    const swallow = (ev: Event) => {
      if (isUi(ev.target as Node)) return
      ev.preventDefault()
      ev.stopPropagation()
      ev.stopImmediatePropagation()
    }
    const onClick = (ev: MouseEvent) => {
      if (isUi(ev.target as Node)) return
      swallow(ev)
      const n = textNodeAt(ev.clientX, ev.clientY)
      if (!n) return
      const original = findOriginal(n.data)
      if (barRef.current) setBarH(barRef.current.offsetHeight)
      setSel({ node: n, original, displayed: n.data })
      setSelRect(boundsOf(n))
      setValue(n.data)
      const isGlobalNow =
        original !== null &&
        effRef.current.pages[pathname]?.[original] === undefined &&
        effRef.current.global[original] !== undefined
      const inChrome = !!(n.parentElement?.closest('header, footer, nav'))
      setEverywhere(isGlobalNow || inChrome)
      setMsg(null)
    }
    window.addEventListener('click', onClick, true)
    window.addEventListener('auxclick', swallow, true)
    window.addEventListener('submit', swallow, true)
    return () => {
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('auxclick', swallow, true)
      window.removeEventListener('submit', swallow, true)
    }
  }, [enabled, findOriginal, pathname])

  // Markierung der Auswahl beim Scrollen mitführen
  useEffect(() => {
    if (!sel) return
    const upd = () => setSelRect(sel.node.isConnected ? boundsOf(sel.node) : null)
    window.addEventListener('scroll', upd, true)
    window.addEventListener('resize', upd)
    return () => {
      window.removeEventListener('scroll', upd, true)
      window.removeEventListener('resize', upd)
    }
  }, [sel])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const original = sel?.original ?? null
  const pageOverride = original !== null ? effective.pages[pathname]?.[original] : undefined
  const globalOverride = original !== null ? effective.global[original] : undefined
  const isChanged = pageOverride !== undefined || globalOverride !== undefined
  const cleaned = value.replace(/\s*\n\s*/g, ' ')

  async function save() {
    if (original === null) return
    if (!cleaned.trim()) { setMsg({ type: 'err', text: 'Der Text darf nicht leer sein.' }); return }
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/texts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname, original, text: cleaned, everywhere }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || `Fehler ${res.status}`)
      if (everywhere) {
        applyLocal({ page: '*', original, text: cleaned })
        if (pageOverride !== undefined) applyLocal({ page: pathname, original, text: null })
      } else {
        applyLocal({ page: pathname, original, text: cleaned })
      }
      setMsg({ type: 'ok', text: 'Gespeichert – ist jetzt live.' })
      setSel(null)
    } catch (e) {
      setMsg({ type: 'err', text: 'Speichern fehlgeschlagen: ' + (e as Error).message })
    } finally {
      setBusy(false)
    }
  }

  async function reset() {
    if (original === null || !isChanged) return
    const page = pageOverride !== undefined ? pathname : '*'
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/texts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, original }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || `Fehler ${res.status}`)
      applyLocal({ page, original, text: null })
      setMsg({ type: 'ok', text: 'Originaltext wiederhergestellt.' })
      setSel(null)
    } catch (e) {
      setMsg({ type: 'err', text: 'Zurücksetzen fehlgeschlagen: ' + (e as Error).message })
    } finally {
      setBusy(false)
    }
  }

  const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  const btn = (bg: string, fg = '#fff'): CSSProperties => ({
    background: bg, color: fg, border: 'none', borderRadius: 8, padding: '8px 14px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font, lineHeight: 1.2,
  })

  return (
    <div {...{ [UI_ATTR]: '' }} style={{ fontFamily: font }}>
      {/* Hover-Rahmen */}
      {enabled && hover && !sel && (
        <div
          style={{
            position: 'fixed', zIndex: Z, pointerEvents: 'none',
            left: hover.rect.left - 3, top: hover.rect.top - 3,
            width: hover.rect.width + 6, height: hover.rect.height + 6,
            border: `2px ${hover.editable ? 'solid #2563eb' : 'dashed #9ca3af'}`,
            background: hover.editable ? 'rgba(37,99,235,0.08)' : 'transparent',
            borderRadius: 4,
          }}
        />
      )}
      {/* Auswahl-Rahmen */}
      {sel && selRect && (
        <div
          style={{
            position: 'fixed', zIndex: Z, pointerEvents: 'none',
            left: selRect.left - 3, top: selRect.top - 3,
            width: selRect.width + 6, height: selRect.height + 6,
            border: '2px solid #f59e0b', background: 'rgba(245,158,11,0.12)', borderRadius: 4,
          }}
        />
      )}

      {/* Bearbeitungs-Panel */}
      {sel && (
        <div
          style={{
            position: 'fixed', zIndex: Z + 2, right: 16, bottom: barH + 28, width: 'min(420px, calc(100vw - 32px))',
            background: '#fff', color: '#111827', borderRadius: 12, padding: 16,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: '1px solid #e5e7eb', fontSize: 13,
            maxHeight: `calc(100vh - ${barH + 44}px)`, overflowY: 'auto', textAlign: 'left',
          }}
        >
          {original === null ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Dieser Text ist hier nicht bearbeitbar</div>
              <div style={{ color: '#4b5563', lineHeight: 1.5, marginBottom: 12 }}>
                «{sel.displayed.length > 120 ? sel.displayed.slice(0, 120) + '…' : sel.displayed}»
                <br />
                Er stammt nicht aus dem Seitentext (z.B. eingebettete Inhalte). Inhalte wie
                Markenbeschreibungen, Produkte oder Team können im Admin-Bereich gepflegt werden.
              </div>
              <button style={btn('#6b7280')} onClick={() => setSel(null)}>Schliessen</button>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Text bearbeiten</div>
              {isChanged && (
                <div style={{ background: '#f3f4f6', borderRadius: 8, padding: '8px 10px', marginBottom: 10, lineHeight: 1.45 }}>
                  <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, marginBottom: 2 }}>ORIGINAL</div>
                  {original}
                </div>
              )}
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                rows={Math.min(10, Math.max(2, Math.ceil(value.length / 45)))}
                style={{
                  width: '100%', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: 8,
                  padding: '8px 10px', fontSize: 14, fontFamily: font, lineHeight: 1.45, resize: 'vertical',
                  color: '#111827', background: '#fff',
                }}
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save() }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', margin: '4px 0 10px' }}>
                <span>{cleaned.length} Zeichen (Original: {original.length})</span>
                {/^\d+$/.test(original) && !/^\d+$/.test(cleaned.replace(/['’\s]/g, '')) && (
                  <span style={{ color: '#b45309' }}>Animierte Zahlen: bitte nur Ziffern</span>
                )}
                {cleaned.length > original.length * 1.3 + 5 && (
                  <span style={{ color: '#b45309' }}>Deutlich länger – braucht evtl. mehr Platz</span>
                )}
              </div>
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 14, cursor: 'pointer', lineHeight: 1.4 }}>
                <input type="checkbox" checked={everywhere} onChange={(e) => setEverywhere(e.target.checked)} style={{ marginTop: 2 }} />
                <span>
                  Auf <b>allen Seiten</b> ändern, wo genau dieser Text vorkommt
                  <span style={{ display: 'block', color: '#6b7280', fontSize: 11 }}>
                    Sonst nur auf dieser Seite ({pathname})
                  </span>
                </span>
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={{ ...btn('#2563eb'), opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={save}>
                  {busy ? 'Speichert…' : 'Speichern'}
                </button>
                <button style={btn('#e5e7eb', '#111827')} disabled={busy} onClick={() => setSel(null)}>Abbrechen</button>
                {isChanged && (
                  <button style={{ ...btn('#fff', '#b91c1c'), border: '1px solid #fecaca' }} disabled={busy} onClick={reset}>
                    Original wiederherstellen
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Leiste unten */}
      <div
        ref={barRef}
        style={{
          position: 'fixed', zIndex: Z + 1, left: 16, right: 16, bottom: 16, margin: '0 auto', width: 'fit-content',
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center',
          background: '#111827', color: '#fff', borderRadius: 12, padding: '10px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)', fontSize: 13, maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <span style={{ fontWeight: 700 }}>✎ Textbearbeitung</span>
        {auth === 'checking' && <span style={{ color: '#9ca3af' }}>Prüfe Anmeldung…</span>}
        {auth === 'denied' && (
          <>
            <span style={{ color: '#fca5a5' }}>Nicht angemeldet.</span>
            <button style={btn('#2563eb')} onClick={() => { window.location.href = '/admin/login' }}>Anmelden</button>
          </>
        )}
        {auth === 'ok' && (
          <>
            <button style={btn(active ? '#16a34a' : '#4b5563')} onClick={() => { setActive((a) => !a); setSel(null) }}>
              {active ? 'Text anklicken zum Bearbeiten' : 'Pausiert – Seite normal bedienen'}
            </button>
            <span style={{ color: '#9ca3af', fontSize: 11 }}>
              {active ? 'Zum Navigieren / Menüs öffnen: pausieren' : 'Wieder einschalten zum Bearbeiten'}
            </span>
          </>
        )}
        {msg && <span style={{ color: msg.type === 'ok' ? '#86efac' : '#fca5a5' }}>{msg.text}</span>}
        <button style={btn('#374151')} onClick={() => { window.location.href = '/admin/texts' }}>Zum Admin</button>
        <button style={btn('#374151')} onClick={onExit}>Beenden</button>
      </div>
    </div>
  )
}
