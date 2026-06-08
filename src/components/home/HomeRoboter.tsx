'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Navigation, Sparkles, Clock } from 'lucide-react'

const NEON = '#5aff8a'
const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const POINTS = [
  { icon: Navigation, label: 'RTK-Mähroboter' },
  { icon: Bot, label: 'Serviceroboter' },
  { icon: Sparkles, label: 'Reinigungsroboter' },
  { icon: Clock, label: '24/7 autonom' },
]

export default function HomeRoboter() {
  return (
    <section className="home-roboter">
      <div className="home-roboter-glow" aria-hidden="true" />
      <div className="container home-roboter-inner">
        {/* Text */}
        <motion.div
          className="home-roboter-text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="home-roboter-eyebrow">
            <span className="home-roboter-dot" />
            Motorgerätecenter · Robotik
          </div>
          <h2 className="home-roboter-title">
            Die Roboter <span className="home-roboter-accent">der Zukunft.</span>
          </h2>
          <p className="home-roboter-desc">
            Mähroboter, Serviceroboter und Reinigungsroboter — vollautonome Systeme,
            die wir für Sie liefern, installieren und warten. Centimetergenau, leise und rund um die Uhr im Einsatz.
          </p>

          <div className="home-roboter-points">
            {POINTS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.label} className="home-roboter-point">
                  <Icon size={15} color={NEON} />
                  {p.label}
                </div>
              )
            })}
          </div>

          <Link href="/motorgeraetecenter/roboter" className="home-roboter-btn">
            Roboter entdecken
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Bild */}
        <motion.div
          className="home-roboter-media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Link href="/motorgeraetecenter/roboter" className="home-roboter-media-link" aria-label="Roboter entdecken">
            <Image
              src="/images/brands/segway/hero.webp"
              alt="Autonome Roboter"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <span className="home-roboter-media-tag">Live-Demo möglich</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
