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
- **Content** (`content/posts/*.mdx`): Blog posts as MDX with YAML frontmatter (`title`, `date`, `description`, `tags`). All post pages are statically generated at build time. See [Content conventions](#content-conventions) for the canonical shape.
- **Post utilities** (`lib/posts.ts`): Reads MDX files from disk, parses frontmatter with `gray-matter`, extracts headings for TOC. Reading time is calculated at 200 wpm.
- **MDX pipeline**: `@next/mdx` + `remark-gfm` + custom rehype plugin for heading IDs. Component overrides in `mdx-components.tsx`.
- **RSS**: Generated as a route handler at `app/rss.xml/route.ts`, cached 1 hour with stale-while-revalidate.

## Design System

Base design tokens (`type-*`, `fg-*`, `hover-*`, `bg-tag*`, `border-*`, `deco-*`) come from `pivoshenko.ui/ui/globals.css`. Site-local extensions in `app/globals.css` add `.type-post-heading` and `.type-caption` (blog-specific). Shared components — `Footer`, `Nav`, `ThemeToggle`, `PageShell`, `Tag`, etc. — are imported from `pivoshenko.ui`.

Dark mode uses Tailwind `dark:` variants with `next-themes` (class strategy). Color palette is stone grayscale with morok accents from the shared Tailwind preset. Font family is JetBrains Mono (loaded via `next/font/google`). The favicon (`app/icon.tsx`) renders "VP" using JetBrains Mono fetched from Google Fonts CDN (`runtime = 'edge'`).

## Shared package consumption

This site pins `pivoshenko.ui` via git tag in `package.json`. See parent `me/CLAUDE.md` for the cross-cutting pattern and local-override workflow.

- `biome.json` extends `./node_modules/pivoshenko.ui/config/biome.json`
- `tsconfig.json` extends `pivoshenko.ui/tsconfig.base.json`
- `tailwind.config.ts` uses `pivoshenko.ui/tailwind-preset` + content glob pointing at the package source. Adds `@tailwindcss/typography` plugin + prose tokens for blog posts (site-local extension allowed).
- `next.config.ts` needs `transpilePackages: ['pivoshenko.ui']`

## Content conventions

Frontmatter contract, loader pattern, tag rules, and sort order are specified in `openspec/specs/site-content-conventions/spec.md`. Quick summary for posts:

- Required keys: `title`, `date` (ISO `YYYY-MM-DD`), `description`, `tags`.
- Tags: lowercase, kebab-case, single word where possible (`^[a-z0-9]+(-[a-z0-9]+)*$`).
- Loader (`lib/posts.ts`) runs server-side; client components import only types via `import type`.
- Sort: date desc, ties broken by `title` ascending.

## Required env vars

None. `@vercel/analytics` and `@vercel/speed-insights` are wired via the Vercel integration and require no user-managed env vars. The Google Fonts CDN fetch in `app/icon.tsx` is unauthenticated. If a future build needs a secret, add it here as: name · purpose · scope (build/runtime) · visibility (`NEXT_PUBLIC_` public vs secret).

## Code Style

- **Formatter/Linter**: Biome (not ESLint/Prettier). Single quotes, trailing commas, no semicolons, 2-space indent, 80 char line width.
- **Imports**: Organized by Biome. Path alias `@/*` maps to project root.
- **Styling**: Tailwind utility classes only — no CSS modules or styled-components. Use design token classes from `globals.css` for consistency.
