'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Tag, Save, Upload, X } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  centerSlug: string
  logoUrl: string | null
  description: string | null
  isActive: boolean
  order: number
}

export default function EditBrandPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/admin/brands/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBrand(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !brand) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) setBrand({ ...brand, logoUrl: data.url })
    } catch {
      setError('Logo-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!brand) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/brands/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/brands')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return <div className="p-8 text-center text-gray-400 text-sm">Laden…</div>
  if (!brand)
    return <div className="p-8 text-center text-gray-400 text-sm">Marke nicht gefunden.</div>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/brands"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={15} />
          Zurück
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <X size={14} />
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Logo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Logo</h3>
          <div className="flex items-center gap-4">
            {brand.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="w-20 h-14 object-contain rounded-xl border border-gray-100 bg-gray-50 p-2"
              />
            ) : (
              <div className="w-20 h-14 rounded-xl border border-dashed border-gray-200 flex items-center justify-center bg-gray-50">
                <Tag size={18} className="text-gray-300" />
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Logo hochladen'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beschreibung</label>
            <textarea
              value={brand.description ?? ''}
              onChange={(e) => setBrand({ ...brand, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none resize-none transition-all"
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
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  brand.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => setBrand({ ...brand, isActive: !brand.isActive })}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                    brand.isActive ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-sm text-gray-700">Aktiv</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-70"
            style={{ background: '#1B2D5B' }}
          >
            <Save size={15} />
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
          <Link
            href="/admin/brands"
            className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </Link>
        </div>
      </div>
    </div>
  )
}
