'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AdminLayoutClientProps {
  children: React.ReactNode
  userName?: string | null
  userEmail?: string | null
  logoUrl?: string | null
  isAuthenticated: boolean
}

export default function AdminLayoutClient({
  children,
  userName,
  userEmail,
  logoUrl,
  isAuthenticated,
}: AdminLayoutClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) router.replace('/admin/login')
    if (isAuthenticated && isLoginPage) router.replace('/admin')
  }, [isAuthenticated, isLoginPage, router])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  if (isLoginPage) return <>{children}</>
  if (!isAuthenticated) return null

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        logoUrl={logoUrl}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background: '#F7F8FA' }}>
        <TopBar onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
