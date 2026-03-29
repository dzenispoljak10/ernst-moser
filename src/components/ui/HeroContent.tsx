'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import RotatingText from './RotatingText'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function HeroContent() {
  return (
    <motion.div className="container hero-content" variants={container} initial="hidden" animate="visible">
      <motion.div className="hero-badge" variants={item}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a9eff', display: 'inline-block' }} />
        Gerlafingen, Schweiz
      </motion.div>

      <motion.h1 className="hero-title" variants={item}>
        Ihr Partner für
        <RotatingText />
      </motion.h1>

      <motion.p className="hero-sub" variants={item}>
        Ernst Moser GmbH – seit über 50 Jahren Ihr kompetenter Ansprechpartner
        für Fahrzeuge, Maschinen und Service in der Zentralschweiz.
      </motion.p>

      <motion.div className="hero-ctas" variants={item}>
        <Link href="#center" className="btn-primary">
          Unsere Center entdecken
          <ArrowRight size={16} />
        </Link>
        <a href="tel:+41326755805" className="btn-ghost">
          <Phone size={15} />
          +41 (0)32 675 58 05
        </a>
      </motion.div>
    </motion.div>
  )
}
