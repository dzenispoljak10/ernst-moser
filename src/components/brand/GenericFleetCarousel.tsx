'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const INTERVAL = 3000
const SWIPE_THRESHOLD = 50

export interface GenericSlide {
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  detailUrl: string
  badge?: string
}

interface Props {
  accent: string
  eyebrow: string
  heading: string
  ariaLabel: string
  slides: GenericSlide[]
}

/**
 * Generischer Fallback-Karussell — wird auf Brand-Pages verwendet, die
 * keinen brand-spezifischen Katalog haben. Liest Slides als Plain-JSON
 * (keine Icons), damit der Server→Client-Transfer funktioniert.
 */
export default function GenericFleetCarousel({
  accent,
  eyebrow,
  heading,
  ariaLabel,
  slides,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion || slides.length < 2) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, INTERVAL)
    return () => clearTimeout(t)
  }, [activeIndex, isPaused, reducedMotion, slides.length])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])
  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length)
  }, [slides.length])
  const goTo = useCallback((idx: number) => setActiveIndex(idx), [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
  }
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goNext(); else goPrev()
    }
    touchStartX.current = null
  }

  if (slides.length === 0) return null

  return (
    <section
      className="isuzu-carousel-section"
      style={{ ['--isuzu-accent' as string]: accent }}
    >
      <div className="isuzu-carousel-inner">
        <div className="isuzu-carousel-header">
          <div className="isuzu-carousel-eyebrow" style={{ color: accent }}>
            {eyebrow}
          </div>
          <h2 className="isuzu-carousel-heading">{heading}</h2>
        </div>

        <div
          ref={rootRef}
          className="isuzu-carousel-stage"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="isuzu-carousel-track" aria-live="polite">
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <article
                  key={slide.slug}
                  className={`isuzu-carousel-slide${isActive ? ' isuzu-carousel-slide--active' : ''}`}
                  aria-hidden={!isActive}
                  aria-label={`${idx + 1} von ${slides.length}: ${slide.title}`}
                >
                  <div className="isuzu-carousel-image-col">
                    {slide.badge && (
                      <span className="isuzu-carousel-cat-badge" style={{ background: accent }}>
                        {slide.badge}
                      </span>
                    )}
                    <div className="isuzu-carousel-image-wrap">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="isuzu-carousel-image"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                  <div className="isuzu-carousel-content">
                    <h3 className="isuzu-carousel-title">{slide.title}</h3>
                    <p className="isuzu-carousel-desc">{slide.description}</p>
                    <Link
                      href={slide.detailUrl}
                      className="isuzu-carousel-cta"
                      style={{ background: accent }}
                      tabIndex={isActive ? 0 : -1}
                    >
                      Details ansehen
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {slides.length > 1 && (
            <>
              <button type="button" className="isuzu-carousel-arrow isuzu-carousel-arrow--prev" onClick={goPrev} aria-label="Vorheriges Produkt">
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="isuzu-carousel-arrow isuzu-carousel-arrow--next" onClick={goNext} aria-label="Nächstes Produkt">
                <ChevronRight size={20} />
              </button>

              <div className="isuzu-carousel-progress" aria-hidden="true">
                <div
                  key={activeIndex}
                  className={`isuzu-carousel-progress-fill${isPaused || reducedMotion ? ' isuzu-carousel-progress-fill--paused' : ''}`}
                  style={{ background: accent }}
                />
              </div>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="isuzu-carousel-dots" role="tablist" aria-label="Slide-Auswahl">
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={slide.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={slide.title}
                  onClick={() => goTo(idx)}
                  className={`isuzu-carousel-dot${isActive ? ' isuzu-carousel-dot--active' : ''}`}
                  style={isActive ? { background: accent } : undefined}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
