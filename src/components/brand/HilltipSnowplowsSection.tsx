import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HILLTIP_SNOWPLOWS } from '@/lib/hilltip-catalog'

export default function HilltipSnowplowsSection({ accent }: { accent: string }) {
  return (
    <section className="hilltip-section" style={{ background: 'var(--c-bg-2, #f8f8f8)' }}>
      <div className="hilltip-section-inner">
        <div className="hilltip-section-header">
          <div className="hilltip-section-eyebrow" style={{ color: accent }}>
            Hilltip Schneepflüge
          </div>
          <h2 className="hilltip-section-title">SnowStriker™ Schneepflüge &amp; Schneeschilder</h2>
          <p className="hilltip-section-lead">
            Gerade Schneeschilder, V-Pflüge und ausfahrbare Teleskop-Schilder für Pickups, UTV,
            Traktoren und LKW – jedes Modell in mehreren Arbeitsbreiten erhältlich.
          </p>
        </div>

        <div className="hilltip-plow-grid">
          {HILLTIP_SNOWPLOWS.map((p) => (
            <Link
              key={p.slug}
              href={`/nutzfahrzeugcenter/hilltip/${p.slug}`}
              className="hilltip-plow-card"
              style={{ ['--accent' as string]: accent }}
            >
              <div className="hilltip-plow-img">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="hilltip-plow-img-el"
                />
                <span className="hilltip-plow-badge" style={{ background: accent }}>
                  {p.sizes}
                </span>
              </div>
              <div className="hilltip-plow-body">
                <h3 className="hilltip-plow-name">{p.name}</h3>
                <div className="hilltip-plow-model">{p.model}</div>
                <span className="hilltip-plow-link" style={{ color: accent }}>
                  Mehr erfahren
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
