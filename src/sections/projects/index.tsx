import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import { Reveal, TiltCard } from '../../components';
import { TONE_SOLID, TONE_TEXT } from '../../components/caseStudy';
import { caseStudies } from '../../data/caseStudies';

const projects = Object.values(caseStudies);

const numberOfCaseStudies = projects.length;
const isOddNumberOfCaseStudies = numberOfCaseStudies % 2 !== 0;

const CARD_IMAGE_CLASS = 'h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]';

/** StaticImage needs a literal src per call site, so each case study gets its own branch. */
function CaseStudyImage({ link }: { link: string }) {
  switch (link) {
    case '/case-studies/flexera':
      return (
        <StaticImage
          src="../../images/case-studies/flexera/flexera_overview.png"
          alt=""
          layout="fullWidth"
          aspectRatio={16 / 10}
          loading="lazy"
          objectFit="cover"
          className={CARD_IMAGE_CLASS}
        />
      );
    case '/case-studies/spektrum':
      return (
        <StaticImage
          src="../../images/case-studies/spektrum/spektrum_card.jpg"
          alt=""
          layout="fullWidth"
          aspectRatio={16 / 10}
          loading="lazy"
          objectFit="cover"
          className={CARD_IMAGE_CLASS}
        />
      );
    case '/case-studies/visionarai':
      return (
        <StaticImage
          src="../../images/case-studies/visionarai/overview.png"
          alt=""
          layout="fullWidth"
          aspectRatio={16 / 10}
          loading="lazy"
          objectFit="cover"
          className={CARD_IMAGE_CLASS}
        />
      );
    default:
      return null;
  }
}

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="flex w-full flex-col gap-12">
      <Reveal>
        <div className="mb-4 text-xs font-medium tracking-widest text-accent-foreground uppercase">Selective brews</div>
        <h2 className="mb-4 font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">Case studies.</h2>
        <p className="text-muted-foreground">Not everything I&rsquo;ve shipped. Just the ones with a problem worth explaining.</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {projects.map((project, i) => (
          <Reveal
            key={project.link}
            delay={(i % 2) * 0.1}>
            <Link
              to={project.link}
              className="group block h-full">
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl glass-panel">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CaseStudyImage link={project.link} />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${TONE_SOLID[project.tone]}`}>
                    {project.name}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="mb-2 text-xs font-medium tracking-widest text-muted-foreground">
                    {project.domain} · {project.platformType} · {project.caseStudyType}
                  </div>
                  {/* -700/-300, not bare `text-primary` (see logo.tsx/hero for why):
                      this is hover-state foreground text, and the bare token alone
                      fails AA on the light page background (2.12:1, needs 3:1). */}
                  <h3 className="mb-4 font-serif text-2xl leading-snug font-medium transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300">
                    {project.title}
                  </h3>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-serif text-2xl font-medium ${TONE_TEXT[project.tone]}`}>{project.statValue}</span>
                      <span className="text-xs text-muted-foreground">{project.statLabel}</span>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <span
                        aria-hidden="true"
                        className="-rotate-45 text-lg">
                        →
                      </span>
                      <span className="sr-only">View case study</span>
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </Reveal>
        ))}
        {isOddNumberOfCaseStudies && (
          <Reveal delay={0.1}>
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border p-10 text-center">
              <span
                aria-hidden="true"
                className="relative mb-6 flex size-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full border-4 border-border" />
                <span className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent motion-reduce:animate-none" />
                <span className="text-xl">☕</span>
              </span>
              <h3 className="mb-2 font-serif text-2xl font-medium">Still roasting…</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                One more is being written up. A messy workflow, taken apart and put back together. It lands here once it&rsquo;s honest about what went wrong.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
