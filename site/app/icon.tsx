import Icon from 'pivoshenko.ui/next/icon'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// the package defaults the corner slice to peach; the site accent is blue, so
// the slice matches the wordmark and the nav's accent stub
export default async function SiteIcon() {
  return Icon({ accent: 'blue' })
}
