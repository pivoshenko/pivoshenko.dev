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
    <header className="w-full border-b border-stone-200 dark:border-stone-800">
      <nav className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-stone-900 dark:text-stone-100 hover:opacity-60 transition-opacity font-mono tracking-tight"
        >
          vp
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
                className={`px-3 py-1.5 text-sm rounded transition-colors ${isActive
                    ? 'text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="ml-1 pl-1 border-l border-stone-200 dark:border-stone-800">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
