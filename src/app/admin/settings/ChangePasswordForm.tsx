'use client'

import { useState } from 'react'
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (next !== confirm) { setError('Die Passwörter stimmen nicht überein.'); return }
    if (next.length < 8) { setError('Das neue Passwort muss mindestens 8 Zeichen lang sein.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Fehler beim Ändern des Passworts.')
      }
      setSuccess(true)
      setCurrent(''); setNext(''); setConfirm('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-3 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-[#1B2D5B] focus:ring-1 focus:ring-[#1B2D5B]/20 transition-all"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-[13px]">
          <Check size={14} />
          Passwort erfolgreich geändert.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Aktuelles Passwort</label>
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className={inputClass + ' pr-10'}
          />
          <button type="button" onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Neues Passwort</label>
        <div className="relative">
          <input
            type={showNext ? 'text' : 'password'}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            className={inputClass + ' pr-10'}
            placeholder="Mindestens 8 Zeichen"
          />
          <button type="button" onClick={() => setShowNext(!showNext)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showNext ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Passwort bestätigen</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: '#1B2D5B' }}
      >
        {loading ? 'Wird gespeichert…' : 'Passwort ändern'}
      </button>
    </form>
  )
}
