import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Reveal } from '../../components';

const STEPS = [
  {
    step: '01',
    brewTerm: 'GRIND',
    title: 'Research',
    caption: 'Talk to the people who use it, and to the ones who have to build it. The constraints show up in that second conversation.',
  },
  {
    step: '02',
    brewTerm: 'FILTER',
    title: 'Define',
    caption: 'Sort the findings into problems worth solving and problems worth ignoring. The second list is usually longer.',
  },
  {
    step: '03',
    brewTerm: 'BLEND',
    title: 'Explore',
    caption: 'Prototype with AI in the loop, so a bad idea costs an afternoon instead of a sprint.',
  },
  {
    step: '04',
    brewTerm: 'BREW',
    title: 'Design',
    caption: 'Design against tokens, and spec the states engineers ask about anyway. Empty, loading, error, name-too-long.',
  },
  {
    step: '05',
    brewTerm: 'TASTE',
    title: 'Validate',
    caption: 'Put it in front of real users and watch what they actually do. Then fix the part I got wrong.',
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
        <div className="mb-4 text-xs font-medium tracking-widest text-accent-foreground uppercase">The roasting process</div>
        <h2 className="mb-4 font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">How I work.</h2>
        <p className="text-muted-foreground">Same five steps, same order, every time. Skipping one is how you end up redesigning the same screen twice.</p>
      </Reveal>

      {/* Mobile: accordion — each step's image sits directly under its own caption instead of scrolling past the whole list. */}
      <Reveal className="md:hidden">
        <div className="overflow-hidden rounded-3xl glass-panel">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.step}
                className="border-b border-border last:border-none">
                <button
                  onClick={() => selectStep(i)}
                  aria-expanded={isActive}
                  className={`block w-full cursor-pointer px-7 py-6 text-left transition-colors ${isActive ? '' : 'hover:bg-muted/40'}`}>
                  <div className={`mb-1.5 text-xs font-semibold tracking-widest ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                    {s.step} · {s.brewTerm}
                  </div>
                  <div className={`text-lg font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</div>
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
                {/* Grid-rows 0fr/1fr trick: animates from/to the panel's natural height without a hardcoded value. */}
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div
                    aria-hidden={!isActive}
                    className="overflow-hidden">
                    <p className="px-7 pb-4 text-xs leading-relaxed text-muted-foreground">{s.caption}</p>
                    <div className="h-64 overflow-hidden sm:h-80">
                      {i === 0 ? <GrindImage /> : i === 1 ? <FilterImage /> : i === 2 ? <BlendImage /> : i === 3 ? <BrewImage /> : <TasteImage />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Desktop/tablet: side-by-side tabs with a shared featured-image panel. */}
      <Reveal className="hidden md:block">
        <div className="grid overflow-hidden rounded-3xl glass-panel md:h-[620px] md:grid-cols-[300px_1fr]">
          <div className="flex flex-col border-r border-border">
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
                    <div className={`mb-1.5 text-xs font-semibold tracking-widest ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
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
          <div className="h-full overflow-hidden">
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
