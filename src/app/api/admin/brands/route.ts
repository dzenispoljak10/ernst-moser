import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const brands = await prisma.brand.findMany({
      orderBy: [{ centerSlug: 'asc' }, { order: 'asc' }, { name: 'asc' }],
    })
    return NextResponse.json(brands)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
