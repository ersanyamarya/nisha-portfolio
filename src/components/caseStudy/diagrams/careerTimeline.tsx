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
  { x: 100, above: true, eyebrow: '2017–2020', title: 'Software Developer' },
  { x: 280, above: false, eyebrow: '2020–2021', title: 'Lead Engineer' },
  { x: 460, above: true, eyebrow: '2021–2023', title: 'Head of Engineering' },
  { x: 640, above: false, eyebrow: '2023–', title: 'Co-Founder & CTO' },
  { x: 820, above: true, eyebrow: '2024–present', title: 'IoT Cloud Architect', major: true },
];

const VIEW_W = 920;
const VIEW_H = 344;

function getMilestoneStyle(major: boolean | undefined) {
  return major
    ? {
        r: 6,
        circleFill: DIAGRAM.accentTint,
        circleStroke: DIAGRAM.accent,
        circleStrokeWidth: 1.2,
        titleFill: DIAGRAM.accent,
        fontWeight: 700,
      }
    : {
        r: 4,
        circleFill: DIAGRAM.ink,
        circleStroke: 'none',
        circleStrokeWidth: 0,
        titleFill: DIAGRAM.ink,
        fontWeight: 600,
      };
}

function getMilestonePosition(above: boolean, r: number) {
  return above
    ? {
        tickTop: BASELINE_Y - 4,
        tickBottom: BASELINE_Y - r,
        connectorNear: BASELINE_Y - r - 4,
        connectorFar: BASELINE_Y - 48,
        titleY: BASELINE_Y - 56,
        eyebrowY: BASELINE_Y - 76,
      }
    : {
        tickTop: BASELINE_Y + r,
        tickBottom: BASELINE_Y + 4,
        connectorNear: BASELINE_Y + r + 4,
        connectorFar: BASELINE_Y + 48,
        titleY: BASELINE_Y + 68,
        eyebrowY: BASELINE_Y + 88,
      };
}

/** Sanyam's career arc: five roles, ending on the AI-native identity the redesign had to foreground. */
export function CareerTimeline() {
  const slug = 'sanyam-portfolio-career';

  return (
    <Diagram
      slug={slug}
      title="Sanyam Arya's career progression"
      desc="A timeline running from Software Developer roles at AFour and trivago, through Lead Engineer and Head of Engineering at weeve, Co-Founder & CTO at beeta.one, to IoT Cloud Architect at PROTH!NX today — the identity the site redesign needed to lead with."
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <line
        x1="60"
        y1={BASELINE_Y}
        x2="860"
        y2={BASELINE_Y}
        stroke={DIAGRAM.ruleSolid}
        strokeWidth="1"
      />

      {MILESTONES.map((m, i) => {
        const style = getMilestoneStyle(m.major);
        const pos = getMilestonePosition(m.above, style.r);

        return (
          <g key={i}>
            <line
              x1={m.x}
              y1={pos.connectorNear}
              x2={m.x}
              y2={pos.connectorFar}
              stroke={DIAGRAM.rule}
              strokeWidth="0.8"
            />
            <line
              x1={m.x}
              y1={pos.tickTop}
              x2={m.x}
              y2={pos.tickBottom}
              stroke={DIAGRAM.ruleSolid}
              strokeWidth="1"
            />
            <circle
              cx={m.x}
              cy={BASELINE_Y}
              r={style.r}
              fill={style.circleFill}
              stroke={style.circleStroke}
              strokeWidth={style.circleStrokeWidth}
            />
            <text
              x={m.x}
              y={pos.eyebrowY}
              textAnchor="middle"
              className="dd-mono"
              fontSize="8"
              letterSpacing="0.06em"
              fill={DIAGRAM.muted}>
              {m.eyebrow}
            </text>
            <text
              x={m.x}
              y={pos.titleY}
              textAnchor="middle"
              className="dd-sans"
              fontSize="12"
              fontWeight={style.fontWeight}
              fill={style.titleFill}>
              {m.title}
            </text>
          </g>
        );
      })}

      <LegendStrip
        y={VIEW_H - 32}
        width={VIEW_W}>
        <LegendItem
          x={280}
          y={VIEW_H - 20}
          label="Prior role"
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
          x={460}
          y={VIEW_H - 20}
          label="Identity the redesign leads with"
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
