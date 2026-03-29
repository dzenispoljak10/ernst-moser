import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { Zap, Leaf, Settings, ArrowRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roboter & Autonome Geräte – Motorgerätecenter',
  description: 'Ambrogio Rasenmähroboter, Pudu Robotics Serviceroboter und Segway – Motorgerätecenter Ernst Moser GmbH.',
}

const COLOR = '#4A7C59'
const ALPHA = `${COLOR}1a`

const ROBOTS = [
  {
    name: 'Ambrogio',
    icon: Leaf,
    category: 'Rasenmähroboter',
    desc: 'Vollautomatische Rasenpflege – Ambrogio Mähroboter mähen präzise und leise, Tag und Nacht. Ideal für Privat- und Gewerbeflächen.',
    href: '/motorgeraetecenter/ambrogio',
    bullets: ['Kabellose GPS-Technologie', 'App-Steuerung', 'Geräuscharm & energiesparend', 'Bis zu 30.000 m² Fläche'],
  },
  {
    name: 'Pudu Robotics',
    icon: Settings,
    category: 'Serviceroboter',
    desc: 'Pudu Serviceroboter übernehmen Liefer- und Reinigungsaufgaben in Restaurants, Hotels, Spitälern und Gewerbebetrieben.',
    href: '/motorgeraetecenter/pudu-robotics',
    bullets: ['Autonome Navigation', 'Hindernis-Erkennung', 'Für Gastronomie & Pflege', 'Intuitives Interface'],
  },
  {
    name: 'Segway',
    icon: Zap,
    category: 'Elektro-Mobilität',
    desc: 'Segway bietet innovative Lösungen für die persönliche Mobilität und gewerbliche Anwendungen.',
    href: '/motorgeraetecenter/segway',
    bullets: ['E-Scooter & E-Bikes', 'Gewerbliche Modelle', 'Langlebige Akkus', 'Wartung vor Ort'],
  },
]

export default function RoboterPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${COLOR} 0%, ${COLOR}cc 100%)`, padding: '100px 0 72px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/motorgeraetecenter" className="breadcrumb-link">Motorgerätecenter</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Roboter</span>
          </nav>
          <h1 className="center-hero-title" style={{ marginTop: 20 }}>Roboter & Autonome Geräte</h1>
          <p className="center-hero-desc">
            Ambrogio, Pudu Robotics und Segway – wir sind Ihr Partner für die Automatisierung von morgen.
          </p>
        </div>
      </div>

      {/* Robots Grid */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: COLOR }} />
              <div className="section-label">Unsere Roboter-Marken</div>
              <h2 className="section-title">Automatisierung für jeden Bedarf</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {ROBOTS.map((robot, i) => {
              const Icon = robot.icon
              return (
                <AnimatedSection key={robot.name} delay={i * 0.07}>
                  <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 28, alignItems: 'center', background: '#fff', border: '1px solid var(--c-border)', borderRadius: 16, padding: '32px' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: ALPHA, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={28} color={COLOR} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLOR, marginBottom: 4 }}>{robot.category}</div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 10, color: 'var(--c-text)' }}>{robot.name}</h3>
                      <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.65, marginBottom: 14 }}>{robot.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {robot.bullets.map(b => (
                          <span key={b} style={{ fontSize: 12, background: ALPHA, color: COLOR, padding: '4px 10px', borderRadius: 100, fontWeight: 500 }}>{b}</span>
                        ))}
                      </div>
                    </div>
                    <Link href={robot.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: COLOR, color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Mehr erfahren <ArrowRight size={14} />
                    </Link>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="center-cta-section">
        <div className="center-cta-deco" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: COLOR }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${COLOR}bb`, marginBottom: 16 }}>Demo & Beratung</div>
            <h2 className="center-cta-title">Roboter-Demo gewünscht?</h2>
            <p className="center-cta-sub">Wir führen Ihnen unsere Roboter gerne live vor – vereinbaren Sie einen Termin.</p>
            <div className="center-cta-btns">
              <a href="tel:+41326755805" className="center-cta-btn-solid" style={{ background: COLOR }}>
                <Phone size={15} /> Termin vereinbaren
              </a>
              <Link href="/motorgeraetecenter" className="center-cta-btn-ghost">
                <ArrowRight size={15} /> Zurück zum Center
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
