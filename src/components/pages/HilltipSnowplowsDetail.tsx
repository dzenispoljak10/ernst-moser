'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Send, ExternalLink, ArrowRight } from 'lucide-react'
import { HILLTIP_SNOWPLOWS, getHilltipAnfrageMailto } from '@/lib/hilltip-catalog'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

interface Props {
  brandName: string
  brandSlug: string
  centerName: string
  centerSlug: string
  centerColor: string
}

export default function HilltipSnowplowsDetail({
  brandName,
  brandSlug,
  centerName,
  centerSlug,
  centerColor,
}: Props) {
  const mailtoHref =
    getHilltipAnfrageMailto('hilltip-schneepfluege', 'Schneepflüge') ??
    'mailto:michael.peter@ernst-moser.ch'

  return (
    <section className="hilltip-detail-section">
      <div className="hilltip-detail-inner">
        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: 'var(--c-text-2)',
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/${centerSlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {centerName}
          </Link>
          <ChevronRight size={13} />
          <Link href={`/${centerSlug}/${brandSlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {brandName}
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--c-text)' }}>Schneepflüge</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: 36, maxWidth: 760 }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: centerColor,
              marginBottom: 12,
            }}
          >
            Hilltip Winterdienst
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading, Arial, sans-serif)',
              fontSize: 'clamp(30px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '0 0 16px',
              color: 'var(--c-text)',
            }}
          >
            SnowStriker™ Schneepflüge
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--c-text-2)', margin: 0 }}>
            Gerade Schneeschilder, V-Pflüge und ausfahrbare Teleskop-Schilder für Pickups, UTV,
            Traktoren und LKW – jedes Modell in mehreren Arbeitsbreiten erhältlich. Beratung,
            Montage und Service durch die Ernst Moser GmbH.
          </p>
        </motion.div>

        {/* Produkt-Grid */}
        <div className="hilltip-plow-grid">
          {HILLTIP_SNOWPLOWS.map((p, i) => (
            <motion.a
              key={p.model}
              href={p.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hilltip-plow-card"
              style={{ ['--accent' as string]: centerColor }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4), ease: EASE }}
            >
              <div className="hilltip-plow-img">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="hilltip-plow-img-el"
                />
                <span className="hilltip-plow-badge" style={{ background: centerColor }}>
                  {p.sizes}
                </span>
              </div>
              <div className="hilltip-plow-body">
                <h3 className="hilltip-plow-name">{p.name}</h3>
                <div className="hilltip-plow-model">{p.model}</div>
                <span className="hilltip-plow-link" style={{ color: centerColor }}>
                  Zur Produktseite
                  <ExternalLink size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 40,
            paddingTop: 28,
            borderTop: '1px solid var(--c-border)',
          }}
        >
          <a
            href={mailtoHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '13px 26px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              color: '#fff',
              background: centerColor,
              whiteSpace: 'nowrap',
            }}
          >
            <Send size={15} />
            Schneepflug anfragen
          </a>
          <a
            href="https://www.hilltip.com/de/produkte/schneepflug/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '12px 24px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              color: centerColor,
              background: 'transparent',
              border: `1.5px solid ${centerColor}`,
              whiteSpace: 'nowrap',
            }}
          >
            Alle Schneepflüge bei Hilltip
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
