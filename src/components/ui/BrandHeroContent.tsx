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
  tagline?: string | null
  heroImgUrl?: string | null
  stats?: SanityStat[]
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function BrandHeroContent({
  brandName,
  centerName,
  centerSlug,
  centerColor,
  logoUrl,
  tagline,
  heroImgUrl,
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

      {/* ── Background image (parallax) ───────────────────────── */}
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

      {/* ── Gradient overlays ─────────────────────────────────── */}
      {/* Main: right-to-left, heavy on left for readability */}
      <div
        className="brand-hero-overlay"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.30) 100%)' }}
      />
      {/* Bottom fade */}
      <div
        className="brand-hero-overlay"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 40%)' }}
      />
      {/* Radial center-color glow – bottom left */}
      <div
        className="brand-hero-overlay"
        style={{ background: `radial-gradient(circle 420px at 12% 88%, ${centerColor}40 0%, transparent 65%)` }}
      />

      {/* ── Ambient pulsing circles ───────────────────────────── */}
      <div className="brand-hero-circles" aria-hidden="true">
        <motion.div
          className="brand-hero-circle brand-hero-circle--1"
          style={{ background: centerColor, opacity: 0.10 }}
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="brand-hero-circle brand-hero-circle--2"
          style={{ background: centerColor, opacity: 0.07 }}
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
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
        <ChevronRight size={11} className="breadcrumb-sep" />
        <Link href={`/${centerSlug}`} className="breadcrumb-link">{centerName}</Link>
        <ChevronRight size={11} className="breadcrumb-sep" />
        <span style={{ color: centerColor }}>{brandName}</span>
      </motion.nav>

      {/* ── Split content ──────────────────────────────────────── */}
      <div className="brand-hero-split">

        {/* LEFT – main content */}
        <div className="brand-hero-left">

          {/* Category badge pill */}
          <motion.div
            className="brand-hero-badge-pill"
            style={{
              background: `${centerColor}28`,
              borderColor: `${centerColor}55`,
              color: '#fff',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            {centerName}
          </motion.div>

          {/* Logo */}
          {logoUrl && (
            <motion.div
              className="brand-hero-logo-wrap"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image
                src={logoUrl}
                alt={`${brandName} Logo`}
                width={160}
                height={60}
                className="brand-hero-logo-box"
                unoptimized
              />
            </motion.div>
          )}

          {/* H1 */}
          <motion.h1
            className="brand-hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {brandName}
          </motion.h1>

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
            <div className="brand-hero-glass-card">
              {cardStats.map((stat, i) => (
                <div key={stat._key}>
                  {i > 0 && <div className="brand-hero-card-divider" />}
                  <div className="brand-hero-card-stat">
                    <span className="brand-hero-card-value" style={{ color: centerColor }}>
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
      <div className="hero-scroll">
        <div className="hero-scroll-mouse">
          <motion.div
            className="hero-scroll-dot"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <span className="hero-scroll-label">Scroll</span>
      </div>

    </section>
  )
}
