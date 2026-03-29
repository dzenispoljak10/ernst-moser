'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import { imageUrl } from '@/lib/sanity'
import type { SanityTeamMember } from '@/lib/queries'

const FILTERS = [
  { id: 'all', label: 'Alle', color: '#1B2D5B' },
  { id: 'nutzfahrzeugcenter', label: 'Nutzfahrzeugcenter', color: '#1B2D5B' },
  { id: 'kommunalcenter', label: 'Kommunalcenter', color: '#C0392B' },
  { id: 'motorgeraetecenter', label: 'Motorgerätecenter', color: '#4A7C59' },
]

interface Props {
  members: SanityTeamMember[]
}

export default function TeamContent({ members }: Props) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return members
    return members.filter((m) => m.center?.slug?.current === activeFilter)
  }, [activeFilter, members])

  const activeColor = FILTERS.find((f) => f.id === activeFilter)?.color ?? '#1B2D5B'

  return (
    <>
      {/* Filter Tabs */}
      <motion.div
        className="team-filter-bar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`team-filter-tab${activeFilter === f.id ? ' active' : ''}`}
            style={activeFilter === f.id ? { background: f.color } : {}}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Team Grid */}
      <motion.div className="team-full-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((member, i) => {
            const photoUrl = member.photo?.asset
              ? imageUrl({ _type: 'image', asset: member.photo.asset })
              : null
            const centerColor = member.center?.color ?? '#1B2D5B'

            return (
              <motion.div
                key={member._id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{
                  duration: 0.38,
                  delay: i * 0.04,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="team-full-card">
                  <div className="team-full-photo">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={`${member.firstName} ${member.lastName}`}
                        fill
                        className="team-full-photo-img"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="team-full-placeholder"
                        style={{ background: `${centerColor}14` }}
                      >
                        <span style={{ fontSize: 36, fontWeight: 800, color: centerColor, opacity: 0.6 }}>
                          {member.firstName?.[0]}{member.lastName?.[0]}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="team-full-overlay">
                      <div className="team-full-overlay-inner">
                        <div className="team-full-overlay-name">
                          {member.firstName} {member.lastName}
                        </div>
                        <div className="team-full-overlay-role">{member.role}</div>
                        {(member.email || member.phone) && (
                          <div className="team-full-overlay-links">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="team-full-overlay-link"
                                title={member.email}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail size={14} />
                              </a>
                            )}
                            {member.phone && (
                              <a
                                href={`tel:${member.phone.replace(/\s/g, '')}`}
                                className="team-full-overlay-link"
                                title={member.phone}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone size={14} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="team-full-info">
                    <div className="team-full-name">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="team-full-role">{member.role}</div>
                    {member.center && (
                      <span
                        className="team-full-badge"
                        style={{ background: `${centerColor}14`, color: centerColor }}
                      >
                        {member.center.name}
                      </span>
                    )}
                    {(member.email || member.phone) && (
                      <div className="team-full-contact">
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="team-full-contact-link">
                            <Mail size={12} /> {member.email}
                          </a>
                        )}
                        {member.phone && (
                          <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="team-full-contact-link">
                            <Phone size={12} /> {member.phone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', color: 'var(--c-text-muted)', padding: '64px 0', fontSize: 15 }}
        >
          Keine Mitglieder in diesem Center gefunden.
        </motion.div>
      )}
    </>
  )
}
