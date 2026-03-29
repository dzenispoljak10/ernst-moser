'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Package, Send, ArrowLeft } from 'lucide-react'

export interface ProductSpec {
  label: string
  value: string
}

interface Props {
  productName: string
  brandName: string
  brandSlug: string
  centerName: string
  centerSlug: string
  centerColor: string
  imageUrl: string | null
  descriptionText: string
  specs: ProductSpec[]
  priceLabel: string | null
  isNew?: boolean
  isOccasion?: boolean
  salespersonEmail: string
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function ProductHeroClient({
  productName,
  brandName,
  brandSlug,
  centerName,
  centerSlug,
  centerColor,
  imageUrl,
  descriptionText,
  specs,
  priceLabel,
  isNew,
  isOccasion,
  salespersonEmail,
}: Props) {
  return (
    <section
      style={{
        padding: '60px 0 80px',
        background: 'var(--c-bg)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* ── 2-column grid ──────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 56,
            alignItems: 'start',
          }}
          className="product-page-grid"
        >

          {/* ══ LEFT: Produktbild ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ position: 'relative' }}
          >
            {/* Badges above the image box */}
            {(isNew || isOccasion) && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {isNew && (
                  <span style={{
                    display: 'inline-flex',
                    padding: '4px 12px',
                    borderRadius: 100,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: centerColor,
                  }}>NEU</span>
                )}
                {isOccasion && (
                  <span style={{
                    display: 'inline-flex',
                    padding: '4px 12px',
                    borderRadius: 100,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: '#7c3aed',
                  }}>OCCASION</span>
                )}
              </div>
            )}

            {/* Image outer box — overflow:hidden only for border-radius */}
            <div
              style={{
                background: '#f6f7f8',
                borderRadius: 20,
                boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                overflow: 'hidden',
              }}
            >
              {/* Inner wrapper: gives the image its aspect ratio + padding */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={productName}
                    fill
                    style={{ objectFit: 'contain', padding: '32px' }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority
                    unoptimized
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ccc',
                    }}
                  >
                    <Package size={72} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ══ RIGHT: Produkt-Info ════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              paddingTop: 4,
            }}
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
              <Link href="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={11} style={{ opacity: 0.5 }} />
              <Link href={`/${centerSlug}`} className="breadcrumb-link">{centerName}</Link>
              <ChevronRight size={11} style={{ opacity: 0.5 }} />
              <Link href={`/${centerSlug}/${brandSlug}`} className="breadcrumb-link">{brandName}</Link>
              <ChevronRight size={11} style={{ opacity: 0.5 }} />
              <span style={{ color: centerColor, fontWeight: 600 }}>{productName}</span>
            </nav>

            {/* Center badge — inline-flex, not block */}
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
                {centerName}
              </span>
            </div>

            {/* H1 */}
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
              {productName}
            </h1>

            {/* Description — saubere Absätze */}
            {descriptionText && (
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.72,
                  color: 'var(--c-text-2)',
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {descriptionText}
              </p>
            )}

            {/* Specs-Tabelle */}
            {specs.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--c-text-muted)',
                    marginBottom: 10,
                  }}
                >
                  Technische Daten
                </div>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1.5px solid var(--c-border)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    fontSize: 13,
                  }}
                >
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 1 ? 'var(--c-bg-2)' : 'var(--c-bg)',
                          borderBottom: i < specs.length - 1 ? '1px solid var(--c-border)' : 'none',
                        }}
                      >
                        <td
                          style={{
                            padding: '10px 16px',
                            color: 'var(--c-text-muted)',
                            fontWeight: 500,
                            width: '45%',
                          }}
                        >
                          {spec.label}
                        </td>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: 'var(--c-text)',
                            fontWeight: 700,
                            textAlign: 'right',
                          }}
                        >
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Preis */}
            {priceLabel && (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: centerColor,
                }}
              >
                {priceLabel}
              </div>
            )}

            {/* CTA Buttons — nebeneinander */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <a
                href={`mailto:${salespersonEmail}?subject=${encodeURIComponent(`Ich interessiere mich für ${productName}`)}`}
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
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 28px rgba(0,0,0,0.22)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <Send size={15} />
                Anfrage stellen
              </a>
              <Link
                href={`/${centerSlug}/${brandSlug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: `2px solid ${centerColor}`,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: centerColor,
                  background: 'transparent',
                  transition: 'transform 0.2s, background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <ArrowLeft size={15} />
                Zurück zur Marke
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
