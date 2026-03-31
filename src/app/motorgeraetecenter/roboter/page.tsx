'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ChevronRight, Cpu, Wifi, Zap, Shield, Bot, Leaf, Navigation, Settings } from 'lucide-react'

const COLOR = '#4A7C59'
const NEON = '#5aff8a'

const ROBOTS = [
  {
    slug: 'ambrogio',
    name: 'Ambrogio',
    logo: '/images/brands/ambrogio/logo.webp',
    hero: '/images/products/ambrogio-smarte-funktionen-und-maximale-sicherheit/main.webp',
    category: 'Rasenmähroboter',
    tagline: 'Autonome Rasenpflege. Rund um die Uhr.',
    desc: 'Ambrogio Mähroboter kartieren, mähen und kehren zurück – ohne Begrenzungskabel, ohne Aufsicht. GPS-gesteuert, leise, präzise.',
    href: '/motorgeraetecenter/ambrogio',
    icon: Leaf,
    specs: [
      { icon: Navigation, label: 'Navigation', value: 'GPS + ACS' },
      { icon: Zap, label: 'Fläche', value: 'bis 30.000 m²' },
      { icon: Wifi, label: 'Steuerung', value: 'App / Cloud' },
      { icon: Shield, label: 'Schutz', value: 'IP44 / Alarm' },
    ],
    color: '#3d7a4f',
  },
  {
    slug: 'pudu-robotics',
    name: 'Pudu Robotics',
    logo: '/images/brands/pudu-robotics/logo.webp',
    hero: '/images/products/pudu-robotics-kommerzielle-reinigungsroboter/main.webp',
    category: 'Serviceroboter',
    tagline: 'Reinigung & Lieferung. Vollautomatisch.',
    desc: 'Pudu-Roboter navigieren autonom durch Gewerbeflächen, Spitäler und Hotels. LiDAR-SLAM, Hinderniserkennung, Cloud-Flottenmanagement.',
    href: '/motorgeraetecenter/pudu-robotics',
    icon: Bot,
    specs: [
      { icon: Cpu, label: 'Navigation', value: 'LiDAR SLAM' },
      { icon: Zap, label: 'Akku', value: 'bis 8h' },
      { icon: Wifi, label: 'Cloud', value: 'PuduCloud' },
      { icon: Settings, label: 'Einsatz', value: 'Gewerbe / Pflege' },
    ],
    color: '#2a5a8a',
  },
  {
    slug: 'segway',
    name: 'Segway Navimow',
    logo: '/images/brands/segway/logo.webp',
    hero: '/images/products/segway-navimow-x-series/main.webp',
    category: 'Mähroboter RTK',
    tagline: 'Centimetergenau. Kabellos. Intelligent.',
    desc: 'Segway Navimow nutzt RTK-GPS für millimetergenaue Navigation – komplett ohne Begrenzungsdraht. Plug & Play, App-gesteuert, sofort einsatzbereit.',
    href: '/motorgeraetecenter/segway',
    icon: Navigation,
    specs: [
      { icon: Navigation, label: 'GPS', value: 'RTK Präzision' },
      { icon: Zap, label: 'Fläche', value: 'bis 5.000 m²' },
      { icon: Shield, label: 'Setup', value: 'Kabellos' },
      { icon: Wifi, label: 'App', value: 'iMow / Segway' },
    ],
    color: '#1a4a7a',
  },
]

const STATS = [
  { value: '3', label: 'Roboter-Marken' },
  { value: '75.000+', label: 'Pudu-Roboter weltweit' },
  { value: '30.000', label: 'm² Mähfläche (Ambrogio)' },
  { value: '24/7', label: 'Autonomer Betrieb' },
]

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

/* ── Decorative SVG circuit grid ──────────────────────────────────────────── */
function CircuitGrid() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={NEON} strokeWidth="0.5" />
        </pattern>
        <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.5" fill={NEON} />
          <circle cx="60" cy="0" r="1.5" fill={NEON} />
          <circle cx="0" cy="60" r="1.5" fill={NEON} />
          <circle cx="60" cy="60" r="1.5" fill={NEON} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

/* ── Scan line animation ──────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${NEON}66 30%, ${NEON} 50%, ${NEON}66 70%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      initial={{ top: '0%', opacity: 0 }}
      animate={{ top: ['0%', '100%', '0%'], opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default function RoboterPage() {
  return (
    <div style={{ background: '#070d09' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <CircuitGrid />
        <ScanLine />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900, height: 900, borderRadius: '50%',
          background: `radial-gradient(circle, ${COLOR}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Animated ring */}
        <motion.div
          style={{
            position: 'absolute', right: -200, top: '50%', transform: 'translateY(-50%)',
            width: 700, height: 700, borderRadius: '50%',
            border: `1px solid ${NEON}22`,
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
            width: 500, height: 500, borderRadius: '50%',
            border: `1px solid ${NEON}44`,
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 3, paddingTop: 80, paddingBottom: 80 }}>
          {/* Breadcrumb */}
          <motion.nav
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: `${NEON}88`, marginBottom: 48, letterSpacing: '0.05em' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          >
            <Link href="/" style={{ color: `${NEON}66`, textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={11} />
            <Link href="/motorgeraetecenter" style={{ color: `${NEON}66`, textDecoration: 'none' }}>Motorgerätecenter</Link>
            <ChevronRight size={11} />
            <span style={{ color: NEON }}>Roboter</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: 20 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              border: `1px solid ${NEON}44`,
              background: `${NEON}0d`,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: NEON,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: NEON, boxShadow: `0 0 8px ${NEON}` }} />
              Autonome Systeme · Ernst Moser GmbH
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              margin: '0 0 24px',
              color: '#fff',
            }}
          >
            DIE ROBOTER
            <br />
            <span style={{
              background: `linear-gradient(90deg, ${NEON} 0%, #a8ffcb 50%, ${NEON} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              DER ZUKUNFT.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 540, marginBottom: 48 }}
          >
            Rasenmähroboter, Serviceroboter, RTK-Mähroboter — vollautonome
            Systeme die wir für Sie liefern, installieren und warten.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <a
              href="#marken"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 10,
                background: COLOR, color: '#fff',
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
                boxShadow: `0 0 24px ${COLOR}88`,
              }}
            >
              Marken entdecken <ArrowRight size={15} />
            </a>
            <a
              href="tel:+41326755805"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 26px', borderRadius: 10,
                border: `1px solid ${NEON}44`,
                color: NEON, fontWeight: 600, fontSize: 14, textDecoration: 'none',
                background: `${NEON}0a`,
              }}
            >
              <Phone size={14} /> Demo anfragen
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#0d1a10',
        borderTop: `1px solid ${NEON}22`,
        borderBottom: `1px solid ${NEON}22`,
        padding: '32px 0',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: '16px 24px',
                  borderRight: i < STATS.length - 1 ? `1px solid ${NEON}18` : 'none',
                }}
              >
                <div style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', color: NEON, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BRAND SECTIONS ════════════════════════════════════════════════════ */}
      <section id="marken" style={{ padding: '80px 0 40px' }}>
        <div className="container" style={{ marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div style={{ width: 40, height: 3, background: NEON, borderRadius: 2, marginBottom: 14 }} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${NEON}99`, marginBottom: 12 }}>Unsere Roboter-Marken</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
              Drei Marken. Ein Ziel: Automatisierung.
            </h2>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ROBOTS.map((robot, i) => {
            const Icon = robot.icon
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={robot.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE }}
                style={{
                  background: i === 0 ? '#0d1a10' : i === 1 ? '#0a0f18' : '#0a0f18',
                  border: `1px solid ${NEON}14`,
                  borderRadius: 24,
                  overflow: 'hidden',
                  margin: '0 0 20px',
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
                  minHeight: 400,
                }}
                  className="robot-card-grid"
                >
                  {/* Image side */}
                  <div style={{
                    order: isEven ? 0 : 1,
                    position: 'relative',
                    minHeight: 340,
                    background: `radial-gradient(circle at 50% 50%, ${robot.color}33 0%, transparent 70%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 40,
                    overflow: 'hidden',
                  }}>
                    {/* Corner markers */}
                    {[['0,0', 'top:0;left:0'], ['100,0', 'top:0;right:0'], ['0,100', 'bottom:0;left:0'], ['100,100', 'bottom:0;right:0']].map(([, pos], ci) => (
                      <div key={ci} style={{
                        position: 'absolute',
                        width: 20, height: 20,
                        ...Object.fromEntries(pos.split(';').map(p => { const [k, v] = p.split(':'); return [k, v] })),
                        borderTop: ci < 2 ? `2px solid ${NEON}66` : 'none',
                        borderBottom: ci >= 2 ? `2px solid ${NEON}66` : 'none',
                        borderLeft: ci % 2 === 0 ? `2px solid ${NEON}66` : 'none',
                        borderRight: ci % 2 === 1 ? `2px solid ${NEON}66` : 'none',
                      }} />
                    ))}

                    {/* Scan overlay */}
                    <motion.div
                      style={{
                        position: 'absolute', left: 0, right: 0, height: 80,
                        background: `linear-gradient(180deg, transparent, ${NEON}08, transparent)`,
                        pointerEvents: 'none',
                      }}
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
                    />

                    <div style={{ position: 'relative', width: '100%', maxWidth: 380, aspectRatio: '4/3' }}>
                      <Image
                        src={robot.hero}
                        alt={robot.name}
                        fill
                        style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 40px rgba(90,255,138,0.15))' }}
                        sizes="50vw"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Content side */}
                  <div style={{
                    order: isEven ? 1 : 0,
                    padding: '56px 48px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    gap: 20,
                  }}>
                    {/* Category badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: `${COLOR}22`, border: `1px solid ${COLOR}44`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color={NEON} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: NEON }}>
                        {robot.category}
                      </span>
                    </div>

                    {/* Logo */}
                    <div style={{ position: 'relative', height: 36, width: 160 }}>
                      <Image src={robot.logo} alt={robot.name} fill style={{ objectFit: 'contain', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }} unoptimized sizes="160px" />
                    </div>

                    {/* Tagline */}
                    <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {robot.tagline}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                      {robot.desc}
                    </p>

                    {/* Specs grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {robot.specs.map((spec) => {
                        const SpecIcon = spec.icon
                        return (
                          <div key={spec.label} style={{
                            padding: '10px 14px', borderRadius: 10,
                            background: `${NEON}08`, border: `1px solid ${NEON}18`,
                            display: 'flex', alignItems: 'center', gap: 10,
                          }}>
                            <SpecIcon size={14} color={NEON} style={{ flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{spec.label}</div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{spec.value}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* CTA */}
                    <Link
                      href={robot.href}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '13px 24px', borderRadius: 10,
                        border: `1px solid ${COLOR}`,
                        background: `${COLOR}22`,
                        color: '#fff', fontWeight: 700, fontSize: 14,
                        textDecoration: 'none', alignSelf: 'flex-start',
                        transition: 'all 0.2s',
                      }}
                    >
                      {robot.name} entdecken <ArrowRight size={14} color={NEON} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        margin: '20px 0 0',
        padding: '80px 0',
        background: `linear-gradient(135deg, #0d1a10 0%, #070d09 100%)`,
        borderTop: `1px solid ${NEON}22`,
        position: 'relative', overflow: 'hidden',
      }}>
        <CircuitGrid />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${COLOR}1a 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '6px 16px', borderRadius: 100, border: `1px solid ${NEON}33`, background: `${NEON}0a` }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: NEON, boxShadow: `0 0 8px ${NEON}` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: NEON }}>Demo & Beratung</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
              Roboter live erleben?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 40, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              Wir führen Ihnen unsere Roboter direkt vor Ort vor — kostenlos und unverbindlich.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="tel:+41326755805"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '15px 32px', borderRadius: 10,
                  background: COLOR, color: '#fff',
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  boxShadow: `0 0 32px ${COLOR}66`,
                }}
              >
                <Phone size={16} /> Demo vereinbaren
              </a>
              <Link
                href="/motorgeraetecenter"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', borderRadius: 10,
                  border: `1px solid rgba(255,255,255,0.15)`,
                  color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <ArrowRight size={14} /> Zum Motorgerätecenter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .robot-card-grid {
            grid-template-columns: 1fr !important;
          }
          .robot-card-grid > div {
            order: unset !important;
          }
        }
      `}</style>
    </div>
  )
}
