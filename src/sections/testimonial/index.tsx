import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
type Testimonial = {
  name: string;
  title: string;
  location: string;
  picture: string;
  link: string;
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
    testimonial: `As our UX team grew at Royal Cyber, we needed qualified senior UX Designers. Being a small team, the senior designers needed to take on several roles on any given project, be it as a UX Researcher, UX Designer, or Test Moderator. Finding candidates that fit the bill was tough, as you can imagine, until we found Nisha. Nisha’s broad experience in all things UX made it easy for her to be assigned to complex projects with demanding clients. Her ease at approaching all challenges from a sound customer-focused mindset immediately instilled confidence in her from the team and the client. Nisha’s talents also extend into product design. Royal Cyber has developed a suite of products that have become very popular with our customers. Due to Nisha’s expert touch, many Royal Cyber products have undergone metamorphic change.
If you’re reading this, you are probably considering talking to Nisha. Do it! It will be well worth your time.
Thx!`,
  },
];

// Falls back to the person's initials: the LinkedIn CDN URLs below are signed and
// expire, so a dead `picture` should degrade to something legible, not an empty box.
const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

export function TestimonialCard({ name, title, location, picture, link, testimonial }: Testimonial) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pictureFailed, setPictureFailed] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="grid grid-cols-1 gap-6 border-none bg-default-100 p-6 shadow-none sm:p-10 md:grid-cols-[300px_1fr] md:gap-8 md:p-16">
      <a
        className="flex flex-col gap-2"
        href={link}
        target="_blank"
        rel="noopener noreferrer">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded border border-default-200 bg-default-100">
          {pictureFailed ? (
            <span
              aria-hidden="true"
              className="text-2xl font-medium text-default-600">
              {initialsOf(name)}
            </span>
          ) : (
            <img
              src={picture}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setPictureFailed(true)}
            />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-base text-muted-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </a>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className={`whitespace-pre-line text-default-700 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-5'}`}>
            <svg
              className="mb-4 h-8 w-8 text-default-400"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            {testimonial}
          </p>
          <Button
            variant="link"
            className="h-11 justify-start p-0 sm:h-auto"
            onClick={toggleExpand}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="recommendations"
      className="gap-10vh flex w-full flex-col gap-8 font-light">
      <div className="relative flex items-center justify-between">
        <h2 className="text-4xl font-medium">Recommendations</h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full text-primary md:size-9"
            aria-label="Previous testimonial"
            onClick={previousTestimonial}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full text-primary md:size-9"
            aria-label="Next testimonial"
            onClick={nextTestimonial}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="relative overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            <div className="flex">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.name}
                  className="w-full flex-shrink-0">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}

        {/* Pagination Indicators */}
        <div className="mt-4 flex justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="flex size-11 items-center justify-center"
              aria-label={`Go to testimonial ${index + 1}`}>
              <span className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-4 bg-primary' : 'w-2 bg-default-300'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
