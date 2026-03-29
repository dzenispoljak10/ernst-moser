import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  Heart, Award, TrendingUp, Users, MapPin, Clock, ArrowRight,
  FileText, ChevronRight, Mail, Phone, Wrench, Leaf,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Karriere',
  description: 'Werden Sie Teil des Ernst Moser GmbH Teams in Gerlafingen SO – offene Stellen, Lehrstellen und Spontanbewerbungen.',
}

const BENEFITS = [
  {
    icon: Heart,
    color: '#C0392B',
    title: 'Familiäre Atmosphäre',
    desc: 'Wir sind ein Familienunternehmen – das spürt man täglich. Flache Hierarchien, kurze Wege und ein Team, das füreinander einsteht.',
  },
  {
    icon: Award,
    color: '#1B2D5B',
    title: 'Aus- und Weiterbildung',
    desc: 'Herstellerzertifizierungen, Fachkurse und interne Schulungen. Wir investieren in Ihre Entwicklung – kontinuierlich und langfristig.',
  },
  {
    icon: TrendingUp,
    color: '#4A7C59',
    title: 'Entwicklungsperspektiven',
    desc: 'Ob Lehrabschluss oder Berufseinstieg – bei Ernst Moser gibt es echte Karrieremöglichkeiten in einem wachsenden Betrieb.',
  },
  {
    icon: Users,
    color: '#1B2D5B',
    title: 'Starkes Team',
    desc: 'Ein eingespieltes Team aus Fachleuten, das sein Wissen teilt und gemeinsam anpackt. Hier lernt man von den Besten.',
  },
]

const JOBS = [
  {
    title: 'Automobil-Mechatroniker resp. Fachmann Nutzfahrzeuge',
    center: 'Nutzfahrzeugcenter',
    centerColor: '#1B2D5B',
    type: 'Festanstellung',
    pensum: '100%',
    location: 'Gerlafingen SO',
    description: 'Als Automobil-Mechatroniker bei Ernst Moser sind Sie verantwortlich für Reparaturen, Service und Unterhalt unserer Nutzfahrzeugflotte. Sie arbeiten mit modernsten Diagnosegeräten an Fahrzeugen führender Marken wie Scania, Isuzu und Fiat Professional.',
    pdfUrl: 'https://test.eprofis.ch/automobil-mechatroniker-resp-fachmann-nutfahrzeuge/',
    icon: Wrench,
  },
  {
    title: 'Motorgerätemechaniker',
    center: 'Motorgerätecenter',
    centerColor: '#4A7C59',
    type: 'Festanstellung',
    pensum: '100%',
    location: 'Gerlafingen SO',
    description: 'Als Motorgerätemechaniker warten und reparieren Sie das gesamte Sortiment unserer Motorgeräte – von Stihl-Motorsägen über Mähroboter bis zu professionellen Reinigungsgeräten. Abwechslungsreiche Aufgaben in einem eingespielten Team.',
    pdfUrl: 'https://test.eprofis.ch/motorgeraetemechaniker/',
    icon: Leaf,
  },
]

const APPRENTICESHIPS = [
  {
    title: 'Automobil-Fachmann/-frau',
    color: '#1B2D5B',
    duration: '3 Jahre',
    desc: 'Ausbildung im Bereich Nutzfahrzeuge: Diagnose, Reparatur, Service und Wartung von LKW und leichten Nutzfahrzeugen.',
  },
  {
    title: 'Motorgerätemechaniker/in',
    color: '#4A7C59',
    duration: '3 Jahre',
    desc: 'Ausbildung im Bereich Motorgeräte, Kommunalmaschinen und Gartentechnik. Vielseitiges Tätigkeitsfeld mit modernsten Maschinen.',
  },
]

export default function KarrierePage() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="karriere-hero">
        <Image
          src="https://images.unsplash.com/photo-1632823471565-1ecdf5c6da2f?w=1600&q=85&auto=format&fit=crop"
          alt="Werkstatt Team Ernst Moser GmbH"
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
        />
        <div className="karriere-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="legal-breadcrumb" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Karriere</span>
          </nav>
          <div className="karriere-hero-badge">
            <Users size={12} />
            Wir suchen Verstärkung
          </div>
          <h1 className="karriere-hero-title">
            Werden Sie Teil<br />unseres Teams
          </h1>
          <p className="karriere-hero-sub">
            Ein familiengeführtes Unternehmen mit 45&nbsp;Jahren Geschichte –
            bei Ernst Moser GmbH arbeiten Sie mit Leidenschaft, Fachkompetenz
            und einem Team, das zusammenhält.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#stellen" className="btn-primary" style={{ background: '#fff', color: '#0f0f0f' }}>
              Offene Stellen <ArrowRight size={14} />
            </a>
            <a href="mailto:info@ernst-moser.ch?subject=Spontanbewerbung" className="btn-ghost">
              Spontanbewerbung
            </a>
          </div>
        </div>
      </section>

      {/* ══ WARUM ERNST MOSER ════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#1B2D5B' }} />
              <div className="section-label">Warum zu uns</div>
              <h2 className="section-title">Ihr Arbeitgeber<br />in der Region</h2>
            </div>
          </AnimatedSection>
          <div className="karriere-benefits-grid">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon
              return (
                <AnimatedSection key={b.title} delay={i * 0.08}>
                  <div className="karriere-benefit-card">
                    <div className="karriere-benefit-icon" style={{ background: `${b.color}12`, color: b.color }}>
                      <Icon size={26} />
                    </div>
                    <div className="karriere-benefit-title">{b.title}</div>
                    <p className="karriere-benefit-desc">{b.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ OFFENE STELLEN ═══════════════════════════════════════ */}
      <section id="stellen" className="section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#C0392B' }} />
              <div className="section-label">Offene Stellen</div>
              <h2 className="section-title">Aktuell suchen<br />wir Sie</h2>
            </div>
          </AnimatedSection>

          <div className="karriere-jobs-list">
            {JOBS.map((job, i) => {
              const Icon = job.icon
              return (
                <AnimatedSection key={job.title} delay={i * 0.1}>
                  <div className="karriere-job-card">
                    <div className="karriere-job-header">
                      <div className="karriere-job-icon" style={{ background: `${job.centerColor}12`, color: job.centerColor }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="karriere-job-center" style={{ color: job.centerColor }}>
                          {job.center}
                        </div>
                        <h3 className="karriere-job-title">{job.title}</h3>
                      </div>
                    </div>
                    <p className="karriere-job-desc">{job.description}</p>
                    <div className="karriere-job-meta">
                      <span className="karriere-job-tag">
                        <Clock size={12} /> {job.type}
                      </span>
                      <span className="karriere-job-tag">
                        <TrendingUp size={12} /> {job.pensum}
                      </span>
                      <span className="karriere-job-tag">
                        <MapPin size={12} /> {job.location}
                      </span>
                    </div>
                    <div className="karriere-job-actions">
                      <a
                        href="mailto:info@ernst-moser.ch?subject=Bewerbung: {job.title}"
                        className="karriere-job-btn-primary"
                        style={{ background: job.centerColor }}
                      >
                        <Mail size={14} />
                        Jetzt bewerben
                      </a>
                      <a
                        href={job.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="karriere-job-btn-ghost"
                      >
                        <FileText size={14} />
                        Stellenbeschrieb (PDF)
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {/* Spontanbewerbung */}
          <AnimatedSection delay={0.2}>
            <div className="karriere-spontan-card">
              <div className="karriere-spontan-icon">
                <Heart size={24} color="#C0392B" />
              </div>
              <div>
                <div className="karriere-spontan-title">Keine passende Stelle dabei?</div>
                <p className="karriere-spontan-desc">
                  Wir freuen uns jederzeit über Spontanbewerbungen. Schicken Sie uns Ihre Unterlagen –
                  wir melden uns, wenn sich eine Möglichkeit ergibt.
                </p>
              </div>
              <a
                href="mailto:info@ernst-moser.ch?subject=Spontanbewerbung"
                className="karriere-spontan-btn"
              >
                Spontan bewerben <ArrowRight size={13} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ AUSBILDUNG ═══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--c-dark)', color: '#fff' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#4A7C59' }} />
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Nachwuchs</div>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Ausbildung &<br />Lehrstellen
              </h2>
            </div>
          </AnimatedSection>

          <div className="karriere-lehr-grid">
            {APPRENTICESHIPS.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.1}>
                <div className="karriere-lehr-card">
                  <div className="karriere-lehr-accent" style={{ background: a.color }} />
                  <div className="karriere-lehr-duration" style={{ color: a.color }}>{a.duration}</div>
                  <div className="karriere-lehr-title">{a.title}</div>
                  <p className="karriere-lehr-desc">{a.desc}</p>
                  <a
                    href="mailto:info@ernst-moser.ch?subject=Anfrage Lehrstelle"
                    className="karriere-lehr-link"
                    style={{ color: a.color }}
                  >
                    Jetzt anfragen <ArrowRight size={13} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="karriere-lehr-note">
              <strong>Ausbildungsbeginn:</strong> Jeweils August des laufenden Jahres.
              Bewerbungen jederzeit an{' '}
              <a href="mailto:info@ernst-moser.ch" style={{ color: '#4A7C59' }}>
                info@ernst-moser.ch
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ BEWERBUNG CTA ════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="karriere-cta-box">
              <div className="karriere-cta-left">
                <h2 className="karriere-cta-title">Bereit für den nächsten Schritt?</h2>
                <p className="karriere-cta-sub">
                  Senden Sie Ihre vollständigen Bewerbungsunterlagen (Motivationsschreiben, CV, Zeugnisse)
                  direkt per E-Mail an uns.
                </p>
                <div className="karriere-cta-contact">
                  <div className="karriere-cta-contact-row">
                    <Mail size={15} />
                    <a href="mailto:info@ernst-moser.ch" className="legal-link">
                      info@ernst-moser.ch
                    </a>
                  </div>
                  <div className="karriere-cta-contact-row">
                    <Phone size={15} />
                    <a href="tel:+41326755805" className="legal-link">
                      +41 (0)32 675 58 05
                    </a>
                  </div>
                  <div className="karriere-cta-contact-row">
                    <MapPin size={15} />
                    <span>Derendingenstrasse 25, 4563 Gerlafingen SO</span>
                  </div>
                </div>
              </div>
              <div className="karriere-cta-right">
                <a
                  href="mailto:info@ernst-moser.ch?subject=Bewerbung Ernst Moser GmbH"
                  className="karriere-cta-btn"
                >
                  <Mail size={16} />
                  Bewerbung senden
                </a>
                <div className="karriere-cta-note">
                  Wir melden uns innerhalb von 5 Arbeitstagen.
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
