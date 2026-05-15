import { getAllProjectTags, getProjectsByTag } from '@/lib/projects'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllProjectTags().map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded}`,
    description: `Projects tagged with ${decoded}.`,
  }
}

export default async function ProjectTagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const projects = getProjectsByTag(decoded)

  if (projects.length === 0) notFound()

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/projects"
          className="inline-block type-meta fg-muted hover-secondary transition-colors"
        >
          ← Projects
        </Link>
        <h1 className="mt-4 type-heading fg-primary">#{decoded}</h1>
        <p className="mt-1 type-meta fg-muted">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <article key={project.slug}>
              <div className="flex items-start gap-5">
                <span className="type-meta fg-muted w-12 shrink-0 mt-px tabular-nums">
                  {new Date(project.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <div className="space-y-1.5 min-w-0">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Icon
                        className="w-4 h-4 fg-muted shrink-0"
                        strokeWidth={1.5}
                      />
                      <h3 className="type-ui fg-title group-hover:underline underline-offset-2 deco-subtle">
                        {project.title}
                      </h3>
                    </div>
                    {project.description && (
                      <p className="type-caption fg-subtle mt-0.5">
                        {project.description}
                      </p>
                    )}
                  </a>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((t) => (
                        <Link
                          key={t}
                          href={`/projects/tags/${encodeURIComponent(t)}`}
                          className="inline-flex items-center font-mono text-xs px-1.5 py-0.5 rounded bg-tag fg-muted hover-secondary transition-colors"
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
