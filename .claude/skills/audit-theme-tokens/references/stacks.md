# Finding the tokens in an unfamiliar project

Step one of every audit is answering: _where is the palette declared, and how does a component reach it?_ Get this wrong and the scripts report an empty theme or a hundred phantom findings.

## Contents

- [Locating the token layer](#locating-the-token-layer)
- [Tailwind v4](#tailwind-v4)
- [Tailwind v3](#tailwind-v3)
- [Plain CSS custom properties](#plain-css-custom-properties)
- [CSS-in-JS](#css-in-js)
- [Design tokens as JSON](#design-tokens-as-json)
- [Multiple themes](#multiple-themes)
- [When there is no token layer](#when-there-is-no-token-layer)

## Locating the token layer

Fast, stack-agnostic first look:

```bash
grep -rln --include=*.css --include=*.scss -e ':root' -e 'data-theme' -e '@theme' . \
  | grep -v node_modules | head
grep -rln --include=*.ts --include=*.js -e 'tailwind.config' -e 'defineTheme' -e 'createTheme' . \
  | grep -v node_modules | head
```

Then confirm how many distinct themes exist:

```bash
grep -rhoE "\[data-theme=['\"]?[\w-]+|\.dark\b|prefers-color-scheme:\s*\w+" \
  <token-file> | sort -u
```

A theme you don't know about is a theme you don't audit. `token_audit.py` prints the themes it found in its header — if that list is shorter than what you just grepped, point `--css` at more files before going further.

## Tailwind v4

Tokens live in CSS. Two blocks with different jobs:

```css
@theme inline {
  /* wiring: makes utilities exist */
  --color-primary: var(--primary);
}
:root {
  /* values: the actual palette */
  --primary: oklch(0.7 0.15 40);
}
:root[data-theme='dark'] {
  --primary: oklch(0.8 0.12 40);
}
```

`--color-primary` in `@theme` is what creates `bg-primary` / `text-primary`. A value declared in `:root` but absent from `@theme` is unreachable by utilities — that is what `token_audit.py` reports as **unwired**.

```bash
node token_matrix.mjs src/styles/global.css
python3 token_audit.py --css src/styles/global.css --src src
```

Note the naming shift: `@theme` declares `--color-x`, and the utility suffix is `x`. `token_audit.py` maps between the two so `text-primary` counts as usage of `--primary`.

## Tailwind v3

Tokens live in `tailwind.config.{js,ts}`, usually referencing CSS variables:

```js
colors: {
  primary: 'hsl(var(--primary))';
}
```

The scripts read CSS, not config, so:

- Point `--css` at the stylesheet holding the `:root` blocks (typically `globals.css`). That is where the real values are.
- The config is only the wiring layer — read it to learn the utility names, but the palette itself is still CSS.

If a v3 project puts literal colours _in the config_ rather than in CSS, the static matrix can't read them. Extract them to a scratch CSS file:

```bash
node -e "const c=require('./tailwind.config.js').theme.extend.colors;
console.log(':root{'+Object.entries(c).map(([k,v])=>'--'+k+':'+v).join(';')+'}')" \
  > /tmp/tokens.css
```

…then run the matrix on that. The rendered sweep is unaffected either way — it reads what the browser painted, so it works regardless of where tokens live.

## Plain CSS custom properties

The simplest case, and what the scripts assume natively. Just point them at the file. If tokens are split across several files, pass a glob:

```bash
python3 token_audit.py --css "src/styles/**/*.css" --src src
```

## CSS-in-JS

styled-components, Emotion, vanilla-extract, Panda, Stitches. The static matrix generally **cannot** read these — values live in JS objects, and vanilla-extract generates hashed variable names at build time.

Do this instead:

1. **Rely on the rendered sweep.** `probe.js` reads computed styles, so it works on any stack. Make this your primary evidence.
2. For the static pass, find the theme object and either read it directly or dump it to CSS:
   ```bash
   node -e "import('./src/theme.ts').then(m=>console.log(':root{'+
     Object.entries(m.colors).map(([k,v])=>'--'+k+':'+v).join(';')+'}'))" > /tmp/tokens.css
   ```
3. `token_audit.py --src` still works — it finds hardcoded colours and usage patterns in `.ts`/`.tsx` regardless of the styling library.

vanilla-extract specifically: `createTheme` emits real CSS custom properties, so inspect the built CSS in `dist/` and run the matrix on that.

## Design tokens as JSON

Style Dictionary / W3C design-token format. These build _into_ CSS — audit the build output, then trace fixes back to the JSON source. Never edit the generated CSS; it will be overwritten on the next build. Say so explicitly in the report, with the source path for each finding.

## Multiple themes

Every finding must be reported per theme, because a token overridden in one theme and inherited in another can pass in one and fail in the other. Both scripts take a theme list:

```bash
node a11y_sweep.mjs --base http://localhost:3000 --paths / /app \
  --themes "light:" "dark:.dark" "hc:data-theme=high-contrast"
```

Theme spec forms: `''` (default, no change), `.class` (added to `<html>`), `attr=value` (set on `<html>`). If a project switches themes some other way — a cookie, a server round-trip, a React context — drive the app's own toggle before probing rather than forcing the attribute, so you measure what users actually get.

Also check `prefers-color-scheme` media blocks. Those aren't reachable by setting an attribute; use Playwright's `colorScheme` context option or the browser tooling's emulation.

## When there is no token layer

Sometimes the answer is that the project hardcodes colours everywhere. Then the audit's most valuable output isn't a contrast table — it's the inventory.

`token_audit.py --src` gives you every literal colour with file and line. Group them by value, count the occurrences, and propose the semantic token set that would replace them. That inventory _is_ the deliverable; contrast findings on a palette that doesn't exist yet are premature.
