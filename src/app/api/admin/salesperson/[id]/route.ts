import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'
import { imageFromAssetId } from '@/lib/admin/product-helpers'
import { CENTER_IDS, clean, isValidDocId } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

/**
 * Verkäufer/Ansprechpartner leben in Sanity (`salesperson`) und erscheinen
 * auf Marken-, Produkt- und Leistungsseiten.
 */
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    const body = await req.json()
    const firstName = clean(body.firstName)
    const lastName = clean(body.lastName)
    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'Vorname und Nachname sind Pflichtfelder.' }, { status: 400 })
    }
    const existing = await client.fetch<string | null>(`*[_type == "salesperson" && _id == $id][0]._id`, { id })
    if (!existing) return NextResponse.json({ error: 'Dieser Verkäufer existiert nicht.' }, { status: 404 })

    const set: Record<string, unknown> = { firstName, lastName }
    const unset: string[] = []
    for (const f of ['title', 'phone', 'email'] as const) {
      const v = clean(body[f])
      if (v) set[f] = v
      else unset.push(f)
    }

    if (Array.isArray(body.centers)) {
      set.centers = (body.centers as unknown[])
        .filter((c): c is string => typeof c === 'string' && !!CENTER_IDS[c])
        .map((c) => ({ _type: 'reference', _ref: CENTER_IDS[c], _key: CENTER_IDS[c] }))
    }

    const photo = imageFromAssetId(clean(body.photoAssetId))
    if (photo) {
      set.photo = photo
      set.photoFromAdmin = true
    } else if (body.photoRemoved === true) {
      unset.push('photo', 'photoFromAdmin')
    }

    let patch = client.patch(id).set(set)
    if (unset.length) patch = patch.unset(unset)
    await patch.commit()

    // Ansprechpartner erscheinen auf vielen Seiten → gesamte Website neu aufbauen.
    revalidatePath('/', 'layout')
    return NextResponse.json({ _id: id })
  } catch (err) {
    console.error('Salesperson update failed:', err)
    return NextResponse.json({ error: 'Änderungen konnten nicht gespeichert werden.' }, { status: 500 })
  }
}
