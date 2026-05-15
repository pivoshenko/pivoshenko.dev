import { getAllProjects } from '@/lib/projects'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects, open source, and personal experiments.',
}

export default function Projects() {
  const projects = getAllProjects()

  const projectsByYear: Record<string, typeof projects> = {}
  for (const project of projects) {
    const year = new Date(project.date).getFullYear().toString()
    projectsByYear[year] = [...(projectsByYear[year] ?? []), project]
  }

  const years = Object.keys(projectsByYear).sort(
    (a, b) => Number(b) - Number(a),
  )

  return (
    <div className="space-y-12">
      <div>
        <h1 className="type-heading fg-primary">Projects</h1>
        <p className="mt-1 type-meta fg-muted">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      {years.map((year) => (
        <section key={year} className="space-y-5">
          <SectionHeader title={year} count={projectsByYear[year].length} />

          <div className="space-y-6">
            {projectsByYear[year].map((project) => {
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
                          {project.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/projects/tags/${encodeURIComponent(tag)}`}
                              className="inline-flex items-center font-mono text-xs px-1.5 py-0.5 rounded bg-tag fg-muted hover-secondary transition-colors"
                            >
                              {tag}
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
        </section>
      ))}
    </div>
  )
}
