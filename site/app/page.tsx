import { getAllPosts } from '@/lib/posts'
import { getAllProjectsWithStars } from '@/lib/projects'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from 'pivoshenko.ui'

export default async function Home() {
  const posts = getAllPosts().slice(0, 5)
  const projects = (await getAllProjectsWithStars()).slice(0, 3)

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="type-heading fg-primary">Volodymyr Pivoshenko</h1>
        <p className="type-body fg-body">
          Principal AI/R&D Engineer fascinated by AI, system design, and
          software development.
        </p>
        <p className="type-body fg-body">
          In my current role, I lead the R&D team and work hands-on with
          architecture and implementation. I help turn rough ideas into working
          solutions and keep engineering decisions practical and scalable.
        </p>
        <p className="type-body fg-body">
          In my spare time, I build side projects and contribute to open source.
          It is my space to experiment with new tools and architectures, explore
          ideas, and collaborate with people who care about making things well.
        </p>
        <p className="type-body fg-body">
          Outside of work, I enjoy cycling and playing video games to unwind.
        </p>
      </section>

      <section className="space-y-6">
        <SectionHeader title="recent posts" />

        {posts.length === 0 ? (
          <p className="type-ui fg-subtle">No posts yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-5"
              >
                <span className="type-meta fg-muted w-20 shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="type-ui fg-secondary group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors underline-offset-2 group-hover:underline deco-subtle">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="inline-block type-meta fg-muted hover-secondary transition-colors"
        >
          All posts →
        </Link>
      </section>

      <section className="space-y-6">
        <SectionHeader title="recent projects" />

        {projects.length === 0 ? (
          <p className="type-ui fg-subtle">No projects yet.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5"
                >
                  <span className="type-meta fg-muted w-20 shrink-0 mt-px tabular-nums">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="inline-flex items-center gap-2 align-baseline">
                      <Icon
                        className="w-4 h-4 fg-muted shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="type-ui fg-secondary group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors underline-offset-2 group-hover:underline deco-subtle">
                        {project.title}
                      </span>
                      {typeof project.stars === 'number' && (
                        <span className="inline-flex items-center gap-0.5 type-meta fg-muted tabular-nums">
                          <Star className="w-3 h-3" strokeWidth={1.5} />
                          {project.stars}
                        </span>
                      )}
                    </span>
                    {project.description && (
                      <span className="block type-meta fg-muted mt-0.5">
                        {project.description}
                      </span>
                    )}
                  </span>
                </a>
              )
            })}
          </div>
        )}

        <Link
          href="/projects"
          className="inline-block type-meta fg-muted hover-secondary transition-colors"
        >
          All projects →
        </Link>
      </section>
    </div>
  )
}
