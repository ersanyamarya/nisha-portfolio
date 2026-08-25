import { RouteIcon, SearchIcon, SparklesIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Reveal } from '../../components';

/** The three core values from docs/Brand.md §1, in the language of the roastery. */
const PILLARS = [
  {
    icon: SearchIcon,
    title: 'The Source',
    subtitle: 'Research & strategy',
    desc: 'Great coffee starts at the farm; great design starts with the user. Interviews, behavioural data and stakeholder truth come before anything reaches a screen.',
  },
  {
    icon: RouteIcon,
    title: 'The Extraction',
    subtitle: 'Architecture & flow',
    desc: 'Calibrating the right pressure. Journeys and information architecture that take friction out of the path and let people get where they were going.',
  },
  {
    icon: SparklesIcon,
    title: 'The Latte Art',
    subtitle: 'Delight & UI craft',
    desc: 'The finishing pour. Validated UX raised by considered interfaces, accessible by default, with the composition sense a background in painting leaves you.',
  },
];

const STEPS = [
  {
    step: '01',
    brewTerm: 'GRIND',
    title: 'Research',
    desc: 'Break the problem down before assuming a solution: interviews, product data, stakeholder conversations. Frame the real question first.',
    tags: ['User interviews', 'Data analysis', 'Hypothesis validation'],
  },
  {
    step: '02',
    brewTerm: 'FILTER',
    title: 'Define',
    desc: 'Sort signal from noise. Turn research into a problem statement and success criteria the whole team can align behind.',
    tags: ['Problem framing', 'JTBD mapping', 'Success metrics'],
  },
  {
    step: '03',
    brewTerm: 'BLEND',
    title: 'Explore',
    desc: 'Widen before narrowing. Sketch several directions, stress-test them against real constraints, and keep only what earns its place.',
    tags: ['Wireframes', 'Concept sketches', 'Design critique'],
  },
  {
    step: '04',
    brewTerm: 'BREW',
    title: 'Design',
    desc: 'Build the considered version: systems thinking, accessible components, and interactions that hold up under real use.',
    tags: ['Design systems', 'Prototyping', 'Accessibility'],
  },
  {
    step: '05',
    brewTerm: 'TASTE',
    title: 'Validate',
    desc: 'Test with real users before it ships, then keep watching after launch. Adjust to what actually happens, not what we hoped would.',
    tags: ['Usability testing', 'Analytics review', 'Iteration'],
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const current = STEPS[active];

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, subtitle, desc }, i) => (
          <Reveal
            key={title}
            delay={i * 0.1}>
            <div className="group h-full rounded-3xl p-8 glass-panel transition-transform duration-300 hover:-translate-y-2">
              <span className="mb-6 flex size-12 items-center justify-center rounded-full border border-primary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon
                  strokeWidth={1.5}
                  size={20}
                />
              </span>
              <div className="mb-1 text-xs font-medium tracking-widest text-primary uppercase">{subtitle}</div>
              <h3 className="mb-3 font-serif text-xl font-medium">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl glass-panel md:grid-cols-[280px_1fr]">
          <div className="border-b border-border md:border-r md:border-b-0">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.step}
                  onClick={() => setActive(i)}
                  className={`block w-full cursor-pointer border-l-2 px-7 py-5 text-left transition-all ${
                    isActive ? 'border-l-primary bg-primary-50/40 dark:bg-primary-950/40' : 'border-l-transparent bg-transparent'
                  }`}>
                  <div className={`mb-1 text-xs font-semibold tracking-widest ${isActive ? 'text-primary' : 'text-default-400'}`}>
                    {s.step} · {s.brewTerm}
                  </div>
                  <div className={`text-lg font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</div>
                </button>
              );
            })}
          </div>

          <div className="min-h-80 p-8 md:p-11">
            <div className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">{current.brewTerm}</div>
            <h3 className="mb-4 font-serif text-3xl font-medium tracking-[-0.01em]">{current.title}</h3>
            <p className="mb-7 max-w-xl text-base leading-relaxed text-muted-foreground">{current.desc}</p>
            <div className="flex flex-wrap gap-2">
              {current.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
