'use client'
import { createContext } from 'react'

export interface TextOvCtx {
  /** Liefert den anzuzeigenden Text für einen Originaltext. */
  resolve: (s: string) => string
  /** true, wenn der Admin-Bearbeitungsmodus aktiv ist. */
  editing: boolean
  /** Meldet einen gerenderten Originaltext an (nur im Bearbeitungsmodus). */
  register: (s: string) => () => void
}

export const TextOvContext = createContext<TextOvCtx | null>(null)
