import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import ChangePasswordForm from './ChangePasswordForm'

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <PageWrapper>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-5">

        {/* Account */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">
            Angemeldeter Benutzer
          </h3>
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-bold"
              style={{ background: '#1B2D5B' }}
            >
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <div className="text-[15px] font-semibold text-gray-900">{session?.user?.name}</div>
              <div className="text-[13px] text-gray-400 mt-0.5">{session?.user?.email}</div>
              <div className="text-[11px] text-gray-300 mt-0.5 uppercase tracking-wider">{session?.user?.role}</div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">
            Passwort ändern
          </h3>
          <ChangePasswordForm />
        </div>

        {/* System */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">
            System
          </h3>
          <dl className="space-y-3">
            {[
              ['Sanity Projekt', 'owqsc1ph'],
              ['Sanity Dataset', 'production'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <dt className="text-[13px] text-gray-500">{label}</dt>
                <dd className="text-[11px] font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded-md">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </PageWrapper>
  )
}
