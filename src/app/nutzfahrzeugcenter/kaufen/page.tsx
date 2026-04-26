import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  ChevronRight,
  Compass,
  Wallet,
  Repeat,
  Zap,
  CheckCircle2,
  Send,
  type LucideIcon,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaufen – Nutzfahrzeugcenter Ernst Moser',
  description:
    'Kaufberatung, Finanzierung, Nutzfahrzeug-Abo und E-Mobilität bei Ernst Moser GmbH – Ihr Partner für Nutzfahrzeuge in der Region Solothurn.',
}

const COLOR = '#1B2D5B'
const ALPHA = `${COLOR}1a`
const CONTACT_EMAIL = 'roland.burkhalter@ernst-moser.ch'

interface Section {
  id: string
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  /** Subject-Zeile für die Anfrage-Mail */
  mailSubject: string
}

const SECTIONS: Section[] = [
  {
    id: 'kaufberatung',
    icon: Compass,
    title: 'Kaufberatung',
    description:
      'Unser erfahrenes Verkaufsteam begleitet Sie von der Bedarfsanalyse über den Modellvergleich bis zur Übergabe – unverbindlich, transparent und mit dem klaren Fokus auf Ihre Anwendung. Ob Einzelfahrzeug oder Flottenausbau: wir finden gemeinsam die passende Lösung.',
    features: [
      'Bedarfsanalyse & Flottenplanung',
      'Vergleich mehrerer Modelle und Hersteller',
      'Probefahrten in Gerlafingen möglich',
      'Transparente Preisgestaltung ohne versteckte Kosten',
      'Zertifizierte Verkaufsberater mit Branchenerfahrung',
    ],
    mailSubject: 'Anfrage Kaufberatung',
  },
  {
    id: 'finanzierung',
    icon: Wallet,
    title: 'Finanzierung & Leasing',
    description:
      'Flexible Finanzierungs- und Leasingoptionen für Privat- und Firmenkunden – wir vermitteln Ihnen die richtige Lösung über etablierte Schweizer Finanzpartner. Schnelle Kreditentscheide, individuelle Laufzeiten und faire Konditionen sorgen für Planbarkeit.',
    features: [
      'Attraktive Leasingkonditionen für Gewerbe & Privat',
      'Individuelle Finanzierungsmodelle',
      'Schnelle Kreditentscheide',
      'Inzahlungnahme Ihres Fahrzeugs möglich',
      'Keine versteckten Kosten – alles transparent',
    ],
    mailSubject: 'Anfrage Finanzierung & Leasing',
  },
  {
    id: 'nutzfahrzeug-abo',
    icon: Repeat,
    title: 'Nutzfahrzeug-Abo',
    description:
      'Das All-Inclusive-Abo für Nutzfahrzeuge: kein Kaufrisiko, maximale Flexibilität. Mit monatlich kalkulierbaren Fixkosten, kurzen oder längeren Laufzeiten und der Möglichkeit, das Fahrzeug bei veränderten Anforderungen zu wechseln, bleiben Sie agil.',
    features: [
      'Monatliche Fixkosten – planbar und transparent',
      'Service, Versicherung und Steuern bereits inklusive',
      'Flexible Laufzeiten ab wenigen Monaten',
      'Fahrzeugwechsel bei veränderten Bedürfnissen',
      'Kein Kapitalbinder – schont Liquidität',
    ],
    mailSubject: 'Anfrage Nutzfahrzeug-Abo',
  },
  {
    id: 'e-mobilitaet',
    icon: Zap,
    title: 'E-Mobilität',
    description:
      'Die Zukunft fährt elektrisch – auch im Nutzfahrzeugbereich. Wir beraten Sie zu vollelektrischen Lieferwagen, Lkw und kompakten Nutzfahrzeugen, klären Ladeinfrastruktur und helfen bei Förderprogrammen und Total-Cost-of-Ownership-Berechnungen.',
    features: [
      'E-Transporter, E-Lkw und E-Pickups verschiedener Marken',
      'Beratung zu Reichweite, Nutzlast und Aufbauten',
      'Ladeinfrastruktur-Konzepte für Werkhof und Depot',
      'Hinweise auf Förderprogramme und Vergünstigungen',
      'TCO-Vergleich Verbrenner vs. Elektro',
    ],
    mailSubject: 'Anfrage E-Mobilität',
  },
]

function buildMailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export default function NfzKaufenPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: 460,
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/pages/kaufen/hero.webp"
            alt="Nutzfahrzeuge"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${COLOR}f0 0%, ${COLOR}b8 60%, ${COLOR}66 100%)`,
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
            <span style={{ color: '#fff' }}>Kaufen</span>
          </nav>

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
            Kaufen bei Ernst Moser
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 720,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
            }}
          >
            Ihr Partner für Nutzfahrzeuge in der Region Solothurn.
          </p>
        </div>
      </section>

      {/* ─── Inhalts-Sections ──────────────────────────────── */}
      {SECTIONS.map((s, idx) => {
        const isAlt = idx % 2 === 1
        const Icon = s.icon
        return (
          <section
            key={s.id}
            id={s.id}
            style={{
              padding: '64px 0',
              background: isAlt ? '#f9fafb' : '#fff',
              scrollMarginTop: 'calc(var(--header-h, 72px) + 24px)',
            }}
          >
            <div
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: '0 24px',
              }}
            >
              <AnimatedSection>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: ALPHA,
                    color: COLOR,
                    marginBottom: 20,
                  }}
                >
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading, Arial, sans-serif)',
                    fontSize: 'clamp(28px, 3.2vw, 36px)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px',
                    color: 'var(--c-text)',
                  }}
                >
                  {s.title}
                </h2>

                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: 'var(--c-text-2)',
                    margin: '0 0 28px',
                    maxWidth: 820,
                  }}
                >
                  {s.description}
                </p>

                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 12,
                    margin: '0 0 32px',
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  {s.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: 'var(--c-text)',
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        color={COLOR}
                        strokeWidth={2.2}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={buildMailto(s.mailSubject)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '13px 26px',
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
              </AnimatedSection>
            </div>
          </section>
        )
      })}
    </>
  )
}
