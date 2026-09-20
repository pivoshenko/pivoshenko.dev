import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'pivoshenko.dev'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default createOgImage({
  brand: 'Volodymyr Pivoshenko',
  title: 'Blog',
  subtitle:
    'Notes on software engineering, distributed systems and developer tooling',
  domain: 'pivoshenko.dev',
  accent: 'blue',
})
