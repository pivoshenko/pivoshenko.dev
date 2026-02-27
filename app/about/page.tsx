import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Volodymyr Pivoshenko — software engineer.',
}

const links = [
  { label: 'GitHub', href: 'https://github.com/pivoshenko' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pivoshenko' },
]

export default function About() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="type-heading fg-primary">About</h1>
      </div>

      <div className="space-y-4 type-body fg-body">
        <p>
          Hi, I&apos;m Volodymyr — a software engineer focused on distributed
          systems, developer tooling, and platform engineering.
        </p>
        <p>
          I write about what I build and learn: TypeScript, DevOps, software
          architecture, and the intersection of engineering and systems
          thinking.
        </p>
        <p>
          This blog is my corner of the internet for sharing ideas, documenting
          experiments, and putting thoughts into words.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="type-label fg-muted">Links</h2>
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="type-ui fg-secondary hover:underline underline-offset-2 deco-subtle"
              >
                {link.label} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
