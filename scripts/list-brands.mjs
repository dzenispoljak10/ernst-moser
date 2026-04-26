import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'owqsc1ph', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: process.env.SANITY_TOKEN })
const r = await client.fetch(`*[_type=="brand" && slug.current in ["isuzu","swardman","pudu-robotics"]]{ "slug": slug.current, name, "center": center->slug.current }`)
for (const b of r) console.log(`${b.slug} → center: ${b.center} (${b.name})`)
