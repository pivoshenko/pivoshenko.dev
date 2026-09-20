import Icon from 'pivoshenko.ui/next/icon'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export const runtime = 'edge'

// the package defaults the corner slice to peach. The site accent is `text`,
// which would paint the slice the same near-white as the icon's ground and
// erase it, so the mark takes the lavender the wordmark carries instead
export default async function SiteIcon() {
  return Icon({ accent: 'lavender' })
}
