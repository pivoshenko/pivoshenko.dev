# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm lint       # Biome lint
pnpm format     # Biome format (writes)
pnpm check      # Biome lint + format (writes)
```

No test suite is configured — there are no test commands.

## Architecture

Personal blog built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v3**, and **MDX** for blog content. Deployed to Vercel.

### Content Pipeline

Blog posts are plain `.mdx` files in `content/posts/`. They use gray-matter frontmatter:

```mdx
---
title: Post Title
date: 2025-01-15
description: Short description shown in listings.
tags: [tag1, tag2]
---

MDX content here...
```

`lib/posts.ts` reads these files at build time using Node `fs` — no database, no CMS. Posts are rendered at `app/blog/[slug]/page.tsx` via `@mdx-js/mdx`'s `evaluate()` with `remarkGfm` enabled. Static params are generated from all `.mdx` files.

### Routing

| Route              | File                                                   |
| ------------------ | ------------------------------------------------------ |
| `/`                | `app/page.tsx` — shows 5 latest posts + all tags       |
| `/blog`            | `app/blog/page.tsx` — all posts grouped by year        |
| `/blog/[slug]`     | `app/blog/[slug]/page.tsx` — rendered MDX post         |
| `/blog/tags/[tag]` | `app/blog/tags/[tag]/page.tsx` — posts filtered by tag |
| `/about`           | `app/about/page.tsx`                                   |
| `/rss.xml`         | `app/rss.xml/route.ts` — RSS 2.0 feed                  |

### Design System

All typography and color tokens are defined as Tailwind `@layer components` utilities in `app/globals.css`. Use these classes — do not reach for raw Tailwind equivalents.

**Typography:** `type-heading`, `type-post-heading`, `type-body`, `type-ui`, `type-label`, `type-meta`, `type-caption`, `type-logo`

**Foreground colors:** `fg-primary`, `fg-title`, `fg-secondary`, `fg-body`, `fg-subtle`, `fg-muted`

**Hover:** `hover-primary`, `hover-secondary`

**Backgrounds:** `bg-tag`, `bg-tag-active`

**Borders:** `border-ui`, `border-faint`

**Underline decoration:** `deco-subtle`

Fonts are Geist Sans (`font-sans`) and Geist Mono (`font-mono`). Dark mode uses the `class` strategy via `next-themes`.

### Path Alias

`@/*` resolves to the repo root. Import as `@/lib/posts`, `@/components/nav`, etc.

### Tooling

- **Biome** handles linting and formatting (replaces ESLint + Prettier). Single quotes, 2-space indent, 80-char line width, no semicolons, trailing commas.
- **`@tailwindcss/typography`** styles MDX prose via `prose prose-stone dark:prose-invert prose-sm` on the post wrapper.
- Vercel Analytics and Speed Insights are injected in `app/layout.tsx`.
