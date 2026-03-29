'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { BRAND_EXTRA_SECTIONS } from '@/data/brandSections'
import type {
  BrandSection,
  InnovationSection,
  TechSection,
  HeritageSection,
  SustainabilitySection,
  VideoSection,
  AwardsSection,
} from '@/data/brandSections'
import { getIcon } from '@/lib/iconMap'
import { Trophy, Calendar, CheckCircle2 } from 'lucide-react'

// ─── Shared animation helpers ─────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariant: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      className={`bx-section section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger}
    >
      {children}
    </motion.section>
  )
}

function SectionHeader({
  badge, headline, subline, color,
}: {
  badge?: string; headline: string; subline?: string; color: string
}) {
  return (
    <motion.div className="section-header bx-header" variants={fadeUp} style={{ marginBottom: 40 }}>
      <div className="section-divider" style={{ background: color }} />
      {badge && <div className="section-label">{badge}</div>}
      <h2 className="section-title">{headline}</h2>
      {subline && <p className="bx-subline">{subline}</p>}
    </motion.div>
  )
}

// ─── Innovation Section ────────────────────────────────────────────────────────

function InnovationBlock({ s, color }: { s: InnovationSection; color: string }) {
  const accentAlpha = `${color}1a`
  return (
    <Section className="bx-innovation-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} subline={s.subline} color={color} />
        <div className={`bx-innovation-split ${s.imageRight ? 'bx-innovation-split--rev' : ''}`}>
          {s.image && (
            <motion.div className="bx-innovation-img-wrap" variants={fadeUp}>
              <Image
                src={s.image}
                alt={s.imageAlt ?? s.headline}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="bx-innovation-img-overlay" style={{ background: `${color}22` }} />
            </motion.div>
          )}
          <motion.div className="bx-innovation-content" variants={stagger}>
            <motion.p className="bx-body" variants={itemVariant}>{s.body}</motion.p>
            <motion.div className="bx-features-list" variants={stagger}>
              {s.features.map((f, i) => {
                const Icon = getIcon(f.icon)
                return (
                  <motion.div key={i} className="bx-feature-item" variants={itemVariant}>
                    <div className="bx-feature-icon" style={{ background: accentAlpha }}>
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <div className="bx-feature-title">{f.title}</div>
                      <div className="bx-feature-text">{f.text}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ─── Tech Section ─────────────────────────────────────────────────────────────

function TechBlock({ s, color }: { s: TechSection; color: string }) {
  const accentAlpha = `${color}1a`
  return (
    <Section className="bx-tech-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} subline={s.subline} color={color} />
        <div className="bx-tech-split">
          {s.image && (
            <motion.div className="bx-tech-img-wrap" variants={fadeUp}>
              <Image
                src={s.image}
                alt={s.imageAlt ?? s.headline}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </motion.div>
          )}
          <motion.div className="bx-tech-content" variants={stagger}>
            <motion.p className="bx-body" variants={itemVariant}>{s.body}</motion.p>
            <motion.div className="bx-specs-grid" variants={stagger}>
              {s.specs.map((spec, i) => (
                <motion.div key={i} className="bx-spec-item" variants={itemVariant}>
                  <div className="bx-spec-value" style={{ color }}>{spec.value}</div>
                  <div className="bx-spec-label">{spec.label}</div>
                </motion.div>
              ))}
            </motion.div>
            {s.features && s.features.length > 0 && (
              <motion.div className="bx-features-list" style={{ marginTop: 24 }} variants={stagger}>
                {s.features.map((f, i) => {
                  const Icon = getIcon(f.icon)
                  return (
                    <motion.div key={i} className="bx-feature-item" variants={itemVariant}>
                      <div className="bx-feature-icon" style={{ background: accentAlpha }}>
                        <Icon size={20} color={color} />
                      </div>
                      <div>
                        <div className="bx-feature-title" style={{ color: 'rgba(255,255,255,0.9)' }}>{f.title}</div>
                        <div className="bx-feature-text" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.text}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ─── Heritage Section ─────────────────────────────────────────────────────────

function HeritageBlock({ s, color }: { s: HeritageSection; color: string }) {
  return (
    <Section className="bx-heritage-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} color={color} />
        {s.image && (
          <motion.div className="bx-heritage-img-wrap" variants={fadeUp}>
            <Image
              src={s.image}
              alt={s.imageAlt ?? s.headline}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              unoptimized
            />
            <div className="bx-heritage-img-fade" />
          </motion.div>
        )}
        <motion.p className="bx-body bx-heritage-body" variants={itemVariant}>{s.body}</motion.p>
        <div className="bx-milestones-track">
          <div className="bx-milestones-line" style={{ background: `${color}33` }} />
          {s.milestones.map((m, i) => (
            <motion.div
              key={i}
              className="bx-milestone"
              variants={itemVariant}
              custom={i}
            >
              <div className="bx-milestone-dot" style={{ background: color, boxShadow: `0 0 0 4px ${color}22` }} />
              <div className="bx-milestone-year" style={{ color }}>{m.year}</div>
              <div className="bx-milestone-text">{m.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Sustainability Section ────────────────────────────────────────────────────

function SustainabilityBlock({ s, color }: { s: SustainabilitySection; color: string }) {
  const accentAlpha = `${color}1a`
  return (
    <Section className="bx-sustain-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} color={color} />
        <div className="bx-sustain-split">
          {s.image && (
            <motion.div className="bx-sustain-img-wrap" variants={fadeUp}>
              <Image
                src={s.image}
                alt={s.imageAlt ?? s.headline}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
                unoptimized
              />
            </motion.div>
          )}
          <motion.div className="bx-sustain-content" variants={stagger}>
            <motion.p className="bx-body" variants={itemVariant}>{s.body}</motion.p>
            <motion.div className="bx-sustain-stats" variants={stagger}>
              {s.stats.map((stat, i) => (
                <motion.div key={i} className="bx-sustain-stat" variants={itemVariant}>
                  <div className="bx-sustain-stat-value" style={{ color }}>
                    {stat.value}{stat.suffix ?? ''}
                  </div>
                  <div className="bx-sustain-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            {s.features && s.features.length > 0 && (
              <motion.div className="bx-features-list" variants={stagger}>
                {s.features.map((f, i) => {
                  const Icon = getIcon(f.icon)
                  return (
                    <motion.div key={i} className="bx-feature-item" variants={itemVariant}>
                      <div className="bx-feature-icon" style={{ background: accentAlpha }}>
                        <Icon size={18} color={color} />
                      </div>
                      <div>
                        <div className="bx-feature-title">{f.title}</div>
                        <div className="bx-feature-text">{f.text}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ─── Video Section ────────────────────────────────────────────────────────────

function VideoBlock({ s, color }: { s: VideoSection; color: string }) {
  const accentAlpha = `${color}1a`
  return (
    <Section className="bx-video-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} color={color} />
        {s.body && <motion.p className="bx-body bx-video-body" variants={itemVariant}>{s.body}</motion.p>}
        <motion.div className="bx-video-wrap" variants={fadeUp}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${s.videoId}?rel=0&modestbranding=1`}
            title={s.headline}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="bx-video-iframe"
          />
        </motion.div>
        {s.features && s.features.length > 0 && (
          <motion.div className="bx-video-features" variants={stagger}>
            {s.features.map((f, i) => {
              const Icon = getIcon(f.icon)
              return (
                <motion.div key={i} className="bx-video-feat" variants={itemVariant}>
                  <div className="bx-video-feat-icon" style={{ background: accentAlpha }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div className="bx-video-feat-title">{f.title}</div>
                  <div className="bx-video-feat-text">{f.text}</div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </Section>
  )
}

// ─── Awards Section ───────────────────────────────────────────────────────────

function AwardsBlock({ s, color }: { s: AwardsSection; color: string }) {
  const accentAlpha = `${color}1a`
  return (
    <Section className="bx-awards-section">
      <div className="container">
        <SectionHeader badge={s.badge} headline={s.headline} color={color} />
        {s.body && <motion.p className="bx-body" variants={itemVariant}>{s.body}</motion.p>}
        <motion.div className="bx-awards-grid" variants={stagger}>
          {s.awards.map((a, i) => (
            <motion.div key={i} className="bx-award-card" variants={itemVariant}>
              <div className="bx-award-icon" style={{ background: accentAlpha }}>
                <Trophy size={28} color={color} />
              </div>
              <div className="bx-award-name">{a.name}</div>
              <div className="bx-award-meta">
                <Calendar size={13} />
                <span>{a.year}</span>
                <span className="bx-award-sep">·</span>
                <span>{a.org}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ─── Router ───────────────────────────────────────────────────────────────────

function renderSection(s: BrandSection, color: string, i: number) {
  switch (s.type) {
    case 'innovation':    return <InnovationBlock    key={i} s={s} color={color} />
    case 'tech':          return <TechBlock          key={i} s={s} color={color} />
    case 'heritage':      return <HeritageBlock      key={i} s={s} color={color} />
    case 'sustainability':return <SustainabilityBlock key={i} s={s} color={color} />
    case 'video':         return <VideoBlock         key={i} s={s} color={color} />
    case 'awards':        return <AwardsBlock        key={i} s={s} color={color} />
    default: return null
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function BrandExtraSections({
  brandSlug,
  centerColor,
}: {
  brandSlug: string
  centerColor: string
}) {
  const sections = BRAND_EXTRA_SECTIONS[brandSlug]
  if (!sections?.length) return null
  return <>{sections.map((s, i) => renderSection(s, centerColor, i))}</>
}
