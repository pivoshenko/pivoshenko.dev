import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpCircle,
  Bot,
  LayoutGrid,
  Palette,
  Plug,
  Terminal,
} from 'lucide-react'

export interface Project {
  slug: string
  title: string
  date: string
  description: string
  url: string
  icon: LucideIcon
  tags: string[]
  /** GitHub `owner/name`, used to fetch star count. */
  repo?: string
}

export interface ProjectWithStars extends Project {
  stars?: number
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
    repo: 'pivoshenko/kasetto',
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
    title: 'Morok & Popil',
    date: '2026-03-01',
    description:
      'Themes focused on minimalism, simplicity, and cross-tool consistency (20+ ports).',
    url: 'https://theme.pivoshenko.dev',
    icon: Palette,
    tags: ['theme', 'design-system'],
  },
  {
    slug: 'uv-upsync',
    title: 'uv-upsync',
    date: '2025-07-10',
    description:
      'uv tool for automated dependency updates and version bumping in pyproject.toml.',
    url: 'https://github.com/pivoshenko/uv-upsync',
    icon: ArrowUpCircle,
    tags: ['python', 'uv', 'cli', 'dependencies'],
    repo: 'pivoshenko/uv-upsync',
  },
  {
    slug: 'catppuccin-startpage',
    title: 'Catppuccin Startpage',
    date: '2023-09-10',
    description:
      'Minimal, customizable startpage featured in the Catppuccin organization.',
    url: 'https://github.com/pivoshenko/catppuccin-startpage',
    icon: LayoutGrid,
    tags: ['startpage', 'theme', 'catppuccin'],
    repo: 'pivoshenko/catppuccin-startpage',
  },
  {
    slug: 'poetry-plugin-dotenv',
    title: 'poetry-plugin-dotenv',
    date: '2022-09-16',
    description:
      'Poetry plugin that auto-loads dotenv variables before commands run.',
    url: 'https://github.com/pivoshenko/poetry-plugin-dotenv',
    icon: Plug,
    tags: ['python', 'poetry', 'plugin', 'dotenv'],
    repo: 'pivoshenko/poetry-plugin-dotenv',
  },
]

async function fetchStars(repo: string): Promise<number | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return undefined
    const data = await res.json()
    return typeof data.stargazers_count === 'number'
      ? data.stargazers_count
      : undefined
  } catch {
    return undefined
  }
}

export async function getAllProjectsWithStars(): Promise<ProjectWithStars[]> {
  return Promise.all(
    getAllProjects().map(async (project) =>
      project.repo
        ? { ...project, stars: await fetchStars(project.repo) }
        : project,
    ),
  )
}

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
