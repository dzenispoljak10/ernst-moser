import { readClient as client, imageUrl, productImageBySlug } from '@/lib/sanity'
import { getSalespersonByBrand } from '@/lib/queries'
import { getIcon } from '@/lib/iconMap'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import BrandHeroContent from '@/components/ui/BrandHeroContent'
import BrandAboutSection from '@/components/ui/BrandAboutSection'
import BrandSalespersonSection from '@/components/ui/BrandSalespersonSection'
import { FloatingWrapper } from '@/components/ui/FloatingWrapper'
import BrandExtraSections from '@/components/brand/BrandExtraSections'
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
  const heroImgUrl = heroImgRaw ? imageUrl(heroImgRaw) : null
  const logoUrl = brand.logo ? imageUrl(brand.logo) : null
  const spPhotoUrl = sp?.photo ? imageUrl(sp.photo) : null

  const descBlocks = (brand.description ?? []) as PortableBlock[]
  const descText   = ptText(descBlocks)
  const accentAlpha = `${center.color}1a`

  return (
    <>
      {/* ═══ 1: Hero ══════════════════════════════════════════════════════ */}
      <BrandHeroContent
        brandName={brand.name}
        centerName={center.name}
        centerSlug={centerSlug}
        centerColor={center.color}
        logoUrl={logoUrl}
        tagline={brand.tagline}
        heroImgUrl={heroImgUrl}
        stats={stats}
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
        <section className="brand-stats-section">
          <div className="container">
            <div className="brand-stats-grid">
              {stats.map((stat) => (
                <div key={stat._key ?? stat.label} className="brand-stat-item">
                  <div className="brand-stat-num" style={{ color: center.color }}>
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

      {/* ═══ 5: Produkte ══════════════════════════════════════════════════ */}
      {hasProducts && (
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
                {sanityProducts.map((product, i) => {
                  const productImgUrl =
                    productImageBySlug(product.slug?.current ?? '') ??
                    (product.mainImage ? imageUrl(product.mainImage) : null) ??
                    (brand.heroImage ? imageUrl(brand.heroImage) : null) ??
                    (brand.images?.[0] ? imageUrl(brand.images[0]) : null) ??
                    null
                  return (
                  <FloatingWrapper key={product._id} index={i}>
                    <Link
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
                  </FloatingWrapper>
                  )
                })}
              </AnimatedSection>
            ) : (
              <AnimatedSection className="brand-products-grid" delay={0.05}>
                {inlineProducts.map((p, i) => (
                  <FloatingWrapper key={p._key} index={i}>
                    <div
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
                  </FloatingWrapper>
                ))}
              </AnimatedSection>
            )}
          </div>
        </section>
      )}

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


      {/* ═══ 9: Verkäufer ════════════════════════════════════════════════ */}
      <BrandSalespersonSection
        sp={sp}
        brandName={brand.name}
        center={center}
        centerSlug={centerSlug}
        photoUrl={spPhotoUrl}
      />

      {/* ═══ 10: Extra Sections (Innovation, Tech, Heritage, …) ══════════ */}
      <BrandExtraSections brandSlug={brandSlug} centerColor={center.color} />
    </>
  )
}
