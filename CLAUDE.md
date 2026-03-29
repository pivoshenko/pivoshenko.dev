# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
just format    # biome format --write
just lint      # biome check + next build
just           # list all recipes
```

Direct pnpm scripts:
```bash
pnpm dev       # Next.js dev server with Turbopack
pnpm build     # Production build
pnpm check     # biome check --write (lint + format combined)
pnpm lint      # biome lint only
pnpm format    # biome format --write only
```

No test suite is configured — `pnpm test` will fail.

## Architecture

**Stack:** Next.js 16 (App Router) · TypeScript strict · React 19 · MDX 3 · Tailwind CSS 3 · Biome (lint + format)

### Content pipeline

Blog posts live in `content/posts/*.mdx` with YAML frontmatter (`title`, `date`, `description`, `tags`). `lib/posts.ts` is the single entry point for all post access — it exposes `getAllPosts()`, `getPostMeta()`, and `getPostRawContent()` which are used by every blog-related route.

### Routing

| Route        | File                           |
| ------------ | ------------------------------ |
| Home         | `app/page.tsx`                 |
| Blog listing | `app/blog/page.tsx`            |
| Post         | `app/blog/[slug]/page.tsx`     |
| Tag filter   | `app/blog/tags/[tag]/page.tsx` |
| RSS feed     | `app/rss.xml/route.ts`         |

### Styling conventions

`app/globals.css` defines a semantic typography system used throughout:
- **Type scale:** `.type-heading`, `.type-post-heading`, `.type-body`, `.type-ui`, `.type-label`, `.type-meta`, `.type-caption`, `.type-logo`
- **Color roles:** `.fg-primary`, `.fg-secondary`, `.fg-body`, `.fg-subtle`, `.fg-muted`
- Stone color palette, dark mode via `next-themes` (class strategy)
- Geist Sans + Geist Mono as CSS variables (`--font-geist-sans`, `--font-geist-mono`)

Use these semantic classes rather than raw Tailwind color utilities when styling text and foreground elements.

### MDX components

Custom MDX component mappings are in `mdx-components.tsx`. When adding new MDX-renderable elements, register them there.

### Path alias

`@/*` resolves to the repository root — use it for all internal imports.
