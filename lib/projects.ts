import type { LucideIcon } from 'lucide-react'
import { Bot, Palette, Terminal } from 'lucide-react'

export interface Project {
  slug: string
  title: string
  date: string
  description: string
  url: string
  icon: LucideIcon
  tags: string[]
}

const projects: Project[] = [
  {
    slug: 'kasetto',
    title: 'Kasetto',
    date: '2026-03-01',
    description: 'Declarative AI agent environment manager.',
    url: 'https://www.kasetto.dev',
    icon: Terminal,
    tags: ['ai', 'agents', 'claude-code', 'codex', 'skills', 'mcps'],
  },
  {
    slug: 'pivoshenko-ai',
    title: 'pivoshenko.ai',
    date: '2026-03-01',
    description: 'Agents workspace — skills, MCPs, and catalog site.',
    url: 'https://ai.pivoshenko.dev',
    icon: Bot,
    tags: ['ai', 'agents', 'skills', 'mcps', 'claude-code'],
  },
  {
    slug: 'morok',
    title: 'Morok',
    date: '2026-03-01',
    description:
      'Theme focused on minimalism, simplicity, and cross-tool consistency (20+ ports).',
    url: 'https://theme.pivoshenko.dev',
    icon: Palette,
    tags: ['theme', 'design-system'],
  },
]

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
    if (dateDiff !== 0) return dateDiff
    return a.title.localeCompare(b.title)
  })
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) => project.tags.includes(tag))
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>()
  for (const project of projects) {
    for (const tag of project.tags) tags.add(tag)
  }
  return [...tags].sort()
}
