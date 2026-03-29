import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react'

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
import { getCenters } from '@/lib/queries'

const OPENING_HOURS = [
  { day: 'Mo – Fr', time: '07:00–12:00 / 13:15–17:30' },
  { day: 'Samstag', time: '07:00–12:00' },
  { day: 'Sonntag', time: 'Geschlossen' },
]

const QUICK_LINKS = [
  { label: 'Unternehmen', href: '/unternehmen' },
  { label: 'Karriere', href: '/karriere' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Impressum', href: '/impressum' },
]

export default async function Footer({ logoUrl }: { logoUrl?: string | null }) {
  const centers = await getCenters()

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand */}
            <div>
              <div style={{ marginBottom: 16 }}>
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Ernst Moser GmbH"
                    width={160}
                    height={48}
                    style={{ height: 42, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                    unoptimized
                  />
                ) : (
                  <span style={{ fontFamily: 'Nersans, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff' }}>
                    Ernst Moser GmbH
                  </span>
                )}
              </div>
              <p className="footer-brand-desc">
                Ihr zuverlässiger Partner für Nutzfahrzeuge, Kommunalfahrzeuge und Motorgeräte in der Schweiz seit über 50 Jahren.
              </p>
              <div className="footer-socials">
                <a
                  href="https://www.facebook.com/ernstmosergmbh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={15} />
                </a>
                <a
                  href="https://www.instagram.com/ernstmosergmbh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={15} />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="footer-col-title">Links</div>
              <nav className="footer-links">
                {QUICK_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="footer-link">
                    <ChevronRight size={13} />
                    {l.label}
                  </Link>
                ))}
                {centers.map((c) => (
                  <Link key={c._id} href={`/${c.slug.current}`} className="footer-link">
                    <ChevronRight size={13} />
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Kontakt */}
            <div>
              <div className="footer-col-title">Kontakt</div>
              <div className="footer-contact-row">
                <MapPin size={14} />
                <span>
                  Derendingenstrasse 25<br />
                  4563 Gerlafingen SO
                </span>
              </div>
              <div className="footer-contact-row">
                <Phone size={14} />
                <a href="tel:+41326755805" className="footer-contact-val">
                  +41 (0)32 675 58 05
                </a>
              </div>
              <div className="footer-contact-row">
                <Mail size={14} />
                <a href="mailto:info@ernst-moser.ch" className="footer-contact-val">
                  info@ernst-moser.ch
                </a>
              </div>
            </div>

            {/* Col 4: Öffnungszeiten */}
            <div>
              <div className="footer-col-title">Öffnungszeiten</div>
              {OPENING_HOURS.map((row) => (
                <div key={row.day} className="opening-row">
                  <span className="opening-day">{row.day}</span>
                  <span className="opening-time">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p className="footer-bottom-text">
            © {new Date().getFullYear()} Ernst Moser GmbH · Alle Rechte vorbehalten
          </p>
          <div className="footer-bottom-links">
            <Link href="/datenschutz" className="footer-bottom-link">Datenschutz</Link>
            <Link href="/impressum" className="footer-bottom-link">Impressum</Link>
            <Link href="/agb" className="footer-bottom-link">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
