import { PostList } from '@/components/post-list'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import { HeroBand, PageBody, SectionHeader } from 'pivoshenko.ui'

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
    <>
      <HeroBand field="ascii" title={<span className="fg-title">Posts</span>} />

      <PageBody className="space-y-12">
        {years.map((year) => (
          <section key={year} className="space-y-2">
            <SectionHeader title={year} count={postsByYear[year].length} />
            <PostList posts={postsByYear[year]} />
          </section>
        ))}
      </PageBody>
    </>
  )
}
