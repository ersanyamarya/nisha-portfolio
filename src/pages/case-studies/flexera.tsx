import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../../components';
import {
  Bullet,
  CaseStudyShell,
  ChallengeApproachOutcome,
  DarkStat,
  Eyebrow,
  FooterNav,
  FunnelBreakdown,
  InsightCallout,
  PillTag,
  QuoteBlock,
  SectionHeading,
  StatChip,
  ZoomableImage,
} from '../../components/caseStudy';
import { DIAGRAM_FONT_LINK, JobTraceFlow, LifecycleFlow, QuarterTimeline } from '../../components/caseStudy/diagrams';
import AnomalyGraph from '../../images/case-studies/flexera/flexera_overview.png';
import CurrentExperienceAudit from '../../images/case-studies/flexera/flexera_research.png';
import DiscoveryDiscussions from '../../images/case-studies/flexera/flexera_jobs-to-be-done.png';
import MvpDesignAnnotated from '../../images/case-studies/flexera/flexera_final-design.png';
import UserJourney from '../../images/case-studies/flexera/flexera_journey.png';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'timeline', label: 'Project timeline' },
  { id: 'scope', label: 'Project scope' },
  { id: 'research', label: 'Research & findings' },
  { id: 'jobs-to-be-done', label: 'Jobs to be done' },
  { id: 'journey', label: 'User journey' },
  { id: 'final-design', label: 'MVP design' },
  { id: 'next-steps', label: 'Next steps' },
];

const FlexeraCaseStudy: React.FC<PageProps> = () => {
  return (
    <CaseStudyShell sections={SECTIONS}>
      <section id="overview">
        <Eyebrow>Flexera · FinOps / cloud cost management · B2B SaaS</Eyebrow>
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-[-0.02em] md:text-5xl">
          Flexera already had a way to catch cloud cost spikes. Almost nobody used it
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Flexera's cloud cost optimization platform helps enterprises manage spend across AWS, Azure and GCP. I led discovery, research synthesis and design
          for a rebuilt AI-based anomaly detection experience, working across Product, Engineering and the Data Science team over a single quarter, from usage
          data to a shipped MVP.
        </p>
        <p className="mb-8 border-l-2 border-primary pl-4 text-lg leading-relaxed italic">
          &ldquo;In plain terms: an anomaly is just a point where a number breaks its usual pattern, like a spike in a graph. Here, the number is cloud spend,
          and each spike is money someone didn't expect to pay. Catching it fast is the difference between a quick fix and a budget surprise a month
          later.&rdquo;
        </p>
        <div className="mb-10 flex flex-wrap gap-4">
          <StatChip
            eyebrow="Design target"
            value="20–30% faster"
            label="anomaly investigation, the hypothesis behind the new experience"
          />
          <StatChip
            eyebrow="Early signal"
            value="~5/6 customers"
            label="correctly identified the top cost contributor"
          />
        </div>
        <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl">
          <ZoomableImage
            src={AnomalyGraph}
            alt="Line graph of daily cloud spend with two sharp spikes marked as anomalous"
            className="block h-auto w-full"
          />
        </div>
        <div>
          <div className="mb-4 text-[11px] font-extrabold tracking-widest text-muted-foreground">Skills applied</div>
          <div className="flex flex-wrap gap-2.5">
            {['Discovery research', 'Stakeholder interviews', 'Product analytics', 'Prototyping', 'AI/ML UX'].map(s => (
              <PillTag key={s}>{s}</PillTag>
            ))}
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="rounded-3xl bg-muted px-6 py-12 md:px-10">
        <Eyebrow>The problem</Eyebrow>
        <p className="mb-4 text-2xl leading-snug font-semibold">
          FinOps practitioners, engineering leads and finance stakeholders needed a reliable way to detect, understand and act on unexpected cloud cost spikes
          before they compounded into budget overruns.
        </p>
        <p className="mb-7 text-lg leading-relaxed text-muted-foreground">
          The existing experience required users to manually define dimensions and filters just to surface anomalies in the first place, and once something did
          get flagged, it came with no explanation, no way to filter further, and a disconnected workflow that redirected users away from their cost view.
          Customers didn't lack demand for anomaly detection. They lacked a trustworthy, explainable way to act on it.
        </p>
        <div className="flex flex-col gap-3">
          <p className="border-l-2 border-primary pl-4 text-lg leading-relaxed italic">
            &ldquo;It'll flag a spike, but it won't tell me why. Was it a pricing change, a new workload, someone forgetting to tear down an environment? I
            still have to go dig for that myself.&rdquo;
          </p>
          <p className="border-l-2 border-primary pl-4 text-lg leading-relaxed italic">
            &ldquo;Before I forward an anomaly to an engineering owner, I need to be able to explain why it fired. If I can't, they'll just close it out as
            noise and I've burned my credibility.&rdquo;
          </p>
          <p className="text-sm font-semibold text-muted-foreground">— Head of FinOps, Flexera enterprise customer</p>
        </div>
      </section>

      <section>
        <div className="rounded-3xl border border-border px-6 py-10 md:px-10 md:py-12">
          <ChallengeApproachOutcome
            approach="Led with research over assumptions: audited usage data, interviewed FinOps practitioners on how they actually chase cost spikes, and aligned Product, Engineering and Data Science on a shared anomaly lifecycle before any design work began."
            outcome="Shipped automatic AI-based anomaly detection with root cause analysis, giving practitioners a trustworthy “what changed and why” with no manual configuration."
          />
        </div>
      </section>

      <section id="timeline">
        <Eyebrow>Project timeline</Eyebrow>
        <SectionHeading>One quarter: discovery to ship</SectionHeading>
        <QuarterTimeline />
      </section>

      <section id="scope">
        <Eyebrow>Scope, objectives & constraints</Eyebrow>
        <SectionHeading>What discovery and design needed to accomplish</SectionHeading>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Before any design work began, we set clear objectives for what research needed to answer.
        </p>
        <h3 className="mb-4 text-xl font-bold">Key design & research objectives</h3>
        <div className="flex flex-col gap-4">
          <Bullet>
            Understand why the existing Cost Anomalies feature had <strong>~8% follow-through and near-zero adoption.</strong>
          </Bullet>
          <Bullet>
            Learn how <strong>different FinOps personas</strong>, and different customer organizations, actually use cost and anomaly data day to day.
          </Bullet>
          <Bullet>
            Define an <strong>anomaly data model and lifecycle</strong> that design, product, and the algorithm team could all build against.
          </Bullet>
          <Bullet>
            Decide, <strong>with evidence rather than opinion,</strong> what belonged in the Weeks 9–12 MVP versus a later iteration.
          </Bullet>
        </div>
      </section>

      <section id="research">
        <Eyebrow>Research & findings</Eyebrow>
        <SectionHeading>The evidence base the MVP was built on</SectionHeading>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          Before talking to a single user, usage data already made the case that something structural was broken, not just a rough edge. That reframed the
          research question from &ldquo;how do we improve anomaly detection&rdquo; to &ldquo;why are practitioners choosing not to use it, and what would make
          them trust it.&rdquo;
        </p>

        <h3 className="mb-4 text-xl font-bold">1. What the usage data already told us</h3>
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DarkStat
            value="0.7%"
            label="Visitor adoption, 30 days"
            detail="37 of 5,155 eligible"
          />
          <DarkStat
            value="3.4%"
            label="Account adoption"
            detail="12 of 355 accounts"
          />
          <DarkStat
            value="2m 19s"
            label="Average time on page"
            detail="Down 36.3%"
          />
          <DarkStat
            value="56"
            label="Page views"
            detail="Down 40.4%"
          />
        </div>

        <FunnelBreakdown
          className="mb-5"
          eyebrow="30-DAY FUNNEL — TABULAR COST VIEW → COST ANOMALIES PAGE"
          from={{ label: 'Tabular view', value: '235', sub: 'unique visitors started' }}
          to={{ label: 'Cost anomalies page', value: '37', sub: 'unique visitors reached it' }}
          dropLabel="216 dropped, 92%"
          dropSub="avg. 4d 17h before moving on"
          notes={[
            <>
              <strong>19</strong> of those 37 arrived from the tabular view, the intended path
            </>,
            <>
              <strong>18</strong> arrived from the incidents page instead
            </>,
          ]}
        />

        <InsightCallout>
          Most of the <strong>235 people</strong> who opened the tabular cost view never continued into the anomalies view. Of the <strong>37</strong> who did,
          only 19 came through that intended path; the rest arrived from the incidents page instead.
        </InsightCallout>

        <h3 className="mt-12 mb-4 text-xl font-bold">2. Auditing the current experience</h3>
        <ZoomableImage
          src={CurrentExperienceAudit}
          alt="Annotated audit of the existing Tabular View and Cloud Cost Anomalies pages, marking manual filter setup, low prominence of the anomalies entry point, and unexplained anomaly charts"
          className="mb-6 block h-auto w-full rounded-2xl ring-1 ring-border"
        />
        <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
          A current-state gap analysis of the existing Cost Anomalies tool surfaced concrete, fixable reasons for the drop-off.
        </p>
        <div className="mb-5 flex flex-col gap-4">
          <Bullet>
            <strong>Minimal detection logic:</strong> anomalies were flagged using basic Bollinger Bands, with no explanation of why a point fell outside the
            band.
          </Bullet>
          <Bullet>
            <strong>No root cause analysis:</strong> nothing surfaced likely factors like resource utilization, pricing changes or billing errors.
          </Bullet>
          <Bullet>
            <strong>No deep filtering, suppression or annotation:</strong> no way to filter by resource type, cost impact or time period, mute recurring noise,
            or leave context for a teammate.
          </Bullet>
          <Bullet>
            <strong>Disconnected workflow:</strong> users were redirected out of their tabular cost view into a separate page just to see anomalies.
          </Bullet>
        </div>
        <InsightCallout>
          The tool detected anomalies fine. It never explained them, filtered them, or kept users in their existing workflow, which is where the drop-off came
          from.
        </InsightCallout>

        <h3 className="mt-12 mb-4 text-xl font-bold">3. What FinOps practitioners told us</h3>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          Stakeholder interviews kept circling back to the same moment: right after an anomaly fires, when someone has to figure out what actually happened.
          Practitioners weren't short on alerts. They were short on a trustworthy explanation and a next step they could hand off with confidence.
        </p>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteBlock
            quote="It'll flag a spike, but it won't tell me why. Was it a pricing change, a new workload, someone forgetting to tear down an environment? I still have to go dig for that myself."
            attribution="Head of FinOps, Flexera enterprise customer"
          />
          <QuoteBlock
            quote="Before I forward an anomaly to an engineering owner, I need to be able to explain why it fired. If I can't, they'll just close it out as noise and I've burned my credibility."
            attribution="Head of FinOps, Flexera enterprise customer"
          />
          <QuoteBlock
            quote="When something gets flagged, I want to know how confident the system is and what's driving that, not just an arrow pointing up with no context behind it."
            attribution="VP of Enterprise Architecture, Flexera enterprise customer"
          />
          <QuoteBlock
            quote="Once we confirm what caused an anomaly, that should route straight to whoever owns the resource, with the fix attached, not sit in a list for me to chase down manually."
            attribution="FinOps Analyst, Flexera enterprise customer"
          />
        </div>
        <InsightCallout>
          When the team scored friction points against UX impact and speed to fix,{' '}
          <strong>the absence of any root cause explanation ranked as the top priority.</strong> Practitioners could tolerate a noisy alert if they could
          explain it, but not an unexplained one. Missing alerting came next, with thin recommendations a step behind. Overwhelming graphs and broken in-page
          search moved to the backlog as lower-impact.
        </InsightCallout>

        <h3 className="mt-12 mb-4 text-xl font-bold">4. How usage actually varies by customer</h3>
        <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
          Follow-up conversations with the product and research team surfaced behavioral nuance that a single FinOps persona glosses over.
        </p>
        <div className="mb-5 flex flex-col gap-4">
          <Bullet>
            <strong>Different customers, different jobs:</strong> one customer tracked cost-of-goods-sold per client, filtering by customer then grouping by
            service and region; another used the platform purely for internal infrastructure. No single default view could serve both without flexible grouping
            and filtering.
          </Bullet>
          <Bullet>
            <strong>The tabular view as a pre-screening tool:</strong> some users check the percent-change table before ever setting up an alert, formalizing
            one only after spotting something concerning by eye.
          </Bullet>
          <Bullet>
            <strong>Tables over graphs:</strong> once an anomaly is found, people need to drill into the resource level to investigate, and several sessions
            surfaced a clear preference for tables over charts for that.
          </Bullet>
          <Bullet>
            <strong>Friction with scale:</strong> too many dimensions generated too many charts, burying real anomalies, and lazy-loaded content broke in-page
            search on large datasets.
          </Bullet>
        </div>
        <InsightCallout>
          Users brought the context themselves: scan the <strong>percent-change table</strong> to guess which dimension moved, then{' '}
          <strong>manually set up that exact combination of filters</strong> just to confirm it. The system never looked for the anomaly on its own.
        </InsightCallout>

        <h3 className="mt-12 mb-4 text-xl font-bold">5. Aligning Product, Engineering and Data Science on a shared lifecycle</h3>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          We mapped the full lifecycle of a cloud cost anomaly, assigned a RACI owner to every step, and used a crawl/walk/run maturity model to set a shared
          target instead of five different mental models of &ldquo;done.&rdquo;
        </p>
        <LifecycleFlow />
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>Detection:</strong> record created. <strong>Analysis:</strong> find the why / identify the root cause.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>Notification:</strong> stakeholders alerted. Email and in-app alerts are not implemented; instead, important alerts surface within the
            anomaly record itself.
          </p>
        </div>
      </section>

      <section id="jobs-to-be-done">
        <Eyebrow>Jobs to be done</Eyebrow>
        <SectionHeading>What FinOps advisors were actually hiring the anomalies page to do</SectionHeading>

        <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
          <em>
            FinOps practitioners are simply the people at a company whose job is watching the cloud bill, they're who gets asked &ldquo;why did our AWS spend
            jump&rdquo; and has to have an answer.
          </em>{' '}
          The research surfaced a pile of pain points, but pain points alone don't tell you what to build.{' '}
          <strong>Jobs to be Done reframes the question</strong>: instead of &ldquo;what's broken,&rdquo; it asks &ldquo;what is this person actually trying to
          accomplish when they open this page, and what would let them consider it done.&rdquo; That framing mattered here because the old tool wasn't failing
          at one task, it was failing to support the underlying reasons people came to it in the first place.
        </p>
        <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
          We didn't run a separate JTBD study. We derived the jobs from our existing research, combining behavioral and analytical data. We grouped repeated
          needs into jobs, then validated them against the highest-impact friction points.
        </p>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          The three jobs map onto the three moments anyone dealing with an unexpected cost spike goes through: <strong>catching it early</strong> (detect that
          something's off), <strong>judging it in context</strong> (investigate whether it's a real problem), and <strong>explaining it confidently</strong>{' '}
          (decide what to do next and hand it off). Working sessions with internal FinOps advisors and engineering surfaced these jobs directly, captured on the
          research board below.
        </p>
        <ZoomableImage
          src={DiscoveryDiscussions}
          alt="Discovery board showing anomaly table iterations, engineering discussion notes and sticky-note feedback from FinOps advisors"
          className="mb-12 block h-auto w-full rounded-2xl ring-1 ring-border"
        />

        <h3 className="mb-2 text-xl font-bold">How each job traces back to research</h3>
        <p className="mb-5 text-base leading-relaxed text-muted-foreground">
          Each job carries its own chain: a research finding exposed a pain point, the pain point implied a human need, and that need was restated as a job the
          MVP had to serve.
        </p>
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-accent-foreground">JOB 1: CATCH IT EARLY</div>
            <p className="mb-2.5 text-base leading-relaxed text-muted-foreground">
              When cloud spend moves across dozens of services and accounts, advisors wanted to know what's unusual without combing through raw cost dashboards,
              so they could catch a problem while it's still small, not find it in a monthly review after the money is gone.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Evidence: &ldquo;We don't need what we have right now. Without doing anything our users want to know what is unusual.&rdquo; — internal Flexera
              FinOps advisor.
            </p>
            <JobTraceFlow
              slug="flexera-job-1"
              title="Job 1 trace: catch it early"
              desc="From the finding that 92% of visitors dropped off before reaching the anomalies view, to the job of catching problems early, to the MVP's decision to detect on a daily/weekly grain, and what's next."
              steps={[
                { kind: 'input', lines: ['92% dropped off', 'before anomalies view'] },
                { kind: 'plain', lines: ["Know it's wrong", 'while still small'] },
                { kind: 'focal', lines: ['Catch it', 'early'] },
                { kind: 'plain', lines: ['Creates records at', 'daily/weekly granularity'] },
                { kind: 'plain', lines: ['Amortized unblended,', 'most stable metric'] },
                { kind: 'future', lines: ['Expand to other', '3 cost metrics'] },
              ]}
            />
          </div>
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-accent-foreground">JOB 2: JUDGE IT IN CONTEXT</div>
            <p className="mb-2.5 text-base leading-relaxed text-muted-foreground">
              When an anomaly surfaces, advisors wanted to see it against the specific dimensions their team actually watches, service, region, usage type,
              billing center, so they could decide in seconds whether it's worth acting on instead of digging for context first.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Evidence: advisors converged on the same baseline dimensions repeatedly, and were explicit that one threshold can't fit a $50/month billing center
              and a $500,000/month one. &ldquo;It would be great if the table had the feasibility to choose the dimensions.&rdquo; — internal Flexera FinOps
              advisor.
            </p>
            <JobTraceFlow
              slug="flexera-job-2"
              title="Job 2 trace: judge it in context"
              desc="From advisors converging on the same service/region/billing-center dimensions, to the job of judging an anomaly in context, to the MVP's decision to auto-find the key dimension combination, and what's next."
              steps={[
                { kind: 'input', lines: ['Converge on baseline', 'dimension: service'] },
                { kind: 'plain', lines: ['See it against my', "team's own numbers"] },
                { kind: 'focal', lines: ['Judge it in', 'context'] },
                { kind: 'plain', lines: ['AI finds key dimension', 'combination automatically'] },
                { kind: 'plain', lines: ['Default sort by', 'cost impact'] },
                { kind: 'future', lines: ['Re-test with power', 'users, many dimensions'] },
              ]}
            />
          </div>
          <div className="rounded-2xl border border-border bg-background px-6 py-6">
            <div className="mb-3 text-[11px] font-extrabold tracking-widest text-accent-foreground">JOB 3: EXPLAIN IT CONFIDENTLY</div>
            <p className="mb-2.5 text-base leading-relaxed text-muted-foreground">
              When an anomaly needs to go to someone outside FinOps to get fixed, advisors wanted to explain why it fired before forwarding it, so it gets
              resolved instead of dismissed as noise, and their credibility with the receiving team stays intact.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Evidence: when friction points were scored against UX impact and speed to fix, the absence of any root cause explanation ranked as the top
              priority, ahead of missing alerts and thin recommendations.
            </p>
            <JobTraceFlow
              slug="flexera-job-3"
              title="Job 3 trace: explain it confidently"
              desc="From no-root-cause ranking as the top friction point, to the job of explaining an anomaly confidently, to the MVP's decision to pair a graph with an auto-built top-contributors table, and what's next."
              steps={[
                { kind: 'input', lines: ['No root cause =', 'top friction point'] },
                { kind: 'plain', lines: ['Know why before', 'forwarding it'] },
                { kind: 'focal', lines: ['Explain it', 'confidently'] },
                { kind: 'plain', lines: ['Graph + auto-built', 'top-contributors table'] },
                { kind: 'plain', lines: ['4 of 100 accounts,', 'not the full list'] },
                { kind: 'future', lines: ['Drill-down for deeper', 'root-cause work'] },
              ]}
            />
          </div>
        </div>

        <p className="mt-8 mb-10 text-base leading-relaxed text-muted-foreground">
          Lined up together, the three jobs are really one experience in three steps: <strong>detect</strong> that a cost anomaly happened,{' '}
          <strong>investigate</strong> whether it's a real problem worth acting on, and <strong>decide</strong> what to do next, with enough of an explanation
          to hand it off. That's the shape the MVP took: a table to detect and investigate, a detail view to explain.
        </p>

        <div className="border-t border-border pt-10">
          <h3 className="mb-4 text-xl font-bold">From jobs to a tested user journey</h3>
          <p className="mb-3 text-base leading-relaxed text-muted-foreground">
            <strong>What we learned:</strong> three jobs kept surfacing in every working session, catch it early, judge it in context, explain it confidently,
            and each traced back to a specific finding in the research.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            <strong>How we tested it:</strong> we walked each job back through the same internal FinOps advisors and engineering, and checked it against the
            friction-prioritization scoring, to make sure the proposed journey actually matched how they work, not just what they'd said in passing.
          </p>
        </div>
      </section>

      <section id="journey">
        <Eyebrow>User journey</Eyebrow>
        <SectionHeading>Two entry paths, one shipped, one sequenced for later</SectionHeading>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          Path 1, the system proactively surfacing AI-detected anomalies in a new Anomalies navigation, is what the MVP shipped. Path 2, users defining their
          own alert rules and thresholds with email or in-app notification, was mapped in full but marked &ldquo;not implemented in MVP.&rdquo;
        </p>
        <ZoomableImage
          src={UserJourney}
          alt="Cloud cost anomaly detection user journey showing the shipped system-generated anomalies path into a detail slide-out, and the not-yet-implemented alert configuration path"
          className="mb-10 block h-auto w-full rounded-2xl ring-1 ring-border"
        />

        <h3 className="mb-4 text-xl font-bold">Why the journey is shaped this way</h3>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Strip away the domain and this is a familiar shape: someone gets a warning, and has to decide fast whether it's real and what to do about it. Three
          challenges in that shape drove the journey.
        </p>
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl bg-muted px-6 py-6">
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">Challenge</div>
            <p className="mb-3 text-base leading-relaxed">
              A warning with <strong>no explanation</strong> gets ignored. People don't act on alerts they can't <strong>justify</strong> to someone else.
            </p>
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">UX thinking</div>
            <p className="mb-3 text-base leading-relaxed">
              The moment that decides whether the product gets used isn't when the alert fires, it's right after, when the person has to decide whether to{' '}
              <strong>trust</strong> it.
            </p>
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">Journey decision</div>
            <p className="text-base leading-relaxed">
              <strong>One click</strong> takes someone straight from a flagged item to its explanation, so the trust-deciding moment happens{' '}
              <strong>immediately</strong>, not several screens later.
            </p>
          </div>
          <div className="rounded-2xl bg-muted px-6 py-6">
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">Challenge</div>
            <p className="mb-3 text-base leading-relaxed">
              Asking someone to <strong>set up rules and filters</strong> before they can see anything useful is asking for work <strong>up front</strong>,
              before they know it'll pay off. Most people won't do it.
            </p>
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">UX thinking</div>
            <p className="mb-3 text-base leading-relaxed">
              <strong>Show value before asking for setup.</strong> Let configuration come later, once someone already has a reason to dig deeper.
            </p>
            <div className="mb-1.5 text-xs font-bold text-muted-foreground">Journey decision</div>
            <p className="text-base leading-relaxed">
              The system <strong>surfaces likely problems on its own</strong>, with no setup required. Manual configuration exists, but it's a{' '}
              <strong>later option</strong>, not the entry point.
            </p>
          </div>
        </div>
      </section>

      <section id="final-design">
        <Eyebrow>MVP design</Eyebrow>
        <SectionHeading>The experience we shipped</SectionHeading>
        <ZoomableImage
          src={MvpDesignAnnotated}
          alt="Annotated MVP anomaly detection design: navigation, anomalies table with date range and row grouping, and the detail slide-out with cost trend graph and top contributors table"
          className="block h-auto w-full rounded-3xl ring-1 ring-border"
        />
      </section>

      <section
        id="next-steps"
        className="rounded-3xl bg-muted px-6 py-12 md:px-10">
        <Eyebrow>Next steps</Eyebrow>
        <SectionHeading>What we planned to validate after the MVP</SectionHeading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3.5 text-lg font-bold">User testing</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Keep testing the shipped experience with users to catch usability issues the MVP timeline didn't leave room to chase down, and to find further
              opportunities for improvement.
            </p>
          </div>
          <div>
            <h3 className="mb-3.5 text-lg font-bold">Analytics</h3>
            <p className="mb-2.5 text-base leading-relaxed text-muted-foreground">Watch how people actually use the key areas of the product:</p>
            <div className="flex flex-col gap-2.5">
              <Bullet>Table data, and how people explore it</Bullet>
              <Bullet>Date range picker usage</Bullet>
              <Bullet>Setting up the funnel for slide-out interactions for root cause analysis</Bullet>
            </div>
          </div>
        </div>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          Together, testing and analytics were meant to confirm what we assumed rather than leave it assumed: whether the new journey actually behaves the way
          the research said it would, and where it still needs another look.
        </p>
      </section>

      <FooterNav
        nextLabel="Zeitplaner Scheduler, Spektrum Akademie"
        nextTo="/case-studies/spektrum"
      />
    </CaseStudyShell>
  );
};

export default FlexeraCaseStudy;

export const Head: HeadFC = () => (
  <>
    <link
      rel="stylesheet"
      href={DIAGRAM_FONT_LINK}
    />
    <SEO
      title="Flexera cloud cost anomaly detection"
      description="Discovery, research synthesis and UX design for Flexera's AI-based cloud cost anomaly detection MVP."
      pathname="/case-studies/flexera"
      keyWords={['Flexera', 'FinOps', 'cloud cost anomaly detection', 'AI/ML UX', 'discovery research']}
    />
  </>
);
