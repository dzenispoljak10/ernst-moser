import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'
import { GLOBAL_PAGE, normalizePath } from '@/lib/text-ov/types'

export const dynamic = 'force-dynamic'

function docId(page: string, original: string) {
  return 'textOverride-' + createHash('sha1').update(page + '\u0000' + original).digest('hex')
}

function revalidateAll() {
  // Texte können auf jeder Seite vorkommen -> alle Seiten neu aufbauen
  revalidatePath('/', 'layout')
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (req.nextUrl.searchParams.get('check')) return NextResponse.json({ ok: true })
  try {
    const docs = await client.fetch(
      `*[_type == "textOverride" && !(_id in path("drafts.**"))] | order(_updatedAt desc){_id, page, original, text, _updatedAt}`
    )
    return NextResponse.json(docs)
  } catch {
    return NextResponse.json({ error: 'Laden fehlgeschlagen' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  try {
    const b = await req.json()
    const original = typeof b.original === 'string' ? b.original : ''
    const text = typeof b.text === 'string' ? b.text.replace(/\s*\n\s*/g, ' ') : ''
    if (!original.trim()) return NextResponse.json({ error: 'Originaltext fehlt' }, { status: 400 })
    if (!text.trim()) return NextResponse.json({ error: 'Text darf nicht leer sein' }, { status: 400 })
    if (text.length > 5000) return NextResponse.json({ error: 'Text zu lang' }, { status: 400 })
    const path = normalizePath(typeof b.page === 'string' ? b.page : '/')
    const page = b.everywhere ? GLOBAL_PAGE : path

    const tx = client.transaction().createOrReplace({
      _id: docId(page, original),
      _type: 'textOverride',
      page,
      original,
      text,
    })
    // "Überall" ersetzt eine eventuelle seitenspezifische Änderung auf der aktuellen Seite
    if (b.everywhere) tx.delete(docId(path, original))
    await tx.commit()
    revalidateAll()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[texts] save', e)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  try {
    const b = await req.json()
    let id: string
    if (typeof b.id === 'string' && b.id.startsWith('textOverride-')) {
      id = b.id
    } else {
      if (typeof b.original !== 'string' || typeof b.page !== 'string') {
        return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
      }
      const page = b.page === GLOBAL_PAGE ? GLOBAL_PAGE : normalizePath(b.page)
      id = docId(page, b.original)
    }
    await client.delete(id)
    revalidateAll()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[texts] delete', e)
    return NextResponse.json({ error: 'Löschen fehlgeschlagen' }, { status: 500 })
  }
}
