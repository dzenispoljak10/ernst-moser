import { NextResponse } from 'next/server'
import { readClient, imageUrl } from '@/lib/sanity'

// Öffentlich (keine Auth): liefert aktive Pop-ups; der Client entscheidet über
// Ziel/Timing/Häufigkeit. Ohne aktives Pop-up ist die Antwort leer.
export const revalidate = 30

interface PopupDoc {
  _id: string
  _rev: string
  heading?: string
  body?: string
  image?: { asset: { _ref: string } }
  ctaLabel?: string
  ctaUrl?: string
  target?: string
  delaySeconds?: number
  autoCloseSeconds?: number
  reappearDays?: number
}

export async function GET() {
  try {
    const docs = await readClient.fetch<PopupDoc[]>(
      `*[_type == "popup" && isActive == true] | order(order asc, _createdAt desc) {
        _id, _rev, heading, body, image, ctaLabel, ctaUrl, target, delaySeconds, autoCloseSeconds, reappearDays
      }`
    )
    const result = docs.map((p) => ({
      id: p._id,
      rev: p._rev,
      heading: p.heading ?? '',
      body: p.body ?? '',
      imageUrl: p.image ? imageUrl(p.image) : null,
      ctaLabel: p.ctaLabel ?? '',
      ctaUrl: p.ctaUrl ?? '',
      target: p.target ?? 'all',
      delaySeconds: typeof p.delaySeconds === 'number' ? p.delaySeconds : 3,
      autoCloseSeconds: typeof p.autoCloseSeconds === 'number' ? p.autoCloseSeconds : 0,
      reappearDays: typeof p.reappearDays === 'number' ? p.reappearDays : 30,
    }))
    return NextResponse.json(result)
  } catch {
    return NextResponse.json([])
  }
}
