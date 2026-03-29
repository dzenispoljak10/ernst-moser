import LeistungenPageContent from '@/components/pages/LeistungenPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leistungen – Kommunalcenter',
  description: 'Maschinen, Service, Kaufberatung und Mietgeräte – Kommunalcenter Ernst Moser GmbH, Gerlafingen.',
}

export default function KommunalLeistungenPage() {
  return <LeistungenPageContent centerSlug="kommunalcenter" />
}
