import CenterPageContent from '@/components/pages/CenterPageContent'
import type { Metadata } from 'next'

// Seiten werden bei jeder Admin-Speicherung sofort neu aufgebaut (revalidatePath).
// Zeitbasiert nur 1x täglich, um Sanity-API-Anfragen zu sparen.
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Motorgerätecenter',
  description: 'Rasenmäher, Roboter, Stihl, Makita und mehr – Ihr Motorgerätecenter bei Ernst Moser GmbH.',
}

export default function MotorgeraetecenterPage() {
  return <CenterPageContent centerSlug="motorgeraetecenter" />
}
