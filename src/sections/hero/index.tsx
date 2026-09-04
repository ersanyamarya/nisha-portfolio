import { StaticImage } from 'gatsby-plugin-image';
import { PenToolIcon, PieChartIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { HatchBackground } from '../../components';

/** The two snippets that hover over the hero artwork. Only these drift — the portrait holds still. */
const SNIPPETS = [
  {
    icon: PieChartIcon,
    label: 'Research-led',
    value: 'Evidence first.',
    accent: 'bg-success/15 text-success-700 dark:text-success-300',
    position: 'top-8 -left-2 md:-left-8',
    animation: 'float 6s ease-in-out infinite',
  },
  {
    icon: PenToolIcon,
    label: 'UI craft',
    value: 'Specced, not guessed.',
    accent: 'bg-primary/15 text-accent-foreground',
    position: 'bottom-8 -right-2 md:-right-6',
    animation: 'float 7s ease-in-out infinite 2s',
  },
];

export default function HeroSection() {
  return (
    // Full-bleed: the crosshatch and the warm wash need the whole viewport to fade out
    // into. Clipped to the content column they ended on a hard vertical edge.
    <section
      id="top"
      className="relative left-1/2 w-[calc(100vw-var(--scrollbar-w))] -translate-x-1/2 overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <HatchBackground focalPoint={{ x: 0.72, y: 0.4 }} />

      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col items-center gap-14 px-4 md:flex-row md:gap-10 md:px-8 lg:gap-16">
        <div className="relative flex w-full flex-col items-start md:w-[58%] xl:w-[60%]">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold tracking-widest text-accent-foreground uppercase glass-panel">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            Open to UX/Product design role
          </div>

          {/* Sized so each clause holds one line at xl; `balance` keeps the narrower
              breakpoints from leaving a one-word orphan. */}
          <h1 className="mb-6 font-serif text-[2.75rem] leading-[1.06] font-medium tracking-[-0.015em] text-balance sm:text-5xl xl:text-[3.75rem]">
            Precision in the process.
            <br />
            {/* -700/-300, not bare `text-primary`: this is foreground text, and the
                global `--color-primary` recolor (see layout.css) is tuned for text
                sitting ON a solid primary fill, not primary text on the page bg —
                the bare token alone fails AA here (2.12:1, needs 3:1 at this size). */}
            <span className="text-primary-700 italic dark:text-primary-300">Delight</span> in the details.
          </h1>

          <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
            I design research-led product UX. Startups, corporates, consultancies, freelance. Cloud cost tooling one year, course scheduling the next. The
            domain keeps changing and the habit doesn&rsquo;t. Weigh every input, pull it at nine bars, pour out the shot that tastes wrong.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg">
              <a href="#work">View selected work</a>
            </Button>
            <Button
              asChild
              variant="link"
              size="lg">
              <a
                href="#about"
                className="group gap-2 px-0">
                Read my story
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center md:w-[42%] xl:w-[40%]">
          {/* Warm backdrop wash — keeps the borderless artwork sitting in light, not floating on nothing. */}
          <div
            aria-hidden="true"
            className="absolute size-[min(34rem,110%)] animate-[ring-pulse_8s_ease-in-out_infinite] rounded-full opacity-70 blur-3xl motion-reduce:animate-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, var(--color-primary-200) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 w-full max-w-md">
            <StaticImage
              placeholder="blurred"
              layout="constrained"
              width={560}
              loading="eager"
              src="../../images/hero-img.png"
              alt="Nisha Kumari, product designer and home barista, Berlin"
              className="drop-shadow-[0_24px_48px_rgba(41,37,36,0.18)]"
              objectFit="contain"
            />
          </div>

          {SNIPPETS.map(({ icon: Icon, label, value, accent, position, animation }) => (
            <div
              key={label}
              className={`absolute z-20 flex items-center gap-3 rounded-2xl p-3.5 glass-panel motion-reduce:animate-none ${position}`}
              style={{ animation }}>
              <span className={`flex size-9 items-center justify-center rounded-full ${accent}`}>
                <Icon
                  strokeWidth={1.5}
                  size={18}
                />
              </span>
              <span>
                <span className="block text-[10px] font-semibold tracking-widest uppercase">{label}</span>
                <span className="block font-serif text-sm text-muted-foreground italic">{value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
