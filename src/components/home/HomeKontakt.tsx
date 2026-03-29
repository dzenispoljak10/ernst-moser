'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const HOURS = [
  { day: 'Montag – Freitag', time: '07:00 – 12:00 / 13:15 – 17:30' },
  { day: 'Samstag', time: '07:00 – 12:00' },
  { day: 'Sonntag & Feiertage', time: 'Geschlossen' },
]

export default function HomeKontakt() {
  return (
    <section className="section home-kontakt-section">
      <div className="container">
        <motion.div
          className="section-header"
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div>
            <div className="section-divider" style={{ background: '#1B2D5B' }} />
            <div className="section-label">Kontakt & Standort</div>
            <h2 className="section-title">Besuchen Sie uns<br />in Gerlafingen</h2>
          </div>
          <p className="home-kontakt-intro">
            Wir freuen uns auf Ihren Besuch –<br />
            oder nehmen Sie einfach Kontakt auf.
          </p>
        </motion.div>

        <div className="home-kontakt-grid">

          {/* ── Google Maps ── */}
          <motion.div
            className="home-kontakt-map-wrap"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Derendingenstrasse+25,+4563+Gerlafingen,+Switzerland&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Ernst Moser GmbH – Standort Gerlafingen"
              className="home-kontakt-map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* ── Contact info ── */}
          <motion.div
            className="home-kontakt-info"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          >
            <div className="home-kontakt-rows">
              <div className="home-kontakt-row">
                <div className="home-kontakt-icon"><MapPin size={18} /></div>
                <div>
                  <div className="home-kontakt-lbl">Adresse</div>
                  <div className="home-kontakt-val">
                    Derendingenstrasse 25<br />4563 Gerlafingen SO
                  </div>
                </div>
              </div>

              <div className="home-kontakt-row">
                <div className="home-kontakt-icon"><Phone size={18} /></div>
                <div>
                  <div className="home-kontakt-lbl">Telefon</div>
                  <a href="tel:+41326755805" className="home-kontakt-val home-kontakt-link">
                    +41&nbsp;(0)32&nbsp;675&nbsp;58&nbsp;05
                  </a>
                </div>
              </div>

              <div className="home-kontakt-row">
                <div className="home-kontakt-icon home-kontakt-icon--red">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <div className="home-kontakt-lbl">Notfallnummer</div>
                  <a href="tel:+41794856645" className="home-kontakt-val home-kontakt-link">
                    +41&nbsp;(0)79&nbsp;485&nbsp;66&nbsp;45
                  </a>
                </div>
              </div>

              <div className="home-kontakt-row">
                <div className="home-kontakt-icon"><Mail size={18} /></div>
                <div>
                  <div className="home-kontakt-lbl">E-Mail</div>
                  <a href="mailto:info@ernst-moser.ch" className="home-kontakt-val home-kontakt-link">
                    info@ernst-moser.ch
                  </a>
                </div>
              </div>
            </div>

            {/* Opening hours */}
            <div className="home-kontakt-hours">
              <div className="home-kontakt-hours-head">
                <Clock size={14} />
                Öffnungszeiten
              </div>
              <div className="home-kontakt-hours-list">
                {HOURS.map((h) => (
                  <div key={h.day} className="home-kontakt-hours-row">
                    <span className="home-kontakt-hours-day">{h.day}</span>
                    <span className="home-kontakt-hours-time">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="home-kontakt-btns">
              <a href="tel:+41326755805" className="home-kontakt-btn-primary">
                <Phone size={14} />
                Jetzt anrufen
              </a>
              <a href="mailto:info@ernst-moser.ch" className="home-kontakt-btn-ghost">
                <Mail size={14} />
                E-Mail senden
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
