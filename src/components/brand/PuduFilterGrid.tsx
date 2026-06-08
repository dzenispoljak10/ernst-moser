'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export interface PuduProduct {
  slug: string
  title: string
  category: string
  image: string
  shortDescription: string
}

interface Props {
  products: PuduProduct[]
  accent: string
  eyebrow: string
  title: string
  lead: string
  centerSlug: string
  brandSlug: string
}

const CATEGORIES = ['Reinigungsroboter', 'Serviceroboter', 'Transportroboter', 'Marketingroboter']

export default function PuduFilterGrid({ products, accent, eyebrow, title, lead, centerSlug, brandSlug }: Props) {
  const [active, setActive] = useState<string>('Alle')
  const filtered = active === 'Alle' ? products : products.filter((p) => p.category === active)
  const countFor = (c: string) => (c === 'Alle' ? products.length : products.filter((p) => p.category === c).length)

  return (
    <section className="kommunal-section">
      <div className="kommunal-section-inner">
        <div className="kommunal-section-header">
          <div className="kommunal-section-eyebrow" style={{ color: accent }}>{eyebrow}</div>
          <h2 className="kommunal-section-title">{title}</h2>
          <p className="kommunal-section-lead">{lead}</p>
        </div>

        <div className="pudu-filter-bar">
          {['Alle', ...CATEGORIES].map((c) => {
            const on = active === c
            return (
              <button
                key={c}
                className={`pudu-filter-chip${on ? ' active' : ''}`}
                style={on ? { background: accent, borderColor: accent, boxShadow: `0 8px 20px ${accent}40` } : {}}
                onClick={() => setActive(c)}
              >
                {c}
                <span className="pudu-filter-count" style={on ? { background: 'rgba(255,255,255,0.25)' } : { color: accent }}>
                  {countFor(c)}
                </span>
              </button>
            )
          })}
        </div>

        <motion.div className="kommunal-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={`/${centerSlug}/${brandSlug}/${p.slug}`}
                  className="kommunal-card"
                  style={{ ['--kommunal-accent' as string]: accent }}
                >
                  <div className="kommunal-card-img-wrap">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="kommunal-card-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="kommunal-card-body">
                    <h4 className="kommunal-card-title">{p.title}</h4>
                    <p className="kommunal-card-desc">{p.shortDescription}</p>
                    <div className="kommunal-card-footer">
                      <span className="kommunal-card-link" style={{ color: accent }}>
                        Details
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
