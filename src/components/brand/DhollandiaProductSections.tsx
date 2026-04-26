import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DHOLLANDIA_SECTIONS } from '@/lib/dhollandia-catalog'

export default function DhollandiaProductSections({ accent }: { accent: string }) {
  return (
    <>
      {DHOLLANDIA_SECTIONS.map((section) => (
        <section key={section.key} className="dhollandia-section">
          <div className="dhollandia-section-inner">
            <div className="dhollandia-section-header">
              <div className="dhollandia-section-eyebrow" style={{ color: accent }}>
                {section.label}
              </div>
              <h2 className="dhollandia-section-title">{section.sectionTitle}</h2>
              <p className="dhollandia-section-lead">{section.sectionLead}</p>
            </div>

            <div className="dhollandia-grid">
              {section.models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/nutzfahrzeugcenter/dhollandia/${model.slug}`}
                  className="dhollandia-card"
                  style={{ ['--dhollandia-accent' as string]: accent }}
                >
                  <div className="dhollandia-card-img-wrap">
                    <Image
                      src={model.image}
                      alt={model.title}
                      fill
                      className="dhollandia-card-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="dhollandia-card-body">
                    <h3 className="dhollandia-card-title">{model.title}</h3>
                    <p className="dhollandia-card-desc">{model.shortDescription}</p>
                    <div className="dhollandia-card-footer">
                      <span className="dhollandia-card-link" style={{ color: accent }}>
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
