import React from 'react';
import { cn } from '@/lib/utils';
import { TiltCard } from './tiltCard';

/**
 * Natural frame size. Every measurement inside is expressed in `em` against a
 * font-size of `100cqw / 440`, so 1em === 1px at natural width and the whole device
 * scales cleanly to whatever column it lands in.
 */
const FRAME_W = 440;
const FRAME_H = 916;

/** Side buttons, in natural px: left rail is mute + volume, right rail is power. */
const BUTTONS = [
  { side: 'left', top: 191, height: 40 },
  { side: 'left', top: 264, height: 64 },
  { side: 'left', top: 349, height: 64 },
  { side: 'right', top: 287, height: 112 },
] as const;

/** Brushed-titanium rail: bright specular band across the middle, dark at both edges. */
const RAIL = 'linear-gradient(180deg, var(--color-primary-800) 0%, var(--color-primary-300) 8%, var(--color-primary-600) 55%, var(--color-primary-800) 100%)';
const BUTTON_SHEEN = 'inset 0.5em 0 0.5em -0.25em rgba(255, 205, 161, 0.9), inset -3em 0 1.5em -1.5em rgba(184, 64, 0, 0.9)';

interface PhoneMockProps {
  children: React.ReactNode;
  className?: string;
  /** Resting yaw, in degrees, that gives the mock its dimensionality. */
  yaw?: number;
}

/**
 * A titanium iPhone the screen content sits inside. Rendered face-on but held at a
 * slight yaw so it reads as an object rather than a rectangle; the cursor tilts it,
 * and it straightens as you approach so the screen is square-on while you use it.
 */
export function PhoneMock({ children, className, yaw = -7 }: PhoneMockProps) {
  return (
    <div className={cn('[container-type:inline-size] mx-auto w-full max-w-[22rem]', className)}>
      <div
        className="group/phone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:[transform:perspective(1800px)_rotateY(0deg)] motion-reduce:transition-none"
        style={{ transform: `perspective(1800px) rotateY(${yaw}deg)` }}>
        <TiltCard max={5}>
          <div
            className="relative w-full"
            style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}`, fontSize: `calc(100cqw / ${FRAME_W})` }}>
            {/* Side buttons, tucked behind the rail so only their outer edge shows. */}
            {BUTTONS.map(({ side, top, height }) => (
              <span
                key={`${side}-${top}`}
                aria-hidden="true"
                className="absolute w-[5em] rounded-[1.5em]"
                style={{
                  top: `${top}em`,
                  height: `${height}em`,
                  [side]: '1em',
                  background: RAIL,
                  boxShadow: BUTTON_SHEEN,
                }}
              />
            ))}

            {/* Titanium rail */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[76em]"
              style={{ background: RAIL, boxShadow: '0 30em 60em -20em rgba(41, 37, 36, 0.55)' }}
            />

            {/* Chassis, with the warm halo the rail throws onto it */}
            <span
              aria-hidden="true"
              className="absolute inset-[6em] rounded-[70em] bg-default-800"
              style={{ boxShadow: '0 0 8em 0 rgba(247, 163, 72, 0.45), 0 0 3em 0 rgba(255, 255, 255, 0.35)' }}
            />

            {/* Bezel */}
            <span
              aria-hidden="true"
              className="absolute inset-[12em] rounded-[64em] bg-black"
            />

            {/* Screen */}
            <div className="absolute inset-x-[19em] inset-y-[21em] overflow-hidden rounded-[57em] bg-black">{children}</div>

            {/* Dynamic Island */}
            <span
              aria-hidden="true"
              className="absolute top-[32em] left-1/2 flex h-[34em] w-[120em] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[10em]">
              <span
                className="size-[13em] rounded-full bg-default-950"
                style={{ boxShadow: 'inset 0 0 2em 0.5em rgba(131, 149, 175, 0.35), inset 0 0 1em 0.5em rgba(0, 0, 0, 0.9)' }}
              />
            </span>

            {/* Home indicator */}
            <span
              aria-hidden="true"
              className="absolute bottom-[30em] left-1/2 h-[5em] w-[130em] -translate-x-1/2 rounded-full bg-white/70"
            />

            {/* Specular sheen across the glass */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[76em]"
              style={{
                background: 'linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.1) 100%)',
                boxShadow: 'inset 0 1em 3em -1em rgba(255, 255, 255, 0.6)',
              }}
            />
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
