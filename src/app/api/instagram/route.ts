import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/instagram'

/**
 * Die Startseite holt die Posts direkt server-seitig über getInstagramPosts().
 * Diese Route bleibt als Kontrolle: /api/instagram zeigt, welche Quelle greift
 * ("behold" | "api" | "fallback") – praktisch nach dem Setzen der Env-Variable.
 */
export const revalidate = 1800

export async function GET() {
  return NextResponse.json(await getInstagramPosts())
}
