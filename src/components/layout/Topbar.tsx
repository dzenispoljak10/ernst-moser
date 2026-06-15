import Link from 'next/link'

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

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-right">
          <Link href="/karriere" className="topbar-item">Karriere</Link>
          <div className="topbar-divider" />
          <Link href="/unternehmen" className="topbar-item">Unternehmen</Link>
          <div className="topbar-divider" />
          <a
            href="https://www.facebook.com/e.moser.nutzfahrzeugcenter/"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item topbar-social"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/e.moser_gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item topbar-social"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/ernst-moser-gmbh/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item topbar-social"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
