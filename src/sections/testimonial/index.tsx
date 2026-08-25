import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, QuoteIcon, RotateCwIcon } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Reveal } from '../../components';
import { BeanIcon } from '../../components/coffeeBean/beanIcon';

type Testimonial = {
  name: string;
  title: string;
  location: string;
  picture: string;
  link: string;
  /** A short verbatim line lifted from `testimonial`, shown on the front of the card. */
  excerpt: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Joanna Kleinschmidt',
    title: 'Sr. Manager, UX Design, Flexera',
    location: 'Townsend, Massachusetts, United States',

    picture:
      'https://media.licdn.com/dms/image/v2/C4D03AQEx4CNB_TJCVg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516283979128?e=1781740800&v=beta&t=3vY4_s5JR6GRUjzlI2SE4YzY7i4fa6mKE-qMwHrUOkE',
    link: 'https://www.linkedin.com/in/jkleinschmidt/',
    excerpt: 'A great listener who approaches her work with calm determination and quiet good humor.',
    testimonial: `Nisha worked within the UX group at Flexera for over a year, delivering excellent designs on some very challenging product capabilities in the FinOps domain.  She is a team player and skilled collaborator with PM and others in UX, always willing to share knowledge and insights.
Nisha was able to handle some of the most technically challenging design work in our group - negotiating business & user needs with Product Managers and Engineers, resulting in detailed design specifications.  She's a great listener and approaches her work with calm determination and quiet good humor.  This level-headed, collaborative approach makes her a pleasure to work with.  Nisha is a great addition to any UX team working on complex software!`,
  },
  {
    name: 'Jeffrey Gadzala',
    title: 'Lead UX Designer, Flexera',
    location: 'Greater Seattle Area',
    picture:
      'https://media.licdn.com/dms/image/v2/C4D03AQHzA6dWUpdETg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1537369120873?e=1781740800&v=beta&t=ni1dfB_D4dV5iMb7xPt9QAeVybV3PIo_LjaFnW7gIuc',
    link: 'https://www.linkedin.com/in/jeffreygadzala/',
    excerpt: 'Evidence backed, critical of the status quo, and guided users toward desired outcomes.',
    testimonial: `Nisha joined our team at a moment of significant change: acquisition integration, new investment, and shifting business priorities. For the company, this meant addressing complex challenges with lots of new people and limited shared context. 
Nisha joined the UX team initially to work on other product areas, but was moved over to support the FinOps product most impacted by these changes at the company. Her ability to grasp complex big data problems quickly, work independently across domains, and produce thoughtful, high-quality concepts was key to helping Product Management make clear decisions and guide Engineering towards quality solutions. Throughout these efforts Nisha led her own work on problem discovery and solution design. UX leadership could always trust that her recommendations were evidence backed, critical of the status quo, and guided users toward desired outcomes while maintaining needed flexibility for bespoke use cases.
Within the UX team, Nisha collaborated well with other designers and researchers to conduct user interviews and  share work internally for feedback. Nisha even went so far as to support our small designs system team with what they needed to request new components and patterns to build out the DS and support her work. Working with Nisha was a pleasure and she is a credit to any UX team.`,
  },
  {
    name: 'Gábor László Mándoki',
    title: 'CPO & Co-Founder, Beeta.one',
    location: 'Germany',
    picture:
      'https://media.licdn.com/dms/image/v2/C5603AQFAt2fHQQMzxQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1575900439632?e=1781740800&v=beta&t=eZe3V2_wLby-VcQz-bZw_C-z8oY2HKG1gZUZ4ARMa2U',
    link: 'https://www.linkedin.com/in/gabormandoki/',
    excerpt: 'Her blend of speed, precision, and clear communication makes her a standout UX designer.',
    testimonial: `I had the pleasure of working with Nisha and I must say, our collaboration was nothing short of exceptional. Her sharp intellect and quick-witted approach to problem-solving were evident in every project we undertook.
What sets her apart is her ability to think holistically. She has an innate knack for exploring and delivering ideas swiftly, ensuring that no stone is left unturned when it comes to design thinking. Her speed does not compromise the quality of her work, but rather enhances it, making her an invaluable asset to any team.
Furthermore, her understanding of the hand-off process and collaboration with developers is commendable. She seamlessly bridges the gap between design and development, ensuring a smooth transition and effective communication throughout the project lifecycle.
I wholeheartedly recommend Nisha for any endeavor she chooses to pursue. Her blend of speed, precision, and clear communication makes her a standout UX Designer. I have no doubt that she will continue to produce exceptional work in her future roles`,
  },
  {
    name: 'Sanyam Arya',
    title: 'Cloud Architect, PROTHINX',
    location: 'Berlin, Germany',
    picture:
      'https://media.licdn.com/dms/image/v2/D4D03AQG_k9G0Ia1xhA/profile-displayphoto-scale_400_400/B4DZkFJLWxHYAo-/0/1756727941441?e=1781740800&v=beta&t=QPES6_P06f_mXjwxQ_4jM38UhhlFZyVAMo1LntcOsP0',
    link: 'https://www.linkedin.com/in/sanyam-arya/',
    excerpt: 'From initial sketches to polished mockups, she basically owned the entire user experience.',
    testimonial: `Nisha Kumari is a UX designer dream come true! I had the pleasure of working with her on my new cross-platform MQTT client, Mqtizer. Nisha impressed me from the start. She conducted user research to ensure we built something users truly needed, then translated that knowledge into fantastic designs. From initial sketches to polished mockups, she brought Mqtizer to life. 
Her talents extend beyond the app itself. Nisha designed a killer marketing website and crafted email templates to perfectly complement Mqtizer. She basically owned the entire user experience. Nisha is professional, reliable, and brings tons of creativity to the table. Don't hesitate to snag her up if you need a top-notch UX designer!`,
  },
  {
    name: 'Tony Hyun',
    title: 'Director of UX/ CXA, Royal Cyber Inc.',
    location: 'Chicago, Illinois',
    picture:
      'https://media.licdn.com/dms/image/v2/C5603AQGPkCf1tOkmMw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1551039351643?e=1781740800&v=beta&t=sEdwHIkaU2BZ3_e8KVz0J1Cw4WpNYZiTPB_O1haQRe0',
    link: 'https://www.linkedin.com/in/tonyhyun/',
    excerpt: 'Her customer-focused mindset immediately instilled confidence in the team and the client.',
    testimonial: `As our UX team grew at Royal Cyber, we needed qualified senior UX Designers. Being a small team, the senior designers needed to take on several roles on any given project, be it as a UX Researcher, UX Designer, or Test Moderator. Finding candidates that fit the bill was tough, as you can imagine, until we found Nisha. Nisha’s broad experience in all things UX made it easy for her to be assigned to complex projects with demanding clients. Her ease at approaching all challenges from a sound customer-focused mindset immediately instilled confidence in her from the team and the client. Nisha’s talents also extend into product design. Royal Cyber has developed a suite of products that have become very popular with our customers. Due to Nisha’s expert touch, many Royal Cyber products have undergone metamorphic change.
If you’re reading this, you are probably considering talking to Nisha. Do it! It will be well worth your time.
Thx!`,
  },
];

/** Gap between cards on the track, in px. Kept in sync with the `gap-7` below, since scrolling is measured in pixels. */
const GAP = 28;

/**
 * Card width, sized so the next one is always half-visible and the track reads as a
 * carousel rather than a grid: at `n` cards per view, `width = 100% / n - gap`.
 */
const CARD_WIDTH = 'w-[calc(85%-1.75rem)] sm:w-[calc(60%-1.75rem)] lg:w-[calc(40%-1.75rem)]';

// Falls back to the person's initials: the LinkedIn CDN URLs above are signed and
// expire, so a dead `picture` should degrade to something legible, not an empty box.
const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

function Avatar({ name, picture, className }: { name: string; picture: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={cn('flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-default-100', className)}>
      {failed ? (
        <span
          aria-hidden="true"
          className="font-serif text-3xl font-medium text-muted-foreground">
          {initialsOf(name)}
        </span>
      ) : (
        // The name is always right next to it, so the photo itself is decorative.
        <img
          src={picture}
          alt=""
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

/**
 * One recommendation, as a two-sided card: an ID badge on the front, the note itself
 * on the back. Pointer devices flip it on hover; touch devices flip it on tap. The
 * back holds a preview — the full note opens in a dialog.
 */
function TestimonialCard({ index, name, title, location, picture, link, excerpt, testimonial }: Testimonial & { index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [open, setOpen] = useState(false);

  // Hover already does the flipping wherever there's a cursor; tap is the touch equivalent.
  const handleClick = () => {
    if (window.matchMedia('(hover: hover)').matches) return;
    setFlipped(f => !f);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group h-[33rem]"
        style={{ perspective: '1600px' }}>
        <div
          className={cn(
            'relative size-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-3d group-focus-within:rotate-y-180 group-hover:rotate-y-180 motion-reduce:duration-0',
            flipped && 'rotate-y-180'
          )}>
          {/* Front — the badge */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl glass-panel backface-hidden">
            <div className="flex items-center justify-between border-b border-border bg-primary/10 px-5 py-3">
              <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
                <BeanIcon className="size-3.5" />
                Recommendation
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">№ {String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Lanyard slot */}
            <span
              aria-hidden="true"
              className="mx-auto mt-5 h-1.5 w-16 rounded-full bg-default-300"
            />

            <div className="flex flex-1 flex-col items-center px-6 pt-7 text-center">
              <Avatar
                name={name}
                picture={picture}
                className="size-32 ring-2 ring-primary/25 sm:size-40"
              />
              <h3 className="mt-6 font-serif text-xl leading-snug font-medium">{name}</h3>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground/80">{location}</p>

              {/* A verbatim line from the note, so the card says something before it's turned. */}
              <p className="mt-auto line-clamp-3 w-full border-t border-dashed border-border pt-5 font-serif leading-relaxed text-muted-foreground italic">
                &ldquo;{excerpt}&rdquo;
              </p>
            </div>

            <div className="mx-6 mb-6 flex items-center justify-center gap-1.5 pt-4 text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
              <RotateCwIcon
                size={12}
                strokeWidth={2}
              />
              Turn for the note
            </div>
          </div>

          {/* Back — the note */}
          <div className="absolute inset-0 flex rotate-y-180 flex-col overflow-hidden rounded-3xl bg-primary p-7 text-default-50 shadow-[var(--elevation-light)] backface-hidden">
            {/* Roasted-paper texture, matching the About panel. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(var(--color-default-50) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            <QuoteIcon
              aria-hidden="true"
              className="relative size-8 fill-default-50/25 text-default-50/25"
            />
            <p className="relative mt-4 line-clamp-[8] text-[0.95rem] leading-relaxed text-default-50/90">{testimonial}</p>

            <div className="relative mt-auto pt-5">
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-default-50/40 bg-default-50/10 px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-default-50 uppercase transition-colors hover:bg-default-50/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-50">
                Read the full note
                <ArrowUpRightIcon size={14} />
              </button>

              <div className="mt-5 border-t border-default-50/25 pt-4">
                <div className="font-serif text-base leading-snug">{name}</div>
                <div className="text-xs text-default-50/75">{title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto sm:max-w-2xl">
          <DialogHeader className="flex-row items-center gap-4 pr-10 text-left">
            <Avatar
              name={name}
              picture={picture}
              className="size-14"
            />
            <div className="min-w-0">
              <DialogTitle className="font-serif text-lg font-medium">{name}</DialogTitle>
              <DialogDescription>
                {title} · {location}
              </DialogDescription>
            </div>
          </DialogHeader>

          <p className="mt-6 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{testimonial}</p>

          <div className="mt-7">
            <Button
              asChild
              variant="outline"
              size="sm">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer">
                View on LinkedIn
                <ArrowUpRightIcon size={14} />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function TestimonialSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  // The native scroll position is the source of truth, so trackpad flicks and drags
  // grey out the arrows exactly like the arrows themselves do.
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ atStart: track.scrollLeft <= 1, atEnd: track.scrollLeft >= max - 1 });
  }, []);

  /** Scrolls one card along; snapping tidies up the landing position. */
  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + GAP), behavior: 'smooth' });
  };

  return (
    <section
      id="recommendations"
      className="flex w-full flex-col gap-10">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="mb-4 text-xs font-medium tracking-widest text-primary uppercase">Kind words</div>
          <h2 className="mb-4 font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">What it's like to work with me.</h2>
          <p className="text-muted-foreground">Managers, founders and engineers I've built things with. Turn a card over to read what they wrote.</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-11 md:size-10"
            aria-label="Previous recommendation"
            disabled={edges.atStart}
            onClick={() => nudge(-1)}>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-11 md:size-10"
            aria-label="Next recommendation"
            disabled={edges.atEnd}
            onClick={() => nudge(1)}>
            <ChevronRightIcon />
          </Button>
        </div>
      </Reveal>

      {/* The track runs full-bleed to the right so the half-visible card reads as
          "there's more", rather than as a card that got clipped by the container. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-7 overflow-x-auto px-4 md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden">
        {testimonials.map((person, i) => (
          <div
            key={person.name}
            className={cn('shrink-0 snap-start', CARD_WIDTH)}>
            <TestimonialCard
              index={i}
              {...person}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
