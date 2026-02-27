'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-ui">
      <nav className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="type-logo fg-primary hover:opacity-60 transition-opacity"
        >
          Volodymyr Pivoshenko
        </Link>

        <div className="flex items-center">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`type-ui px-3 py-1.5 rounded transition-colors ${
                  isActive ? 'fg-primary' : 'fg-subtle hover-primary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="ml-1 pl-1 border-l border-ui">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
