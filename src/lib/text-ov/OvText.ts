'use client'
// Bewusst ohne JSX (sonst Zirkelbezug zur eigenen jsx-runtime).
import { useContext, useEffect } from 'react'
import { TextOvContext } from './context'

export default function OvText({ s }: { s: string }): string {
  const ctx = useContext(TextOvContext)
  const editing = !!ctx?.editing
  useEffect(() => {
    if (!editing || !ctx) return
    return ctx.register(s)
  }, [editing, ctx, s])
  return ctx ? ctx.resolve(s) : s
}
