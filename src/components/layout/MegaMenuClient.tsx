'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShoppingBag, X, ChevronRight, ArrowRight, Menu } from 'lucide-react'
import type { SanityCenter, SanityBrand, SanityMenuCategory } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity'

interface Props {
  centers: SanityCenter[]
  brandsByCenter: Record<string, SanityBrand[]>
  menuCatsByCenter: Record<string, SanityMenuCategory[]>
  logoUrl?: string | null
}

export default function MegaMenuClient({ centers, brandsByCenter, menuCatsByCenter, logoUrl }: Props) {
  const [activeCenter, setActiveCenter] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCenterOpen, setMobileCenterOpen] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const openMenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveCenter(id)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveCenter(null), 160)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const activeData = centers.find(c => c._id === activeCenter) ?? null
  const activeBrands = activeCenter ? (brandsByCenter[activeCenter] ?? []) : []
  const activeMenuCats = activeCenter ? (menuCatsByCenter[activeCenter] ?? []) : []

  return (
    <div ref={wrapperRef} className="header-wrapper">
      {/* ── Main Header ─────────────────────────────────────── */}
      <header className="main-header">
        <div className="container header-inner">
          {/* Logo */}
          <Link href="/" className="header-logo" onClick={() => setActiveCenter(null)}>
            {logoUrl ? (
              <Image src={logoUrl} alt="Ernst Moser GmbH" width={200} height={60} priority className="logo-img" unoptimized />
            ) : (
              <span className="logo-fallback">Ernst Moser GmbH</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Hauptnavigation">
            {centers.map((center) => (
              <button
                key={center._id}
                className={`nav-btn${activeCenter === center._id ? ' active' : ''}`}
                style={activeCenter === center._id ? { color: center.color } : {}}
                onMouseEnter={() => openMenu(center._id)}
                onMouseLeave={scheduleClose}
                aria-expanded={activeCenter === center._id}
                aria-haspopup="true"
              >
                {center.name}
                <ChevronDown
                  size={13}
                  className={`nav-chevron${activeCenter === center._id ? ' open' : ''}`}
                />
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="header-right">
            <a
              href="https://shop.ernst-moser.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="shop-btn"
            >
              <ShoppingBag size={14} />
              Zum Shop
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Navigation öffnen"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Megamenu ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeData && (
          <>
            <motion.div
              key="backdrop"
              className="megamenu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveCenter(null)}
            />
            <motion.div
              key={activeData._id}
              className="megamenu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              style={{ background: activeData.color }}
            >
              <div className="megamenu-bg">
                <div className="container">
                  <div className="megamenu-grid">
                    {/* Categories */}
                    <div className="megamenu-cats">
                      {activeMenuCats.map((cat, i) => (
                        <motion.div
                          key={cat._id}
                          className="megamenu-cat-group"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.2 }}
                        >
                          <div className="megamenu-cat-label">
                            {cat.icon && <span>{cat.icon}</span>}
                            {cat.title}
                          </div>
                          {cat.links && cat.links.length > 0 && (
                            <ul className="megamenu-links-list">
                              {cat.links.map((link, j) => (
                                <li key={j}>
                                  <Link
                                    href={link.href}
                                    className="megamenu-link"
                                    onClick={() => setActiveCenter(null)}
                                  >
                                    <ChevronRight size={12} style={{ opacity: 0.4 }} />
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}

                      {/* CTA to center page */}
                      <div className="megamenu-center-cta">
                        <Link
                          href={`/${activeData.slug.current}`}
                          className="megamenu-cta-link"
                          onClick={() => setActiveCenter(null)}
                        >
                          Zum {activeData.name}
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>

                    {/* Brands panel */}
                    {activeBrands.length > 0 && (
                      <motion.div
                        className="megamenu-brands-panel"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.22 }}
                      >
                        <div className="megamenu-brands-label">Unsere Marken</div>
                        <div className="megamenu-brands-grid">
                          {activeBrands.map((brand) => (
                            <Link
                              key={brand._id}
                              href={`/${activeData.slug.current}/${brand.slug.current}`}
                              className="megamenu-brand-item"
                              onClick={() => setActiveCenter(null)}
                              title={brand.name}
                            >
                              {brand.logo ? (
                                <Image
                                  src={imageUrl(brand.logo)}
                                  alt={brand.name}
                                  width={100}
                                  height={50}
                                  className="megamenu-brand-logo"
                                  unoptimized
                                />
                              ) : (
                                <span className="megamenu-brand-text">{brand.name}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            >
              <div className="mobile-menu-header">
                {logoUrl ? (
                  <Image src={logoUrl} alt="Ernst Moser GmbH" width={140} height={42} className="logo-img" unoptimized />
                ) : (
                  <span className="logo-fallback">Ernst Moser GmbH</span>
                )}
                <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Schliessen">
                  <X size={20} />
                </button>
              </div>

              <nav className="mobile-nav">
                {centers.map((center) => (
                  <div key={center._id}>
                    <button
                      className={`mobile-center-btn${mobileCenterOpen === center._id ? ' active' : ''}`}
                      style={{ borderLeftColor: mobileCenterOpen === center._id ? center.color : 'transparent' }}
                      onClick={() =>
                        setMobileCenterOpen(mobileCenterOpen === center._id ? null : center._id)
                      }
                    >
                      <span style={mobileCenterOpen === center._id ? { color: center.color } : {}}>
                        {center.name}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`nav-chevron${mobileCenterOpen === center._id ? ' open' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileCenterOpen === center._id && (
                        <motion.div
                          key="sub"
                          className="mobile-submenu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {(menuCatsByCenter[center._id] ?? []).map((cat) => (
                            <div key={cat._id}>
                              <div className="mobile-sub-label">{cat.title}</div>
                              {(cat.links ?? []).map((link, i) => (
                                <Link
                                  key={i}
                                  href={link.href}
                                  className="mobile-sub-link"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <ChevronRight size={12} />
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}

                          {(brandsByCenter[center._id] ?? []).length > 0 && (
                            <div>
                              <div className="mobile-sub-label">Marken</div>
                              {(brandsByCenter[center._id] ?? []).map((brand) => (
                                <Link
                                  key={brand._id}
                                  href={`/${center.slug.current}/${brand.slug.current}`}
                                  className="mobile-sub-link"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <ChevronRight size={12} />
                                  {brand.name}
                                </Link>
                              ))}
                            </div>
                          )}

                          <Link
                            href={`/${center.slug.current}`}
                            className="mobile-sub-link"
                            style={{ color: center.color, fontWeight: 700, borderBottom: 'none', marginTop: 8 }}
                            onClick={() => setMobileOpen(false)}
                          >
                            Alle {center.name} →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="mobile-shop-wrap">
                <a
                  href="https://shop.ernst-moser.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={14} />
                  Zum Shop
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
