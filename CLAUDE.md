# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog and portfolio site (pivoshenko.dev) built with Next.js 16 App Router, TypeScript, MDX, and Tailwind CSS. Hosted on Vercel.

## Layout

The Next.js app lives under [`site/`](./site/) (mirrors [`pivoshenko.ai`](../pivoshenko.ai/CLAUDE.md)). The repo root holds only `justfile`, `README.md`, `CLAUDE.md`, `LICENSE`, `.editorconfig`, `.gitignore`, `.github/`, `.claude/`. All paths in this doc (`app/`, `content/`, `lib/`, `package.json`, `next.config.ts`, `tailwind.config.ts`, `biome.json`, `vercel.json`, …) are relative to `site/`.

The Vercel project's **Root Directory** is set to `site/` in the dashboard.

## Commands

Run everything through the root `justfile` — it shells out to `pnpm -C site …`:

```bash
just install          # pnpm install
just dev              # Dev server with Turbopack
just build            # Production build
just lint             # Biome lint
just format           # Biome format (auto-fix)
just audit            # pnpm audit (CI gate alongside lint + build)
just check            # Full gate: biome check + next build
just update           # Bump dependencies
```

No test framework is configured. `just lint` runs Biome lint only; `just check` is the full gate. CI (`.github/workflows/ci.yaml`) runs `install` → `lint` → `audit` → `build` on push to `main` and on PRs.

## Architecture

- **App Router** (`site/app/`): Pages use Server Components by default. Client Components (`'use client'`) are used only for interactive UI (theme toggle, TOC, reading progress, scroll-to-top).
- **Content** (`site/content/posts/*.mdx`): Blog posts as MDX with YAML frontmatter (`title`, `date`, `description`, `tags`). All post pages are statically generated at build time. See [Content conventions](#content-conventions) for the canonical shape.
- **Post utilities** (`site/lib/posts.ts`): Reads MDX files from disk via `path.join(process.cwd(), 'content/posts')` — `cwd` is `site/` because Next.js is launched from there. Parses frontmatter with `gray-matter`, extracts headings for TOC. Reading time is calculated at 200 wpm.
- **MDX pipeline**: `@next/mdx` + `remark-gfm` + custom rehype plugin for heading IDs. Component overrides in `site/mdx-components.tsx`.
- **RSS**: Generated as a route handler at `site/app/rss.xml/route.ts`, cached 1 hour with stale-while-revalidate.

## Design System

Base design tokens (`type-*`, `fg-*`, `hover-*`, `bg-tag*`, `border-*`, `deco-*`) come from `pivoshenko.ui/ui/globals.css`. Site-local extensions in `site/app/globals.css` add `.type-post-heading` and `.type-caption` (blog-specific). Shared components — `Footer`, `Nav`, `PageShell`, `Tag`, etc. — are imported from `pivoshenko.ui`.

`site/app/layout.tsx` composes the whole shell via `<SiteLayout brand="pivoshenko.dev">` from `pivoshenko.ui/next/site-layout`, with `navLinks={[Home, Blog, Projects]}`, `footerExtras={[rssLink]}` (RSS marker from `pivoshenko.ui`), and `beforeShell={<ReadingProgress/>}` + `afterShell={<SpeedInsights/>}` (blog-specific instrumentation). Metadata comes from `siteMetadata(...)` with site-specific `keywords`/`authors`/`alternates` spread on top. Viewport comes from `siteViewport`. No local `Nav`/`Footer`/`ThemeToggle` components — see the shared UI invariant in parent `CLAUDE.md`.

Single dark theme (`popil`, warm-ash) — light mode, `next-themes`, and the theme toggle were removed. Colors come from the role-based `pivoshenko.ui/tailwind-preset` (`bg-bg-canvas`, `text-fg-default`, `text-accent-*`) backed by CSS variables in `pivoshenko.ui/ui/tokens.css`. The tokens CSS is scoped to `:root`, so the vendored palette is the active palette — no `data-flavor` attribute on consumers. Font family is JetBrains Mono (loaded via `next/font/google` inside `SiteLayout`). The favicon (`site/app/icon.tsx`) re-exports the shared `pivoshenko.ui/next/icon` handler with locally-declared `size`/`contentType` literals (Next requires route segment exports to be statically parsable).

## Shared package consumption

This site pins `pivoshenko.ui` via git tag in `site/package.json`. See parent `CLAUDE.md` for the cross-cutting pattern and local-override workflow.

- `site/biome.json` extends `./node_modules/pivoshenko.ui/config/biome.json`
- `site/tsconfig.json` extends `pivoshenko.ui/tsconfig.base.json`
- `site/tailwind.config.ts` uses `pivoshenko.ui/tailwind-preset/site` (preset + JetBrains-Mono fontFamily override) and the `withUiContent()` helper for the content glob. Adds `@tailwindcss/typography` plugin + prose tokens for blog posts (site-local extension allowed).
- `site/next.config.ts` re-exports `baseNextConfig` from `pivoshenko.ui/next/config` and spreads `pageExtensions: ['ts','tsx','mdx']` on top.
- `site/postcss.config.mjs` re-exports the shared `pivoshenko.ui/postcss.config.mjs` (one-line).
- `site/app/opengraph-image.tsx` is a thin wrapper around `createOgImage({brand,title,subtitle,domain})` from `pivoshenko.ui/next/opengraph-image`. Route segment exports (`alt`, `size`, `contentType`, `runtime`) stay literal in the route file.

## Content conventions

Frontmatter contract, loader pattern, tag rules, and sort order for posts:

- Required keys: `title`, `date` (ISO `YYYY-MM-DD`), `description`, `tags`.
- Tags: lowercase, kebab-case, single word where possible (`^[a-z0-9]+(-[a-z0-9]+)*$`).
- Loader (`site/lib/posts.ts`) runs server-side; client components import only types via `import type`.
- Sort: date desc, ties broken by `title` ascending.

## Required env vars

None. `@vercel/analytics` and `@vercel/speed-insights` are wired via the Vercel integration and require no user-managed env vars. If a future build needs a secret, add it here as: name · purpose · scope (build/runtime) · visibility (`NEXT_PUBLIC_` public vs secret).

## Code Style

- **Formatter/Linter**: Biome (not ESLint/Prettier). Single quotes, trailing commas, no semicolons, 2-space indent, 80 char line width.
- **Imports**: Organized by Biome. Path alias `@/*` maps to the `site/` root.
- **Styling**: Tailwind utility classes only — no CSS modules or styled-components. Use design token classes from `globals.css` for consistency.
