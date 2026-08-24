import React from 'react';
import { Diagram, DiagramDefs, LegendItem, LegendStrip } from './diagramShell';
import { DIAGRAM } from './tokens';

export type TraceNodeKind = 'input' | 'plain' | 'focal' | 'future';

export interface TraceNode {
  kind: TraceNodeKind;
  lines: string[];
}

const BOX_W = 176;
const BOX_H = 96;
const GAP = 24;
const MARGIN = 40;
const CY = MARGIN + BOX_H / 2;
const VIEW_W = 6 * BOX_W + 5 * GAP + 2 * MARGIN;
const VIEW_H = 192;

function boxX(i: number) {
  return MARGIN + i * (BOX_W + GAP);
}

function nodeFill(kind: TraceNodeKind) {
  switch (kind) {
    case 'input':
      return `rgba(${DIAGRAM.inkRgb},0.05)`;
    case 'focal':
      return DIAGRAM.accentTint;
    case 'future':
      return `rgba(${DIAGRAM.inkRgb},0.02)`;
    default:
      return '#ffffff';
  }
}

function nodeStroke(kind: TraceNodeKind) {
  switch (kind) {
    case 'input':
      return DIAGRAM.soft;
    case 'focal':
      return DIAGRAM.accent;
    case 'future':
      return `rgba(${DIAGRAM.inkRgb},0.3)`;
    default:
      return DIAGRAM.ink;
  }
}

/**
 * A 6-step research → decision trace: what we found, the need it implied, the job that
 * followed, the decision the MVP made, why it fit, and what's next. One focal (accent) node —
 * the job itself — is the only coral in the diagram, per the "1-2 focal elements" rule.
 */
export function JobTraceFlow({
  slug,
  title,
  desc,
  steps,
}: {
  slug: string;
  title: string;
  desc: string;
  steps: [TraceNode, TraceNode, TraceNode, TraceNode, TraceNode, TraceNode];
}) {
  const idPrefix = slug;

  return (
    <Diagram
      slug={slug}
      title={title}
      desc={desc}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <DiagramDefs idPrefix={idPrefix} />

      {steps.slice(0, 5).map((step, i) => {
        const isFocalEdge = steps[i].kind === 'focal' || steps[i + 1].kind === 'focal';
        const x1 = boxX(i) + BOX_W;
        const x2 = boxX(i + 1);
        return (
          <line
            key={i}
            x1={x1}
            y1={CY}
            x2={x2 - 2}
            y2={CY}
            stroke={isFocalEdge ? DIAGRAM.accent : DIAGRAM.muted}
            strokeWidth={isFocalEdge ? 1.2 : 1}
            markerEnd={`url(#${idPrefix}-arrow${isFocalEdge ? '-accent' : ''})`}
          />
        );
      })}

      {steps.map((step, i) => {
        const x = boxX(i);
        const dashed = step.kind === 'future';
        return (
          <g key={i}>
            <rect
              x={x}
              y={MARGIN}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={nodeFill(step.kind)}
              stroke={nodeStroke(step.kind)}
              strokeWidth={step.kind === 'focal' ? 1.2 : 1}
              strokeDasharray={dashed ? '4,3' : undefined}
            />
            <text
              x={x + BOX_W / 2}
              y={MARGIN + BOX_H / 2 - (step.lines.length > 1 ? 6 : 0)}
              textAnchor="middle"
              className="dd-sans"
              fontSize="12"
              fontWeight={step.kind === 'focal' ? 700 : 600}
              fill={step.kind === 'focal' ? DIAGRAM.accent : DIAGRAM.ink}>
              {step.lines.map((line, li) => (
                <tspan
                  key={li}
                  x={x + BOX_W / 2}
                  dy={li === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      <LegendStrip
        y={VIEW_H - 32}
        width={VIEW_W}>
        <LegendItem
          x={40}
          y={VIEW_H - 20}
          label="Research finding"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill={nodeFill('input')}
              stroke={nodeStroke('input')}
            />
          }
        />
        <LegendItem
          x={220}
          y={VIEW_H - 20}
          label="Need · decision · why"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill="#ffffff"
              stroke={DIAGRAM.ink}
            />
          }
        />
        <LegendItem
          x={400}
          y={VIEW_H - 20}
          label="Job → MVP decision"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill={nodeFill('focal')}
              stroke={nodeStroke('focal')}
              strokeWidth="1.2"
            />
          }
        />
        <LegendItem
          x={640}
          y={VIEW_H - 20}
          label="Next / not yet"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill={nodeFill('future')}
              stroke={nodeStroke('future')}
              strokeDasharray="4,3"
            />
          }
        />
      </LegendStrip>
    </Diagram>
  );
}
