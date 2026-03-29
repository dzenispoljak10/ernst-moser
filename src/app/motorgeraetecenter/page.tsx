import CenterPageContent from '@/components/pages/CenterPageContent'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Motorgerätecenter',
  description: 'Rasenmäher, Roboter, Stihl, Makita und mehr – Ihr Motorgerätecenter bei Ernst Moser GmbH.',
}

export default function MotorgeraetecenterPage() {
  return <CenterPageContent centerSlug="motorgeraetecenter" />
}
