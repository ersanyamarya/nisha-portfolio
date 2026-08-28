import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../../components';
import { Bullet, CaseStudyShell, ChallengeApproachOutcome, Eyebrow, FooterNav, PillTag, SectionHeading } from '../../components/caseStudy';
import { CareerTimeline, DIAGRAM_FONT_LINK } from '../../components/caseStudy/diagrams';
import FinalDesign from '../../images/case-studies/sanyam-portfolio/sanyam_final-design.jpg';
import Hero from '../../images/case-studies/sanyam-portfolio/sanyam_overview.jpg';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'positioning', label: 'Leading with identity' },
  { id: 'final-design', label: 'Final design' },
  { id: 'impact', label: 'Impact' },
];

const SanyamPortfolioCaseStudy: React.FC<PageProps> = () => {
  return (
    <CaseStudyShell sections={SECTIONS}>
      <section id="overview">
        <Eyebrow>Sanyam Arya · Personal branding · Portfolio website</Eyebrow>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-[-0.02em] md:text-5xl">
          A portfolio that still read &ldquo;developer&rdquo; after the job had already changed
        </h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Sanyam Arya is an IoT Cloud Architect in Berlin who spent a decade building industrial and B2B software, and has spent the last stretch restructuring
          how his teams build with AI-assisted tooling. I redesigned his personal site around that shift: from a flat portfolio to one that leads with the
          architect and AI-native practitioner he is today, and shows the arc that got him there.
        </p>
        <div className="overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={Hero}
            alt="Hero section of the redesigned sanyamarya.com, leading with Sanyam's current positioning"
            className="block h-auto w-full"
          />
        </div>
      </section>

      <section>
        <ChallengeApproachOutcome
          challenge="A decade of industrial IoT and engineering-leadership experience was easy to miss in a flat, undifferentiated portfolio layout that read the same whether you'd built a smart-home chatbot or led a platform's cloud architecture."
          approach="Restructure the information architecture around identity: open with the role he holds today, group tools and skills by domain instead of one long tag list, and put the career arc itself on display instead of a plain reverse-chronological résumé dump."
          outcome="A site that opens with his current AI-native / IoT Cloud Architect identity, backed by a skills taxonomy and a visible career progression, rather than a list of past job titles competing for attention equally."
        />
        <div className="mt-10">
          <div className="mb-4 text-xs font-bold tracking-wide text-primary">Skills applied</div>
          <div className="flex flex-wrap gap-2.5">
            {['Personal-brand strategy', 'Information architecture', 'Content structuring', 'Visual design'].map(s => (
              <PillTag key={s}>{s}</PillTag>
            ))}
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="rounded-3xl bg-default-100 px-6 py-12 md:px-10">
        <Eyebrow>The problem</Eyebrow>
        <p className="mb-4 text-2xl leading-snug font-semibold">A portfolio's job is to tell a visitor who you are before they read a single project.</p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Sanyam's career had moved: from individual-contributor developer roles, into leading engineering teams, into a current role architecting IoT cloud
          platforms and wiring AI-assisted development into how his team ships. A personal site built for an earlier chapter doesn't automatically catch up with
          that — it needed a deliberate pass to make sure the first thing a visitor reads is the architect and AI-native practitioner he is now, not a résumé
          that treats every past title as equally current.
        </p>
      </section>

      <section id="approach">
        <Eyebrow>Approach</Eyebrow>
        <SectionHeading>Group by domain, not by chronology</SectionHeading>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          The site's technical range is genuinely broad — IoT protocols, cloud infrastructure, AI tooling, full-stack web work. Left as one flat list, breadth
          reads as unfocus. The fix was a skills taxonomy grouped by what each cluster is actually for, so a recruiter or collaborator scanning the page gets a
          shape, not a word cloud.
        </p>
        <div className="flex flex-col gap-4">
          <Bullet>
            <strong>AI-assisted engineering practice</strong> — Copilot/Claude workflows, agentic tooling, kept as its own top-line category rather than buried
            alongside generic languages, since it's the practice he's currently repositioning around.
          </Bullet>
          <Bullet>
            <strong>Cloud & data, DevOps & architecture, IoT & APIs</strong> — the deep infrastructure experience, grouped so someone evaluating him for an
            architecture role can find it in seconds.
          </Bullet>
          <Bullet>
            <strong>Languages & web stack</strong> — kept, but demoted below the domain groupings that actually differentiate him at this career stage.
          </Bullet>
        </div>
      </section>

      <section id="positioning">
        <Eyebrow>Leading with identity</Eyebrow>
        <SectionHeading>Why the arc matters, not just the current title</SectionHeading>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          A title alone ("IoT Cloud Architect") doesn't carry much weight without the path behind it. The redesign treats the career progression itself as
          content worth surfacing clearly, ending on the identity the rest of the page needs to justify.
        </p>
        <CareerTimeline />
      </section>

      <section id="final-design">
        <Eyebrow>Final design</Eyebrow>
        <SectionHeading>The site, live</SectionHeading>
        <img
          src={FinalDesign}
          alt="Full page view of the redesigned sanyamarya.com"
          className="block h-auto w-full rounded-3xl ring-1 ring-default-200"
        />
        <p className="mt-4 text-base leading-relaxed text-default-500">
          Live at{' '}
          <a
            href="https://www.sanyamarya.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline">
            sanyamarya.com
          </a>
          .
        </p>
      </section>

      <section
        id="impact"
        className="rounded-3xl bg-default-100 px-6 py-12 md:px-10">
        <Eyebrow>Impact</Eyebrow>
        <p className="text-lg leading-relaxed text-muted-foreground">
          The site now opens with the role Sanyam actually holds today, backed by a skills taxonomy that separates his AI-native practice and architecture
          leadership from a generic tools list, and a career arc that gives the current title context instead of asking a visitor to take it on faith.
        </p>
      </section>

      <FooterNav
        nextLabel="Flexera cloud cost anomaly detection"
        nextTo="/case-studies/flexera"
      />
    </CaseStudyShell>
  );
};

export default SanyamPortfolioCaseStudy;

export const Head: HeadFC = () => (
  <>
    <link
      rel="stylesheet"
      href={DIAGRAM_FONT_LINK}
    />
    <SEO
      title="Sanyam Arya portfolio redesign"
      description="Personal-brand repositioning and information architecture for Sanyam Arya's IoT Cloud Architect portfolio."
      pathname="/case-studies/sanyam-portfolio"
      keyWords={['personal branding', 'information architecture', 'portfolio design', 'content strategy']}
    />
  </>
);
