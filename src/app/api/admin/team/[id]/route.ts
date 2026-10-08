import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'
import { imageFromAssetId } from '@/lib/admin/product-helpers'
import { centerRef, clean, isValidDocId } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

async function exists(id: string) {
  return !!(await client.fetch<string | null>(`*[_type == "teamMember" && _id == $id][0]._id`, { id }))
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    const member = await client.fetch(
      `*[_type == "teamMember" && _id == $id][0]{
        _id, firstName, lastName, role, email, phone, order, isActive, photo,
        "centerSlug": center->slug.current
      }`,
      { id }
    )
    if (!member) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'Teammitglied konnte nicht geladen werden.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    const body = await req.json()
    const firstName = clean(body.firstName)
    const lastName = clean(body.lastName)
    const role = clean(body.role)
    if (!firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Vorname, Nachname und Funktion sind Pflichtfelder.' }, { status: 400 })
    }
    if (!(await exists(id))) {
      return NextResponse.json({ error: 'Dieses Teammitglied existiert nicht mehr.' }, { status: 404 })
    }

    const set: Record<string, unknown> = {
      firstName,
      lastName,
      role,
      order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
      isActive: body.isActive !== false,
    }
    const unset: string[] = []

    const email = clean(body.email)
    const phone = clean(body.phone)
    const center = centerRef(body.centerSlug)
    if (email) set.email = email; else unset.push('email')
    if (phone) set.phone = phone; else unset.push('phone')
    if (center) set.center = center; else unset.push('center')

    // Foto: neue Asset-ID → ersetzen; photoRemoved → entfernen; sonst unverändert lassen
    const photo = imageFromAssetId(clean(body.photoAssetId))
    if (photo) set.photo = photo
    else if (body.photoRemoved === true) unset.push('photo')

    let patch = client.patch(id).set(set)
    if (unset.length) patch = patch.unset(unset)
    await patch.commit()

    revalidatePath('/unternehmen')
    return NextResponse.json({ _id: id })
  } catch (err) {
    console.error('Team update failed:', err)
    return NextResponse.json({ error: 'Änderungen konnten nicht gespeichert werden.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    // Ein ggf. vorhandener Studio-Entwurf wird mitgelöscht, damit nichts „wieder auftaucht".
    await client.transaction().delete(id).delete(`drafts.${id}`).commit()
    revalidatePath('/unternehmen')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Team delete failed:', err)
    return NextResponse.json({ error: 'Teammitglied konnte nicht gelöscht werden.' }, { status: 500 })
  }
}
