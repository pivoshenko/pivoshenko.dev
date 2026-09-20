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
import { notFound } from 'next/navigation'
import {
  HeroBand,
  PageBody,
  Prose,
  TableOfContents,
  type TocItem,
} from 'pivoshenko.ui'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

// a post with only a heading or two does not earn a table of contents
const TOC_MIN = 3

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

  const toc: TocItem[] = extractHeadings(rawContent).map((heading) => ({
    id: heading.id,
    label: heading.text,
    level: heading.level === 3 ? 3 : 2,
  }))

  const { default: MDXContent } = await evaluate(rawContent, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [rehypeHeadingIds],
  })

  const showToc = toc.length >= TOC_MIN

  return (
    <>
      <HeroBand
        field="ascii"
        title={<span className="fg-title">{post.title}</span>}
        lead={post.description || undefined}
      >
        <div className="mt-4 flex flex-wrap items-center gap-2 type-meta fg-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(rawContent)}</span>
        </div>
      </HeroBand>

      <PageBody>
        {/* the rail column is only declared when a TOC actually fills it,
            otherwise a post with too few headings renders against 14rem of
            nothing and its measure sits off to the left */}
        <div
          className={
            showToc
              ? 'grid gap-10 lg:grid-cols-[minmax(0,76ch)_14rem] lg:justify-center'
              : ''
          }
        >
          <article>
            <Prose className="mx-auto">
              <MDXContent />
            </Prose>
          </article>

          {showToc && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} sticky />
            </aside>
          )}
        </div>
      </PageBody>
    </>
  )
}
