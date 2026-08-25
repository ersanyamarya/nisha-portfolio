import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { Reveal, SEO } from '../components';
import Layout from '../layouts/mainLayout';
import AboutSection from '../sections/about';
import Companies from '../sections/companies';
import CtaSection from '../sections/cta';
import HeroSection from '../sections/hero';
import ProcessSection from '../sections/process';
import ProjectsSection from '../sections/projects';
import TestimonialSection from '../sections/testimonial';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className="space-y-24 md:space-y-36">
        <HeroSection />

        <ProjectsSection />

        <Companies />

        <ProcessSection />

        <AboutSection />

        <TestimonialSection />

        <Reveal>
          <section className="h-[496px] w-full overflow-hidden rounded-3xl glass-panel">
            <iframe
              src="https://adplist.org/widgets/reviews?src=nisha-kumari"
              title="ADPList reviews for Nisha Kumari"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: '0px' }}
            />
          </section>
        </Reveal>

        <CtaSection />
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
