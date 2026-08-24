import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../components';
import Layout from '../layouts/mainLayout';
import Companies from '../sections/companies';
import CtaSection from '../sections/cta';
import HeroSection from '../sections/hero';
import ProcessSection from '../sections/process';
import ProjectsSection from '../sections/projects';
import TestimonialSection from '../sections/testimonial';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className="space-y-16 md:space-y-24">
        <HeroSection />

        <ProjectsSection />

        <Companies />

        <ProcessSection />

        <TestimonialSection />

        <section
          style={{
            height: '496px',
            boxShadow: 'rgba(142, 151, 158, 0.15) 0px 4px 19px 0px',
            borderRadius: '16px',
            width: '100%',
          }}>
          <iframe
            src="https://adplist.org/widgets/reviews?src=nisha-kumari"
            title="All Reviews"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: '0px' }}></iframe>
        </section>

        <CtaSection />
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
