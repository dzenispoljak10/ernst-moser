import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { getMotorgeraeteBrand } from '@/lib/motorgeraete-catalogs'

const STIHL_HOMEPAGE = 'https://www.stihl.ch/de'

/**
 * Stihl – eine Section pro Produkt, abwechselnd Bild/Text (Zickzack).
 * KEINE Unterseiten — jede Section verlinkt direkt auf stihl.ch.
 */
export default function StihlShowcase() {
  const brand = getMotorgeraeteBrand('stihl')
  if (!brand) return null

  return (
    <>
      {/* CTA-Band → stihl.ch (zuerst, oberhalb der Produkt-Sektionen) */}
      <section className="stihl-section">
        <div className="stihl-section-inner">
          <a
            href={STIHL_HOMEPAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="stihl-cta-band"
          >
            <div className="stihl-cta-band-img">
              <Image src="/images/brands/stihl/gallery/01.webp" alt="STIHL im Einsatz" fill sizes="100vw" unoptimized />
            </div>
            <div className="stihl-cta-text">
              <h3>Das komplette STIHL-Sortiment entdecken</h3>
              <p>Alle Modelle, Akkulösungen und Zubehör auf stihl.ch.</p>
            </div>
            <span className="stihl-cta-btn">
              stihl.ch besuchen <ExternalLink size={16} />
            </span>
          </a>
        </div>
      </section>

      {brand.products.map((p, i) => {
        const flip = i % 2 === 1
        return (
          <section
            key={p.slug}
            className={`stihl-section${i % 2 === 1 ? ' stihl-section--alt' : ''}`}
          >
            <div className={`stihl-row-inner${flip ? ' stihl-row--flip' : ''}`}>
              <div className="stihl-row-media">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="stihl-row-text">
                <span className="stihl-eyebrow">STIHL</span>
                <h2 className="stihl-row-title">{p.title}</h2>
                <p className="stihl-row-desc">
                  {(p.longDescription && p.longDescription.length
                    ? p.longDescription.join(' ')
                    : p.shortDescription)}
                </p>
                <a
                  href={p.externalUrl ?? STIHL_HOMEPAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stihl-row-link"
                >
                  Bei STIHL ansehen <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
