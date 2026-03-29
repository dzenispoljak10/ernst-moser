'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from './Sidebar'

interface AdminLayoutClientProps {
  children: React.ReactNode
  userName?: string | null
  userEmail?: string | null
  isAuthenticated: boolean
}

export default function AdminLayoutClient({
  children,
  userName,
  userEmail,
  isAuthenticated,
}: AdminLayoutClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'

  // Client-side fallback redirect (server redirect is primary)
  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace('/admin/login')
    }
    if (isAuthenticated && isLoginPage) {
      router.replace('/admin')
    }
  }, [isAuthenticated, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
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
