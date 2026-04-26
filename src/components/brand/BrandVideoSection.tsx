import type { BrandVideo } from '@/lib/brand-videos'

interface Props {
  video: BrandVideo
  brandName: string
  accent: string
}

/**
 * Eingebettetes YouTube-Werbevideo unter dem Karussell. Autoplay, muted,
 * loop, ohne Steuerung — rein visueller Akzent. Auf YouTube benötigt
 * loop=1 zwingend playlist=<id> als Trick, sonst läuft das Video nur
 * einmal ab.
 */
export default function BrandVideoSection({ video, brandName, accent }: Props) {
  const { youtubeId, eyebrow, heading, caption } = video
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: youtubeId,
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    disablekb: '1',
  })
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`

  return (
    <section className="brand-video-section">
      <div className="container">
        <div className="brand-video-header">
          <div className="brand-video-eyebrow" style={{ color: accent }}>
            {eyebrow ?? 'Markenwelt'}
          </div>
          <h2 className="brand-video-heading">
            {heading ?? `${brandName} im Bewegtbild`}
          </h2>
          {caption && <p className="brand-video-caption">{caption}</p>}
        </div>

        <div
          className="brand-video-frame"
          style={{ borderColor: `${accent}33` }}
        >
          <div className="brand-video-aspect">
            <iframe
              src={src}
              title={`${brandName} Video`}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="brand-video-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
