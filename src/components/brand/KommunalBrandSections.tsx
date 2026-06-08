import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, FileText } from 'lucide-react'

export interface KommunalBrandModel {
  /** URL-Slug (= Sanity slug) */
  slug: string
  title: string
  shortDescription: string
  /** Lokales WebP-Bild */
  image: string
  /** Optionale Kategorie (für Reform z. B. „Hangmäher" / „Geräteträger" / „Metrac" / „Muli") */
  category?: string
  /** Externe Produkt-URL (wenn keine eigene Unterseite existiert) */
  externalUrl?: string
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
  /** Optionaler Flyer / Prospekt (PDF) auf Brand-Ebene */
  flyerUrl?: string | null
  /** true → Produkt-Karten verlinken extern (keine eigenen Unterseiten) */
  externalCards?: boolean
  /** true → reine Bilder-Galerie ohne Produktnamen/-texte */
  gallery?: boolean
  /** Optionale „Weitere Produkte"-Karte (externer Link, keine eigene Unterseite) */
  extraCard?: { name: string; desc?: string; url: string; image: string }
}

/**
 * Generische 3-Spalten-Produkt-Sektion für Kommunalcenter-Brands.
 * Wenn mindestens ein Produkt eine `category` hat, werden die Produkte
 * nach Kategorien gruppiert dargestellt (Reform-Modus). Sonst flach.
 */
export default function KommunalBrandSections({
  centerSlug,
  brandSlug,
  accent,
  eyebrow,
  title,
  lead,
  models,
  flyerUrl,
  externalCards,
  gallery,
  extraCard,
}: Props) {
  const hasCategories = !gallery && models.some((m) => m.category)
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
          {flyerUrl && (
            <div className="kommunal-section-ctas">
              <a
                href={flyerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="kommunal-brand-cta"
                style={{ color: accent, borderColor: accent }}
              >
                <FileText size={14} />
                Flyer (PDF)
              </a>
            </div>
          )}
        </div>

        {gallery ? (
          <div className="kommunal-gallery">
            {models.map((model) => (
              <a
                key={model.slug}
                href={model.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="kommunal-gallery-tile"
                aria-label={model.title}
              >
                <Image
                  src={model.image}
                  alt={model.title}
                  fill
                  className="kommunal-card-img"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
              </a>
            ))}
          </div>
        ) : hasCategories ? (
          <div className="kommunal-categories">
            {orderedCategories.map((cat) => (
              <div key={cat} className="kommunal-category">
                <h3 className="kommunal-category-title" style={{ color: accent }}>
                  {cat}
                </h3>
                <div className="kommunal-grid">
                  {groups[cat].map((model) => (
                    <ProductCard key={model.slug} centerSlug={centerSlug} brandSlug={brandSlug} model={model} accent={accent} externalCards={externalCards} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kommunal-grid">
            {models.map((model) => (
              <ProductCard key={model.slug} centerSlug={centerSlug} brandSlug={brandSlug} model={model} accent={accent} externalCards={externalCards} />
            ))}
          </div>
        )}

        {extraCard && !gallery && (
          <div className="kommunal-grid" style={{ marginTop: 28 }}>
            <a
              href={extraCard.url}
              target="_blank"
              rel="noopener noreferrer"
              className="kommunal-card"
              style={{ ['--kommunal-accent' as string]: accent }}
            >
              <div className="kommunal-card-img-wrap">
                <Image
                  src={extraCard.image}
                  alt={extraCard.name}
                  fill
                  className="kommunal-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="kommunal-card-body">
                <h4 className="kommunal-card-title">{extraCard.name}</h4>
                {extraCard.desc && <p className="kommunal-card-desc">{extraCard.desc}</p>}
                <div className="kommunal-card-footer">
                  <span className="kommunal-card-link" style={{ color: accent }}>
                    Ansehen
                    <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            </a>
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
  externalCards,
}: {
  centerSlug: string
  brandSlug: string
  model: KommunalBrandModel
  accent: string
  externalCards?: boolean
}) {
  const isExternal = Boolean(externalCards && model.externalUrl)
  const inner = (
    <>
      <div className="kommunal-card-img-wrap">
        <Image
          src={model.image}
          alt={model.title}
          fill
          className="kommunal-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="kommunal-card-body">
        <h4 className="kommunal-card-title">{model.title}</h4>
        <p className="kommunal-card-desc">{model.shortDescription}</p>
        <div className="kommunal-card-footer">
          <span className="kommunal-card-link" style={{ color: accent }}>
            {isExternal ? 'Ansehen' : 'Details'}
            {isExternal ? <ExternalLink size={14} /> : <ArrowRight size={15} />}
          </span>
        </div>
      </div>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={model.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="kommunal-card"
        style={{ ['--kommunal-accent' as string]: accent }}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      href={`/${centerSlug}/${brandSlug}/${model.slug}`}
      className="kommunal-card"
      style={{ ['--kommunal-accent' as string]: accent }}
    >
      {inner}
    </Link>
  )
}
