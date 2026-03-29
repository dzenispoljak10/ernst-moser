import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import BrandsClient from './BrandsClient'

interface Brand {
  id: string
  name: string
  slug: string
  centerSlug: string
  logoUrl: string | null
  description: string | null
  isActive: boolean
  order: number
}

async function getBrands(): Promise<Brand[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    return prisma.brand.findMany({ orderBy: [{ centerSlug: 'asc' }, { order: 'asc' }, { name: 'asc' }] })
  } catch {
    return []
  }
}

export default async function BrandsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const brands = await getBrands()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <BrandsClient brands={brands} />
      </div>
    </PageWrapper>
  )
}
