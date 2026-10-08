import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Keine Datei ausgewählt.' }, { status: 400 })

    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
    const isImage = file.type.startsWith('image/')
    if (!isPdf && !isImage) {
      return NextResponse.json({ error: 'Nur Bilder (JPG, PNG, WebP) oder PDF-Dateien sind erlaubt.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (isPdf) {
      const asset = await client.assets.upload('file', buffer, {
        filename: file.name,
        contentType: 'application/pdf',
      })
      return NextResponse.json({ url: asset.url, assetId: asset._id })
    }

    const asset = await client.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    const url = asset.url ?? `https://cdn.sanity.io/images/owqsc1ph/production/${asset._id.replace('image-', '').replace(/-([a-z]+)$/, '.$1')}`

    return NextResponse.json({ url, assetId: asset._id })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload fehlgeschlagen. Bitte erneut versuchen.' }, { status: 500 })
  }
}
