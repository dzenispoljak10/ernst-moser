'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Eye, EyeOff, X, Pencil, Upload, FileText } from 'lucide-react'
import { adminFetch, uploadPdf } from '@/lib/admin/api-client'

interface Job {
  _id: string
  title: string
  kind: 'stelle' | 'lehrstelle'
  center?: string
  centerColor?: string
  type?: string
  pensum?: string
  location?: string
  duration?: string
  description?: string
  pdfUrl?: string
  order?: number
  isActive: boolean
}

const CENTERS = [
  { name: 'Nutzfahrzeugcenter', color: '#1B2D5B' },
  { name: 'Kommunalcenter', color: '#C0392B' },
  { name: 'Motorgerätecenter', color: '#4A7C59' },
]

const EMPTY = {
  kind: 'stelle', title: '', center: 'Nutzfahrzeugcenter',
  type: 'Festanstellung', pensum: '100%', location: 'Gerlafingen SO',
  duration: '3 Jahre', description: '', pdfUrl: '', order: 0,
}

type FormState = typeof EMPTY

function toForm(j: Job): FormState {
  return {
    kind: j.kind,
    title: j.title ?? '',
    center: j.center ?? 'Nutzfahrzeugcenter',
    type: j.type ?? '',
    pensum: j.pensum ?? '',
    location: j.location ?? '',
    duration: j.duration ?? '',
    description: j.description ?? '',
    pdfUrl: j.pdfUrl ?? '',
    order: j.order ?? 0,
  }
}

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  // null = Formular zu, 'new' = neuer Eintrag, sonst _id des bearbeiteten Eintrags
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({ ...EMPTY })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function openNew() {
    setError('')
    setForm({ ...EMPTY, order: jobs.length + 1 })
    setEditing('new')
  }
  function openEdit(j: Job) {
    setError('')
    setForm(toForm(j))
    setEditing(j._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function close() {
    setEditing(null)
    setForm({ ...EMPTY })
    setError('')
  }

  async function run(id: string, fn: () => Promise<unknown>) {
    setBusy(id)
    setError('')
    try {
      await fn()
      router.refresh()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aktion fehlgeschlagen.')
      return false
    } finally {
      setBusy(null)
    }
  }

  async function toggle(j: Job) {
    await run(j._id, () =>
      adminFetch(`/api/admin/jobs/${j._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !j.isActive }),
      })
    )
  }
  async function del(j: Job) {
    if (!confirm(`«${j.title}» wirklich löschen?`)) return
    await run(j._id, () => adminFetch(`/api/admin/jobs/${j._id}`, { method: 'DELETE' }))
  }

  async function handlePdf(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await uploadPdf(file)
      setForm((f) => ({ ...f, pdfUrl: url }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !editing) return
    const center = CENTERS.find((c) => c.name === form.center)
    const payload = { ...form, title: form.title.trim(), order: Number(form.order) || 0, centerColor: center?.color }
    const ok =
      editing === 'new'
        ? await run('form', () =>
            adminFetch('/api/admin/jobs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...payload, isActive: false }),
            })
          )
        : await run('form', () =>
            adminFetch(`/api/admin/jobs/${editing}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
          )
    if (ok) close()
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] focus:outline-none focus:border-gray-400'

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-[12px] text-gray-400">{jobs.length} Einträge ({jobs.filter(j => j.isActive).length} aktiv)</span>
        <button
          onClick={() => (editing ? close() : openNew())}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-white transition-all hover:opacity-90"
          style={{ background: '#1B2D5B' }}
        >
          {editing ? <X size={13} /> : <Plus size={13} />}
          {editing ? 'Abbrechen' : 'Stelle / Lehrstelle hinzufügen'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <X size={14} />
          {error}
        </div>
      )}

      {editing && (
        <form onSubmit={submit} className="bg-white rounded-xl border border-gray-100 p-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2 text-[13px] font-semibold text-gray-800">
            {editing === 'new' ? 'Neuer Eintrag' : 'Eintrag bearbeiten'}
          </div>
          <label className="text-[12px] text-gray-500">Typ
            <select className={inputCls} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
              <option value="stelle">Stelle</option>
              <option value="lehrstelle">Lehrstelle</option>
            </select>
          </label>
          <label className="text-[12px] text-gray-500">Center
            <select className={inputCls} value={form.center} onChange={(e) => setForm({ ...form, center: e.target.value })}>
              {CENTERS.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </label>
          <label className="text-[12px] text-gray-500 sm:col-span-2">Titel *
            <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          {form.kind === 'stelle' ? (
            <>
              <label className="text-[12px] text-gray-500">Anstellung
                <input className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              </label>
              <label className="text-[12px] text-gray-500">Pensum
                <input className={inputCls} value={form.pensum} onChange={(e) => setForm({ ...form, pensum: e.target.value })} />
              </label>
              <label className="text-[12px] text-gray-500">Ort
                <input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </label>
            </>
          ) : (
            <label className="text-[12px] text-gray-500">Dauer
              <input className={inputCls} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </label>
          )}
          <label className="text-[12px] text-gray-500">Reihenfolge
            <input type="number" className={inputCls} value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
          </label>
          <label className="text-[12px] text-gray-500 sm:col-span-2">Beschreibung
            <textarea className={inputCls} rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="text-[12px] text-gray-500 sm:col-span-2">
            Stellenbeschrieb (PDF oder Link)
            <div className="flex flex-col sm:flex-row gap-2 mt-0.5">
              <input
                className={inputCls}
                placeholder="https://… (optional)"
                value={form.pdfUrl}
                onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
              />
              <label className="shrink-0 cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-700 hover:bg-gray-50">
                <Upload size={13} />
                {uploading ? 'Wird hochgeladen…' : 'PDF hochladen'}
                <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdf} disabled={uploading} />
              </label>
            </div>
            {form.pdfUrl && (
              <a href={form.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-1.5 text-[#1B2D5B] underline">
                <FileText size={12} /> Aktuelles Dokument ansehen
              </a>
            )}
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy === 'form' || uploading} className="px-4 py-2 rounded-lg text-[13px] font-medium text-white disabled:opacity-50" style={{ background: '#1B2D5B' }}>
              {busy === 'form' ? 'Speichern…' : editing === 'new' ? 'Hinzufügen (inaktiv)' : 'Änderungen speichern'}
            </button>
            {editing === 'new' && (
              <span className="text-[11px] text-gray-400">Neue Einträge sind standardmässig inaktiv – erst nach dem Aktivieren öffentlich sichtbar.</span>
            )}
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
        {jobs.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-gray-400">Noch keine Einträge.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Titel</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Typ</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Center</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="px-5 py-3 w-52" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j._id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-3 text-[13px] font-medium text-gray-800">{j.title}</td>
                  <td className="px-5 py-3 hidden sm:table-cell text-[12px] text-gray-500">{j.kind === 'lehrstelle' ? 'Lehrstelle' : 'Stelle'}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-[12px] text-gray-500">{j.center ?? '—'}</td>
                  <td className="px-5 py-3">
                    {j.isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Aktiv
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Inaktiv (on hold)
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => toggle(j)}
                        disabled={busy === j._id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all disabled:opacity-50 ${j.isActive ? 'text-gray-500 bg-gray-100 hover:bg-gray-200' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                      >
                        {j.isActive ? <><EyeOff size={12} /> Deaktivieren</> : <><Eye size={12} /> Aktivieren</>}
                      </button>
                      <button
                        onClick={() => openEdit(j)}
                        disabled={busy === j._id}
                        className="p-1.5 rounded-md text-gray-300 hover:text-[#1B2D5B] hover:bg-[#EEF2FF] transition-all disabled:opacity-50"
                        title="Bearbeiten"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => del(j)}
                        disabled={busy === j._id}
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
