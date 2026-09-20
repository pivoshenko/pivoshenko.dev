'use client'

import type { PostMeta } from '@/lib/posts'
import Link from 'next/link'
import { List, Row } from 'pivoshenko.ui'

type PostListProps = {
  posts: PostMeta[]
}

// next/link rather than the plain anchor Row defaults to, so a post opens as a
// client navigation. The 'use client' above is what lets Link cross into List:
// a component reference cannot be handed from a server component to a client one
export function PostList({ posts }: PostListProps) {
  return (
    <List as={Link} lead="7rem">
      {posts.map((post) => (
        <Row
          key={post.slug}
          href={`/blog/${post.slug}`}
          lead={new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
          title={post.title}
          desc={post.description}
        />
      ))}
    </List>
  )
}
