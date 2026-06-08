import { getCenters, getAllBrands } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity'
import { brandHeroImage } from '@/lib/serverImages'
import Image from 'next/image'
import Link from 'next/link'
import CountUp from '@/components/ui/CountUp'
import HeroContent from '@/components/ui/HeroContent'
import AnimatedSection from '@/components/ui/AnimatedSection'
import HomeCenters from '@/components/home/HomeCenters'
import HomeAbout from '@/components/home/HomeAbout'
import HomeLeistungen from '@/components/home/HomeLeistungen'
import HomeRoboter from '@/components/home/HomeRoboter'
import HomeZigzag from '@/components/home/HomeZigzag'
import HomeTimeline from '@/components/home/HomeTimeline'
import HomeKontakt from '@/components/home/HomeKontakt'
import InstagramSection from '@/components/InstagramSection'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

const STATS = [
  { value: 48, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 30, suffix: '+', label: 'Markenpartner' },
  { value: 3, suffix: '', label: 'Spezialbereiche' },
  { value: 20, suffix: '+', label: 'Fachleute im Team' },
]

export default async function HomePage() {
  const [centers, allBrands] = await Promise.all([
    getCenters(),
    getAllBrands(),
  ])

  const centersData = centers.map((center) => {
    const centerBrands = allBrands.filter((b) => b.center._id === center._id)
    return {
      _id: center._id,
      name: center.name,
      slug: center.slug.current,
      color: center.color,
      description: center.description ?? null,
      heroImageUrl: center.heroImage ? imageUrl(center.heroImage) : null,
      brandCount: centerBrands.length,
      brands: centerBrands.map((b) => ({
        _id: b._id,
        name: b.name,
        logoUrl: b.logo ? imageUrl(b.logo) : null,
        hoverImage: brandHeroImage(b.slug.current),
      })),
    }
  })

  return (
    <>
      {/* ══ 1: HERO ══════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg">
          <video
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/hero-dji-poster.webp"
          >
            <source src="/video/hero-dji.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />
        <div className="hero-overlay-left" />
        <div className="hero-overlay-bottom" />
        <HeroContent />
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <div className="hero-scroll-dot" />
        </div>
      </section>

      {/* ══ 2: ÜBER UNS ══════════════════════════════════════════════ */}
      <HomeAbout />

      {/* ══ 3: DREI CENTER ═══════════════════════════════════════════ */}
      <section id="center" className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <div>
              <div className="section-divider" style={{ background: '#4A7C59' }} />
              <div className="section-label">Unsere Spezialgebiete</div>
              <h2 className="section-title">Drei Center.<br />Eine Adresse.</h2>
            </div>
            <a
              href="#kontakt"
              className="btn-outline-dark"
            >
              Kontakt aufnehmen
              <ArrowRight size={14} />
            </a>
          </AnimatedSection>

          <HomeCenters centers={centersData} />
        </div>
      </section>

      {/* ══ 4: STATS BAR ════════════════════════════════════════════ */}
      <div className="stats-bar">
        <div className="container">
          <AnimatedSection className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="stat-number">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-divider" />
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>

      {/* ══ 6: LEISTUNGEN ════════════════════════════════════════════ */}
      <HomeLeistungen />

      {/* ══ 6b: ROBOTER (Verweis auf Roboter-Seite) ═════════════════ */}
      <HomeRoboter />

      {/* ══ 7: WARUM ERNST MOSER (ZIGZAG) ════════════════════════════ */}
      <HomeZigzag />

      {/* ══ 8: GESCHICHTE TIMELINE ══════════════════════════════════ */}
      <HomeTimeline />

      {/* ══ 9: MARKENPARTNER ════════════════════════════════════════ */}
      {allBrands.length > 0 && (
        <section className="section hp-brands-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-divider" style={{ background: '#1B2D5B' }} />
                <div className="section-label">Unsere Markenpartner</div>
                <h2 className="section-title">Führende Marken,<br />beste Qualität</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection className="hp-brands-wall" delay={0.1}>
              {allBrands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/${brand.center.slug.current}/${brand.slug.current}`}
                  className="hp-brand-chip"
                  title={brand.name}
                >
                  {brand.logo ? (
                    <Image
                      src={imageUrl(brand.logo)}
                      alt={brand.name}
                      width={90}
                      height={40}
                      style={{ maxHeight: 40, width: 'auto', objectFit: 'contain' }}
                      unoptimized
                    />
                  ) : (
                    <span className="hp-brand-chip-name">{brand.name}</span>
                  )}
                </Link>
              ))}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ══ 10: INSTAGRAM ═══════════════════════════════════════════ */}
      <InstagramSection />

      {/* ══ 11: KONTAKT & STANDORT ══════════════════════════════════ */}
      <HomeKontakt />
    </>
  )
}
