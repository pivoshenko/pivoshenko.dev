import { PostList } from '@/components/post-list'
import { ProjectList } from '@/components/project-list'
import { SiteHero } from '@/components/site-hero'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects, withStars } from '@/lib/projects'
import { Mail } from 'lucide-react'
import {
  ArrowLink,
  GitHubMark,
  LinkedInMark,
  PageBody,
  SectionHeader,
} from 'pivoshenko.ui'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/pivoshenko',
    blank: true,
    icon: <GitHubMark />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pivoshenko',
    blank: true,
    icon: <LinkedInMark />,
  },
  {
    label: 'Email',
    href: 'mailto:contact@pivoshenko.dev',
    blank: false,
    icon: <Mail className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
  },
]

export default async function Home() {
  const posts = getAllPosts().slice(0, 5)
  const projects = await withStars(getAllProjects().slice(0, 1))

  return (
    <>
      <SiteHero
        title={
          <>
            <span className="fg-title">Volodymyr </span>
            <span className="text-lavender">Pivoshenko</span>
          </>
        }
        lead="Principal AI/ML R&D Engineer fascinated by system design and software development."
      >
        <div className="type-body fg-body mt-4 space-y-3">
          <p>
            In my current role, I own the architecture of the AI/ML platform and
            lead an R&D team, working hands-on with design and implementation. I
            help turn rough ideas into working solutions and keep engineering
            decisions practical and scalable.
          </p>
          <p>
            In my spare time, I build side projects and contribute to open
            source. It is my space to experiment with new tools and
            architectures, explore ideas, and collaborate with people who care
            about making things well.
          </p>
          <p>
            Outside of work, I enjoy cycling and playing video games to unwind.
          </p>
        </div>

        <div className="mt-6 -ml-2 flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(link.blank && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="inline-flex items-center justify-center rounded-md p-2 fg-subtle hover-primary transition-colors duration-fast focus-ring"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </SiteHero>

      <PageBody className="space-y-12">
        <section className="space-y-2">
          <SectionHeader
            title="Recent posts"
            action={<ArrowLink href="/blog">All posts</ArrowLink>}
          />
          {posts.length === 0 ? (
            <p className="type-ui fg-subtle">No posts yet.</p>
          ) : (
            <PostList posts={posts} />
          )}
        </section>

        <section className="space-y-2">
          <SectionHeader
            title="Recent projects"
            action={<ArrowLink href="/projects">All projects</ArrowLink>}
          />
          {projects.length === 0 ? (
            <p className="type-ui fg-subtle">No projects yet.</p>
          ) : (
            <ProjectList projects={projects} />
          )}
        </section>
      </PageBody>
    </>
  )
}
