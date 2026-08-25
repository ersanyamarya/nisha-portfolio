/**
 * Diagram-design tokens for this project, mirroring the brand palette in
 * docs/Brand.md (Oat Milk / Dark Roast / Terracotta) via src/layouts/layout.css.
 * Diagrams use raw hex here (not Tailwind classes) because they're plain inline SVG,
 * evaluated outside Tailwind's class pipeline.
 */
export const DIAGRAM = {
  paper: '#fdfbf7',
  paper2: '#f5efe6',
  ink: '#292524',
  inkRgb: '41,37,36',
  muted: '#57534e',
  soft: '#85796f',
  rule: 'rgba(41,37,36,0.12)',
  ruleSolid: '#ebe5df',
  accent: '#c2785b',
  accentTint: 'rgba(194,120,91,0.08)',
  fontSans: "'Inter', -apple-system, sans-serif",
  fontMono: "'Geist Mono', ui-monospace, 'SF Mono', monospace",
} as const;

export const DIAGRAM_FONT_LINK = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap';
