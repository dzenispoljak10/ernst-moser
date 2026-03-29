'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, X } from 'lucide-react'

interface TeamFormData {
  firstName: string
  lastName: string
  role: string
  email: string
  phone: string
  centerId: string
  order: number
  isActive: boolean
  photoUrl: string
}

interface TeamFormProps {
  defaultValues?: Partial<TeamFormData>
  memberId?: string
}

const CENTERS = [
  { value: '', label: '— Kein Center —' },
  { value: 'nutzfahrzeugcenter', label: 'Nutzfahrzeugcenter' },
  { value: 'kommunalcenter', label: 'Kommunalcenter' },
  { value: 'motorgeraetecenter', label: 'Motorgeräte Center' },
]

export default function TeamForm({ defaultValues, memberId }: TeamFormProps) {
  const router = useRouter()
  const isEdit = !!memberId

  const [form, setForm] = useState<TeamFormData>({
    firstName: defaultValues?.firstName ?? '',
    lastName: defaultValues?.lastName ?? '',
    role: defaultValues?.role ?? '',
    email: defaultValues?.email ?? '',
    phone: defaultValues?.phone ?? '',
    centerId: defaultValues?.centerId ?? '',
    order: defaultValues?.order ?? 0,
    isActive: defaultValues?.isActive ?? true,
    photoUrl: defaultValues?.photoUrl ?? '',
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof TeamFormData, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) set('photoUrl', data.url)
    } catch {
      setError('Foto-Upload fehlgeschlagen.')
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
      const url = isEdit ? `/api/admin/team/${memberId}` : '/api/admin/team'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/team')
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

      {/* Photo */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Foto</h3>
        <div className="flex items-center gap-4">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt="Vorschau"
              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-lg font-bold"
              style={{ background: '#1B2D5B' }}
            >
              {form.firstName?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Foto hochladen'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={uploading}
              />
            </label>
            {form.photoUrl && (
              <button
                type="button"
                onClick={() => set('photoUrl', '')}
                className="ml-2 text-xs text-gray-400 hover:text-red-500"
              >
                Entfernen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Name & Role */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Grunddaten</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Vorname *"
            value={form.firstName}
            onChange={(v) => set('firstName', v)}
            required
          />
          <FormField
            label="Nachname *"
            value={form.lastName}
            onChange={(v) => set('lastName', v)}
            required
          />
          <FormField
            label="Rolle / Funktion *"
            value={form.role}
            onChange={(v) => set('role', v)}
            required
            className="sm:col-span-2"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Kontakt</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="E-Mail"
            type="email"
            value={form.email}
            onChange={(v) => set('email', v)}
          />
          <FormField
            label="Telefon"
            value={form.phone}
            onChange={(v) => set('phone', v)}
          />
        </div>
      </div>

      {/* Center & Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Einstellungen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Center</label>
            <select
              value={form.centerId}
              onChange={(e) => set('centerId', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1B2D5B'
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(27,45,91,0.15)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {CENTERS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <FormField
            label="Reihenfolge"
            type="number"
            value={String(form.order)}
            onChange={(v) => set('order', parseInt(v) || 0)}
          />
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => set('isActive', !form.isActive)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                    form.isActive ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-sm text-gray-700">Aktiv (auf Website anzeigen)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-70"
          style={{ background: '#1B2D5B' }}
        >
          <Save size={15} />
          {saving ? 'Speichern…' : 'Speichern'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/team')}
          className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}

function FormField({
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none transition-all"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#1B2D5B'
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(27,45,91,0.15)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}
