import { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { SEO } from '../components';
import Layout from '../layouts/mainLayout';
import AboutSection from '../sections/about';
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

        <ProcessSection />

        <AboutSection />

        <TestimonialSection />

        <CtaSection />
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
