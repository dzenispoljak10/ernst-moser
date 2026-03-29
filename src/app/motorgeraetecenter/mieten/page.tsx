import MietenPageContent from '@/components/pages/MietenPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mietgeräte – Motorgerätecenter',
  description: 'Reinigungsgeräte, Mähroboter, Gartentechnik mieten – Motorgerätecenter Ernst Moser GmbH.',
}

export default function MotorgeraeteMietenPage() {
  return <MietenPageContent centerSlug="motorgeraetecenter" />
}
