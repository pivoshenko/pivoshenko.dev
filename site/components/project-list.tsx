import type { ProjectWithStars } from '@/lib/projects'
import { Star } from 'lucide-react'
import { List, Row } from 'pivoshenko.ui'

type ProjectListProps = {
  projects: ProjectWithStars[]
}

// every project links off-site, so the rows keep Row's plain anchor and take
// the external treatment rather than the router link the post list needs
export function ProjectList({ projects }: ProjectListProps) {
  return (
    <List lead="7rem">
      {projects.map((project) => {
        const Icon = project.icon
        return (
          <Row
            key={project.slug}
            href={project.url}
            external
            lead={new Date(project.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            title={
              <span className="inline-flex items-center gap-2">
                <Icon
                  className="w-4 h-4 fg-muted shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {project.title}
              </span>
            }
            desc={project.description}
            trail={
              typeof project.stars === 'number' ? (
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Star
                    className="w-3 h-3 text-yellow"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {project.stars}
                </span>
              ) : undefined
            }
          />
        )
      })}
    </List>
  )
}
