'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  url: string
  alt?: string
  caption?: string
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const open  = (i: number) => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const prev  = () => setLightboxIdx(i => (i !== null ? (i - 1 + images.length) % images.length : null))
  const next  = () => setLightboxIdx(i => (i !== null ? (i + 1) % images.length : null))

  if (!images.length) return null

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className={`gallery-item${i === 0 ? ' gallery-item--featured' : ''}`}
            onClick={() => open(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.07, 0.42), ease: EASE }}
          >
            <Image
              src={img.url}
              alt={img.alt ?? ''}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="gallery-item-hover">
              <div className="gallery-zoom-icon">
                <ZoomIn size={22} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <img src={images[lightboxIdx].url} alt={images[lightboxIdx].alt ?? ''} />
            </motion.div>

            <button className="lightbox-close" onClick={close} aria-label="Schliessen">
              <X size={20} />
            </button>

            {images.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Vorheriges Bild">
                  <ChevronLeft size={22} />
                </button>
                <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Nächstes Bild">
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {images[lightboxIdx].caption && (
              <div className="lightbox-caption">{images[lightboxIdx].caption}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
