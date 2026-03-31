import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'
import { getCenters } from '@/lib/queries'

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const COMPANY_LINKS = [
  { label: 'Über uns',    href: '/unternehmen' },
  { label: 'Team',        href: '/unternehmen/team' },
  { label: 'Karriere',    href: '/karriere' },
  { label: 'Impressum',   href: '/impressum' },
  { label: 'AGB',         href: '/agb' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

export default async function Footer({ logoUrl }: { logoUrl?: string | null }) {
  const centers = await getCenters()

  return (
    <footer style={{ background: '#0f1729', color: '#fff' }}>

      {/* ── Main grid ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.4fr',
          gap: 48,
        }} className="footer-main-grid">

          {/* ── Col 1: Brand ─────────────────────────────────────────────── */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: 20 }}>
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Ernst Moser GmbH"
                  width={160}
                  height={32}
                  style={{ height: 32, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                  unoptimized
                />
              ) : (
                <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                  Ernst Moser GmbH
                </span>
              )}
            </div>

            {/* Tagline */}
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Ihr Partner für Nutzfahrzeuge, Kommunal- und Motorgeräte im Raum Solothurn&nbsp;/ Mittelland.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
              {[
                { href: 'https://www.facebook.com/ernstmosergmbh', label: 'Facebook', icon: <FacebookIcon /> },
                { href: 'https://www.instagram.com/ernstmosergmbh', label: 'Instagram', icon: <InstagramIcon /> },
                { href: 'https://www.linkedin.com/company/ernst-moser-gmbh', label: 'LinkedIn', icon: <LinkedInIcon /> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)'
                    ;(e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Credit */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
              Webseite realisiert durch{' '}
              <a
                href="https://twynte.ch"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
              >
                twynte.ch
              </a>
            </div>
          </div>

          {/* ── Col 2: Center ────────────────────────────────────────────── */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
              Center
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {centers.map(c => (
                <Link
                  key={c._id}
                  href={`/${c.slug.current}`}
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Unternehmen ───────────────────────────────────────── */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
              Unternehmen
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {COMPANY_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Col 4: Kontakt ───────────────────────────────────────────── */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
              Kontakt
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  Derendingenstrasse 25<br />4563 Gerlafingen SO
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <a href="tel:+41326755805" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  +41 (0)32 675 58 05
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mail size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <a href="mailto:info@ernst-moser.ch" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  info@ernst-moser.ch
                </a>
              </div>

              {/* Öffnungszeiten */}
              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
                  Öffnungszeiten
                </div>
                {[
                  { day: 'Mo – Fr', time: '07:00–12:00 / 13:15–17:30' },
                  { day: 'Samstag', time: '07:00–12:00' },
                ].map(row => (
                  <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.day}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '20px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © {new Date().getFullYear()} Ernst Moser GmbH. Alle Rechte vorbehalten.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Impressum', href: '/impressum' },
              { label: 'AGB', href: '/agb' },
              { label: 'Datenschutz', href: '/datenschutz' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
