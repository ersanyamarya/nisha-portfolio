import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Reveal } from '../../components';

const STEPS = [
  {
    step: '01',
    brewTerm: 'GRIND',
    title: 'Research',
    caption: 'Break the problem down before assuming a solution by understanding the users, context, and constraints.',
  },
  {
    step: '02',
    brewTerm: 'FILTER',
    title: 'Define',
    caption: 'Turn messy findings into clear problems, journeys, and priorities.',
  },
  {
    step: '03',
    brewTerm: 'BLEND',
    title: 'Explore',
    caption: 'Pair AI with rapid prototyping and experimentation to test ideas, challenge assumptions, and find stronger solutions.',
  },
  {
    step: '04',
    brewTerm: 'BREW',
    title: 'Design',
    caption: 'Bring the experience to life through design tokens, thoughtful interactions, and developer-ready handoff.',
  },
  {
    step: '05',
    brewTerm: 'TASTE',
    title: 'Validate',
    caption: 'Test, measure, and learn from real behaviour to improve the experience.',
  },
];

/** How long a step holds before the panel auto-advances, in ms. */
const STEP_DWELL = 5000;

/** Shadowless Polaroid frame: white mat, thicker at the bottom, no drop shadow. */
function Polaroid({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white p-2.5 pb-6 ${className}`}>{children}</div>;
}

function GrindCollage() {
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-gradient-to-br from-primary-50 to-muted p-6 sm:gap-6 dark:from-primary-950/40 dark:to-muted">
      <Polaroid className="w-1/2 max-w-96 -rotate-3">
        <StaticImage
          src="../../images/process/grind-configs.png"
          alt="Interview questions probing MQTT broker configuration sharing and debugging workflows"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/2 max-w-96 translate-y-4 rotate-2">
        <StaticImage
          src="../../images/process/grind-card-sort.png"
          alt="Card-sorting board grouping research notes into problem statements on configuration sharing, sensor simulation, and message logs"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
    </div>
  );
}

function BlendCollage() {
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-gradient-to-br from-primary-50 to-muted p-6 sm:gap-6 dark:from-primary-950/40 dark:to-muted">
      <Polaroid className="w-1/2 max-w-96 -rotate-3">
        <StaticImage
          src="../../images/process/blend-claude-prototype.png"
          alt="Claude conversation adding validation logic to a Figma prototype, next to the resulting interactive form"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/2 max-w-96 translate-y-4 rotate-2">
        <StaticImage
          src="../../images/process/blend-figma-skill.png"
          alt="Figma AI Skills feedback collector summarizing dozens of prototype review comments into priorities"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
    </div>
  );
}

function FilterCollage() {
  return (
    <div className="flex h-full items-center justify-center gap-3 bg-gradient-to-br from-primary-50 to-muted p-6 sm:gap-5 dark:from-primary-950/40 dark:to-muted">
      <Polaroid className="w-1/3 max-w-72 -rotate-3">
        <StaticImage
          src="../../images/process/filter-use-case-1.png"
          alt="Use case 1: cost allocation split across multiple rules and routed to destination teams"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/3 max-w-72 translate-y-3 rotate-2">
        <StaticImage
          src="../../images/process/filter-use-case-2.png"
          alt="Use case 2: reallocating a cost from one destination dimension to another"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/3 max-w-72 -rotate-1">
        <StaticImage
          src="../../images/process/filter-use-case-3.png"
          alt="Use case 3: cost-based allocation where each team's share is recalculated daily from actual spend"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
    </div>
  );
}

function BrewCollage() {
  return (
    <div className="flex h-full items-center justify-center gap-3 bg-gradient-to-br from-primary-50 to-muted p-6 sm:gap-5 dark:from-primary-950/40 dark:to-muted">
      <Polaroid className="w-1/3 max-w-72 -rotate-2">
        <StaticImage
          src="../../images/process/brew-handoff.png"
          alt="Figma file annotated for developer handoff, showing typography specs and generated CSS from design tokens"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/3 max-w-72 translate-y-3 rotate-3">
        <StaticImage
          src="../../images/process/brew-css-token.png"
          alt="globals.css theme tokens mapping CSS custom properties to color and radius variables"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
      <Polaroid className="w-1/3 max-w-72 -rotate-1">
        <StaticImage
          src="../../images/process/brew-variables.png"
          alt="Figma variables panel listing theme colors mapped to Tailwind color tokens"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
    </div>
  );
}

function TasteCollage() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-50 to-muted p-6 dark:from-primary-950/40 dark:to-muted">
      <Polaroid className="w-full max-w-96 rotate-1">
        <StaticImage
          src="../../images/process/taste-evaluation-plan.png"
          alt="MVP evaluation framework mapping research questions to metrics, methods, and priority"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={5 / 4}
          objectFit="cover"
        />
      </Polaroid>
    </div>
  );
}

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  // Bumped on every step change (manual or automatic) to remount the progress bar and restart its fill.
  const [cycle, setCycle] = useState(0);

  const selectStep = (i: number) => {
    setActive(i);
    setCycle(c => c + 1);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => {
      setActive(a => (a + 1) % STEPS.length);
      setCycle(c => c + 1);
    }, STEP_DWELL);
    return () => clearTimeout(timer);
  }, [cycle]);

  return (
    <section
      id="process"
      className="relative flex w-full flex-col gap-12">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="mb-4 text-xs font-medium tracking-widest text-primary uppercase">The roasting process</div>
        <h2 className="mb-4 font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">How I work.</h2>
        <p className="text-muted-foreground">
          Good design, like a good brew, rewards patience — the right steps, in the right order, given time to come together.
        </p>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl glass-panel md:h-[540px] md:grid-cols-[280px_1fr]">
          <div className="flex flex-col border-b border-border md:border-r md:border-b-0">
            <div>
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.step}
                    onClick={() => selectStep(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`block w-full cursor-pointer border-l-2 px-7 py-4 text-left transition-all ${
                      isActive ? 'border-l-primary bg-primary-50/40 dark:bg-primary-950/40' : 'border-l-transparent bg-transparent hover:bg-muted/50'
                    }`}>
                    <div className={`mb-1 text-xs font-semibold tracking-widest ${isActive ? 'text-primary' : 'text-default-400'}`}>
                      {s.step} · {s.brewTerm}
                    </div>
                    <div className={`text-lg font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</div>
                    {/* Grid-rows 0fr/1fr trick: animates from/to the description's natural height without a hardcoded value. */}
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div
                        aria-hidden={!isActive}
                        className="overflow-hidden">
                        <p className="pt-1.5 text-xs leading-relaxed text-muted-foreground">{s.caption}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Auto-progress: fills over STEP_DWELL, then hands off to the next step. Remounted by `cycle` so a manual click restarts it. */}
            <div className="mt-auto px-7 py-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  key={cycle}
                  className="h-full w-full origin-left rounded-full bg-primary motion-safe:animate-[story-fill_var(--dwell)_linear_forwards] motion-reduce:hidden"
                  style={{ '--dwell': `${STEP_DWELL}ms` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* Right panel: full-bleed collage only, no padding, filling edge-to-edge at a fixed height across steps. */}
          <div className="h-72 overflow-hidden md:h-full">
            <div
              key={active}
              className="h-full w-full motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in">
              {active === 0 ? (
                <GrindCollage />
              ) : active === 1 ? (
                <FilterCollage />
              ) : active === 2 ? (
                <BlendCollage />
              ) : active === 3 ? (
                <BrewCollage />
              ) : (
                <TasteCollage />
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
