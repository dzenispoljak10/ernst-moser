import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { client } from '@/lib/sanity'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const members = await prisma.teamMember.findMany({
      orderBy: [{ order: 'asc' }, { lastName: 'asc' }],
    })
    return NextResponse.json(members)
  } catch (err) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const member = await prisma.teamMember.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
        email: body.email || null,
        phone: body.phone || null,
        photoUrl: body.photoUrl || null,
        centerId: body.centerId || null,
        order: body.order ?? 0,
        isActive: body.isActive ?? true,
      },
    })

    // Sync to Sanity
    await syncTeamMemberToSanity(member)

    return NextResponse.json(member, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}

async function syncTeamMemberToSanity(member: {
  firstName: string
  lastName: string
  role: string
  email: string | null
  phone: string | null
  photoUrl: string | null
  centerId: string | null
  order: number
  isActive: boolean
}) {
  try {
    // Find existing Sanity document by firstName + lastName
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "teamMember" && firstName == $first && lastName == $last][0]`,
      { first: member.firstName, last: member.lastName }
    )

    const doc = {
      _type: 'teamMember',
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      email: member.email,
      phone: member.phone,
      order: member.order,
      isActive: member.isActive,
    }

    if (existing) {
      await client.patch(existing._id).set(doc).commit()
    } else {
      await client.create(doc)
    }
  } catch {
    // Sanity sync failure is non-fatal
  }
}
