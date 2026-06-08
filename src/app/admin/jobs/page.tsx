import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import PageWrapper from '@/components/admin/PageWrapper'
import JobsClient from './JobsClient'

export const dynamic = 'force-dynamic'

interface Job {
  _id: string
  title: string
  kind: 'stelle' | 'lehrstelle'
  center?: string
  centerColor?: string
  type?: string
  pensum?: string
  location?: string
  duration?: string
  description?: string
  pdfUrl?: string
  order?: number
  isActive: boolean
}

async function getJobs(): Promise<Job[]> {
  try {
    return await client.fetch<Job[]>(
      `*[_type == "jobPosting"] | order(kind asc, order asc, _createdAt asc) {
        _id, title, kind, center, centerColor, type, pensum, location, duration, description, pdfUrl, order, isActive
      }`
    )
  } catch {
    return []
  }
}

export default async function AdminJobsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  const jobs = await getJobs()

  return (
    <PageWrapper>
      <div className="px-8 py-6">
        <JobsClient jobs={jobs} />
      </div>
    </PageWrapper>
  )
}
