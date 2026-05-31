import type { NextConfig } from 'next'
import { baseNextConfig } from 'pivoshenko.ui/next/config'

const config: NextConfig = {
  ...baseNextConfig,
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default config
