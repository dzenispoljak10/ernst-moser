import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HILLTIP_CATEGORIES } from '@/lib/hilltip-catalog'

export default function HilltipCategorySections({ accent }: { accent: string }) {
  return (
    <section className="hilltip-section">
      <div className="hilltip-section-inner">
        <div className="hilltip-section-header">
          <div className="hilltip-section-eyebrow" style={{ color: accent }}>
            Hilltip Winterdienst
          </div>
          <h2 className="hilltip-section-title">Für jede Fahrzeugklasse die passende Lösung</h2>
          <p className="hilltip-section-lead">
            Streugeräte, Schneepflüge und Sprühsysteme von Hilltip — perfekt abgestimmt auf
            Pickups, leichte LKW und schwere Nutzfahrzeuge. Beratung und Service durch Ernst Moser GmbH.
          </p>
        </div>

        <div className="hilltip-grid">
          {HILLTIP_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/nutzfahrzeugcenter/hilltip/${cat.slug}`}
              className="hilltip-card"
              style={{ ['--hilltip-accent' as string]: accent }}
            >
              <div className="hilltip-card-img-wrap">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="hilltip-card-img"
                  sizes="(max-width: 720px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="hilltip-card-body">
                <h3 className="hilltip-card-title">{cat.title}</h3>
                <div className="hilltip-card-tonnage" style={{ color: accent }}>
                  {cat.tonnage}
                </div>
                <p className="hilltip-card-desc">{cat.shortDescription}</p>
                <span className="hilltip-card-link" style={{ color: accent }}>
                  Mehr erfahren
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
