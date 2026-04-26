import Link from 'next/link'
import { Phone, Mail, Warehouse, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import LoadoEmbed from '@/components/pages/LoadoEmbed'

export const metadata: Metadata = {
  title: 'Lagerfahrzeuge – Ernst Moser GmbH',
  description:
    'Sofort verfügbare Lagerfahrzeuge bei Ernst Moser GmbH – aktuelle Bestände direkt aus unserem Lager in Gerlafingen.',
}

const ACCENT = '#1B2D5B'
const ACCENT_ALPHA = '#1B2D5B1a'

const VORTEILE = [
  'Sofortige Verfügbarkeit – kein Bestelltermin nötig',
  'Live-Aktualisierung direkt aus unserem Bestand',
  'Persönliche Beratung und Probefahrt vor Ort',
  'Finanzierung und Eintausch auf Wunsch',
]

export default function LagerfahrzeugePage() {
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Lagerfahrzeuge</span>
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
            <Warehouse size={13} />
            Sofort verfügbar
          </div>

          <h1 className="center-hero-title" style={{ marginTop: 16 }}>
            Lagerfahrzeuge
          </h1>
          <p className="center-hero-desc">
            Aktuelle Lagerbestände direkt aus unserem Lager – Nutzfahrzeuge,
            Kommunal- und Spezialfahrzeuge sofort verfügbar.
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
              href="mailto:info@ernst-moser.ch?subject=Anfrage%20Lagerfahrzeug"
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

      {/* Iframe-Embed */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 32 }}>
            <div>
              <div className="section-divider" style={{ background: ACCENT }} />
              <div className="section-label">Aktueller Bestand</div>
              <h2 className="section-title">Verfügbare Fahrzeuge</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div
              style={{
                background: 'var(--c-bg)',
                border: '1.5px solid var(--c-border)',
                borderRadius: 16,
                padding: 8,
                boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <LoadoEmbed />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vorteile + Kontakt */}
      <section className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection delay={0.05}>
            <div className="lager-vorteile-grid">
              <div>
                <div className="section-divider" style={{ background: ACCENT }} />
                <div className="section-label">Ihre Vorteile</div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>
                  Schnell, transparent, ab Lager
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {VORTEILE.map((v) => (
                    <li
                      key={v}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        fontSize: 15,
                        color: 'var(--c-text-2)',
                        lineHeight: 1.55,
                      }}
                    >
                      <CheckCircle
                        size={18}
                        color={ACCENT}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      {v}
                    </li>
                  ))}
                </ul>
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
                    background: ACCENT_ALPHA,
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
                  Persönliche Beratung
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'var(--c-text-2)',
                    marginBottom: 20,
                  }}
                >
                  Sie haben ein bestimmtes Fahrzeug im Auge oder brauchen eine
                  Empfehlung? Rufen Sie uns an oder schreiben Sie uns – wir
                  beraten Sie unverbindlich.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a
                    href="tel:+41326755805"
                    className="btn-primary"
                    style={{ background: ACCENT, color: '#fff' }}
                  >
                    <Phone size={15} /> +41 32 675 58 05
                  </a>
                  <a
                    href="mailto:info@ernst-moser.ch?subject=Anfrage%20Lagerfahrzeug"
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
