import MietenPageContent from '@/components/pages/MietenPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mietgeräte – Kommunalcenter',
  description: 'Mäher, Mulcher, Kommunalfahrzeuge und Winterdienst-Equipment mieten – Kommunalcenter Ernst Moser GmbH.',
}

export default function KommunalMietenPage() {
  return <MietenPageContent centerSlug="kommunalcenter" />
}
