'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Send, ExternalLink } from 'lucide-react'
import { getIcon } from '@/lib/iconMap'
import type { HilltipCategory } from '@/lib/hilltip-catalog'
import { getHilltipAnfrageMailto } from '@/lib/hilltip-catalog'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

interface Props {
  category: HilltipCategory
  brandName: string
  brandSlug: string
  centerName: string
  centerSlug: string
  centerColor: string
}

export default function HilltipCategoryDetail({
  category,
  brandName,
  brandSlug,
  centerName,
  centerSlug,
  centerColor,
}: Props) {
  const mailtoHref =
    getHilltipAnfrageMailto(category.slug, category.title) ?? `mailto:michael.peter@ernst-moser.ch`
  const accentAlpha = `${centerColor}1a`

  return (
    <section className="hilltip-detail-section">
      <div className="hilltip-detail-inner">
        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: 'var(--c-text-2)',
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/${centerSlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {centerName}
          </Link>
          <ChevronRight size={13} />
          <Link
            href={`/${centerSlug}/${brandSlug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {brandName}
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--c-text)' }}>{category.title}</span>
        </div>

        <div className="hilltip-detail-grid">
          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="hilltip-detail-img-wrap">
              <Image
                src={category.image}
                alt={category.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hilltip-detail-img"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            <div className="hilltip-detail-tonnage" style={{ color: centerColor }}>
              {category.tonnage}
            </div>
            <h1 className="hilltip-detail-title">
              Winterdienstlösungen für {category.title}
            </h1>
            <div className="hilltip-detail-desc">
              {category.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="hilltip-detail-highlights">
              {category.highlights.map((h, i) => {
                const Icon = getIcon(h.icon)
                return (
                  <div key={i} className="hilltip-highlight">
                    <span
                      className="hilltip-highlight-icon"
                      style={{ background: accentAlpha, color: centerColor }}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <div className="hilltip-highlight-title">{h.title}</div>
                      <p className="hilltip-highlight-text">{h.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="hilltip-detail-ctas">
              <a
                href={mailtoHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '13px 26px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: '#fff',
                  background: centerColor,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 10px 28px rgba(0,0,0,0.22)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <Send size={15} />
                Anfrage stellen
              </a>
              <a
                href={category.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '12px 24px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: centerColor,
                  background: 'transparent',
                  border: `1.5px solid ${centerColor}`,
                  transition: 'transform 0.2s, background 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.background = centerColor
                  el.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.background = 'transparent'
                  el.style.color = centerColor
                }}
              >
                Bei Hilltip ansehen
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
