'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } }
  }
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const POSTS = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
  'https://www.instagram.com/p/DUoZ8NFD-Hs/',
]

export default function InstagramSection() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

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
        <div className="ig2-embed-grid">
          {POSTS.map((url) => (
            <div key={url} className="ig2-embed-wrap">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                data-instgrm-captioned
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: 12,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  margin: 0,
                  maxWidth: '100%',
                  minWidth: 0,
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>
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
