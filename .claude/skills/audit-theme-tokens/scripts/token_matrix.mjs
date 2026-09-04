#!/usr/bin/env node
/**
 * Static contrast matrix for a token-based theme.
 *
 * Reads CSS custom properties out of one or more stylesheets, resolves each
 * declared theme (`:root`, `[data-theme=...]`, `.dark`, …), then scores the
 * semantic pairs the naming convention implies.
 *
 * Why this exists alongside the rendered-DOM sweep: the DOM sweep only sees
 * what a page happened to paint. Error text, empty states, destructive
 * buttons and disabled rows frequently never render during a crawl, so their
 * token pairs go unchecked. This catches them from the definitions alone.
 * Run both — they fail in different directions.
 *
 * Usage:
 *   node token_matrix.mjs <css-file...> [--json] [--fail-only] [--config pairs.json]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, over, contrast, hex, solveAlpha, solveLightness } from './contrast.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

// --------------------------------------------------------------- CSS scraping

/**
 * Pull `--name: value;` declarations out of every theme-defining block.
 * We deliberately ignore `@theme` alias blocks (Tailwind v4) whose values are
 * pure `var()` indirection — those are wiring, not colour, and token_audit.py
 * checks that wiring separately.
 */
export function extractThemes(cssFiles) {
  const themes = new Map(); // selector -> Map(name -> raw value)
  for (const file of cssFiles) {
    const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    // Match a selector followed by a balanced-enough block of declarations.
    const blockRe = /([^{}]+?)\{([^{}]*)\}/g;
    let m;
    while ((m = blockRe.exec(css))) {
      const selector = m[1].trim().split('\n').pop().trim();
      const body = m[2];
      if (!body.includes('--')) continue;
      const isTheme =
        /^:root/.test(selector) || /\[data-theme/.test(selector) ||
        /^html/.test(selector) || /\.dark\b/.test(selector) || /^@theme/.test(selector);
      if (!isTheme) continue;
      const key = selector.replace(/\s+/g, ' ');
      if (!themes.has(key)) themes.set(key, new Map());
      const decls = themes.get(key);
      const declRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
      let d;
      while ((d = declRe.exec(body))) decls.set(d[1], d[2].trim());
    }
  }
  return themes;
}

/** Follow `var(--a, fallback)` chains until a literal colour appears. */
function resolve(name, scope, depth = 0) {
  if (depth > 12) return null;
  const raw = scope.get(name);
  if (!raw) return null;
  const v = raw.trim();
  const varMatch = v.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/);
  if (varMatch) {
    return resolve(varMatch[1], scope, depth + 1) ?? (varMatch[2] ? parse(varMatch[2]) : null);
  }
  return parse(v);
}

/**
 * Merge theme blocks into concrete palettes. Every non-root theme inherits
 * from `:root` and overrides it — which is exactly how the cascade behaves,
 * and is why a token missing from an override silently keeps the base value.
 */
export function buildPalettes(themes) {
  const rootKey = [...themes.keys()].find(k => k.startsWith(':root') && !k.includes('[')) || ':root';
  const base = themes.get(rootKey) ?? new Map();
  const palettes = new Map([['default', new Map(base)]]);
  for (const [sel, decls] of themes) {
    if (sel === rootKey || /^@theme/.test(sel)) continue;
    if (![...decls.keys()].some(k => resolve(k, new Map([...base, ...decls])))) continue;
    const name = (sel.match(/\[data-theme=['"]?([\w-]+)/) || [])[1] || sel;
    palettes.set(name, new Map([...base, ...decls]));
  }
  return palettes;
}

// ------------------------------------------------------------- pair inference

// AA is the legally-normative floor (1.4.3 / 1.4.11). AAA (1.4.6) only raises
// the *text* thresholds — 1.4.11 non-text contrast has no AAA tier, so UI
// pairs (boundaries, graphics) are scored against AA only, always.
const TEXT_AA = 4.5, TEXT_AAA = 7, UI = 3;

/**
 * Derive the pairs worth testing from naming convention.
 *
 * The discipline here is to only emit pairs that a component can actually
 * paint. Naive cross-products generate hundreds of meaningless rows —
 * `--secondary on --muted` (two fills that never touch) or
 * `--primary-foreground on --background` (a token that exists solely to sit
 * on `--primary`) — and a report full of impossible failures trains the
 * reader to ignore it. The convention that makes this tractable is shadcn's:
 * `--x-foreground` is *the text on --x*, and nowhere else.
 *
 * Rules:
 *   1. `--x-foreground` on `--x` — every fill and the text it carries.
 *   2. Body text (`--foreground`, `--muted-foreground`, `--*-foreground`
 *      belonging to a surface) on every surface. `--muted-foreground` is the
 *      important one: despite the name it is the dimmed *text* colour used on
 *      all surfaces, not text on `--muted`.
 *   3. Semantic colours used as both fill and text (`--primary`,
 *      `--destructive`, `--success`, …) on every surface.
 *   4. Boundary tokens (`--border`, `--input`, `--ring`) on the surfaces they
 *      outline, at the 3:1 non-text threshold.
 *   5. Graphical tokens (charts, timelines, status dots) against the page.
 *
 * A `--config` file with a `pairs` array replaces this inference entirely,
 * for themes that don't follow the `-foreground` convention.
 */
export function inferPairs(names, config) {
  if (config?.pairs) return config.pairs;
  const has = n => names.includes(n);
  const SURFACE_ROOTS = ['--background', '--card', '--popover', '--muted', '--secondary', '--accent', '--sidebar'];
  const surfaces = SURFACE_ROOTS.filter(has);
  const pairs = [];
  const seen = new Set();
  // `kind: 'text'` pairs get scored against both AA (4.5) and AAA (7); `kind:
  // 'ui'` pairs (boundaries, graphics) only ever have an AA threshold (3) —
  // 1.4.11 Non-text Contrast has no AAA tier, so there is nothing to raise.
  const add = (fg, bg, kind, note, advisory = false) => {
    const k = `${fg}|${bg}`;
    if (fg === bg || seen.has(k) || !has(fg) || !has(bg)) return;
    seen.add(k);
    pairs.push({ fg, bg, kind, note, advisory });
  };

  // 1. every fill and the text that sits on it
  for (const n of names) {
    if (n.endsWith('-foreground')) add(n, n.replace(/-foreground$/, ''), 'text', 'text on its own fill');
  }

  // 2. body text that travels across surfaces
  const bodyText = ['--foreground', '--muted-foreground', '--sidebar-foreground'].filter(has);
  for (const fg of bodyText) for (const bg of surfaces) add(fg, bg, 'text', 'body text on surface');

  // 3. semantic colours that get used as text as well as fill
  const semantic = names.filter(n =>
    /^--(primary|destructive|success|warning|info|error|danger|link)$/.test(n));
  for (const fg of semantic) for (const bg of surfaces) add(fg, bg, 'text', 'semantic text on surface');

  // 4. boundaries — only against surfaces a control is actually drawn on.
  //    `--input`/`--ring`/`--outline` identify a control or its focus state, so
  //    3:1 is required (WCAG 1.4.11). `--border`/`--divider`/`--separator` are
  //    usually decorative chrome, which 1.4.11 exempts — we still measure them,
  //    but mark them advisory so a low number doesn't read as a violation.
  const outlined = ['--background', '--card', '--popover', '--accent'].filter(has);
  const required = names.filter(n => /^--(input|ring|outline)$/.test(n));
  const advisory = names.filter(n => /^--(border|divider|separator|rule)$/.test(n));
  for (const fg of required) for (const bg of outlined) add(fg, bg, 'ui', 'control boundary');
  for (const fg of advisory) for (const bg of outlined) add(fg, bg, 'ui', 'decorative boundary', true);

  // 5. graphical objects against the page they sit on. `-background` and
  //    `-foreground` suffixes mark surfaces and their text, not graphics —
  //    a `--timeline-background` is a panel, not a swatch.
  const graphics = names.filter(n =>
    /^--(chart|timer|timeline|status|sparkline|series|badge|swatch)-/.test(n) &&
    !/-(foreground|background|surface|bg|text)$/.test(n));
  for (const fg of graphics) add(fg, '--background', 'ui', 'graphical object');

  return pairs;
}

// -------------------------------------------------------------------- scoring

export function score(palettes, config) {
  const out = [];
  for (const [theme, scope] of palettes) {
    const names = [...scope.keys()];
    const bgBase = resolve('--background', scope) ?? [0, 0, 0, 1];
    for (const pairDef of inferPairs(names, config)) {
      // Legacy config files may still supply a numeric `need` instead of
      // `kind` — treat that as an AA-only, no-AAA-tier pair (old behaviour).
      const { fg, bg, note, advisory } = pairDef;
      const kind = pairDef.kind ?? (pairDef.need != null ? 'legacy' : 'text');
      const need = pairDef.need ?? (kind === 'ui' ? UI : TEXT_AA);
      const needAAA = kind === 'text' ? TEXT_AAA : null;

      const fgc = resolve(fg, scope), bgRaw = resolve(bg, scope);
      if (!fgc || !bgRaw) continue;
      const bgc = bgRaw[3] < 1 ? over(bgRaw, bgBase) : bgRaw;
      const composited = over(fgc, bgc);
      const r = contrast(composited, bgc);
      const passAA = r >= need;
      const passAAA = needAAA == null ? null : r >= needAAA;
      const rec = {
        theme, fg, bg, note, kind, advisory: !!advisory,
        ratio: +r.toFixed(2),
        need, needAAA,
        pass: passAA, passAA, passAAA,
        fgHex: hex(composited), bgHex: hex(bgc),
        fgRaw: scope.get(fg), bgRaw: scope.get(bg),
      };
      // Suggest a fix for whichever threshold is currently unmet — AAA if the
      // pair already clears AA, otherwise AA (the normative floor).
      const target = !passAA ? need : (passAAA === false ? needAAA : null);
      if (target != null) {
        const raw = String(scope.get(fg) ?? '');
        if (/\/\s*[\d.]+\s*\)$/.test(raw)) {
          const a = solveAlpha(fgc, bgc, target);
          if (a) rec.suggestion = `raise alpha to ~${a} (currently ${(fgc[3]).toFixed(2)}) → ${target}:1`;
        } else if (/^oklch\(/i.test(raw)) {
          const s = solveLightness(raw, bgc, target);
          if (s) rec.suggestion = `${s.css} → ${s.ratio}:1`;
        }
      }
      out.push(rec);
    }
  }
  return out;
}

// ----------------------------------------------------------------------- main

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const args = process.argv.slice(2);
  const files = args.filter(a => !a.startsWith('--'));
  const flag = f => args.includes(f);
  const cfgPath = args[args.indexOf('--config') + 1];
  const config = args.includes('--config') && fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : null;

  if (!files.length) {
    console.error('usage: node token_matrix.mjs <css-file...> [--json] [--fail-only] [--fail-on-aaa] [--config pairs.json]');
    process.exit(2);
  }

  const rows = score(buildPalettes(extractThemes(files)), config);
  // AA is the normative floor (1.4.3 / 1.4.11) — these are real WCAG violations.
  const fails = rows.filter(r => !r.pass && !r.advisory);
  const notes = rows.filter(r => !r.pass && r.advisory);
  // AAA (1.4.6) only exists for text pairs, and only among rows that already
  // clear AA — a row failing AA is reported there, never double-counted here.
  const aaaMisses = rows.filter(r => r.pass && r.kind === 'text' && r.passAAA === false);
  const interesting = r => !r.pass || (r.kind === 'text' && r.passAAA === false);

  if (flag('--json')) {
    console.log(JSON.stringify(
      { total: rows.length, failures: fails.length, advisories: notes.length, aaaMisses: aaaMisses.length, rows }, null, 2));
  } else {
    for (const theme of new Set(rows.map(r => r.theme))) {
      // Rank by how far short of its own threshold each pair falls, so a 2.4:1
      // boundary sorts above a 4.4:1 label — both fail, but not equally badly.
      const set = rows.filter(r => r.theme === theme).sort((a, b) => a.ratio / a.need - b.ratio / b.need);
      console.log(`\n===== theme: ${theme} =====`);
      for (const r of set) {
        if (flag('--fail-only') && !interesting(r)) continue;
        const tag = !r.pass ? (r.advisory ? '~~' : 'XX') : (r.kind === 'text' && r.passAAA === false ? 'A-' : '  ');
        const needStr = r.needAAA != null ? `need ${r.need}, AAA ${r.needAAA}` : `need ${r.need}`;
        console.log(
          `${tag} ${String(r.ratio).padStart(6)} (${needStr})  ${(r.fg + ' on ' + r.bg).padEnd(48)} ${r.fgHex} on ${r.bgHex}` +
          (r.suggestion ? `\n         ↳ ${r.suggestion}` : '')
        );
      }
    }
    console.log(
      `\n${fails.length} AA violation(s), ${aaaMisses.length} AAA-only miss(es), ${notes.length} advisory, of ${rows.length} pairs checked.`);
    if (notes.length) {
      console.log(
        `~~ = decorative boundary below 3:1. WCAG 1.4.11 exempts borders that don't\n` +
        `   identify a control. Check what actually uses the token before "fixing" it —\n` +
        `   if it only draws card outlines and separators, leaving it is the right call.`);
    }
    if (aaaMisses.length) {
      console.log(
        `A- = clears AA (1.4.3, the legal floor) but falls short of AAA (1.4.6, 7:1 /\n` +
        `   4.5:1 for large text). Not a violation unless the project targets AAA —\n` +
        `   report it as an opportunity, not alongside real failures.`);
    }
  }
  process.exit((fails.length || (flag('--fail-on-aaa') && aaaMisses.length)) ? 1 : 0);
}
