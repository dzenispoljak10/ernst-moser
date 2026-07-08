'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, X } from 'lucide-react'

export interface PopupFormData {
  title: string
  heading: string
  body: string
  ctaLabel: string
  ctaUrl: string
  target: string
  delaySeconds: string
  autoCloseSeconds: string
  reappearDays: string
  isActive: boolean
  order: string
  imageUrl: string
  imageAssetId: string
}

interface Props {
  defaultValues?: Partial<PopupFormData>
  popupId?: string
}

const TARGETS = [
  { value: 'all', label: 'Ganze Website' },
  { value: 'home', label: 'Nur Startseite' },
  { value: 'nutzfahrzeugcenter', label: 'Nutzfahrzeugcenter' },
  { value: 'kommunalcenter', label: 'Kommunalcenter' },
  { value: 'motorgeraetecenter', label: 'Motorgerätecenter' },
]

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none transition-all'

function focusStyle(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = '#1B2D5B'
  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(27,45,91,0.15)'
}
function blurStyle(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = '#e5e7eb'
  e.currentTarget.style.boxShadow = 'none'
}

export default function PopupForm({ defaultValues, popupId }: Props) {
  const router = useRouter()
  const isEdit = !!popupId

  const [form, setForm] = useState<PopupFormData>({
    title: defaultValues?.title ?? '',
    heading: defaultValues?.heading ?? '',
    body: defaultValues?.body ?? '',
    ctaLabel: defaultValues?.ctaLabel ?? '',
    ctaUrl: defaultValues?.ctaUrl ?? '',
    target: defaultValues?.target ?? 'all',
    delaySeconds: defaultValues?.delaySeconds ?? '3',
    autoCloseSeconds: defaultValues?.autoCloseSeconds ?? '0',
    reappearDays: defaultValues?.reappearDays ?? '30',
    isActive: defaultValues?.isActive ?? false,
    order: defaultValues?.order ?? '0',
    imageUrl: defaultValues?.imageUrl ?? '',
    imageAssetId: defaultValues?.imageAssetId ?? '',
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof PopupFormData>(field: K, value: PopupFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        set('imageUrl', data.url)
        set('imageAssetId', data.assetId ?? '')
      } else setError('Bild-Upload fehlgeschlagen.')
    } catch {
      setError('Bild-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/admin/popups/${popupId}` : '/api/admin/popups'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          heading: form.heading,
          body: form.body,
          ctaLabel: form.ctaLabel,
          ctaUrl: form.ctaUrl,
          target: form.target,
          delaySeconds: Number(form.delaySeconds) || 0,
          autoCloseSeconds: Number(form.autoCloseSeconds) || 0,
          reappearDays: Number(form.reappearDays) || 0,
          isActive: form.isActive,
          order: Number(form.order) || 0,
          imageAssetId: form.imageAssetId || undefined,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Speichern fehlgeschlagen.')
      }
      router.push('/admin/popups')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <X size={14} />
          {error}
        </div>
      )}

      {/* Inhalt */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Inhalt</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Interner Name * <span className="text-gray-400 font-normal">(nicht öffentlich)</span></label>
            <input className={inputCls} value={form.title} required onChange={(e) => set('title', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Überschrift</label>
            <input className={inputCls} value={form.heading} onChange={(e) => set('heading', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Text</label>
            <textarea className={inputCls} rows={4} value={form.body} onChange={(e) => set('body', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
        </div>
      </div>

      {/* Bild */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Bild (optional)</h3>
        <div className="flex items-center gap-4">
          {form.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.imageUrl} alt="Vorschau" className="w-28 h-16 rounded-lg object-cover border border-gray-100 bg-gray-50" />
          ) : (
            <div className="w-28 h-16 rounded-lg border border-dashed border-gray-200 bg-gray-50" />
          )}
          <div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Bild hochladen'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
            {form.imageUrl && (
              <button type="button" onClick={() => { set('imageUrl', ''); set('imageAssetId', '') }} className="ml-2 text-xs text-gray-400 hover:text-red-500">
                Entfernen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Button (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beschriftung</label>
            <input className={inputCls} value={form.ctaLabel} placeholder="z. B. Mehr erfahren" onChange={(e) => set('ctaLabel', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Link</label>
            <input className={inputCls} value={form.ctaUrl} placeholder="/kontakt oder https://…" onChange={(e) => set('ctaUrl', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
        </div>
      </div>

      {/* Anzeige & Timing */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Anzeige & Timing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Wo anzeigen?</label>
            <select className={inputCls} value={form.target} onChange={(e) => set('target', e.target.value)} onFocus={focusStyle} onBlur={blurStyle}>
              {TARGETS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Verzögerung bis Einblenden (Sek.)</label>
            <input type="number" min={0} className={inputCls} value={form.delaySeconds} onChange={(e) => set('delaySeconds', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Auto-Schliessen nach (Sek., 0 = aus)</label>
            <input type="number" min={0} className={inputCls} value={form.autoCloseSeconds} onChange={(e) => set('autoCloseSeconds', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Erneut anzeigen nach (Tagen)</label>
            <input type="number" min={0} className={inputCls} value={form.reappearDays} onChange={(e) => set('reappearDays', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reihenfolge</label>
            <input type="number" className={inputCls} value={form.order} onChange={(e) => set('order', e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => set('isActive', !form.isActive)}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-gray-700">Aktiv (auf Website anzeigen)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Aktionen */}
      <div className="flex items-center gap-3">
        <button
          type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-70"
          style={{ background: '#1B2D5B' }}
        >
          <Save size={15} />
          {saving ? 'Speichern…' : 'Speichern'}
        </button>
        <button type="button" onClick={() => router.push('/admin/popups')} className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
          Abbrechen
        </button>
      </div>
    </form>
  )
}
