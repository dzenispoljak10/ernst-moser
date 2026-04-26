'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ExternalLink, Send } from 'lucide-react'

interface Props {
  categorySlug: string
  categoryLabel: string
  modelSlug: string
  modelTitle: string
  longDescription: string[]
  imageUrl: string
  externalUrl: string
  mailtoHref: string
  centerColor: string
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function IsuzuModelHero({
  categorySlug,
  categoryLabel,
  modelTitle,
  longDescription,
  imageUrl,
  externalUrl,
  mailtoHref,
  centerColor,
}: Props) {
  return (
    <section style={{ padding: '60px 0 80px', background: 'var(--c-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div
          className="product-page-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 56,
            alignItems: 'start',
          }}
        >
          {/* LEFT: product image (contain on light bg) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                background: '#f6f7f8',
                borderRadius: 20,
                boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
                <Image
                  src={imageUrl}
                  alt={`Isuzu ${modelTitle}`}
                  fill
                  style={{ objectFit: 'contain', padding: 32 }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: info + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4 }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 5,
                fontSize: 12,
                color: 'var(--c-text-muted)',
              }}
            >
              <Link href="/" className="breadcrumb-link--light">Home</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <Link href="/nutzfahrzeugcenter" className="breadcrumb-link--light">Nutzfahrzeugcenter</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <Link href="/nutzfahrzeugcenter/isuzu" className="breadcrumb-link--light">Isuzu</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <Link
                href={`/nutzfahrzeugcenter/isuzu#${categorySlug}`}
                className="breadcrumb-link--light"
              >
                {categoryLabel}
              </Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <span style={{ color: centerColor, fontWeight: 600 }}>{modelTitle}</span>
            </nav>

            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 14px',
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  background: centerColor,
                }}
              >
                {categoryLabel}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading, Arial, sans-serif)',
                fontSize: 'clamp(26px, 3.5vw, 42px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: 'var(--c-text)',
                margin: 0,
              }}
            >
              Isuzu {modelTitle}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {longDescription.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.72,
                    color: 'var(--c-text-2)',
                    margin: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                Auf isuzu.ch ansehen
                <ExternalLink size={14} />
              </a>
              <a
                href={mailtoHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '12px 24px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#374151',
                  background: 'transparent',
                  border: '1.5px solid #d1d5db',
                  transition: 'transform 0.2s, background 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.background = '#f9fafb'
                  el.style.borderColor = '#9ca3af'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.background = 'transparent'
                  el.style.borderColor = '#d1d5db'
                }}
              >
                <Send size={15} />
                Anfrage stellen
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
