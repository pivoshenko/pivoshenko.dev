import { getAllPostTags, getAllPosts } from '@/lib/posts'
import { getAllProjectTags } from '@/lib/projects'
import type { MetadataRoute } from 'next'

const url = 'https://pivoshenko.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const posts = getAllPosts()

  const fixed: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${url}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${url}/sites`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${url}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // a post's own date is its last meaningful change, unlike the index pages
  const entries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  // tags are encoded in the route, so encode them here too or the two disagree
  const tags: MetadataRoute.Sitemap = [
    ...getAllPostTags().map(
      (tag) => `${url}/blog/tags/${encodeURIComponent(tag)}`,
    ),
    ...getAllProjectTags().map(
      (tag) => `${url}/projects/tags/${encodeURIComponent(tag)}`,
    ),
  ].map((loc) => ({
    url: loc,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }))

  return [...fixed, ...entries, ...tags]
}
