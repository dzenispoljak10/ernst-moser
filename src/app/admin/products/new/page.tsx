import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { readClient } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import ProductForm, { BrandOption } from '../ProductForm'

export const dynamic = 'force-dynamic'

async function getBrandOptions(): Promise<BrandOption[]> {
  try {
    const brands = await readClient.fetch<Array<{ _id: string; name: string; center?: string }>>(
      `*[_type == "brand"] | order(name asc){ _id, name, "center": center->name }`
    )
    return brands.map((b) => ({ value: b._id, label: b.center ? `${b.name} — ${b.center}` : b.name }))
  } catch {
    return []
  }
}

export default async function NewProductPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const brands = await getBrandOptions()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <div className="mb-5">
          <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-[20px] font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
            Neues Produkt
          </h1>
          <ProductForm brands={brands} />
        </div>
      </div>
    </PageWrapper>
  )
}
