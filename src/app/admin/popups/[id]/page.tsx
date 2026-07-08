import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { readClient, imageUrl } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import PopupForm, { PopupFormData } from '../PopupForm'

export const dynamic = 'force-dynamic'

interface PopupDoc {
  _id: string
  title: string
  heading?: string
  body?: string
  image?: { asset: { _ref: string } }
  ctaLabel?: string
  ctaUrl?: string
  target?: string
  delaySeconds?: number
  autoCloseSeconds?: number
  reappearDays?: number
  isActive?: boolean
  order?: number
}

async function getPopup(id: string): Promise<Partial<PopupFormData> | null> {
  try {
    const p = await readClient.fetch<PopupDoc | null>(
      `*[_type == "popup" && _id == $id][0]{
        _id, title, heading, body, image, ctaLabel, ctaUrl, target, delaySeconds, autoCloseSeconds, reappearDays, isActive, order
      }`,
      { id }
    )
    if (!p) return null
    return {
      title: p.title,
      heading: p.heading ?? '',
      body: p.body ?? '',
      ctaLabel: p.ctaLabel ?? '',
      ctaUrl: p.ctaUrl ?? '',
      target: p.target ?? 'all',
      delaySeconds: String(p.delaySeconds ?? 3),
      autoCloseSeconds: String(p.autoCloseSeconds ?? 0),
      reappearDays: String(p.reappearDays ?? 30),
      isActive: p.isActive ?? false,
      order: String(p.order ?? 0),
      imageUrl: p.image ? imageUrl(p.image) : '',
      imageAssetId: '',
    }
  } catch {
    return null
  }
}

export default async function EditPopupPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { id } = await params
  const popup = await getPopup(id)
  if (!popup) notFound()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <div className="mb-5">
          <Link href="/admin/popups" className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-[20px] font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
            Pop-up bearbeiten
          </h1>
          <PopupForm popupId={id} defaultValues={popup} />
        </div>
      </div>
    </PageWrapper>
  )
}
