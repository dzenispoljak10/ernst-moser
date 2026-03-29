import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { Truck, ArrowRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entdecken – Nutzfahrzeugcenter',
  description: 'UT Aufbauten, Anhänger, Wohnmobile und Wohnwagen – Nutzfahrzeugcenter Ernst Moser GmbH, Gerlafingen.',
}

const COLOR = '#1B2D5B'
const ALPHA = `${COLOR}1a`

const CATEGORIES = [
  {
    title: 'UT Aufbauten & Mulden',
    desc: 'Qualitativ hochwertige Fahrzeugaufbauten von UT – Absetzkipper, Mulden, Plateaus und Spezialaufbauten für jede Anforderung.',
    href: '/nutzfahrzeugcenter/ut',
    bullets: ['Absetzkipper & Absetzcontainer', 'Kippmulden & Plateaus', 'Massanfertigungen', 'Zubehör & Ersatzteile'],
  },
  {
    title: 'Anhänger & Zubehör',
    desc: 'Von Kleinanhängern bis zu Schwerlastanhängern – wir führen eine grosse Auswahl an Dhollandia-Ladebrücken und Anhängern.',
    href: '/nutzfahrzeugcenter/dhollandia',
    bullets: ['Leicht- und Schwerlastanhänger', 'Dhollandia Ladebrücken', 'Spezialanhänger', 'Ersatzteile & Reparatur'],
  },
  {
    title: 'Wohnmobile',
    desc: 'Entdecken Sie unsere Auswahl an Wohnmobilen für Freiheit und Komfort auf Reisen.',
    href: '/nutzfahrzeugcenter',
    bullets: ['Diverse Modelle & Grössen', 'Neu und Occasion', 'Finanzierungsoptionen', 'Service & Wintereinlagerung'],
  },
  {
    title: 'Wohnwagen',
    desc: 'Klassische Wohnwagen in verschiedenen Grössen – für Paare, Familien und Alleinreisende.',
    href: '/nutzfahrzeugcenter',
    bullets: ['Einzel- und Familienmodelle', 'Modernes Raumkonzept', 'Geprüfte Qualität', 'Zubehör & Beratung'],
  },
]

export default function NfzEntdeckenPage() {
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Entdecken</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} />
            </div>
          </div>
          <h1 className="center-hero-title">Unser Sortiment entdecken</h1>
          <p className="center-hero-desc">
            Aufbauten, Anhänger, Wohnmobile und Wohnwagen – breites Angebot im Nutzfahrzeugcenter.
          </p>
        </div>
      </div>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: COLOR }} />
              <div className="section-label">Fahrzeuge & Aufbauten</div>
              <h2 className="section-title">Was uns auszeichnet</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {CATEGORIES.map((cat, i) => (
              <AnimatedSection key={cat.title} delay={i * 0.06}>
                <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: 16, padding: 32, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--c-text)', marginBottom: 10 }}>{cat.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{cat.desc}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                    {cat.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLOR, display: 'inline-block', flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={cat.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: COLOR, textDecoration: 'none' }}>
                    Mehr erfahren <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="center-cta-section">
        <div className="center-cta-deco" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: COLOR }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${COLOR}bb`, marginBottom: 16 }}>Beratung & Probefahrt</div>
            <h2 className="center-cta-title">Bereit, die perfekte Lösung zu finden?</h2>
            <p className="center-cta-sub">Unser Team berät Sie gerne und zeigt Ihnen unser Sortiment direkt vor Ort.</p>
            <div className="center-cta-btns">
              <a href="tel:+41326755805" className="center-cta-btn-solid" style={{ background: COLOR }}>
                <Phone size={15} /> Jetzt anrufen
              </a>
              <Link href="/nutzfahrzeugcenter" className="center-cta-btn-ghost">
                <ArrowRight size={15} /> Zurück zum Center
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
