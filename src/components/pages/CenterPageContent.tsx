import { readClient as client, imageUrl } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CountUp from '@/components/ui/CountUp'
import {
  ArrowRight, Tag, Phone, Mail,
  Truck, Wrench, ShieldCheck, Clock,
  Leaf, Award, Settings, Users,
  Zap, Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Center-spezifische Inhalte ──────────────────────────────────────────────

type ServiceItem = { icon: LucideIcon; title: string; desc: string }
type WhyItem = { icon: LucideIcon; title: string; desc: string }

const CENTER_SERVICES: Record<string, ServiceItem[]> = {
  nutzfahrzeugcenter: [
    { icon: Truck,       title: 'Fahrzeugverkauf',   desc: 'Nutzfahrzeuge, Aufbauten und Anhänger mit kompetenter Beratung und Probefahrt.' },
    { icon: Wrench,      title: 'Werkstatt & Service', desc: 'Unsere zertifizierten Techniker übernehmen alle Wartungs- und Reparaturarbeiten.' },
    { icon: ShieldCheck, title: 'Garantie & Schutz',  desc: 'Herstellergarantien und Garantieverlängerungen für maximale Sicherheit.' },
    { icon: Clock,       title: 'Expressservice',     desc: 'Schneller Pannenservice und Notreparaturen für minimale Ausfallzeiten.' },
  ],
  kommunalcenter: [
    { icon: Leaf,     title: 'Grünflächenpflege',  desc: 'Professionelle Geräte und Maschinen für Kommunen, Gärtner und Profis.' },
    { icon: Settings, title: 'Service & Unterhalt', desc: 'Fachkundige Wartung, Inspektion und Reparatur aller Marken.' },
    { icon: Award,    title: 'Kaufberatung',        desc: 'Unabhängige, kompetente Beratung für die optimale Maschine.' },
    { icon: Users,    title: 'Mietgeräte',          desc: 'Flexible Kurz- und Langzeitmiete ohne grosse Investitionen.' },
  ],
  motorgeraetecenter: [
    { icon: Zap,      title: 'Elektrogeräte & Roboter', desc: 'Autonome Mähroboter, E-Sägen und modernste Reinigungsgeräte.' },
    { icon: Wrench,   title: 'Reparatur & Service',     desc: 'Schneller Service für alle Marken und Gerätetypen.' },
    { icon: Leaf,     title: 'Nachhaltige Lösungen',    desc: 'Energie-effiziente Geräte mit geringen Betriebskosten.' },
    { icon: Users,    title: 'Neugeräte & Miete',       desc: 'Breites Sortiment zum Kauf und flexible Mietoptionen.' },
  ],
}

const CENTER_WHY: Record<string, WhyItem[]> = {
  nutzfahrzeugcenter: [
    { icon: Truck,       title: 'Komplettanbieter',     desc: 'Fahrzeuge, Aufbauten, Anhänger und Zubehör – alles aus einer Hand.' },
    { icon: Wrench,      title: 'Eigene Werkstatt',     desc: 'Zertifizierte Techniker mit modernstem Werkzeug.' },
    { icon: ShieldCheck, title: 'Herstellervertretung', desc: 'Offizielle Vertretung führender Nutzfahrzeugmarken.' },
  ],
  kommunalcenter: [
    { icon: Leaf,     title: 'Umweltbewusst',       desc: 'Nachhaltige Lösungen für Grünpflege und Kommunalbetrieb.' },
    { icon: Award,    title: 'Schweizer Qualität',  desc: 'Geprüfte Markenqualität für höchste Anforderungen.' },
    { icon: Settings, title: 'Rundum-Service',      desc: 'Wartung, Reparatur und Ersatzteile für alle Maschinen.' },
  ],
  motorgeraetecenter: [
    { icon: Zap,    title: 'Innovative Technik',   desc: 'Modernste Akku- und Elektrotechnologie für den Profi.' },
    { icon: Leaf,   title: 'Leise & Sauber',       desc: 'Elektrisch betriebene Geräte schonen Mensch und Umwelt.' },
    { icon: Star,   title: 'Premium-Marken',       desc: 'Führende Hersteller wie Stihl, Nilfisk und Ambrogio.' },
  ],
}

const STATS = [
  { value: 50, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 33, suffix: '',  label: 'Marken im Sortiment' },
  { value: 3,  suffix: '',  label: 'Spezialbereiche' },
  { value: 500, suffix: '+', label: 'Zufriedene Kunden' },
]

// ─── Typen ────────────────────────────────────────────────────────────────────

interface Brand {
  _id: string
  name: string
  slug: { current: string }
  logo?: { asset: { _ref: string } }
  heroImage?: { asset: { _ref: string } }
  descShort?: string
}

interface Center {
  _id: string
  name: string
  slug: { current: string }
  color: string
  description?: string
  heroImage?: { asset: { _ref: string } }
}

// ─── Komponente ───────────────────────────────────────────────────────────────

export default async function CenterPageContent({ centerSlug }: { centerSlug: string }) {
  const data = await client.fetch(
    `{
      "center": *[_type == "center" && slug.current == $slug][0] {
        _id, name, slug, color, description, heroImage
      },
      "brands": *[_type == "brand" && center->slug.current == $slug] | order(order asc, name asc) {
        _id, name, slug, logo, heroImage,
        "descShort": pt::text(description)[0..120]
      }
    }`,
    { slug: centerSlug }
  )

  if (!data.center) notFound()

  const center: Center = data.center
  const brands: Brand[] = data.brands
  const services = CENTER_SERVICES[centerSlug] ?? CENTER_SERVICES.nutzfahrzeugcenter
  const whyItems = CENTER_WHY[centerSlug] ?? CENTER_WHY.nutzfahrzeugcenter
  const accentAlpha = `${center.color}22`

  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────────── */}
      <section
        className="center-hero"
        style={!center.heroImage ? { background: `linear-gradient(135deg, ${center.color} 0%, ${center.color}bb 100%)` } : {}}
      >
        {center.heroImage && (
          <Image
            src={imageUrl(center.heroImage)}
            alt={center.name}
            fill
            className="center-hero-media"
            sizes="100vw"
            priority
            unoptimized
          />
        )}
        <div
          className="center-hero-overlay"
          style={{ background: `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.52) 45%, ${center.color}44 100%)` }}
        />
        <div className="container center-hero-content">
          <div
            className="center-hero-tag"
            style={{ borderColor: `${center.color}66`, background: `${center.color}28` }}
          >
            <Tag size={10} />
            Spezialbreich
          </div>
          <h1 className="center-hero-title">{center.name}</h1>
          {center.description && (
            <p className="center-hero-desc">{center.description}</p>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="#marken" className="btn-primary" style={{ background: center.color, color: '#fff' }}>
              Alle Marken
              <ArrowRight size={15} />
            </a>
            <a href="#kontakt" className="btn-ghost">
              <Phone size={14} />
              Kontakt aufnehmen
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <div className="hero-scroll-dot" />
        </div>
      </section>

      {/* ── Section 2: Alle Marken ───────────────────────────────── */}
      <section id="marken" className="section brands-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <div>
              <div className="section-divider" style={{ background: center.color }} />
              <div className="section-label">Markenpartner</div>
              <h2 className="section-title">Unsere Marken</h2>
            </div>
            <Link href={`/${centerSlug}`} className="btn-primary" style={{ background: center.color, color: '#fff', padding: '11px 22px', fontSize: 13 }}>
              Alle anzeigen <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          {brands.length > 0 ? (
            <AnimatedSection className="brands-grid-center" delay={0.05}>
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/${centerSlug}/${brand.slug.current}`}
                  className="brand-card-item"
                >
                  <style suppressHydrationWarning>{`.brand-card-item:hover { border-color: ${center.color}44; } .brand-card-item::after { background: ${center.color}; }`}</style>
                  {/* Card image or logo */}
                  {brand.heroImage ? (
                    <div style={{ width: '100%', aspectRatio: '3/2', borderRadius: 8, overflow: 'hidden', position: 'relative', marginBottom: 8 }}>
                      <Image
                        src={imageUrl(brand.heroImage)}
                        alt={brand.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="220px"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="brand-logo-wrap">
                      {brand.logo ? (
                        <Image
                          src={imageUrl(brand.logo)}
                          alt={brand.name}
                          width={160}
                          height={72}
                          className="brand-logo-img"
                          unoptimized
                        />
                      ) : (
                        <span className="brand-item-name">{brand.name}</span>
                      )}
                    </div>
                  )}
                  <span className="brand-item-name">{brand.name}</span>
                  {brand.descShort && (
                    <p className="brand-item-desc">{brand.descShort}</p>
                  )}
                  <div className="brand-item-arrow" style={{ color: center.color }}>
                    Mehr erfahren <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </AnimatedSection>
          ) : (
            <p style={{ color: 'var(--c-text-muted)', textAlign: 'center', padding: '48px 0' }}>
              Demnächst verfügbar
            </p>
          )}
        </div>
      </section>

      {/* ── Section 3: Leistungen ────────────────────────────────── */}
      <section className="section center-services-section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
            <div>
              <div className="section-divider" style={{ background: center.color }} />
              <div className="section-label">Was wir bieten</div>
              <h2 className="section-title">Unsere Leistungen</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection className="center-services-grid" delay={0.05}>
            {services.map((svc) => {
              const Icon = svc.icon
              return (
                <div key={svc.title} className="center-service-card">
                  <div
                    className="center-service-icon"
                    style={{ background: accentAlpha }}
                  >
                    <Icon size={22} color={center.color} />
                  </div>
                  <div className="center-service-title">{svc.title}</div>
                  <div className="center-service-desc">{svc.desc}</div>
                </div>
              )
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Section 4: Warum Ernst Moser ─────────────────────────── */}
      <section className="section center-why-section">
        <div className="container">
          <AnimatedSection className="section-header" style={{ marginBottom: 40 }}>
            <div>
              <div className="section-divider" style={{ background: center.color }} />
              <div className="section-label">Unsere Stärken</div>
              <h2 className="section-title">Warum Ernst Moser</h2>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection className="center-stats-row" delay={0.05}>
            {STATS.map((s) => (
              <div key={s.label} className="center-stat-box">
                <div className="center-stat-num" style={{ color: center.color }}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="center-stat-lbl">{s.label}</div>
              </div>
            ))}
          </AnimatedSection>

          {/* Why cards */}
          <AnimatedSection className="center-why-grid" delay={0.1}>
            {whyItems.map((w) => {
              const Icon = w.icon
              return (
                <div key={w.title} className="center-why-card">
                  <div className="center-why-icon" style={{ background: accentAlpha }}>
                    <Icon size={20} color={center.color} />
                  </div>
                  <div className="center-why-title">{w.title}</div>
                  <div className="center-why-desc">{w.desc}</div>
                </div>
              )
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Section 5: Kontakt CTA ───────────────────────────────── */}
      <section id="kontakt" className="center-cta-section">
        <div className="center-cta-deco" />
        <div className="center-cta-deco-2" />
        {/* Subtle center-color accent at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: center.color }} />
        <div className="container">
          <AnimatedSection className="center-cta-inner">
            <div className="section-label" style={{ color: `${center.color}bb`, marginBottom: 16 }}>
              Jetzt anfragen
            </div>
            <h2 className="center-cta-title">
              Interesse am {center.name}?
            </h2>
            <p className="center-cta-sub">
              Unser Team berät Sie gerne – ob per Telefon, E-Mail oder direkt vor Ort in Gerlafingen.
            </p>
            <div className="center-cta-btns">
              <a
                href="tel:+41326755805"
                className="center-cta-btn-solid"
                style={{ background: center.color }}
              >
                <Phone size={15} />
                Jetzt anrufen
              </a>
              <a
                href="mailto:info@ernst-moser.ch"
                className="center-cta-btn-ghost"
              >
                <Mail size={15} />
                E-Mail schreiben
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
