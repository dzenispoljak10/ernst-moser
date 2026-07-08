'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react'

export interface PopupRow {
  _id: string
  title: string
  heading?: string
  target?: string
  delaySeconds?: number
  autoCloseSeconds?: number
  isActive?: boolean
}

const TARGET_LABELS: Record<string, string> = {
  all: 'Ganze Website',
  home: 'Startseite',
  nutzfahrzeugcenter: 'Nutzfahrzeugcenter',
  kommunalcenter: 'Kommunalcenter',
  motorgeraetecenter: 'Motorgerätecenter',
}

export default function PopupsClient({ popups }: { popups: PopupRow[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)

  async function toggle(p: PopupRow) {
    setBusy(p._id)
    await fetch(`/api/admin/popups/${p._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !p.isActive }),
    })
    setBusy(null)
    router.refresh()
  }

  async function del(p: PopupRow) {
    if (!confirm(`Pop-up „${p.title}“ wirklich löschen?`)) return
    setBusy(p._id)
    await fetch(`/api/admin/popups/${p._id}`, { method: 'DELETE' })
    setBusy(null)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] text-gray-400">{popups.length} Pop-ups ({popups.filter((p) => p.isActive).length} aktiv)</span>
        <Link
          href="/admin/popups/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-white transition-all hover:opacity-90"
          style={{ background: '#1B2D5B' }}
        >
          <Plus size={13} />
          Pop-up hinzufügen
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
        {popups.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-gray-400">Noch keine Pop-ups.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Ziel</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Verzögerung</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="px-5 py-3 w-44" />
              </tr>
            </thead>
            <tbody>
              {popups.map((p) => (
                <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-medium text-gray-800">{p.title}</div>
                    {p.heading && <div className="text-[11px] text-gray-400">{p.heading}</div>}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-[12px] text-gray-500">{TARGET_LABELS[p.target ?? 'all'] ?? p.target}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-[12px] text-gray-500">{p.delaySeconds ?? 0} Sek.</td>
                  <td className="px-5 py-3">
                    {p.isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Aktiv
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Inaktiv
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => toggle(p)}
                        disabled={busy === p._id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all disabled:opacity-50 ${p.isActive ? 'text-gray-500 bg-gray-100 hover:bg-gray-200' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                      >
                        {p.isActive ? <><EyeOff size={12} /> Deaktivieren</> : <><Eye size={12} /> Aktivieren</>}
                      </button>
                      <Link
                        href={`/admin/popups/${p._id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <Pencil size={12} /> Bearbeiten
                      </Link>
                      <button
                        onClick={() => del(p)}
                        disabled={busy === p._id}
                        className="p-1.5 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all disabled:opacity-50"
                        title="Löschen"
                      >
                        <Trash2 size={14} />
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
