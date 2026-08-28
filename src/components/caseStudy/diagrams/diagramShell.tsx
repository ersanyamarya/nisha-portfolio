import React, { useEffect, useState } from 'react';
import { DIAGRAM } from './tokens';

export function DiagramDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <marker
        id={`${idPrefix}-arrow`}
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto">
        <polygon
          points="0 0, 8 3, 0 6"
          fill={DIAGRAM.muted}
        />
      </marker>
      <marker
        id={`${idPrefix}-arrow-accent`}
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto">
        <polygon
          points="0 0, 8 3, 0 6"
          fill={DIAGRAM.accent}
        />
      </marker>
    </defs>
  );
}

export function Diagram({
  slug,
  title,
  desc,
  viewBox,
  children,
  className = 'block h-auto w-full',
}: {
  slug: string;
  title: string;
  desc: string;
  viewBox: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      id={slug}
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${slug}-title ${slug}-desc`}
      className={className}>
      <title id={`${slug}-title`}>{title}</title>
      <desc id={`${slug}-desc`}>{desc}</desc>
      {/*
        The site's global reset (`* { font-family: var(--font-sans) }` in layout.css) beats a plain
        `font-family` presentation attribute on every <text> node — presentation attributes sit at the
        lowest cascade priority. An ID-scoped rule outranks that universal selector, so it's the only
        reliable way to give these diagrams their own Geist/Geist Mono type ramp.
      */}
      <style>{`
        #${slug} .dd-sans { font-family: ${DIAGRAM.fontSans}; }
        #${slug} .dd-mono { font-family: ${DIAGRAM.fontMono}; }
      `}</style>
      <rect
        width="100%"
        height="100%"
        fill={DIAGRAM.paper}
      />
      {children}
    </svg>
  );
}

export function LegendItem({ x, y, swatch, label }: { x: number; y: number; swatch: React.ReactNode; label: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {swatch}
      <text
        x="20"
        y="9"
        className="dd-mono"
        fontSize="8"
        fill={DIAGRAM.muted}>
        {label}
      </text>
    </g>
  );
}

export function LegendStrip({ y, width, children }: { y: number; width: number; children: React.ReactNode }) {
  return (
    <g>
      <line
        x1={24}
        y1={y - 12}
        x2={width - 24}
        y2={y - 12}
        stroke={DIAGRAM.rule}
        strokeWidth="0.8"
      />
      {children}
    </g>
  );
}

/**
 * Wraps a diagram render function with the same two-step zoom as `ZoomableImage`: hover shows
 * a magnifying-glass cursor; click (or Enter/Space) opens it enlarged in a scrollable overlay;
 * clicking the enlarged diagram zooms it further (scroll to pan around); click it again, press
 * Escape, or click outside the diagram to close. `render` is called once per slug so the inline
 * and zoomed copies get distinct SVG ids and don't collide in the DOM.
 */
export function ZoomableDiagram({ baseSlug, title, render }: { baseSlug: string; title: string; render: (slug: string) => React.ReactNode }) {
  const [zoomed, setZoomed] = useState(false);
  const [fullSize, setFullSize] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [zoomed]);

  const close = () => {
    setZoomed(false);
    setFullSize(false);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Zoom into diagram: ${title}`}
        className="cursor-zoom-in"
        onClick={() => setZoomed(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setZoomed(true);
          }
        }}>
        {render(baseSlug)}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex flex-col overflow-auto bg-default-950/80 p-6"
          onClick={close}>
          <div className="m-auto w-fit">
            <div
              role="button"
              tabIndex={0}
              aria-label={fullSize ? `Zoom out of diagram: ${title}` : `Zoom into diagram: ${title}`}
              className={fullSize ? 'w-[1800px] max-w-none cursor-zoom-out' : 'w-[min(90vw,1024px)] cursor-zoom-in'}
              onClick={e => {
                e.stopPropagation();
                setFullSize(f => !f);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFullSize(f => !f);
                }
              }}>
              {render(`${baseSlug}-zoomed`)}
            </div>
          </div>
          <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-default-900/80 px-4 py-1.5 text-xs font-medium text-default-50">
            {fullSize ? 'Click diagram to zoom out' : 'Click diagram to zoom in'} · Esc to close
          </div>
        </div>
      )}
    </>
  );
}
