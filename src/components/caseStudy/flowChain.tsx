import React from 'react';
import { Tone, TONE_DOT, TONE_SURFACE } from './tone';

export interface FlowStep {
  tone: Tone;
  text: string;
}

const Arrow = () => (
  <svg
    className="mx-auto my-1 shrink-0 text-default-300 md:my-0 md:rotate-0"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none">
    <path
      d="M2 8h11M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function FlowChain({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center md:gap-2">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className={`rounded-lg border px-3.5 py-2.5 text-xs leading-snug ${TONE_SURFACE[step.tone]}`}>{step.text}</div>
          {i < steps.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

export function FlowChainLegend({ items }: { items: { tone: Tone; label: string }[] }) {
  return (
    <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
      {items.map(item => (
        <div
          key={item.tone}
          className="flex items-center gap-2">
          <span className={`size-2.5 rounded-xs border ${TONE_DOT[item.tone]}`} />
          <span className="text-xs text-default-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
