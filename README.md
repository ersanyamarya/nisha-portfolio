# Nisha Kumari — Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/95297162-bc68-4cb6-b221-a19dd45b0f7d/deploy-status)](https://app.netlify.com/sites/nisha-kumari-portfolio/deploys)

Personal portfolio for Nisha Kumari, Senior UX Designer in Berlin. Live at [nishakumari.art](https://nishakumari.art/).

## Tech stack

- **[Gatsby 5](https://www.gatsbyjs.com/)** — static site generator (SSG)
- **TypeScript** — throughout (`tsconfig.json`, `gatsby-node.ts`, `gatsby-ssr.ts`)
- **[Emotion](https://emotion.sh/)** (`@emotion/styled`) — component-level styling
- **[Tailwind CSS](https://tailwindcss.com/)** (via `gatsby-plugin-postcss`) — utility classes for layout and spacing
- **[Framer Motion](https://www.framer.com/motion/)** — animations
- **[Netlify Functions](https://docs.netlify.com/functions/overview/)** — serverless backend for the contact form
- **[Notion API](https://developers.notion.com/)** — contact form submissions are stored in a Notion database

## Getting started

```bash
bun install
```

> **Note:** Use Bun only as the package manager (`bun install`). Running Gatsby scripts via Bun's JS runtime currently fails due to an `lmdb` native-binding issue. Run scripts with Node.js (e.g. `nvm use`).

```bash
# development server (binds all interfaces)
npm run dev

# production build
npm run build

# serve the production build locally (run build first)
npm run serve
```

## Available scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | `gatsby develop -H 0.0.0.0`               |
| `npm run start`     | `gatsby develop` (localhost only)         |
| `npm run build`     | `gatsby clean && gatsby build`            |
| `npm run serve`     | Serve the production build                |
| `npm run clean`     | Clear `.cache/` and `public/`             |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run format`    | Prettier over all `ts/js/json/md/tsx/jsx` |

There is no test suite or lint script — `typecheck` and `format` are the only static checks.

## Environment variables

Required for the contact form Netlify Function:

| Variable             | Description                               |
| -------------------- | ----------------------------------------- |
| `NOTION_API_KEY`     | Notion integration token                  |
| `NOTION_DATABASE_ID` | ID of the Notion database for submissions |

## Project structure

```
src/
  pages/          # File-system routed pages; blog posts via collection route
  sections/       # Large homepage blocks (projects, testimonials, contact, …)
  components/     # Small reusable pieces, re-exported via barrel index
  layouts/        # MainLayout (NavBar + content + Footer)
  templates/      # Project detail page template (details.tsx)
  content/        # Markdown blog posts with co-located images
  images/
    details/<project>/   # Screenshots → project detail galleries
    projects/<project>/  # Hero / marketing images
  hooks/          # useForm, useScrollPosition
  utils/          # env helper, Contentful base data (parked)
netlify/functions/contact-form/  # Contact form handler + Notion writer
gatsby-config.ts  # Site metadata, plugins
gatsby-node.ts    # Programmatic page creation for project detail pages
scripts/          # arrange-detail-files.js — utility to organise detail images
```

## Adding a project

1. Add screenshot images under `src/images/details/<project-slug>/`.
2. Add hero/marketing images under `src/images/projects/<project-slug>/`.
3. Add an entry to the `ProjectsLookup` object in `gatsby-node.ts` keyed by `<project-slug>`, with `name`, `description`, `keywords`, `heroImage`, and optional `prototypeLink`.
4. Add the corresponding section card under `src/sections/projects/`.

## Deployment

The site is deployed automatically to [Netlify](https://app.netlify.com/sites/nisha-kumari-portfolio) on every push to `main`. The Netlify badge at the top of this file reflects the current deploy status.
