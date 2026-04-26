import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Phone, Mail, Tag, Package, ArrowRight, Sparkles } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { getRabattaktionen } from '@/lib/rabattaktionen'

export const revalidate = 60

const ACCENT = '#C0392B'

export const metadata: Metadata = {
  title: 'Rabattaktionen – Ernst Moser GmbH',
  description:
    'Aktuelle Rabattaktionen und Sonderangebote bei Ernst Moser GmbH – Nutzfahrzeuge, Kommunal- und Motorgeräte zu attraktiven Konditionen.',
}

export default async function RabattaktionenPage() {
  const cards = await getRabattaktionen()

  return (
    <>
      {/* Hero */}
      <div
        className="page-hero-wrap"
        style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
          padding: '100px 0 72px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Rabattaktionen</span>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginTop: 20,
            }}
          >
            <Sparkles size={13} />
            Sonderangebote
          </div>

          <h1 className="center-hero-title" style={{ marginTop: 16 }}>
            Rabattaktionen
          </h1>
          <p className="center-hero-desc">
            Profitieren Sie von unseren aktuellen Aktionspreisen –
            ausgewählte Fahrzeuge und Geräte zu attraktiven Konditionen.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a
              href="tel:+41326755805"
              className="btn-primary"
              style={{ background: '#fff', color: ACCENT }}
            >
              <Phone size={15} /> +41 32 675 58 05
            </a>
            <a
              href="mailto:info@ernst-moser.ch?subject=Anfrage%20Rabattaktion"
              className="btn-primary"
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.5)',
              }}
            >
              <Mail size={15} /> Anfrage senden
            </a>
          </div>
        </div>
      </div>

      {/* Aktionen Grid */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
            <div>
              <div className="section-divider" style={{ background: ACCENT }} />
              <div className="section-label">Aktuelle Aktionen</div>
              <h2 className="section-title">Unsere Angebote</h2>
            </div>
          </AnimatedSection>

          {cards.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'var(--c-bg-2)',
                borderRadius: 16,
                color: 'var(--c-text-muted)',
              }}
            >
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: 15 }}>Aktuell sind keine Rabattaktionen verfügbar.</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>
                Schauen Sie bald wieder vorbei oder kontaktieren Sie uns für individuelle Angebote.
              </p>
            </div>
          ) : (
            <div className="rabatt-grid">
              {cards.map((c, i) => {
                const inner = (
                  <>
                    <div className="rabatt-card-img">
                      {c.badgeLabel && (
                        <span className="rabatt-card-badge">
                          <Tag size={12} /> {c.badgeLabel}
                        </span>
                      )}
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.title}
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div className="rabatt-card-img-empty">
                          <Package size={48} opacity={0.2} />
                        </div>
                      )}
                    </div>
                    <div className="rabatt-card-body">
                      {c.subtitle && <div className="rabatt-card-brand">{c.subtitle}</div>}
                      <div className="rabatt-card-title">{c.title}</div>
                      {c.description && (
                        <div className="rabatt-card-desc">{c.description}</div>
                      )}
                    </div>
                    <div className="rabatt-card-footer">
                      <span className="rabatt-card-price">{c.priceLabel ?? ''}</span>
                      {c.linkUrl && c.linkUrl !== '/rabattaktionen' && (
                        <span className="rabatt-card-more">
                          Details <ArrowRight size={13} />
                        </span>
                      )}
                    </div>
                  </>
                )

                const useLink = c.linkUrl && c.linkUrl !== '/rabattaktionen'

                return (
                  <AnimatedSection key={c.id} delay={i * 0.06}>
                    {useLink ? (
                      <Link href={c.linkUrl!} className="rabatt-card">
                        {inner}
                      </Link>
                    ) : (
                      <div className="rabatt-card">{inner}</div>
                    )}
                  </AnimatedSection>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Beratung CTA */}
      <section className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection delay={0.05}>
            <div className="rabatt-cta">
              <div>
                <div className="section-divider" style={{ background: ACCENT }} />
                <div className="section-label">Persönliche Beratung</div>
                <h2 className="section-title" style={{ marginBottom: 16 }}>
                  Fragen zu einer Aktion?
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--c-text-2)', marginBottom: 24 }}>
                  Unser Team berät Sie gerne unverbindlich – telefonisch oder per E-Mail.
                  Wir finden gemeinsam die passende Lösung für Ihre Anforderungen.
                </p>
              </div>

              <div
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 36,
                  border: '1.5px solid var(--c-border)',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: `${ACCENT}1a`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Phone size={22} color={ACCENT} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--c-text)',
                    marginBottom: 10,
                  }}
                >
                  Direkt kontaktieren
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
                  <a
                    href="tel:+41326755805"
                    className="btn-primary"
                    style={{ background: ACCENT, color: '#fff' }}
                  >
                    <Phone size={15} /> +41 32 675 58 05
                  </a>
                  <a
                    href="mailto:info@ernst-moser.ch?subject=Anfrage%20Rabattaktion"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 9,
                      padding: '13px 22px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: ACCENT,
                      background: 'transparent',
                      border: `1.5px solid ${ACCENT}`,
                      justifyContent: 'center',
                    }}
                  >
                    <Mail size={15} /> info@ernst-moser.ch
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
