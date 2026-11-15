import CenterPageContent from '@/components/pages/CenterPageContent'
import type { Metadata } from 'next'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kommunalcenter',
  description: 'Kommunalfahrzeuge und Maschinen für Gemeinden und Profis – Ernst Moser GmbH.',
}

export default function KommunalcenterPage() {
  return <CenterPageContent centerSlug="kommunalcenter" />
}
