import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-sanity'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
  },
}

export default nextConfig
