'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

export interface CenterBrandData {
  _id: string
  name: string
  logoUrl: string | null
  hoverImage: string | null
}

export interface CenterCardData {
  _id: string
  name: string
  slug: string
  color: string
  description: string | null
  heroImageUrl: string | null
  brandCount: number
  brands: CenterBrandData[]
}

const MAX_SLIDES = 6

export default function HomeCenters({ centers }: { centers: CenterCardData[] }) {
  return (
    <div className="hp-centers-grid">
      {centers.map((center, ci) => (
        <AnimatedSection key={center._id} delay={ci * 0.1}>
          <CenterCard center={center} />
        </AnimatedSection>
      ))}
    </div>
  )
}

function CenterCard({ center }: { center: CenterCardData }) {
  const [hoverImg, setHoverImg] = useState<string | null>(null)

  // Background slideshow images: center hero + a few brand photos
  const slides = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    if (center.heroImageUrl) {
      out.push(center.heroImageUrl)
      seen.add(center.heroImageUrl)
    }
    for (const b of center.brands) {
      if (b.hoverImage && !seen.has(b.hoverImage)) {
        out.push(b.hoverImage)
        seen.add(b.hoverImage)
      }
      if (out.length >= MAX_SLIDES) break
    }
    return out
  }, [center])

  const [idx, setIdx] = useState(0)

  // Auto-advance the slideshow, paused while a brand logo is hovered
  useEffect(() => {
    if (hoverImg || slides.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [hoverImg, slides.length])

  return (
    <Link href={`/${center.slug}`} className="hp-center-card">
      {/* Background slideshow layers (crossfade) */}
      {slides.length > 0 ? (
        slides.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            unoptimized
            className="hp-center-card-bg"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))
      ) : (
        <div
          className="hp-center-card-bg"
          style={{
            background: `linear-gradient(135deg, ${center.color}ee, ${center.color}88)`,
            position: 'absolute',
            inset: 0,
            opacity: 1,
          }}
        />
      )}

      {/* Hovered brand photo — fades in on top of the slideshow */}
      {hoverImg && (
        <Image
          src={hoverImg}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          unoptimized
          className="hp-center-card-bg hp-center-card-bg--hover"
        />
      )}

      {/* Center-color tint — always the same colour for this center */}
      <div
        className="hp-center-card-overlay"
        style={{
          background: `linear-gradient(to top, ${center.color}f0 0%, ${center.color}a6 36%, ${center.color}4d 64%, transparent 100%)`,
        }}
      />

      {center.brandCount > 0 && (
        <div className="hp-center-pill">{center.brandCount} Marken</div>
      )}

      <div className="hp-center-content">
        <div className="hp-center-text">
          <div className="hp-center-accent" style={{ background: '#fff' }} />
          <div className="hp-center-name">{center.name}</div>
          {center.description && (
            <div className="hp-center-desc">{center.description}</div>
          )}
        </div>

        {center.brands.length > 0 && (
          <div className="hp-center-brands">
            {center.brands.map((brand) => (
              <div
                key={brand._id}
                className="hp-center-brand-chip"
                title={brand.name}
                onMouseEnter={() => brand.hoverImage && setHoverImg(brand.hoverImage)}
                onMouseLeave={() => setHoverImg(null)}
              >
                {brand.logoUrl ? (
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={56}
                    height={22}
                    className="hp-center-brand-logo"
                    unoptimized
                  />
                ) : (
                  <span style={{ fontSize: 10, color: '#1f2937', fontWeight: 700 }}>
                    {brand.name.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="hp-center-action">
          Mehr erfahren <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}
