const links = [
  { label: 'GitHub', href: 'https://github.com/pivoshenko' },
  { label: 'Twitter', href: 'https://twitter.com/pivoshenko' },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
          © {new Date().getFullYear()} Volodymyr Pivoshenko
        </span>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
