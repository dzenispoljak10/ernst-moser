import { auth } from '@/auth'
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

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
