import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../../components';
import {
  Bullet,
  CaseStudyShell,
  ChallengeApproachOutcome,
  DarkStat,
  Eyebrow,
  FeedbackCallout,
  FooterNav,
  PillTag,
  ProsCons,
  SectionHeading,
  StatChip,
  ZoomableImage,
} from '../../components/caseStudy';
import Dashboard from '../../images/case-studies/spektrum/spektrum_iterations_3.jpg';
import Mindmap from '../../images/case-studies/spektrum/spektrum_strategy_1.jpg';
import Periodview from '../../images/case-studies/spektrum/spektrum_iterations_4.png';
import SchedulerFinal from '../../images/case-studies/spektrum/spektrum_iterations_2.jpg';
import SchedulerHero from '../../images/case-studies/spektrum/spektrum_overview.jpg';
import UserJourneyResources from '../../images/case-studies/spektrum/spektrum_research_1.jpg';
import UserJourney from '../../images/case-studies/spektrum/spektrum_research_2.jpg';
import Userflow from '../../images/case-studies/spektrum/spektrum_strategy_2.jpg';
import WireframeDropdown from '../../images/case-studies/spektrum/spektrum_iterations_1.png';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'research', label: 'Gathering evidence' },
  { id: 'strategy', label: 'Strategy & idea exploration' },
  { id: 'iterations', label: 'Ideation & design iteration' },
  { id: 'impact', label: 'Impact' },
];

const SpektrumCaseStudy: React.FC<PageProps> = () => {
  return (
    <CaseStudyShell sections={SECTIONS}>
      <section id="overview">
        <Eyebrow>Spektrum Akademie · EdTech · SaaS</Eyebrow>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-[-0.02em] md:text-5xl">
          Administrators had no way to track scheduling progress in real time
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Spektrum Akademie is a vocational education institution in Berlin, training students across Occupational Therapy, Physiotherapy, Speech Therapy and
          Early Childhood Education. I designed the real-time scheduling and resource-tracking system its administrators now plan every semester around.
        </p>
        <div className="mb-10 flex flex-wrap gap-4">
          <StatChip
            eyebrow="Manual tracking"
            value="90% less"
            label="manual tracking effort, replacing spreadsheets administrators used to maintain by hand"
          />
          <StatChip
            eyebrow="Timetable creation"
            value="75% faster"
            label="timetable creation, letting administrators plan a full semester in a fraction of the time"
          />
        </div>
        <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl">
          <ZoomableImage
            src={SchedulerHero}
            alt="Zeitplaner scheduler view showing a weekly class timetable with teacher and room availability"
            className="block h-auto w-full"
          />
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-wide text-primary">Skills applied</div>
          <div className="flex flex-wrap gap-2.5">
            {['Discovery research', 'User flows', 'Information architecture', 'End-to-end design', 'Design system'].map(s => (
              <PillTag key={s}>{s}</PillTag>
            ))}
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="rounded-3xl bg-default-100 px-6 py-12 md:px-10">
        <Eyebrow>The problem</Eyebrow>
        <p className="mb-4 text-2xl leading-snug font-semibold">
          Spektrum Akademie's current system couldn't track real-time progress of key academic resources: class schedules, teacher hours, subject completion and
          internship requirements.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          This forced administrators and educators to estimate progress retrospectively, leaving gaps in planning and resource allocation.
        </p>
      </section>

      <section>
        <div className="rounded-3xl border border-default-200 px-6 py-10 md:px-10 md:py-12">
          <ChallengeApproachOutcome
            approach="Interviewed administrators to map their day-to-day process, explored the strategy in mind maps and user flows with the product and dev teams, then benchmarked wireframes before designing the full scheduler."
            outcome="A real-time tracking and scheduling system integrated with Spektrum Akademie's legacy platform, cutting manual tracking effort by 90% and speeding up timetable creation by 75%."
          />
        </div>
      </section>

      <section id="research">
        <Eyebrow>Gathering evidence</Eyebrow>
        <SectionHeading>Understanding the problem</SectionHeading>
        <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
          We conducted in-depth interviews with administrators to dive into their day-to-day processes and uncover the limitations of the current system.
        </p>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          To bring these insights to life, we crafted short stories depicting the real struggles administrators faced, surfacing the key user journeys behind
          the eventual design.
        </p>
        <div className="flex flex-col gap-5">
          <ZoomableImage
            src={UserJourneyResources}
            alt="User journey tracking academic resources across the current manual process"
            className="block h-auto w-full rounded-2xl ring-1 ring-default-200"
          />
          <ZoomableImage
            src={UserJourney}
            alt="User journey mapping the administrator's day-to-day scheduling struggles"
            className="block h-auto w-full rounded-2xl ring-1 ring-default-200"
          />
        </div>
      </section>

      <section id="strategy">
        <Eyebrow>Strategy & idea exploration</Eyebrow>
        <SectionHeading>Turning insights into a strategy</SectionHeading>
        <div className="mb-10 flex flex-col gap-3.5">
          <Bullet>
            <strong>Mapping hours:</strong> aligning target and completed hours with resources to accurately track progress and enable informed decisions.
          </Bullet>
          <Bullet>
            <strong>Resource categorization:</strong> introducing categories and tags to streamline the scheduling process.
          </Bullet>
          <Bullet>
            <strong>Consistent naming conventions:</strong> ensuring terminology stayed consistent to enable smooth data import/export with the legacy system.
          </Bullet>
        </div>
        <ZoomableImage
          src={Mindmap}
          alt="Mind map visualizing the relationships between academic resources"
          className="mb-14 block h-auto w-full rounded-2xl ring-1 ring-default-200"
        />

        <h3 className="mb-3.5 text-xl font-bold">User flow for idea implementation</h3>
        <p className="mb-7 text-lg leading-relaxed text-muted-foreground">
          To ensure the solution aligned with the legacy system, technical constraints and enhanced usability, we collaborated closely with the product manager,
          development team and stakeholders, thoroughly assessing the proposed approach and its impact.
        </p>
        <ZoomableImage
          src={Userflow}
          alt="User flow diagram for the scheduling idea implementation"
          className="mb-14 block h-auto w-full rounded-2xl ring-1 ring-default-200"
        />

        <h3 className="mb-6 text-xl font-bold">Key insights</h3>
        <ProsCons
          pros={[
            '<strong>Flexible data manipulation:</strong> the ability to adjust data for new functionality while maintaining consistency with the legacy system.',
            '<strong>Seamless legacy integration:</strong> streamlined import/export keeps systems synchronized, reducing manual work and errors.',
          ]}
          cons={[
            '<strong>Data overload:</strong> handling large datasets can be overwhelming, requiring extra development time and effort.',
            '<strong>Terminology consistency:</strong> inconsistent formatting or terminology can disrupt integration and cause errors.',
          ]}
        />
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed font-semibold italic">
          &ldquo;We benchmarked this initial solution to ensure its viability, and it provided the foundation to proceed with designing the overall user
          journey.&rdquo;
        </p>
      </section>

      <section
        id="iterations"
        className="rounded-3xl bg-default-100 px-6 py-12 md:px-10">
        <Eyebrow>Ideation & design iteration</Eyebrow>
        <SectionHeading>From wireframe to working scheduler, in three rounds</SectionHeading>

        <div className="mb-14">
          <div className="mb-1.5 text-xs font-bold tracking-wide text-primary">Iteration 1</div>
          <h3 className="mb-3.5 text-xl font-bold">Putting ideas through wireframes</h3>
          <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
            The product manager facilitated review discussions with the client while I observed to ensure alignment with stakeholder expectations. We gathered
            and annotated feedback directly on the wireframes, letting us iterate before moving forward and build interchangeable steps for class, subject,
            teacher and room selection.
          </p>
          <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-default-200">
            <ZoomableImage
              src={WireframeDropdown}
              alt="Early wireframe of the interchangeable class, subject, teacher and room selection steps"
              className="block h-auto w-full scale-110"
            />
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-1.5 text-xs font-bold tracking-wide text-primary">Iteration 2</div>
          <h3 className="mb-3.5 text-xl font-bold">Moderated prototype testing, built on iteration 1 feedback</h3>

          <h4 className="mb-2 text-base font-bold">Scheduler</h4>
          <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
            We tested a calendar view for scheduling classes, annotated below with the dropdown selectors for class, subject, teacher and room.
          </p>
          <ZoomableImage
            src={SchedulerFinal}
            alt="Second iteration: calendar view for scheduling with class, subject, teacher and room selectors"
            className="my-3 block h-auto w-full rounded-2xl ring-1 ring-default-200"
          />
          <FeedbackCallout
            tone="secondary"
            label="NEGATIVE FEEDBACK">
            <div className="flex flex-col gap-3">
              <p className="border-l-2 border-secondary-300 pl-3.5 text-base leading-relaxed text-muted-foreground italic">
                &ldquo;It's very difficult to view subjects scheduled by period.&rdquo;
              </p>
              <p className="border-l-2 border-secondary-300 pl-3.5 text-base leading-relaxed text-muted-foreground italic">
                &ldquo;Switching between classes to schedule subjects is cumbersome. Can I see all the semester's classes together?&rdquo;
              </p>
            </div>
          </FeedbackCallout>

          <h4 className="mt-10 mb-2 text-base font-bold">Dashboard</h4>
          <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
            We tested a class dashboard summarizing scheduled hours and subject progress, with a drill-down panel showing each teacher's contribution and hours
            taught per subject.
          </p>
          <ZoomableImage
            src={Dashboard}
            alt="Class dashboard showing scheduled hours, subject progress and a teaching-details panel with hours taught per teacher"
            className="my-3 block h-auto w-full rounded-2xl ring-1 ring-default-200"
          />
          <FeedbackCallout
            tone="success"
            label="POSITIVE FEEDBACK">
            <p className="text-base leading-relaxed text-muted-foreground">
              Users praised the analytics, the granularity of the data, and how easily they could see hours taught by teachers.
            </p>
          </FeedbackCallout>
        </div>

        <div>
          <div className="mb-1.5 text-xs font-bold tracking-wide text-primary">Iteration 3</div>
          <h3 className="mb-3.5 text-xl font-bold">Moderated prototype testing: the improved period view</h3>
          <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
            Based on that feedback, we redesigned around a period view that lists every class per row across the week, with a &ldquo;Schedule Class&rdquo; panel
            for assigning subject, teacher, room and duration, closer to the familiar Google Calendar layout and built to support recurring subject scheduling.
          </p>
          <ZoomableImage
            src={Periodview}
            alt="Third iteration: period view scheduler with a Schedule Class panel for assigning subject, teacher, room and duration"
            className="my-3 block h-auto w-full rounded-2xl ring-1 ring-default-200"
          />
          <FeedbackCallout
            tone="success"
            label="POSITIVE FEEDBACK">
            <p className="text-base leading-relaxed text-muted-foreground">
              It made scanning the scheduled periods much more intuitive and significantly simplified the process of scheduling classes and internships.
            </p>
          </FeedbackCallout>
        </div>
      </section>

      <section
        id="impact"
        className="rounded-3xl bg-default-100 px-6 py-12 md:px-10">
        <Eyebrow>Impact</Eyebrow>
        <p className="mb-3 text-xl leading-snug font-semibold">
          Designed a real-time tracking and scheduling system that integrates with Spektrum Akademie's legacy platform.
        </p>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          Administrators can now monitor class schedules, teacher hours, internships and subject progress, while the advanced timetable scheduler enables
          efficient planning for upcoming semesters, reducing manual tracking and improving resource management.
        </p>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DarkStat
            value="90%"
            label="Reduction in manual tracking efforts"
            detail="Automated tracking replaced spreadsheets, saving significant administrative time."
          />
          <DarkStat
            value="75%"
            label="Faster timetable creation"
            detail="The intuitive interface speeds up timetable creation, allowing for more efficient planning."
          />
        </div>

        <p className="mb-8 text-sm leading-relaxed text-default-500">
          We calculated this impact by recording baseline metrics during discovery interviews and comparing them with feedback and performance metrics gathered
          in follow-up interviews after the product entered daily use.
        </p>

        <div className="flex flex-col gap-3">
          <p className="border-l-2 border-primary pl-4 text-lg leading-relaxed italic">
            &ldquo;Diese Software hat unsere Stundenplanung revolutioniert. Wir sparen nicht nur Zeit, sondern haben auch einen viel besseren Überblick über
            unsere Ressourcen.&rdquo;
          </p>
          <p className="text-sm font-semibold text-default-500">— Spektrum Akademie</p>
        </div>
      </section>

      <FooterNav
        nextLabel="Sanyam Arya portfolio redesign"
        nextTo="/case-studies/sanyam-portfolio"
      />
    </CaseStudyShell>
  );
};

export default SpektrumCaseStudy;

export const Head: HeadFC = () => (
  <SEO
    title="Spektrum Akademie scheduler"
    description="UX research and design for Spektrum Akademie's real-time scheduling and academic resource tracking system."
    pathname="/case-studies/spektrum"
    keyWords={['Spektrum Akademie', 'EdTech', 'scheduling', 'information architecture', 'UX research']}
  />
);
