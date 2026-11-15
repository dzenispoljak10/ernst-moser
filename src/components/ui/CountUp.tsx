'use client'

import { useEffect, useRef, useState } from 'react'
import { useOvNumber } from '@/lib/text-ov/useOvNumber'

interface Props {
  to: number
  duration?: number
  suffix?: string
}

export default function CountUp({ to: original, duration = 2000, suffix = '' }: Props) {
  // Zielzahl ist im Admin-Bearbeitungsmodus änderbar (ohne Änderung = Original)
  const to = useOvNumber(original)
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    // Zielzahl hat sich nach der Animation geändert (Admin-Bearbeitung) -> direkt anzeigen
    if (started.current) {
      const id = requestAnimationFrame(() => setValue(to))
      return () => cancelAnimationFrame(id)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(eased * to))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </span>
  )
}
