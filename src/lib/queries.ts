import { client } from './sanity'

export interface SanityCenter {
  _id: string
  name: string
  slug: { current: string }
  color: string
  description?: string
  heroImage?: SanityImage
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number }
}

export interface SanityBrand {
  _id: string
  name: string
  slug: { current: string }
  logo?: SanityImage
  center: {
    _id: string
    slug: { current: string }
    color: string
  }
  order?: number
}

export interface SanityMenuCategory {
  _id: string
  title: string
  icon?: string
  center: {
    _id: string
    slug: { current: string }
    color: string
  }
  links?: Array<{ label: string; href: string }>
  order?: number
}

export interface SanityAsset {
  _id: string
  url: string
  originalFilename: string
}

// Fetch all centers
export async function getCenters(): Promise<SanityCenter[]> {
  return client.fetch(`*[_type == "center"] | order(name asc) {
    _id, name, slug, color, description, heroImage
  }`)
}

// Fetch all brands grouped by center
export async function getBrandsByCenter(): Promise<Record<string, SanityBrand[]>> {
  const brands: SanityBrand[] = await client.fetch(`
    *[_type == "brand"] | order(order asc, name asc) {
      _id, name, slug, logo,
      center->{ _id, slug, color }
    }
  `)

  const grouped: Record<string, SanityBrand[]> = {}
  for (const brand of brands) {
    const centerId = brand.center._id
    if (!grouped[centerId]) grouped[centerId] = []
    grouped[centerId].push(brand)
  }
  return grouped
}

// Fetch menu categories for all centers
export async function getMenuCategories(): Promise<SanityMenuCategory[]> {
  return client.fetch(`
    *[_type == "menuCategory"] | order(order asc) {
      _id, title, icon, links,
      center->{ _id, slug, color }
    }
  `)
}

// Fetch logo asset by filename
export async function getLogoAsset(): Promise<SanityAsset | null> {
  const result = await client.fetch(`
    *[_type == "sanity.imageAsset" && originalFilename match "Element-3Logo-EMoser*"][0] {
      _id, url, originalFilename
    }
  `)
  return result || null
}

// Fetch complete header data (centers + brands + menu categories)
export async function getHeaderData() {
  const [centers, menuCategories] = await Promise.all([
    getCenters(),
    getMenuCategories(),
  ])

  const brands: SanityBrand[] = await client.fetch(`
    *[_type == "brand"] | order(order asc, name asc) {
      _id, name, slug, logo,
      center->{ _id, slug, color }
    }
  `)

  const brandsByCenter: Record<string, SanityBrand[]> = {}
  for (const brand of brands) {
    const centerId = brand.center._id
    if (!brandsByCenter[centerId]) brandsByCenter[centerId] = []
    brandsByCenter[centerId].push(brand)
  }

  const menuCatsByCenter: Record<string, SanityMenuCategory[]> = {}
  for (const cat of menuCategories) {
    const centerId = cat.center._id
    if (!menuCatsByCenter[centerId]) menuCatsByCenter[centerId] = []
    menuCatsByCenter[centerId].push(cat)
  }

  return { centers, brandsByCenter, menuCatsByCenter }
}

// Salesperson
export interface SanitySalesperson {
  _id: string
  firstName: string
  lastName: string
  title?: string
  phone?: string
  email?: string
  photo?: SanityImage
  centers?: Array<{ _id: string; name: string; slug: { current: string } }>
}

export async function getSalespersonsByCenter(centerId: string): Promise<SanitySalesperson[]> {
  return client.fetch(
    `*[_type == "salesperson" && $centerId in centers[]._ref] {
      _id, firstName, lastName, title, phone, email, photo,
      centers[]->{ _id, name, slug }
    }`,
    { centerId }
  )
}

export async function getSalespersonByBrand(brandId: string, centerId: string): Promise<SanitySalesperson | null> {
  // First try brand-specific salesperson
  const brandSp = await client.fetch<SanitySalesperson | null>(
    `*[_type == "brand" && _id == $brandId][0].salesperson->{ _id, firstName, lastName, title, phone, email, photo }`,
    { brandId }
  )
  if (brandSp?._id) return brandSp

  // Fallback to center salesperson
  const centerSps = await getSalespersonsByCenter(centerId)
  return centerSps[0] ?? null
}

// Team Member
export interface SanityTeamMember {
  _id: string
  firstName: string
  lastName: string
  role: string
  photo?: SanityImage
  email?: string
  phone?: string
  order?: number
  isActive?: boolean
  center?: {
    _id: string
    name: string
    slug: { current: string }
    color: string
  }
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(`
    *[_type == "teamMember" && isActive != false] | order(order asc, lastName asc) {
      _id, firstName, lastName, role, photo, email, phone, order, isActive,
      center->{ _id, name, slug, color }
    }
  `)
}

// All brands (for homepage brands wall)
export async function getAllBrands(): Promise<SanityBrand[]> {
  return client.fetch(`
    *[_type == "brand"] | order(order asc, name asc) {
      _id, name, slug, logo,
      center->{ _id, name, slug, color }
    }
  `)
}
