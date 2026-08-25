import React from 'react';
import { Diagram, DiagramDefs, LegendItem, LegendStrip } from './diagramShell';
import { DIAGRAM } from './tokens';

interface StageNode {
  tag: string;
  title: string;
  sublabel: string;
  shipped: boolean;
}

const STAGES: StageNode[] = [
  { tag: 'SHIPPED', title: 'Detection', sublabel: 'record created', shipped: true },
  { tag: 'NOT BUILT', title: 'Notification', sublabel: 'in-app only', shipped: false },
  { tag: 'SHIPPED', title: 'Analysis', sublabel: 'find the why', shipped: true },
  { tag: 'LATER', title: 'Resolution', sublabel: 'issue resolved', shipped: false },
  { tag: 'LATER', title: 'Retrospective', sublabel: 'loop back', shipped: false },
];

const BOX_W = 144;
const BOX_H = 72;
const GAP = 32;
const MARGIN = 40;
const BOX_Y = 56;
const CY = BOX_Y + BOX_H / 2;
const VIEW_W = STAGES.length * BOX_W + (STAGES.length - 1) * GAP + 2 * MARGIN;
const VIEW_H = 216;

function boxX(i: number) {
  return MARGIN + i * (BOX_W + GAP);
}

/**
 * Flexera's cost-anomaly lifecycle: five stages, only two of them shipped in the MVP.
 * Solid stroke = shipped this quarter; dashed stroke = not built yet. The dashed return
 * path from Retrospective back to Detection shows the loop is designed, not closed yet.
 */
export function LifecycleFlow() {
  const slug = 'flexera-lifecycle';
  const lastBoxCx = boxX(STAGES.length - 1) + BOX_W / 2;
  const firstBoxCx = boxX(0) + BOX_W / 2;
  const loopY = BOX_Y + BOX_H + 24;

  return (
    <Diagram
      slug={slug}
      title="Flexera cost-anomaly lifecycle"
      desc="Five lifecycle stages — Detection, Notification, Analysis, Resolution, Retrospective — where only Detection and Analysis shipped in the MVP; a dashed path shows Retrospective feeding back into Detection for a future closed loop."
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <DiagramDefs idPrefix={slug} />

      {STAGES.slice(0, -1).map((_, i) => (
        <line
          key={i}
          x1={boxX(i) + BOX_W}
          y1={CY}
          x2={boxX(i + 1) - 2}
          y2={CY}
          stroke={DIAGRAM.muted}
          strokeWidth="1"
          markerEnd={`url(#${slug}-arrow)`}
        />
      ))}

      <path
        d={`M ${lastBoxCx} ${BOX_Y + BOX_H} V ${loopY - 8} Q ${lastBoxCx} ${loopY} ${lastBoxCx - 8} ${loopY} H ${firstBoxCx + 8} Q ${firstBoxCx} ${loopY} ${firstBoxCx} ${loopY - 8} V ${BOX_Y + BOX_H + 2}`}
        fill="none"
        stroke={DIAGRAM.muted}
        strokeWidth="1"
        strokeDasharray="4,3"
        markerEnd={`url(#${slug}-arrow)`}
      />
      <rect
        x={(lastBoxCx + firstBoxCx) / 2 - 44}
        y={loopY + 8}
        width="88"
        height="14"
        fill={DIAGRAM.paper}
      />
      <text
        x={(lastBoxCx + firstBoxCx) / 2}
        y={loopY + 18}
        textAnchor="middle"
        className="dd-mono"
        fontSize="8"
        letterSpacing="0.06em"
        fill={DIAGRAM.soft}>
        FEEDS FORWARD
      </text>

      {STAGES.map((stage, i) => {
        const x = boxX(i);
        const tagW = stage.tag.length * 5.5 + 12;
        return (
          <g key={i}>
            <rect
              x={x}
              y={BOX_Y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={stage.shipped ? DIAGRAM.paper : `rgba(${DIAGRAM.inkRgb},0.02)`}
              stroke={stage.shipped ? DIAGRAM.ink : `rgba(${DIAGRAM.inkRgb},0.3)`}
              strokeWidth="1"
              strokeDasharray={stage.shipped ? undefined : '4,3'}
            />
            <rect
              x={x + 8}
              y={BOX_Y + 8}
              width={tagW}
              height="12"
              rx="2"
              fill="transparent"
              stroke={stage.shipped ? DIAGRAM.accent : DIAGRAM.soft}
              strokeWidth="0.8"
              strokeDasharray={stage.shipped ? undefined : '2,2'}
            />
            <text
              x={x + 8 + tagW / 2}
              y={BOX_Y + 17}
              textAnchor="middle"
              className="dd-mono"
              fontSize="7"
              letterSpacing="0.06em"
              fill={stage.shipped ? DIAGRAM.accent : DIAGRAM.soft}>
              {stage.tag}
            </text>
            <text
              x={x + BOX_W / 2}
              y={BOX_Y + 44}
              textAnchor="middle"
              className="dd-sans"
              fontSize="12"
              fontWeight="600"
              fill={DIAGRAM.ink}>
              {stage.title}
            </text>
            <text
              x={x + BOX_W / 2}
              y={BOX_Y + 60}
              textAnchor="middle"
              className="dd-mono"
              fontSize="8"
              fill={DIAGRAM.muted}>
              {stage.sublabel}
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
          label="Shipped this MVP"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill={DIAGRAM.paper}
              stroke={DIAGRAM.ink}
            />
          }
        />
        <LegendItem
          x={220}
          y={VIEW_H - 20}
          label="Not built yet"
          swatch={
            <rect
              width="14"
              height="14"
              rx="2"
              fill={`rgba(${DIAGRAM.inkRgb},0.02)`}
              stroke={`rgba(${DIAGRAM.inkRgb},0.3)`}
              strokeDasharray="4,3"
            />
          }
        />
      </LegendStrip>
    </Diagram>
  );
}
