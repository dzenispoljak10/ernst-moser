'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  id?: string
}

export default function AnimatedSection({ children, className, style, delay = 0, id }: Props) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay }}
    >
      {children}
    </motion.div>
  )
}
