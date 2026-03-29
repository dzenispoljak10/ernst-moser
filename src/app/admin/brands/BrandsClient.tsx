'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag, Pencil, LayoutGrid, List } from 'lucide-react'

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

const CENTER_LABELS: Record<string, string> = {
  nutzfahrzeugcenter: 'Nutzfahrzeuge',
  kommunalcenter: 'Kommunal',
  motorgeraetecenter: 'Motorgeräte',
}

const CENTER_COLORS: Record<string, { bg: string; color: string }> = {
  nutzfahrzeugcenter: { bg: '#EEF2FF', color: '#1B2D5B' },
  kommunalcenter:     { bg: '#ECFDF5', color: '#4A7C59' },
  motorgeraetecenter: { bg: '#FEF2F2', color: '#C0392B' },
}

export default function BrandsClient({ brands }: { brands: Brand[] }) {
  const [view, setView] = useState<'table' | 'grid'>('table')

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] text-gray-400">{brands.length} Einträge</span>
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
          <button
            onClick={() => setView('table')}
            className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={14} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((b, i) => {
            const cc = CENTER_COLORS[b.centerSlug]
            return (
              <Link
                key={b.id}
                href={`/admin/brands/${b.id}`}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-all group"
                style={{
                  animation: 'fadeUp 0.2s ease both',
                  animationDelay: `${0.03 + i * 0.02}s`,
                  opacity: 0,
                }}
              >
                <div className="w-full h-16 flex items-center justify-center mb-3">
                  {b.logoUrl ? (
                    <img
                      src={b.logoUrl}
                      alt={b.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Tag size={16} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="text-[13px] font-semibold text-gray-800 text-center">{b.name}</div>
                {cc && (
                  <div className="mt-1 flex justify-center">
                    <span
                      className="inline-flex items-center text-[10px] rounded-full px-2 py-0.5"
                      style={{ background: cc.bg, color: cc.color }}
                    >
                      {CENTER_LABELS[b.centerSlug]}
                    </span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {brands.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-gray-400">
              Noch keine Marken vorhanden.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Marke</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Center</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Slug</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Status</th>
                  <th className="px-5 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {brands.map((b, i) => {
                  const cc = CENTER_COLORS[b.centerSlug]
                  return (
                    <tr
                      key={b.id}
                      className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors"
                      style={{
                        animation: 'fadeUp 0.2s ease both',
                        animationDelay: `${0.04 + i * 0.02}s`,
                        opacity: 0,
                      }}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {b.logoUrl ? (
                            <img
                              src={b.logoUrl}
                              alt={b.name}
                              className="w-10 h-8 object-contain bg-gray-50 rounded-lg p-1"
                            />
                          ) : (
                            <div className="w-10 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                              <Tag size={12} className="text-gray-300" />
                            </div>
                          )}
                          <span className="text-[13px] font-medium text-gray-800">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        {cc ? (
                          <span
                            className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md"
                            style={{ background: cc.bg, color: cc.color }}
                          >
                            {CENTER_LABELS[b.centerSlug]}
                          </span>
                        ) : (
                          <span className="text-[12px] text-gray-400">{b.centerSlug}</span>
                        )}
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <code className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                          {b.slug}
                        </code>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        {b.isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Aktiv
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            Inaktiv
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/brands/${b.id}`}
                            className="p-1.5 rounded-md text-gray-300 hover:text-[#1B2D5B] hover:bg-[#EEF2FF] transition-all"
                          >
                            <Pencil size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
