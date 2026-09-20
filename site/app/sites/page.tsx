import { SiteHero } from '@/components/site-hero'
import { SiteList } from '@/components/site-list'
import { sites } from '@/lib/sites'
import type { Metadata } from 'next'
import { PageBody } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'Sites',
  description: 'The pivoshenko family of sites and configuration repositories.',
}

export default function Sites() {
  return (
    <>
      <SiteHero
        title={<span className="fg-title">Sites</span>}
        lead="One family of sites, each with its own accent and the same design system underneath."
      />

      <PageBody>
        <SiteList sites={sites} />
      </PageBody>
    </>
  )
}
