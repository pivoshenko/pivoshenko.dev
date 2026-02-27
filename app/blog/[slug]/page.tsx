import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostMeta, getPostRawContent, formatDate, readingTime } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostMeta(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  const post = getPostMeta(slug)
  const rawContent = getPostRawContent(slug)

  if (!post || rawContent === null) notFound()

  const { default: MDXContent } = await evaluate(rawContent, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [],
  })

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link
          href="/blog"
          className="inline-block text-xs font-mono text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          ← Blog
        </Link>

        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 font-mono text-xs text-stone-400 dark:text-stone-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(rawContent)}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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
      </header>

      <hr className="border-stone-200 dark:border-stone-800" />

      <div className="prose prose-stone dark:prose-invert prose-sm max-w-none">
        <MDXContent />
      </div>
    </article>
  )
}
