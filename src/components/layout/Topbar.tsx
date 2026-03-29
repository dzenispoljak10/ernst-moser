import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'

function FacebookIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        {/* Left: Contact info */}
        <div className="topbar-left">
          <a
            href="https://maps.google.com/?q=Derendingenstrasse+25+4563+Gerlafingen"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item"
          >
            <MapPin size={12} />
            Derendingenstrasse 25, 4563 Gerlafingen SO
          </a>
          <div className="topbar-divider" />
          <a href="mailto:info@ernst-moser.ch" className="topbar-item">
            <Mail size={12} />
            info@ernst-moser.ch
          </a>
          <div className="topbar-divider" />
          <a href="tel:+41326755805" className="topbar-item">
            <Phone size={12} />
            +41 (0)32 675 58 05
          </a>
        </div>

        {/* Right: Links + Social */}
        <div className="topbar-right">
          <Link href="/karriere" className="topbar-item">Karriere</Link>
          <div className="topbar-divider" />
          <Link href="/unternehmen" className="topbar-item">Unternehmen</Link>
          <div className="topbar-divider" />
          <a
            href="https://www.facebook.com/ernstmosergmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item topbar-social"
            aria-label="Facebook"
          >
            <FacebookIcon size={13} />
          </a>
          <a
            href="https://www.instagram.com/ernstmosergmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item topbar-social"
            aria-label="Instagram"
          >
            <InstagramIcon size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}
