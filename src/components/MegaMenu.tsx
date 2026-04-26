'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ShoppingBag, X, ChevronRight, ArrowRight, Menu,
  Tag, Compass, Wrench, ShoppingCart, Key, Bot,
} from 'lucide-react'
import { getMenuColumnsForCenter, type MenuColumn } from '@/lib/menuConfig'
import { imageUrl } from '@/lib/sanity'
import type { SanityCenter, SanityBrand } from '@/lib/queries'

/* ── Icon map ─────────────────────────────────────────────────── */
type LucideIcon = React.ComponentType<{ size?: number; strokeWidth?: number }>
const ICONS: Record<string, LucideIcon> = {
  Entdecken: Compass,
  Leistungen: Wrench,
  Kaufen: ShoppingCart,
  Mieten: Key,
  Roboter: Bot,
  Marken: Tag,
}

/* ── Social icons (Lucide doesn't ship brand icons) ──────────── */
function FacebookIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ── Framer variants ──────────────────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE } },
}

const colVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
}

const brandVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
}

const brandItemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.16 } },
}

/* ── Props ────────────────────────────────────────────────────── */
interface Props {
  centers: SanityCenter[]
  brandsByCenter: Record<string, SanityBrand[]>
  logoUrl?: string | null
}

export default function MegaMenu({ centers, brandsByCenter, logoUrl }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Open immediately on hover */
  const openMenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveId(id)
  }, [])

  /* 150ms delay so mouse has time to travel from nav to panel */
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveId(null), 150)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  /* ESC to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveId(null); setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* Body scroll lock for mobile */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const activeCenter = centers.find(c => c._id === activeId) ?? null
  const activeBrands = activeId ? (brandsByCenter[activeId] ?? []) : []
  const activeCols: MenuColumn[] = activeCenter
    ? getMenuColumnsForCenter(activeCenter.slug.current)
    : []

  /* Slightly darkened background for megamenu */
  const menuBg = activeCenter
    ? activeCenter.color
    : 'transparent'

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="header-wrapper" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
      {/* ══ HEADER ══════════════════════════════════════════════ */}
      <header className="main-header">
        <div className="container header-inner">
          {/* Logo – left */}
          <div className="header-logo-wrap">
            <Link href="/" className="header-logo" onClick={() => setActiveId(null)}>
              {logoUrl ? (
                <Image
                  src={logoUrl} alt="Ernst Moser GmbH"
                  width={200} height={60} priority className="logo-img" unoptimized
                />
              ) : (
                <span className="logo-fallback">Ernst Moser GmbH</span>
              )}
            </Link>
          </div>

          {/* Desktop nav – center */}
          <nav className="header-nav" aria-label="Hauptnavigation">
            {centers.map(c => (
              <button
                key={c._id}
                className={`nav-btn${activeId === c._id ? ' active' : ''}`}
                style={activeId === c._id ? { color: c.color } : {}}
                onMouseEnter={() => openMenu(c._id)}
                onClick={() => setActiveId(activeId === c._id ? null : c._id)}
                aria-expanded={activeId === c._id}
                aria-haspopup="true"
              >
                {c.name}
                <ChevronDown size={13} className={`nav-chevron${activeId === c._id ? ' open' : ''}`} />
              </button>
            ))}
            <Link
              href="/lagerfahrzeuge"
              className="nav-btn"
              onMouseEnter={() => setActiveId(null)}
              onClick={() => setActiveId(null)}
            >
              Lagerfahrzeuge
            </Link>
          </nav>

          {/* Right actions – right */}
          <div className="header-right">
            <a href="https://shop.ernst-moser.ch" target="_blank" rel="noopener noreferrer" className="shop-btn">
              <ShoppingBag size={14} />
              Zum Shop
            </a>
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Menu öffnen">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ══ MEGAMENU ════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeCenter && (
          <motion.div
            key={`mm-${activeCenter._id}`}
            className="megamenu"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ background: menuBg }}
          >
              <div className="megamenu-dark-layer">
                <div className="container">
                  <div className="megamenu-grid">

                    {/* ── Brands panel (LEFT, first column) ── */}
                    {activeBrands.length > 0 && (
                      <motion.div
                        className="megamenu-brands-panel"
                        variants={brandVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="megamenu-brands-label">
                          <Tag size={10} strokeWidth={2.5} style={{ display: 'inline', marginRight: 6 }} />
                          Marken
                        </div>
                        <div className={`megamenu-brands-grid${activeBrands.length >= 9 ? ' megamenu-brands-grid--2col' : ''}`}>
                          {activeBrands.map(brand => (
                            <motion.div key={brand._id} variants={brandItemVariants}>
                              <Link
                                href={`/${activeCenter.slug.current}/${brand.slug.current}`}
                                className="megamenu-brand-row"
                                onClick={() => setActiveId(null)}
                              >
                                <div className="megamenu-brand-logo-box">
                                  {brand.logo ? (
                                    <Image
                                      src={imageUrl(brand.logo)}
                                      alt={brand.name}
                                      width={40} height={24}
                                      className="megamenu-brand-logo"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="megamenu-brand-logo-placeholder" />
                                  )}
                                </div>
                                <span className="megamenu-brand-row-name">{brand.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* ── Category columns (RIGHT) ── */}
                    <div className="megamenu-cats">
                      {activeCols.map((col) => {
                        const Icon = ICONS[col.label] ?? Tag
                        return (
                          <motion.div
                            key={col.label}
                            className="megamenu-cat-group"
                            variants={colVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <div className="megamenu-cat-label">
                              <Icon size={12} strokeWidth={2.5} />
                              {col.label}
                            </div>
                            <ul className="megamenu-links-list">
                              {col.links.map(link => (
                                <motion.li key={link.label} variants={itemVariants}>
                                  <Link
                                    href={link.href}
                                    className="megamenu-link"
                                    onClick={() => setActiveId(null)}
                                  >
                                    <motion.span
                                      whileHover={{ x: 4 }}
                                      transition={{ duration: 0.15 }}
                                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                                    >
                                      <ChevronRight size={11} style={{ opacity: 0.35, flexShrink: 0 }} />
                                      {link.label}
                                    </motion.span>
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )
                      })}

                      {/* Center CTA — bottom right */}
                      <div className="megamenu-cta-wrap">
                        <Link
                          href={`/${activeCenter.slug.current}`}
                          className="megamenu-cta-link"
                          onClick={() => setActiveId(null)}
                        >
                          Zum {activeCenter.name}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ MOBILE MENU ═════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mob-overlay"
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mob-panel"
              className="mobile-menu"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            >
              {/* Header */}
              <div className="mobile-menu-header">
                {logoUrl
                  ? <Image src={logoUrl} alt="Ernst Moser GmbH" width={140} height={42} className="logo-img" unoptimized />
                  : <span className="logo-fallback">Ernst Moser GmbH</span>
                }
                <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Schliessen">
                  <X size={20} />
                </button>
              </div>

              {/* Centers */}
              <nav className="mobile-nav">
                {centers.map(c => {
                  const cols = getMenuColumnsForCenter(c.slug.current)
                  const brands = brandsByCenter[c._id] ?? []
                  const open = mobileExpanded === c._id
                  return (
                    <div key={c._id}>
                      <button
                        className={`mobile-center-btn${open ? ' active' : ''}`}
                        style={{ borderLeftColor: open ? c.color : 'transparent' }}
                        onClick={() => setMobileExpanded(open ? null : c._id)}
                      >
                        <span style={open ? { color: c.color } : {}}>{c.name}</span>
                        <ChevronDown size={14} className={`nav-chevron${open ? ' open' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            className="mobile-submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {cols.map(col => (
                              <div key={col.label}>
                                <div className="mobile-sub-label">{col.label}</div>
                                {col.links.map(link => (
                                  <Link
                                    key={link.label} href={link.href}
                                    className="mobile-sub-link"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <ChevronRight size={11} />{link.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {brands.length > 0 && (
                              <div>
                                <div className="mobile-sub-label">Marken</div>
                                {brands.map(b => (
                                  <Link
                                    key={b._id}
                                    href={`/${c.slug.current}/${b.slug.current}`}
                                    className="mobile-sub-link"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <ChevronRight size={11} />{b.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                            <Link
                              href={`/${c.slug.current}`} className="mobile-sub-link"
                              style={{ color: c.color, fontWeight: 700, borderBottom: 'none', marginTop: 8 }}
                              onClick={() => setMobileOpen(false)}
                            >
                              Alle {c.name} →
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
                <Link
                  href="/lagerfahrzeuge"
                  className="mobile-center-btn"
                  onClick={() => setMobileOpen(false)}
                  style={{ borderLeftColor: 'transparent' }}
                >
                  <span>Lagerfahrzeuge</span>
                </Link>
              </nav>

              {/* Shop + Social */}
              <div className="mobile-shop-wrap">
                <a
                  href="https://shop.ernst-moser.ch" target="_blank" rel="noopener noreferrer"
                  className="shop-btn" onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={14} />Zum Shop
                </a>
                <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
                  <a href="https://www.facebook.com/ernstmosergmbh" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--c-text-muted)' }} aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/ernstmosergmbh" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--c-text-muted)' }} aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
