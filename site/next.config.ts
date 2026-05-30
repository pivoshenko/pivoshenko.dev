import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['pivoshenko.ui'],
}

export default config
