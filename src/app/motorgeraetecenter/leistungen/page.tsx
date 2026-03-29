import LeistungenPageContent from '@/components/pages/LeistungenPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leistungen – Motorgerätecenter',
  description: 'Elektrogeräte, Roboter, Reparatur, Kaufberatung – Motorgerätecenter Ernst Moser GmbH, Gerlafingen.',
}

export default function MotorgeraeteLeistungenPage() {
  return <LeistungenPageContent centerSlug="motorgeraetecenter" />
}
