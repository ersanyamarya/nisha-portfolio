# Rebuilding the content as a page on this site

The source `.dc.html` is a self-contained mini-website with its own inline colors and its own tiny reactivity runtime. None of that ships. You're extracting the *content and structure* and rebuilding it with this repo's actual stack: Gatsby + TypeScript + Tailwind + Emotion, following `CLAUDE.md`'s "reuse it, don't rewrite" rule.

## Where things go

- Page: `src/pages/case-studies/<slug>.tsx` — file-system routing means this alone creates the route.
- Images: `src/images/case-studies/<slug>/<asset-name>` — keep the filename the source declared (see `design-import.md` on why that matters for placeholders).
- Homepage card: add an entry to the `caseStudies` array in `src/sections/projects/index.tsx`.

## The shared component kit — use it, extend it, don't duplicate it

`src/components/caseStudy/` is the accumulated UI kit every case study page draws from. Before writing a one-off `<div>` block for something, check whether it already exists here:

- `shell.tsx` — `CaseStudyShell`: the page wrapper (back-link, sticky on-page nav + scroll-spy via `OnThisPageNav`).
- `pieces.tsx` — `Eyebrow`, `SectionHeading`, `StatChip`, `DarkStat`, `InsightCallout`, `QuoteBlock`, `PillTag`, `Bullet`, `ChallengeApproachOutcome`, `FeedbackCallout`, `ProsCons`, `FooterNav`.
- `tone.ts` — the *only* place colors are decided. Everything is `primary | secondary | success | default` — never introduce a raw hex or a Tailwind color class (`red-500`, `green-200`, etc.) directly in a page. Two reasons this rule exists and matters: (1) this site's Tailwind theme resets `--color-*` to nothing before defining its own scale, so stock Tailwind color classes like `bg-red-50` silently emit **no CSS at all** — not a wrong color, an invisible one; (2) even where a color would technically render, one shared map keeps every case study's "this failed" / "this shipped" / "this is the focal point" visual language consistent instead of each page inventing its own.
- `diagrams/` — see `references/diagram-design-integration.md`.

If a section genuinely doesn't fit anything here (a new pattern, not just a one-off styling choice), build it as a new export in `pieces.tsx` rather than inlining it in the page — the next case study will probably want it too. Don't build a generic abstraction for something used exactly once, though; wait until a second real use shows up (YAGNI, per `CLAUDE.md`).

## Style translation

The source uses one-off design-tool tokens (a muted gold `#D8BF7D`/`#B8934A`, ad-hoc `oklch()` grays). Don't copy these hex values into the page. Instead, read what each color is *doing semantically* (an accent label, a danger/problem callout, a success/shipped state) and map it onto the site's actual theme tokens from `tone.ts` and Tailwind's `primary-*` / `secondary-*` / `success-*` / `default-*` scales (defined in `src/layouts/layout.css`). The result should look like it belongs on this site, not like an imported foreign palette.

## Content fidelity vs. editorial judgment

Keep every finding, quote, statistic, and structural section from the source — this is someone's real case study, not a template to abbreviate. But:

- Long inline flowchart-as-prose content (a chain of "research finding → need → job → decision → why → next" reasoning) should become an actual diagram (see the diagram-design reference), not a wall of text.
- Full sentences that were stuffed into a chip/pill/box in the source design should be trimmed to short diagram-appropriate labels when they move into an actual diagram node — the full sentence stays in the surrounding page prose, which is where a reader actually wants to read it anyway.

## SEO / Head

Every case study page needs an `export const Head: HeadFC` using the site's `<SEO>` component (`src/components/seo.tsx`) with a distinct `title`, `description`, and `pathname`. If the page includes diagrams (see the diagram-design reference), the Head also needs the Google Fonts `<link>` for Geist/Geist Mono.

## Verification (don't skip this)

1. `node node_modules/typescript/lib/tsc.js --noEmit` — this project's `bun run typecheck` script fails to execute under Bun's own runtime for tooling reasons documented in `CLAUDE.md`; call `tsc` via `node` directly instead.
2. `node node_modules/.bin/prettier --write "src/**/*.{ts,tsx}"` — matches the project's formatting.
3. Start the dev server via `.claude/launch.json`'s `gatsby-dev` config (uses `npx`, sidestepping the Bun/`lmdb` incompatibility also documented in `CLAUDE.md` — don't run `bun run dev` for this).
4. Navigate to the new page. **Screenshots of this Browser pane are flaky in this environment** (frequently return a blank cream rectangle regardless of actual page content) — don't rely on them alone as your proof of correctness. Prefer `get_page_text` (confirms content rendered) and `javascript_tool` DOM queries (confirms specific structural/style facts — e.g. query `getComputedStyle` on an element to prove a color token resolved to a real color and not a dead Tailwind class). Screenshots are still worth one attempt for your own sanity check, just don't treat a blank one as proof of failure or a rendered one as sufficient proof of success on its own.
