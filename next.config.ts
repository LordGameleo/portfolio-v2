import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // required for static export
  experimental: {
    optimizeCss: true, // inline critical CSS, defer rest → removes render-blocking
  },
}

export default nextConfig
