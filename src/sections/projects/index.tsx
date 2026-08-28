import { Link } from 'gatsby';
import React from 'react';

import { Reveal, TiltCard } from '../../components';
import { Tone, TONE_SOLID, TONE_TEXT } from '../../components/caseStudy';
import FlexeraGraphic from '../../images/case-studies/flexera/flexera-anomaly-graph-branded.png';
import SanyamGraphic from '../../images/case-studies/sanyam-portfolio/sanyam-portfolio-hero.jpg';
import SpektrumGraphic from '../../images/case-studies/spektrum/spektrum-scheduler-hero.jpg';

const caseStudies: {
  name: string;
  link: string;
  domain: string;
  role: string;
  description: string;
  tags: string[];
  statValue: string;
  statLabel: string;
  tone: Tone;
  graphic: string;
}[] = [
  {
    name: 'Flexera',
    link: '/case-studies/flexera',
    domain: 'FinOps',
    role: 'UX Research & Design',
    description: 'Flexera already had a way to catch cloud cost spikes. Almost nobody used it',
    tags: ['Discovery research', 'Stakeholder interviews', 'Product analytics', 'Prototyping', 'AI/ML UX'],
    statValue: '~5/6',
    statLabel: 'customers identified the top cost contributor',
    tone: 'primary',
    graphic: FlexeraGraphic,
  },
  {
    name: 'Spektrum Akademie',
    link: '/case-studies/spektrum',
    domain: 'EdTech',
    role: 'UX Research & Design',
    description: 'Inability to track real-time progress of academic resources, leading to planning inefficiencies',
    tags: ['Web App', 'EdTech', 'Information Architecture'],
    statValue: '90%',
    statLabel: 'less manual tracking',
    tone: 'success',
    graphic: SpektrumGraphic,
  },
  {
    name: 'Sanyam Arya',
    link: '/case-studies/sanyam-portfolio',
    domain: 'Personal Brand',
    role: 'IA & Content Strategy',
    description: 'A portfolio that still read "developer" after the job had already changed',
    tags: ['Personal Site', 'Information Architecture', 'Brand Positioning'],
    statValue: 'Live',
    statLabel: 'now leads with his current title, not his oldest one',
    tone: 'secondary',
    graphic: SanyamGraphic,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="flex w-full flex-col gap-12">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-4 text-xs font-medium tracking-widest text-primary uppercase">Selective brews</div>
          <h2 className="font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">Case studies.</h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          A short menu, poured slowly. Complex FinOps platforms, inclusive EdTech, and the research behind each decision.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {caseStudies.map((project, i) => (
          <Reveal
            key={project.link}
            delay={(i % 2) * 0.1}>
            <Link
              to={project.link}
              className="group block h-full">
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl glass-panel">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.graphic}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${TONE_SOLID[project.tone]}`}>
                    {project.domain}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    {project.name} · {project.role}
                  </div>
                  <h3 className="mb-4 font-serif text-2xl leading-snug font-medium transition-colors group-hover:text-primary">{project.description}</h3>

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
              Another case study is brewing behind the scenes — a complex workflow, taken apart and put back together. Check back soon for the perfect pour.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
