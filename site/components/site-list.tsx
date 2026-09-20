import type { Site, SiteAccent } from '@/lib/sites'
import { List, Row } from 'pivoshenko.ui'

// Tailwind scans for whole class names, so the accent cannot be interpolated
const accentText: Record<SiteAccent, string> = {
  peach: 'text-peach',
  lavender: 'text-lavender',
  red: 'text-red',
  mauve: 'text-mauve',
  green: 'text-green',
}

type SiteListProps = {
  sites: Site[]
}

// the icon rides in Row's lead column rather than inside the title: the lead is
// a real grid column, and leaving it empty pushes the title and description
// into it instead
export function SiteList({ sites }: SiteListProps) {
  return (
    <List lead="1.5rem">
      {sites.map((site) => {
        const Icon = site.icon
        const tint = accentText[site.accent]
        return (
          <Row
            key={site.slug}
            href={site.url}
            external
            lead={
              <Icon
                className={`w-4 h-4 ${tint}`}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            }
            title={<span className={tint}>{site.title}</span>}
            desc={site.description}
          />
        )
      })}
    </List>
  )
}
