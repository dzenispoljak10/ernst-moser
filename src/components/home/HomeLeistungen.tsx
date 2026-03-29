'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wrench, ShoppingCart, CreditCard, Key, RefreshCw, Zap, ArrowRight } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const SERVICES = [
  {
    icon: Wrench,
    color: '#1B2D5B',
    title: 'Reparatur & Service',
    desc: 'Schnelle, fachgerechte Reparaturen aller Marken durch zertifizierte Techniker mit modernster Ausrüstung.',
    href: '/nutzfahrzeugcenter',
  },
  {
    icon: ShoppingCart,
    color: '#4A7C59',
    title: 'Verkauf & Beratung',
    desc: 'Persönliche Beratung für Neu- und Occasionsfahrzeuge sowie Geräte aller Kategorien – wir finden Ihre Lösung.',
    href: '/nutzfahrzeugcenter',
  },
  {
    icon: CreditCard,
    color: '#C0392B',
    title: 'Finanzierung & Leasing',
    desc: 'Flexible Finanzierungsmodelle und attraktive Leasingangebote – massgeschneidert für Ihren Betrieb.',
    href: '/nutzfahrzeugcenter',
  },
  {
    icon: Key,
    color: '#4A7C59',
    title: 'Mietgeräte',
    desc: 'Kurz- und Langzeitmiete von Kommunalgeräten, Motorgeräten und Nutzfahrzeugen – flexibel und günstig.',
    href: '/kommunalcenter',
  },
  {
    icon: RefreshCw,
    color: '#1B2D5B',
    title: 'Occasionen',
    desc: 'Gepflegte Occasionsfahrzeuge und -geräte mit vollständigem Servicenachweis zu attraktiven Preisen.',
    href: '/nutzfahrzeugcenter',
  },
  {
    icon: Zap,
    color: '#C0392B',
    title: 'E-Mobilität & Robotik',
    desc: 'Elektro-Nutzfahrzeuge, autonome Mähroboter und Serviceroboter – die Zukunft der Mobilität jetzt.',
    href: '/motorgeraetecenter',
  },
]

export default function HomeLeistungen() {
  return (
    <section className="section home-leistungen-section">
      <div className="container">
        <motion.div
          className="section-header"
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div>
            <div className="section-divider" style={{ background: '#4A7C59' }} />
            <div className="section-label">Leistungen</div>
            <h2 className="section-title">Alles aus<br />einer Hand</h2>
          </div>
          <p className="home-leistungen-subtitle">
            Von der Beratung über den Kauf bis zum Service –<br />
            bei Ernst Moser GmbH bekommen Sie alles.
          </p>
        </motion.div>

        <div className="home-leistungen-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              >
                <Link
                  href={s.href}
                  className="home-leistung-card"
                  style={{ ['--card-accent' as string]: s.color }}
                >
                  <div className="home-leistung-icon" style={{ background: `${s.color}14` }}>
                    <Icon size={26} color={s.color} />
                  </div>
                  <div className="home-leistung-title">{s.title}</div>
                  <div className="home-leistung-desc">{s.desc}</div>
                  <div className="home-leistung-more" style={{ color: s.color }}>
                    Mehr erfahren <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
