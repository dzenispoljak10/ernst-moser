interface Props {
  accent: string
}

/**
 * Isuzu-Werbevideo (Truck-Spot) – startet automatisch, stummgeschaltet und
 * in Schleife (Browser erlauben Autoplay nur muted). Steuerung bleibt
 * sichtbar, damit Besucher den Ton aktivieren oder pausieren können.
 * Quelle: Sanity-CDN (web-optimiert, 1080p) – aus /public ausgelagert,
 * damit das Vercel-Deployment schlank bleibt.
 */
const ISUZU_VIDEO_URL = 'https://cdn.sanity.io/files/owqsc1ph/production/a4d27e6dfb117d91911885a762375348c11b2f30.mp4'
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
              autoPlay
              muted
              loop
              controls
              preload="auto"
              playsInline
              poster="/images/isuzu/hero-isuzu-truck.webp"
            >
              <source src={ISUZU_VIDEO_URL} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
