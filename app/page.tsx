import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts().slice(0, 5)
  const topics = [...new Set(getAllPosts().flatMap((p) => p.tags))].sort()

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="type-heading fg-primary">Volodymyr Pivoshenko</h1>
        <p className="type-body fg-body">
          Software engineer focused on distributed systems, platform
          engineering, and developer tooling. Writing about what I build and
          learn along the way.
        </p>
        <p className="type-meta fg-muted">
          {topics.map((topic, i) => (
            <span key={topic}>
              {i > 0 && ' · '}
              <Link
                href={`/blog/tags/${encodeURIComponent(topic)}`}
                className="hover-secondary transition-colors"
              >
                {topic}
              </Link>
            </span>
          ))}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="type-label fg-muted">Recent writing</h2>

        {posts.length === 0 ? (
          <p className="type-ui fg-subtle">No posts yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-5"
              >
                <span className="type-meta fg-muted w-20 shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="type-ui fg-secondary group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors underline-offset-2 group-hover:underline deco-subtle">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="inline-block type-meta fg-muted hover-secondary transition-colors"
        >
          All posts →
        </Link>
      </section>
    </div>
  )
}
