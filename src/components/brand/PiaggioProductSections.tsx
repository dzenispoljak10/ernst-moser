import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PIAGGIO_SECTIONS } from '@/lib/piaggio-catalog'

export default function PiaggioProductSections({ accent }: { accent: string }) {
  return (
    <>
      {PIAGGIO_SECTIONS.map((section) => (
        <section key={section.key} className="piaggio-section">
          <div className="piaggio-section-inner">
            <div className="piaggio-section-header">
              <div className="piaggio-section-eyebrow" style={{ color: accent }}>
                {section.label}
              </div>
              <h2 className="piaggio-section-title">{section.sectionTitle}</h2>
              <p className="piaggio-section-lead">{section.sectionLead}</p>
            </div>

            <div className="piaggio-grid">
              {section.models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/nutzfahrzeugcenter/piaggio/piaggio-${model.slug}`}
                  className="piaggio-card"
                  style={{ ['--piaggio-accent' as string]: accent }}
                >
                  <div className="piaggio-card-img-wrap">
                    <Image
                      src={model.image}
                      alt={model.title}
                      fill
                      className="piaggio-card-img"
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </div>
                  <div className="piaggio-card-body">
                    <h3 className="piaggio-card-title">{model.title}</h3>
                    <p className="piaggio-card-desc">{model.shortDescription}</p>
                    <div className="piaggio-card-footer">
                      <span className="piaggio-card-link" style={{ color: accent }}>
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
      ))}
    </>
  )
}
