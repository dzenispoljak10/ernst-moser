import { auth } from '@/auth'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div
      className={`${outfit.variable} ${plusJakartaSans.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        fontFamily: 'var(--font-body, sans-serif)',
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
