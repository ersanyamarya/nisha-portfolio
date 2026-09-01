# Choosing replacement values

Finding a failure is the easy half. Picking a value that fixes it without wrecking the design — and without pushing the failure somewhere else — is where an audit either earns trust or loses it.

## Contents

- [Fix the token, not the call site](#fix-the-token-not-the-call-site)
- [Moving lightness, keeping character](#moving-lightness-keeping-character)
- [Translucent tokens: solve for alpha](#translucent-tokens-solve-for-alpha)
- [The foreground flip trap](#the-foreground-flip-trap)
- [Diluted text utilities](#diluted-text-utilities)
- [Focus indicators](#focus-indicators)
- [Theme inheritance is leverage](#theme-inheritance-is-leverage)
- [Ordering the work](#ordering-the-work)

## Fix the token, not the call site

A failure that reaches many components almost always wants a token change. One edit to `--muted-foreground` fixes every dimmed label in the product; twenty edits to twenty components fix twenty components and drift apart within a month.

Fix at the call site only when the call site is the anomaly — a single hardcoded colour, a single `border-0` that removed a control's only boundary, one `hover:` that dims text.

## Moving lightness, keeping character

For a token in `oklch()`, adjust **L** and leave C and H alone. That is the whole point of the colour space: lightness moves independently, so the hue and saturation the designer chose survive. `contrast.mjs` exports `solveLightness()` for this, and `token_matrix.mjs` prints the suggestion inline.

For hex or hsl tokens, convert the intent the same way — move lightness, keep hue. Do not reach for "a slightly different colour that happens to pass"; that is how a considered palette turns into an arbitrary one.

Give yourself margin. A value landing at 4.52:1 is one rounding difference or one antialiasing decision from failing, and it will be re-flagged by the next audit. Aim for roughly 5:1 on 4.5:1 requirements and 3.4:1 on 3:1 requirements.

## Translucent tokens: solve for alpha

Border and overlay tokens are often `white / 0.12` rather than a colour. The fix is more alpha, not a different hue — and the required alpha is computable, so compute it instead of guessing:

```js
import { solveAlpha, parse } from './contrast.mjs';
solveAlpha('#ffffff', parse('oklch(0.16 0.01 250)'), 3); // -> 0.335
```

Two cautions:

- A translucent token composites differently over each surface. Check it against the darkest _and_ lightest surface it lands on — `token_matrix.mjs` tests all of them.
- Alpha over a dark background saturates fast. If `solveAlpha` returns `null`, the base colour cannot reach the target at any opacity and the token needs a different colour.

## The foreground flip trap

Brightening a fill to fix it as _text_ frequently breaks the text that sits _on_ it. This is the most common way an audit fix introduces a new failure.

Concretely: a dark red `--destructive` fails at 3.65:1 as error-message text. Brighten it to 6.24:1 and now `--destructive-foreground: white` sits on it at 2.8:1 — you traded one violation for another.

So after changing any fill token, **re-check its `-foreground` partner**. Often the partner has to flip from light to dark. That is a visible design change, and it is worth calling out explicitly rather than slipping it in — though it is usually the right call, and it usually looks consistent because the same theme already does dark-on-colour for its primary button.

`token_matrix.mjs` catches this automatically: the `--x-foreground on --x` pair is always in the matrix, so re-running it after an edit surfaces the flip.

## Diluted text utilities

`text-muted-foreground/70` is a token deliberately weakened at one call site. Almost always the right fix is to delete the dilution: the token already encodes "this text is secondary", and dimming it further is re-deciding a system-level question locally.

Watch for two variants:

- **Hover that dims** (`hover:text-primary/80`) — always a bug, see `wcag-thresholds.md`.
- **Decorative glyphs** (a `·` separator at `/40`) — arguably exempt, but the fix costs nothing and removes a special case, so just use the plain token.

## Focus indicators

The reliable default is 2px with a 2px offset in the ring colour:

```
focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 focus-visible:ring-offset-background
```

For text fields, shifting the border to the ring colour on focus (`focus-visible:border-ring`) reads more naturally than an offset halo, since the field already has a visible border to promote.

Small controls (checkbox, radio, slider thumb) need the offset most — a ring drawn flush against a 16px box is nearly invisible against the control's own border.

One caveat on `ring-offset-background`: on a card, the offset gap is painted in _page_ background, not card background, which can read as a faint dark halo. Usually unnoticeable; if it bothers the design, drop the offset on card-nested controls and rely on ring width.

## Theme inheritance is leverage

Before editing the same token in every theme, check whether the overrides actually redeclare it. `token_audit.py`'s **theme parity** section lists tokens each override inherits from `:root`. A token that only exists in `:root` can be fixed once and every theme picks it up.

The inverse is the trap: a token _is_ overridden per theme, you fix the base, and the override silently keeps the broken value. Re-run the matrix across all themes after any token edit — it is a second of compute and it is exactly the mistake that ships.

## Ordering the work

Rank by how many users hit it and how badly, not by ratio alone:

1. **Text that is unreadable in a normal flow** — body copy, labels, form error messages. Error messages especially: they appear at the moment someone is already stuck.
2. **Controls with no visible boundary.** A form field nobody can locate is a worse failure than a label at 4.2:1, even though 1.4.11's threshold is lower.
3. **Focus indicators**, for anyone navigating by keyboard.
4. **Meaningful graphics** — chart series, status swatches, calendar fills.
5. **Everything within ~0.3 of its threshold**, as a margin pass.

Then stop. Decorative chrome sitting below 3:1 belongs in the report as an explicit "left alone, and here's why" — not in the diff.
