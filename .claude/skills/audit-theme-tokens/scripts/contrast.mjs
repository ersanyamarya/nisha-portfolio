/**
 * Color math for theme audits. No dependencies — runs under plain `node`.
 *
 * Parses the color syntaxes design tokens actually get written in (hex, rgb,
 * hsl, oklch, oklab, and the `/ alpha` variants), composites alpha over an
 * opaque backdrop, and computes WCAG 2.x contrast ratios.
 *
 * Note on precision: WCAG contrast is defined on sRGB, so everything is
 * converted to sRGB first. oklch/oklab go through the Oklab -> linear sRGB
 * matrix and are gamut-clipped, which matches what a browser paints closely
 * enough for pass/fail decisions. When a value sits within ~0.1 of a
 * threshold, confirm it against the rendered DOM (see probe.js) rather than
 * trusting this module alone.
 */

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

// ---------------------------------------------------------------- conversions

function oklabToRgb(L, a, b, alpha = 1) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const enc = u => {
    u = clamp(u, 0, 1);
    return (u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055) * 255;
  };
  return [enc(r), enc(g), enc(bl), alpha];
}

const oklchToRgb = (L, C, h, alpha = 1) =>
  oklabToRgb(L, C * Math.cos((h * Math.PI) / 180), C * Math.sin((h * Math.PI) / 180), alpha);

function hslToRgb(h, s, l, alpha = 1) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255, alpha];
}

function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join('');
  const v = n => parseInt(h.slice(n, n + 2), 16);
  return [v(0), v(2), v(4), h.length === 8 ? v(6) / 255 : 1];
}

const NAMED = {
  transparent: [0, 0, 0, 0], black: [0, 0, 0, 1], white: [255, 255, 255, 1],
  red: [255, 0, 0, 1], green: [0, 128, 0, 1], blue: [0, 0, 255, 1],
  currentcolor: null, inherit: null, none: null, unset: null, initial: null,
};

/** Pull the numeric arguments out of a functional color, honouring `/ alpha`. */
function fnArgs(body) {
  const [main, alphaPart] = body.split('/');
  const nums = (main.match(/-?[\d.]+%?/g) || []).map(t =>
    t.endsWith('%') ? { pct: parseFloat(t) } : { n: parseFloat(t) });
  let alpha = 1;
  if (alphaPart !== undefined) {
    const t = alphaPart.trim();
    alpha = t.endsWith('%') ? parseFloat(t) / 100 : parseFloat(t);
  }
  return { nums, alpha: Number.isFinite(alpha) ? alpha : 1 };
}

/**
 * Parse any CSS color string to [r, g, b, a] with r/g/b in 0..255.
 * Returns null for values that have no intrinsic color (currentColor, var(), …)
 * so callers can skip them instead of silently treating them as black — a
 * mistake that manufactures spectacular fake contrast failures.
 */
export function parse(input) {
  if (!input) return null;
  const s = String(input).trim().toLowerCase();
  if (s in NAMED) return NAMED[s];
  if (s.startsWith('var(') || s.includes('gradient(')) return null;
  if (s.startsWith('#')) return hexToRgb(s);

  const m = s.match(/^(oklch|oklab|hsla?|rgba?)\(([^)]*)\)$/);
  if (!m) return null;
  const [, fn, body] = m;
  const { nums, alpha } = fnArgs(body.replace(/,/g, ' '));
  const val = (i, scale = 1) =>
    nums[i] === undefined ? 0 : nums[i].pct !== undefined ? (nums[i].pct / 100) * scale : nums[i].n;

  // rgb()/hsl() legacy syntax may carry alpha as a 4th positional argument.
  const positionalAlpha = nums.length > 3 ? (nums[3].pct !== undefined ? nums[3].pct / 100 : nums[3].n) : alpha;

  if (fn === 'rgb' || fn === 'rgba') return [val(0, 255), val(1, 255), val(2, 255), positionalAlpha];
  if (fn === 'hsl' || fn === 'hsla') return hslToRgb(val(0), val(1, 100), val(2, 100), positionalAlpha);
  if (fn === 'oklch') return oklchToRgb(val(0, 1), val(1, 0.4), val(2), positionalAlpha);
  if (fn === 'oklab') return oklabToRgb(val(0, 1), val(1, 0.4), val(2, 0.4), positionalAlpha);
  return null;
}

// ------------------------------------------------------------------- contrast

/** Composite a possibly-translucent colour over an opaque backdrop. */
export function over(fg, bg) {
  if (!fg) return bg;
  const a = fg[3] ?? 1;
  return [
    fg[0] * a + bg[0] * (1 - a),
    fg[1] * a + bg[1] * (1 - a),
    fg[2] * a + bg[2] * (1 - a),
    1,
  ];
}

export function luminance([r, g, b]) {
  const f = u => {
    u = clamp(u, 0, 255) / 255;
    return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** WCAG 2.x contrast ratio, 1..21. Both arguments must already be opaque. */
export function contrast(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** Convenience: ratio of `fg` (may be translucent) against opaque `bg`. */
export function ratio(fg, bg) {
  const f = typeof fg === 'string' ? parse(fg) : fg;
  const b = typeof bg === 'string' ? parse(bg) : bg;
  if (!f || !b) return null;
  const base = b[3] < 1 ? over(b, [0, 0, 0, 1]) : b;
  return contrast(over(f, base), base);
}

export const hex = ([r, g, b]) =>
  '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');

// ------------------------------------------------------------------- solvers

/**
 * Smallest alpha in (0,1] at which `fg` over `bg` reaches `target`.
 * Useful for translucent border tokens like `oklch(1 0 0 / 0.12)` where the
 * question is not "what colour" but "how much of it".
 * Returns null when even fully opaque falls short.
 */
export function solveAlpha(fg, bg, target, step = 0.005) {
  const f = typeof fg === 'string' ? parse(fg) : fg;
  const b = typeof bg === 'string' ? parse(bg) : bg;
  if (!f || !b) return null;
  for (let a = step; a <= 1.0001; a += step) {
    if (contrast(over([f[0], f[1], f[2], a], b), b) >= target) return Math.round(a * 1000) / 1000;
  }
  return null;
}

/**
 * Nudge an oklch token's lightness until it clears `target` against `bg`,
 * keeping chroma and hue so the palette's character survives. Direction is
 * chosen automatically: lighten on dark backdrops, darken on light ones.
 * Returns { L, css, ratio } or null if the hue can't get there.
 */
export function solveLightness(oklchStr, bg, target) {
  const m = String(oklchStr).match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
  const b = typeof bg === 'string' ? parse(bg) : bg;
  if (!m || !b) return null;
  const [, , C, H] = m;
  const up = luminance(b) < 0.18;
  for (let i = 1; i <= 100; i++) {
    const L = clamp(parseFloat(m[1]) + (up ? i : -i) * 0.01, 0, 1);
    const css = `oklch(${L.toFixed(2)} ${C} ${H})`;
    const r = contrast(over(parse(css), b), b);
    if (r >= target) return { L: +L.toFixed(2), css, ratio: +r.toFixed(2) };
    if (L <= 0 || L >= 1) break;
  }
  return null;
}
