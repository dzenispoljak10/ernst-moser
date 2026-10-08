import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TeamForm from '../TeamForm'
import PageWrapper from '@/components/admin/PageWrapper'
import { client, imageUrl } from '@/lib/sanity'
import { isValidDocId } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

interface MemberDoc {
  _id: string
  firstName?: string
  lastName?: string
  role?: string
  email?: string
  phone?: string
  order?: number
  isActive?: boolean
  photo?: { asset?: { _ref: string } }
  centerSlug?: string
}

async function getMember(id: string): Promise<MemberDoc | null> {
  if (!isValidDocId(id)) return null
  return client.fetch<MemberDoc | null>(
    `*[_type == "teamMember" && _id == $id][0]{
      _id, firstName, lastName, role, email, phone, order, isActive, photo,
      "centerSlug": center->slug.current
    }`,
    { id }
  )
}

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const { id } = await params
  const member = await getMember(id)
  if (!member) notFound()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-5">
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={13} />
            Zurück
          </Link>
        </div>
        <div className="max-w-lg">
          <TeamForm
            memberId={id}
            defaultValues={{
              firstName: member.firstName ?? '',
              lastName: member.lastName ?? '',
              role: member.role ?? '',
              email: member.email ?? '',
              phone: member.phone ?? '',
              centerSlug: member.centerSlug ?? '',
              order: member.order ?? 0,
              isActive: member.isActive !== false,
              photoUrl: member.photo?.asset ? imageUrl(member.photo) : '',
            }}
          />
        </div>
      </div>
    </PageWrapper>
  )
}
