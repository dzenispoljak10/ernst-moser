/**
 * Kern der Text-Bearbeitung: Jeder String, der als `children` gerendert wird,
 * wird in <OvText s="…"/> verpackt. OvText gibt einfach den (ggf. im Admin
 * geänderten) Text zurück — ohne eigenes DOM-Element. Das HTML-Gerüst und
 * damit das Layout bleiben dadurch exakt gleich; nur der Textinhalt ändert sich.
 *
 * Wird über tsconfig "jsxImportSource" automatisch für alle Dateien in src/
 * verwendet — Komponenten müssen dafür nicht angepasst werden.
 */
import { jsx as reactJsx } from 'react/jsx-runtime'
import OvText from './OvText'

// Elemente, deren Kinder zwingend reine Strings sein müssen.
const SKIP = new Set([
  'option', 'title', 'textarea', 'style', 'script', 'noscript', 'template', 'html', 'head',
])

function isText(c: unknown): c is string {
  return typeof c === 'string' && c.trim() !== ''
}

function wrapArray(arr: unknown[], depth: number): unknown[] {
  let changed = false
  const out = arr.map((c, i) => {
    if (isText(c)) {
      changed = true
      return reactJsx(OvText, { s: c }, '__ov' + i)
    }
    if (depth < 2 && Array.isArray(c)) {
      const w = wrapArray(c, depth + 1)
      if (w !== c) changed = true
      return w
    }
    return c
  })
  return changed ? out : arr
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapProps(type: unknown, props: any): any {
  if (!props || type === OvText) return props
  if (typeof type === 'string' && SKIP.has(type)) return props
  const ch = props.children
  if (ch == null) return props
  if (typeof ch === 'string') {
    if (!isText(ch)) return props
    return { ...props, children: reactJsx(OvText, { s: ch }) }
  }
  if (Array.isArray(ch)) {
    const w = wrapArray(ch, 0)
    return w === ch ? props : { ...props, children: w }
  }
  return props
}
