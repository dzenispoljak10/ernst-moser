import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import RabattaktionenClient from './RabattaktionenClient'

interface Rabatt {
  id: string
  title: string
  subtitle: string | null
  imageUrl: string | null
  linkUrl: string | null
  priceLabel: string | null
  badgeLabel: string | null
  description: string | null
  order: number
  isActive: boolean
}

async function getRabatts(): Promise<Rabatt[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.rabattaktion.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}

export default async function RabattaktionenAdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const rabatts = await getRabatts()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <RabattaktionenClient rabatts={rabatts} />
      </div>
    </PageWrapper>
  )
}
