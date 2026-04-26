// Verifies URL generation against spec. Replicates the fiat-models.ts
// lookup tables so this runs as plain Node ESM.
const FIAT_MODEL_IDS = {
  'scudo': 'Scudo',
  'e-scudo': 'E-Scudo',
  'doblo': 'Doblò',
  'e-doblo': 'E-Doblò',
  'ducato': 'Ducato',
  'e-ducato': 'E-Ducato',
  'ulysse': 'Ulysse',
  'e-ulysse': 'E-Ulysse',
  'chassis-cab-pickup': 'Chassis Cab & Pickup',
}

const PRODUCT_SLUG_TO_MODEL = {
  'fiat-scudo': 'scudo',
  'fiat-e-scudo': 'e-scudo',
  'fiat-dobl': 'doblo',
  'fiat-e-dobl': 'e-doblo',
  'fiat-ducato': 'ducato',
  'fiat-e-ducato': 'e-ducato',
  'fiat-ulysse': 'ulysse',
  'fiat-e-ulysse': 'e-ulysse',
  'fiat-ducato-chassis': 'chassis-cab-pickup',
}

function getFiatQuoteUrlForProduct(productSlug) {
  const modelSlug = PRODUCT_SLUG_TO_MODEL[productSlug]
  if (!modelSlug) return null
  const mId = FIAT_MODEL_IDS[modelSlug]
  return `https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=${encodeURIComponent(mId)}`
}

const EXPECTED = {
  'fiat-scudo':          'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=Scudo',
  'fiat-e-scudo':        'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=E-Scudo',
  'fiat-dobl':           'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=Dobl%C3%B2',
  'fiat-e-dobl':         'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=E-Dobl%C3%B2',
  'fiat-ducato':         'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=Ducato',
  'fiat-e-ducato':       'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=E-Ducato',
  'fiat-ulysse':         'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=Ulysse',
  'fiat-e-ulysse':       'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=E-Ulysse',
  'fiat-ducato-chassis': 'https://ernst-moser.garage.fiatprofessional.ch/forms/request_quote/?mId=Chassis%20Cab%20%26%20Pickup',
}

let pass = 0, fail = 0
for (const [slug, expected] of Object.entries(EXPECTED)) {
  const actual = getFiatQuoteUrlForProduct(slug)
  const ok = actual === expected
  console.log(`${ok ? '✅' : '❌'} ${slug.padEnd(22)} → ${actual}`)
  if (!ok) console.log(`   expected: ${expected}`)
  ok ? pass++ : fail++
}
console.log(`\n${pass}/${pass + fail} urls match spec`)
process.exit(fail ? 1 : 0)
