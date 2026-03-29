'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
}

const SUGGESTIONS = [
  { label: '📍 Standort & Öffnungszeiten', value: 'Standort & Öffnungszeiten' },
  { label: '🚛 Nutzfahrzeuge', value: 'Nutzfahrzeuge' },
  { label: '🌿 Kommunalgeräte', value: 'Kommunalgeräte' },
  { label: '⚙️ Motorgeräte', value: 'Motorgeräte' },
]

const BOT_REPLY =
  'Danke für Ihre Nachricht! 😊 Unser Team hilft Ihnen gerne persönlich weiter.\n📞 +41(0)32 675 58 05\n✉️ info@ernst-moser.ch'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mounted, setMounted] = useState(false)
  const welcomeDone = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Mount guard – avoids SSR mismatch
  useEffect(() => { setMounted(true) }, [])

  // Welcome sequence on first open
  useEffect(() => {
    if (!open || welcomeDone.current) return
    welcomeDone.current = true

    const t1 = setTimeout(() => {
      setMessages([{ id: 'w1', role: 'bot', text: 'Hallo! 👋 Ich bin Ihre Ernst Moser Assistenz.' }])
    }, 300)
    const t2 = setTimeout(() => {
      setMessages(prev => [...prev, { id: 'w2', role: 'bot', text: 'Senden Sie mir Ihre Nachricht – ich versuche Ihnen weiterzuhelfen!' }])
    }, 1000)
    const t3 = setTimeout(() => { setShowSuggestions(true) }, 1800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [open])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, showSuggestions])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: text.trim() }])
    setInput('')
    setShowSuggestions(false)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now().toString() + 'b', role: 'bot', text: BOT_REPLY }])
    }, 1500)
  }

  // Don't render anything until client-side mount
  if (!mounted) return null

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.82, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar-wrap">
                <div className="chatbot-avatar">E</div>
                <span className="chatbot-online-dot" />
              </div>
              <div className="chatbot-header-info">
                <span className="chatbot-header-name">Ernst Moser Assistent</span>
                <span className="chatbot-header-status">Online · Bereit zu helfen</span>
              </div>
              <button className="chatbot-close-btn" onClick={() => setOpen(false)} aria-label="Schliessen">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-body">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    className={`chatbot-msg-row chatbot-msg-row--${msg.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {msg.role === 'bot' && <div className="chatbot-msg-avatar">E</div>}
                    <div className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
                      {msg.text.split('\n').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {showSuggestions && (
                  <motion.div
                    key="suggestions"
                    className="chatbot-suggestions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {SUGGESTIONS.map(s => (
                      <button key={s.value} className="chatbot-chip" onClick={() => sendMessage(s.value)}>
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {typing && (
                  <motion.div
                    key="typing"
                    className="chatbot-msg-row chatbot-msg-row--bot"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="chatbot-msg-avatar">E</div>
                    <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing">
                      <span className="chatbot-dot" />
                      <span className="chatbot-dot" />
                      <span className="chatbot-dot" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="chatbot-footer">
              <input
                className="chatbot-input"
                type="text"
                placeholder="Ihre Nachricht..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                maxLength={400}
              />
              <button
                className="chatbot-send-btn"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                aria-label="Senden"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <div className="chatbot-fab-area">
        {!open && <span className="chatbot-tooltip">Ernst Moser Assistent</span>}
        <button
          className="chatbot-toggle-btn"
          onClick={() => setOpen(v => !v)}
          aria-label="Chat öffnen"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              >
                <X size={24} color="#fff" />
              </motion.span>
            ) : (
              <motion.span key="msg"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              >
                <MessageCircle size={24} color="#fff" />
              </motion.span>
            )}
          </AnimatePresence>
          {!open && <span className="chatbot-badge" />}
        </button>
      </div>
    </>
  )
}
