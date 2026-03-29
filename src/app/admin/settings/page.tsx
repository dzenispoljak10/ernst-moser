import { Settings } from 'lucide-react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={22} className="text-gray-400" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Einstellungen</h1>
          <p className="text-sm text-gray-500 mt-0.5">Konto & System</p>
        </div>
      </div>

      {/* Current User */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Angemeldeter Benutzer</h3>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
            style={{ background: '#1B2D5B' }}
          >
            {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{session?.user?.name}</div>
            <div className="text-xs text-gray-500">{session?.user?.email}</div>
            <div className="text-xs text-gray-400 mt-0.5">Rolle: {session?.user?.role}</div>
          </div>
        </div>
      </div>

      {/* DB Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">System</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Sanity Projekt</dt>
            <dd className="text-gray-700 font-mono text-xs">owqsc1ph</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Sanity Dataset</dt>
            <dd className="text-gray-700 font-mono text-xs">production</dd>
          </div>
        </dl>
      </div>

      {/* Setup Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-amber-800 mb-3">
          Ersteinrichtung Datenbank
        </h3>
        <p className="text-xs text-amber-700 mb-3">
          Führen Sie diese Befehle nach dem Vercel Postgres Setup aus:
        </p>
        <div className="space-y-2">
          {[
            'npx prisma generate',
            'npx prisma db push',
            'npx tsx prisma/seed.ts',
          ].map((cmd) => (
            <code
              key={cmd}
              className="block bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded font-mono"
            >
              {cmd}
            </code>
          ))}
        </div>
      </div>
    </div>
  )
}
