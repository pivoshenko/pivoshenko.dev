'use client'

import type { Heading } from '@/lib/posts'
import { useEffect, useRef, useState } from 'react'

interface Props {
  headings: Heading[]
}

export function TableOfContents({ headings }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  if (headings.length < 3) return null

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-2 w-64 max-h-72 overflow-y-auto border border-ui bg-stone-50 dark:bg-black">
          <div className="px-3 py-2 border-b border-ui">
            <span className="type-meta fg-muted">Contents</span>
          </div>
          <nav aria-label="Table of contents">
            <ul className="py-1">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-1.5 type-meta fg-subtle hover-secondary transition-colors ${h.level === 3 ? 'pl-6 pr-3' : 'px-3'}`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Table of contents"
        aria-expanded={open}
        className="w-8 h-8 flex items-center justify-center border border-ui fg-muted hover-secondary transition-colors bg-stone-50 dark:bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="12" y2="18" />
        </svg>
      </button>
    </div>
  )
}
