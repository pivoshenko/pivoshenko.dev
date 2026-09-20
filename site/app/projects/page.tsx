import { ProjectList } from '@/components/project-list'
import { SiteHero } from '@/components/site-hero'
import { getAllProjectsWithStars } from '@/lib/projects'
import type { Metadata } from 'next'
import { PageBody, SectionHeader } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects, open source, and personal experiments.',
}

export default async function Projects() {
  const projects = await getAllProjectsWithStars()

  const projectsByYear: Record<string, typeof projects> = {}
  for (const project of projects) {
    const year = new Date(project.date).getFullYear().toString()
    projectsByYear[year] = [...(projectsByYear[year] ?? []), project]
  }

  const years = Object.keys(projectsByYear).sort(
    (a, b) => Number(b) - Number(a),
  )

  return (
    <>
      <SiteHero title={<span className="fg-title">Projects</span>} />

      <PageBody className="space-y-12">
        {years.map((year) => (
          <section key={year} className="space-y-2">
            <SectionHeader title={year} count={projectsByYear[year].length} />
            <ProjectList projects={projectsByYear[year]} />
          </section>
        ))}
      </PageBody>
    </>
  )
}
