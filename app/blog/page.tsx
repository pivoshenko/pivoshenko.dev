import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on software engineering, systems, and tooling.',
}

export default function Blog() {
  const posts = getAllPosts()

  const postsByYear = posts.reduce<Record<string, typeof posts>>(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString()
      return {
        ...acc,
        [year]: [...(acc[year] ?? []), post],
      }
    },
    {},
  )

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Writing
        </h1>
        <p className="mt-1 text-xs font-mono text-stone-400 dark:text-stone-500">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {years.map((year) => (
        <section key={year} className="space-y-5">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 pb-2 border-b border-stone-100 dark:border-stone-800/60">
            {year}
          </h2>

          <div className="space-y-6">
            {postsByYear[year].map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs text-stone-400 dark:text-stone-500 w-12 shrink-0 mt-px tabular-nums">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm text-stone-800 dark:text-stone-200 group-hover:underline underline-offset-2 decoration-stone-300 dark:decoration-stone-600">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                          {post.description}
                        </p>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800/70 text-stone-400 dark:text-stone-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
