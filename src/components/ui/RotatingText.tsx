'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = [
  { text: 'Nutzfahrzeuge.', color: '#4A7FD4' },
  { text: 'Kommunalgeräte.', color: '#E74C3C' },
  { text: 'Motorgeräte.', color: '#5FAD6E' },
]

export default function RotatingText() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="hero-rotating-line" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ color: WORDS[idx].color, display: 'inline-block' }}
        >
          {WORDS[idx].text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
