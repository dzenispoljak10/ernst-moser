import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client, imageUrl } from '@/lib/sanity'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CountUp from '@/components/ui/CountUp'
import {
  ChevronRight, ArrowRight, MapPin, Phone, Mail, Clock,
  HandshakeIcon, ShieldCheck, Star, Users,
} from 'lucide-react'
import type { SanityTeamMember } from '@/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Unternehmen',
  description: 'Über Ernst Moser GmbH – Geschichte, Team, Werte und Standort des führenden Spezialisten für Nutzfahrzeuge und Kommunalgeräte in Gerlafingen SO.',
}

const MILESTONES = [
  { year: '1976', text: 'Ernst Moser gründet das Unternehmen in Biberist. Erste Partnerschaft mit Kubota.' },
  { year: '1992', text: 'Umzug an den heutigen Standort in Gerlafingen SO.' },
  { year: '1996', text: 'Beginn der Scania-Vertragspartnerschaft – bis heute eine tragende Säule.' },
  { year: '2000', text: 'Reform wird als Markenpartner aufgenommen.' },
  { year: '2016', text: 'Neues Gebäude mit dedizierter Scania-Werkstatt. 40-Jahr-Jubiläum.' },
  { year: '2018', text: 'Ernst Moser übergibt das Unternehmen an seine Söhne Stefan und Adrian.' },
  { year: '2021', text: 'Adrian Moser übernimmt als alleiniger Inhaber. 45 Jahre Erfolgsgeschichte.' },
]

const VALUES = [
  {
    icon: HandshakeIcon,
    color: '#1B2D5B',
    title: 'Partnerschaft',
    desc: 'Langfristige Beziehungen zu Kunden und Herstellern sind das Fundament unseres Erfolgs. Wir denken in Jahrzehnten, nicht in Quartalen.',
  },
  {
    icon: ShieldCheck,
    color: '#4A7C59',
    title: 'Zuverlässigkeit',
    desc: 'Was wir versprechen, halten wir. Termin- und qualitätsgerechte Arbeit ist bei uns keine Ausnahme, sondern Standard.',
  },
  {
    icon: Star,
    color: '#C0392B',
    title: 'Qualität',
    desc: 'Von der Beratung über den Kauf bis zum Service: Wir liefern konsequent höchste Qualität – bei Produkten und Dienstleistungen.',
  },
  {
    icon: Users,
    color: '#1B2D5B',
    title: 'Kompetenz',
    desc: 'Unser Team aus zertifizierten Fachleuten bringt echte Expertise mit. Herstellerschulungen, Weiterbildungen, jahrelange Erfahrung.',
  },
]

const STATS = [
  { value: 48, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 30, suffix: '+', label: 'Markenpartner' },
  { value: 16, suffix: '', label: 'Mitarbeitende' },
  { value: 3, suffix: '', label: 'Spezialbereiche' },
]

export default async function UnternehmenPage() {
  const team = await client.fetch<SanityTeamMember[]>(
    `*[_type == "teamMember" && isActive != false] | order(order asc, lastName asc)[0..7] {
      _id, firstName, lastName, role, photo, email, phone, order,
      center->{ _id, name, slug, color }
    }`
  ).catch(() => [] as SanityTeamMember[])

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="unternehmen-hero">
        <Image
          src="/images/unsplash/workshop.jpg"
          alt="Ernst Moser GmbH Firmengelände"
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
        />
        <div className="unternehmen-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="legal-breadcrumb" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Unternehmen</span>
          </nav>
          <div className="karriere-hero-badge">Über uns</div>
          <h1 className="karriere-hero-title">
            Ernst Moser GmbH –<br />Ihr verlässlicher Partner
          </h1>
          <p className="karriere-hero-sub">
            Seit 1976 stehen wir für Fachkompetenz, persönliche Beratung und erstklassigen Service
            in der Region Solothurn/Mittelland. Ein Familienunternehmen mit Tradition und Zukunft.
          </p>
        </div>
      </section>

      {/* ══ GESCHICHTE ═══════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 64 }}>
            <div>
              <div className="section-divider" style={{ background: '#1B2D5B' }} />
              <div className="section-label">Geschichte</div>
              <h2 className="section-title">Von Biberist nach<br />Gerlafingen – seit 1976</h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--c-text-muted)', maxWidth: 320, lineHeight: 1.65 }}>
              Was als kleiner Betrieb begann, ist heute der führende Fahrzeug- und Gerätespezialist der Region.
            </p>
          </AnimatedSection>

          <div className="unternehmen-timeline">
            {MILESTONES.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 0.06} className="unternehmen-milestone">
                <div className="unternehmen-milestone-year">{m.year}</div>
                <div className="unternehmen-milestone-dot">
                  <div className="unternehmen-milestone-dot-inner" />
                </div>
                <div className="unternehmen-milestone-text">{m.text}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ZAHLEN & FAKTEN ══════════════════════════════════════ */}
      <div className="stats-bar">
        <div className="container">
          <AnimatedSection className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="stat-number"><CountUp to={s.value} suffix={s.suffix} /></div>
                <div className="stat-divider" />
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>

      {/* ══ WERTE ════════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#0f1c3a' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#4A7C59' }} />
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Unsere Werte</div>
              <h2 className="section-title" style={{ color: '#fff' }}>Was uns antreibt</h2>
            </div>
          </AnimatedSection>
          <div className="unternehmen-values-grid">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <AnimatedSection key={v.title} delay={i * 0.08}>
                  <div className="unternehmen-value-card">
                    <div className="unternehmen-value-icon" style={{ background: `${v.color}30` }}>
                      <Icon size={28} color={v.color} />
                    </div>
                    <div className="unternehmen-value-title">{v.title}</div>
                    <p className="unternehmen-value-desc">{v.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#C0392B' }} />
              <div className="section-label">Das Team</div>
              <h2 className="section-title">Menschen hinter<br />dem Unternehmen</h2>
            </div>
          </AnimatedSection>

          <div className="team-preview-grid">
            {team.length > 0 ? team.map((member, i) => {
              const photoUrl = member.photo?.asset
                ? imageUrl({ _type: 'image', asset: member.photo.asset })
                : null
              const centerColor = member.center?.color ?? '#1B2D5B'
              return (
                <AnimatedSection key={member._id} delay={i * 0.05}>
                  <div className="team-preview-card">
                    <div className="team-preview-photo">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={`${member.firstName} ${member.lastName}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 50vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div className="team-preview-placeholder" style={{ background: `${centerColor}14` }}>
                          <span style={{ fontSize: 32, fontWeight: 800, color: centerColor, opacity: 0.7 }}>
                            {member.firstName?.[0]}{member.lastName?.[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="team-preview-info">
                      <div className="team-preview-name">
                        {member.firstName} {member.lastName}
                      </div>
                      <div className="team-preview-role">{member.role}</div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            }) : (
              [
                { name: 'Adrian Moser', role: 'Geschäftsführer, Leitung Verkauf', center: 'Kommunalcenter', color: '#C0392B' },
                { name: 'Roland Burkhalter', role: 'Betriebsleiter Nutzfahrzeugcenter', center: 'Nutzfahrzeugcenter', color: '#1B2D5B' },
                { name: 'Ernst Moser', role: 'Springer', center: '', color: '#1B2D5B' },
                { name: 'Michael Peter', role: 'Verkauf Leichtnutzfahrzeuge + Kommunalgeräte', center: 'Nutzfahrzeugcenter', color: '#1B2D5B' },
                { name: 'Raphael Maurer', role: 'Verkauf Robotertechnik + Motorgeräte', center: 'Motorgerätecenter', color: '#4A7C59' },
                { name: 'Daniela Gräf', role: 'Kaufmännische Angestellte', center: '', color: '#1B2D5B' },
                { name: 'Sibylle Moser', role: 'Kaufmännische Angestellte', center: '', color: '#1B2D5B' },
                { name: 'Romario Lüthi', role: 'Werkstattleiter Nutzfahrzeuge', center: 'Nutzfahrzeugcenter', color: '#1B2D5B' },
              ].map((m, i) => (
                <AnimatedSection key={m.name} delay={i * 0.05}>
                  <div className="team-preview-card">
                    <div className="team-preview-photo">
                      <div className="team-preview-placeholder" style={{ background: `${m.color}14` }}>
                        <span style={{ fontSize: 32, fontWeight: 800, color: m.color, opacity: 0.7 }}>
                          {m.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="team-preview-info">
                      <div className="team-preview-name">{m.name}</div>
                      <div className="team-preview-role">{m.role}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>

          {/* CTA Button */}
          <AnimatedSection delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link
                href="/unternehmen/team"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#1B2D5B', color: '#fff',
                  padding: '14px 32px', borderRadius: 8,
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                className="team-cta-btn"
              >
                Team kennenlernen <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ OFFENE STELLEN ═══════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--c-dark)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #1B2D5B 0%, #0d1a36 60%, #4A7C59 100%)',
            opacity: 0.95,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <div
                  style={{
                    display: 'inline-block', fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)', marginBottom: 14,
                  }}
                >
                  Karriere
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900,
                    color: '#fff', lineHeight: 1.2, marginBottom: 14,
                  }}
                >
                  Werden Sie Teil<br />unseres Teams
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 460, lineHeight: 1.65 }}>
                  Wir suchen engagierte Fachleute, die gemeinsam mit uns wachsen wollen –
                  ob Mechaniker, Verkäufer oder Lernende. Jetzt offene Stellen ansehen.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href="/karriere"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#fff', color: '#1B2D5B',
                    padding: '13px 28px', borderRadius: 8,
                    fontWeight: 800, fontSize: 13, letterSpacing: '0.04em',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  Offene Stellen <ArrowRight size={15} />
                </Link>
                <a
                  href="mailto:info@ernst-moser.ch"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.1)', color: '#fff',
                    padding: '13px 28px', borderRadius: 8,
                    fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
                    textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Mail size={14} /> Spontanbewerbung
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ STANDORT ═════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--c-bg-2)' }}>
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="section-divider" style={{ background: '#1B2D5B' }} />
              <div className="section-label">Standort & Infrastruktur</div>
              <h2 className="section-title">Besuchen Sie uns<br />in Gerlafingen</h2>
            </div>
          </AnimatedSection>

          <div className="home-kontakt-grid">
            <AnimatedSection>
              <div className="home-kontakt-map-wrap">
                <iframe
                  src="https://maps.google.com/maps?q=Derendingenstrasse+25,+4563+Gerlafingen,+Switzerland&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Ernst Moser GmbH – Standort"
                  className="home-kontakt-map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="home-kontakt-rows">
                <div className="home-kontakt-row">
                  <div className="home-kontakt-icon"><MapPin size={18} /></div>
                  <div>
                    <div className="home-kontakt-lbl">Adresse</div>
                    <div className="home-kontakt-val">Derendingenstrasse 25<br />4563 Gerlafingen SO</div>
                  </div>
                </div>
                <div className="home-kontakt-row">
                  <div className="home-kontakt-icon"><Phone size={18} /></div>
                  <div>
                    <div className="home-kontakt-lbl">Telefon</div>
                    <a href="tel:+41326755805" className="home-kontakt-val home-kontakt-link">+41 (0)32 675 58 05</a>
                  </div>
                </div>
                <div className="home-kontakt-row">
                  <div className="home-kontakt-icon"><Mail size={18} /></div>
                  <div>
                    <div className="home-kontakt-lbl">E-Mail</div>
                    <a href="mailto:info@ernst-moser.ch" className="home-kontakt-val home-kontakt-link">info@ernst-moser.ch</a>
                  </div>
                </div>
              </div>
              <div className="home-kontakt-hours">
                <div className="home-kontakt-hours-head"><Clock size={14} /> Öffnungszeiten</div>
                <div className="home-kontakt-hours-list">
                  {[
                    { day: 'Montag – Freitag', time: '07:00 – 12:00 / 13:15 – 17:30' },
                    { day: 'Samstag', time: '07:00 – 12:00' },
                    { day: 'Sonntag & Feiertage', time: 'Geschlossen' },
                  ].map((h) => (
                    <div key={h.day} className="home-kontakt-hours-row">
                      <span className="home-kontakt-hours-day">{h.day}</span>
                      <span className="home-kontakt-hours-time">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="home-kontakt-btns">
                <a href="tel:+41326755805" className="home-kontakt-btn-primary"><Phone size={14} /> Anrufen</a>
                <a href="mailto:info@ernst-moser.ch" className="home-kontakt-btn-ghost"><Mail size={14} /> E-Mail</a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
