/**
 * Shared Chromium runner for generated card images. Keep every card family
 * rendering through this module — the moment there are two, they drift apart.
 *
 * Requires: bun add -d playwright-core sharp
 *           bunx playwright-core install chromium
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

export type CardJob = {
  /** Output filename stem — written as `<slug>.png`. */
  readonly slug: string;
  readonly html: string;
};

export type RenderOptions = {
  readonly width: number;
  readonly height: number;
  /** Device pixel ratio. Use 1 for images served raw off disk (e.g. Open Graph). */
  readonly scale?: number;
  /** Quantize the PNG. Skip for source art a project's own pipeline will re-encode. */
  readonly optimize?: boolean;
};

export const escapeHtml = (value: string): string => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Reads a local image into a data URI, since a string-rendered page has no base URL. */
export const imageDataUri = async (file: string): Promise<string> => {
  const buffer = await fs.promises.readFile(file);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buffer.toString('base64')}`;
};

/**
 * Renders each job to its exact output path.
 *
 * The `document.fonts.ready` await is load-bearing: without it the screenshot
 * can land before webfonts swap in, and the display face silently falls back to
 * a system serif — a failure that's easy to miss because the card still looks
 * plausible, just generic.
 */
export const renderCards = async (jobs: readonly CardJob[], outFiles: readonly string[], options: RenderOptions): Promise<void> => {
  const { width, height, scale = 1, optimize = false } = options;
  if (jobs.length !== outFiles.length) throw new Error('jobs and outFiles must be the same length');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const target = outFiles[i];
    fs.mkdirSync(path.dirname(target), { recursive: true });

    await page.setContent(job.html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);

    const shot = await page.screenshot({ type: 'png' });

    if (optimize) await sharp(shot).png({ palette: true, quality: 90, effort: 8 }).toFile(target);
    else fs.writeFileSync(target, shot);

    console.log(`wrote ${path.relative(process.cwd(), target)} (${job.slug})`);
  }

  await browser.close();
};
