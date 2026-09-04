import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../../components';
import { CaseStudyShell, Eyebrow, FooterNav, PillTag, SectionHeading, ZoomableImage } from '../../components/caseStudy';
import ColorSystem from '../../images/case-studies/visionarai/crop-colors.png';
import Components from '../../images/case-studies/visionarai/crop-components.png';
import OrbAnchor from '../../images/case-studies/visionarai/crop-motion.png';
import Typography from '../../images/case-studies/visionarai/crop-type.png';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'brief', label: 'The brief' },
  { id: 'design-thinking', label: 'Design thinking' },
  { id: 'visual-anchor', label: 'Hero visual anchor' },
  { id: 'colors', label: 'Color system' },
  { id: 'typography', label: 'Typography & voice' },
  { id: 'components', label: 'Component system' },
  { id: 'motion', label: 'Motion & structure' },
  { id: 'live-site', label: 'Live site' },
  { id: 'takeaways', label: 'Takeaways' },
];

const IDENTITY = [
  { label: 'Role', value: 'Lead UI/UX Designer & Design Engineer' },
  { label: 'Tools', value: 'Figma, Figma Make, Claude, HTML/CSS' },
  { label: 'Scope', value: 'Brand identity, design system, web build' },
];

const DECISIONS = [
  {
    title: 'Human-guided AI',
    body: 'We used AI to throw ideas at the wall fast, but every call on what stuck was ours.',
  },
  {
    title: 'The eye of the visionary',
    body: 'A wireframe orb anchors the hero: rings, a crosshair, a pulsing core. It stands in for vision and oversight without drawing a literal eye.',
  },
  {
    title: 'Presentation-style motion',
    body: 'The layout moves sideways, not down, so the site feels like a pitch deck instead of another scrolling landing page.',
  },
];

const PALETTE = [
  { hex: '#F3F2F0', label: 'Neutral ground' },
  { hex: '#0F3D2E', label: 'Forest green base' },
  { hex: '#6E7E85', label: 'Charcoal chrome' },
  { hex: '#A3E635', label: 'Signature lime' },
];

const TAKEAWAYS = [
  {
    dark: true,
    body: 'AI is a fast way to explore options. It is also how three different attempts land on the same generic layout. We threw those out and rebuilt by hand, with a human making every final call.',
  },
  {
    dark: false,
    body: 'One ground, one ink, one chrome grey, one signature lime. Four colors, held tight, read as more confident than a wider, louder palette would have.',
  },
  {
    dark: false,
    body: 'A small modular system, wordmark, buttons, tags, cards, shipped as lightweight web slices, kept the build fast without cutting corners on craft.',
  },
];

const VisionarAiCaseStudy: React.FC<PageProps> = () => {
  return (
    <CaseStudyShell sections={SECTIONS}>
      <section id="overview">
        <Eyebrow>Visionar.ai · AI strategy consultancy · Brand & web UI</Eyebrow>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-[-0.02em] md:text-5xl">Designing the UI system behind Visionar.ai</h1>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          A brand and web UI for a Berlin AI strategy consultancy, built to read as a confident strategic guide instead of another cold tech interface.
        </p>
        <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl">
          <ZoomableImage
            src={OrbAnchor}
            alt="Visionar.ai orb hero anchor design and rationale"
            className="block h-auto w-full"
          />
        </div>
        <div className="mb-10 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {IDENTITY.map(item => (
            <div key={item.label}>
              <div className="mb-1.5 text-[11px] font-extrabold tracking-widest text-muted-foreground">{item.label.toUpperCase()}</div>
              <div className="text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-4 text-sm font-bold tracking-wide text-accent-foreground">Skills applied</div>
          <div className="flex flex-wrap gap-2.5">
            {['Brand identity', 'Design systems', 'Web UI design', 'Motion design', 'AI-assisted iteration'].map(s => (
              <PillTag key={s}>{s}</PillTag>
            ))}
          </div>
        </div>
      </section>

      <section
        id="brief"
        className="rounded-3xl bg-muted px-6 py-12 md:px-10">
        <Eyebrow>The brief</Eyebrow>
        <SectionHeading>Not another AI consultancy</SectionHeading>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Visionar.ai sells AI strategy to executives, so the UI had to carry that weight. We dropped the generic &ldquo;techie&rdquo; tropes and designed AI as
          a guide standing beside the room, never a replacement for the people in it.
        </p>
      </section>

      <section id="design-thinking">
        <Eyebrow>Design thinking</Eyebrow>
        <SectionHeading>Three decisions that shaped the strategy</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {DECISIONS.map(d => (
            <div
              key={d.title}
              className="rounded-2xl border border-border bg-muted px-7 py-7">
              <div className="mb-3 text-lg font-bold">{d.title}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="visual-anchor">
        <Eyebrow>Hero visual anchor</Eyebrow>
        <SectionHeading>The orb: eyes of the visionary</SectionHeading>
        <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
          The hero runs on an animated eye motif we called the &ldquo;Eyes of Visionary,&rdquo; standing in for the consultancy watching over a client&rsquo;s
          strategy. We didn&rsquo;t draw an actual eye. It&rsquo;s a wireframe orb: concentric rings, a crosshair pair, a pulsing core, closer to precision
          instrumentation than a literal eyeball.
        </p>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          An AI consultancy&rsquo;s hero visual had to feel like it was <em>watching and guiding</em>, not surveilling. Tying its tilt to the cursor and its
          rotation to scroll progress keeps it alive and responsive rather than decorative, so the mark reads as attentive rather than static.
        </p>
        <ZoomableImage
          src={OrbAnchor}
          alt="Visionar.ai orb hero anchor design and rationale, as documented in the shipped design system"
          className="block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <div className="mt-3 text-xs text-muted-foreground">
          Fig. The orb anchor, built from rings, crosshair and pulsing core, as documented in the shipped system.
        </div>
      </section>

      <section
        id="colors"
        className="rounded-3xl bg-muted px-6 py-12 md:px-10">
        <Eyebrow>Color system</Eyebrow>
        <SectionHeading>Green ground, green dark, one lime</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          We tried three directions first and killed all of them. Orange read too classic. Blue and white looked like an insurance company. Black and white with
          neon gradients felt dated, like something from five years ago. What stuck was a deep forest green base with charcoal and neutral containers, plus one
          high-contrast lime accent, considered instead of loud.
        </p>
        <div className="mb-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
          {PALETTE.map(c => (
            <div key={c.hex}>
              <div
                className="h-15 rounded-xl ring-1 ring-border"
                style={{ background: c.hex }}
              />
              <div className="mt-1.5 text-xs font-semibold text-muted-foreground">{c.hex}</div>
            </div>
          ))}
        </div>
        <ZoomableImage
          src={ColorSystem}
          alt="Visionar.ai color token documentation from the shipped Figma design system"
          className="block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <div className="mt-3 text-xs text-muted-foreground">Fig. 1. Color token spec, as documented in the shipped design system.</div>
      </section>

      <section id="typography">
        <Eyebrow>Typography & voice</Eyebrow>
        <SectionHeading>A serif that leans, a sans that squares</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          An elegant serif carries every headline, for tradition and credibility. A narrow sans carries everything a reader scans, for speed and clarity. A
          third, mono voice labels navigation and micro-tags, so structure stays legible at a glance.
        </p>
        <ZoomableImage
          src={Typography}
          alt="Visionar.ai typography system from the shipped Figma design system"
          className="block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <div className="mt-3 text-xs text-muted-foreground">Fig. 2. Typographic hierarchy, as documented in the shipped design system.</div>
      </section>

      <section
        id="components"
        className="rounded-3xl bg-muted px-6 py-12 md:px-10">
        <Eyebrow>Component system</Eyebrow>
        <SectionHeading>Six parts, exactly as they ship</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Clean modular cards, high-contrast dark callouts, pill-shaped tags, and dual-state CTA buttons: a small, disciplined component library built to hold
          up across every beat of the site.
        </p>
        <ZoomableImage
          src={Components}
          alt="Visionar.ai component library from the shipped Figma design system"
          className="block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <div className="mt-3 text-xs text-muted-foreground">Fig. 3. Wordmark, buttons, nav rail, tags, and founder card components.</div>
      </section>

      <section id="motion">
        <Eyebrow>Motion & structure</Eyebrow>
        <SectionHeading>The site is a horizontal story</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          The orb travels with the reader across the story. Five beats unfold sideways instead of scrolling down, so the site moves like a pitch deck rather
          than a landing page.
        </p>
        <ZoomableImage
          src={OrbAnchor}
          alt="Visionar.ai orb motion system and horizontal beat structure"
          className="block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <div className="mt-3 text-xs text-muted-foreground">Fig. 4. The orb protagonist and the five-beat horizontal story engine.</div>
      </section>

      <section id="live-site">
        <Eyebrow>Live site</Eyebrow>
        <SectionHeading>The system, as it ships</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Built with lightweight fonts and a modular web-slice architecture for fast page loads. Explore the shipped site below.
        </p>
        <div className="overflow-hidden rounded-2xl ring-1 ring-border">
          <div className="flex items-center gap-2 bg-default-900 px-4 py-2.5 dark:bg-default-800">
            <div className="size-2.5 rounded-full bg-default-500" />
            <div className="size-2.5 rounded-full bg-default-500" />
            <div className="size-2.5 rounded-full bg-success-400" />
            <div className="ml-3 text-xs font-semibold text-default-50">visionar.ai</div>
          </div>
          <iframe
            src="https://www.visionar.ai/"
            title="Visionar.ai live site"
            className="block h-[640px] w-full border-0"
          />
        </div>
      </section>

      <section id="takeaways">
        <Eyebrow>Takeaways</Eyebrow>
        <SectionHeading>What this project reinforced</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TAKEAWAYS.map((t, i) => (
            <div
              key={i}
              className={
                t.dark ? 'rounded-2xl bg-default-900 px-6 py-6 text-default-50 dark:bg-default-800' : 'rounded-2xl border border-border bg-muted px-6 py-6'
              }>
              <p className={t.dark ? 'text-sm leading-relaxed' : 'text-sm leading-relaxed text-muted-foreground'}>{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterNav
        nextLabel="Flexera cloud cost anomaly detection"
        nextTo="/case-studies/flexera"
      />
    </CaseStudyShell>
  );
};

export default VisionarAiCaseStudy;

export const Head: HeadFC = () => (
  <SEO
    title="Visionar.ai brand & UI system"
    description="Brand identity and web UI design system for Visionar.ai, a Berlin AI strategy consultancy."
    pathname="/case-studies/visionarai"
    keyWords={['Visionar.ai', 'AI consultancy', 'brand identity', 'design system', 'web UI design']}
  />
);
