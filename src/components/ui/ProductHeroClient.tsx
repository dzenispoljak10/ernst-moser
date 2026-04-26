'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Package, Send, ExternalLink } from 'lucide-react'

import { getFiatQuoteUrlForProduct } from '@/lib/fiat-models'
import { getPiaggioExternalUrl } from '@/lib/piaggio-external'
import {
  getDhollandiaExternalUrl,
  getDhollandiaAnfrageMailto,
} from '@/lib/dhollandia-catalog'
import {
  getScaniaExternalUrl,
  getScaniaAnfrageMailto,
} from '@/lib/scania-catalog'
import {
  getUTExternalUrl,
  getUTAnfrageMailto,
} from '@/lib/ut-catalog'
import {
  getKommunalExternalUrl,
  getKommunalExternalLabel,
  getKommunalAnfrageMailto,
} from '@/lib/kommunal-catalogs'
import {
  getMotorgeraeteExternalUrl,
  getMotorgeraeteExternalLabel,
  getMotorgeraeteAnfrageMailto,
} from '@/lib/motorgeraete-catalogs'
import {
  getHakoExternalUrl,
  getHakoAnfrageMailto,
} from '@/lib/hako-external'

export interface ProductSpec {
  label: string
  value: string
}

interface Props {
  productName: string
  productSlug: string
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
  productSlug,
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
  const fiatQuoteUrl = getFiatQuoteUrlForProduct(productSlug)
  const piaggioExternalUrl = getPiaggioExternalUrl(productSlug)
  const dhollandiaExternalUrl = getDhollandiaExternalUrl(productSlug)
  const dhollandiaMailto = getDhollandiaAnfrageMailto(productSlug, productName)
  const scaniaExternalUrl = getScaniaExternalUrl(productSlug)
  const scaniaMailto = getScaniaAnfrageMailto(productSlug, productName)
  const utExternalUrl = getUTExternalUrl(productSlug)
  const utMailto = getUTAnfrageMailto(productSlug, productName)
  const kommunalExternalUrl = getKommunalExternalUrl(productSlug)
  const kommunalExternalLabel = getKommunalExternalLabel(productSlug)
  const kommunalMailto = getKommunalAnfrageMailto(productSlug, productName)
  const motorgeraeteExternalUrl = getMotorgeraeteExternalUrl(productSlug)
  const motorgeraeteExternalLabel = getMotorgeraeteExternalLabel(productSlug)
  const motorgeraeteMailto = getMotorgeraeteAnfrageMailto(productSlug, productName)
  const hakoExternalUrl = getHakoExternalUrl(productSlug)
  const hakoMailto = getHakoAnfrageMailto(productSlug, productName)
  const mailtoHref =
    dhollandiaMailto ??
    scaniaMailto ??
    utMailto ??
    kommunalMailto ??
    motorgeraeteMailto ??
    hakoMailto ??
    `mailto:${salespersonEmail}?subject=${encodeURIComponent(`Ich interessiere mich für ${productName}`)}`
  return (
    <section
      className="product-hero-section"
      style={{ background: 'var(--c-bg)' }}
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
              <Link href="/" className="breadcrumb-link--light">Home</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <Link href={`/${centerSlug}`} className="breadcrumb-link--light">{centerName}</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
              <Link href={`/${centerSlug}/${brandSlug}`} className="breadcrumb-link--light">{brandName}</Link>
              <ChevronRight size={11} style={{ color: '#9ca3af' }} />
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

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              {fiatQuoteUrl && (
                <a
                  href={fiatQuoteUrl}
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
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 28px rgba(0,0,0,0.22)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'none'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  Offerte einholen
                  <ExternalLink size={14} />
                </a>
              )}
              <a
                href={mailtoHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: fiatQuoteUrl ? '12px 24px' : '13px 26px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: fiatQuoteUrl ? 600 : 700,
                  textDecoration: 'none',
                  color: fiatQuoteUrl ? '#374151' : '#fff',
                  background: fiatQuoteUrl ? 'transparent' : centerColor,
                  border: fiatQuoteUrl ? '1.5px solid #d1d5db' : 'none',
                  transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-2px)'
                  if (fiatQuoteUrl) {
                    el.style.background = '#f9fafb'
                    el.style.borderColor = '#9ca3af'
                  } else {
                    el.style.boxShadow = '0 10px 28px rgba(0,0,0,0.22)'
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  if (fiatQuoteUrl) {
                    el.style.background = 'transparent'
                    el.style.borderColor = '#d1d5db'
                  } else {
                    el.style.boxShadow = 'none'
                  }
                }}
              >
                <Send size={15} />
                Anfrage stellen
              </a>
              {piaggioExternalUrl && (
                <a
                  href={piaggioExternalUrl}
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
                  Auf Piaggio ansehen
                  <ExternalLink size={14} />
                </a>
              )}
              {dhollandiaExternalUrl && (
                <a
                  href={dhollandiaExternalUrl}
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
                  Auf Dhollandia ansehen
                  <ExternalLink size={14} />
                </a>
              )}
              {scaniaExternalUrl && (
                <a
                  href={scaniaExternalUrl}
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
                  Bei Scania ansehen
                  <ExternalLink size={14} />
                </a>
              )}
              {utExternalUrl && (
                <a
                  href={utExternalUrl}
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
                  Bei UT ansehen
                  <ExternalLink size={14} />
                </a>
              )}
              {kommunalExternalUrl && (
                <a
                  href={kommunalExternalUrl}
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
                  {kommunalExternalLabel ?? 'Bei Hersteller ansehen'}
                  <ExternalLink size={14} />
                </a>
              )}
              {motorgeraeteExternalUrl && (
                <a
                  href={motorgeraeteExternalUrl}
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
                  {motorgeraeteExternalLabel ?? 'Bei Hersteller ansehen'}
                  <ExternalLink size={14} />
                </a>
              )}
              {hakoExternalUrl && (
                <a
                  href={hakoExternalUrl}
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
                  Bei Hako ansehen
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
