'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

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
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName={userName} />
        <main className="flex-1 overflow-auto" style={{ background: '#f8fafc' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
