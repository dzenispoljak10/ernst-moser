'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import Link from 'next/link'
import { getResponse, ChatbotLink } from '@/lib/chatbot'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
  displayText?: string
  links?: ChatbotLink[]
  chips?: string[]
  typing?: boolean
}

const DEFAULT_CHIPS = ['Nutzfahrzeuge', 'Kommunal', 'Motorgeräte', 'Kontakt']
const TYPING_SPEED = 15 // ms per character

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showChips, setShowChips] = useState(false)
  const [currentChips, setCurrentChips] = useState<string[]>(DEFAULT_CHIPS)
  const [mounted, setMounted] = useState(false)
  const welcomeDone = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open || welcomeDone.current) return
    welcomeDone.current = true

    const t1 = setTimeout(() => {
      addBotMessage('Hallo! 👋 Ich bin Ihre Ernst Moser Assistenz.', undefined, undefined, () => {
        const t2 = setTimeout(() => {
          addBotMessage(
            'Senden Sie mir Ihre Nachricht – ich versuche Ihnen weiterzuhelfen!',
            undefined,
            DEFAULT_CHIPS,
          )
        }, 400)
        return () => clearTimeout(t2)
      })
    }, 300)

    return () => clearTimeout(t1)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, showChips])

  function addBotMessage(
    fullText: string,
    links?: ChatbotLink[],
    chips?: string[],
    onDone?: () => (() => void) | void,
  ) {
    const id = Date.now().toString() + Math.random()
    setMessages(prev => [...prev, { id, role: 'bot', text: fullText, displayText: '', links, chips, typing: true }])
    setShowChips(false)

    let i = 0
    function tick() {
      i++
      setMessages(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, displayText: fullText.slice(0, i), typing: i < fullText.length }
            : m,
        ),
      )
      if (i < fullText.length) {
        typingRef.current = setTimeout(tick, TYPING_SPEED)
      } else {
        if (chips) {
          setCurrentChips(chips)
          setShowChips(true)
        }
        onDone?.()
      }
    }
    typingRef.current = setTimeout(tick, TYPING_SPEED)
  }

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg = text.trim()
    setInput('')
    setShowChips(false)
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }])
    setIsTyping(true)

    // Small delay to simulate "thinking"
    setTimeout(() => {
      setIsTyping(false)
      const response = getResponse(userMsg)
      addBotMessage(response.answer, response.links, response.chips ?? DEFAULT_CHIPS)
    }, 600)
  }

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
                      <span>
                        {(msg.displayText ?? msg.text).split('\n').map((line, i, arr) => (
                          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                        ))}
                        {msg.typing && <span className="chatbot-cursor">|</span>}
                      </span>
                      {/* Links under bubble */}
                      {!msg.typing && msg.links && msg.links.length > 0 && (
                        <div className="chatbot-links">
                          {msg.links.map(link => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="chatbot-link-btn"
                              onClick={() => setOpen(false)}
                            >
                              {link.label} →
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    key="typing-indicator"
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

                {/* Follow-up chips */}
                {showChips && (
                  <motion.div
                    key="chips"
                    className="chatbot-suggestions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {currentChips.map(chip => (
                      <button
                        key={chip}
                        className="chatbot-chip"
                        onClick={() => sendMessage(chip)}
                      >
                        {chip}
                      </button>
                    ))}
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
                disabled={!input.trim() || isTyping}
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
