/**
 * Diagram-design tokens for this project, extracted from src/layouts/layout.css
 * (see .diagram-design → ~/.diagram-design/profiles/nisha-portfolio-coffee-roast.md).
 * Diagrams use raw hex here (not Tailwind classes) because they're plain inline SVG,
 * evaluated outside Tailwind's class pipeline.
 */
export const DIAGRAM = {
  paper: '#fbf4eb',
  paper2: '#f5e9dd',
  ink: '#2d1a10',
  inkRgb: '45,26,16',
  muted: '#695347',
  soft: '#856f62',
  rule: 'rgba(45,26,16,0.12)',
  ruleSolid: '#cdb9ab',
  accent: '#b95c3a',
  accentTint: 'rgba(185,92,58,0.08)',
  fontSans: "'Geist', 'Inter', -apple-system, sans-serif",
  fontMono: "'Geist Mono', ui-monospace, 'SF Mono', monospace",
} as const;

export const DIAGRAM_FONT_LINK = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap';
