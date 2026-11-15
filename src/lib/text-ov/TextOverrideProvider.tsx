'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { TextOvContext, type TextOvCtx } from './context'
import { normalizePath, type TextOverrideData } from './types'

const TextEditMode = dynamic(() => import('./TextEditMode'), { ssr: false })

export const EDIT_FLAG = 'em_textedit'

export interface LocalEdit {
  page: string // Pfad oder "*"
  original: string
  text: string | null // null = gelöscht (Original wiederhergestellt)
}

export default function TextOverrideProvider({
  data,
  children,
}: {
  data: TextOverrideData
  children: ReactNode
}) {
  const pathname = normalizePath(usePathname() || '/')
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  // Änderungen aus dem Bearbeitungsmodus, sofort sichtbar (ohne Neuladen).
  // Sie liegen über den Server-Daten und sind immer der neueste Stand.
  const [local, setLocal] = useState<LocalEdit[]>([])
  const [editing, setEditing] = useState(false)
  const [editModeLoaded, setEditModeLoaded] = useState(false)
  const registry = useRef(new Map<string, number>())

  const effective = useMemo(() => {
    const global = { ...data.global }
    const pages: Record<string, Record<string, string>> = {}
    for (const [p, m] of Object.entries(data.pages)) pages[p] = { ...m }
    for (const e of local) {
      const target = e.page === '*' ? global : (pages[e.page] ??= {})
      if (e.text == null) delete target[e.original]
      else target[e.original] = e.text
    }
    return { global, pages }
  }, [data, local])

  const pageMap = effective.pages[pathname]
  const globalMap = effective.global

  const resolve = useCallback(
    (s: string) => {
      if (isAdmin) return s
      const p = pageMap?.[s]
      if (p !== undefined) return p
      const g = globalMap[s]
      return g !== undefined ? g : s
    },
    [isAdmin, pageMap, globalMap]
  )

  const register = useCallback((s: string) => {
    const m = registry.current
    m.set(s, (m.get(s) ?? 0) + 1)
    return () => {
      const n = (m.get(s) ?? 1) - 1
      if (n <= 0) m.delete(s)
      else m.set(s, n)
    }
  }, [])

  // Bearbeitungsmodus: per ?textedit=1 (Link im Admin) aktivieren, gilt für diesen Tab
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.get('textedit') === '1') {
        sessionStorage.setItem(EDIT_FLAG, '1')
        url.searchParams.delete('textedit')
        window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
      }
      if (sessionStorage.getItem(EDIT_FLAG) === '1') setEditModeLoaded(true)
    } catch { /* ignore */ }
  }, [])

  const ctx = useMemo<TextOvCtx>(() => ({ resolve, editing, register }), [resolve, editing, register])

  return (
    <TextOvContext.Provider value={ctx}>
      {children}
      {editModeLoaded && !isAdmin && (
        <TextEditMode
          pathname={pathname}
          effective={effective}
          registry={registry}
          setEditing={setEditing}
          applyLocal={(e: LocalEdit) => setLocal((l) => [...l, e])}
          onExit={() => {
            try { sessionStorage.removeItem(EDIT_FLAG) } catch { /* ignore */ }
            setEditing(false)
            setEditModeLoaded(false)
          }}
        />
      )}
    </TextOvContext.Provider>
  )
}
