import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

const topics = [
  'distributed systems',
  'typescript',
  'devops & platform',
  'developer tooling',
  'software architecture',
]

export default function Home() {
  const posts = getAllPosts().slice(0, 5)

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Volodymyr Pivoshenko
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg">
          Software engineer focused on distributed systems, platform engineering,
          and developer tooling. Writing about what I build and learn along the
          way.
        </p>
        <p className="text-xs font-mono text-stone-400 dark:text-stone-500">
          {topics.join(' · ')}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500">
          Recent writing
        </h2>

        {posts.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No posts yet.
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-5"
              >
                <span className="font-mono text-xs text-stone-400 dark:text-stone-500 w-20 shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-sm text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors underline-offset-2 group-hover:underline decoration-stone-300 dark:decoration-stone-600">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="inline-block text-xs font-mono text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          All posts →
        </Link>
      </section>
    </div>
  )
}
