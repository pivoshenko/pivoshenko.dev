import { PostList } from '@/components/post-list'
import { ProjectList } from '@/components/project-list'
import { SiteHero } from '@/components/site-hero'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects, withStars } from '@/lib/projects'
import { ArrowLink, PageBody, SectionHeader } from 'pivoshenko.ui'

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
        lead="Principal AI/ML R&D Engineer fascinated by AI, system design, and software development."
      >
        <div className="type-body fg-body mt-4 space-y-3">
          <p>
            In my current role, I lead the R&D team and work hands-on with
            architecture and implementation. I help turn rough ideas into
            working solutions and keep engineering decisions practical and
            scalable.
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
