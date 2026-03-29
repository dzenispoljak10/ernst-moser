import LeistungenPageContent from '@/components/pages/LeistungenPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leistungen – Nutzfahrzeugcenter',
  description: 'Fahrzeugverkauf, Werkstatt, Service und Expressreparatur – Nutzfahrzeugcenter Ernst Moser GmbH, Gerlafingen.',
}

export default function NfzLeistungenPage() {
  return <LeistungenPageContent centerSlug="nutzfahrzeugcenter" />
}
