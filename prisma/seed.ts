import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { createClient } from '@sanity/client'

const prisma = new PrismaClient()

const sanity = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function main() {
  console.log('🌱 Seed startet...')

  // ─── Admin User ──────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('ErnstMoser2026!', 12)
  await prisma.user.upsert({
    where: { email: 'admin@ernst-moser.ch' },
    update: {},
    create: {
      email: 'admin@ernst-moser.ch',
      password: passwordHash,
      name: 'Administrator',
      role: 'admin',
    },
  })
  console.log('✅ Admin User erstellt: admin@ernst-moser.ch / ErnstMoser2026!')

  // ─── Team Members von Sanity importieren ────────────────────────────────────
  try {
    const sanityTeam = await sanity.fetch<Array<{
      _id: string
      firstName: string
      lastName: string
      role: string
      email?: string
      phone?: string
      order?: number
      isActive?: boolean
      photo?: { asset?: { url?: string } }
      center?: { slug?: { current?: string } }
    }>>(`*[_type == "teamMember"] | order(order asc)`)

    for (const m of sanityTeam) {
      await prisma.teamMember.upsert({
        where: {
          id: `sanity_${m._id}`,
        },
        update: {
          firstName: m.firstName,
          lastName: m.lastName,
          role: m.role,
          email: m.email ?? null,
          phone: m.phone ?? null,
          photoUrl: m.photo?.asset?.url ?? null,
          centerId: m.center?.slug?.current ?? null,
          order: m.order ?? 0,
          isActive: m.isActive ?? true,
        },
        create: {
          id: `sanity_${m._id}`,
          firstName: m.firstName,
          lastName: m.lastName,
          role: m.role,
          email: m.email ?? null,
          phone: m.phone ?? null,
          photoUrl: m.photo?.asset?.url ?? null,
          centerId: m.center?.slug?.current ?? null,
          order: m.order ?? 0,
          isActive: m.isActive ?? true,
        },
      })
    }
    console.log(`✅ ${sanityTeam.length} Teammitglieder importiert`)
  } catch (err) {
    console.warn('⚠️  Team-Import fehlgeschlagen (Sanity nicht erreichbar?):', err)
  }

  // ─── Brands von Sanity importieren ──────────────────────────────────────────
  try {
    const sanityBrands = await sanity.fetch<Array<{
      _id: string
      name: string
      slug?: { current?: string }
      order?: number
      logo?: { asset?: { url?: string } }
      center?: { slug?: { current?: string } }
      description?: Array<{ children?: Array<{ text?: string }> }>
    }>>(`*[_type == "brand"] | order(order asc) {
      _id, name, slug, order, logo { asset->{ url } },
      center->{ slug },
      description
    }`)

    for (const b of sanityBrands) {
      const slug = b.slug?.current ?? b.name.toLowerCase().replace(/\s+/g, '-')
      const centerSlug = b.center?.slug?.current ?? 'nutzfahrzeugcenter'
      const descText = b.description?.[0]?.children?.[0]?.text ?? null

      await prisma.brand.upsert({
        where: { slug },
        update: {
          name: b.name,
          centerSlug,
          logoUrl: b.logo?.asset?.url ?? null,
          description: descText,
          order: b.order ?? 0,
        },
        create: {
          slug,
          name: b.name,
          centerSlug,
          logoUrl: b.logo?.asset?.url ?? null,
          description: descText,
          order: b.order ?? 0,
          isActive: true,
        },
      })
    }
    console.log(`✅ ${sanityBrands.length} Marken importiert`)
  } catch (err) {
    console.warn('⚠️  Brand-Import fehlgeschlagen:', err)
  }

  // ─── Salespeople von Sanity importieren ─────────────────────────────────────
  try {
    const sanitySales = await sanity.fetch<Array<{
      _id: string
      firstName: string
      lastName: string
      title?: string
      email?: string
      phone?: string
      photo?: { asset?: { url?: string } }
      centers?: Array<{ slug?: { current?: string } }>
    }>>(`*[_type == "salesperson"] | order(lastName asc) {
      _id, firstName, lastName, title, email, phone,
      photo { asset->{ url } },
      centers[]->{ slug }
    }`)

    for (const s of sanitySales) {
      await prisma.salesperson.upsert({
        where: { id: `sanity_${s._id}` },
        update: {
          firstName: s.firstName,
          lastName: s.lastName,
          title: s.title ?? '',
          email: s.email ?? null,
          phone: s.phone ?? null,
          photoUrl: s.photo?.asset?.url ?? null,
          centerSlug: s.centers?.[0]?.slug?.current ?? null,
        },
        create: {
          id: `sanity_${s._id}`,
          firstName: s.firstName,
          lastName: s.lastName,
          title: s.title ?? '',
          email: s.email ?? null,
          phone: s.phone ?? null,
          photoUrl: s.photo?.asset?.url ?? null,
          centerSlug: s.centers?.[0]?.slug?.current ?? null,
        },
      })
    }
    console.log(`✅ ${sanitySales.length} Verkäufer importiert`)
  } catch (err) {
    console.warn('⚠️  Verkäufer-Import fehlgeschlagen:', err)
  }

  console.log('\n🎉 Seed abgeschlossen!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
