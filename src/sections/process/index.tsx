import * as React from 'react';
import { useState } from 'react';

const STEPS = [
  {
    step: '01',
    brewTerm: 'GRIND',
    title: 'Research',
    desc: 'Break the problem down before assuming a solution: interviews, data, stakeholder conversations, framing the real question before touching a screen.',
    tags: ['User interviews', 'Data analysis', 'Hypothesis validation'],
  },
  {
    step: '02',
    brewTerm: 'FILTER',
    title: 'Define',
    desc: 'Sort signal from noise. Turn research into a clear problem statement and success criteria the team can align behind.',
    tags: ['Problem framing', 'JTBD mapping', 'Success metrics'],
  },
  {
    step: '03',
    brewTerm: 'BLEND',
    title: 'Explore',
    desc: 'Widen before narrowing. Sketch several directions, stress-test them against constraints, and keep only what earns its place.',
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
    desc: 'Test with real users before it ships, then keep watching after launch. Adjust based on what actually happens, not what we hoped would.',
    tags: ['Usability testing', 'Analytics review', 'Iteration'],
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const current = STEPS[active];

  return (
    <section
      id="process"
      className="flex w-full flex-col gap-8">
      <div className="max-w-xl">
        <div className="mb-4 text-sm font-semibold tracking-wide text-primary">PROCESS</div>
        <h2 className="mb-4 text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">How I work.</h2>
        <p className="text-default-600">Good design, like a good brew, rewards patience: the right steps, in the right order, given time to come together.</p>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-default-200 md:grid-cols-[280px_1fr]">
        <div className="border-b border-default-200 bg-default-100 md:border-r md:border-b-0">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.step}
                onClick={() => setActive(i)}
                className={`block w-full cursor-pointer border-l-4 px-7 py-5 text-left transition-all ${
                  isActive ? 'border-l-primary bg-background' : 'border-l-transparent bg-transparent'
                }`}>
                <div className={`mb-1 text-xs font-bold tracking-widest ${isActive ? 'text-primary' : 'text-default-400'}`}>
                  {s.step} · {s.brewTerm}
                </div>
                <div className={`text-lg font-semibold ${isActive ? 'text-default-900' : 'text-default-600'}`}>{s.title}</div>
              </button>
            );
          })}
        </div>

        <div className="min-h-80 p-8 md:p-11">
          <div className="mb-3 text-sm font-semibold tracking-wide text-primary">{current.brewTerm}</div>
          <h3 className="mb-4 text-3xl font-extrabold tracking-[-0.01em]">{current.title}</h3>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-default-600">{current.desc}</p>
          <div className="flex flex-wrap gap-2">
            {current.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-default-200 bg-default-100 px-4 py-2 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
