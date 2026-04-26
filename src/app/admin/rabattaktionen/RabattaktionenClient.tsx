'use client'

import Link from 'next/link'
import { Plus, Pencil, Tag, Package } from 'lucide-react'

interface Rabatt {
  id: string
  title: string
  subtitle: string | null
  imageUrl: string | null
  priceLabel: string | null
  badgeLabel: string | null
  isActive: boolean
}

export default function RabattaktionenClient({ rabatts }: { rabatts: Rabatt[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] text-gray-400">{rabatts.length} Aktionen</span>
        <Link
          href="/admin/rabattaktionen/new"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-[12px] font-semibold transition-all hover:brightness-110"
          style={{ background: '#C0392B' }}
        >
          <Plus size={14} />
          Neue Aktion
        </Link>
      </div>

      {rabatts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
          <Tag size={28} className="mx-auto text-gray-300 mb-3" />
          <p className="text-[13px] text-gray-400">Noch keine Rabattaktionen erstellt.</p>
          <Link
            href="/admin/rabattaktionen/new"
            className="inline-flex items-center gap-1.5 mt-4 px-3 py-2 rounded-lg text-white text-[12px] font-semibold"
            style={{ background: '#C0392B' }}
          >
            <Plus size={14} />
            Erste Aktion erstellen
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rabatts.map((r, i) => (
            <Link
              key={r.id}
              href={`/admin/rabattaktionen/${r.id}`}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all group"
              style={{
                animation: 'fadeUp 0.2s ease both',
                animationDelay: `${0.03 + i * 0.02}s`,
                opacity: 0,
              }}
            >
              <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center">
                {r.badgeLabel && (
                  <span
                    className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white z-10"
                    style={{ background: '#C0392B' }}
                  >
                    <Tag size={9} /> {r.badgeLabel}
                  </span>
                )}
                {r.imageUrl ? (
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="w-full h-full object-contain p-3"
                  />
                ) : (
                  <Package size={32} className="text-gray-300" />
                )}
              </div>
              <div className="p-4">
                {r.subtitle && (
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {r.subtitle}
                  </div>
                )}
                <div className="text-[13px] font-semibold text-gray-800 mb-1 line-clamp-1">
                  {r.title}
                </div>
                <div className="flex items-center justify-between mt-2">
                  {r.priceLabel ? (
                    <span className="text-[12px] font-bold" style={{ color: '#C0392B' }}>
                      {r.priceLabel}
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-300">—</span>
                  )}
                  {r.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Aktiv
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      Inaktiv
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-end gap-1.5 text-[11px] text-gray-400 group-hover:text-[#C0392B] transition-colors">
                <Pencil size={11} />
                Bearbeiten
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
