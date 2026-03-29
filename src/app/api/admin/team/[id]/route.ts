import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const member = await prisma.teamMember.findUnique({ where: { id } })
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const body = await req.json()
    const member = await prisma.teamMember.update({
      where: { id },
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
    await syncTeamMemberToSanity(member.firstName, member.lastName, body)

    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const member = await prisma.teamMember.delete({ where: { id } })

    // Mark as inactive in Sanity instead of deleting
    await markSanityTeamMemberInactive(member.firstName, member.lastName)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

async function syncTeamMemberToSanity(
  firstName: string,
  lastName: string,
  data: Record<string, unknown>
) {
  try {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "teamMember" && firstName == $first && lastName == $last][0]`,
      { first: firstName, last: lastName }
    )
    if (existing) {
      await client
        .patch(existing._id)
        .set({
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          email: data.email || null,
          phone: data.phone || null,
          order: data.order ?? 0,
          isActive: data.isActive ?? true,
        })
        .commit()
    }
  } catch {
    // Non-fatal
  }
}

async function markSanityTeamMemberInactive(firstName: string, lastName: string) {
  try {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "teamMember" && firstName == $first && lastName == $last][0]`,
      { first: firstName, last: lastName }
    )
    if (existing) {
      await client.patch(existing._id).set({ isActive: false }).commit()
    }
  } catch {
    // Non-fatal
  }
}
