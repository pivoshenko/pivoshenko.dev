import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on AI, engineering, systems, and tooling.',
}

export default function Blog() {
  const posts = getAllPosts()

  const postsByYear: Record<string, typeof posts> = {}
  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString()
    postsByYear[year] = [...(postsByYear[year] ?? []), post]
  }

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="space-y-12">
      <div>
        <h1 className="type-heading fg-primary">Posts</h1>
        <p className="mt-1 type-meta fg-muted">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {years.map((year) => (
        <section key={year} className="space-y-5">
          <h2 className="type-label fg-muted pb-2 border-b border-faint">
            {year}
          </h2>

          <div className="space-y-6">
            {postsByYear[year].map((post) => (
              <article key={post.slug}>
                <div className="flex items-start gap-5">
                  <span className="type-meta fg-muted w-12 shrink-0 mt-px tabular-nums">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <div className="space-y-1.5 min-w-0">
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <h3 className="type-ui fg-title group-hover:underline underline-offset-2 deco-subtle">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="type-caption fg-subtle mt-0.5">
                          {post.description}
                        </p>
                      )}
                    </Link>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tags/${encodeURIComponent(tag)}`}
                            className="type-meta px-1.5 py-0.5 rounded bg-tag fg-muted hover-secondary transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
