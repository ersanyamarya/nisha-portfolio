import { HeadFC, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { SEO } from '../components';
import Layout from '../layouts/mainLayout';
import Contact from '../sections/contact';
import ProjectsSection from '../sections/projects';

const IndexPage: React.FC<PageProps> = () => {
  const [showContact, setShowContact] = React.useState(false);
  return (
    <>
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />
      <Layout>
        <main>
          <div
            className="my-16 grid w-full grid-cols-3 gap-2"
            id="hero">
            <div className="col-span-1">
              <StaticImage
                placeholder="blurred"
                layout="fullWidth"
                src="../images/hero-img.png"
                alt="REPLACE WITH ACTUAL COPY"></StaticImage>
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-2 px-16">
              <h1 className="mb-2 text-4xl">
                Hi, I am <span className="text-primary">Nisha Kumari</span>
              </h1>

              <p className="text-lg">Senior UX Designer</p>
              <p className="text-lg"> Berlin, Germany</p>
              <p className="text-4xl">
                I specialize in creating digital experiences
                <br />
                that are intuitive
              </p>
            </div>
          </div>

          <ProjectsSection />
        </main>
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
