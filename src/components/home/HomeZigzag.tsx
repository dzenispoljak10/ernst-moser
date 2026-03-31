'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Award, Wrench, Package } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const ITEMS = [
  {
    icon: MapPin,
    color: '#1B2D5B',
    tag: 'Lokaler Partner',
    title: 'Fest verwurzelt in der Region Solothurn',
    text: 'Als regional verwurzeltes Unternehmen kennen wir die Anforderungen unserer Kunden aus der Region Solothurn und dem Mittelland genau. Kurze Wege, schnelle Reaktion – persönlich, lokal und zuverlässig.',
    image: '/images/unsplash/truck-1.jpg',
    imageAlt: 'LKW Fleet – regionaler Partner',
  },
  {
    icon: Award,
    color: '#4A7C59',
    tag: 'Fachkompetenz',
    title: 'Zertifizierte Techniker & Markenwissen',
    text: 'Unsere Techniker sind herstellerzertifiziert und bilden sich laufend weiter. Ob Scania-Truck, Kubota-Kommunalfahrzeug oder Stihl-Motorsäge – wir beherrschen das Handwerk mit Leidenschaft.',
    image: '/images/unsplash/workshop-mechanic.jpg',
    imageAlt: 'Werkstatt Mechaniker Fachkompetenz',
  },
  {
    icon: Wrench,
    color: '#C0392B',
    tag: 'Service & Unterhalt',
    title: 'Schneller Service, minimale Ausfallzeiten',
    text: 'Unsere Werkstatt mit modernster Ausrüstung und ein grosses Ersatzteillager für alle Marken garantieren schnelle Reparaturen und planmässigen Unterhalt. Damit Ihre Fahrzeuge und Geräte laufen – immer.',
    image: '/images/unsplash/machinery.jpg',
    imageAlt: 'Werkstatt Service Reparatur',
  },
  {
    icon: Package,
    color: '#1B2D5B',
    tag: 'Breites Sortiment',
    title: 'Über 30 Marken – alles unter einem Dach',
    text: 'Von Lastwagen bis zum Mähroboter, von Kommunalfahrzeugen bis zu Motorgeräten: Unser breites Sortiment führender Marken deckt alle Bedürfnisse von Gewerbe, Kommunen und Privatanwendern ab.',
    image: '/images/unsplash/vehicles.jpg',
    imageAlt: 'Showroom Fahrzeuge Sortiment',
  },
]

export default function HomeZigzag() {
  return (
    <section className="section home-zigzag-section">
      <div className="container">
        <motion.div
          className="section-header"
          style={{ marginBottom: 64 }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div>
            <div className="section-divider" style={{ background: '#C0392B' }} />
            <div className="section-label">Warum Ernst Moser</div>
            <h2 className="section-title">Vier gute Gründe,<br />uns zu wählen</h2>
          </div>
        </motion.div>

        <div className="home-zigzag-list">
          {ITEMS.map((item, i) => {
            const Icon = item.icon
            const isEven = i % 2 === 0
            return (
              <div key={item.title} className={`home-zigzag-row${isEven ? '' : ' home-zigzag-row--rev'}`}>

                <motion.div
                  className="home-zigzag-img-wrap"
                  initial={{ opacity: 0, x: isEven ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="home-zigzag-img-tint" style={{ background: `${item.color}33` }} />
                </motion.div>

                <motion.div
                  className="home-zigzag-content"
                  initial={{ opacity: 0, x: isEven ? 36 : -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                >
                  <div
                    className="home-zigzag-tag"
                    style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={12} strokeWidth={2.5} />
                    {item.tag}
                  </div>
                  <h3 className="home-zigzag-title">{item.title}</h3>
                  <p className="home-zigzag-text">{item.text}</p>
                  <div className="home-zigzag-accent-line" style={{ background: item.color }} />
                </motion.div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
