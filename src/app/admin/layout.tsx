import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Get current pathname from request headers
  const headersList = await headers()
  const pathname =
    headersList.get('x-invoke-path') ??
    headersList.get('x-pathname') ??
    headersList.get('next-url') ??
    ''

  const isLoginPage = pathname === '/admin/login' || pathname.endsWith('/admin/login')

  if (!session && !isLoginPage) {
    redirect('/admin/login')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <AdminLayoutClient
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        isAuthenticated={!!session}
      >
        {children}
      </AdminLayoutClient>
    </div>
  )
}
