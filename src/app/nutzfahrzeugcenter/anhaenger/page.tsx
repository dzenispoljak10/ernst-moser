import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  ChevronRight,
  Truck,
  Wrench,
  ShieldCheck,
  Users,
  Send,
  Phone,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anhänger – Nutzfahrzeugcenter Ernst Moser',
  description:
    'Anhänger-Beratung, Verkauf und Service bei Ernst Moser GmbH in Gerlafingen – PKW-, Nutz- und Spezialanhänger für jede Anforderung.',
}

const COLOR = '#1B2D5B'
const ALPHA = `${COLOR}1a`
const ANFRAGE_MAILTO =
  'mailto:roland.burkhalter@ernst-moser.ch?subject=' +
  encodeURIComponent('Anfrage Anhänger')

const FEATURES = [
  {
    icon: Truck,
    title: 'Vielfältige Anhänger-Auswahl',
    text:
      'PKW-Anhänger, Nutz- und Spezialanhänger – von kompakten Boxanhängern bis zu Tieflader und Pferdeanhängern. Wir beraten Sie zur passenden Lösung für Ihren Einsatzzweck.',
  },
  {
    icon: Wrench,
    title: 'Service & Unterhalt',
    text:
      'Periodische Wartung, Reparatur, MFK-Bereitstellung und Behebung von Unfallschäden – alles aus einer Hand in unserem Nutzfahrzeugcenter Solothurn.',
  },
  {
    icon: ShieldCheck,
    title: 'Geprüfte Qualität',
    text:
      'Neuanhänger renommierter Hersteller mit voller Herstellergarantie sowie geprüfte Occasionen mit transparenter Historie.',
  },
  {
    icon: Users,
    title: 'Persönliche Beratung',
    text:
      'Roland Burkhalter und sein Team beraten Sie kompetent zu Tragkraft, Achs-Konfiguration, Aufbau und gesetzlichen Anforderungen für Schweizer Strassen.',
  },
]

export default function AnhaengerPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: 480,
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/pages/anhaenger/hero.webp"
            alt="Anhänger"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${COLOR}ee 0%, ${COLOR}aa 60%, ${COLOR}55 100%)`,
            }}
          />
        </div>

        {/* Content */}
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, padding: '90px 24px 80px' }}
        >
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 24,
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Link
              href="/nutzfahrzeugcenter"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Nutzfahrzeugcenter
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: '#fff' }}>Anhänger</span>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.18)',
              marginBottom: 20,
            }}
          >
            <Truck size={28} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading, Arial, sans-serif)',
              fontSize: 'clamp(36px, 4.6vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 16px',
              maxWidth: 820,
            }}
          >
            Anhänger – Beratung, Verkauf und Service
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: 720,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
            }}
          >
            Ihr Partner für Anhänger im Mittelland: vom PKW-Anhänger bis zum
            schweren Nutzfahrzeug-Anhänger – mit kompetenter Beratung, gepflegtem
            Service und individuellen Lösungen.
          </p>
        </div>
      </section>

      {/* ─── Beschreibung ───────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <AnimatedSection>
            <div className="section-divider" style={{ background: COLOR }} />
            <div className="section-label">Über unsere Anhänger-Sparte</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Vom Bauanhänger bis zum Spezialanhänger
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--c-text-2)',
                margin: '0 0 16px',
              }}
            >
              Ernst Moser GmbH führt eine breite Auswahl an Anhängern für
              gewerbliche und private Anwendungen. Ob kompakter Pritschenanhänger
              für den Hauswart, robuster Tieflader für Baumaschinen oder
              Pferde- und Spezialanhänger – wir konfigurieren die passende
              Lösung gemeinsam mit Ihnen.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--c-text-2)',
                margin: 0,
              }}
            >
              Service, Reparatur, Achs- und Bremsenwartung sowie die
              MFK-Bereitstellung Ihres Anhängers übernehmen wir in unserer
              modernen Werkstatt im Nutzfahrzeugcenter Gerlafingen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Features ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--c-bg-2, #f8f8f8)' }}>
        <div className="container">
          <AnimatedSection style={{ marginBottom: 40 }}>
            <div className="section-divider" style={{ background: COLOR }} />
            <div className="section-label">Was wir für Sie tun</div>
            <h2 className="section-title">Unser Anhänger-Service</h2>
          </AnimatedSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <AnimatedSection key={f.title} delay={i * 0.06}>
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid var(--c-border, #e8e8e8)',
                      borderRadius: 16,
                      padding: 28,
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: ALPHA,
                        color: COLOR,
                        marginBottom: 16,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading, Arial, sans-serif)',
                        fontSize: 18,
                        fontWeight: 700,
                        margin: '0 0 8px',
                        color: 'var(--c-text)',
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: 'var(--c-text-2)',
                        margin: 0,
                      }}
                    >
                      {f.text}
                    </p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section
        style={{
          padding: '70px 0',
          background: '#fff',
          borderTop: `3px solid ${COLOR}`,
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <AnimatedSection>
            <div className="section-label" style={{ color: `${COLOR}bb`, marginBottom: 14 }}>
              Beratung & Anfrage
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading, Arial, sans-serif)',
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: '0 0 14px',
                color: 'var(--c-text)',
              }}
            >
              Den richtigen Anhänger finden
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--c-text-2)',
                margin: '0 0 28px',
              }}
            >
              Roland Burkhalter berät Sie zu Modellen, Konfigurationen und
              Verfügbarkeit – schnell und unverbindlich.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={ANFRAGE_MAILTO}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 28px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: '#fff',
                  background: COLOR,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <Send size={16} /> Anfrage stellen
              </a>
              <a
                href="tel:+41326755805"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 28px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: COLOR,
                  background: 'transparent',
                  border: `1.5px solid ${COLOR}`,
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <Phone size={16} /> +41 32 675 58 05
              </a>
              <Link
                href="/nutzfahrzeugcenter"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 28px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'var(--c-text-2)',
                }}
              >
                <ArrowRight size={16} /> Zurück zum Nutzfahrzeugcenter
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
