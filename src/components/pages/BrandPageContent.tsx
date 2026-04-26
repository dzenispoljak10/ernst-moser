import { readClient as client, imageUrl } from '@/lib/sanity'
import { productImageBySlug, teamPhotoByName } from '@/lib/serverImages'
import { getSalespersonByBrand } from '@/lib/queries'
import { getIcon } from '@/lib/iconMap'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import BrandHeroContent from '@/components/ui/BrandHeroContent'
import BrandAboutSection from '@/components/ui/BrandAboutSection'
import BrandSalespersonSection from '@/components/ui/BrandSalespersonSection'
import IsuzuCategorySections from '@/components/brand/IsuzuCategorySections'
import IsuzuFleetCarousel from '@/components/brand/IsuzuFleetCarousel'
import PiaggioProductSections from '@/components/brand/PiaggioProductSections'
import PiaggioFleetCarousel from '@/components/brand/PiaggioFleetCarousel'
import FiatFleetCarousel from '@/components/brand/FiatFleetCarousel'
import DhollandiaProductSections from '@/components/brand/DhollandiaProductSections'
import ScaniaProductSections from '@/components/brand/ScaniaProductSections'
import ScaniaFleetCarousel from '@/components/brand/ScaniaFleetCarousel'
import UTProductSections from '@/components/brand/UTProductSections'
import UTFleetCarousel from '@/components/brand/UTFleetCarousel'
import HilltipCategorySections from '@/components/brand/HilltipCategorySections'
import HilltipFleetCarousel from '@/components/brand/HilltipFleetCarousel'
import KommunalBrandSections from '@/components/brand/KommunalBrandSections'
import KommunalFleetCarousel from '@/components/brand/KommunalFleetCarousel'
import GenericFleetCarousel from '@/components/brand/GenericFleetCarousel'
import BrandVideoSection from '@/components/brand/BrandVideoSection'
import { KOMMUNAL_BRANDS, KOMMUNAL_CAROUSEL_SLIDES } from '@/lib/kommunal-catalogs'
import { MOTORGERAETE_BRANDS, MOTORGERAETE_CAROUSEL_SLIDES } from '@/lib/motorgeraete-catalogs'
import { getBrandVideo } from '@/lib/brand-videos'
import CountUp from '@/components/ui/CountUp'
import { ArrowRight, Package } from 'lucide-react'

// ─── Typen ────────────────────────────────────────────────────────────────────

interface PortableBlock {
  _type: string
  children?: Array<{ text: string }>
}

interface SanityProduct {
  _key: string
  name: string
  info?: string
  image?: { asset: { _ref: string } }
}

interface SanityHighlight {
  _key: string
  icon?: string
  label: string
  desc?: string
}

interface SanityFeature {
  _key: string
  icon?: string
  title: string
  desc: string
}

interface SanityStat {
  _key: string
  value: number
  suffix?: string
  label: string
}

interface SanityApplication {
  _key: string
  icon?: string
  title: string
  desc?: string
}

interface Product {
  _id: string
  name: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  description?: PortableBlock[]
  priceLabel?: string
}

// ─── Portable Text → plain text ──────────────────────────────────────────────
function ptText(blocks?: PortableBlock[]): string {
  if (!blocks?.length) return ''
  return blocks
    .map(b => (b._type === 'block' && b.children) ? b.children.map(c => c.text).join('') : '')
    .join('\n\n')
    .trim()
}

// ─── Komponente ───────────────────────────────────────────────────────────────

export default async function BrandPageContent({
  centerSlug,
  brandSlug,
}: {
  centerSlug: string
  brandSlug: string
}) {
  const brand = await client.fetch(
    `*[_type == "brand" && slug.current == $brandSlug && center->slug.current == $centerSlug][0] {
      _id, name, slug, logo, heroImage, description, images, tagline,
      highlights, features, products, stats, applications,
      "center": center->{ _id, name, slug, color }
    }`,
    { centerSlug, brandSlug }
  )

  if (!brand) notFound()

  const center = brand.center

  const [sp, sanityProducts] = await Promise.all([
    getSalespersonByBrand(brand._id, center._id),
    client.fetch<Product[]>(
      `*[_type == "product" && brand._ref == $brandId] | order(_createdAt desc)[0..8] {
        _id, name, slug, mainImage, priceLabel,
        "description": description[0..1]
      }`,
      { brandId: brand._id }
    ),
  ])

  const highlights: SanityHighlight[]     = brand.highlights ?? []
  const features: SanityFeature[]         = brand.features ?? []
  const inlineProducts: SanityProduct[]   = brand.products ?? []
  const stats: SanityStat[]               = brand.stats ?? []
  const applications: SanityApplication[] = brand.applications ?? []

  const hasProducts     = sanityProducts.length > 0 || inlineProducts.length > 0
  const hasHighlights   = highlights.length > 0
  const hasFeatures     = features.length > 0
  const hasStats        = stats.length > 0
  const hasApplications = applications.length > 0

  const heroImgRaw = brand.heroImage ?? brand.images?.[0] ?? null
  // Locally-hosted brand hero overrides (sourced from each brand's official
  // site, converted to WebP 85 %, stored in public/images/<brand>/).
  //
  // Cache-Hinweis: Next.js cached optimierte Bildvarianten in
  // `.next/dev/cache/images` (bzw. `.next/cache/images` im Build) keyed on
  // URL + width. Wenn eine Datei unter gleichem Pfad ersetzt wird, bleibt
  // der Cache stehen — "altes Bild nach Datei-Swap" ist fast immer die
  // Folge. Fix: `rm -rf .next/dev/cache/images` + Dev-Server neu starten.
  // Alternativ Dateinamen versionieren (foo-v2.webp), wenn das häufiger
  // nötig wird.
  const LOCAL_HERO_OVERRIDES: Record<string, string> = {
    fiat: '/images/fiat/hero-natural-born-workers.webp',
    isuzu: '/images/isuzu/hero-steering-wheel.webp',
    ut: '/images/brands/ut/hero.webp',
    hilltip: '/images/brands/hilltip/hero.webp',
    alk: '/images/brands/alk/hero.webp',
    kubota: '/images/brands/kubota/hero.webp',
    'gianni-ferrari': '/images/brands/gianni-ferrari/hero.webp',
    'ligier-professional': '/images/brands/ligier-professional/hero.webp',
    timan: '/images/brands/timan/hero.webp',
    matev: '/images/brands/matev/hero.webp',
    ecotech: '/images/brands/ecotech/hero.webp',
  }
  const heroImgUrl =
    LOCAL_HERO_OVERRIDES[brandSlug] ?? (heroImgRaw ? imageUrl(heroImgRaw) : null)
  const logoUrl = brand.logo ? imageUrl(brand.logo) : null
  const spPhotoUrl =
    teamPhotoByName(sp?.firstName, sp?.lastName) ??
    (sp?.photo ? imageUrl(sp.photo) : null)

  const descBlocks = (brand.description ?? []) as PortableBlock[]
  const descText   = ptText(descBlocks)
  const accentAlpha = `${center.color}1a`

  return (
    <>
      {/* ═══ 1: Hero ══════════════════════════════════════════════════════ */}
      {/* Piaggio: Vimeo video background + fixed stats (1884 / 140+ / 100+). */}
      <BrandHeroContent
        brandName={brand.name}
        centerName={center.name}
        centerSlug={centerSlug}
        centerColor={center.color}
        logoUrl={logoUrl}
        secondLogoUrl={brandSlug === 'segway' ? '/images/brands/segway/navimow-logo.webp' : null}
        secondLogoAlt={brandSlug === 'segway' ? 'Navimow Logo' : null}
        tagline={brand.tagline}
        heroImgUrl={heroImgUrl}
        videoBackground={
          brandSlug === 'piaggio'
            ? 'https://player.vimeo.com/video/1092462723?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1'
            : null
        }
        stats={
          brandSlug === 'piaggio'
            ? [
                { _key: 'pg-1884', value: 1884, label: 'Gegründet' },
                { _key: 'pg-years', value: 140, suffix: '+', label: 'Jahre' },
                { _key: 'pg-countries', value: 100, suffix: '+', label: 'Länder' },
              ]
            : stats
        }
      />

      {/* ═══ 2: Über die Marke ════════════════════════════════════════════ */}
      {descText && (
        <BrandAboutSection
          brandName={brand.name}
          descBlocks={descBlocks}
          highlights={highlights}
          centerColor={center.color}
        />
      )}

      {/* ═══ 3: Stats ═════════════════════════════════════════════════════ */}
      {hasStats && (
        <section
          className="brand-stats-section"
          style={{ ['--brand-stats-bg' as string]: center.color }}
        >
          <div className="container">
            <div className="brand-stats-grid">
              {stats.map((stat) => (
                <div key={stat._key ?? stat.label} className="brand-stat-item">
                  <div className="brand-stat-num">
                    <CountUp to={stat.value} suffix={stat.suffix ?? ''} />
                  </div>
                  <div className="brand-stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 4: Anwendungsgebiete ═════════════════════════════════════════ */}
      {hasApplications && (
        <section className="section brand-apps-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-divider" style={{ background: center.color }} />
                <div className="section-label">Einsatzbereiche</div>
                <h2 className="section-title">Anwendungsgebiete</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <div className="brand-apps-grid">
                {applications.map((app) => {
                  const Icon = getIcon(app.icon)
                  return (
                    <div key={app._key ?? app.title} className="brand-app-card">
                      <div className="brand-app-icon" style={{ background: accentAlpha }}>
                        <Icon size={28} color={center.color} />
                      </div>
                      <div className="brand-app-title">{app.title}</div>
                      {app.desc && <div className="brand-app-desc">{app.desc}</div>}
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══ 5a: Isuzu – Kategorien (keine Modellvarianten, externe Links) ═ */}
      {brandSlug === 'isuzu' && <IsuzuCategorySections accent={center.color} />}

      {/* ═══ 5a: Piaggio – zwei Sections (NP6 Chassis + NPE Elektro) ═════ */}
      {brandSlug === 'piaggio' && <PiaggioProductSections accent={center.color} />}

      {/* ═══ 5a: Dhollandia – sechs Hebebühnen-Kategorien ════════════════ */}
      {brandSlug === 'dhollandia' && <DhollandiaProductSections accent={center.color} />}

      {/* ═══ 5a: Scania – 10 Lkw-Baureihen ══════════════════════════════ */}
      {brandSlug === 'scania' && <ScaniaProductSections accent={center.color} />}

      {/* ═══ 5a: UT – Aufbauten-Katalog ═════════════════════════════════ */}
      {brandSlug === 'ut' && <UTProductSections accent={center.color} />}

      {/* ═══ 5a: Hilltip – 3 Fahrzeugklassen Winterdienst ═══════════════ */}
      {brandSlug === 'hilltip' && <HilltipCategorySections accent={center.color} />}

      {/* ═══ 5a: Kommunalcenter-Marken – generische Brand-Sektion ═══════ */}
      {KOMMUNAL_BRANDS[brandSlug] && (
        <KommunalBrandSections
          centerSlug={centerSlug}
          brandSlug={brandSlug}
          brandName={KOMMUNAL_BRANDS[brandSlug].brandName}
          accent={center.color}
          eyebrow={KOMMUNAL_BRANDS[brandSlug].sectionEyebrow}
          title={KOMMUNAL_BRANDS[brandSlug].sectionTitle}
          lead={KOMMUNAL_BRANDS[brandSlug].sectionLead}
          homepageUrl={KOMMUNAL_BRANDS[brandSlug].homepageUrl ?? null}
          models={KOMMUNAL_BRANDS[brandSlug].products.map((p) => ({
            slug: p.slug,
            title: p.title,
            shortDescription: p.shortDescription,
            image: p.image,
            category: p.category,
          }))}
        />
      )}

      {/* ═══ 5a: Motorgerätecenter-Marken (Pudu, Segway, Stihl) ═════════ */}
      {MOTORGERAETE_BRANDS[brandSlug] && (
        <KommunalBrandSections
          centerSlug={centerSlug}
          brandSlug={brandSlug}
          brandName={MOTORGERAETE_BRANDS[brandSlug].brandName}
          accent={center.color}
          eyebrow={MOTORGERAETE_BRANDS[brandSlug].sectionEyebrow}
          title={MOTORGERAETE_BRANDS[brandSlug].sectionTitle}
          lead={MOTORGERAETE_BRANDS[brandSlug].sectionLead}
          homepageUrl={MOTORGERAETE_BRANDS[brandSlug].homepageUrl ?? null}
          models={MOTORGERAETE_BRANDS[brandSlug].products.map((p) => ({
            slug: p.slug,
            title: p.title,
            shortDescription: p.shortDescription,
            image: p.image,
            category: p.category,
          }))}
        />
      )}

      {/* ═══ 5: Produkte ══════════════════════════════════════════════════ */}
      {brandSlug !== 'isuzu' && brandSlug !== 'piaggio' && brandSlug !== 'dhollandia' && brandSlug !== 'scania' && brandSlug !== 'ut' && brandSlug !== 'hilltip' && !KOMMUNAL_BRANDS[brandSlug] && !MOTORGERAETE_BRANDS[brandSlug] && hasProducts && (
        <section id="produkte" className="section brand-products-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-divider" style={{ background: center.color }} />
                <div className="section-label">Modelle & Produkte</div>
                <h2 className="section-title">Aktuelle Produkte</h2>
              </div>
            </AnimatedSection>

            {sanityProducts.length > 0 ? (
              <AnimatedSection className="brand-products-grid" delay={0.05}>
                {sanityProducts.map((product) => {
                  const productImgUrl =
                    productImageBySlug(product.slug?.current ?? '') ??
                    (product.mainImage ? imageUrl(product.mainImage) : null) ??
                    (brand.heroImage ? imageUrl(brand.heroImage) : null) ??
                    (brand.images?.[0] ? imageUrl(brand.images[0]) : null) ??
                    null
                  return (
                    <Link
                      key={product._id}
                      href={`/${centerSlug}/${brandSlug}/${product.slug?.current ?? ''}`}
                      className="brand-product-card"
                      style={{ ['--product-accent' as string]: center.color }}
                    >
                      <div className="brand-product-img">
                        {productImgUrl ? (
                          <Image
                            src={productImgUrl}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text-muted)' }}>
                            <Package size={40} opacity={0.2} />
                          </div>
                        )}
                      </div>
                      <div className="brand-product-body">
                        <div className="brand-product-name">{product.name}</div>
                        {product.description?.[0] && (
                          <div className="brand-product-desc">
                            {product.description[0].children?.map(c => c.text).join('').slice(0, 80)}…
                          </div>
                        )}
                      </div>
                      <div className="brand-product-footer">
                        <span className="brand-product-price">{product.priceLabel ?? ''}</span>
                        <span className="brand-product-arrow" style={{ color: center.color }}>
                          Details <ArrowRight size={13} />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </AnimatedSection>
            ) : (
              <AnimatedSection className="brand-products-grid" delay={0.05}>
                {inlineProducts.map((p) => (
                    <div
                      key={p._key}
                      className="brand-product-card brand-product-card--static"
                      style={{ ['--product-accent' as string]: center.color }}
                    >
                      <div className="brand-product-img">
                        {p.image?.asset ? (
                          <Image
                            src={imageUrl(p.image)}
                            alt={p.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text-muted)' }}>
                            <Package size={40} opacity={0.2} />
                          </div>
                        )}
                      </div>
                      <div className="brand-product-body">
                        <div className="brand-product-name">{p.name}</div>
                        {p.info && <div className="brand-product-desc">{p.info}</div>}
                      </div>
                      <div className="brand-product-footer">
                        <span className="brand-product-arrow" style={{ color: center.color }}>
                          Auf Anfrage erhältlich
                        </span>
                      </div>
                    </div>
                ))}
              </AnimatedSection>
            )}
          </div>
        </section>
      )}

      {/* ═══ 5b: Isuzu – Flotten-Carousel (direkt nach Truck-Section) ═══ */}
      {brandSlug === 'isuzu' && <IsuzuFleetCarousel accent={center.color} />}

      {/* ═══ 5b: Piaggio – Flotten-Carousel (direkt nach NPE-Section) ═══ */}
      {brandSlug === 'piaggio' && <PiaggioFleetCarousel accent={center.color} />}

      {/* ═══ 5b: Fiat – Flotten-Carousel (direkt nach Produkt-Grid) ═════ */}
      {brandSlug === 'fiat' && <FiatFleetCarousel accent={center.color} />}

      {/* ═══ 5b: Scania – Flotten-Carousel (direkt nach Produkt-Grid) ═══ */}
      {brandSlug === 'scania' && <ScaniaFleetCarousel accent={center.color} />}

      {/* ═══ 5b: UT – Aufbauten-Carousel (direkt nach Produkt-Grid) ═════ */}
      {brandSlug === 'ut' && <UTFleetCarousel accent={center.color} />}

      {/* ═══ 5b: Hilltip – Carousel (direkt nach Kategorien-Grid) ═══════ */}
      {brandSlug === 'hilltip' && <HilltipFleetCarousel accent={center.color} />}

      {/* ═══ 5b: Kommunalcenter – generisches Karussell ═════════════════ */}
      {KOMMUNAL_BRANDS[brandSlug] && KOMMUNAL_CAROUSEL_SLIDES[brandSlug] && (
        <KommunalFleetCarousel
          brandSlug={brandSlug}
          accent={center.color}
          eyebrow={KOMMUNAL_BRANDS[brandSlug].carouselEyebrow}
          heading={KOMMUNAL_BRANDS[brandSlug].carouselHeading}
          ariaLabel={KOMMUNAL_BRANDS[brandSlug].carouselAriaLabel}
        />
      )}

      {/* ═══ 5b: Motorgerätecenter – generisches Karussell ══════════════ */}
      {MOTORGERAETE_BRANDS[brandSlug] && MOTORGERAETE_CAROUSEL_SLIDES[brandSlug] && (
        <KommunalFleetCarousel
          brandSlug={brandSlug}
          accent={center.color}
          eyebrow={MOTORGERAETE_BRANDS[brandSlug].carouselEyebrow}
          heading={MOTORGERAETE_BRANDS[brandSlug].carouselHeading}
          ariaLabel={MOTORGERAETE_BRANDS[brandSlug].carouselAriaLabel}
        />
      )}

      {/* ═══ 5b: Generisches Sanity-getriebenes Karussell (Fallback) ════ */}
      {!['isuzu', 'piaggio', 'fiat', 'scania', 'ut', 'hilltip'].includes(brandSlug) &&
        !KOMMUNAL_BRANDS[brandSlug] &&
        !MOTORGERAETE_BRANDS[brandSlug] &&
        sanityProducts.length > 0 && (
          <GenericFleetCarousel
            accent={center.color}
            eyebrow={`Die ${brand.name}-Auswahl`}
            heading={`${brand.name} im Überblick`}
            ariaLabel={`${brand.name} Modelle`}
            slides={sanityProducts.map((p) => {
              const slug = p.slug?.current ?? ''
              const img =
                productImageBySlug(slug) ??
                (p.mainImage ? imageUrl(p.mainImage) : null) ??
                (brand.heroImage ? imageUrl(brand.heroImage) : null) ??
                '/images/placeholder.png'
              const desc =
                p.description?.[0]?.children
                  ?.map((c) => c.text)
                  .join('')
                  .slice(0, 200) ?? ''
              return {
                slug,
                title: p.name,
                description: desc,
                image: img,
                imageAlt: p.name,
                detailUrl: `/${centerSlug}/${brandSlug}/${slug}`,
              }
            })}
          />
      )}

      {/* ═══ 5c: Brand-Werbevideo (nur wenn Marke ein Video hat) ════════ */}
      {(() => {
        const video = getBrandVideo(brandSlug)
        if (!video) return null
        return (
          <BrandVideoSection
            video={video}
            brandName={brand.name}
            accent={center.color}
          />
        )
      })()}

      {/* ═══ 6: Highlights / USPs ════════════════════════════════════════ */}
      {hasHighlights && (
        <section className="section brand-highlights-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-divider" style={{ background: center.color }} />
                <div className="section-label">Warum {brand.name}</div>
                <h2 className="section-title">Das zeichnet die Marke aus</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection className="brand-highlights-grid" delay={0.05}>
              {highlights.map((h) => {
                const Icon = getIcon(h.icon)
                return (
                  <div key={h._key ?? h.label} className="brand-highlight-card">
                    <div
                      className="brand-highlight-icon"
                      style={{ background: accentAlpha, color: center.color }}
                    >
                      <Icon size={48} />
                    </div>
                    <div className="brand-highlight-label">{h.label}</div>
                    {h.desc && <div className="brand-highlight-desc">{h.desc}</div>}
                  </div>
                )
              })}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══ 7: Leistungen / Features ════════════════════════════════════ */}
      {hasFeatures && (
        <section className="section brand-features-section">
          <div className="container">
            <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-divider" style={{ background: center.color }} />
                <div className="section-label">Unser Angebot</div>
                <h2 className="section-title">Was wir für Sie tun</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection className="brand-features-grid" delay={0.05}>
              {features.map((feat) => {
                const Icon = getIcon(feat.icon)
                return (
                  <div key={feat._key ?? feat.title} className="brand-feature-card">
                    <div className="brand-feature-icon" style={{ background: accentAlpha }}>
                      <Icon size={26} color={center.color} />
                    </div>
                    <div className="brand-feature-title">{feat.title}</div>
                    <div className="brand-feature-desc">{feat.desc}</div>
                  </div>
                )
              })}
            </AnimatedSection>
          </div>
        </section>
      )}


      {/* ═══ 9: Verkäufer (LETZTE Section — nichts danach) ══════════════ */}
      <BrandSalespersonSection
        sp={sp}
        brandName={brand.name}
        center={center}
        centerSlug={centerSlug}
        photoUrl={spPhotoUrl}
      />
    </>
  )
}
