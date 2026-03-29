#!/bin/bash
set -e

echo "=== Ernst Moser DB Setup ==="

echo "→ Pulling latest Vercel env vars..."
vercel env pull .env.local --yes

echo "→ Generating Prisma client..."
npx prisma generate

echo "→ Pushing schema to database..."
npx prisma db push

echo "→ Seeding admin user and data..."
npx tsx prisma/seed.ts

echo ""
echo "✅ Setup complete!"
echo ""
echo "Login: admin@ernst-moser.ch / EM12345"
echo "Dashboard: https://ernst-moser.vercel.app/admin"
