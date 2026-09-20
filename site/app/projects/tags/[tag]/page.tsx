import { ProjectList } from '@/components/project-list'
import { getAllProjectTags, getProjectsByTag } from '@/lib/projects'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, HeroBand, PageBody, Tag, Tags } from 'pivoshenko.ui'

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

  const tags = getAllProjectTags()

  return (
    <>
      <HeroBand
        field="ascii"
        title={<span className="fg-title">#{decoded}</span>}
        counters={[
          {
            label: projects.length === 1 ? 'project' : 'projects',
            value: projects.length,
          },
        ]}
      >
        <Tags className="mt-6">
          {tags.map((t) => (
            <Tag
              key={t}
              href={`/projects/tags/${encodeURIComponent(t)}`}
              active={t === decoded}
            >
              {t}
            </Tag>
          ))}
        </Tags>
      </HeroBand>

      <PageBody className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Projects', href: '/projects' },
            { label: `#${decoded}` },
          ]}
        />
        <ProjectList projects={projects} />
      </PageBody>
    </>
  )
}
