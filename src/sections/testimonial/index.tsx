import { Link } from 'gatsby';
import React, { useState } from 'react';
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
    name: 'Gábor László Mándoki',
    title: 'CPO & Co-Founder, Beeta.one',
    location: 'Germany',
    picture:
      'https://media.licdn.com/dms/image/C5603AQFAt2fHQQMzxQ/profile-displayphoto-shrink_800_800/0/1575900439657?e=2147483647&v=beta&t=mfU39BsSa7oF4I4eOJgBosDuwGJSNUZWGM57VGIiOW4',
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
      'https://media.licdn.com/dms/image/v2/D4D03AQHUmygvHbIL8w/profile-displayphoto-shrink_800_800/B4DZOSAZSwHcAg-/0/1733321398134?e=1745452800&v=beta&t=SkBbYrNTflaNpyIJTPTaMjTro5xo_k7tbOHX7toCc-k',
    link: 'https://www.linkedin.com/in/sanyam-arya/',
    testimonial: `Nisha Kumari is a UX designer dream come true! I had the pleasure of working with her on my new cross-platform MQTT client, Mqtizer. Nisha impressed me from the start. She conducted user research to ensure we built something users truly needed, then translated that knowledge into fantastic designs. From initial sketches to polished mockups, she brought Mqtizer to life. 
Her talents extend beyond the app itself. Nisha designed a killer marketing website and crafted email templates to perfectly complement Mqtizer. She basically owned the entire user experience. Nisha is professional, reliable, and brings tons of creativity to the table. Don't hesitate to snag her up if you need a top-notch UX designer!`,
  },
  {
    name: 'Tony Hyun',
    title: 'Director of UX/ CXA, Royal Cyber Inc.',
    location: 'Chicago, Illinois',
    picture:
      'https://media.licdn.com/dms/image/v2/C5603AQGPkCf1tOkmMw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1551039351440?e=1745452800&v=beta&t=xrh5VkcMy81MHdKcp9LNbzcaxtZhPP2x_O58BLU8768',
    link: 'https://www.linkedin.com/in/tonyhyun/',
    testimonial: `As our UX team grew at Royal Cyber, we needed qualified senior UX Designers. Being a small team, the senior designers needed to take on several roles on any given project, be it as a UX Researcher, UX Designer, or Test Moderator. Finding candidates that fit the bill was tough, as you can imagine, until we found Nisha. Nisha’s broad experience in all things UX made it easy for her to be assigned to complex projects with demanding clients. Her ease at approaching all challenges from a sound customer-focused mindset immediately instilled confidence in her from the team and the client. Nisha’s talents also extend into product design. Royal Cyber has developed a suite of products that have become very popular with our customers. Due to Nisha’s expert touch, many Royal Cyber products have undergone metamorphic change.
If you’re reading this, you are probably considering talking to Nisha. Do it! It will be well worth your time.
Thx!`,
  },
];

export function TestimonialCard({ name, title, location, picture, link, testimonial }: Testimonial) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg bg-default-100 p-16 md:grid-cols-[300px_1fr] md:gap-8">
      <Link
        className="flex flex-col gap-2"
        to={link}>
        <div className="border-gray-200 h-20 w-20 overflow-hidden rounded border">
          <img
            src={picture}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-muted-foreground text-base">{title}</p>
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
      </Link>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className={`text-gray-700 whitespace-pre-line transition-all duration-300 ${isExpanded ? '' : 'line-clamp-5'}`}>
            <svg
              className="text-gray-400 mb-4 h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            {testimonial}
          </p>
          <button
            onClick={toggleExpand}
            className="font-medium text-primary transition-colors hover:text-primary-700">
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
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
        <div>
          <button
            onClick={previousTestimonial}
            className="hover:bg-gray-50 rounded-full p-2 text-primary">
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
          </button>
          <button
            onClick={nextTestimonial}
            className="hover:bg-gray-50 rounded-full p-2 text-primary">
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
          </button>
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
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'w-4 bg-primary' : 'bg-default-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
