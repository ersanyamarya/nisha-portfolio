import { Tone } from '../components/caseStudy';

export interface CaseStudyMeta {
  link: string;
  name: string;
  /** Terse domain tag for the homepage card's "domain · platform · type" line. */
  domain: string;
  /** Richer domain phrase for the case study's own hero eyebrow ("name · domain · platform"). */
  heroDomain: string;
  platformType: string;
  caseStudyType: string;
  /** Shared headline: the case study's own <h1> and the homepage card's title. */
  title: string;
  tags: readonly string[];
  statValue: string;
  statLabel: string;
  tone: Tone;
}

/** Single source of truth for each case study's metadata, shared between its own page and its homepage card. */
export const caseStudies: Record<'flexera' | 'spektrum' | 'visionarai', CaseStudyMeta> = {
  flexera: {
    link: '/case-studies/flexera',
    name: 'Flexera',
    domain: 'FinOps',
    heroDomain: 'FinOps / cloud cost management',
    platformType: 'B2B SaaS',
    caseStudyType: 'UX Research & Design',
    title: 'Flexera already had a way to catch cloud cost spikes. Almost nobody used it',
    tags: ['Discovery research', 'Stakeholder interviews', 'Product analytics', 'Prototyping', 'AI/ML UX'],
    statValue: '~5/6',
    statLabel: 'customers identified the top cost contributor',
    tone: 'primary',
  },
  spektrum: {
    link: '/case-studies/spektrum',
    name: 'Spektrum Akademie',
    domain: 'EdTech',
    heroDomain: 'EdTech',
    platformType: 'SaaS',
    caseStudyType: 'UX Research & Design',
    title: 'Administrators had no way to track scheduling progress in real time',
    tags: ['Discovery research', 'User flows', 'Information architecture', 'End-to-end design', 'Design system'],
    statValue: '90%',
    statLabel: 'less manual tracking',
    tone: 'success',
  },
  visionarai: {
    link: '/case-studies/visionarai',
    name: 'Visionar.ai',
    domain: 'AI consultancy',
    heroDomain: 'AI strategy consultancy',
    platformType: 'Brand & web UI',
    caseStudyType: 'Brand & Design System',
    title: 'Designing the UI system behind Visionar.ai',
    tags: ['Web UI design', 'Brand identity', 'AI-augmented product design', 'Design systems', 'Motion design'],
    statValue: '4',
    statLabel: 'color restrained brand palette',
    tone: 'secondary',
  },
} as const;
