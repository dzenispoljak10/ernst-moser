import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  ChevronRight,
  Wrench,
  Activity,
  ShieldCheck,
  Settings,
  Sparkles,
  Snowflake,
  Sun,
  Wind,
  Car,
  Truck,
  Send,
  Phone,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wohnmobile, Wohnwagen & Camper – Nutzfahrzeugcenter Ernst Moser',
  description:
    'Reparaturen, Service, Wartungen und MFK-Bereitstellung für Camper, Wohnmobile und Wohnwagen – Ernst Moser GmbH, Gerlafingen Solothurn.',
}

const COLOR = '#1B2D5B'
const ALPHA = `${COLOR}1a`
const ANFRAGE_MAILTO =
  'mailto:roland.burkhalter@ernst-moser.ch?subject=' +
  encodeURIComponent('Anfrage Wohnmobile Wohnwagen Camper')

const SERVICES = [
  { icon: Wrench, label: 'Wartung & Unterhalt' },
  { icon: Activity, label: 'Diagnosearbeiten' },
  { icon: ShieldCheck, label: 'MFK-Bereitstellung' },
  { icon: Settings, label: 'Sicherheits-Nachrüstung' },
  { icon: Sun, label: 'Feriencheck' },
  { icon: Snowflake, label: 'Wintercheck' },
  { icon: Car, label: 'Pneuservice & -Wechsel' },
  { icon: Wind, label: 'Klimaservice' },
  { icon: Sparkles, label: 'Aussen- & Unterboden­reinigung' },
  { icon: Truck, label: 'Anhängerkupplungs-Montage' },
  { icon: ShieldCheck, label: 'Unfallschaden-Behebung' },
  { icon: Wrench, label: 'Garantiearbeiten Fiat Professional' },
]

export default function WohnmobilPage() {
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
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/pages/wohnmobile-wohnwagen-camper/hero.webp"
            alt="Wohnmobil"
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
            <span style={{ color: '#fff' }}>Wohnmobile, Wohnwagen & Camper</span>
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
              maxWidth: 880,
            }}
          >
            Wohnmobile, Wohnwagen & Camper
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: 760,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
            }}
          >
            Reparaturen, Service, Wartungen und MFK-Bereitstellung für Camper,
            Wohnmobile und Wohnwagen – kompetent und marken­übergreifend in
            Gerlafingen Solothurn.
          </p>
        </div>
      </section>

      {/* ─── Beschreibung ───────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <AnimatedSection>
            <div className="section-divider" style={{ background: COLOR }} />
            <div className="section-label">Wir kümmern uns um Ihr Lieblingsfahrzeug</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Camper, Wohnmobil oder Wohnwagen – wir sind Ihr Partner
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--c-text-2)',
                margin: '0 0 16px',
              }}
            >
              Ob Camper, Wohnmobil, Wohnwagen oder ausgebauter Kastenwagen –
              wir kümmern uns um Ihr Lieblingsfahrzeug. Von mechanischen
              Reparaturen über Service und Wartungen bis zur Bereitstellung für
              die periodische Fahrzeugprüfung (MFK / Motorfahrzeugkontrolle)
              decken wir alle Marken und Bedürfnisse ab.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--c-text-2)',
                margin: 0,
              }}
            >
              Als kompetenter Ansprechpartner fürs gesamte Mittelland mit Sitz im
              Grossraum Solothurn bieten wir modernste Infrastruktur in unserem
              Nutzfahrzeugcenter – inklusive Garantiearbeiten an Fiat
              Professional-Fahrzeugen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Leistungen ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--c-bg-2, #f8f8f8)' }}>
        <div className="container">
          <AnimatedSection style={{ marginBottom: 40 }}>
            <div className="section-divider" style={{ background: COLOR }} />
            <div className="section-label">Unser Leistungsumfang</div>
            <h2 className="section-title">Was wir für Sie übernehmen</h2>
          </AnimatedSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <AnimatedSection key={s.label} delay={Math.min(i * 0.04, 0.4)}>
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid var(--c-border, #e8e8e8)',
                      borderRadius: 14,
                      padding: '20px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        flex: '0 0 auto',
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: ALPHA,
                        color: COLOR,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14.5,
                        color: 'var(--c-text)',
                        lineHeight: 1.35,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Kontakt-Block ──────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <AnimatedSection>
            <div
              style={{
                background: '#fff',
                border: `1px solid ${COLOR}33`,
                borderRadius: 18,
                padding: 32,
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 8,
              }}
            >
              <div className="section-label" style={{ color: `${COLOR}bb` }}>
                Standort
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text)' }}>
                Ernst Moser GmbH
              </div>
              <div style={{ fontSize: 15, color: 'var(--c-text-2)', lineHeight: 1.6 }}>
                Derendingenstrasse 25, 4563 Gerlafingen SO<br />
                Tel.{' '}
                <a href="tel:+41326755805" style={{ color: COLOR }}>
                  +41 32 675 58 05
                </a>{' '}
                ·{' '}
                <a href="mailto:info@ernst-moser.ch" style={{ color: COLOR }}>
                  info@ernst-moser.ch
                </a>
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--c-text-muted, #888)',
                  marginTop: 8,
                }}
              >
                Öffnungszeiten: Mo–Fr 7.00–12.00 / 13.15–17.30 · Sa 7.00–12.00
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          padding: '70px 0',
          background: 'var(--c-bg-2, #f8f8f8)',
          borderTop: `3px solid ${COLOR}`,
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
              Termin für Ihren Camper, Ihr Wohnmobil oder Ihren Wohnwagen
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--c-text-2)',
                margin: '0 0 28px',
              }}
            >
              Roland Burkhalter und sein Team beraten Sie gerne und vereinbaren
              den passenden Werkstatt-Termin – kurzfristig und unkompliziert.
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
