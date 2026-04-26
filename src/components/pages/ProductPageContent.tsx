import { readClient as client, imageUrl } from '@/lib/sanity'
import { productImageBySlug, teamPhotoByName } from '@/lib/serverImages'
import { getSalespersonByBrand } from '@/lib/queries'
import { notFound } from 'next/navigation'
import ProductHeroClient from '@/components/ui/ProductHeroClient'
import HilltipCategoryDetail from '@/components/pages/HilltipCategoryDetail'
import { getHilltipCategory } from '@/lib/hilltip-catalog'
import BrandSalespersonSection from '@/components/ui/BrandSalespersonSection'
import ProductExtraSections from '@/components/product/ProductExtraSections'
import { getProductExtras } from '@/lib/product-extras'

interface PortableBlock {
  _type: string
  children?: Array<{ text: string }>
}

function ptText(blocks?: PortableBlock[]): string {
  if (!blocks?.length) return ''
  return blocks
    .map(b => (b._type === 'block' && b.children) ? b.children.map(c => c.text).join('') : '')
    .join(' ')
    .trim()
}

export default async function ProductPageContent({
  centerSlug,
  brandSlug,
  productSlug,
}: {
  centerSlug: string
  brandSlug: string
  productSlug: string
}) {
  const product = await client.fetch(
    `*[_type == "product"
       && slug.current == $productSlug
       && brand->slug.current == $brandSlug
       && brand->center->slug.current == $centerSlug
    ][0] {
      _id,
      name,
      slug,
      mainImage,
      priceLabel,
      description,
      specs,
      isNew,
      isOccasion,
      "brandId": brand._ref,
      "brandName": brand->name,
      "brandSlug": brand->slug.current,
      "brandHeroImage": brand->heroImage,
      "brandImages": brand->images,
      "center": brand->center->{ _id, name, slug, color }
    }`,
    { centerSlug, brandSlug, productSlug }
  )

  if (!product) notFound()

  const center = product.center
  const sp = await getSalespersonByBrand(product.brandId, center._id)

  // Image: local slug file → product main → brand hero → brand first image → null
  const productImageUrl =
    productImageBySlug(productSlug) ??
    (product.mainImage ? imageUrl(product.mainImage) : null) ??
    (product.brandHeroImage ? imageUrl(product.brandHeroImage) : null) ??
    (product.brandImages?.[0] ? imageUrl(product.brandImages[0]) : null) ??
    null

  // Lokales Team-Foto (z. B. /images/team/adrian-moser.webp) wird bevorzugt;
  // fällt auf das Sanity-Asset zurück, wenn keine lokale Datei vorhanden ist.
  const spPhotoUrl =
    teamPhotoByName(sp?.firstName, sp?.lastName) ??
    (sp?.photo ? imageUrl(sp.photo) : null)

  const descriptionText = ptText(product.description)
  const specs = (product.specs ?? []) as Array<{ label: string; value: string }>

  // Hilltip-Kategorien rendern eine eigene reichhaltige Detail-Seite mit Highlights.
  const hilltipCategory = getHilltipCategory(productSlug)

  // Optionale Zusatz-Sections + Produkt-Video (nur für Produkte mit verifizierten Infos)
  const extras = getProductExtras(productSlug)

  return (
    <>
      {/* ═══ Section 1: Product Hero ══════════════════════════════ */}
      {hilltipCategory ? (
        <HilltipCategoryDetail
          category={hilltipCategory}
          brandName={product.brandName}
          brandSlug={product.brandSlug}
          centerName={center.name}
          centerSlug={centerSlug}
          centerColor={center.color}
        />
      ) : (
        <ProductHeroClient
          productName={product.name}
          productSlug={productSlug}
          brandName={product.brandName}
          brandSlug={product.brandSlug}
          centerName={center.name}
          centerSlug={centerSlug}
          centerColor={center.color}
          imageUrl={productImageUrl}
          descriptionText={descriptionText}
          specs={specs}
          priceLabel={product.priceLabel ?? null}
          isNew={product.isNew}
          isOccasion={product.isOccasion}
          salespersonEmail={sp?.email ?? 'info@ernst-moser.ch'}
        />
      )}

      {/* ═══ Section 2: Persönliche Beratung — direkt nach CTA ════ */}
      <BrandSalespersonSection
        sp={sp}
        brandName={product.name}
        center={center}
        centerSlug={centerSlug}
        photoUrl={spPhotoUrl}
        emailSubject={`Ich interessiere mich für ${product.name}`}
        backHref={`/${centerSlug}/${product.brandSlug}`}
        backLabel={`Zurück zu ${product.brandName}`}
      />

      {/* ═══ Section 3: Optionale Zusatz-Sections + Produkt-Video ═ */}
      {extras && !hilltipCategory && (
        <ProductExtraSections
          extras={extras}
          brandName={product.brandName}
          productName={product.name}
          centerColor={center.color}
        />
      )}
    </>
  )
}
