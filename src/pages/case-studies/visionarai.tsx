import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../../components';
import { Bullet, CaseStudyShell, Eyebrow, FeedbackCallout, FooterNav, ImageFrame, MicroLabel, PillTag, SectionHeading } from '../../components/caseStudy';
import { caseStudies } from '../../data/caseStudies';
import { useCaseStudyImages } from '../../hooks/useCaseStudyImages';
import Components from '../../images/case-studies/visionarai/components.png';
import Motion from '../../images/case-studies/visionarai/motion.png';
import Overview from '../../images/case-studies/visionarai/overview.png';
import VisualAnchor from '../../images/case-studies/visionarai/visual-anchor.png';

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
  { id: 'accessibility', label: 'Accessibility' },
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

const CORE_TOKENS = [
  { hex: '#F3F2F0', name: '--bg', usage: 'Page ground' },
  { hex: '#0F3D2E', name: '--ink', usage: 'Headings, dark beats' },
  { hex: '#6E7E85', name: '--muted', usage: 'Chrome, used sparingly' },
  { hex: '#A3E635', name: '--lime', usage: 'Signature, used sparingly' },
];

const SUPPORT_TOKENS = [
  { swatch: '#F0EEE6', name: '--bg-warm', usage: '#F0EEE6, warm inset, photo cards' },
  { swatch: '#FBFBFA', name: '--surface', usage: '#FBFBFA, inset card fill' },
  { swatch: '#16181B', name: '--body', usage: '#16181B, body copy, warm near-black' },
  { swatch: '#0A2E22', name: '--ink-deep', usage: '#0A2E22' },
  { swatch: '#0F3D2E', name: '--on-dark-mut', usage: '240, 238, 230 at 62% opacity, muted text on dark beats' },
];

const DERIVED_TOKENS = [
  { swatch: 'rgba(163,230,53,0.12)', name: '--lime-12', usage: 'color-mix, tag fill' },
  { swatch: 'rgba(163,230,53,0.36)', name: '--lime-36', usage: 'color-mix, tag border' },
  { swatch: '#7D838A', name: '--graphite', usage: '#7D838A, feeds --orb' },
  { swatch: 'rgba(15,61,46,0.10)', name: '--card-line', usage: '15, 61, 46 at 10% opacity' },
];

const COLOR_DOS = [
  'Lime on ink, or ink on lime: the primary button, the active rail beat, an italic clause on a dark beat.',
  'Lime as geometry: the 8px eyebrow dot, the 2px progress bar, an underline, a stat number.',
  'Ink for every heading, icon stroke and dark beat.',
  'Muted grey for chrome only: eyebrows, corner ticks, roles, dividers.',
  'Warm off-white for the ground; --surface only for inset cards.',
];

const COLOR_DONTS = [
  'Lime text on the light ground: 1.3:1 contrast, invisible.',
  'Lime as a section background. It stops reading as a signature.',
  'Muted grey for anything a reader must read.',
  'Pure white. The ground is warm; #FFFFFF reads as a bug.',
  'Gradients. There are none. Depth comes from noise and the two dark beats.',
  'Teal #114B5F or acid #BEFF00, that is the retired palette.',
];

const TYPE_SPECIMENS = [
  {
    spec: 'Hero · Instrument Serif italic · clamp(54px, 7.2vw, 116px) / 0.88 · -0.015em · max 16ch',
    sample: <div className="font-serif text-4xl leading-none tracking-tight italic sm:text-5xl">AI for Visionaries</div>,
    desc: 'One per page. Fluid, capped by character measure rather than pixels, and set tight so two lines read as one mass.',
  },
  {
    spec: 'Display · Instrument Serif roman · 0.95 leading · -0.01em · text-wrap: balance',
    sample: (
      <div className="font-serif text-2xl leading-tight sm:text-3xl">
        Not another AI <em>consultancy.</em>
      </div>
    ),
    desc: 'Section headings are roman with the closing clause in italic. On a dark beat that italic clause turns lime. The split is structural, not decorative: it is how every heading in the system lands.',
  },
  {
    spec: 'Body · Syne 400 · 20px / 1.7 · lede clamp(18px, 1.4vw, 21px) / 1.65 · max 46ch',
    sample: (
      <p className="text-lg leading-relaxed">
        We bring AI into how your team works, day to day, whether that&rsquo;s the newest frontier models or established European tools.
      </p>
    ),
    desc: 'Colour is --body, never pure black.',
  },
  {
    spec: 'Eyebrow · Syne Mono · 14px · 0.18em · uppercase · 8px lime dot · beat index · 13px · 0.2em · 26px rule',
    sample: (
      <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
        <span className="size-2 rounded-full bg-primary" /> Beat 02, why us
      </div>
    ),
    desc: 'Never a full sentence. Uppercase, letter-spaced, always preceded by its mark.',
  },
  {
    spec: 'Nav & tags · Inter · 15px rail · 13px tag · 14px language toggle · 12px role (Syne Mono)',
    sample: <div className="text-sm font-medium">Intro · What we do · Why us · Founders</div>,
    desc: 'Inter is a deliberate fourth voice, declared as --nav. Its neutrality is the point: wayfinding recedes so the serif and Syne carry the character.',
  },
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

const meta = caseStudies.visionarai;

const VisionarAiCaseStudy: React.FC<PageProps> = () => {
  const getImage = useCaseStudyImages();
  return (
    <CaseStudyShell sections={SECTIONS}>
      <section id="overview">
        <Eyebrow>
          {meta.name} · {meta.heroDomain} · {meta.platformType}
        </Eyebrow>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-[-0.02em] md:text-5xl">{meta.title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          A brand and web UI for a Berlin AI strategy consultancy, built to read as a confident strategic guide instead of another cold tech interface.
        </p>
        <ImageFrame
          variant="hero"
          src={Overview}
          image={getImage('case-studies/visionarai/overview.png')}
          alt="Visionar.ai brand and web UI overview"
          className="mb-10"
        />
        <div className="mb-10 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {IDENTITY.map(item => (
            <div key={item.label}>
              <MicroLabel className="mb-1.5">{item.label.toUpperCase()}</MicroLabel>
              <div className="text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
        <div>
          <MicroLabel className="mb-4">Skills applied</MicroLabel>
          <div className="flex flex-wrap gap-2.5">
            {meta.tags.map(s => (
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
        <ImageFrame
          src={VisualAnchor}
          image={getImage('case-studies/visionarai/visual-anchor.png')}
          alt="Visionar.ai orb hero anchor design and rationale, as documented in the shipped design system"
        />
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
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CORE_TOKENS.map(c => (
            <div
              key={c.hex}
              className="overflow-hidden rounded-xl ring-1 ring-border">
              <div
                className="h-20"
                style={{ background: c.hex }}
              />
              <div className="bg-background px-3 py-2.5">
                <div className="font-mono text-xs font-bold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.hex}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.usage}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-accent-foreground">SUPPORT: GROUND & TEXT</div>
            <div className="flex flex-col gap-3">
              {SUPPORT_TOKENS.map(t => (
                <div
                  key={t.name}
                  className="flex items-center gap-3">
                  <div
                    className="size-6 flex-shrink-0 rounded-md ring-1 ring-border"
                    style={{ background: t.swatch }}
                  />
                  <div className="text-sm leading-snug text-muted-foreground">
                    <span className="font-mono font-bold text-foreground">{t.name}</span> {t.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-accent-foreground">DERIVED & UTILITY</div>
            <div className="flex flex-col gap-3">
              {DERIVED_TOKENS.map(t => (
                <div
                  key={t.name}
                  className="flex items-center gap-3">
                  <div
                    className="size-6 flex-shrink-0 rounded-md ring-1 ring-border"
                    style={{ background: t.swatch }}
                  />
                  <div className="text-sm leading-snug text-muted-foreground">
                    <span className="font-mono font-bold text-foreground">{t.name}</span> {t.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-muted-foreground">DECISION 01 · RECORDED IN THE FIGMA</div>
            <div className="mb-2 text-lg font-bold">
              Five colours became <em>four.</em>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              The original file weighed two palettes. Option A carried five values including Forest Green #2D5016 alongside an acid neon; the file&rsquo;s own
              annotation reads &ldquo;two signatures compete.&rdquo; Option B dropped the green, on the reasoning that &ldquo;one signature does the heavy
              lifting.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="size-6 flex-shrink-0 rounded-md ring-1 ring-border"
                style={{ background: '#2D5016' }}
              />
              <div className="font-mono text-xs text-muted-foreground line-through">#2D5016, dropped</div>
            </div>
          </div>
          <div className="rounded-2xl bg-default-900 px-6 py-6 dark:bg-default-800">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-primary-300">DECISION 02 · SETTLED IN CODE, NOW RATIFIED</div>
            <div className="mb-2 text-lg font-bold text-default-50">
              The green returned <em>as the dark.</em>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-default-50 opacity-80">
              Building the site replaced the teal with #0F3D2E and softened the neon to #A3E635. Green-on-green is quieter, more European, less startup-neon,
              and it reads as considered rather than loud, which is the entire positioning. Contrast improved too: 10.7:1 on the ground against the teal&rsquo;s
              8.1.
            </p>
            <p className="text-sm leading-relaxed font-semibold text-default-50">This is the palette. The Figma&rsquo;s teal and acid are historical.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FeedbackCallout
            tone="success"
            label="DO">
            <div className="flex flex-col gap-3.5">
              {COLOR_DOS.map((item, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </FeedbackCallout>
          <FeedbackCallout
            tone="secondary"
            label="DON'T">
            <div className="flex flex-col gap-3.5">
              {COLOR_DONTS.map((item, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </FeedbackCallout>
        </div>
      </section>

      <section id="typography">
        <Eyebrow>Typography & voice</Eyebrow>
        <SectionHeading>A serif that leans, a sans that squares</SectionHeading>
        <div className="mb-2 text-xs font-extrabold tracking-widest text-muted-foreground">Typography</div>
        <div className="mb-8 flex flex-col gap-3.5">
          <Bullet>
            <strong>Serif headlines:</strong> an elegant serif carries every headline, for tradition and credibility.
          </Bullet>
          <Bullet>
            <strong>Sans body:</strong> a narrow sans carries everything a reader scans, for speed and clarity.
          </Bullet>
          <Bullet>
            <strong>Mono structure:</strong> a third, mono voice labels navigation and micro-tags, so structure stays legible at a glance.
          </Bullet>
        </div>
        <div className="mb-2 text-xs font-extrabold tracking-widest text-muted-foreground">Tone of voice</div>
        <div className="mb-8 flex flex-col gap-3.5">
          <Bullet>
            <strong>Always &ldquo;we&rdquo;:</strong> copy says &ldquo;we,&rdquo; never &ldquo;Visionar.ai,&rdquo; so the brand reads as a person in the room,
            not a company describing itself.
          </Bullet>
          <Bullet>
            <strong>Roman, then italic:</strong> headlines state the subject in roman type, then land the turn in italic.
          </Bullet>
          <Bullet>
            <strong>Numbered offers:</strong> every service gets a Syne Mono number instead of a section label.
          </Bullet>
          <Bullet>
            <strong>Plain quantities:</strong> offers get quantified in plain terms, like &ldquo;3 disciplines&rdquo; or &ldquo;1 day to your first
            roadmap.&rdquo;
          </Bullet>
          <Bullet>
            <strong>Say no:</strong> when AI doesn&rsquo;t fit a client&rsquo;s problem, the copy says so directly.
          </Bullet>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          {TYPE_SPECIMENS.map((s, i) => (
            <div
              key={i}
              className="border-b border-border px-6 py-6 last:border-0 md:px-8">
              <div className="mb-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{s.spec}</div>
              {s.sample}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
          <div className="border-t border-border bg-success-50 px-6 py-6 md:px-8 dark:bg-success-950/40">
            <div className="mb-3 font-mono text-[11px] tracking-widest text-success-800 uppercase dark:text-success-300">Self-hosting is a brand decision</div>
            <pre className="overflow-x-auto rounded-xl bg-default-900 px-4 py-3 font-mono text-xs leading-relaxed text-default-50 dark:bg-default-950">
              {`@import '@fontsource/instrument-serif/400.css';  /* + 400-italic */
@import '@fontsource/syne/400.css';  /* + 500 600 700 800 */
@import '@fontsource/syne-mono/400.css';
@import '@fontsource/inter/400.css';  /* + 500 */`}
            </pre>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ten font files, zero third-party requests. The source comment reads &ldquo;GDPR-safe, no requests to Google.&rdquo; A business selling European
              data sovereignty cannot phone Mountain View for its typeface: never add a Google Fonts link.
            </p>
          </div>
        </div>
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
        <ImageFrame
          src={Components}
          image={getImage('case-studies/visionarai/components.png')}
          alt="Visionar.ai component library from the shipped Figma design system"
        />
      </section>

      <section id="motion">
        <Eyebrow>Motion & structure</Eyebrow>
        <SectionHeading>The site is a horizontal story</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          The orb travels with the reader across the story. Five beats unfold sideways instead of scrolling down, so the site moves like a pitch deck rather
          than a landing page.
        </p>
        <ImageFrame
          src={Motion}
          image={getImage('case-studies/visionarai/motion.png')}
          alt="Visionar.ai orb motion system and horizontal beat structure"
        />
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

      <section id="accessibility">
        <Eyebrow>Accessibility</Eyebrow>
        <SectionHeading>Accessible from the start</SectionHeading>
        <div className="mb-8 flex flex-col gap-3.5">
          <Bullet>
            <strong>Default visibility:</strong> content is visible by default. Hidden start-states only apply under <code>body.is-animated</code>, once
            JavaScript confirms it will animate.
          </Bullet>
          <Bullet>
            <strong>No-JS support:</strong> visitors without JavaScript enabled see all content directly.
          </Bullet>
          <Bullet>
            <strong>Reduced motion:</strong> under <code>prefers-reduced-motion</code>, all animations turn off, reveals are forced to visible, and parallax
            effects are cleared.
          </Bullet>
          <Bullet>
            <strong>Orb and smoothing adjustments:</strong> the orb freezes at a static tilt that reflects scroll discretely, while the smoothing lerp is set to
            1.
          </Bullet>
          <Bullet>
            <strong>WCAG AAA contrast:</strong> text colors across the shared components were darkened until every pairing cleared AAA&rsquo;s 7:1 contrast
            ratio, not just AA&rsquo;s 4.5:1.
          </Bullet>
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
