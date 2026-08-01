# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Implementation principles

Remember, before writing any code:3

1. Does this need to exist?   → no: skip it (YAGNI)
2. Already in this codebase?  → reuse it, don't rewrite
3. Stdlib does it?            → use it
4. Native platform feature?   → use it
5. Installed dependency?      → use it
6. One line?                  → one line
7. Only then: the minimum that works → If reusable, write it in a shared file/component.

## Commands

Package manager is Bun (`bun.lock` is checked in).

```bash
bun install          # install dependencies
bun run dev           # gatsby develop -H 0.0.0.0 (binds all interfaces)
bun run start          # gatsby develop (localhost only)
bun run build          # gatsby clean && gatsby build
bun run serve          # serve the production build (run build first)
bun run clean          # gatsby clean (clears .cache/ and public/)
bun run typecheck        # tsc --noEmit
bun run format          # prettier --write over ts/js/json/md/tsx/jsx
```

There is no test suite or lint script in this repo — `typecheck` and `format` are the only static checks.

`.nvmrc` pins Node v18.12.0; there's no evidence the app requires that specific version over Bun, but it's there if a Node runtime is needed for tooling that doesn't work under Bun.

### Known issue: `bun run dev` / `bun run build` fail under Bun's JS runtime

Gatsby 5's cache layer depends on `lmdb`, which has a Bun-specific native-binding code path (`bun:ffi` `linkSymbols`). With the currently locked `lmdb` version, this fails under recent Bun versions with:

```
TypeError: Symbol "getByBinary" is missing a "ptr" field. When using linkSymbols() or CFunction(), you must provide a "ptr" field with the memory address of the native function.
```

This shows up twice: once from Gatsby's own `cache-lmdb.js`, and again from the bundled `@parcel/cache` (Gatsby's internal Parcel-based compiler for `gatsby-config`/`gatsby-node`), which vendors its own copy of `lmdb`. Overriding the top-level `lmdb` version fixes the first occurrence but not the second, since `@parcel/cache`'s copy isn't reachable through a simple package.json `overrides` entry. Running with `CI=true` avoids a separate, unrelated crash in `gatsby-cli`'s `yoga-layout-prebuilt` (used for its interactive terminal UI) but does not fix the `lmdb` issue.

Net effect: `bun install` works fine (Bun as package manager), but running the Gatsby CLI scripts (`dev`/`build`/`start`/`serve`) *as JS via Bun's runtime* currently does not, in any environment where only Bun (no Node.js) is available. If you hit this, run the scripts with Node.js instead (e.g. via `nvm use` against `.nvmrc`, or system Node) while continuing to use `bun install`/`bun.lock` for dependency management.

## Architecture

Gatsby 5 (SSG) site with TypeScript, Emotion (`@emotion/styled`), and Tailwind (via `gatsby-plugin-postcss`) used together — Tailwind utility classes for layout/spacing, Emotion `styled()` for one-off component styling.

### Content and page generation

- **File-system pages** — anything under `src/pages/**` becomes a route automatically (Gatsby's file-system routing). `src/pages/blog/{markdownRemark.frontmatter__slug}.tsx` is a collection route: one page per markdown post, slug taken from frontmatter.
- **Markdown blog posts** live in `src/content/<post-slug>/index.md` (with co-located images), sourced via `gatsby-source-filesystem` (`content`) and parsed by `gatsby-transformer-remark`.
- **Project detail pages** are generated programmatically in `gatsby-node.ts`: it queries `allFile` for everything under `src/images/details/<project>/`, groups by directory, and creates one page per group at `/projects/<project>` using `src/templates/details.tsx`. Per-project copy (name, description, keywords, hero image, prototype link) lives in the `ProjectsLookup` object at the top of `gatsby-node.ts` — commented-out entries there are past/parked projects, add new projects by adding an entry keyed by the same directory name used under `src/images/details/`.
- Two separate image trees exist for projects: `src/images/details/<project>/` (screenshots turned into detail-page galleries via the createPages logic above) and `src/images/projects/<project>/` (hero/marketing images used directly in `src/sections/projects/*`).
- `src/utils/contentfulBaseData.tsx` and the GraphQL types reference a Contentful source (`allContentfulSocialLinks`, commented-out `allContentfulProject`), but no `gatsby-source-contentful` plugin is registered in `gatsby-config.ts` — this looks like a partially-removed/parked integration; the `graphqlTypegen` types may still reference it.

### Component layout

- `src/layouts/mainLayout/` wraps every page (`NavBar` + content + `Footer`); page components import it directly — there's no `wrapPageElement` in `gatsby-ssr.ts` (which only sets the `lang` HTML attribute), so every page must remember to wrap itself in `Layout`.
- `src/sections/*` are the large, page-specific composed blocks used on the homepage (`companies`, `contact`, `projects`, `testimonial`) — each project card under `src/sections/projects/*.tsx` is its own file.
- `src/components/` holds small, reusable, cross-page pieces and is re-exported through a single barrel (`src/components/index.tsx`); import from `../components`, not the individual file, to match existing conventions.
- `src/hooks/` has two standalone hooks: `useForm` (a small reducer-based form/validation helper used by the contact form) and `useScrollPosition` (drives `navBar.tsx`'s scroll-based styling).

### Contact form

The homepage contact modal posts to a Netlify Function rather than a Gatsby API route: `netlify/functions/contact-form/contact-form.ts` handles the POST (with a naive in-memory per-host rate limit), and `netlify/functions/contact-form/notion.ts` writes the submission into a Notion database via `@notionhq/client`. Requires `NOTION_API_KEY` and `NOTION_DATABASE_ID` env vars (read directly via `process.env`, not through `src/utils/env.ts`). `src/utils/env.ts` is a small helper (`env(name)`) that exits the process if a required env var is missing — used for other env-gated config, if added.

### SEO / metadata

Site-wide metadata (title, description, keywords, social handles, theme color) is centralized in `gatsby-config.ts`'s `siteMetadata`; `src/components/seo.tsx` reads it via GraphQL and each page's `Head` export (e.g. `export const Head: HeadFC = () => <SEO />`) renders it, optionally overridden per page/template (see `details.tsx`, which passes per-project `keyWords`/`description` from `pageContext`).
