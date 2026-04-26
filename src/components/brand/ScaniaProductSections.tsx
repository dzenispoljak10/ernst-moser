import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SCANIA_MODELS } from '@/lib/scania-catalog'

export default function ScaniaProductSections({ accent }: { accent: string }) {
  return (
    <section className="scania-section">
      <div className="scania-section-inner">
        <div className="scania-section-header">
          <div className="scania-section-eyebrow" style={{ color: accent }}>
            Scania Baureihen
          </div>
          <h2 className="scania-section-title">Für jede Aufgabe der passende Lkw</h2>
          <p className="scania-section-lead">
            Vom kompakten Verteiler-Lkw bis zur Schwerlastzugmaschine — Ernst Moser GmbH ist
            Ihr autorisierter Scania-Partner für Verkauf, Konfiguration und Service in der Schweiz.
          </p>
        </div>

        <div className="scania-grid">
          {SCANIA_MODELS.map((model) => (
            <Link
              key={model.slug}
              href={`/nutzfahrzeugcenter/scania/${model.slug}`}
              className="scania-card"
              style={{ ['--scania-accent' as string]: accent }}
            >
              <div className="scania-card-img-wrap">
                <Image
                  src={model.image}
                  alt={model.title}
                  fill
                  className="scania-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="scania-card-body">
                <h3 className="scania-card-title">{model.title}</h3>
                <p className="scania-card-desc">{model.shortDescription}</p>
                <div className="scania-card-footer">
                  <span className="scania-card-link" style={{ color: accent }}>
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
