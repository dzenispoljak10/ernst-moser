'use client'

import { motion } from 'framer-motion'
import { getIcon } from '@/lib/iconMap'

interface PortableBlock {
  _type: string
  children?: Array<{ text: string }>
}

interface SanityHighlight {
  _key: string
  icon?: string
  label: string
  desc?: string
}

interface Props {
  brandName: string
  descBlocks: PortableBlock[]
  highlights: SanityHighlight[]
  centerColor: string
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function BrandAboutSection({ brandName, descBlocks, highlights, centerColor }: Props) {
  const paragraphs = descBlocks
    .filter(b => b._type === 'block' && b.children)
    .map(b => b.children!.map(c => c.text).join(''))
    .filter(t => t.trim())

  return (
    <section className="section brand-about-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="section-divider" style={{ background: centerColor }} />
          <div className="section-label" style={{ marginBottom: 12 }}>Über die Marke</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            {brandName} – Was uns verbindet
          </h2>
        </motion.div>

        <div className="brand-about-grid">
          {/* Left: staggered paragraphs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <div className="brand-about-text">
              {paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  className={i === 0 ? 'brand-about-lead' : ''}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: vertical timeline */}
          {highlights.length > 0 && (
            <div className="brand-timeline">
              <div className="brand-timeline-heading">Warum {brandName}</div>
              {highlights.map((h, i) => {
                const Icon = getIcon(h.icon)
                const isLast = i === highlights.length - 1
                return (
                  <div key={h._key ?? h.label} className="brand-timeline-item">
                    <div className="brand-timeline-track">
                      <motion.div
                        className="brand-timeline-dot"
                        style={{ background: centerColor }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1, ease: EASE }}
                      />
                      {!isLast && (
                        <motion.div
                          className="brand-timeline-line"
                          style={{ background: `${centerColor}35`, transformOrigin: 'top' }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
                        />
                      )}
                    </div>

                    <motion.div
                      className="brand-timeline-content"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    >
                      <div className="brand-timeline-icon" style={{ background: `${centerColor}18` }}>
                        <Icon size={18} color={centerColor} />
                      </div>
                      <div className="brand-timeline-label">{h.label}</div>
                      {h.desc && <div className="brand-timeline-desc">{h.desc}</div>}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
