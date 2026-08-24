import React from 'react';
import { Diagram, LegendItem, LegendStrip } from './diagramShell';
import { DIAGRAM } from './tokens';

interface Milestone {
  x: number;
  above: boolean;
  eyebrow: string;
  title: string;
  major?: boolean;
}

const BASELINE_Y = 200;
const MILESTONES: Milestone[] = [
  { x: 160, above: true, eyebrow: 'QUARTER 1', title: 'Discovery' },
  { x: 400, above: false, eyebrow: 'Q1 → Q2', title: 'Design & prototyping' },
  { x: 640, above: true, eyebrow: 'END OF Q2', title: 'MVP delivery', major: true },
];

const VIEW_W = 800;
const VIEW_H = 344;

/** The two-quarter Flexera timeline: discovery, then design, ending in a shipped MVP. */
export function QuarterTimeline() {
  const slug = 'flexera-timeline';

  return (
    <Diagram
      slug={slug}
      title="Flexera project timeline"
      desc="A two-quarter timeline running from Quarter 1 discovery, through Q1-to-Q2 design and prototyping, to a shipped MVP at the end of Q2."
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <line
        x1="80"
        y1={BASELINE_Y}
        x2="720"
        y2={BASELINE_Y}
        stroke={DIAGRAM.ruleSolid}
        strokeWidth="1"
      />

      {MILESTONES.map((m, i) => {
        const r = m.major ? 6 : 4;
        const tickTop = m.above ? BASELINE_Y - 4 : BASELINE_Y + r;
        const tickBottom = m.above ? BASELINE_Y - r : BASELINE_Y + 4;
        const connectorFar = m.above ? BASELINE_Y - 48 : BASELINE_Y + 48;
        const titleY = m.above ? BASELINE_Y - 56 : BASELINE_Y + 68;
        const eyebrowY = m.above ? BASELINE_Y - 76 : BASELINE_Y + 88;

        return (
          <g key={i}>
            <line
              x1={m.x}
              y1={m.above ? BASELINE_Y - r - 4 : BASELINE_Y + r + 4}
              x2={m.x}
              y2={connectorFar}
              stroke={DIAGRAM.rule}
              strokeWidth="0.8"
            />
            <line
              x1={m.x}
              y1={tickTop}
              x2={m.x}
              y2={tickBottom}
              stroke={DIAGRAM.ruleSolid}
              strokeWidth="1"
            />
            <circle
              cx={m.x}
              cy={BASELINE_Y}
              r={r}
              fill={m.major ? DIAGRAM.accentTint : DIAGRAM.ink}
              stroke={m.major ? DIAGRAM.accent : 'none'}
              strokeWidth={m.major ? 1.2 : 0}
            />
            <text
              x={m.x}
              y={eyebrowY}
              textAnchor="middle"
              className="dd-mono"
              fontSize="8"
              letterSpacing="0.06em"
              fill={DIAGRAM.muted}>
              {m.eyebrow}
            </text>
            <text
              x={m.x}
              y={titleY}
              textAnchor="middle"
              className="dd-sans"
              fontSize="13"
              fontWeight={m.major ? 700 : 600}
              fill={m.major ? DIAGRAM.accent : DIAGRAM.ink}>
              {m.title}
            </text>
          </g>
        );
      })}

      <LegendStrip
        y={VIEW_H - 32}
        width={VIEW_W}>
        <LegendItem
          x={220}
          y={VIEW_H - 20}
          label="Project phase"
          swatch={
            <circle
              cx="7"
              cy="7"
              r="4"
              fill={DIAGRAM.ink}
            />
          }
        />
        <LegendItem
          x={400}
          y={VIEW_H - 20}
          label="Shipped milestone"
          swatch={
            <circle
              cx="7"
              cy="7"
              r="5"
              fill={DIAGRAM.accentTint}
              stroke={DIAGRAM.accent}
              strokeWidth="1.2"
            />
          }
        />
      </LegendStrip>
    </Diagram>
  );
}
