import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  Truck, Wrench, ShieldCheck, Clock,
  Leaf, Award, Settings, Users,
  Zap, Star, Phone, Mail, ArrowRight,
  CheckCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ServiceItem = { icon: LucideIcon; title: string; desc: string; bullets: string[] }

const LEISTUNGEN: Record<string, ServiceItem[]> = {
  nutzfahrzeugcenter: [
    {
      icon: Truck, title: 'Fahrzeugverkauf',
      desc: 'Wir verkaufen Nutzfahrzeuge, Aufbauten, Anhänger und Wohnmobile führender Marken.',
      bullets: ['Neuwagen mit Herstellergarantie', 'Geprüfte Occasionen', 'Probefahrten möglich', 'Finanzierungs- & Leasingangebote'],
    },
    {
      icon: Wrench, title: 'Werkstatt & Reparatur',
      desc: 'Unsere zertifizierten Techniker sorgen für schnellen und fachgerechten Service.',
      bullets: ['Alle Marken und Modelle', 'Originalersatzteile', 'Schnelle Diagnose', 'Express-Reparaturservice'],
    },
    {
      icon: ShieldCheck, title: 'Service & Inspektion',
      desc: 'Regelmässige Wartung verlängert die Lebensdauer Ihres Fahrzeugs.',
      bullets: ['Herstellerkonforme Inspektionen', 'Reifenservice', 'Klimaanlagenwartung', 'HU/AU Vorbereitung'],
    },
    {
      icon: Clock, title: 'Pannendienst',
      desc: 'Bei einer Panne sind wir schnell für Sie da – auch ausserhalb der Öffnungszeiten.',
      bullets: ['Telefonische Sofortberatung', 'Pannenhilfe vor Ort', 'Abschleppdienst', 'Ersatzfahrzeug auf Anfrage'],
    },
  ],
  kommunalcenter: [
    {
      icon: Leaf, title: 'Maschinen & Geräte',
      desc: 'Breites Sortiment an Kommunalmaschinen für Profis und Kommunen.',
      bullets: ['Mäher, Mulcher, Freischneider', 'Transporter und Kommunalfahrzeuge', 'Winterdienst-Equipment', 'Forstgeräte'],
    },
    {
      icon: Settings, title: 'Wartung & Reparatur',
      desc: 'Fachkundige Wartung und Reparatur für alle Maschinenmarken.',
      bullets: ['Markenübergreifender Service', 'Originalersatzteile', 'Saisonale Wartungspakete', 'Vor-Ort-Service auf Anfrage'],
    },
    {
      icon: Award, title: 'Kaufberatung',
      desc: 'Unabhängige Beratung für die optimale Maschine – abgestimmt auf Ihre Anforderungen.',
      bullets: ['Bedarfsanalyse', 'Demo-Einsätze möglich', 'Mehrere Marken im Vergleich', 'Langzeit-Betreuung'],
    },
    {
      icon: Users, title: 'Mietgeräte',
      desc: 'Flexibel mieten ohne grosse Investition – für Kurzzeit- und Dauereinsätze.',
      bullets: ['Tages-, Wochen- & Monatstarife', 'Immer gewartete Geräte', 'Breites Sortiment', 'Schnelle Verfügbarkeit'],
    },
  ],
  motorgeraetecenter: [
    {
      icon: Zap, title: 'Elektro & Roboter',
      desc: 'Modernste Akku- und Elektrogeräte sowie autonome Roboter für den Profi.',
      bullets: ['Mähroboter (Ambrogio, Segway)', 'Akkusägen und -freischneider', 'Reinigungsgeräte (Nilfisk)', 'Pudu Serviceroboter'],
    },
    {
      icon: Wrench, title: 'Reparatur & Service',
      desc: 'Schneller Reparaturservice durch unser geschultes Fachpersonal.',
      bullets: ['Alle Motorgeräte-Marken', 'Vergaser, Motor, Elektrik', 'Messer schärfen', 'Saisonale Wartungspakete'],
    },
    {
      icon: Leaf, title: 'Nachhaltige Lösungen',
      desc: 'Wir helfen Ihnen, auf umweltfreundlichere Geräte umzusteigen.',
      bullets: ['Akku statt Benzin', 'Energiesparen im Betrieb', 'Fachgerechte Entsorgung', 'Kostenloser Vergleich'],
    },
    {
      icon: Star, title: 'Neugeräte & Kaufberatung',
      desc: 'Breites Sortiment führender Marken mit kompetenter Beratung.',
      bullets: ['Stihl, Makita, Stiga u.v.m.', 'Probevorführungen', 'Zubehör & Ersatzteile', 'Finanzierung möglich'],
    },
  ],
}

const CENTER_META: Record<string, { name: string; color: string; slug: string }> = {
  nutzfahrzeugcenter: { name: 'Nutzfahrzeugcenter', color: '#1B2D5B', slug: 'nutzfahrzeugcenter' },
  kommunalcenter:     { name: 'Kommunalcenter',     color: '#C0392B', slug: 'kommunalcenter' },
  motorgeraetecenter: { name: 'Motorgerätecenter',  color: '#4A7C59', slug: 'motorgeraetecenter' },
}

export default function LeistungenPageContent({ centerSlug }: { centerSlug: string }) {
  const meta = CENTER_META[centerSlug] ?? CENTER_META.nutzfahrzeugcenter
  const leistungen = LEISTUNGEN[centerSlug] ?? LEISTUNGEN.nutzfahrzeugcenter
  const accentAlpha = `${meta.color}1a`

  return (
    <>
      {/* Hero */}
      <div
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Leistungen</span>
          </nav>
          <h1 className="center-hero-title" style={{ marginTop: 20 }}>Unsere Leistungen</h1>
          <p className="center-hero-desc">
            Vom Verkauf über die Beratung bis zum Service – alles aus einer Hand im {meta.name}.
          </p>
        </div>
      </div>

      {/* Leistungen Grid */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: meta.color }} />
              <div className="section-label">Was wir anbieten</div>
              <h2 className="section-title">Leistungsübersicht</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {leistungen.map((svc, i) => {
              const Icon = svc.icon
              return (
                <AnimatedSection key={svc.title} delay={i * 0.06}>
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid var(--c-border)',
                      borderRadius: 16,
                      padding: '32px',
                      height: '100%',
                      transition: 'box-shadow 0.22s, transform 0.22s',
                    }}
                  >
                    <div
                      style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: accentAlpha,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={24} color={meta.color} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, marginBottom: 10, color: 'var(--c-text)' }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.65, marginBottom: 20 }}>
                      {svc.desc}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {svc.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                          <CheckCircle size={14} color={meta.color} style={{ flexShrink: 0 }} />
                          {b}
                        </li>
                      ))}
                    </ul>
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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: meta.color }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${meta.color}bb`, marginBottom: 16 }}>Jetzt anfragen</div>
            <h2 className="center-cta-title">Fragen zu unseren Leistungen?</h2>
            <p className="center-cta-sub">
              Unser Team im {meta.name} berät Sie gerne – telefonisch, per E-Mail oder direkt in Gerlafingen.
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
