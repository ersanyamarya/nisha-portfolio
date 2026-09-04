# Thresholds and exemptions

The whole value of an audit is that its findings are _true_. A report that chases exempt decoration teaches the reader to ignore the report. Knowing what is genuinely required is therefore the most important part of this skill.

## Contents

- [The three thresholds](#the-three-thresholds)
- [What counts as large text](#what-counts-as-large-text)
- [Exemptions — things that look like failures but aren't](#exemptions)
- [The border vs input distinction](#the-border-vs-input-distinction)
- [States: hover, focus, disabled, placeholder](#states)
- [Colour as the only signal (1.4.1)](#colour-as-the-only-signal)

## The three thresholds

| Ratio       | Applies to                                                                      | Success criterion             |
| ----------- | -------------------------------------------------------------------------------- | ------------------------------ |
| **4.5:1**   | Normal body text and images of text                                             | 1.4.3 Contrast (Minimum), AA   |
| **3:1**     | Large text                                                                      | 1.4.3, AA                      |
| **3:1**     | UI component boundaries and meaningful graphics, each against _adjacent_ colour | 1.4.11 Non-text Contrast, AA   |
| **7:1**     | Normal body text and images of text                                             | 1.4.6 Contrast (Enhanced), AAA |
| **4.5:1**   | Large text                                                                      | 1.4.6, AAA                     |

There is no AAA tier for 1.4.11 — non-text contrast tops out at 3:1 regardless of the level the project targets, because the spec never raised it.

**Run both levels by default, and report them as two different kinds of finding — never blend them into one count.** AA is the legally-normative floor: a real AA failure is a violation regardless of what the project has said about its ambitions. An AAA miss on a pair that already clears AA is not a violation of anything the project has committed to unless it explicitly targets AAA — it is an opportunity, reported separately, with its own severity. `token_matrix.mjs` and `probe.js`/`a11y_sweep.mjs` both do this: every result carries a `pass`/`passAA` and a `passAAA`, and the two failure sets never overlap (an AA failure is never also listed as an AAA miss — that would double-count the same defect at two severities). The CLI tag is `XX` for an AA violation, `A-` for "clears AA, falls short of AAA", `~~` for exempt decorative boundaries.

When writing up findings, lead with AA violations — they are the real defects. List AAA misses in their own section, and say plainly that they are not violations unless the project has stated an AAA target; inflating the finding count by treating them the same way buries the real problems and teaches the reader to distrust the report.

## What counts as large text

≥ 24px, **or** ≥ 18.66px when the weight is ≥ 700. `probe.js` computes this from the resolved `font-size` and `font-weight` rather than trusting utility names, because `text-xl` means different things across projects and a `font-semibold` (600) heading at 20px is _not_ large text — it needs the full 4.5:1.

## Exemptions

These are genuinely exempt. Do not "fix" them, and say in the report why you left them:

- **Decorative text** — a watermark numeral behind a real `<h1>`, ornamental glyphs. Exempt under 1.4.3 as pure decoration, _provided_ the information is carried by something else. Check that it is before waving it through.
- **Disabled controls** — 1.4.3 and 1.4.11 both exempt inactive components. A `disabled:opacity-50` button is fine.
- **Logos and brand marks** — exempt as "incidental" / logotype. Brand hex values hardcoded for third-party logos (a Twitter blue, a LinkedIn blue) are correct as literals; they must _not_ follow your theme.
- **Invisible / zero-area text** — screen-reader-only spans, `sr-only`.
- **Decorative boundaries** — see below.
- **Text over photographs** — not exempt, but the ratio genuinely varies across the image. `probe.js` marks these `backdropUncertain`; judge them from a screenshot rather than from a single sampled pixel.

## The border vs input distinction

This is the distinction that decides most non-text findings, and it is the one most audits get wrong in both directions.

1.4.11 requires 3:1 for "visual information required to identify user interface components and states". So the question is never "is this a border?" — it is **"if this were invisible, could you still tell the control is there?"**

- A **card outline** or a **section separator**: the card is identifiable from its own background, its padding, its content. The border is chrome. **Exempt.**
- An **input border on a transparent field**: remove it and the field vanishes entirely. It is the only thing identifying the control. **3:1 required.**
- A **focus ring**: it communicates state. **3:1 required** against the adjacent background, and it also needs to be actually perceivable — see below.

`token_matrix.mjs` encodes this by marking `--border`/`--divider`/`--separator` findings as advisory (`~~`) and `--input`/`--ring`/`--outline` as violations (`XX`). But naming is a heuristic, not proof. **Check what actually consumes the token before deciding.** A project that uses `border-border` on its inputs has a real violation regardless of what the token is called — and a project whose `--input` only ever draws a decorative rule does not.

The failure mode worth naming: raising a decorative `--border` to 3:1 puts hard grey lines around every card in the product. It is a visible, unwanted redesign justified by a rule that did not apply.

## States

- **Hover must not reduce contrast.** `text-primary hover:text-primary/80` makes the link _harder_ to read on hover. This is always a bug and always cheap to fix — the hover affordance should come from an underline or a background change, not from dimming. Grep for `hover:text-*/[0-9]` early.
- **Focus indicators** need 3:1 against the adjacent background (1.4.11), and 2.4.7 requires them to be visible at all. A 1px ring flush against a control's own border technically passes the ratio while being genuinely easy to miss; 2px with a 2px offset is the reliable default. 2.4.13 (AAA) specifies minimum area and a 2px-thick perimeter if you want a concrete target.
- **Placeholder text** is real text and needs 4.5:1. It commonly inherits `--muted-foreground`, so it passes or fails with that token.
- **Disabled** is exempt, as above.

## Colour as the only signal

1.4.1 Use of Colour is separate from contrast and easy to miss in a theme audit. If a calendar distinguishes "holiday" from "leave" only by fill colour, or a chart identifies series only by hue, the information is unavailable to someone who can't distinguish those hues — even at a perfect contrast ratio.

Look for a second channel: a text label, an icon, a pattern, a direct label on the series. Chart palettes are the usual offender. Note it in the report even though it isn't a contrast finding; it comes from the same review of the same tokens, and nobody else is going to catch it.
