'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, X } from 'lucide-react'
import { adminFetch, uploadImage } from '@/lib/admin/api-client'
import { CENTER_OPTIONS } from '@/lib/admin/sanity-admin'

interface Values {
  firstName: string
  lastName: string
  title: string
  phone: string
  email: string
  centers: string[]
  photoUrl: string
  hasAdminPhoto: boolean
}

const inputCls =
  'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#1B2D5B] focus:ring-2 focus:ring-[#1B2D5B]/15 transition-all'

export default function SalespersonForm({ id, defaultValues }: { id: string; defaultValues: Values }) {
  const router = useRouter()
  const [form, setForm] = useState(defaultValues)
  const [photoAssetId, setPhotoAssetId] = useState('')
  const [photoRemoved, setPhotoRemoved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof Values>(k: K, v: Values[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const { url, assetId } = await uploadImage(file)
      set('photoUrl', url)
      setPhotoAssetId(assetId)
      setPhotoRemoved(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Foto-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await adminFetch(`/api/admin/salesperson/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          title: form.title,
          phone: form.phone,
          email: form.email,
          centers: form.centers,
          photoAssetId,
          photoRemoved,
        }),
      })
      router.push('/admin/salesperson')
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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Foto</h3>
        <div className="flex items-center gap-4">
          {form.photoUrl ? (
            <img src={form.photoUrl} alt="Vorschau" className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100" />
          ) : (
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ background: '#1B2D5B' }}>
              {form.firstName?.charAt(0) || '?'}
            </div>
          )}
          <div className="flex flex-col items-start gap-1.5">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={14} />
              {uploading ? 'Wird hochgeladen…' : 'Foto ersetzen'}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} disabled={uploading} />
            </label>
            {(form.hasAdminPhoto || photoAssetId) && !photoRemoved && (
              <button
                type="button"
                onClick={() => {
                  setPhotoAssetId('')
                  setPhotoRemoved(true)
                  set('photoUrl', '')
                }}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Hochgeladenes Foto entfernen (Standardfoto verwenden)
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Angaben</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Vorname *" value={form.firstName} onChange={(v) => set('firstName', v)} required />
          <Field label="Nachname *" value={form.lastName} onChange={(v) => set('lastName', v)} required />
          <Field label="Funktion" value={form.title} onChange={(v) => set('title', v)} className="sm:col-span-2" />
          <Field label="Telefon" value={form.phone} onChange={(v) => set('phone', v)} />
          <Field label="E-Mail" type="email" value={form.email} onChange={(v) => set('email', v)} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Zuständig für Center</h3>
        <div className="space-y-2">
          {CENTER_OPTIONS.map((c) => (
            <label key={c.value} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.centers.includes(c.value)}
                onChange={(e) =>
                  set('centers', e.target.checked ? [...form.centers, c.value] : form.centers.filter((x) => x !== c.value))
                }
                className="w-4 h-4 accent-[#1B2D5B]"
              />
              {c.label}
            </label>
          ))}
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Welcher Verkäufer bei einer bestimmten Marke erscheint, legen Sie unter &laquo;Marken&raquo; fest.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-70"
          style={{ background: '#1B2D5B' }}
        >
          <Save size={15} />
          {saving ? 'Speichern…' : 'Speichern'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/salesperson')}
          className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  type?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={inputCls} />
    </div>
  )
}
