'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'

const FEATURES = [
  'Sicherer Zugang',
  'Einfache Verwaltung',
  'Immer aktuell',
]

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('Ungültige E-Mail-Adresse oder Passwort.')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)',
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(27,45,91,0.88)' }}
      />
      {/* Animated blur circles */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-10 animate-pulse"
        style={{ background: 'radial-gradient(circle, #5b7ec7 0%, transparent 70%)', animationDuration: '4s' }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 animate-pulse"
        style={{ background: 'radial-gradient(circle, #3a5fa0 0%, transparent 70%)', animationDuration: '6s' }}
      />

      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex flex-col justify-between w-[60%] p-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-white font-bold text-lg">EM</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">Ernst Moser GmbH</span>
          </div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl font-bold leading-tight mb-4 max-w-md"
          >
            Ihr Partner für Nutzfahrzeuge, Kommunal- und Motorgeräte
          </motion.h1>

          {/* Features */}
          <div className="mt-10 space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-white/70 shrink-0" />
                <span className="text-white/80 text-base">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/30 text-sm"
        >
          © Ernst Moser GmbH 2026
        </motion.p>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-[40%] p-6 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: '#1B2D5B' }}
            >
              <span className="text-white font-bold text-lg">EM</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Willkommen zurück</h2>
            <p className="text-sm text-gray-500 mt-1 mb-8">Melden Sie sich an um fortzufahren</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  E-Mail Adresse
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ernst-moser.ch"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1B2D5B'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(27,45,91,0.12)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1B2D5B'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(27,45,91,0.12)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  <AlertCircle size={15} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-70 mt-2"
                style={{ background: '#1B2D5B' }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.2)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.filter = 'none'
                }}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                {loading ? 'Anmelden…' : 'Anmelden'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
