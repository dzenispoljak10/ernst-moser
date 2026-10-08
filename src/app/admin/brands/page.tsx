import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import BrandsClient from './BrandsClient'
import { client, imageUrl } from '@/lib/sanity'
import { isBrandDisabled } from '@/lib/brand-flags'

export const dynamic = 'force-dynamic'

interface Brand {
  id: string
  name: string
  slug: string
  centerSlug: string
  logoUrl: string | null
  isActive: boolean
}

// Quelle ist Sanity – exakt die Marken, die auch auf der Website erscheinen.
async function getBrands(): Promise<{ brands: Brand[]; failed: boolean }> {
  try {
    const rows = await client.fetch<
      Array<{ _id: string; name: string; slug?: string; centerSlug?: string; logo?: { asset?: { _ref: string } } }>
    >(
      `*[_type == "brand" && !(_id in path("drafts.**"))] | order(name asc) {
        _id, name, "slug": slug.current, "centerSlug": center->slug.current, logo
      }`
    )
    const centerRank: Record<string, number> = { nutzfahrzeugcenter: 0, kommunalcenter: 1, motorgeraetecenter: 2 }
    return {
      failed: false,
      brands: rows
        .map((r) => ({
          id: r._id,
          name: r.name,
          slug: r.slug ?? '',
          centerSlug: r.centerSlug ?? '',
          logoUrl: r.logo?.asset ? imageUrl(r.logo) || null : null,
          isActive: !isBrandDisabled(r.slug ?? ''),
        }))
        .sort((a, b) => (centerRank[a.centerSlug] ?? 9) - (centerRank[b.centerSlug] ?? 9) || a.name.localeCompare(b.name, 'de')),
    }
  } catch (err) {
    console.error('Admin brand list failed:', err)
    return { brands: [], failed: true }
  }
}

export default async function BrandsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { brands, failed } = await getBrands()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        {failed ? (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-[13px] text-red-500">
            Marken konnten nicht geladen werden. Bitte Seite neu laden.
          </div>
        ) : (
          <BrandsClient brands={brands} />
        )}
      </div>
    </PageWrapper>
  )
}
