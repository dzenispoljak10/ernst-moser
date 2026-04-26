#!/usr/bin/env node
/**
 * Per-page hero candidate detection using page-specific keywords.
 * Common color swatches appear across every page, so we rank by
 * URL/alt keywords that are unique to each variant.
 */
import fs from 'node:fs'

const KEYWORDS = {
  'dmax-single': ['homepage-d-max-single', 'd-max-single', 'dmax-single'],
  'dmax-space': ['homepage-d-max-space', 'd-max-space', 'dmax-space', 'ext-rbb-side'],
  'dmax-crew': ['homepage-d-max-crew', 'd-max-crew', 'dmax-crew', 'eu-lhd-crew-rbb-side'],
  'truck-3-5-ton': ['homepage-truck-3-5-ton', '/m21-', '/m27-', 'm21-t', 'm21-tt', 'm27-crew'],
  'truck-6-7-5-ton': ['homepage-truck-6-7-5-ton', '/m29-', '/m30-', 'm30-crew', 'm29-'],
  'truck-10-14-ton': ['homepage-truck-10-14-ton', '/f10-', '/f11-', '/f14-', 'f10-', 'f11-'],
}

const SRC_WH_RE = /"src":"(https:\/\/www\.isuzu\.[a-z]+\/img\/[a-f0-9-]{36}\/[^"]+?)","width":(\d+),"height":(\d+),"alt":"([^"]*)"/g

function decodeEntities(s) {
  return s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

for (const [slug, kws] of Object.entries(KEYWORDS)) {
  const path = `${process.env.TMP ?? '/tmp'}/isuzu-pages/${slug}.html`
  const raw = fs.readFileSync(path, 'utf8')
  const start = raw.indexOf('data-page="')
  const end = raw.indexOf('">', start)
  const decoded = decodeEntities(raw.slice(start + 11, end)).replace(/\\\//g, '/')

  const entries = []
  let m
  SRC_WH_RE.lastIndex = 0
  while ((m = SRC_WH_RE.exec(decoded))) {
    entries.push({ src: m[1], width: +m[2], height: +m[3], alt: m[4] })
  }

  const hits = entries.filter((e) =>
    kws.some((k) => e.src.toLowerCase().includes(k) || e.alt.toLowerCase().includes(k)),
  )
  // Prefer widest
  hits.sort((a, b) => b.width * b.height - a.width * a.height)

  console.log(`\n=== ${slug} (${hits.length} keyword matches of ${entries.length}) ===`)
  for (const h of hits.slice(0, 4)) {
    console.log(`  ${h.width}x${h.height}  "${h.alt}"  ${h.src.replace('https://www.isuzu.it', '')}`)
  }
}
