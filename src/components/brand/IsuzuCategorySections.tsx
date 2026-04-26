import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ISUZU_CATEGORIES } from '@/lib/isuzu-catalog'

export default function IsuzuCategorySections({ accent }: { accent: string }) {
  return (
    <>
      {ISUZU_CATEGORIES.map((section) => (
        <section key={section.slug} className="isuzu-section">
          <div className="isuzu-section-inner">
            <div className="isuzu-section-header">
              <div className="isuzu-section-eyebrow" style={{ color: accent }}>
                {section.label}
              </div>
              <h2 className="isuzu-section-title">{section.sectionTitle}</h2>
              <p className="isuzu-section-lead">{section.sectionLead}</p>
            </div>

            <div className="isuzu-cat-grid">
              {section.models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/nutzfahrzeugcenter/isuzu/${section.slug}/${model.slug}`}
                  className="isuzu-card"
                  style={{ ['--isuzu-accent' as string]: accent }}
                >
                  <div className="isuzu-card-img-wrap">
                    <Image
                      src={model.image}
                      alt={`Isuzu ${model.title}`}
                      fill
                      className="isuzu-card-img"
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <div className="isuzu-card-body">
                    <h3 className="isuzu-card-title">{model.title}</h3>
                    <p className="isuzu-card-desc">{model.shortDescription}</p>
                    <div className="isuzu-card-footer">
                      <span className="isuzu-card-link" style={{ color: accent }}>
                        Details
                        <ArrowRight size={15} className="isuzu-card-arrow" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
