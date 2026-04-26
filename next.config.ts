import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/nutzfahrzeugcenter/ut-aufbauten',
        destination: '/nutzfahrzeugcenter/ut',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
