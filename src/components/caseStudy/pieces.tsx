import React, { useEffect, useState } from 'react';
import { Tone, TONE_SOLID, TONE_TEXT } from './tone';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-bold tracking-wide text-primary">{children}</div>;
}

export function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mb-5 text-3xl font-extrabold tracking-[-0.01em] md:text-4xl ${className}`}>{children}</h2>;
}

/**
 * A case-study screenshot/diagram image with the same click-to-zoom behavior as the SVG
 * diagrams, plus a second zoom step for actually reading detail: hover shows a
 * magnifying-glass cursor; click (or Enter/Space) opens it enlarged in a scrollable overlay;
 * clicking the enlarged image zooms it to full resolution (scroll to pan around); click it
 * again, press Escape, or click outside the image to close.
 */
export function ZoomableImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
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
      <img
        src={src}
        alt={alt}
        role="button"
        tabIndex={0}
        aria-label={`Zoom into image: ${alt}`}
        className={`cursor-zoom-in ${className}`}
        onClick={() => setZoomed(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setZoomed(true);
          }
        }}
      />

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex flex-col overflow-auto bg-default-950/80 p-6"
          onClick={close}>
          <div className="m-auto w-fit">
            <img
              src={src}
              alt={alt}
              onClick={e => {
                e.stopPropagation();
                setFullSize(f => !f);
              }}
              className={fullSize ? 'max-w-none cursor-zoom-out rounded-2xl' : 'max-h-[85vh] max-w-[90vw] cursor-zoom-in rounded-2xl object-contain'}
            />
          </div>
          <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-default-900/80 px-4 py-1.5 text-xs font-medium text-default-50">
            {fullSize ? 'Click image to zoom out' : 'Click image to zoom in'} · Esc to close
          </div>
        </div>
      )}
    </>
  );
}

export function StatChip({ eyebrow, value, label }: { eyebrow: string; value: string; label: string }) {
  return (
    <div className="min-w-60 flex-1 rounded-2xl border border-default-200 bg-default-100 px-5 py-5">
      <div className="mb-2.5 inline-block rounded-full bg-primary-100 px-2.5 py-1 text-[10px] font-bold tracking-wider whitespace-nowrap text-primary-800">
        {eyebrow}
      </div>
      <div className="mb-1 text-3xl font-extrabold tracking-[-0.02em]">{value}</div>
      <div className="text-sm leading-snug text-default-500">{label}</div>
    </div>
  );
}

export function DarkStat({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-default-900 px-6 py-6">
      <div className="mb-1.5 text-4xl font-extrabold tracking-[-0.02em] text-primary-300">{value}</div>
      <div className="mb-1.5 text-sm font-semibold text-default-50">{label}</div>
      <p className="text-sm leading-snug text-default-50 opacity-60">{detail}</p>
    </div>
  );
}

export function InsightCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50 px-6 py-5">
      <div className="mb-2.5 flex items-center gap-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none">
          <path
            d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-primary-700"
          />
          <circle
            cx="8"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary-700"
          />
        </svg>
        <span className="text-[11px] font-extrabold tracking-widest text-primary-700">INSIGHT</span>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function FunnelBreakdown({
  eyebrow,
  from,
  to,
  dropLabel,
  dropSub,
  notes,
  className = '',
}: {
  eyebrow: string;
  from: { label: string; value: string; sub: string };
  to: { label: string; value: string; sub: string };
  dropLabel: string;
  dropSub: string;
  notes: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-default-200 px-6 py-8 md:px-10 ${className}`}>
      <div className="mb-8 text-[11px] font-extrabold tracking-widest text-default-500">{eyebrow}</div>
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 text-base font-bold">{from.label}</div>
          <div className="text-4xl font-extrabold tracking-[-0.02em]">{from.value}</div>
          <div className="text-sm text-default-500">{from.sub}</div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1.5 px-4">
          <span className="text-sm font-bold text-secondary-600">{dropLabel}</span>
          <svg
            width="100%"
            height="12"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            className="w-full max-w-60 text-secondary-400">
            <line
              x1="0"
              y1="6"
              x2="188"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6,5"
            />
            <polygon
              points="188,1 200,6 188,11"
              fill="currentColor"
            />
          </svg>
          <span className="text-xs text-default-500">{dropSub}</span>
        </div>
        <div className="text-left md:text-right">
          <div className="mb-1 text-base font-bold">{to.label}</div>
          <div className="text-4xl font-extrabold tracking-[-0.02em]">{to.value}</div>
          <div className="text-sm text-default-500">{to.sub}</div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-default-200 pt-6 sm:flex-row sm:gap-8">
        {notes.map((note, i) => (
          <p
            key={i}
            className="text-sm text-muted-foreground">
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}

export function QuoteBlock({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <div className="rounded-xl bg-default-100 px-6 py-5">
      <p className="mb-2 text-base leading-relaxed font-medium text-muted-foreground italic">&ldquo;{quote}&rdquo;</p>
      {attribution && <p className="text-sm font-semibold text-default-500">— {attribution}</p>}
    </div>
  );
}

export function PillTag({ children, tone = 'default' }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${TONE_SOLID[tone]}`}>{children}</span>;
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="mt-2.5 size-1.5 flex-shrink-0 rounded-full bg-primary" />
      <p className="text-base leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function ChallengeApproachOutcome({
  challenge,
  approach,
  outcome,
}: {
  challenge?: React.ReactNode;
  approach: React.ReactNode;
  outcome: React.ReactNode;
}) {
  const items = [
    challenge !== undefined && { label: 'Challenge', body: challenge },
    { label: 'Approach', body: approach },
    { label: 'Outcome', body: outcome },
  ].filter(Boolean) as { label: string; body: React.ReactNode }[];
  return (
    <div className={`grid grid-cols-1 gap-8 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {items.map(item => (
        <div key={item.label}>
          <div className="mb-3.5 text-[11px] font-extrabold tracking-widest text-default-500">{item.label}</div>
          <p className="text-base leading-relaxed text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none">
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 8l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none">
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5.5 5.5l5 5M10.5 5.5l-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** A labelled callout for user-test/feedback moments. `tone="success"` for positive feedback, `tone="secondary"` for negative. */
export function FeedbackCallout({ tone, label, children }: { tone: 'success' | 'secondary'; label: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border px-6 py-6 ${tone === 'success' ? 'border-success-200 bg-success-50' : 'border-secondary-200 bg-secondary-50'}`}>
      <div className={`mb-4 flex items-center gap-2 text-xs font-bold tracking-wide ${TONE_TEXT[tone]}`}>
        {tone === 'success' ? <CheckIcon /> : <CrossIcon />}
        {label}
      </div>
      {children}
    </div>
  );
}

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FeedbackCallout
        tone="success"
        label="PROS">
        <div className="flex flex-col gap-3.5">
          {pros.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      </FeedbackCallout>
      <FeedbackCallout
        tone="secondary"
        label="CONS">
        <div className="flex flex-col gap-3.5">
          {cons.map((c, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: c }}
            />
          ))}
        </div>
      </FeedbackCallout>
    </div>
  );
}

export function FooterNav({ prevLabel = 'All work', nextLabel, nextTo }: { prevLabel?: string; nextLabel: string; nextTo: string }) {
  return (
    <section className="mt-16 border-t border-default-200 bg-default-100 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a
          href="/#work"
          className="text-sm font-semibold text-default-500 hover:text-muted-foreground">
          {prevLabel}
        </a>
        <a
          href={nextTo}
          className="text-base font-bold text-foreground hover:text-primary">
          {nextLabel} →
        </a>
      </div>
    </section>
  );
}
