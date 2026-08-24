# Turning source flowcharts/journeys into real diagrams

The source `.dc.html` sometimes encodes diagrams as Mermaid code blocks (rendered client-side by a CDN script in the design tool) or as hand-built chains of styled `<div>`s pretending to be a flowchart. **Don't ship either form as-is.** Mermaid needs a runtime dependency this static site doesn't have and its default look doesn't match the site; hand-styled div-chains tend to reach for raw hex colors that bypass `tone.ts` entirely. Use the **diagram-design** skill to rebuild anything that's genuinely diagram-shaped (a process, a lifecycle, a decision trace, a timeline) as real inline SVG.

## Before the first diagram in this project: the style guide is already onboarded

Don't run diagram-design's onboarding flow again — this project already has a saved profile extracted from the site's own theme:

- `.diagram-design` (repo root) → `profile: nisha-portfolio-coffee-roast`
- The profile itself lives at `~/.diagram-design/profiles/nisha-portfolio-coffee-roast.md`, mapped from `src/layouts/layout.css`'s `primary`/`secondary`/`default`/`success` oklch scales (paper `#fbf4eb`, ink `#2d1a10`, accent `#b95c3a`, etc.)

If the marker or profile file is ever missing (e.g. a fresh checkout), regenerate it the same way: read the theme tokens out of `layout.css`, convert oklch → hex (there's no built-in Python oklch converter — the conversion math is straightforward color-space linear algebra, or ask the diagram-design skill's own onboarding flow to do it from the file directly), map to the style guide's semantic roles, save as a named profile, and write the `.diagram-design` marker. Don't skip straight to drawing with the shipped default palette — it won't match the site.

## Deciding what's actually a diagram vs. what's just formatted text

Ask: would a reader learn more from a real picture (nodes + connectors) than from the existing page prose? A 3-column "Challenge / Approach / Outcome" grid is not a diagram — leave it as a grid (`ChallengeApproachOutcome` in the component kit already handles this). A 5-stage lifecycle with a return loop, or a "finding → need → decision" reasoning chain, *is* a diagram.

Pick the nearest visual type from diagram-design's own type guide (`SKILL.md` §3) rather than forcing everything into one shape. In practice, most case-study content maps to:

- A short linear reasoning chain (finding → need → decision → next) → **Flowchart**, laid out as a single horizontal row. Since every node shares the same y-coordinate, every connector between them is a plain straight `<line>` — diagram-design's own rule 1 explicitly allows a straight line when both endpoints share an axis, so this sidesteps the more involved orthogonal-elbow routing math entirely. Reach for this shape whenever you can; it's much less error-prone to hand-author than a multi-row layout.
- A process lifecycle with a "comes back around" step → **Flowchart** with a dashed return path (a genuine reinforcing hub-and-spoke Loop type needs an actual accumulated shared-state hub — don't force a fake one just because the process happens to cycle; a plain return arrow is more honest).
- A quarter-by-quarter project timeline → **Timeline** (a baseline with milestone circles, labels alternating above/below).

Read the matching `references/type-*.md` file inside the diagram-design skill install before drawing — it has the exact layout formulas and anti-patterns for that type.

## Building diagrams as React components, not standalone HTML

diagram-design's default output is a self-contained `.html` file. For this site, the diagram needs to live inline in the page as JSX so it inherits the page's actual DOM (no iframe, scales with the responsive layout, no extra asset to host). Build each diagram as a small component under `src/components/caseStudy/diagrams/`:

- `tokens.ts` — hex values pulled from the saved profile (`DIAGRAM.paper`, `.ink`, `.accent`, etc.) plus the Geist/Geist Mono font stack. Diagrams use raw hex here, not Tailwind classes, because inline SVG presentation attributes/styles sit outside Tailwind's class pipeline.
- `diagramShell.tsx` — shared `<Diagram>` wrapper (viewBox, `<title>`/`<desc>` for the accessible-SVG contract, background rect), `<DiagramDefs>` (arrow markers), `<LegendItem>`/`<LegendStrip>`.
- One file per diagram *type* (not per diagram instance) when the same shape repeats with different content — e.g. three "job trace" flowcharts in one case study should be one `JobTraceFlow` component parameterized by a `steps` array, not three copies of near-identical JSX. Reused three times across the jobs-to-be-done section is exactly the "second real use" signal from `case-study-conventions.md` that justifies the abstraction.

### A real bug to watch for: the site's own CSS fights your font choice

This site's `layout.css` has a global `* { font-family: var(--font-sans) }` reset. Because that's a real stylesheet rule (even a universal-selector one) rather than an inherited value, it **beats** a plain `font-family="..."` SVG presentation attribute or a `fontFamily` React prop rendered as one — presentation attributes sit at the lowest possible CSS priority. If you set the diagram's font that way, every label will silently render in the site's Inter font instead of diagram-design's Geist/Geist Mono, and it's easy to miss because nothing errors.

The fix that actually works: give the `<svg>` a unique `id={slug}` and inject a scoped `<style>` block inside it (after `<title>`/`<desc>`, per the accessible-SVG ordering rule) targeting classes by that ID:

```
#${slug} .dd-sans { font-family: ...; }
#${slug} .dd-mono { font-family: ...; }
```

Then use `className="dd-sans"` / `className="dd-mono"` on each `<text>` — a real CSS rule (even ID-scoped) beats the `*` reset. Verify it actually worked with a DOM query after rendering (`getComputedStyle(el).fontFamily`) — don't just trust that setting the prop was enough; that's exactly the mistake that causes this bug in the first place. Also add the Geist/Geist Mono Google Fonts `<link>` (exported as `DIAGRAM_FONT_LINK` from `tokens.ts`) to the page's `Head` export, or the fonts won't be loaded at all regardless of the CSS fix.

## Mapping content colors onto the 4-tone system

diagram-design's node-type table (fill/stroke by role) maps cleanly onto this project's `tone.ts` if you resist the urge to invent a 5th or 6th color:

| Diagram role | Tone | Rationale |
|---|---|---|
| A problem / pain point / "not built yet" | `secondary` | Already the site's red |
| A neutral insight / plain step | *(unstyled — white fill, ink stroke)* | Most nodes should be this; only 1–2 nodes per diagram get an accent, per diagram-design's own "coral is editorial, not a flag" rule |
| The one focal decision node | `accent` (this project's terracotta `primary`) | Exactly one per diagram, never more |
| A shipped/positive outcome | `success` (this project's sage-green scale) | |

If source content seems to want more than 4 distinct colors, that's a signal to convey the extra distinction through shape/dash-pattern instead (solid vs. dashed stroke for "shipped" vs. "not yet built" is used throughout this project's diagrams) — not by adding a new color to the palette.

## Verifying a hand-authored diagram

There's no bundled `verify-geometry.py` in the installed plugin cache (that script only ships in a full repo checkout of diagram-design) — you have to verify by hand. After rendering in the dev server, run DOM queries rather than trusting a screenshot (see `case-study-conventions.md` on why screenshots are unreliable here):

- `svg.getBBox()` roughly matching the declared `viewBox` (nothing overflowing).
- No two node `<rect>`s overlapping (compare x/y/width/height pairwise).
- Every `<line>` has `y1 === y2` or `x1 === x2` (straight lines only where axis-aligned) — anything else needs a Q-bezier elbow path, not a raw diagonal `<line>`.
- The accessible-SVG contract: `<title>` is the first child, `id`/`aria-labelledby` are unique and prefixed per diagram (never bare `title`/`desc`, which collide when multiple diagrams sit on one page).
- Font classes resolve to the real fonts (see the bug above) — check this explicitly, don't assume.
