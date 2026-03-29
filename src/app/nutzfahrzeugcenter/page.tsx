import CenterPageContent from '@/components/pages/CenterPageContent'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Nutzfahrzeugcenter',
  description: 'Nutzfahrzeuge, Anhänger, Wohnmobile und mehr – Ihr Nutzfahrzeugcenter bei Ernst Moser GmbH.',
}

export default function NutzfahrzeugcenterPage() {
  return <CenterPageContent centerSlug="nutzfahrzeugcenter" />
}
