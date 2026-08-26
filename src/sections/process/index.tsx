import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Reveal } from '../../components';

const STEPS = [
  {
    step: '01',
    brewTerm: 'GRIND',
    title: 'Research',
    caption: 'Understand the users, their context, and the constraints before jumping to a solution.',
  },
  {
    step: '02',
    brewTerm: 'FILTER',
    title: 'Define',
    caption: 'Turn messy findings into clear problems, user journeys, and priorities to tackle.',
  },
  {
    step: '03',
    brewTerm: 'BLEND',
    title: 'Explore',
    caption: 'Pair AI with rapid prototyping to test ideas and find stronger solutions, fast.',
  },
  {
    step: '04',
    brewTerm: 'BREW',
    title: 'Design',
    caption: 'Bring the experience to life with design tokens, thoughtful interactions, and clean handoff.',
  },
  {
    step: '05',
    brewTerm: 'TASTE',
    title: 'Validate',
    caption: 'Test, measure, and learn from real user behaviour to sharpen the experience.',
  },
];

/** How long a step holds before the panel auto-advances, in ms. */
const STEP_DWELL = 5000;

/** Full-bleed gradient backdrop for a step's featured image, centered and unrotated, no shadow/frame. */
function ImageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-muted p-8 sm:p-12 dark:from-primary-950/40 dark:to-muted">
      {children}
    </div>
  );
}

function GrindImage() {
  return (
    <ImageFrame>
      <StaticImage
        src="../../images/process/grind.png"
        alt="Interview questions probing MQTT broker configuration sharing and debugging workflows"
        placeholder="blurred"
        layout="constrained"
        width={900}
        height={651}
        objectFit="contain"
      />
    </ImageFrame>
  );
}

function FilterImage() {
  return (
    <ImageFrame>
      <div style={{ transform: 'scale(1.25)', transformOrigin: 'left center' }}>
        <StaticImage
          src="../../images/process/filter.png"
          alt="Use case 1: cost allocation split across multiple rules and routed to destination teams"
          placeholder="blurred"
          layout="constrained"
          width={900}
          height={531}
          objectFit="contain"
        />
      </div>
    </ImageFrame>
  );
}

function BlendImage() {
  return (
    <ImageFrame>
      <div style={{ transform: 'scale(1.25)', transformOrigin: 'left center' }}>
        <StaticImage
          src="../../images/process/blend.png"
          alt="Claude conversation adding validation logic to a Figma prototype, next to the resulting interactive form"
          placeholder="blurred"
          layout="constrained"
          width={900}
          height={482}
          objectFit="contain"
        />
      </div>
    </ImageFrame>
  );
}

function BrewImage() {
  return (
    <ImageFrame>
      <StaticImage
        src="../../images/process/brew.png"
        alt="Figma file annotated for developer handoff, showing typography specs and generated CSS from design tokens"
        placeholder="blurred"
        layout="constrained"
        width={900}
        height={726}
        objectFit="contain"
      />
    </ImageFrame>
  );
}

function TasteImage() {
  return (
    <ImageFrame>
      <StaticImage
        src="../../images/process/taste.png"
        alt="MVP evaluation framework mapping research questions to metrics, methods, and priority"
        placeholder="blurred"
        layout="constrained"
        width={800}
        height={510}
        objectFit="contain"
      />
    </ImageFrame>
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
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl glass-panel md:h-[620px] md:grid-cols-[300px_1fr]">
          <div className="flex flex-col border-b border-border md:border-r md:border-b-0">
            <div>
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.step}
                    onClick={() => selectStep(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`block w-full cursor-pointer border-b border-border px-7 py-6 text-left transition-colors last:border-none ${
                      isActive ? '' : 'hover:bg-muted/40'
                    }`}>
                    <div className={`mb-1.5 text-xs font-semibold tracking-widest ${isActive ? 'text-primary' : 'text-default-400'}`}>
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
                    {/* Auto-progress underline: fills over STEP_DWELL, then hands off to the next step. Remounted by `cycle` so a manual click restarts it. */}
                    {isActive && (
                      <div className="mt-3 h-0.5 w-10 overflow-hidden rounded-full bg-primary/20">
                        <div
                          key={cycle}
                          className="h-full w-full origin-left rounded-full bg-primary motion-safe:animate-[story-fill_var(--dwell)_linear_forwards] motion-reduce:hidden"
                          style={{ '--dwell': `${STEP_DWELL}ms` } as React.CSSProperties}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: single large featured image, no padding on the wrapper so it fills edge-to-edge at a fixed height across steps. */}
          <div className="h-80 overflow-hidden sm:h-96 md:h-full">
            <div
              key={active}
              className="h-full w-full motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in">
              {active === 0 ? <GrindImage /> : active === 1 ? <FilterImage /> : active === 2 ? <BlendImage /> : active === 3 ? <BrewImage /> : <TasteImage />}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
