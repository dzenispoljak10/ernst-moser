'use client'
import { useContext, useEffect } from 'react'
import { TextOvContext } from './context'

/**
 * Macht animierte Zahlen (CountUp) im Text-Bearbeitungsmodus änderbar.
 * Ungültige Eingaben (keine Zahl) fallen automatisch auf den Originalwert zurück.
 */
export function useOvNumber(n: number): number {
  const ctx = useContext(TextOvContext)
  const original = String(n)
  const editing = !!ctx?.editing
  useEffect(() => {
    if (!editing || !ctx) return
    return ctx.register(original)
  }, [editing, ctx, original])
  if (!ctx) return n
  const v = Number(ctx.resolve(original).replace(/['’\s]/g, ''))
  return Number.isFinite(v) ? v : n
}
