import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="space-y-4">
      <p className="type-meta fg-muted">404</p>
      <h1 className="type-heading fg-primary">Post not found</h1>
      <p className="type-body fg-subtle">
        This post doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/blog"
        className="inline-block type-meta fg-muted hover-secondary transition-colors"
      >
        ← Back to blog
      </Link>
    </div>
  )
}
