'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, RotateCcw, MousePointerClick } from 'lucide-react'
import { adminFetch } from '@/lib/admin/api-client'

export interface TextRow {
  _id: string
  page: string
  original: string
  text: string
  _updatedAt?: string
}

function fmt(d?: string) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleString('de-CH', { dateStyle: 'short', timeStyle: 'short' })
  } catch {
    return ''
  }
}

export default function TextsClient({ texts }: { texts: TextRow[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const [q, setQ] = useState('')

  async function reset(t: TextRow) {
    if (!confirm(`Originaltext wiederherstellen?\n\n„${t.original}“`)) return
    setBusy(t._id)
    try {
      await adminFetch('/api/admin/texts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: t._id }),
      })
      router.refresh()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Zurücksetzen fehlgeschlagen.')
    } finally {
      setBusy(null)
    }
  }

  const needle = q.trim().toLowerCase()
  const list = needle
    ? texts.filter((t) => [t.page, t.original, t.text].some((v) => v?.toLowerCase().includes(needle)))
    : texts

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 max-w-3xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#EEF2FF' }}>
            <MousePointerClick size={18} color="#1B2D5B" />
          </div>
          <div className="flex-1">
            <h2 className="text-[14px] font-semibold text-gray-800 mb-1">Texte direkt auf der Website bearbeiten</h2>
            <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3">
              Öffnet die Website im Bearbeitungsmodus. Fahren Sie mit der Maus über einen Text – er wird blau
              umrandet. Anklicken, Text ändern, speichern. Die Änderung ist sofort live; Layout und Design
              bleiben unverändert. Zum Navigieren oder um Menüs zu öffnen, unten in der Leiste auf „pausieren“ klicken.
            </p>
            <a
              href="/?textedit=1"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all hover:opacity-90"
              style={{ background: '#1B2D5B', color: '#fff' }}
            >
              <ExternalLink size={13} />
              Website im Bearbeitungsmodus öffnen
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <span className="text-[12px] text-gray-400">{texts.length} geänderte Texte</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Suchen…"
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] w-56"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
        {list.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-gray-400">
            {texts.length === 0 ? 'Noch keine Texte geändert – alle Seiten zeigen den Originaltext.' : 'Keine Treffer.'}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Seite</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Original</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Neuer Text</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Geändert</th>
                <th className="px-5 py-3 w-56" />
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t._id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors align-top">
                  <td className="px-5 py-3 text-[12px] text-gray-600 whitespace-nowrap">
                    {t.page === '*' ? (
                      <span className="inline-flex text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">Alle Seiten</span>
                    ) : (
                      t.page
                    )}
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-400 max-w-xs">{t.original}</td>
                  <td className="px-5 py-3 text-[12.5px] text-gray-800 max-w-xs">{t.text}</td>
                  <td className="px-5 py-3 text-[11px] text-gray-400 hidden lg:table-cell whitespace-nowrap">{fmt(t._updatedAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      {t.page !== '*' && (
                        <a
                          href={`${t.page}?textedit=1`}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                          <ExternalLink size={12} /> Seite öffnen
                        </a>
                      )}
                      <button
                        onClick={() => reset(t)}
                        disabled={busy === t._id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50"
                      >
                        <RotateCcw size={12} /> Original
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
