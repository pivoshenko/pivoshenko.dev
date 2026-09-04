# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal tech blog + portfolio (pivoshenko.dev). Next.js 16 App Router, React 19, TypeScript, MDX, Tailwind 3, Biome, deployed on Vercel.

## Layout

The entire app lives in `site/`. The repo root only holds `justfile`, `README.md`, `CLAUDE.md`, `AGENTS.md`, `LICENSE`, `.editorconfig`, `.gitignore`, `.no-tests`, and `.github/`. Every path below (`app/`, `content/`, `lib/`, `components/`, `package.json`, `next.config.ts`, ...) is relative to `site/`.

`site/vercel.json` (not the repo root) declares the build, so the Vercel project's Root Directory is `site/`.

## Commands

Everything goes through the root `justfile`, which shells out to `pnpm -C site ...`. Run `just` from the repo root:

```bash
just install   # pnpm install
just dev       # next dev --turbopack
just build     # next build (this is also the typecheck — no separate tsc script)
just lint      # biome lint .
just format    # biome format . --write
just check     # biome check . --write (auto-fixes!) + next build
just audit     # pnpm audit
just update    # pnpm update
just start     # next build + next start
just test      # no-op while .no-tests exists
```

Requires Node >= 24 and pnpm 10.30.3 (`packageManager` field).

`just check` is the full local gate. Note it writes fixes to your working tree; use `just lint` for a read-only check.

There is no test framework. `just test` succeeds only because the `.no-tests` sentinel file exists at the repo root — deleting it makes the recipe (and CI) fail until a real test command is wired up.

CI (`.github/workflows/ci.yaml`, `ubuntu-24.04-arm`, Node 24) runs `just install` -> `lint` -> `audit` -> `test` -> `build` on pushes to `main`, all PRs, and manual dispatch. Deploys happen via Vercel's git integration, not CI.

Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `build(deps):`, `ci:`, `chore:`). PRs use `.github/PULL_REQUEST_TEMPLATE.md`.

## Architecture

**Blog posts are not compiled by `@next/mdx` routing.** Despite `pageExtensions: ['ts','tsx','mdx']`, files in `content/posts/*.mdx` are never routed as pages. `app/blog/[slug]/page.tsx` reads the raw file from disk and compiles it at build time with `evaluate()` from `@mdx-js/mdx`, passing `remark-gfm` plus a locally defined `rehypeHeadingIds` plugin. `generateStaticParams()` prerenders every post.

**Heading IDs are produced twice and must agree.** `extractHeadings()` in `lib/posts.ts` regex-scans the raw markdown for `##`/`###` to build the TOC; `rehypeHeadingIds` in `app/blog/[slug]/page.tsx` stamps `id` onto rendered `h2`/`h3`. Both call `slugify()` from `lib/posts.ts`. Change the heading-level range or the slug algorithm in both places or TOC anchors break silently.

**`lib/posts.ts`** is the only filesystem reader: `path.join(process.cwd(), 'content/posts')`, which resolves correctly because Next always runs from `site/`. It parses frontmatter with `gray-matter`, sorts date desc with title asc as tiebreak, and computes reading time at 200 wpm. It is server-only — the client component `components/table-of-contents.tsx` imports from it with `import type` only.

**`lib/projects.ts`** is a hardcoded `Project[]` array, not content files. Adding a project means editing that array. Entries with a `repo` field get their star count fetched from the GitHub REST API at build/revalidate time (`next: { revalidate: 86400 }`); failures degrade to no star count rather than throwing.

**RSS** is a route handler at `app/rss.xml/route.ts` that hand-builds the XML (with its own `escapeXml`) and sets `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`.

**Client components** are only `components/reading-progress.tsx` and `components/table-of-contents.tsx`. Everything else is a Server Component.

## pivoshenko.ui (shared package)

`pivoshenko.ui` is pinned by git tag in `site/package.json` (`github:pivoshenko/pivoshenko.ui#v0.9.3`). Upgrading means bumping that tag ref and reinstalling — there is no local workspace link.

Almost every config file is a thin extension of it:

| File | Delegates to |
| --- | --- |
| `biome.json` | `./node_modules/pivoshenko.ui/config/biome.json` |
| `tsconfig.json` | `pivoshenko.ui/tsconfig.base.json` (+ `@/*` -> `site/` alias) |
| `next.config.ts` | spreads `baseNextConfig` from `pivoshenko.ui/next/config` |
| `postcss.config.mjs` | one-line re-export |
| `tailwind.config.ts` | `pivoshenko.ui/tailwind-preset/site` preset + `withUiContent()` glob helper |
| `app/globals.css` | `@import "pivoshenko.ui/ui/globals.css"` |
| `app/icon.tsx`, `app/opengraph-image.tsx` | re-export/wrap the shared handlers |

`app/layout.tsx` renders the entire `<html>` shell via `<SiteLayout>` from `pivoshenko.ui/next/site-layout`. That component owns the `<html>` tag, fonts, **and `<Analytics>` from `@vercel/analytics`** — do not add a second Analytics tag locally. `<SpeedInsights>` and `<ReadingProgress>` are injected through the `afterShell` / `beforeShell` props. Metadata comes from `siteMetadata({...})` with site-specific `keywords`/`authors`/`alternates` spread on top; `viewport` re-exports `siteViewport`.

Route segment exports (`size`, `contentType`, `runtime`, `alt`) must stay as literal declarations in the route file even when the default export is re-exported — Next requires them to be statically analyzable. See `app/icon.tsx`.

Site-local additions on top of the shared system are intentionally minimal: `app/globals.css` adds only `.type-post-heading` and `.type-caption`; `tailwind.config.ts` adds `@tailwindcss/typography` with a stone-based prose token override for post bodies.

The theme is dark-only (no `next-themes`, no toggle). Colors come from role-based token classes (`bg-tag`, `fg-primary`, `fg-muted`, `hover-secondary`, `border-ui`, `type-meta`) backed by CSS variables in the shared package.

## Content conventions

Frontmatter contract for `content/posts/<slug>.mdx` (filename is the URL slug):

```yaml
---
title: Post title
date: 2026-03-20 # ISO YYYY-MM-DD
description: One-sentence summary, also used for <meta> and RSS
tags: [product, ai, engineering] # lowercase kebab-case
---
```

`description` and `tags` fall back to `''` / `[]` if omitted, but `title` and `date` are read unchecked and will render as `undefined`.

## Dependency pinning gotchas

`site/pnpm-workspace.yaml` carries audit and version policy, not just workspace config:

- `auditConfig.ignoreGhsas` suppresses **GHSA-h67p-54hq-rp68** (js-yaml). Do not "fix" it by bumping js-yaml: `>=4.2.0` drops the `safeLoad` alias that `gray-matter@4.0.3` calls, which breaks frontmatter parsing and the whole build. The advisory is unreachable since only trusted local frontmatter is parsed.
- `overrides` force `postcss >= 8.5.10` and `sharp >= 0.35.0`.
- `onlyBuiltDependencies` allows postinstall scripts for `@biomejs/biome` and `sharp` only.

## Code style

Biome, not ESLint/Prettier (rules inherited from `pivoshenko.ui/config/biome.json`): single quotes, double quotes in JSX, no semicolons, trailing commas everywhere, 2-space indent, 80-char line width, imports auto-organized, `noUnusedVariables` is an error. Tailwind utility classes only — no CSS modules or CSS-in-JS.
