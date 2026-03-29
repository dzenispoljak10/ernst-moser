import { getCenters, getAllBrands } from '@/lib/queries'
import { readClient as client, imageUrl } from '@/lib/sanity'
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
import { ArrowRight, Package } from 'lucide-react'

export const revalidate = 60

interface FeaturedProduct {
  _id: string
  name: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  priceLabel?: string
  brand: { name: string; slug: { current: string }; center: { slug: { current: string } } }
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
}

const STATS = [
  { value: 48, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 30, suffix: '+', label: 'Markenpartner' },
  { value: 3, suffix: '', label: 'Spezialbereiche' },
  { value: 20, suffix: '+', label: 'Fachleute im Team' },
]

export default async function HomePage() {
  const [centers, allBrands, featuredProducts] = await Promise.all([
    getCenters(),
    getAllBrands(),
    client.fetch<FeaturedProduct[]>(
      `*[_type == "product"] | order(_createdAt desc)[0..5] {
        _id, name, slug, mainImage, priceLabel,
        "brand": brand->{ name, slug, "center": center->{ slug } },
        "description": description[0..0]
      }`
    ).catch(() => [] as FeaturedProduct[]),
  ])

  return (
    <>
      {/* ══ 1: HERO ══════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0a 0%, #1B2D5B 55%, #0a0a0a 100%)' }} />
        </div>
        <div className="hero-overlay" />
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
                                  width={30}
                                  height={18}
                                  style={{ objectFit: 'contain', maxHeight: 18, width: 'auto', filter: 'brightness(0) invert(1)' }}
                                  unoptimized
                                />
                              ) : (
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
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

      {/* ══ 5: LEISTUNGEN ════════════════════════════════════════════ */}
      <HomeLeistungen />

      {/* ══ 6: WARUM ERNST MOSER (ZIGZAG) ════════════════════════════ */}
      <HomeZigzag />

      {/* ══ 7: GESCHICHTE TIMELINE ══════════════════════════════════ */}
      <HomeTimeline />

      {/* ══ 8: AKTUELLE PRODUKTE ════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="section hp-products-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
              <div>
                <div className="section-divider" style={{ background: '#C0392B' }} />
                <div className="section-label">Aktuelle Fahrzeuge & Geräte</div>
                <h2 className="section-title">Aus unserem<br />Sortiment</h2>
              </div>
              <Link href="/nutzfahrzeugcenter" className="btn-outline-dark">
                Alle anzeigen <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <div className="hp-products-grid">
              {featuredProducts.slice(0, 4).map((p, i) => (
                <AnimatedSection key={p._id} delay={i * 0.08}>
                  <Link
                    href={`/${p.brand.center.slug.current}/${p.brand.slug.current}/${p.slug.current}`}
                    className="hp-product-card"
                  >
                    <div className="hp-product-img">
                      {p.mainImage ? (
                        <Image
                          src={imageUrl(p.mainImage)}
                          alt={p.name}
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
                      <div className="hp-product-brand">{p.brand.name}</div>
                      <div className="hp-product-name">{p.name}</div>
                      {p.description?.[0]?.children && (
                        <div className="hp-product-desc">
                          {p.description[0].children.map(c => c.text).join('').slice(0, 80)}…
                        </div>
                      )}
                    </div>
                    <div className="hp-product-footer">
                      <span className="hp-product-price">{p.priceLabel ?? ''}</span>
                      <span className="hp-product-more">
                        Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* ══ 10: KONTAKT & STANDORT ══════════════════════════════════ */}
      <HomeKontakt />
    </>
  )
}
