import { notFound } from 'next/navigation'
import { readClient as client, imageUrl } from '@/lib/sanity'
import { getSalespersonByBrand } from '@/lib/queries'
import { teamPhotoByName } from '@/lib/serverImages'
import { getIsuzuModel } from '@/lib/isuzu-catalog'
import IsuzuModelHero from './IsuzuModelHero'
import BrandSalespersonSection from '@/components/ui/BrandSalespersonSection'

interface Props {
  categorySlug: string
  modelSlug: string
}

export default async function IsuzuModelPageContent({ categorySlug, modelSlug }: Props) {
  const match = getIsuzuModel(categorySlug, modelSlug)
  if (!match) notFound()
  const { category, model } = match

  const isuzuBrand = await client.fetch<{
    _id: string
    "center": { _id: string; name: string; slug: { current: string }; color: string }
  } | null>(`*[_type=="brand" && slug.current=="isuzu"][0]{
    _id,
    "center": center->{ _id, name, slug, color }
  }`)

  if (!isuzuBrand) notFound()
  const center = isuzuBrand.center

  const sp = await getSalespersonByBrand(isuzuBrand._id, center._id)
  const spPhotoUrl =
    teamPhotoByName(sp?.firstName, sp?.lastName) ??
    (sp?.photo ? imageUrl(sp.photo) : null)

  const mailtoHref = `mailto:${sp?.email ?? 'info@ernst-moser.ch'}?subject=${encodeURIComponent(
    `Ich interessiere mich für Isuzu ${model.title}`,
  )}`

  return (
    <>
      <IsuzuModelHero
        categorySlug={category.slug}
        categoryLabel={category.label}
        modelSlug={model.slug}
        modelTitle={model.title}
        longDescription={model.longDescription}
        imageUrl={model.image}
        externalUrl={model.externalUrl}
        mailtoHref={mailtoHref}
        centerColor={center.color}
      />

      <BrandSalespersonSection
        sp={sp}
        brandName={`Isuzu ${model.title}`}
        center={center}
        centerSlug={center.slug.current}
        photoUrl={spPhotoUrl}
        emailSubject={`Ich interessiere mich für Isuzu ${model.title}`}
        backHref="/nutzfahrzeugcenter/isuzu"
        backLabel="Zurück zu Isuzu"
      />
    </>
  )
}
