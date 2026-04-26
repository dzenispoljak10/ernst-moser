import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { UT_MODELS } from '@/lib/ut-catalog'

export default function UTProductSections({ accent }: { accent: string }) {
  return (
    <section className="ut-section">
      <div className="ut-section-inner">
        <div className="ut-section-header">
          <div className="ut-section-eyebrow" style={{ color: accent }}>
            UT Aufbauten
          </div>
          <h2 className="ut-section-title">Robuste Aufbauten für Nutzfahrzeuge</h2>
          <p className="ut-section-lead">
            Absetz- und Abrollkipper, Mulden, Container und Presscontainer — Schweizer
            Aufbau-Qualität, vertrieben durch Ernst Moser GmbH.
          </p>
        </div>

        <div className="ut-grid">
          {UT_MODELS.map((model) => (
            <Link
              key={model.slug}
              href={`/nutzfahrzeugcenter/ut/${model.slug}`}
              className="ut-card"
              style={{ ['--ut-accent' as string]: accent }}
            >
              <div className="ut-card-img-wrap">
                <Image
                  src={model.image}
                  alt={model.title}
                  fill
                  className="ut-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="ut-card-body">
                <h3 className="ut-card-title">{model.title}</h3>
                <p className="ut-card-desc">{model.shortDescription}</p>
                <div className="ut-card-footer">
                  <span className="ut-card-link" style={{ color: accent }}>
                    Details
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
