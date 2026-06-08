interface Props {
  accent: string
}

/**
 * Lokales Isuzu-Werbevideo (Truck-Spot) – click-to-play mit Steuerung.
 * Quelle: public/video/isuzu-trucks.mp4 (web-optimiert, 1080p).
 */
export default function IsuzuVideoSection({ accent }: Props) {
  return (
    <section className="brand-video-section">
      <div className="container">
        <div className="brand-video-header">
          <div className="brand-video-eyebrow" style={{ color: accent }}>Markenwelt</div>
          <h2 className="brand-video-heading">Die neue Isuzu Truck-Generation</h2>
          <p className="brand-video-caption">Robust, effizient und vielseitig — Isuzu Trucks im Bewegtbild.</p>
        </div>

        <div className="brand-video-frame" style={{ borderColor: `${accent}33` }}>
          <div className="brand-video-aspect">
            <video
              className="brand-video-iframe"
              controls
              preload="none"
              playsInline
              poster="/images/isuzu/hero-isuzu-truck.webp"
            >
              <source src="/video/isuzu-trucks.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
