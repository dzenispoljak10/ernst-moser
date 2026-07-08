'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, X, Plus, Trash2 } from 'lucide-react'

export interface BrandOption {
  value: string
  label: string
}

interface Spec {
  label: string
  value: string
}

export interface ProductFormData {
  name: string
  brandId: string
  slug: string
  priceLabel: string
  price: string
  description: string
  specs: Spec[]
  isNew: boolean
  isOccasion: boolean
  showOnBrandPage: boolean
  mainImageUrl: string
  mainImageAssetId: string
}

interface Props {
  brands: BrandOption[]
  defaultValues?: Partial<ProductFormData>
  productId?: string
}

const inputCls =
  'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none transition-all'

function focusStyle(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = '#1B2D5B'
  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(27,45,91,0.15)'
}
function blurStyle(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = '#e5e7eb'
  e.currentTarget.style.boxShadow = 'none'
}

export default function ProductForm({ brands, defaultValues, productId }: Props) {
  const router = useRouter()
  const isEdit = !!productId

  const [form, setForm] = useState<ProductFormData>({
    name: defaultValues?.name ?? '',
    brandId: defaultValues?.brandId ?? '',
    slug: defaultValues?.slug ?? '',
    priceLabel: defaultValues?.priceLabel ?? '',
    price: defaultValues?.price ?? '',
    description: defaultValues?.description ?? '',
    specs: defaultValues?.specs ?? [],
    isNew: defaultValues?.isNew ?? false,
    isOccasion: defaultValues?.isOccasion ?? false,
    showOnBrandPage: defaultValues?.showOnBrandPage ?? false,
    mainImageUrl: defaultValues?.mainImageUrl ?? '',
    mainImageAssetId: defaultValues?.mainImageAssetId ?? '',
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) {
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
        set('mainImageUrl', data.url)
        set('mainImageAssetId', data.assetId ?? '')
      } else {
        setError('Bild-Upload fehlgeschlagen.')
      }
    } catch {
      setError('Bild-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  function setSpec(i: number, key: keyof Spec, value: string) {
    setForm((prev) => {
      const specs = [...prev.specs]
      specs[i] = { ...specs[i], [key]: value }
      return { ...prev, specs }
    })
  }
  function addSpec() {
    setForm((prev) => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }))
  }
  function removeSpec(i: number) {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.brandId) {
      setError('Bitte eine Marke auswählen.')
      return
    }
    setSaving(true)
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          brandId: form.brandId,
          slug: form.slug,
          priceLabel: form.priceLabel,
          price: form.price.trim() ? Number(form.price) : undefined,
          description: form.description,
          specs: form.specs,
          isNew: form.isNew,
          isOccasion: form.isOccasion,
          showOnBrandPage: form.showOnBrandPage,
          mainImageAssetId: form.mainImageAssetId || undefined,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Speichern fehlgeschlagen.')
      }
      router.push('/admin/products')
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

      {/* Bild */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Hauptbild</h3>
        <div className="flex items-center gap-4">
          {form.mainImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.mainImageUrl} alt="Vorschau" className="w-20 h-20 rounded-xl object-contain border-2 border-gray-100 bg-gray-50" />
          ) : (
            <div className="w-20 h-20 rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ background: '#1B2D5B' }}>
              {form.name?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Bild hochladen'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
            {form.mainImageUrl && (
              <button
                type="button"
                onClick={() => { set('mainImageUrl', ''); set('mainImageAssetId', '') }}
                className="ml-2 text-xs text-gray-400 hover:text-red-500"
              >
                Entfernen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grunddaten */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Grunddaten</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
            <input
              className={inputCls} value={form.name} required
              onChange={(e) => set('name', e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Marke *</label>
            <select
              className={inputCls} value={form.brandId} required
              onChange={(e) => set('brandId', e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            >
              <option value="">— Marke wählen —</option>
              {brands.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (optional)</label>
            <input
              className={inputCls} value={form.slug} placeholder="wird aus dem Namen erzeugt"
              onChange={(e) => set('slug', e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preisbezeichnung</label>
            <input
              className={inputCls} value={form.priceLabel} placeholder="z. B. Preis auf Anfrage"
              onChange={(e) => set('priceLabel', e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preis (CHF, optional)</label>
            <input
              type="number" className={inputCls} value={form.price}
              onChange={(e) => set('price', e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
        </div>
      </div>

      {/* Beschreibung */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Beschreibung</h3>
        <textarea
          className={inputCls} rows={5} value={form.description}
          placeholder="Fliesstext. Leerzeile = neuer Absatz."
          onChange={(e) => set('description', e.target.value)}
          onFocus={focusStyle} onBlur={blurStyle}
        />
      </div>

      {/* Technische Daten */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Technische Daten</h3>
          <button type="button" onClick={addSpec} className="inline-flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-800">
            <Plus size={13} /> Zeile
          </button>
        </div>
        {form.specs.length === 0 ? (
          <p className="text-[12px] text-gray-400">Keine Angaben. Über „Zeile“ hinzufügen.</p>
        ) : (
          <div className="space-y-2">
            {form.specs.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className={inputCls} value={s.label} placeholder="Bezeichnung"
                  onChange={(e) => setSpec(i, 'label', e.target.value)}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
                <input
                  className={inputCls} value={s.value} placeholder="Wert"
                  onChange={(e) => setSpec(i, 'value', e.target.value)}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
                <button type="button" onClick={() => removeSpec(i)} className="p-2 text-gray-300 hover:text-red-400 shrink-0" title="Entfernen">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sichtbarkeit */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Sichtbarkeit auf der Markenseite</h3>
        <Toggle label="Auf der Markenseite anzeigen" checked={form.showOnBrandPage} onChange={(v) => set('showOnBrandPage', v)} />
        <p className="text-[12px] text-gray-400 mt-2 leading-relaxed">
          Die Produkt-Detailseite ist immer erreichbar. Dieser Schalter blendet das Produkt zusätzlich im
          Abschnitt „Weitere Produkte“ der Markenseite ein – wichtig für Marken mit eigenem Katalog
          (z. B. Scania, Isuzu, Hilltip). Bestehende Produkte bleiben ohne diesen Schalter unverändert.
        </p>
      </div>

      {/* Kennzeichnung */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Kennzeichnung</h3>
        <div className="flex flex-col gap-3">
          <Toggle label="Als „Neu“ markieren" checked={form.isNew} onChange={(v) => set('isNew', v)} />
          <Toggle label="Als „Occasion“ markieren" checked={form.isOccasion} onChange={(v) => set('isOccasion', v)} />
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
        <button
          type="button" onClick={() => router.push('/admin/products')}
          className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}
