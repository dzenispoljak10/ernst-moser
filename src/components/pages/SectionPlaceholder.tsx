import Link from 'next/link'
import { Construction } from 'lucide-react'

interface Props {
  title: string
  centerName: string
  centerColor: string
  centerSlug: string
  description?: string
}

/**
 * Placeholder page section – replace with real content.
 * TODO: Add actual section content here.
 */
export default function SectionPlaceholder({
  title,
  centerName,
  centerColor,
  centerSlug,
  description,
}: Props) {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: centerColor,
          padding: '80px 0 60px',
          color: '#fff',
        }}
      >
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
            {centerName}
          </div>
          <h1
            style={{
              fontFamily: 'Nersans, Arial, sans-serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', marginTop: 14, maxWidth: 520 }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* TODO placeholder */}
      <div className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: `${centerColor}12`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              color: centerColor,
            }}
          >
            <Construction size={32} />
          </div>
          <h2
            style={{
              fontFamily: 'Nersans, Arial, sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--c-text)',
              marginBottom: 12,
            }}
          >
            Inhalt folgt
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-text-muted)', maxWidth: 400, margin: '0 auto 32px' }}>
            {/* TODO: Replace with actual section content */}
            Dieser Bereich wird demnächst mit Inhalt befüllt.
          </p>
          <Link
            href={`/${centerSlug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: centerColor,
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Zurück zu {centerName}
          </Link>
        </div>
      </div>
    </>
  )
}
