import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FontLoader from '@/components/layout/FontLoader'
import ChatBot from '@/components/ChatBot'
import { getLogoAsset } from '@/lib/queries'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ernst Moser GmbH – Nutzfahrzeuge, Kommunal & Motorgeräte',
    template: '%s | Ernst Moser GmbH',
  },
  description:
    'Ernst Moser GmbH – Ihr zuverlässiger Partner für Nutzfahrzeuge, Kommunalfahrzeuge und Motorgeräte in Gerlafingen, Schweiz.',
  openGraph: { siteName: 'Ernst Moser GmbH', locale: 'de_CH' },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logo = await getLogoAsset()
  const logoUrl = logo?.url ?? 'https://test.eprofis.ch/wp-content/uploads/2025/12/Element-3Logo-EMoser.avif'

  return (
    <html
      lang="de"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full`}
    >
      <head>
        <FontLoader />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer logoUrl={logoUrl} />
        <ChatBot />
      </body>
    </html>
  )
}
