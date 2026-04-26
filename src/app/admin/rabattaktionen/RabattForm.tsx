'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload, X, Tag, Package, Trash2, Search } from 'lucide-react'

export interface RabattData {
  id?: string
  title: string
  subtitle: string | null
  imageUrl: string | null
  linkUrl: string | null
  priceLabel: string | null
  badgeLabel: string | null
  description: string | null
  order: number
  isActive: boolean
}

interface SanityProduct {
  id: string
  name: string
  slug: string
  priceLabel: string | null
  imageUrl: string | null
  brandName: string
  linkUrl: string | null
}

const EMPTY: RabattData = {
  title: '',
  subtitle: null,
  imageUrl: null,
  linkUrl: null,
  priceLabel: null,
  badgeLabel: null,
  description: null,
  order: 0,
  isActive: true,
}

export default function RabattForm({ initial, mode }: { initial?: RabattData; mode: 'new' | 'edit' }) {
  const router = useRouter()
  const [data, setData] = useState<RabattData>(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const [products, setProducts] = useState<SanityProduct[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [showProducts, setShowProducts] = useState(false)

  useEffect(() => {
    if (!showProducts || products.length > 0) return
    setProductsLoading(true)
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((arr) => {
        if (Array.isArray(arr)) setProducts(arr)
      })
      .finally(() => setProductsLoading(false))
  }, [showProducts, products.length])

  function applyProduct(p: SanityProduct) {
    setData({
      ...data,
      title: p.name,
      subtitle: p.brandName || null,
      imageUrl: p.imageUrl,
      linkUrl: p.linkUrl,
      priceLabel: p.priceLabel,
    })
    setShowProducts(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) setData({ ...data, imageUrl: json.url })
    } catch {
      setError('Bild-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const url = mode === 'new'
        ? '/api/admin/rabattaktionen'
        : `/api/admin/rabattaktionen/${data.id}`
      const method = mode === 'new' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/rabattaktionen')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!data.id || !confirm('Diese Aktion wirklich löschen?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/rabattaktionen/${data.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/rabattaktionen')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Löschen fehlgeschlagen.')
      setDeleting(false)
    }
  }

  const filtered = productSearch
    ? products.filter((p) =>
        `${p.name} ${p.brandName}`.toLowerCase().includes(productSearch.toLowerCase())
      )
    : products

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/rabattaktionen"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={15} />
          Zurück zur Übersicht
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <X size={14} />
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Aus Produkt wählen */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Aus Produkt übernehmen
            </h3>
            <button
              type="button"
              onClick={() => setShowProducts(!showProducts)}
              className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors"
            >
              {showProducts ? 'Schliessen' : 'Produkte anzeigen'}
            </button>
          </div>
          <p className="text-[12px] text-gray-500 mb-3">
            Wählen Sie ein Produkt aus, um Titel, Marke, Bild, Preis und Link automatisch zu
            befüllen. Sie können danach alle Felder anpassen.
          </p>
          {showProducts && (
            <div>
              <div className="relative mb-3">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  placeholder="Produkt oder Marke suchen…"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div className="border border-gray-100 rounded-xl max-h-72 overflow-y-auto">
                {productsLoading ? (
                  <div className="p-6 text-center text-[12px] text-gray-400">Lade Produkte…</div>
                ) : filtered.length === 0 ? (
                  <div className="p-6 text-center text-[12px] text-gray-400">
                    Keine Produkte gefunden.
                  </div>
                ) : (
                  filtered.slice(0, 60).map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => applyProduct(p)}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <div className="w-12 h-9 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <Package size={14} className="text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-gray-800 truncate">{p.name}</div>
                        <div className="text-[10px] text-gray-400">{p.brandName}</div>
                      </div>
                      {p.priceLabel && (
                        <span className="text-[11px] text-gray-500 shrink-0">{p.priceLabel}</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bild */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Bild</h3>
          <div className="flex items-center gap-4">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt="Vorschau"
                className="w-24 h-18 object-contain rounded-xl border border-gray-100 bg-gray-50 p-2"
              />
            ) : (
              <div className="w-24 h-18 rounded-xl border border-dashed border-gray-200 flex items-center justify-center bg-gray-50">
                <Package size={20} className="text-gray-300" />
              </div>
            )}
            <div className="flex-1 flex flex-col gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors w-fit">
                <Upload size={14} />
                {uploading ? 'Hochladen…' : 'Bild hochladen'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
              {data.imageUrl && (
                <button
                  type="button"
                  onClick={() => setData({ ...data, imageUrl: null })}
                  className="text-[11px] text-gray-400 hover:text-red-500 transition-colors w-fit"
                >
                  Bild entfernen
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inhalt */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Inhalt</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Titel*</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none"
              placeholder="z.B. Stihl Akku-Säge MSA 220 C-B"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Untertitel (Marke / Kategorie)
            </label>
            <input
              type="text"
              value={data.subtitle ?? ''}
              onChange={(e) => setData({ ...data, subtitle: e.target.value || null })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none"
              placeholder="z.B. STIHL"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <Tag size={12} /> Aktions-Badge
              </label>
              <input
                type="text"
                value={data.badgeLabel ?? ''}
                onChange={(e) => setData({ ...data, badgeLabel: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none"
                placeholder="z.B. -20%"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preis</label>
              <input
                type="text"
                value={data.priceLabel ?? ''}
                onChange={(e) => setData({ ...data, priceLabel: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none"
                placeholder="z.B. ab CHF 1'290.–"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beschreibung</label>
            <textarea
              value={data.description ?? ''}
              onChange={(e) => setData({ ...data, description: e.target.value || null })}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none resize-none"
              placeholder="Kurzer Beschreibungstext für die Aktion"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Link zum Produkt (optional)
            </label>
            <input
              type="text"
              value={data.linkUrl ?? ''}
              onChange={(e) => setData({ ...data, linkUrl: e.target.value || null })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none font-mono"
              placeholder="/motorgeraetecenter/stihl/stihl-msa-220"
            />
          </div>
        </div>

        {/* Einstellungen */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Einstellungen</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reihenfolge</label>
            <input
              type="number"
              value={data.order}
              onChange={(e) => setData({ ...data, order: Number(e.target.value) || 0 })}
              className="w-32 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none"
            />
            <p className="text-[11px] text-gray-400 mt-1">Niedrigere Werte erscheinen zuerst.</p>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  data.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => setData({ ...data, isActive: !data.isActive })}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                    data.isActive ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-sm text-gray-700">Aktiv (auf Webseite sichtbar)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSave}
            disabled={saving || !data.title.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-50"
            style={{ background: '#C0392B' }}
          >
            <Save size={15} />
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
          <Link
            href="/admin/rabattaktionen"
            className="px-4 py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </Link>
          {mode === 'edit' && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? 'Löschen…' : 'Löschen'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
