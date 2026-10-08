import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { client, imageUrl } from '@/lib/sanity'
import { textToBlocks, blocksToText, imageFromAssetId, type PortableBlock } from '@/lib/admin/product-helpers'
import { clean, isValidDocId } from '@/lib/admin/sanity-admin'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

interface BrandDoc {
  _id: string
  name: string
  slug?: string
  centerSlug?: string
  logo?: { asset?: { _ref: string } }
  description?: PortableBlock[]
  tagline?: string
  salespersonId?: string
}

/**
 * Marken leben ausschliesslich in Sanity (`brand`) — dort liest die Website
 * Logo, Tagline, Beschreibung und Ansprechpartner der Markenseiten.
 */
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    const [brand, salespersons] = await Promise.all([
      client.fetch<BrandDoc | null>(
        `*[_type == "brand" && _id == $id][0]{
          _id, name, "slug": slug.current, "centerSlug": center->slug.current,
          logo, description, tagline, "salespersonId": salesperson._ref
        }`,
        { id }
      ),
      client.fetch<Array<{ _id: string; firstName: string; lastName: string }>>(
        `*[_type == "salesperson" && !(_id in path("drafts.**"))] | order(lastName asc) { _id, firstName, lastName }`
      ),
    ])
    if (!brand) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

    return NextResponse.json({
      id: brand._id,
      name: brand.name,
      slug: brand.slug ?? '',
      centerSlug: brand.centerSlug ?? '',
      logoUrl: brand.logo?.asset ? imageUrl(brand.logo) : null,
      description: blocksToText(brand.description),
      tagline: brand.tagline ?? '',
      salespersonId: brand.salespersonId ?? '',
      salespersons: salespersons.map((s) => ({ id: s._id, name: `${s.firstName} ${s.lastName}` })),
    })
  } catch {
    return NextResponse.json({ error: 'Marke konnte nicht geladen werden.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!isValidDocId(id)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  try {
    const body = await req.json()
    const brand = await client.fetch<{ slug?: string; centerSlug?: string } | null>(
      `*[_type == "brand" && _id == $id][0]{ "slug": slug.current, "centerSlug": center->slug.current }`,
      { id }
    )
    if (!brand) return NextResponse.json({ error: 'Diese Marke existiert nicht.' }, { status: 404 })

    const set: Record<string, unknown> = {}
    const unset: string[] = []

    if (typeof body.description === 'string') {
      const blocks = textToBlocks(body.description)
      if (blocks) set.description = blocks
      else unset.push('description')
    }
    if (typeof body.tagline === 'string') {
      const tagline = clean(body.tagline)
      if (tagline) set.tagline = tagline
      else unset.push('tagline')
    }
    // Logo nur ersetzen, wenn ein neues hochgeladen wurde
    const logo = imageFromAssetId(clean(body.logoAssetId))
    if (logo) set.logo = logo

    if (typeof body.salespersonId === 'string') {
      const spId = clean(body.salespersonId)
      if (spId) {
        const spExists = await client.fetch<string | null>(
          `*[_type == "salesperson" && _id == $spId][0]._id`,
          { spId }
        )
        if (!spExists) return NextResponse.json({ error: 'Ansprechpartner nicht gefunden.' }, { status: 400 })
        set.salesperson = { _type: 'reference', _ref: spId }
      } else {
        unset.push('salesperson')
      }
    }

    let patch = client.patch(id)
    if (Object.keys(set).length) patch = patch.set(set)
    if (unset.length) patch = patch.unset(unset)
    await patch.commit()

    // Marken-Daten erscheinen an vielen Stellen (Markenseite, Produktseiten mit
    // Ansprechpartner, Center-Seite, Menü-Logos) → gesamte Website neu aufbauen.
    // Seiten werden dabei erst beim nächsten Aufruf frisch generiert.
    revalidatePath('/', 'layout')

    return NextResponse.json({ id })
  } catch (err) {
    console.error('Brand update failed:', err)
    return NextResponse.json({ error: 'Änderungen konnten nicht gespeichert werden.' }, { status: 500 })
  }
}
