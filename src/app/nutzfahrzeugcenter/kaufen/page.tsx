import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { CheckCircle, Phone, Mail, ArrowRight, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaufen – Nutzfahrzeugcenter',
  description: 'Kaufberatung, Finanzierung, Nutzfahrzeug-Abo und E-Mobilität – Nutzfahrzeugcenter Ernst Moser GmbH.',
}

const COLOR = '#1B2D5B'
const ALPHA = `${COLOR}1a`

const KAUFOPTIONEN = [
  {
    title: 'Kaufberatung',
    desc: 'Unser erfahrenes Team begleitet Sie von der Bedarfsanalyse bis zur Übergabe – unverbindlich und kompetent.',
    bullets: ['Bedarfsanalyse & Flottenplanung', 'Vergleich mehrerer Modelle', 'Probefahrten möglich', 'Transparente Preisgestaltung'],
  },
  {
    title: 'Finanzierung & Leasing',
    desc: 'Flexible Finanzierungs- und Leasingoptionen für Privat- und Firmenkunden.',
    bullets: ['Attraktive Leasingkonditionen', 'Individualfinanzierung', 'Schnelle Kreditentscheid', 'Kein versteckter Kosten'],
  },
  {
    title: 'Neuwagen & Occasion',
    desc: 'Grosse Auswahl an Neu- und Occasionsfahrzeugen verschiedener Marken und Kategorien.',
    bullets: ['Geprüfte Occasionen', 'Herstellergarantie auf Neuwagen', 'Inzahlungnahme Ihres Fahrzeugs', 'Kurze Lieferzeiten'],
  },
  {
    title: 'Nutzfahrzeug-Abo',
    desc: 'Das All-Inclusive-Abo für Nutzfahrzeuge: kein Kaufrisiko, maximale Flexibilität.',
    bullets: ['Monatliche Fixkosten', 'Alle Unterhaltskosten inklusive', 'Flexible Laufzeiten', 'Fahrzeugwechsel möglich'],
  },
]

export default function NfzKaufenPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${COLOR} 0%, ${COLOR}cc 100%)`, padding: '100px 0 72px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/nutzfahrzeugcenter" className="breadcrumb-link">Nutzfahrzeugcenter</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Kaufen</span>
          </nav>
          <h1 className="center-hero-title" style={{ marginTop: 20 }}>Kaufen & Finanzieren</h1>
          <p className="center-hero-desc">
            Neuwagen, Occasionen, Leasing und Abo – wir finden die beste Lösung für Ihr Budget und Ihren Bedarf.
          </p>
        </div>
      </div>

      {/* Kaufoptionen */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: COLOR }} />
              <div className="section-label">Ihre Kaufoptionen</div>
              <h2 className="section-title">So kommen Sie zu Ihrem Fahrzeug</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 64 }}>
            {KAUFOPTIONEN.map((opt, i) => (
              <AnimatedSection key={opt.title} delay={i * 0.06}>
                <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: 16, padding: 32, height: '100%' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--c-text)', marginBottom: 10 }}>{opt.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.65, marginBottom: 20 }}>{opt.desc}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {opt.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <CheckCircle size={14} color={COLOR} style={{ flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* E-Mobilität Highlight */}
          <AnimatedSection delay={0.1}>
            <div style={{ background: ALPHA, border: `1.5px solid ${COLOR}33`, borderRadius: 16, padding: '40px 48px', display: 'grid', gridTemplateColumns: '64px 1fr', gap: 28, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={28} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLOR, marginBottom: 6 }}>Zukunft fährt elektrisch</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--c-text)', marginBottom: 10 }}>E-Mobilität im Nutzfahrzeugbereich</h3>
                <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.65 }}>
                  Wir beraten Sie zu elektrischen Nutzfahrzeugen, Fördermöglichkeiten und Ladeinfrastruktur.
                  Nachhaltig unterwegs – ohne Kompromisse bei der Leistung.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="center-cta-section">
        <div className="center-cta-deco" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: COLOR }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${COLOR}bb`, marginBottom: 16 }}>Beratung vereinbaren</div>
            <h2 className="center-cta-title">Gemeinsam die beste Lösung finden</h2>
            <p className="center-cta-sub">
              Unser Verkaufsteam berät Sie gerne – kostenlos und unverbindlich in Gerlafingen.
            </p>
            <div className="center-cta-btns">
              <a href="tel:+41326755805" className="center-cta-btn-solid" style={{ background: COLOR }}>
                <Phone size={15} /> Jetzt anrufen
              </a>
              <a href="mailto:info@ernst-moser.ch" className="center-cta-btn-ghost">
                <Mail size={15} /> E-Mail schreiben
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
