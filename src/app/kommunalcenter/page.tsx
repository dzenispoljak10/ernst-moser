import CenterPageContent from '@/components/pages/CenterPageContent'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kommunalcenter',
  description: 'Kommunalfahrzeuge und Maschinen für Gemeinden und Profis – Ernst Moser GmbH.',
}

export default function KommunalcenterPage() {
  return <CenterPageContent centerSlug="kommunalcenter" />
}
