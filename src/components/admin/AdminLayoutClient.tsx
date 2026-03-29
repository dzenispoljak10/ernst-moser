'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

interface AdminLayoutClientProps {
  children: React.ReactNode
  userName?: string | null
  userEmail?: string | null
}

export default function AdminLayoutClient({
  children,
  userName,
  userEmail,
}: AdminLayoutClientProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar userName={userName} userEmail={userEmail} />
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
