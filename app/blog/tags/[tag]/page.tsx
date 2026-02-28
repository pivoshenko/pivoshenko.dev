import { getAllPosts, getPostsByTag } from '@/lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((p) => p.tags))
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded}`,
    description: `Posts tagged with ${decoded}.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  if (posts.length === 0) notFound()

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/blog"
          className="inline-block type-meta fg-muted hover-secondary transition-colors"
        >
          ← Blog
        </Link>
        <h1 className="mt-4 type-heading fg-primary">#{decoded}</h1>
        <p className="mt-1 type-meta fg-muted">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
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
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/blog/tags/${encodeURIComponent(t)}`}
                        className={`type-meta px-1.5 py-0.5 rounded transition-colors ${
                          t === decoded
                            ? 'bg-tag-active fg-secondary'
                            : 'bg-tag fg-muted hover-secondary'
                        }`}
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
