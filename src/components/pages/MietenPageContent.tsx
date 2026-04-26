import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  Clock, CheckCircle, Phone, Mail, ArrowRight,
  Calendar, Leaf, Zap, Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type MietItem = { icon: LucideIcon; title: string; desc: string }

const MIET_ITEMS: Record<string, MietItem[]> = {
  kommunalcenter: [
    { icon: Leaf,     title: 'Mäher & Mulcher',          desc: 'Aufsitzmäher, Frontmäher und Mulchgeräte für grosse Flächen.' },
    { icon: Settings, title: 'Kommunalfahrzeuge',         desc: 'Transporter und Mehrzweckfahrzeuge für Gemeinden.' },
    { icon: Zap,      title: 'Winterdienst-Equipment',   desc: 'Schneefräsen, Streuer und Räumgeräte für den Winter.' },
    { icon: Clock,    title: 'Forstgeräte',              desc: 'Sägen, Häcksler und Forstmulcher auf Anfrage.' },
  ],
  motorgeraetecenter: [
    { icon: Zap,      title: 'Reinigungsgeräte',         desc: 'Hochdruckreiniger, Kehrmaschinen und Industriesauger.' },
    { icon: Leaf,     title: 'Mähroboter',               desc: 'Autonome Rasenmäher für Langzeiteinsätze.' },
    { icon: Settings, title: 'Garten & Forsttechnik',    desc: 'Häcksler, Freischneider, Kettensägen und mehr.' },
    { icon: Clock,    title: 'Spezialgeräte auf Anfrage', desc: 'Weitere Geräte kurzfristig auf Anfrage erhältlich.' },
  ],
}

const TARIFE = [
  { dauer: 'Pro Tag',   preis: 'Auf Anfrage' },
  { dauer: 'Pro Woche', preis: 'Auf Anfrage' },
  { dauer: 'Pro Monat', preis: 'Auf Anfrage' },
]

const VORTEILE = [
  'Immer gewartete und geprüfte Geräte',
  'Flexible Mietdauer ohne Langzeitbindung',
  'Persönliche Einweisung inklusive',
  'Fachkundige Beratung zur Gerätewahl',
  'Schnelle Verfügbarkeit ab Lager',
  'Haftpflicht im Mietpreis inbegriffen',
]

const CENTER_META: Record<string, { name: string; color: string; slug: string }> = {
  kommunalcenter:     { name: 'Kommunalcenter',    color: '#C0392B', slug: 'kommunalcenter' },
  motorgeraetecenter: { name: 'Motorgerätecenter', color: '#4A7C59', slug: 'motorgeraetecenter' },
}

export default function MietenPageContent({ centerSlug }: { centerSlug: string }) {
  const meta = CENTER_META[centerSlug] ?? CENTER_META.kommunalcenter
  const items = MIET_ITEMS[centerSlug] ?? MIET_ITEMS.kommunalcenter
  const accentAlpha = `${meta.color}1a`

  return (
    <>
      {/* Hero */}
      <div
        className="page-hero-wrap"
        style={{
          background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 100%)`,
          padding: '100px 0 72px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: -80, top: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href={`/${meta.slug}`} className="breadcrumb-link">{meta.name}</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Mietgeräte</span>
          </nav>
          <h1 className="center-hero-title" style={{ marginTop: 20 }}>Mietgeräte</h1>
          <p className="center-hero-desc">
            Flexible Kurz- und Langzeitmiete – professionelle Geräte ohne grosse Investition.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="tel:+41326755805" className="btn-primary" style={{ background: '#fff', color: meta.color }}>
              <Phone size={15} /> Jetzt anfragen
            </a>
          </div>
        </div>
      </div>

      {/* Mietgeräte Grid */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: meta.color }} />
              <div className="section-label">Mietangebot</div>
              <h2 className="section-title">Unsere Mietgeräte</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="center-services-grid"
            delay={0.05}
            style={{ marginBottom: 64 }}
          >
            {items.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="center-service-card">
                  <div className="center-service-icon" style={{ background: accentAlpha }}>
                    <Icon size={22} color={meta.color} />
                  </div>
                  <div className="center-service-title">{item.title}</div>
                  <div className="center-service-desc">{item.desc}</div>
                </div>
              )
            })}
          </AnimatedSection>

          {/* Vorteile + Tarife */}
          <AnimatedSection delay={0.08}>
            <div className="miet-vorteile-tarife-grid">
              {/* Vorteile */}
              <div style={{ background: 'var(--c-bg-2)', borderRadius: 16, padding: 36 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--c-text)' }}>
                  Ihre Vorteile
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {VORTEILE.map(v => (
                    <li key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                      <CheckCircle size={16} color={meta.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tarife */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--c-text)' }}>
                  Mietkonditionen
                </h3>
                {TARIFE.map(t => (
                  <div
                    key={t.dauer}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '16px 0', borderBottom: '1px solid var(--c-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Calendar size={16} color={meta.color} />
                      <span style={{ fontWeight: 500 }}>{t.dauer}</span>
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>{t.preis}</span>
                  </div>
                ))}
                <p style={{ fontSize: 13, color: 'var(--c-text-muted)', marginTop: 20, lineHeight: 1.6 }}>
                  Die genauen Tarife hängen vom Gerät und der Mietdauer ab.
                  Kontaktieren Sie uns für ein individuelles Angebot.
                </p>
                <a
                  href="mailto:info@ernst-moser.ch"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    marginTop: 20, padding: '12px 22px',
                    background: meta.color, color: '#fff', borderRadius: 8,
                    fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  }}
                >
                  <Mail size={15} /> Angebot anfragen
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="center-cta-section">
        <div className="center-cta-deco" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: meta.color }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${meta.color}bb`, marginBottom: 16 }}>Mietanfrage</div>
            <h2 className="center-cta-title">Gerät mieten – einfach anfragen</h2>
            <p className="center-cta-sub">
              Wir beraten Sie gerne zur Verfügbarkeit und zu den besten Optionen für Ihren Bedarf.
            </p>
            <div className="center-cta-btns">
              <a href="tel:+41326755805" className="center-cta-btn-solid" style={{ background: meta.color }}>
                <Phone size={15} /> Jetzt anrufen
              </a>
              <Link href={`/${meta.slug}`} className="center-cta-btn-ghost">
                <ArrowRight size={15} /> Zurück zum Center
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
