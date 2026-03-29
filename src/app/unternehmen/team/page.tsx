import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getTeamMembers } from '@/lib/queries'
import AnimatedSection from '@/components/ui/AnimatedSection'
import TeamContent from './TeamContent'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Unser Team',
  description: 'Lernen Sie das Team der Ernst Moser GmbH kennen – Fachleute aus Nutzfahrzeugcenter, Kommunalcenter und Motorgerätecenter in Gerlafingen SO.',
}

export default async function TeamPage() {
  const members = await getTeamMembers().catch(() => [])

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, #1B2D5B 0%, #0f1c3a 100%)',
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav
            className="legal-breadcrumb"
            style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}
          >
            <Link href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/unternehmen" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
              Unternehmen
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Team</span>
          </nav>

          <AnimatedSection>
            <div className="karriere-hero-badge">Über uns</div>
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: 16,
                marginTop: 12,
              }}
            >
              Unser Team
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              {members.length > 0 ? members.length : 18} engagierte Fachleute, drei Spezialbereiche –
              ein gemeinsames Ziel: höchste Qualität und persönliche Beratung für unsere Kunden.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <TeamContent members={members} />
        </div>
      </section>
    </>
  )
}
