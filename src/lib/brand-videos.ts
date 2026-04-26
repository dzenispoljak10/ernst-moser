/**
 * Brand-Slug → offizielles YouTube-Werbevideo.
 *
 * Wird unter dem Karussell auf der Markenseite eingebettet (autoplay,
 * muted, loop, ohne Controls). Nur für Marken, die wirklich starkes
 * Bewegtbild-Material haben — Marken ohne Eintrag bekommen keinen
 * Video-Block.
 */

export interface BrandVideo {
  /** YouTube Video-ID (Teil nach v=) */
  youtubeId: string
  /** Optionaler Eyebrow oberhalb der Section (default: "Markenwelt") */
  eyebrow?: string
  /** Section-Heading (default: "{brand} im Bewegtbild") */
  heading?: string
  /** Optionale Bildunterschrift/Tagline */
  caption?: string
}

export const BRAND_VIDEOS: Record<string, BrandVideo> = {
  scania: {
    youtubeId: 'J-p_dK1h-iQ',
    heading: 'Scania – Driving the shift',
    caption: 'Solar-powered Scania: ein Blick auf die Zukunft des Schwerverkehrs.',
  },
  fiat: {
    youtubeId: 'pfCIqAG60pU',
    heading: 'Fiat Professional – The Ant',
    caption: 'Die Ameise als Sinnbild für Stärke und Ausdauer der Fiat Professional Flotte.',
  },
  piaggio: {
    youtubeId: 'J-vq0wKCHMw',
    heading: 'Piaggio Porter NP6 – Der CityTruck',
    caption: 'Die neue Generation des Porter NP6, vollständig neu konzipiert.',
  },
  isuzu: {
    youtubeId: 'yG04GnJ-oVM',
    heading: 'Isuzu D-Max – Built tough',
    caption: 'Robuste Pickup-Plattform für Gewerbe, Bau und Kommune.',
  },
  'pudu-robotics': {
    youtubeId: 'z-WcJTlnaP4',
    heading: 'Pudu BellaBot – Service-Robotik live',
    caption: 'Der BellaBot in seinem Element – charmant, präzise, zuverlässig.',
  },
  segway: {
    youtubeId: 'GzHaG_UUIjM',
    heading: 'Segway Navimow – Das ist Mährobotik',
    caption: 'Drahtfrei, RTK-präzise, leise – die nächste Generation Mähroboter.',
  },
  stihl: {
    youtubeId: '4qi5G3cnZtI',
    heading: 'Stihl – Cleaning power',
    caption: 'Der TV-Spot für die Stihl-Akku- und Reinigungsfamilie.',
  },
  kubota: {
    youtubeId: 'ohWqM8G0Fys',
    heading: 'Kubota – We are Kubota',
    caption: 'Die Brand-Story eines globalen Herstellers für Land- und Kommunaltechnik.',
  },
  hako: {
    youtubeId: 'TE5N19BK3eo',
    heading: 'Hako Citymaster 1650 – Im Einsatz',
    caption: 'Multifunktionale Saugkehrmaschine für die professionelle Stadtreinigung.',
  },
  ambrogio: {
    youtubeId: 'XBegt3bjPfI',
    heading: 'Ambrogio AI – Smart Mowing',
    caption: 'Die neue KI-Generation italienischer Mähroboter.',
  },
  stiga: {
    youtubeId: 'ujUNX5hOUNk',
    heading: 'Stiga Estate 798e – Voll elektrisch',
    caption: 'Aufsitzmäher der Zukunft: leise, emissionsfrei, kraftvoll.',
  },
  alk: {
    youtubeId: 'ObfN5N54SbI',
    heading: 'Alkè ATX4 – Goodbye traditional vans',
    caption: 'Vollelektrische Profi-Nutzfahrzeuge für Industrie und Kommune.',
  },
}

export function getBrandVideo(slug: string): BrandVideo | null {
  return BRAND_VIDEOS[slug] ?? null
}
