This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Produktbilder aktualisieren

Fetch-Scripts für lokale Produktbilder liegen unter `scripts/`:

- `scripts/fetch-isuzu-product-images.mjs` — Isuzu D-Max + Truck (6 Bilder)
- `scripts/fetch-isuzu-category-images.mjs` — Isuzu Kategorien (alternativ)
- `scripts/convert-isuzu-hero.mjs` — Isuzu Hero
- `scripts/convert-hero.js` — Fiat Hero
- `scripts/update-fiat-products.mjs` — Fiat Produktbilder + Sanity-Patch

Alle Scripts schreiben nach `public/images/<brand>/...` und leeren danach den
Next.js-Image-Optimizer-Cache (`.next/dev/cache/images`, `.next/cache/images`)
automatisch.

**Wichtig:** Nach dem Script-Run muss der Dev-Server neu gestartet werden,
damit der In-Memory-Image-Cache ebenfalls flushed:

```bash
# 1. Bilder neu holen + Disk-Cache leeren:
node scripts/fetch-isuzu-product-images.mjs

# 2. Dev-Server bouncen:
# (TaskStop / Ctrl+C, dann)
npm run dev
```

**Warum das nötig ist:** Next.js cached optimierte Bild-Derivate keyed auf
URL + Breite, nicht auf Datei-mtime. Wird eine Datei unter gleichem Pfad
ersetzt, liefert der Optimizer ohne Cache-Clear die alte Version weiter —
bis der Browser das Bild in einer anderen Breite anfordert (z. B. nach
Resize), was aussieht wie „das Bild aktualisiert sich nach Navigation".
Alternative: Dateinamen versionieren (`foo-v2.webp`), dann ist ein Cache-
Clear nicht nötig, weil die URL selbst sich ändert.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
