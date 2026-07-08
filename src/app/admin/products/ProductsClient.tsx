'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, Pencil, ExternalLink, Package } from 'lucide-react'

export interface ProductRow {
  id: string
  name: string
  slug: string
  priceLabel: string | null
  isNew: boolean
  isOccasion: boolean
  imageUrl: string | null
  brandName: string
  linkUrl: string | null
}

export default function ProductsClient({ products }: { products: ProductRow[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)

  async function del(p: ProductRow) {
    if (!confirm(`Produkt „${p.name}“ wirklich löschen?`)) return
    setBusy(p.id)
    await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' })
    setBusy(null)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] text-gray-400">{products.length} Produkte</span>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-white transition-all hover:opacity-90"
          style={{ background: '#1B2D5B' }}
        >
          <Plus size={13} />
          Produkt hinzufügen
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
        {products.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-gray-400">Noch keine Produkte.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Produkt</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Marke</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Preis</th>
                <th className="px-5 py-3 w-32" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {p.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.imageUrl} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <Package size={15} className="text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-gray-800 flex items-center gap-2">
                          {p.name}
                          {p.isNew && <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">NEU</span>}
                          {p.isOccasion && <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">OCCASION</span>}
                        </div>
                        <div className="text-[11px] text-gray-400">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-[12px] text-gray-500">{p.brandName || '—'}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-[12px] text-gray-500">{p.priceLabel || '—'}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      {p.linkUrl && (
                        <a
                          href={p.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all"
                          title="Auf Website ansehen"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <Pencil size={12} /> Bearbeiten
                      </Link>
                      <button
                        onClick={() => del(p)}
                        disabled={busy === p.id}
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
