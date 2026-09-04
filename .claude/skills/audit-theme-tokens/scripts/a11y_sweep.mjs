#!/usr/bin/env node
/**
 * Drive probe.js across pages × themes against a running dev server.
 *
 * The static token matrix proves the palette is sound in principle. This
 * proves it survives contact with real markup — opacity utilities, nested
 * translucent surfaces, third-party widgets and vendor stylesheets that never
 * appear in the token file at all.
 *
 * Usage:
 *   node a11y_sweep.mjs --base http://localhost:8080 \
 *        --paths / /blog/ /tools/ \
 *        --themes default:'' developer:'data-theme=developer' \
 *        [--viewport 1440x1000] [--json out.json] [--include-passing] [--fail-on-aaa]
 *
 * Themes are given as `label:spec`, where spec is empty for the default, or
 * `attr=value` / `.class` to apply to <html>.
 *
 * Reports two independent counts: AA violations (1.4.3, the legally-normative
 * floor — a nonzero count here is a real failure) and AAA-only misses (1.4.6,
 * a node that already clears AA but falls short of 7:1 / 4.5:1 for large
 * text). AAA misses never overlap AA failures. The exit code is nonzero on AA
 * failures only, unless `--fail-on-aaa` is passed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

async function loadChromium() {
  for (const mod of ['playwright-core', 'playwright', '@playwright/test']) {
    try {
      const m = await import(mod);
      if (m.chromium) return m.chromium;
    } catch { /* try the next one */ }
  }
  console.error(
    'Could not import Playwright.\n' +
    '  npm i -D playwright-core   (or bun add -d playwright-core)\n' +
    'No Playwright available at all? Skip this script and drive probe.js through\n' +
    "the Playwright/Chrome DevTools MCP instead — read the file and pass its body\n" +
    'to an `evaluate` call, then invoke window.__contrastProbe().'
  );
  process.exit(2);
}

function parseArgs(argv) {
  const out = { paths: [], themes: [], viewport: '1440x1000', base: 'http://localhost:3000' };
  let key = null;
  for (const a of argv) {
    if (a.startsWith('--')) { key = a.slice(2); if (key === 'json') out.json = true; continue; }
    if (key === 'paths') out.paths.push(a);
    else if (key === 'themes') out.themes.push(a);
    else if (key) out[key] = a;
  }
  if (!out.paths.length) out.paths = ['/'];
  if (!out.themes.length) out.themes = ['default:'];
  return out;
}

/** Apply a theme spec to <html>: `attr=value`, `.class`, or '' for default. */
function themeApplier() {
  return spec => {
    const el = document.documentElement;
    // Clear anything a previous theme left behind.
    for (const a of [...el.attributes]) {
      if (/^data-(theme|mode|color-scheme)$/.test(a.name)) el.removeAttribute(a.name);
    }
    el.classList.remove('dark', 'light');
    if (!spec) return;
    if (spec.startsWith('.')) el.classList.add(spec.slice(1));
    else {
      const [k, v = ''] = spec.split('=');
      el.setAttribute(k, v);
    }
  };
}

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  const chromium = await loadChromium();
  const probeSrc = fs.readFileSync(path.join(here, 'probe.js'), 'utf8');
  const [w, h] = args.viewport.split('x').map(Number);

  const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();

  const report = { base: args.base, viewport: args.viewport, pages: [] };
  let totalFailAA = 0, totalFailAAA = 0, totalChecked = 0;

  for (const spec of args.themes) {
    const [label, ...rest] = spec.split(':');
    const themeSpec = rest.join(':');
    for (const p of args.paths) {
      const url = args.base.replace(/\/$/, '') + p;
      const entry = { theme: label, path: p, failuresAA: [], failuresAAA: [], checked: 0 };
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.evaluate(themeApplier(), themeSpec);
        // Let theme transitions and reveal animations settle; a probe run
        // mid-transition reads half-applied colours.
        await page.waitForTimeout(700);
        await page.evaluate(probeSrc);
        const res = await page.evaluate(
          o => window.__contrastProbe(o),
          { includePassing: !!args['include-passing'] }
        );
        entry.checked = res.checked;
        entry.failuresAA = res.failuresAA;
        entry.failuresAAA = res.failuresAAA;
        totalChecked += res.checked;
        totalFailAA += res.failuresAA.length;
        totalFailAAA += res.failuresAAA.length;
      } catch (e) {
        entry.error = String(e.message || e).slice(0, 160);
      }
      report.pages.push(entry);

      const uniqAA = [...new Map(entry.failuresAA.map(f => [f.color + f.bg + f.size, f])).values()];
      const uniqAAA = [...new Map(entry.failuresAAA.map(f => [f.color + f.bg + f.size, f])).values()];
      console.log(
        `\n[${label}] ${p} — ${entry.checked} text nodes, ${entry.failuresAA.length} AA violation(s) ` +
        `(${uniqAA.length} distinct), ${entry.failuresAAA.length} AAA-only miss(es) (${uniqAAA.length} distinct)`
      );
      if (entry.error) console.log(`   ERROR ${entry.error}`);
      for (const f of uniqAA.slice(0, 12)) {
        console.log(
          `   XX ${String(f.ratio).padStart(5)} < ${f.needAA}  ${f.size}px/${f.weight}  "${f.text.slice(0, 40)}"` +
          (f.backdropUncertain ? '  [backdrop is a gradient/image — ratio varies]' : '') +
          `\n        ${f.color} on ${f.bg}\n        ${f.cls || f.path}`
        );
      }
      if (uniqAA.length > 12) console.log(`   … ${uniqAA.length - 12} more distinct AA violation(s)`);
      for (const f of uniqAAA.slice(0, 12)) {
        console.log(
          `   A- ${String(f.ratio).padStart(5)} < ${f.needAAA}  ${f.size}px/${f.weight}  "${f.text.slice(0, 40)}"` +
          (f.backdropUncertain ? '  [backdrop is a gradient/image — ratio varies]' : '') +
          `\n        ${f.color} on ${f.bg}\n        ${f.cls || f.path}`
        );
      }
      if (uniqAAA.length > 12) console.log(`   … ${uniqAAA.length - 12} more distinct AAA-only miss(es)`);
    }
  }

  await browser.close();

  report.summary = { totalChecked, totalFailuresAA: totalFailAA, totalFailuresAAA: totalFailAAA };
  if (args.json) {
    const dest = typeof args.json === 'string' ? args.json : 'contrast-sweep.json';
    fs.writeFileSync(dest, JSON.stringify(report, null, 2));
    console.log(`\nWrote ${dest}`);
  }
  console.log(
    `\n${totalFailAA} AA violation(s), ${totalFailAAA} AAA-only miss(es) across ` +
    `${report.pages.length} page/theme combinations (${totalChecked} checked).`
  );
  if (totalFailAAA && !totalFailAA) {
    console.log('AA (the legally-normative floor) is clean; the AAA misses above are an aspirational target, not violations.');
  }

  if (totalFailAA === 0 && totalFailAAA === 0) {
    console.log(
      '\nBefore trusting a clean sweep: confirm the probe can actually fail. Revert\n' +
      'the theme to its pre-fix state (git stash) and re-run — if it still reports\n' +
      'zero, the probe is not reaching your content and the result means nothing.'
    );
  }
  process.exit((totalFailAA || (args['fail-on-aaa'] && totalFailAAA)) ? 1 : 0);
};

main();
