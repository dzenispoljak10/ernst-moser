import {
  Truck, Package, Zap, Gauge, Settings, Wrench, Snowflake, Wind, Mountain,
  Leaf, Sparkles, Recycle, Droplets, Hammer, Building2, Trees, Users, Ruler,
  Battery, Cpu, Radar, ShieldCheck, Award, Globe, Factory, Coffee, Hotel,
  ShoppingCart, Bot, MapPin, Timer, Volume2, Sun, Moon, CloudRain, Wifi,
  type LucideIcon,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { ExtraSection, IconName, ProductExtras } from '@/lib/product-extras'

const ICONS: Record<IconName, LucideIcon> = {
  Truck, Package, Zap, Gauge, Settings, Wrench, Snowflake, Wind, Mountain,
  Leaf, Sparkles, Recycle, Droplets, Hammer, Building2, Trees, Users, Ruler,
  Battery, Cpu, Radar, ShieldCheck, Award, Globe, Factory, Coffee, Hotel,
  ShoppingCart, Bot, MapPin, Timer, Volume2, Sun, Moon, CloudRain, Wifi,
}

interface Props {
  extras: ProductExtras
  brandName: string
  productName: string
  centerColor: string
}

export default function ProductExtraSections({
  extras,
  brandName,
  productName,
  centerColor,
}: Props) {
  return (
    <>
      {extras.sections.map((section, idx) => (
        <SectionRenderer
          key={`${section.type}-${idx}`}
          section={section}
          centerColor={centerColor}
          alt={idx % 2 === 1}
        />
      ))}
      {extras.video && (
        <VideoBlock
          video={extras.video}
          brandName={brandName}
          productName={productName}
          centerColor={centerColor}
        />
      )}
    </>
  )
}

function SectionRenderer({
  section,
  centerColor,
  alt,
}: {
  section: ExtraSection
  centerColor: string
  alt: boolean
}) {
  const bg = alt ? 'var(--c-bg-2)' : 'var(--c-bg)'
  const accentAlpha = `${centerColor}1a`

  return (
    <section className="product-extra-section" style={{ background: bg }}>
      <div className="container">
        <AnimatedSection className="section-header" style={{ marginBottom: 36 }}>
          <div>
            <div className="section-divider" style={{ background: centerColor }} />
            <div className="section-label">{section.eyebrow}</div>
            <h2 className="section-title">{section.heading}</h2>
            {section.intro && (
              <p
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: 'var(--c-text-2)',
                  maxWidth: 760,
                }}
              >
                {section.intro}
              </p>
            )}
          </div>
        </AnimatedSection>

        {section.type === 'applications' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {section.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Package
              return (
                <AnimatedSection key={item.label} delay={i * 0.06}>
                  <div
                    style={{
                      background: 'var(--c-bg)',
                      border: '1.5px solid var(--c-border)',
                      borderRadius: 14,
                      padding: 24,
                      height: '100%',
                      transition: 'transform var(--tr), box-shadow var(--tr), border-color var(--tr)',
                    }}
                    className="product-extra-card"
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: accentAlpha,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 14,
                      }}
                    >
                      <Icon size={22} color={centerColor} />
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading, inherit)',
                        fontSize: 16,
                        fontWeight: 700,
                        marginBottom: 6,
                        color: 'var(--c-text)',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--c-text-2)' }}>
                      {item.text}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        )}

        {section.type === 'highlights' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {section.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Sparkles
              return (
                <AnimatedSection key={item.title} delay={i * 0.06}>
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 14,
                      padding: 28,
                      height: '100%',
                      borderTop: `3px solid ${centerColor}`,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                      transition: 'transform var(--tr), box-shadow var(--tr)',
                    }}
                    className="product-extra-card"
                  >
                    <Icon size={26} color={centerColor} style={{ marginBottom: 14 }} />
                    <div
                      style={{
                        fontFamily: 'var(--font-heading, inherit)',
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 8,
                        letterSpacing: '-0.01em',
                        color: 'var(--c-text)',
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--c-text-2)' }}>
                      {item.body}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        )}

        {section.type === 'techDetail' && (
          <AnimatedSection delay={0.05}>
            <div
              style={{
                background: 'var(--c-bg)',
                border: '1.5px solid var(--c-border)',
                borderRadius: 14,
                overflow: 'hidden',
                maxWidth: 880,
                margin: '0 auto',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr
                      key={row.label}
                      style={{
                        background: i % 2 === 1 ? 'var(--c-bg-2)' : 'var(--c-bg)',
                        borderBottom:
                          i < section.rows.length - 1 ? '1px solid var(--c-border)' : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '14px 22px',
                          color: 'var(--c-text-muted)',
                          fontWeight: 500,
                          width: '45%',
                        }}
                      >
                        {row.label}
                      </td>
                      <td
                        style={{
                          padding: '14px 22px',
                          color: 'var(--c-text)',
                          fontWeight: 700,
                          textAlign: 'right',
                        }}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

function VideoBlock({
  video,
  brandName,
  productName,
  centerColor,
}: {
  video: NonNullable<ProductExtras['video']>
  brandName: string
  productName: string
  centerColor: string
}) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: video.youtubeId,
    controls: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
  })
  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params.toString()}`

  return (
    <section className="product-extra-section" style={{ background: 'var(--c-bg)' }}>
      <div className="container">
        <AnimatedSection className="section-header" style={{ marginBottom: 28 }}>
          <div>
            <div className="section-divider" style={{ background: centerColor }} />
            <div className="section-label">Im Bewegtbild</div>
            <h2 className="section-title">
              {video.title ?? `${brandName} ${productName}`}
            </h2>
            {video.caption && (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--c-text-2)',
                  maxWidth: 720,
                }}
              >
                {video.caption}
              </p>
            )}
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <div
            style={{
              borderRadius: 18,
              overflow: 'hidden',
              background: '#000',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
              border: `1px solid ${centerColor}33`,
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              <iframe
                src={src}
                title={video.title ?? `${brandName} ${productName} Video`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
