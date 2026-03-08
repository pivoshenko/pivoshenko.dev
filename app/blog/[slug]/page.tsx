import { TableOfContents } from '@/components/table-of-contents'
import {
  extractHeadings,
  formatDate,
  getAllPosts,
  getPostMeta,
  getPostRawContent,
  readingTime,
  slugify,
} from '@/lib/posts'
import { evaluate } from '@mdx-js/mdx'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

function rehypeHeadingIds() {
  return (tree: { children: unknown[] }) => {
    walk(tree)
  }
}

function walk(node: unknown): void {
  if (!node || typeof node !== 'object') return
  const n = node as Record<string, unknown>
  if (
    n.type === 'element' &&
    (n.tagName === 'h2' || n.tagName === 'h3') &&
    Array.isArray(n.children)
  ) {
    const text = extractText(n.children)
    n.properties = { ...(n.properties as object), id: slugify(text) }
  }
  if (Array.isArray(n.children)) {
    for (const child of n.children) walk(child)
  }
}

function extractText(nodes: unknown[]): string {
  return nodes
    .map((n) => {
      if (!n || typeof n !== 'object') return ''
      const node = n as Record<string, unknown>
      if (node.type === 'text') return node.value as string
      if (node.type === 'element' && Array.isArray(node.children)) {
        return extractText(node.children)
      }
      return ''
    })
    .join('')
}

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

  const headings = extractHeadings(rawContent)

  const { default: MDXContent } = await evaluate(rawContent, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [rehypeHeadingIds],
  })

  return (
    <>
      <TableOfContents headings={headings} />
      <article className="space-y-10">
        <header className="space-y-4">
          <Link
            href="/blog"
            className="inline-block type-meta fg-muted hover-secondary transition-colors"
          >
            ← Blog
          </Link>

          <h1 className="type-post-heading fg-primary">{post.title}</h1>

          <div className="flex items-center gap-2 type-meta fg-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{readingTime(rawContent)}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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
        </header>

        <hr className="border-ui" />

        <div className="prose prose-stone dark:prose-invert prose-sm max-w-none">
          <MDXContent />
        </div>
      </article>
    </>
  )
}
