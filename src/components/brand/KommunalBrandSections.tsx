import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

export interface KommunalBrandModel {
  /** URL-Slug (= Sanity slug) */
  slug: string
  title: string
  shortDescription: string
  /** Lokales WebP-Bild */
  image: string
  /** Optionale Kategorie (für Reform z. B. „Hangmäher" / „Geräteträger" / „Metrac" / „Muli") */
  category?: string
}

interface Props {
  centerSlug: string
  brandSlug: string
  brandName: string
  accent: string
  eyebrow: string
  title: string
  lead: string
  models: KommunalBrandModel[]
  /** Optionale Hersteller-Homepage für Brand-Level-CTA */
  homepageUrl?: string | null
}

/**
 * Generische 3-Spalten-Produkt-Sektion für Kommunalcenter-Brands.
 * Wenn mindestens ein Produkt eine `category` hat, werden die Produkte
 * nach Kategorien gruppiert dargestellt (Reform-Modus). Sonst flach.
 */
export default function KommunalBrandSections({
  centerSlug,
  brandSlug,
  brandName,
  accent,
  eyebrow,
  title,
  lead,
  models,
  homepageUrl,
}: Props) {
  const hasCategories = models.some((m) => m.category)
  const groups: Record<string, KommunalBrandModel[]> = {}
  if (hasCategories) {
    for (const m of models) {
      const key = m.category ?? 'Weitere'
      if (!groups[key]) groups[key] = []
      groups[key].push(m)
    }
  }
  const orderedCategories = hasCategories
    ? Object.keys(groups)
    : []

  return (
    <section className="kommunal-section">
      <div className="kommunal-section-inner">
        <div className="kommunal-section-header">
          <div className="kommunal-section-eyebrow" style={{ color: accent }}>
            {eyebrow}
          </div>
          <h2 className="kommunal-section-title">{title}</h2>
          <p className="kommunal-section-lead">{lead}</p>
          {homepageUrl && (
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="kommunal-brand-cta"
              style={{ color: accent, borderColor: accent }}
            >
              Bei {brandName} ansehen
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {hasCategories ? (
          <div className="kommunal-categories">
            {orderedCategories.map((cat) => (
              <div key={cat} className="kommunal-category">
                <h3 className="kommunal-category-title" style={{ color: accent }}>
                  {cat}
                </h3>
                <div className="kommunal-grid">
                  {groups[cat].map((model) => (
                    <ProductCard key={model.slug} centerSlug={centerSlug} brandSlug={brandSlug} model={model} accent={accent} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kommunal-grid">
            {models.map((model) => (
              <ProductCard key={model.slug} centerSlug={centerSlug} brandSlug={brandSlug} model={model} accent={accent} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  centerSlug,
  brandSlug,
  model,
  accent,
}: {
  centerSlug: string
  brandSlug: string
  model: KommunalBrandModel
  accent: string
}) {
  return (
    <Link
      href={`/${centerSlug}/${brandSlug}/${model.slug}`}
      className="kommunal-card"
      style={{ ['--kommunal-accent' as string]: accent }}
    >
      <div className="kommunal-card-img-wrap">
        <Image
          src={model.image}
          alt={model.title}
          fill
          className="kommunal-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="kommunal-card-body">
        <h4 className="kommunal-card-title">{model.title}</h4>
        <p className="kommunal-card-desc">{model.shortDescription}</p>
        <div className="kommunal-card-footer">
          <span className="kommunal-card-link" style={{ color: accent }}>
            Details
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  )
}
