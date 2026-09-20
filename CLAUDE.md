# CLAUDE.md

`pivoshenko.dev` - personal tech blog and portfolio: a statically generated Next.js App Router site whose posts are MDX files checked into the repo.

**All application code lives in `site/`**, which is the pnpm project root - every `pnpm` command must run from there. The root `justfile` wraps this as `pnpm -C site ...`, so prefer `just` recipes. `AGENTS.md` is a symlink to this file; edit `CLAUDE.md`, never `AGENTS.md`.

## Hard Rules

- **Do not inline `pivoshenko.ui` settings locally.** A shared rule, token, or component changes in the `pivoshenko.ui` repo and gets a tag bump here - it is a pinned git dependency, not a workspace package, and is not editable from this repo
- **Do not write raw Tailwind color classes.** Use the semantic utilities the package defines in `site/node_modules/pivoshenko.ui/ui/globals.css`; that package's own `CLAUDE.md` documents them. Site-local classes go in `site/app/globals.css` under `@layer components`, and anything reusable belongs in the package instead
- **Do not delete the root `.no-tests` sentinel.** It is the only reason `just test` passes; removing it deliberately breaks CI until a real test command replaces the recipe. Do not add a test framework without being asked
- **Do not "fix" GHSA-h67p-54hq-rp68.** `site/pnpm-workspace.yaml` ignores it deliberately - bumping `js-yaml` breaks `gray-matter` frontmatter parsing
- **Do not hand-format.** Run `just format`; Biome owns both linting and formatting here, with its config inherited from the package
- **Do not reach for `vercel deploy`.** Deployment is Vercel's git integration, configured by `site/vercel.json`; there is no deploy workflow, so merging to `main` is the deploy

## pivoshenko.ui

Nearly every shared concern comes from this external package: the Biome config, the TypeScript base config, the Tailwind preset, `globals.css`, the React component library, and the Next.js `SiteLayout` / `siteMetadata` / OG-image / icon helpers. Consequence: `site/biome.json` and `site/postcss.config.mjs` are one-to-four line files that extend or re-export it, `site/tsconfig.json` adds only Next-specific bits on top of the package base, `app/icon.tsx` and `app/opengraph-image.tsx` are thin re-exports, and `app/layout.tsx` only composes `SiteLayout` - site-wide chrome (html element, fonts, nav, footer, page shell, analytics) lives in the package, not here.

Read the resolved package under `site/node_modules/pivoshenko.ui/` when you need to know what a class or export actually does. `site/components/` holds only the components genuinely local to this site: `post-list.tsx` and `project-list.tsx` wrap the package `List` / `Row` for the two row shapes this site repeats, and `reading-progress.tsx` is mounted from `layout.tsx`.

### Page Composition

`PageShell` renders `<main>` with no width of its own, so a page alternates full-bleed bands with constrained ones. **Every route's constrained content must be wrapped in `PageBody`** - including `/about`. Forget it and the page renders edge to edge, which no typecheck will catch.

The decorative field is **two** choices, not one, despite what the package README implies. `field` on `SiteLayout` reaches only the footer, because `Hero` / `HeroBand` are rendered by the page rather than by `PageShell` and default to `contours` on their own. The hero half is pinned once in `site/components/site-hero.tsx`: every page renders `SiteHero`, never `HeroBand` directly, and its props type omits `field` so a page cannot drift from the footer. Change the field there and in `layout.tsx`.

`layout.tsx` picks both accents and nothing else should. `accent="blue"` drives the live `--accent` that every `accent` utility resolves to - headings, links, stats, the lit cells of the field. `subAccent="lavender"` drives `--accent-info`, one rank down, which `SubHeader`, info `Tag`s, `StatusBadge` and `Callout` take. Only the 14 chromatic palette slots are valid for either; the neutrals (`text`, `crust`, ...) have no `[data-accent]` rule, and passing one used to fall back to blue silently.

## Content Pipeline

Blog posts are `site/content/posts/<slug>.mdx`. The filename is the slug and the only source of it. `gray-matter` parses the frontmatter: `title`, `date`, `description`, `tags`. All four matter - `description` and `tags` default to empty, while `title` and `date` are assumed present and render as `undefined` if missing.

`site/lib/posts.ts` owns every read of that directory, synchronous `node:fs` at build time, no CMS and no fetch. Never read `content/posts` directly from a page; add a function there.

### The MDX Gotcha

MDX is **not** rendered through the Next MDX loader. `site/app/blog/[slug]/page.tsx` calls `evaluate()` from `@mdx-js/mdx` at build time on the raw post body, with `remark-gfm` and a small local `rehypeHeadingIds` plugin that stamps `id={slugify(text)}` onto every `h2`/`h3` so the table of contents can anchor to them. Three consequences:

- `site/mdx-components.tsx` is a pass-through and has no effect on posts. Custom MDX component mapping would have to be passed into the `evaluate()` call instead
- `@next/mdx` and `@mdx-js/loader` are dependencies but `next.config.ts` never wraps the config with `createMDX`, so `.mdx` files placed as routes are not compiled by the loader path
- heading IDs come from two places - `slugify` in `lib/posts.ts` for the TOC list, `rehypeHeadingIds` for the rendered anchors. Both call the same `slugify`, so keep it that way; changing one side silently breaks every in-page anchor

The table of contents consuming those IDs is the package `TableOfContents`, in a sticky right rail that the post page hides below `lg`.

### Projects

`site/lib/projects.ts` holds projects as a hardcoded array in the source file, not as content files - adding one means editing that array. It fetches star counts from the GitHub API unauthenticated and degrades to `undefined` on any failure, so missing stars in a local build is rate limiting, not a bug: do not chase it and do not add a token.

## Routes

`site/app/**` is otherwise self-describing, with two exceptions:

- `/about` is not linked from the nav and carries no body copy, deliberately - it renders a heading and two external links and nothing else. Do not "fix" it
- `/rss.xml` is a route handler emitting hand-rolled XML with its own `escapeXml`. It sets `dynamic = 'force-static'`, because a Route Handler renders per request by default and this one reads only the post files

## Commands

`just --list` from the repo root, also tabulated in `CONTRIBUTING.md`. Three traps the list does not show:

- `just build` (`next build`) is the only typecheck - there is no separate recipe, so type errors surface only there
- `just format` maps to the `check` npm script and applies safe lint fixes as well as formatting; the `pnpm format` script is format-only, so `just format` is the one you want
- `just check` reproduces CI exactly

## Misc

- there are no environment variables - nothing reads `process.env`, and there is no `.env` or `.env.example`. If something looks unconfigured, that is not what is missing
- `agentRules: false` comes from `baseNextConfig` in `pivoshenko.ui`, not from `site/next.config.ts`. Without it `next dev` writes its own `site/CLAUDE.md` and `site/AGENTS.md` on every run, which shadow the single pair at the repo root
- `site/vercel.json` installs with `--frozen-lockfile`, so `site/pnpm-lock.yaml` must be committed with any dependency change
- commit, branch, and pull request conventions are in `CONTRIBUTING.md`
