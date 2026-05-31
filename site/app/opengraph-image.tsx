import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'Volodymyr Pivoshenko'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default createOgImage({
  brand: 'pivoshenko.dev',
  title: 'Volodymyr Pivoshenko',
  subtitle: 'Tech blog',
  domain: 'pivoshenko.dev',
})
