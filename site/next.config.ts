import type { NextConfig } from 'next'
import { baseNextConfig } from 'pivoshenko.ui/next/config'

const config: NextConfig = {
  ...baseNextConfig,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // next dev otherwise writes its own CLAUDE.md and AGENTS.md into site/,
  // shadowing the single pair this repo keeps at the root
  agentRules: false,
}

export default config
