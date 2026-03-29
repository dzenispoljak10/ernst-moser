import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Current User */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">
          Angemeldeter Benutzer
        </h3>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
            style={{ background: '#1B2D5B' }}
          >
            {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{session?.user?.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{session?.user?.email}</div>
            <div className="text-xs text-gray-400 mt-0.5">Rolle: {session?.user?.role}</div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">
          System
        </h3>
        <dl className="space-y-3">
          <div className="flex justify-between items-center">
            <dt className="text-sm text-gray-500">Sanity Projekt</dt>
            <dd className="text-xs font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded-md">owqsc1ph</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-sm text-gray-500">Sanity Dataset</dt>
            <dd className="text-xs font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded-md">production</dd>
          </div>
        </dl>
      </div>

      {/* Setup Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-4">
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
              className="block bg-amber-100 text-amber-900 text-xs px-3 py-2 rounded-lg font-mono"
            >
              {cmd}
            </code>
          ))}
        </div>
      </div>
    </div>
  )
}
