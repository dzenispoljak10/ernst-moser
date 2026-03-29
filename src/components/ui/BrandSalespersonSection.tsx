'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, User, ChevronRight } from 'lucide-react'

interface Salesperson {
  firstName: string
  lastName: string
  title?: string
  phone?: string
  email?: string
}

interface Center {
  name: string
  color: string
}

interface Props {
  sp: Salesperson | null
  brandName: string
  center: Center
  centerSlug: string
  photoUrl?: string | null
  emailSubject?: string
  backHref?: string
  backLabel?: string
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function BrandSalespersonSection({ sp, brandName, center, centerSlug, photoUrl, emailSubject, backHref, backLabel }: Props) {
  return (
    <section className="brand-sp-section">
      <div className="brand-sp-diagonal-deco" aria-hidden="true" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: center.color }} />

      <div className="container">
        {/* Header – centered */}
        <motion.div
          className="brand-sp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="section-divider" style={{ background: center.color, margin: '0 auto 16px' }} />
          <div className="section-label">Ihr Ansprechpartner</div>
          <h2 className="section-title">Persönliche Beratung</h2>
          <p className="brand-sp-subtitle">Ihr persönlicher Ansprechpartner für {brandName}</p>
        </motion.div>

        {/* Asymmetric layout: photo left, info right */}
        <motion.div
          className="brand-sp-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
        >
          {/* Photo – floating animation */}
          <motion.div
            className="brand-sp-photo-wrap"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={sp ? `${sp.firstName} ${sp.lastName}` : 'Ansprechpartner'}
                width={280}
                height={340}
                className="brand-sp-photo"
                unoptimized
              />
            ) : (
              <div className="brand-sp-placeholder">
                <User size={64} />
              </div>
            )}
            <div className="brand-sp-photo-accent" style={{ background: center.color }} />
          </motion.div>

          {/* Info */}
          <div className="brand-sp-info">
            <div className="brand-sp-name">
              {sp ? `${sp.firstName} ${sp.lastName}` : 'Unser Team'}
            </div>
            <div className="brand-sp-job">
              {sp?.title ?? `Verkaufsberater ${center.name}`}
            </div>
            <div className="brand-sp-badge" style={{ background: center.color }}>
              {center.name}
            </div>

            <div className="brand-sp-btns">
              <a
                href={`tel:${(sp?.phone ?? '+41326755805').replace(/[\s()\-]/g, '')}`}
                className="brand-sp-btn-solid"
                style={{ background: center.color }}
              >
                <Phone size={16} />
                {sp?.phone ?? '+41 (0)32 675 58 05'}
              </a>
              <a
                href={`mailto:${sp?.email ?? 'info@ernst-moser.ch'}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}`}
                className="brand-sp-btn-outline"
                style={{ borderColor: center.color, color: center.color }}
              >
                <Mail size={16} />
                E-Mail schreiben
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}
        >
          <Link href={backHref ?? `/${centerSlug}`} className="brand-back-link">
            <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
            {backLabel ?? `Zurück zu ${center.name}`}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
