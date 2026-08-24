import React from 'react';

import { Link } from 'gatsby';

import { Tone, TONE_GRADIENT_FROM, TONE_SOLID, TONE_TEXT } from '../../components/caseStudy';
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
    description: 'Rebuilding AI-based cloud cost anomaly detection that practitioners actually trust',
    tags: ['Discovery research', 'AI/ML UX', 'Enterprise SaaS'],
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
      className="flex w-full flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-4 text-sm font-semibold tracking-wide text-primary">SELECTED WORK</div>
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">Case studies.</h2>
        </div>
        <p className="max-w-sm text-default-600">Three problems worth brewing over. Role, domain and outcome, tasted before you read the full pour.</p>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map(project => (
          <Link
            key={project.link}
            to={project.link}
            className="group block overflow-hidden rounded-2xl border border-default-200 bg-background transition-all hover:-translate-y-1">
            <div className="relative flex h-60 items-center justify-center overflow-hidden bg-default-100">
              <img
                src={project.graphic}
                alt={project.name}
                className="h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 flex items-end justify-start bg-gradient-to-t to-transparent to-55% p-5 opacity-0 transition-opacity group-hover:opacity-100 ${TONE_GRADIENT_FROM[project.tone]}`}>
                <span className="text-white text-sm font-bold">View case study →</span>
              </div>
            </div>

            <div className="p-7">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${TONE_SOLID[project.tone]}`}>{project.domain}</span>
                <span className="rounded-full bg-default-100 px-3 py-1.5 text-xs font-bold tracking-wide text-default-600">{project.role}</span>
              </div>
              <h3 className="mb-3 text-xl leading-snug font-extrabold tracking-[-0.01em]">{project.description}</h3>
              <div className="mb-4 text-sm font-semibold text-default-500">{project.name}</div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-default-200 px-3 py-1.5 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-default-200 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xl font-extrabold ${TONE_TEXT[project.tone]}`}>{project.statValue}</span>
                  <span className="text-xs font-medium text-default-500">{project.statLabel}</span>
                </div>
                <span className={`text-sm font-semibold ${TONE_TEXT[project.tone]}`}>View case study →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
