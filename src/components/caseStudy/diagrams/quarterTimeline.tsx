import React from 'react';

interface Phase {
  weeks: number;
  range: string;
  title: string;
  description: string;
  barClass: string;
  labelClass: string;
}

const PHASES: Phase[] = [
  {
    weeks: 3,
    range: 'Weeks 1–3',
    title: 'Discovery',
    description: 'Usage data review, stakeholder & FinOps interviews, current-state gap analysis, cross-functional lifecycle framework.',
    barClass: 'bg-default-300 dark:bg-default-600',
    labelClass: 'text-default-600 dark:text-default-300',
  },
  {
    weeks: 5,
    range: 'Weeks 4–8',
    title: 'Design & prototyping',
    description: "Data model definition, user journey mapping, wireframing, iteration with algorithm and engineering teams on what's feasible for MVP.",
    barClass: 'bg-success-400 dark:bg-success-600',
    labelClass: 'text-success-700 dark:text-success-400',
  },
  {
    weeks: 4,
    range: 'Weeks 9–12',
    title: 'MVP delivery',
    description:
      'Shipped system-generated anomalies experience: navigation destination, filterable/groupable table, detail slide-out with root cause analysis concept.',
    barClass: 'bg-primary-500',
    labelClass: 'text-primary-700 dark:text-primary-400',
  },
];

/** The single-quarter Flexera timeline as a segmented progress bar, widths proportional to each phase's weeks. */
export function QuarterTimeline() {
  return (
    <div>
      <div
        className="flex h-2 w-full overflow-hidden rounded-full"
        role="img"
        aria-label="Progress bar spanning a single quarter: Weeks 1–3 discovery, Weeks 4–8 design and prototyping, Weeks 9–12 MVP delivery.">
        {PHASES.map((phase, i) => (
          <div
            key={i}
            className={phase.barClass}
            style={{ flexGrow: phase.weeks, flexBasis: 0 }}
          />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[3fr_5fr_4fr] md:gap-6">
        {PHASES.map((phase, i) => (
          <div key={i}>
            <div className={`mb-2 text-sm font-bold ${phase.labelClass}`}>{phase.range}</div>
            <div className="mb-2 text-lg font-bold">{phase.title}</div>
            <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
