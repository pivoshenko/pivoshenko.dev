# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog and portfolio site (pivoshenko.dev) built with Next.js 16 App Router, TypeScript, MDX, and Tailwind CSS. Hosted on Vercel.

## Commands

```bash
pnpm dev              # Dev server with Turbopack
pnpm build            # Production build
pnpm lint             # Biome lint
pnpm format           # Biome format (auto-fix)
pnpm check            # Biome full check (lint + format + imports)
```

No test framework is configured. The `just lint` task runs `pnpm check && pnpm build`.

## Architecture

- **App Router** (`app/`): Pages use Server Components by default. Client Components (`'use client'`) are used only for interactive UI (theme toggle, TOC, reading progress, scroll-to-top).
- **Content** (`content/posts/*.mdx`): Blog posts as MDX with YAML frontmatter (`title`, `date`, `description`, `tags`). All post pages are statically generated at build time.
- **Post utilities** (`lib/posts.ts`): Reads MDX files from disk, parses frontmatter with `gray-matter`, extracts headings for TOC. Reading time is calculated at 200 wpm.
- **MDX pipeline**: `@next/mdx` + `remark-gfm` + custom rehype plugin for heading IDs. Component overrides in `mdx-components.tsx`.
- **RSS**: Generated as a route handler at `app/rss.xml/route.ts`, cached 1 hour with stale-while-revalidate.

## Design System

All design tokens live in `app/globals.css` as Tailwind `@layer components` classes:

- **Typography**: `.type-heading`, `.type-post-heading`, `.type-body`, `.type-ui`, `.type-label`, `.type-meta`, `.type-caption`, `.type-logo`
- **Colors**: `.fg-primary`, `.fg-title`, `.fg-secondary`, `.fg-body`, `.fg-subtle`, `.fg-muted`
- **Interactive**: `.hover-primary`, `.hover-secondary`, `.bg-tag`, `.bg-tag-active`
- **Structure**: `.border-ui`, `.border-faint`, `.deco-subtle`

Dark mode uses Tailwind `dark:` variants with `next-themes` (class strategy). Color palette is based on stone shades. Font family is Geist (sans + mono).

## Code Style

- **Formatter/Linter**: Biome (not ESLint/Prettier). Single quotes, trailing commas, no semicolons, 2-space indent, 80 char line width.
- **Imports**: Organized by Biome. Path alias `@/*` maps to project root.
- **Styling**: Tailwind utility classes only — no CSS modules or styled-components. Use design token classes from `globals.css` for consistency.
