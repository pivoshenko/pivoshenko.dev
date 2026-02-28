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
          R&D/AI/ML Engineering Lead fascinated by AI, system design, and software development.
        </p>
        <p className="type-body fg-body">
          In my current role, I lead the R&D team and work hands-on with architecture and implementation. I help turn rough ideas into working solutions and keep engineering decisions practical and scalable.
        </p>
        <p className="type-body fg-body">
          In my spare time, I build side projects and contribute to open source. It is my space to experiment with new tools and architectures, explore ideas, and collaborate with people who care about making things well.
        </p>
        <p className="type-body fg-body">
          Outside of work, I enjoy cycling and playing video games to unwind.
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
        <h2 className="type-label fg-muted">Recent posts</h2>

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
