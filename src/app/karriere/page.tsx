import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { readClient as client } from '@/lib/sanity'
import {
  Heart, Award, TrendingUp, Users, MapPin, Clock, ArrowRight,
  FileText, ChevronRight, Mail, Phone, Briefcase,
} from 'lucide-react'

export const revalidate = 60

interface JobPosting {
  _id: string
  title: string
  kind: 'stelle' | 'lehrstelle'
  center?: string
  centerColor?: string
  type?: string
  pensum?: string
  location?: string
  duration?: string
  description?: string
  pdfUrl?: string
}

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

export default async function KarrierePage() {
  const jobs = await client.fetch<JobPosting[]>(
    `*[_type == "jobPosting" && isActive == true] | order(order asc, _createdAt asc) {
      _id, title, kind, center, centerColor, type, pensum, location, duration, description, pdfUrl
    }`
  ).catch(() => [] as JobPosting[])
  const stellen = jobs.filter((j) => j.kind === 'stelle')
  const lehrstellen = jobs.filter((j) => j.kind === 'lehrstelle')

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="karriere-hero">
        <Image
          src="/images/unternehmen/jubilaeum-hero.webp"
          alt="Ernst Moser GmbH Team – 50-Jahre-Jubiläum"
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
              <div className="section-divider" style={{ background: '#1a1a1a' }} />
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
              <div className="section-divider" style={{ background: '#1a1a1a' }} />
              <div className="section-label">Offene Stellen</div>
              <h2 className="section-title">Aktuell suchen<br />wir Sie</h2>
            </div>
          </AnimatedSection>

          {stellen.length > 0 ? (
            <div className="karriere-jobs-list">
              {stellen.map((job, i) => {
                const col = job.centerColor ?? '#1a1a1a'
                return (
                  <AnimatedSection key={job._id} delay={i * 0.1}>
                    <div className="karriere-job-card">
                      <div className="karriere-job-header">
                        <div className="karriere-job-icon" style={{ background: `${col}12`, color: col }}>
                          <Briefcase size={22} />
                        </div>
                        <div>
                          {job.center && (
                            <div className="karriere-job-center" style={{ color: col }}>{job.center}</div>
                          )}
                          <h3 className="karriere-job-title">{job.title}</h3>
                        </div>
                      </div>
                      {job.description && <p className="karriere-job-desc">{job.description}</p>}
                      <div className="karriere-job-meta">
                        {job.type && <span className="karriere-job-tag"><Clock size={12} /> {job.type}</span>}
                        {job.pensum && <span className="karriere-job-tag"><TrendingUp size={12} /> {job.pensum}</span>}
                        {job.location && <span className="karriere-job-tag"><MapPin size={12} /> {job.location}</span>}
                      </div>
                      <div className="karriere-job-actions">
                        <a
                          href={`mailto:info@ernst-moser.ch?subject=${encodeURIComponent(`Bewerbung: ${job.title}`)}`}
                          className="karriere-job-btn-primary"
                          style={{ background: col }}
                        >
                          <Mail size={14} />
                          Jetzt bewerben
                        </a>
                        {job.pdfUrl && (
                          <a href={job.pdfUrl} target="_blank" rel="noopener noreferrer" className="karriere-job-btn-ghost">
                            <FileText size={14} />
                            Stellenbeschrieb (PDF)
                          </a>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          ) : (
            <AnimatedSection>
              <div className="karriere-empty-notice">
                <div className="karriere-empty-icon"><Briefcase size={26} /></div>
                <h3 className="karriere-empty-title">Zurzeit keine offenen Stellen</h3>
                <p className="karriere-empty-desc">
                  Aktuell sind keine Stellen ausgeschrieben. Wir freuen uns aber jederzeit über Ihre
                  Spontanbewerbung — vielleicht ergibt sich schon bald die passende Möglichkeit.
                </p>
              </div>
            </AnimatedSection>
          )}

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
      <section className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#1a1a1a' }} />
              <div className="section-label">Nachwuchs</div>
              <h2 className="section-title">
                Ausbildung &<br />Lehrstellen
              </h2>
            </div>
          </AnimatedSection>

          {lehrstellen.length > 0 ? (
            <div className="karriere-lehr-grid">
              {lehrstellen.map((a, i) => {
                const col = a.centerColor ?? '#4A7C59'
                return (
                  <AnimatedSection key={a._id} delay={i * 0.1}>
                    <div className="karriere-lehr-card">
                      <div className="karriere-lehr-accent" style={{ background: col }} />
                      {a.duration && <div className="karriere-lehr-duration" style={{ color: col }}>{a.duration}</div>}
                      <div className="karriere-lehr-title">{a.title}</div>
                      {a.description && <p className="karriere-lehr-desc">{a.description}</p>}
                      <a
                        href="mailto:info@ernst-moser.ch?subject=Anfrage Lehrstelle"
                        className="karriere-lehr-link"
                        style={{ color: col }}
                      >
                        Jetzt anfragen <ArrowRight size={13} />
                      </a>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          ) : (
            <AnimatedSection>
              <div className="karriere-empty-notice">
                <div className="karriere-empty-icon" style={{ color: '#4A7C59', background: '#4A7C5912' }}><Award size={26} /></div>
                <h3 className="karriere-empty-title">Zurzeit keine offenen Lehrstellen</h3>
                <p className="karriere-empty-desc">
                  Momentan sind keine Lehrstellen ausgeschrieben. Interessiert an einer Ausbildung bei uns?
                  Sende uns gerne eine Anfrage – wir freuen uns auf dich.
                </p>
              </div>
            </AnimatedSection>
          )}

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
