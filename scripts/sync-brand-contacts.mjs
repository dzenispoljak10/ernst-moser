#!/usr/bin/env node
/**
 * Synchronize Nutzfahrzeugcenter brand → salesperson assignments in Sanity
 * to match src/lib/brand-contacts.ts.
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-brand-contacts.mjs --dry   # plan only
 *   node --env-file=.env.local scripts/sync-brand-contacts.mjs         # apply
 *
 * Idempotent: running twice is a no-op.
 */

import { createClient } from '@sanity/client'
import crypto from 'node:crypto'

const DRY = process.argv.includes('--dry')
const LABEL = DRY ? '[DRY] ' : ''

const client = createClient({
  projectId: 'owqsc1ph',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN env var')
  process.exit(1)
}

const ROLAND = 'salesperson-roland-burkhalter'
const MICHAEL = 'salesperson-michael-peter'

const SP_LABEL = {
  [ROLAND]: 'Roland Burkhalter',
  [MICHAEL]: 'Michael Peter',
}

const ASSIGNMENTS = {
  scania: ROLAND,
  dhollandia: ROLAND,
  ut: ROLAND,
  wabco: ROLAND,
  fiat: MICHAEL,
  piaggio: MICHAEL,
  isuzu: MICHAEL,
  hilltip: MICHAEL,
}

async function main() {
  const slugs = Object.keys(ASSIGNMENTS)

  const [brands, michael, nfcCenter] = await Promise.all([
    client.fetch(
      `*[_type=="brand" && slug.current in $slugs]{
        _id, "slug": slug.current,
        "current": salesperson->{_id, firstName, lastName}
      } | order(slug asc)`,
      { slugs },
    ),
    client.fetch(
      `*[_id==$id][0]{_id, centers[]->{_id, "slug": slug.current}}`,
      { id: MICHAEL },
    ),
    client.fetch(`*[_type=="center" && slug.current=="nutzfahrzeugcenter"][0]{_id}`),
  ])

  if (!michael) throw new Error(`Salesperson ${MICHAEL} not found`)
  if (!nfcCenter) throw new Error('Center "nutzfahrzeugcenter" not found')

  const foundSlugs = new Set(brands.map((b) => b.slug))
  for (const slug of slugs) {
    if (!foundSlugs.has(slug)) {
      console.warn(`WARN: brand "${slug}" not found in Sanity — skipping`)
    }
  }

  // 1. Brand → salesperson reference
  for (const brand of brands) {
    const targetId = ASSIGNMENTS[brand.slug]
    const targetLabel = SP_LABEL[targetId]
    const currentId = brand.current?._id
    const currentLabel = brand.current
      ? `${brand.current.firstName} ${brand.current.lastName}`
      : '(unset)'

    if (currentId === targetId) {
      console.log(`${LABEL}${brand.slug}: ${currentLabel} → ${targetLabel} (unchanged)`)
      continue
    }

    console.log(`${LABEL}${brand.slug}: ${currentLabel} → ${targetLabel}`)
    if (!DRY) {
      await client
        .patch(brand._id)
        .set({ salesperson: { _type: 'reference', _ref: targetId } })
        .commit()
    }
  }

  // 2. Michael Peter centers[] — ensure nutzfahrzeugcenter is included
  const currentCenters = (michael.centers ?? []).filter((c) => c && c.slug)
  const currentCenterSlugs = currentCenters.map((c) => c.slug)
  const fmt = (arr) => `[${arr.map((s) => `'${s}'`).join(', ')}]`

  if (currentCenterSlugs.includes('nutzfahrzeugcenter')) {
    console.log(
      `${LABEL}michael-peter.centers: ${fmt(currentCenterSlugs)} (unchanged — already includes nutzfahrzeugcenter)`,
    )
  } else {
    const next = [...currentCenterSlugs, 'nutzfahrzeugcenter']
    console.log(`${LABEL}michael-peter.centers: ${fmt(currentCenterSlugs)} → ${fmt(next)}`)
    if (!DRY) {
      await client
        .patch(MICHAEL)
        .setIfMissing({ centers: [] })
        .append('centers', [
          {
            _type: 'reference',
            _ref: nfcCenter._id,
            _key: crypto.randomUUID(),
          },
        ])
        .commit()
    }
  }

  console.log(DRY ? '\nDry run complete — no writes.' : '\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
