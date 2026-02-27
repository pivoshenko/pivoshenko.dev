import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-mono text-stone-400 dark:text-stone-500">404</p>
      <h1 className="text-base font-semibold text-stone-900 dark:text-stone-100">
        Post not found
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        This post doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/blog"
        className="inline-block text-xs font-mono text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
      >
        ← Back to blog
      </Link>
    </div>
  )
}
