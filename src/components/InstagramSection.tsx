'use client'

import { useEffect } from 'react'
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } }
  }
}

const POSTS = [
  'https://www.instagram.com/p/DWgIPgbkckl/',
  'https://www.instagram.com/p/DWZQzSkDkqX/',
  'https://www.instagram.com/p/DWJEZEvDsj3/',
  'https://www.instagram.com/p/DVeS8AVDB4m/',
  'https://www.instagram.com/p/DT231QylW0E/',
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
    <section className="ig-section">
      <div className="container">
        <div className="ig-header">
          <div>
            <div className="section-divider" style={{ background: '#E1306C' }} />
            <div className="section-label">Social Media</div>
            <h2 className="section-title">Folgen Sie uns auf Instagram</h2>
          </div>
          <a
            href="https://www.instagram.com/e.moser_gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-handle-link"
          >
            <InstagramIcon />
            <span>@e.moser_gmbh</span>
          </a>
        </div>

        <div className="ig-scroll-wrapper">
          <div className="ig-grid">
            {POSTS.map((url) => (
              <div key={url} className="ig-post-wrap">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: 12,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    margin: 0,
                    maxWidth: '100%',
                    minWidth: 280,
                    padding: 0,
                    width: '100%',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
