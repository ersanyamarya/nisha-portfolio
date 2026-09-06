/**
 * Generates every brand image this site can't hand-draw without it drifting:
 *
 *  - static/seoThumbnail.png     — homepage Open Graph / social-preview card
 *  - src/images/icon.png         — app/favicon (gatsby-plugin-manifest source)
 *  - static/og/<slug>.png        — one Open Graph card per case study
 *
 * The homepage OG card reuses the hero section's own composition (portrait +
 * warm radial wash + serif headline with a terracotta italic accent) so the
 * link-preview card reads as an extension of the page it links to, rather
 * than a separate business-card design. Its title comes straight from
 * gatsby-config's siteMetadata — the same source the live <SEO> component
 * reads — so it can't drift from what the page actually says.
 *
 * The icon is a simple "NK" monogram in the same brand terracotta.
 * gatsby-plugin-manifest re-processes it into every favicon/app-icon size, so
 * it's rendered oversized (1024x1024) to give that downscale room to work with.
 *
 * Each case-study card carries that project's own metadata from
 * src/data/caseStudies.ts (title, tags, stat, tone) — the same file the
 * homepage project cards and the case study's own hero read — plus its
 * homepage card screenshot, framed the same way ImageFrame frames it on the
 * case study page itself (rounded, ring-bordered, drop-shadowed, a slight
 * editorial tilt), and a small circular crop of hero-img.png as an author
 * signature, tying every card back to the homepage OG card's portrait.
 *
 * Run: bun run og
 */
import * as path from 'node:path';
import config from '../../gatsby-config';
import { caseStudies, type CaseStudyMeta } from '../../src/data/caseStudies';
import { escapeHtml, imageDataUri, renderCards } from './lib/render';

const WIDTH = 1200;
const HEIGHT = 630;
const HERO_IMAGE = path.join(__dirname, '../../src/images/hero-img.png');

const ICON_SIZE = 1024;
const ICON_OUT_FILE = path.join(__dirname, '../../src/images/icon.png');

// Brand tokens copied from src/layouts/layout.css — light theme, since social
// clients render these cards without the site's dark-mode toggle.
const THEME = {
  background: '#fdfbf7', // --color-default-50
  foreground: '#292524', // --color-default-900
  muted: '#3d3834', // --color-default-700
  primary: '#c2785b', // --color-primary-600 ("Terracotta / Warm Roast")
  primaryAccent: '#8f4e39', // --color-primary-700, the italic-word colour
  primaryGlow: '#e9c4ab', // --color-primary-200, the hero's radial wash
  badgeBg: '#fbf1ec', // --color-primary-50
  badgeText: '#6e3b2b', // --color-primary-800
  border: '#ebe5df', // --color-default-200
  fontSerif: "'Playfair Display', 'Iowan Old Style', Georgia, serif",
  fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
  fontsHref: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;1,400&display=swap',
};

// Case-study cards recolor their badge/glow/stat by the project's own `tone`
// (src/components/caseStudy/tone.ts), exactly like the homepage project card
// and the case study's own page do — light-mode hex pulled from the same file.
const TONE_COLORS: Record<CaseStudyMeta['tone'], { badgeBg: string; badgeText: string; stat: string; glow: string }> = {
  primary: { badgeBg: '#f5e1d5', badgeText: '#6e3b2b', stat: '#8f4e39', glow: '#e9c4ab' },
  secondary: { badgeBg: '#fbd9d9', badgeText: '#7a1212', stat: '#9c1717', glow: '#f5b5b5' },
  success: { badgeBg: '#d9ebe0', badgeText: '#2e4b37', stat: '#2e4b37', glow: '#b3d7c0' },
  default: { badgeBg: '#f5efe6', badgeText: '#3d3834', stat: '#3d3834', glow: '#ebe5df' },
};

// Card screenshot per case study — the same file each project's homepage card
// uses (src/sections/projects/index.tsx's CaseStudyImage switch). StaticImage
// needs a literal path there too, so this mapping unavoidably repeats it.
const CARD_IMAGES: Record<keyof typeof caseStudies, string> = {
  flexera: path.join(__dirname, '../../src/images/case-studies/flexera/flexera_overview.png'),
  spektrum: path.join(__dirname, '../../src/images/case-studies/spektrum/spektrum_card.jpg'),
  visionarai: path.join(__dirname, '../../src/images/case-studies/visionarai/overview.png'),
};

/** Steps the headline size down for the longer, sentence-length case-study titles. */
const titleSize = (title: string): string => (title.length <= 40 ? '52px' : title.length <= 70 ? '42px' : '34px');

async function generateHomepageOg() {
  const { title, siteUrl } = config.siteMetadata as { title: string; siteUrl: string };
  const displayName = title.split('|')[0].trim(); // "Nisha Kumari | Senior Product Designer" -> "Nisha Kumari"
  const role = title.split('|')[1]?.trim() ?? 'Senior Product Designer';
  const url = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const heroImage = await imageDataUri(HERO_IMAGE);

  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${THEME.fontsHref}">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;position:relative;
    background:${THEME.background};font-family:${THEME.fontSans};color:${THEME.foreground}}
  .frame{position:absolute;inset:0;display:flex;align-items:center;padding:0 72px;gap:56px}
  .glow{position:absolute;width:640px;height:640px;right:60px;top:50%;transform:translateY(-50%);
    border-radius:50%;background:radial-gradient(circle at 50% 50%, ${THEME.primaryGlow} 0%, transparent 70%);
    opacity:0.8;z-index:0}
  .rule{position:absolute;left:0;right:0;bottom:0;height:6px;background:${THEME.primary}}
  .left{position:relative;z-index:1;flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:center}
  .badge{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;
    background:${THEME.badgeBg};color:${THEME.badgeText};border-radius:999px;
    padding:12px 22px;font-size:19px;font-weight:600;letter-spacing:0.06em;
    text-transform:uppercase;margin-bottom:34px}
  .badge .dot{width:11px;height:11px;border-radius:50%;background:${THEME.primary}}
  h1{font-family:${THEME.fontSerif};font-weight:500;font-size:66px;line-height:1.08;
    letter-spacing:-0.015em;text-wrap:balance;hyphens:none;margin-bottom:28px}
  h1 em{font-style:italic;color:${THEME.primaryAccent}}
  .desc{font-size:26px;line-height:1.5;color:${THEME.muted};max-width:34ch;
    display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
  .art{position:relative;z-index:1;flex:0 0 400px;height:${HEIGHT}px;display:flex;align-items:center;justify-content:center}
  .art img{max-width:100%;max-height:520px;object-fit:contain;
    filter:drop-shadow(0 24px 48px rgba(41,37,36,0.18))}
  .sig{position:absolute;right:72px;bottom:34px;z-index:1;font-size:19px;font-weight:500;
    letter-spacing:0.04em;color:${THEME.muted}}
</style></head><body>
<div class="glow"></div>
<div class="frame">
  <div class="left">
    <span class="badge"><span class="dot"></span>${escapeHtml(displayName)} &middot; ${escapeHtml(role)}</span>
    <h1>Precision in the process.<br><em>Delight</em> in the details.</h1>
    <p class="desc">Research-led product UX for climate-tech, cloud FinOps and security products.</p>
  </div>
  <div class="art"><img src="${heroImage}" alt=""></div>
</div>
<div class="sig">${escapeHtml(url)}</div>
<div class="rule"></div>
</body></html>`;

  await renderCards([{ slug: 'seoThumbnail', html }], [path.join(__dirname, '../../static/seoThumbnail.png')], {
    width: WIDTH,
    height: HEIGHT,
    scale: 1,
    optimize: true,
  });
}

async function generateIcon() {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${THEME.fontsHref}">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${ICON_SIZE}px;height:${ICON_SIZE}px;background:transparent}
  .mark{width:100%;height:100%;border-radius:22%;background:${THEME.primary};
    display:flex;align-items:center;justify-content:center}
  .mark span{font-family:${THEME.fontSerif};font-weight:600;font-size:${ICON_SIZE * 0.46}px;
    letter-spacing:-0.03em;color:${THEME.background}}
</style></head><body>
<div class="mark"><span>NK</span></div>
</body></html>`;

  await renderCards([{ slug: 'icon', html }], [ICON_OUT_FILE], { width: ICON_SIZE, height: ICON_SIZE, scale: 1, optimize: true });
}

async function generateCaseStudyOgCards() {
  const heroAvatar = await imageDataUri(HERO_IMAGE);
  const slugs = Object.keys(caseStudies) as (keyof typeof caseStudies)[];

  const jobs = await Promise.all(
    slugs.map(async slug => {
      const project = caseStudies[slug];
      const tone = TONE_COLORS[project.tone];
      const cardImage = await imageDataUri(CARD_IMAGES[slug]);

      const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${THEME.fontsHref}">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;position:relative;
    background:${THEME.background};font-family:${THEME.fontSans};color:${THEME.foreground}}
  .frame{position:absolute;inset:0;display:flex;align-items:center;padding:0 76px;gap:56px}
  .glow{position:absolute;width:620px;height:620px;right:20px;top:50%;transform:translateY(-50%);
    border-radius:50%;background:radial-gradient(circle at 50% 50%, ${tone.glow} 0%, transparent 70%);
    opacity:0.9;z-index:0}
  .rule{position:absolute;left:0;right:0;bottom:0;height:6px;background:${THEME.primary}}
  .left{position:relative;z-index:1;flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:center}
  .badge{align-self:flex-start;background:${tone.badgeBg};color:${tone.badgeText};
    border-radius:999px;padding:9px 18px;font-size:16px;font-weight:700;
    letter-spacing:0.08em;text-transform:uppercase;margin-bottom:22px}
  .meta{font-size:16px;font-weight:500;letter-spacing:0.02em;color:${THEME.muted};margin-bottom:18px}
  h1{font-family:${THEME.fontSerif};font-weight:500;font-size:${titleSize(project.title)};
    line-height:1.18;letter-spacing:-0.01em;text-wrap:balance;hyphens:none;margin-bottom:22px;
    display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
  .tags{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:26px}
  .tag{border:1.5px solid ${THEME.border};border-radius:999px;padding:7px 15px;
    font-size:14px;font-weight:500;color:${THEME.muted};white-space:nowrap}
  .stat{display:flex;align-items:baseline;gap:10px;padding-top:22px;border-top:1.5px solid ${THEME.border}}
  .stat .value{font-family:${THEME.fontSerif};font-weight:600;font-size:34px;color:${tone.stat}}
  .stat .label{font-size:15px;color:${THEME.muted}}
  .art{position:relative;z-index:1;flex:0 0 452px;height:452px;display:flex;align-items:center;justify-content:center}
  .shot{width:452px;height:283px;border-radius:20px;overflow:hidden;
    box-shadow:0 30px 60px rgba(41,37,36,0.22),0 0 0 1.5px ${THEME.border};
    transform:rotate(-2.5deg)}
  .shot img{width:100%;height:100%;object-fit:cover;object-position:top center}
  .signature{position:absolute;left:76px;bottom:34px;z-index:1;display:flex;align-items:center;gap:12px}
  .signature img{width:42px;height:42px;border-radius:50%;object-fit:cover;object-position:50% 12%;
    box-shadow:0 0 0 2px ${THEME.background},0 0 0 3.5px ${THEME.border}}
  .signature span{font-size:16px;font-weight:500;color:${THEME.muted}}
  .sig-url{position:absolute;right:76px;bottom:34px;z-index:1;font-size:16px;font-weight:500;color:${THEME.muted}}
</style></head><body>
<div class="glow"></div>
<div class="frame">
  <div class="left">
    <span class="badge">${escapeHtml(project.name)}</span>
    <div class="meta">${escapeHtml(project.domain)} &middot; ${escapeHtml(project.platformType)} &middot; ${escapeHtml(project.caseStudyType)}</div>
    <h1>${escapeHtml(project.title)}</h1>
    <div class="tags">${project.tags
      .slice(0, 3)
      .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('')}</div>
    <div class="stat"><span class="value">${escapeHtml(project.statValue)}</span><span class="label">${escapeHtml(project.statLabel)}</span></div>
  </div>
  <div class="art"><div class="shot"><img src="${cardImage}" alt=""></div></div>
</div>
<div class="signature"><img src="${heroAvatar}" alt=""><span>Nisha Kumari</span></div>
<div class="sig-url">nishakumari.art</div>
<div class="rule"></div>
</body></html>`;

      return { slug: `og-${slug}`, html, outFile: path.join(__dirname, `../../static/og/${slug}.png`) };
    })
  );

  await renderCards(
    jobs.map(({ slug, html }) => ({ slug, html })),
    jobs.map(j => j.outFile),
    { width: WIDTH, height: HEIGHT, scale: 1, optimize: true }
  );
}

async function main() {
  await generateHomepageOg();
  await generateIcon();
  await generateCaseStudyOgCards();
}

main();
