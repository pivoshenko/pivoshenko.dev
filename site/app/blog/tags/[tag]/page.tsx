import { PostList } from '@/components/post-list'
import { SiteHero } from '@/components/site-hero'
import { getAllPostTags, getAllPosts, getPostsByTag } from '@/lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, PageBody, Tag, Tags } from 'pivoshenko.ui'

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

  const tags = getAllPostTags()

  return (
    <>
      <SiteHero
        title={<span className="fg-title">#{decoded}</span>}
        counters={[
          {
            label: posts.length === 1 ? 'post' : 'posts',
            value: posts.length,
          },
        ]}
      >
        <Tags className="mt-6">
          {tags.map((t) => (
            <Tag
              key={t}
              href={`/blog/tags/${encodeURIComponent(t)}`}
              active={t === decoded}
            >
              {t}
            </Tag>
          ))}
        </Tags>
      </SiteHero>

      <PageBody className="space-y-6">
        <Breadcrumb
          items={[{ label: 'Blog', href: '/blog' }, { label: `#${decoded}` }]}
        />
        <PostList posts={posts} />
      </PageBody>
    </>
  )
}
