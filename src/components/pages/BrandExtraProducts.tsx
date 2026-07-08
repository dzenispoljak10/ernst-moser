import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

export interface ExtraProduct {
  id: string
  name: string
  href: string
  imageUrl: string | null
  priceLabel: string | null
  desc: string | null
}

/**
 * Zusätzliche, im Admin gepflegte Produkte für Marken, deren Hauptbereich sonst
 * aus fest hinterlegten Katalogen kommt (Scania, Isuzu, Hilltip …).
 * Rendert NICHTS, wenn keine Sanity-Produkte vorhanden sind – die Seite bleibt
 * damit exakt wie bisher, solange der Kunde nichts hinzufügt.
 */
export default function BrandExtraProducts({
  products,
  accent,
}: {
  products: ExtraProduct[]
  accent: string
}) {
  if (!products.length) return null

  return (
    <section className="section brand-products-section">
      <div className="container">
        <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
          <div>
            <div className="section-divider" style={{ background: accent }} />
            <div className="section-label">Weitere Produkte</div>
            <h2 className="section-title">Aktuelle Angebote</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection className="brand-products-grid" delay={0.05}>
          {products.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="brand-product-card"
              style={{ ['--product-accent' as string]: accent }}
            >
              <div className="brand-product-img">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text-muted)' }}>
                    <Package size={40} opacity={0.2} />
                  </div>
                )}
              </div>
              <div className="brand-product-body">
                <div className="brand-product-name">{p.name}</div>
                {p.desc && <div className="brand-product-desc">{p.desc.slice(0, 80)}…</div>}
              </div>
              <div className="brand-product-footer">
                <span className="brand-product-price">{p.priceLabel ?? ''}</span>
                <span className="brand-product-arrow" style={{ color: accent }}>
                  Details <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
