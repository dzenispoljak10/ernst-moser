import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageWrapper from '@/components/admin/PageWrapper'
import SalespersonForm from '../SalespersonForm'
import { client } from '@/lib/sanity'
import { salespersonPhotoUrl } from '@/lib/serverImages'
import { isValidDocId } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

interface SpDoc {
  _id: string
  firstName?: string
  lastName?: string
  title?: string
  phone?: string
  email?: string
  photo?: { asset?: { _ref: string } }
  photoFromAdmin?: boolean
  centers?: string[]
}

export default async function EditSalespersonPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { id } = await params
  if (!isValidDocId(id)) notFound()

  const sp = await client.fetch<SpDoc | null>(
    `*[_type == "salesperson" && _id == $id][0]{
      _id, firstName, lastName, title, phone, email, photo, photoFromAdmin,
      "centers": centers[]->slug.current
    }`,
    { id }
  )
  if (!sp) notFound()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-5">
          <Link
            href="/admin/salesperson"
            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-lg">
          <SalespersonForm
            id={sp._id}
            defaultValues={{
              firstName: sp.firstName ?? '',
              lastName: sp.lastName ?? '',
              title: sp.title ?? '',
              phone: sp.phone ?? '',
              email: sp.email ?? '',
              centers: (sp.centers ?? []).filter(Boolean),
              photoUrl: salespersonPhotoUrl(sp) ?? '',
              hasAdminPhoto: !!(sp.photoFromAdmin && sp.photo),
            }}
          />
        </div>
      </div>
    </PageWrapper>
  )
}
