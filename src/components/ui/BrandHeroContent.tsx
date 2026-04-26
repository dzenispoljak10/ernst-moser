'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ArrowRight, Phone } from 'lucide-react'

interface SanityStat {
  _key: string
  value: number
  suffix?: string
  label: string
}

interface Props {
  brandName: string
  centerName: string
  centerSlug: string
  centerColor: string
  logoUrl?: string | null
  /** Optional zweites Logo (z. B. Navimow neben Segway) — wird daneben angezeigt */
  secondLogoUrl?: string | null
  secondLogoAlt?: string | null
  tagline?: string | null
  heroImgUrl?: string | null
  /** Optional Vimeo/YouTube iframe URL — replaces the static bg image if set. */
  videoBackground?: string | null
  stats?: SanityStat[]
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

/**
 * Contrast rule for brand heros
 * -----------------------------
 * Text rendered over the dark hero overlay must be WHITE, never centerColor.
 * centerColor (e.g. Nutzfahrzeugcenter = #1B2D5B dark blue) is near-invisible
 * on the dark gradient + industrial background image. Use centerColor only
 * as an accent on light backgrounds (model cards, page body, badges) — not
 * for body text, stat values, or active breadcrumb tokens in the hero.
 */
export default function BrandHeroContent({
  brandName,
  centerName,
  centerSlug,
  centerColor,
  logoUrl,
  secondLogoUrl,
  secondLogoAlt,
  tagline,
  heroImgUrl,
  videoBackground,
  stats = [],
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: image drifts down 30% as hero scrolls out
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const cardStats = stats.slice(0, 3)

  return (
    <section ref={sectionRef} className="brand-hero">

      {/* ── Background: video iframe OR parallax image ───────── */}
      {videoBackground ? (
        <div className="brand-hero-img-wrap brand-hero-video-wrap">
          <iframe
            src={videoBackground}
            title={brandName}
            className="brand-hero-video"
            allow="autoplay; fullscreen"
            loading="eager"
          />
        </div>
      ) : (
        <motion.div className="brand-hero-img-wrap" style={{ y: imgY }}>
          {heroImgUrl ? (
            <Image
              src={heroImgUrl}
              alt={brandName}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="100vw"
              priority
              unoptimized
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${centerColor}66 0%, #0a0a0a 100%)` }} />
          )}
        </motion.div>
      )}

      {/* ── Gradient overlays ─────────────────────────────────── */}
      {/* Main: right-to-left, strong on left for text readability */}
      <div
        className="brand-hero-overlay"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.22) 100%)' }}
      />
      {/* Bottom fade */}
      <div
        className="brand-hero-overlay"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 32%, transparent 55%)' }}
      />
      {/* Radial center-color glow – bottom left */}
      <div
        className="brand-hero-overlay"
        style={{ background: `radial-gradient(circle 420px at 12% 88%, ${centerColor}40 0%, transparent 65%)` }}
      />

      {/* ── Ambient static circles ────────────────────────────── */}
      <div className="brand-hero-circles" aria-hidden="true">
        <div
          className="brand-hero-circle brand-hero-circle--1"
          style={{ background: centerColor, opacity: 0.1 }}
        />
        <div
          className="brand-hero-circle brand-hero-circle--2"
          style={{ background: centerColor, opacity: 0.07 }}
        />
      </div>

      {/* ── Breadcrumb – absolute top left ───────────────────── */}
      <motion.nav
        className="brand-hero-breadcrumb"
        aria-label="Breadcrumb"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        <Link href="/" className="breadcrumb-link">Home</Link>
        <ChevronRight size={12} className="breadcrumb-sep" />
        <Link href={`/${centerSlug}`} className="breadcrumb-link">{centerName}</Link>
        <ChevronRight size={12} className="breadcrumb-sep" />
        <span className="brand-hero-breadcrumb-active">{brandName}</span>
      </motion.nav>

      {/* ── Center badge – absolute top right ────────────────── */}
      <motion.div
        className="brand-hero-center-badge"
        style={{
          background: `${centerColor}33`,
          borderColor: `${centerColor}66`,
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        {centerName}
      </motion.div>

      {/* ── Split content ──────────────────────────────────────── */}
      <div className="brand-hero-split">

        {/* LEFT – main content */}
        <div className="brand-hero-left">

          {/* Logo (optional + zweites Logo daneben für Segway/Navimow) */}
          {logoUrl && (
            <motion.div
              className="brand-hero-logo-wrap"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={
                secondLogoUrl
                  ? {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 16,
                      background: 'rgba(255,255,255,0.9)',
                      padding: '14px 22px',
                      borderRadius: 14,
                    }
                  : undefined
              }
            >
              <Image
                src={logoUrl}
                alt={`${brandName} Logo`}
                width={280}
                height={90}
                className="brand-hero-logo-box"
                unoptimized
              />
              {secondLogoUrl && (
                <>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 36,
                      background: 'rgba(0,0,0,0.18)',
                      flexShrink: 0,
                    }}
                  />
                  <Image
                    src={secondLogoUrl}
                    alt={secondLogoAlt ?? 'Zweitlogo'}
                    width={200}
                    height={70}
                    className="brand-hero-logo-box"
                    unoptimized
                  />
                </>
              )}
            </motion.div>
          )}

          {/* Accent line */}
          <motion.div
            className="brand-hero-accent"
            style={{ background: centerColor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          />

          {/* Tagline */}
          {tagline && (
            <motion.p
              className="brand-hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              {tagline}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            className="brand-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            <a
              href="#produkte"
              className="brand-hero-btn brand-hero-btn--primary"
              style={{ background: centerColor, borderColor: centerColor } as React.CSSProperties}
            >
              Produkte entdecken
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+41326755805"
              className="brand-hero-btn brand-hero-btn--ghost"
            >
              <Phone size={16} />
              +41 32 675 58 05
            </a>
          </motion.div>
        </div>

        {/* RIGHT – glassmorphism stats card (only if stats exist) */}
        {cardStats.length > 0 && (
          <motion.div
            className="brand-hero-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            <div
              className="brand-hero-glass-card"
              style={{ background: `${centerColor}cc` }}
            >
              {cardStats.map((stat, i) => (
                <div key={stat._key}>
                  {i > 0 && <div className="brand-hero-card-divider" />}
                  <div className="brand-hero-card-stat">
                    <span className="brand-hero-card-value">
                      {stat.value}{stat.suffix ?? ''}
                    </span>
                    <span className="brand-hero-card-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Mouse scroll indicator ────────────────────────────── */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <motion.div
            className="hero-scroll-dot"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="hero-scroll-label">Scroll</span>
      </div>

    </section>
  )
}
