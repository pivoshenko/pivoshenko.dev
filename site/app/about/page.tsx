import type { Metadata } from 'next'
import { ArrowLink, PageBody } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Volodymyr Pivoshenko, software engineer.',
}

const links = [
  { label: 'GitHub', href: 'https://github.com/pivoshenko' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pivoshenko' },
]

export default function About() {
  return (
    <PageBody className="space-y-4">
      <div>
        <h1 className="type-heading fg-primary">About</h1>
      </div>

      <div className="space-y-4 type-body fg-body" />

      <div className="space-y-3">
        <h2 className="type-label fg-muted">Links</h2>
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.label}>
              <ArrowLink
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                external
              >
                {link.label}
              </ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </PageBody>
  )
}
