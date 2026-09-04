/**
 * Rendered-contrast probe. Runs *inside the page*.
 *
 * Walks every text node, works out what is actually painted behind it, and
 * reports the pairs that miss their WCAG threshold. Use it via a11y_sweep.mjs,
 * or paste the function body into any browser-automation `evaluate` call
 * (Playwright MCP, Chrome DevTools MCP, devtools console).
 *
 * Two things here are load-bearing, and both are mistakes that produce
 * confidently wrong results if you write this from scratch:
 *
 *  1. COLOURS COME BACK AS oklab(). `getComputedStyle().color` does not return
 *     the syntax the author wrote. Chromium normalises modern colour spaces to
 *     `oklab(0.93 -0.013 0.004 / 0.7)`. Regex-scraping the first three numbers
 *     as if they were RGB yields near-black for everything and a report full of
 *     spectacular 1.01:1 "failures". Every colour is therefore round-tripped
 *     through a canvas, which forces the browser itself to resolve it to sRGB.
 *
 *  2. ANCESTOR opacity MUST NOT BE APPLIED TO THE TEXT ALONE. A fade-in wrapper
 *     at opacity 0.3 dims the text and its background together — the ratio is
 *     unchanged. Multiplying only the foreground by the inherited opacity chain
 *     invents failures on any page with reveal animations, and those settle at
 *     opacity 1 anyway. So ancestor opacity is ignored outright.
 *
 * Returns { checked, failuresAA, failuresAAA, failures (alias of failuresAA),
 * all }. AA (1.4.3) is the legally-normative floor; AAA (1.4.6) only raises
 * the *text* thresholds to 7:1 / 4.5:1 for large text, so `failuresAAA` only
 * ever contains nodes that already clear AA — a node failing AA is never
 * double-counted there. Each entry carries enough context (selector path,
 * class list, both colours) to find it in source.
 */
window.__contrastProbe = function contrastProbe(options) {
  const opts = Object.assign({ minArea: 4, includePassing: false }, options || {});

  // -- colour resolution via canvas ---------------------------------------
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();

  function toRGBA(spec) {
    if (!spec) return null;
    if (cache.has(spec)) return cache.get(spec);
    let out = null;
    if (spec !== 'transparent' && spec !== 'none') {
      try {
        // Paint the colour over black and over white. The difference across
        // the two backdrops reveals its alpha; the black pass gives the
        // premultiplied colour, which divides back out to the true one.
        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, 1, 1);
        cx.fillStyle = spec;
        cx.fillRect(0, 0, 1, 1);
        const onBlack = cx.getImageData(0, 0, 1, 1).data;

        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = '#fff';
        cx.fillRect(0, 0, 1, 1);
        cx.fillStyle = spec;
        cx.fillRect(0, 0, 1, 1);
        const onWhite = cx.getImageData(0, 0, 1, 1).data;

        const a = 1 - (onWhite[0] - onBlack[0]) / 255;
        out = a <= 0.002 ? [0, 0, 0, 0] : [onBlack[0] / a, onBlack[1] / a, onBlack[2] / a, a];
      } catch (_) {
        out = null;
      }
    }
    cache.set(spec, out);
    return out;
  }

  const lum = ([r, g, b]) => {
    const f = u => {
      u = Math.min(255, Math.max(0, u)) / 255;
      return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const cr = (a, b) => {
    const l1 = lum(a),
      l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const over = (f, b) => [f[0] * f[3] + b[0] * (1 - f[3]), f[1] * f[3] + b[1] * (1 - f[3]), f[2] * f[3] + b[2] * (1 - f[3]), 1];

  // -- effective backdrop --------------------------------------------------
  function effBg(el) {
    const stack = [];
    let n = el,
      gradient = false,
      imaged = false;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      const bi = cs.backgroundImage;
      if (bi && bi !== 'none') {
        if (/gradient/i.test(bi)) gradient = true;
        else imaged = true;
      }
      const c = toRGBA(cs.backgroundColor);
      if (c && c[3] > 0.002) {
        stack.push(c);
        if (c[3] > 0.999) break; // fully opaque: nothing below it shows
      }
      n = n.parentElement;
    }
    let base = toRGBA(getComputedStyle(document.body).backgroundColor);
    if (!base || base[3] < 0.999) base = toRGBA(getComputedStyle(document.documentElement).backgroundColor);
    if (!base || base[3] < 0.999) base = [255, 255, 255, 1];
    let out = [base[0], base[1], base[2], 1];
    for (let i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return { bg: out, gradient, imaged };
  }

  function pathOf(el) {
    const parts = [];
    let n = el;
    for (let d = 0; n && n.nodeType === 1 && d < 4; d++, n = n.parentElement) {
      let p = n.tagName.toLowerCase();
      if (n.id) {
        parts.unshift(p + '#' + n.id);
        break;
      }
      const cls = ((n.getAttribute && n.getAttribute('class')) || '').trim().split(/\s+/).filter(Boolean);
      if (cls.length) p += '.' + cls.slice(0, 2).join('.');
      parts.unshift(p);
    }
    return parts.join(' > ');
  }

  // -- walk ----------------------------------------------------------------
  const results = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent.trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    if (/^(script|style|noscript|title)$/i.test(el.tagName)) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < opts.minArea) continue;

    const fgRaw = toRGBA(cs.color);
    if (!fgRaw || fgRaw[3] < 0.05) continue; // effectively invisible text
    const { bg, gradient, imaged } = effBg(el);
    const fg = over(fgRaw, bg);

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight) || 400;
    // WCAG "large text": >=24px, or >=18.66px when bold.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    // AA (1.4.3): 3:1 large / 4.5:1 normal. AAA (1.4.6): 4.5:1 large / 7:1
    // normal — text only, there is no AAA tier for non-text contrast.
    const needAA = large ? 3 : 4.5;
    const needAAA = large ? 4.5 : 7;
    const ratio = cr(fg, bg);
    const passAA = ratio >= needAA;
    const passAAA = ratio >= needAAA;

    if (passAA && passAAA && !opts.includePassing) continue;
    results.push({
      text: text.slice(0, 60),
      ratio: Math.round(ratio * 100) / 100,
      needAA, needAAA,
      pass: passAA, passAA, passAAA,
      size: Math.round(size * 10) / 10,
      weight,
      color: cs.color,
      bg: 'rgb(' + bg.slice(0, 3).map(Math.round).join(',') + ')',
      // A gradient or image behind the text means the flat backdrop we
      // computed is only one sample of what's actually there — the real
      // ratio varies across the element. Flagged rather than guessed at.
      backdropUncertain: gradient || imaged,
      cls: ((el.getAttribute && el.getAttribute('class')) || '').slice(0, 110),
      path: pathOf(el),
    });
  }
  const failuresAA = results.filter(r => !r.passAA);
  // Only ever nodes that already clear AA — an AA failure is never also
  // listed here, so the two counts can be added without double-counting.
  const failuresAAA = results.filter(r => r.passAA && !r.passAAA);
  return { checked: seen.size, failuresAA, failuresAAA, failures: failuresAA, all: results };
};
