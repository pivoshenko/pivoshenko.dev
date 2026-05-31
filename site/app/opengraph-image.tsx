import {
  createOgImage,
  ogContentType,
  ogRuntime,
  ogSize,
} from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'Volodymyr Pivoshenko'
export const size = ogSize
export const contentType = ogContentType
export const runtime = ogRuntime

export default createOgImage({
  brand: 'pivoshenko.dev',
  title: 'Volodymyr Pivoshenko',
  subtitle: 'Tech blog',
  domain: 'pivoshenko.dev',
})
