import { HeroBand } from 'pivoshenko.ui'
import type { ComponentProps } from 'react'

// The layout's `field` prop only reaches the footer - a hero is rendered by the
// page. Pinning the field here keeps every hero on this site in step with that
// footer without each page restating it
type SiteHeroProps = Omit<ComponentProps<typeof HeroBand>, 'field'>

export function SiteHero(props: SiteHeroProps) {
  return <HeroBand field="ascii" {...props} />
}
