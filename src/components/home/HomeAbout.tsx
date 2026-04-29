'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const BADGES = [
  { value: 'Seit 1976', label: 'Gegründet' },
  { value: '3 Center', label: 'Spezialbereiche' },
  { value: 'Gerlafingen SO', label: 'Standort' },
]

const VALUES = [
  {
    title: 'Familienunternehmen in 3. Generation',
    desc: 'Adrian Moser führt das Unternehmen mit denselben Werten wie sein Vater',
  },
  {
    title: 'Zertifizierte Markenpartnerschaften',
    desc: 'Scania seit 1996, Kubota seit 1976 – Kompetenz mit Tradition',
  },
  {
    title: 'Fest in der Region Solothurn',
    desc: 'Wir kennen unsere Kunden – persönlich, zuverlässig, lokal',
  },
]

export default function HomeAbout() {
  return (
    <section className="section home-about-section">
      <div className="container">
        <div className="home-about-grid">

          {/* ── Left: Image with floating badges ── */}
          <motion.div
            className="home-about-img-col"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="home-about-img-box">
              <Image
                src="/images/home/warum-1.webp"
                alt="Ernst Moser GmbH – Firmengelände Gerlafingen"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="home-about-img-overlay" />
            </div>

            {/* Floating stat badges */}
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                className={`home-about-badge home-about-badge--${i}`}
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: EASE }}
              >
                <div className="home-about-badge-val">{b.value}</div>
                <div className="home-about-badge-lbl">{b.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: Text content ── */}
          <motion.div
            className="home-about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <div className="section-divider" style={{ background: '#1B2D5B' }} />
            <div className="section-label">Über uns</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Ihr verlässlicher<br />Partner seit 1976
            </h2>

            <p className="home-about-text">
              Was 1976 als kleines Unternehmen in Biberist begann, ist heute einer der
              führenden Spezialisten für Nutzfahrzeuge, Kommunalgeräte und Motorgeräte
              in der Region Solothurn&nbsp;/ Mittelland.
            </p>
            <p className="home-about-text">
              Unter der Leitung von <strong>Adrian Moser</strong>{' '}
              führen wir das Familienunternehmen mit über 50&nbsp;Jahren Erfahrung in die Zukunft –
              mit einem eingespielten Team aus
              zertifizierten Fachleuten und denselben Werten, die uns seit Beginn auszeichnen:
              persönliche Beratung, Fachkompetenz und erstklassiger Service.
            </p>

            <div className="home-about-values">
              {VALUES.map((v) => (
                <div key={v.title} className="home-about-value-row">
                  <div className="home-about-value-dot" />
                  <div>
                    <div className="home-about-value-title">{v.title}</div>
                    <div className="home-about-value-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/unternehmen" className="home-about-cta">
              Mehr über uns
              <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
