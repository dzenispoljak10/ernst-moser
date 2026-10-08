import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'
import { slugify, imageFromAssetId } from '@/lib/admin/product-helpers'
import { centerRef, clean } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

/**
 * Teammitglieder leben ausschliesslich in Sanity (`teamMember`) —
 * genau dort liest die Seite /unternehmen.
 */
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const members = await client.fetch(
      `*[_type == "teamMember" && !(_id in path("drafts.**"))] | order(order asc, lastName asc) {
        _id, firstName, lastName, role, email, phone, order, isActive,
        "centerSlug": center->slug.current
      }`
    )
    return NextResponse.json(members)
  } catch {
    return NextResponse.json({ error: 'Teammitglieder konnten nicht geladen werden.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const firstName = clean(body.firstName)
    const lastName = clean(body.lastName)
    const role = clean(body.role)
    if (!firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Vorname, Nachname und Funktion sind Pflichtfelder.' }, { status: 400 })
    }

    // Lesbare, eindeutige ID (z. B. team-max-muster, bei Namensgleichheit -2, -3 …)
    const base = `team-${slugify(`${firstName} ${lastName}`) || 'mitglied'}`
    const taken = await client.fetch<string[]>(
      `*[_type == "teamMember" && _id match $pattern]._id`,
      { pattern: `${base}*` }
    )
    let id = base
    for (let n = 2; taken.includes(id); n++) id = `${base}-${n}`

    const doc: Record<string, unknown> = {
      _id: id,
      _type: 'teamMember',
      firstName,
      lastName,
      role,
      order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
      isActive: body.isActive !== false,
    }
    const email = clean(body.email)
    const phone = clean(body.phone)
    const center = centerRef(body.centerSlug)
    const photo = imageFromAssetId(clean(body.photoAssetId))
    if (email) doc.email = email
    if (phone) doc.phone = phone
    if (center) doc.center = center
    if (photo) doc.photo = photo

    const created = await client.create(doc as { _type: string })
    revalidatePath('/unternehmen')
    return NextResponse.json({ _id: created._id }, { status: 201 })
  } catch (err) {
    console.error('Team create failed:', err)
    return NextResponse.json({ error: 'Teammitglied konnte nicht gespeichert werden.' }, { status: 500 })
  }
}
