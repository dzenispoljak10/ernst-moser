'use client'

import { motion } from 'framer-motion'

const FLOAT_CONFIGS = [
  { y: [0, -8, 0],  duration: 3,   delay: 0   },
  { y: [0, -6, 0],  duration: 3.5, delay: 0.5 },
  { y: [0, -10, 0], duration: 4,   delay: 1   },
  { y: [0, -7, 0],  duration: 3.2, delay: 0.3 },
  { y: [0, -9, 0],  duration: 3.8, delay: 0.7 },
  { y: [0, -5, 0],  duration: 4.2, delay: 1.2 },
]

export function FloatingWrapper({ children, index }: { children: React.ReactNode; index: number }) {
  const cfg = FLOAT_CONFIGS[index % FLOAT_CONFIGS.length]
  return (
    <motion.div
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      animate={{ y: cfg.y }}
      whileHover={{ y: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      transition={{
        repeat: Infinity,
        duration: cfg.duration,
        delay: cfg.delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
