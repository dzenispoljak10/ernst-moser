import Image from 'next/image'

const POSTS = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
]

function InstagramIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

interface PostData {
  url: string
  thumbnail: string | null
}

async function fetchPosts(): Promise<PostData[]> {
  const results = await Promise.all(
    POSTS.map(async (url) => {
      try {
        const res = await fetch(
          `https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`,
          { next: { revalidate: 3600 } }
        )
        if (!res.ok) return { url, thumbnail: null }
        const data = await res.json()
        return { url, thumbnail: (data.thumbnail_url as string) ?? null }
      } catch {
        return { url, thumbnail: null }
      }
    })
  )
  return results
}

export default async function InstagramSection() {
  const posts = await fetchPosts()

  return (
    <section className="ig2-section">
      <div className="container">

        {/* Header */}
        <div className="ig2-header">
          <div>
            <div className="ig2-label">Social Media</div>
            <h2 className="ig2-title">Folgen Sie uns auf Instagram</h2>
          </div>
          <a
            href="https://www.instagram.com/e.moser_gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="ig2-handle"
          >
            <InstagramIcon size={16} />
            @e.moser_gmbh
          </a>
        </div>

        {/* Grid */}
        <div className="ig2-grid">
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig2-card"
              aria-label="Instagram Post ansehen"
            >
              {post.thumbnail ? (
                <Image
                  src={post.thumbnail}
                  alt="Instagram Post"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 16vw"
                  unoptimized
                />
              ) : (
                <div className="ig2-fallback">
                  <InstagramIcon size={36} />
                </div>
              )}
              <div className="ig2-overlay">
                <InstagramIcon size={32} />
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="ig2-cta-wrap">
          <a
            href="https://www.instagram.com/e.moser_gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="ig2-cta"
          >
            Alle Posts auf Instagram ansehen →
          </a>
        </div>

      </div>
    </section>
  )
}
