import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface Post extends PostMeta {
  rawContent: string
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDir)

  return filenames
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDir, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: (data.description as string) || '',
        tags: (data.tags as string[]) || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const fullPath = path.join(postsDir, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: (data.description as string) || '',
      tags: (data.tags as string[]) || [],
    }
  } catch {
    return null
  }
}

export function getPostRawContent(slug: string): string | null {
  try {
    const fullPath = path.join(postsDir, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content } = matter(fileContents)
    return content
  } catch {
    return null
  }
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export interface Heading {
  level: number
  text: string
  id: string
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim()
}

export function extractHeadings(content: string): Heading[] {
  return content
    .split('\n')
    .flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (!match) return []
      const level = match[1].length
      const text = stripInlineMarkdown(match[2])
      return [{ level, text, id: slugify(text) }]
    })
}
