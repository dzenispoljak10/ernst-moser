import { getCenters, getAllBrands } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import CountUp from '@/components/ui/CountUp'
import HeroContent from '@/components/ui/HeroContent'
import AnimatedSection from '@/components/ui/AnimatedSection'
import HomeAbout from '@/components/home/HomeAbout'
import HomeLeistungen from '@/components/home/HomeLeistungen'
import HomeZigzag from '@/components/home/HomeZigzag'
import HomeTimeline from '@/components/home/HomeTimeline'
import HomeKontakt from '@/components/home/HomeKontakt'
import InstagramSection from '@/components/InstagramSection'
import { ArrowRight, Package, Tag } from 'lucide-react'
import { getRabattaktionen } from '@/lib/rabattaktionen'

export const revalidate = 60

const STATS = [
  { value: 48, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 30, suffix: '+', label: 'Markenpartner' },
  { value: 3, suffix: '', label: 'Spezialbereiche' },
  { value: 20, suffix: '+', label: 'Fachleute im Team' },
]

export default async function HomePage() {
  const [centers, allBrands, rabattCards] = await Promise.all([
    getCenters(),
    getAllBrands(),
    getRabattaktionen(4),
  ])

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

          <div className="hp-centers-grid">
            {centers.map((center, ci) => {
              const centerBrands = allBrands.filter(b => b.center._id === center._id).slice(0, 8)
              return (
                <AnimatedSection key={center._id} delay={ci * 0.1}>
                  <Link href={`/${center.slug.current}`} className="hp-center-card">
                    {/* Background image */}
                    {center.heroImage ? (
                      <Image
                        src={imageUrl(center.heroImage)}
                        alt={center.name}
                        fill
                        className="hp-center-card-bg"
                        sizes="(max-width: 900px) 100vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="hp-center-card-bg"
                        style={{ background: `linear-gradient(135deg, ${center.color}ee, ${center.color}88)`, position: 'absolute', inset: 0 }}
                      />
                    )}
                    <div className="hp-center-card-overlay" />

                    {/* Brand count pill */}
                    {centerBrands.length > 0 && (
                      <div className="hp-center-pill">
                        {allBrands.filter(b => b.center._id === center._id).length} Marken
                      </div>
                    )}

                    {/* Content */}
                    <div className="hp-center-content">
                      <div className="hp-center-accent" style={{ background: center.color }} />
                      <div className="hp-center-name">{center.name}</div>
                      {center.description && (
                        <div className="hp-center-desc">{center.description}</div>
                      )}

                      {/* Brand logo mini-grid */}
                      {centerBrands.length > 0 && (
                        <div className="hp-center-brands">
                          {centerBrands.map(brand => (
                            <div key={brand._id} className="hp-center-brand-chip" title={brand.name}>
                              {brand.logo ? (
                                <Image
                                  src={imageUrl(brand.logo)}
                                  alt={brand.name}
                                  width={60}
                                  height={24}
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
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ 4: RABATTAKTIONEN ═══════════════════════════════════════ */}
      {rabattCards.length > 0 && (
        <section className="section hp-products-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
              <div>
                <div className="section-divider" style={{ background: '#C0392B' }} />
                <div className="section-label">Aktuelle Angebote</div>
                <h2 className="section-title">Rabattaktionen</h2>
              </div>
              <Link href="/rabattaktionen" className="btn-outline-dark">
                Alle anzeigen <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <div className="hp-products-grid">
              {rabattCards.map((c, i) => (
                <AnimatedSection key={c.id} delay={i * 0.08}>
                  <Link href="/rabattaktionen" className="hp-product-card">
                    <div className="hp-product-img">
                      {c.badgeLabel && (
                        <span className="hp-product-badge">
                          <Tag size={11} /> {c.badgeLabel}
                        </span>
                      )}
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.title}
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--c-text-muted)' }}>
                          <Package size={40} opacity={0.2} />
                        </div>
                      )}
                    </div>
                    <div className="hp-product-body">
                      {c.subtitle && <div className="hp-product-brand">{c.subtitle}</div>}
                      <div className="hp-product-name">{c.title}</div>
                      {c.description && (
                        <div className="hp-product-desc">
                          {c.description.slice(0, 80)}
                          {c.description.length > 80 ? '…' : ''}
                        </div>
                      )}
                    </div>
                    <div className="hp-product-footer">
                      <span className="hp-product-price">{c.priceLabel ?? ''}</span>
                      <span className="hp-product-more">
                        Mehr dazu <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5: STATS BAR ════════════════════════════════════════════ */}
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
