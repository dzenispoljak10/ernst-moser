import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import RabattForm, { type RabattData } from '../RabattForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditRabattPage({ params }: Props) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const { prisma } = await import('@/lib/prisma')
  const row = await prisma.rabattaktion.findUnique({ where: { id } }).catch(() => null)
  if (!row) notFound()

  const initial: RabattData = {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    imageUrl: row.imageUrl,
    linkUrl: row.linkUrl,
    priceLabel: row.priceLabel,
    badgeLabel: row.badgeLabel,
    description: row.description,
    order: row.order,
    isActive: row.isActive,
  }

  return (
    <PageWrapper>
      <RabattForm mode="edit" initial={initial} />
    </PageWrapper>
  )
}
