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
    <footer className="em-footer">

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="em-footer-inner">
        <div className="em-footer-grid">

          {/* Col 1: Brand */}
          <div>
            <div className="em-footer-logo">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Ernst Moser GmbH"
                  width={160}
                  height={32}
                  style={{ height: 32, width: 'auto', objectFit: 'contain' }}
                  unoptimized
                />
              ) : (
                <span className="em-footer-logo-text">Ernst Moser GmbH</span>
              )}
            </div>
            <p className="em-footer-tagline">
              Ihr Partner für Nutzfahrzeuge, Kommunal- und Motorgeräte im Raum Solothurn&nbsp;/ Mittelland.
            </p>
            <div className="em-footer-socials">
              <a href="https://www.facebook.com/ernstmosergmbh" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="em-footer-social">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/ernstmosergmbh" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="em-footer-social">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/ernst-moser-gmbh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="em-footer-social">
                <LinkedInIcon />
              </a>
            </div>
            <div className="em-footer-credit">
              Webseite realisiert durch{' '}
              <a href="https://twyne.ch" target="_blank" rel="noopener noreferrer" className="em-footer-credit-link">
                twyne.ch
              </a>
            </div>
          </div>

          {/* Col 2: Center */}
          <div>
            <div className="em-footer-col-label">Center</div>
            <nav className="em-footer-nav">
              {centers.map(c => (
                <Link key={c._id} href={`/${c.slug.current}`} className="em-footer-link">
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Unternehmen */}
          <div>
            <div className="em-footer-col-label">Unternehmen</div>
            <nav className="em-footer-nav">
              {COMPANY_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="em-footer-link">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Kontakt */}
          <div>
            <div className="em-footer-col-label">Kontakt</div>
            <div className="em-footer-contact">
              <div className="em-footer-contact-row">
                <MapPin size={14} className="em-footer-icon" />
                <span>Derendingenstrasse 25<br />4563 Gerlafingen SO</span>
              </div>
              <div className="em-footer-contact-row">
                <Phone size={14} className="em-footer-icon" />
                <a href="tel:+41326755805" className="em-footer-contact-link">+41 (0)32 675 58 05</a>
              </div>
              <div className="em-footer-contact-row">
                <Mail size={14} className="em-footer-icon" />
                <a href="mailto:info@ernst-moser.ch" className="em-footer-contact-link">info@ernst-moser.ch</a>
              </div>
              <div className="em-footer-hours">
                <div className="em-footer-hours-label">Öffnungszeiten</div>
                <div className="em-footer-hours-row">
                  <span>Mo – Fr</span><span>07:00–12:00 / 13:15–17:30</span>
                </div>
                <div className="em-footer-hours-row">
                  <span>Samstag</span><span>07:00–12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="em-footer-bottom">
        <div className="em-footer-bottom-inner">
          <p className="em-footer-copy">© {new Date().getFullYear()} Ernst Moser GmbH. Alle Rechte vorbehalten.</p>
          <div className="em-footer-legal">
            <Link href="/impressum" className="em-footer-legal-link">Impressum</Link>
            <Link href="/agb" className="em-footer-legal-link">AGB</Link>
            <Link href="/datenschutz" className="em-footer-legal-link">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
