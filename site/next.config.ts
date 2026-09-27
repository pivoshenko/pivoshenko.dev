import type { NextConfig } from 'next'
import { baseNextConfig } from 'pivoshenko.ui/next/config'

const config: NextConfig = {
  ...baseNextConfig,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // short install URLs proxying the canonical scripts, which live in their own
  // repos - rewrites belong here rather than in vercel.json, where they would
  // replace the framework routing including baseNextConfig's headers
  async rewrites() {
    return [
      {
        source: '/mfp.sh',
        destination:
          'https://raw.githubusercontent.com/pivoshenko/musicforprogramming/main/scripts/install.sh',
      },
    ]
  },
}

export default config
