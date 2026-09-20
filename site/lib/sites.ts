import type { LucideIcon } from 'lucide-react'
import { Bot, Image, LayoutGrid, Palette, Terminal } from 'lucide-react'

/** Palette slot each site picks as its own accent, mirrored from its layout */
export type SiteAccent = 'peach' | 'lavender' | 'red' | 'mauve' | 'green'

export interface Site {
  slug: string
  title: string
  description: string
  url: string
  icon: LucideIcon
  accent: SiteAccent
}

// dotfiles has no site of its own, so it links to the repository and takes the
// design system's default accent; every other entry mirrors the accent its own
// layout.tsx stamps, so this page reads as an index of the family
export const sites: Site[] = [
  {
    slug: 'dotfiles',
    title: 'pivoshenko.dotfiles',
    description:
      'Personal dotfiles - brew dependencies, tool configs, and one consistent look across the terminal.',
    url: 'https://github.com/pivoshenko/pivoshenko.dotfiles',
    icon: Terminal,
    accent: 'peach',
  },
  {
    slug: 'ai',
    title: 'pivoshenko.ai',
    description:
      'Curated AI skills, MCPs, instructions and plugins, synced into one workspace with Kasetto.',
    url: 'https://ai.pivoshenko.dev',
    icon: Bot,
    accent: 'lavender',
  },
  {
    slug: 'theme',
    title: 'pivoshenko.theme',
    description:
      'Dark themes in three flavors - Morok, Popil and Vatra - focused on minimalism and cross-tool consistency.',
    url: 'https://theme.pivoshenko.dev',
    icon: Palette,
    accent: 'red',
  },
  {
    slug: 'wallpapers',
    title: 'pivoshenko.wallpapers',
    description:
      'Curated wallpaper collection with search, tag filtering, metadata and direct downloads.',
    url: 'https://wallpapers.pivoshenko.dev',
    icon: Image,
    accent: 'mauve',
  },
  {
    slug: 'startpage',
    title: 'pivoshenko.startpage',
    description:
      'Minimal, fast startpage with curated quick links for daily browsing, development and media.',
    url: 'https://startpage.pivoshenko.dev',
    icon: LayoutGrid,
    accent: 'green',
  },
]
