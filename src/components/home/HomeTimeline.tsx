'use client'

import { motion } from 'framer-motion'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const MILESTONES = [
  { year: '1976', text: 'Ernst Moser gründet das Unternehmen in Biberist. Erste Partnerschaft mit Kubota für Kommunalgeräte.' },
  { year: '1992', text: 'Umzug an den heutigen Standort an der Derendingenstrasse 25 in Gerlafingen SO.' },
  { year: '1993', text: 'Stefan Moser tritt als Partner in das Familienunternehmen ein.' },
  { year: '1996', text: 'Beginn der Scania-Vertragspartnerschaft – bis heute eine tragende Säule des Nutzfahrzeugcenters.' },
  { year: '2000', text: 'Reform wird als neuer Markenpartner für Kommunalgeräte aufgenommen.' },
  { year: '2005', text: 'Isuzu ergänzt das Portfolio als offizieller Vertragspartner.' },
  { year: '2016', text: 'Neues Gebäude mit dedizierter Scania-Werkstatt. Das Unternehmen feiert stolze 40 Jahre.' },
  { year: '2018', text: 'Ernst Moser übergibt das Unternehmen an seine Söhne Stefan und Adrian Moser.' },
  { year: '2021', text: 'Adrian Moser übernimmt als alleiniger Inhaber. 45 Jahre Erfolgsgeschichte – und die Reise geht weiter.' },
]

export default function HomeTimeline() {
  return (
    <section className="home-timeline-section">
      <div className="home-timeline-bg-deco" />
      <div className="container">

        <motion.div
          className="home-timeline-header"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="home-timeline-eyebrow">Geschichte</div>
          <h2 className="home-timeline-title">45 Jahre<br />Erfolgsgeschichte</h2>
          <p className="home-timeline-sub">
            Von der kleinen Garage in Biberist zum führenden Spezialisten der Region –
            eine Familiengeschichte voller Leidenschaft.
          </p>
        </motion.div>

        <div className="home-timeline-track">
          <div className="home-timeline-spine" />

          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              className={`home-timeline-item${i % 2 === 1 ? ' home-timeline-item--alt' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
            >
              <div className="home-timeline-dot">
                <div className="home-timeline-dot-inner" />
              </div>
              <div className="home-timeline-card">
                <div className="home-timeline-year">{m.year}</div>
                <p className="home-timeline-text">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
