import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import RabattForm from '../RabattForm'

export default async function NewRabattPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <PageWrapper>
      <RabattForm mode="new" />
    </PageWrapper>
  )
}
