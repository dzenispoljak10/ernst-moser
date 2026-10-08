'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Tag, Save, Upload, X, ExternalLink } from 'lucide-react'
import { adminFetch, uploadImage } from '@/lib/admin/api-client'

interface Brand {
  id: string
  name: string
  slug: string
  centerSlug: string
  logoUrl: string | null
  description: string
  tagline: string
  salespersonId: string
  salespersons: Array<{ id: string; name: string }>
}

const inputCls =
  'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#1B2D5B] focus:ring-2 focus:ring-[#1B2D5B]/15 transition-all'

export default function EditBrandPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [original, setOriginal] = useState<Brand | null>(null)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [logoAssetId, setLogoAssetId] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    adminFetch<Brand>(`/api/admin/brands/${id}`)
      .then((data) => {
        setBrand(data)
        setOriginal(data)
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Marke konnte nicht geladen werden.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !brand) return
    setError('')
    setUploading(true)
    try {
      const { url, assetId } = await uploadImage(file)
      setBrand({ ...brand, logoUrl: url })
      setLogoAssetId(assetId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logo-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!brand || !original) return
    setSaving(true)
    setError('')
    try {
      // Nur tatsächlich geänderte Felder senden → bestehende Formatierungen bleiben erhalten.
      const payload: Record<string, string> = {}
      if (brand.description !== original.description) payload.description = brand.description
      if (brand.tagline !== original.tagline) payload.tagline = brand.tagline
      if (brand.salespersonId !== original.salespersonId) payload.salespersonId = brand.salespersonId
      if (logoAssetId) payload.logoAssetId = logoAssetId

      if (Object.keys(payload).length) {
        await adminFetch(`/api/admin/brands/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      router.push('/admin/brands')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-400 text-sm">Laden…</div>
  if (!brand)
    return (
      <div className="p-8 text-center text-sm">
        <div className="text-gray-500 mb-3">{loadError || 'Marke nicht gefunden.'}</div>
        <Link href="/admin/brands" className="text-[#1B2D5B] underline">Zurück zu den Marken</Link>
      </div>
    )

  const publicUrl = brand.centerSlug && brand.slug ? `/${brand.centerSlug}/${brand.slug}` : null

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/admin/brands"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={15} />
          Zurück
        </Link>
        {publicUrl && (
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1B2D5B] transition-colors"
          >
            Markenseite ansehen
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">{brand.name}</h2>

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
              {uploading ? 'Wird hochgeladen…' : brand.logoUrl ? 'Logo ersetzen' : 'Logo hochladen'}
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

        {/* Texte */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Texte der Markenseite</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tagline <span className="text-gray-400 font-normal">(kurzer Slogan oben auf der Markenseite)</span>
            </label>
            <input
              type="text"
              value={brand.tagline}
              onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Beschreibung <span className="text-gray-400 font-normal">(Absätze mit einer Leerzeile trennen)</span>
            </label>
            <textarea
              value={brand.description}
              onChange={(e) => setBrand({ ...brand, description: e.target.value })}
              rows={8}
              className={`${inputCls} resize-y`}
            />
          </div>
        </div>

        {/* Ansprechpartner */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Ansprechpartner</h3>
          <select
            value={brand.salespersonId}
            onChange={(e) => setBrand({ ...brand, salespersonId: e.target.value })}
            className={inputCls}
          >
            <option value="">— Automatisch (Verkäufer des Centers) —</option>
            {brand.salespersons.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <p className="text-[12px] text-gray-400 mt-2">
            Wird auf der Markenseite und allen Produktseiten dieser Marke als Kontakt angezeigt.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || uploading}
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
