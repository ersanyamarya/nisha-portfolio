import { HeadFC, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { SEO, WordRotate } from '../components';
import Layout from '../layouts/mainLayout';
import Companies from '../sections/companies';
import Contact from '../sections/contact';
import ProjectsSection from '../sections/projects';
import TestimonialSection from '../sections/testimonial';

// Current employment information
const current = {
  company: 'Flexera',
  role: 'Senior UX Designer',
  description:
    'At Flexera, I’m designing solutions for FinOps personas — from finance to engineering to product management. Currently, I’m focused on Cost Anomaly Management, capability that helps cloud engineers and financial analysts quickly spot and fix unexpected cloud spend spikes. This not only smooths out workflows but also improves financial predictability and cuts down on wasted resources.I’m also simplifying cost tracking through automation, freeing up teams to focus on strategic decisions instead of manual checks.',
  logo: '../images/companies/01_company.png',
};

const IndexPage: React.FC<PageProps> = () => {
  const [showContact, setShowContact] = React.useState(false);
  return (
    <>
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />
      <Layout>
        <main className="space-y-16 md:space-y-24">
          <div
            className="grid w-full grid-cols-1 gap-16 font-light text-default md:grid-cols-3 md:gap-2 md:pt-24"
            id="hero">
            <div className="col-span-1 p-4 md:p-0">
              <StaticImage
                placeholder="blurred"
                layout="fullWidth"
                src="../images/hero-img.png"
                alt="Nisha Kumari"
              />
            </div>
            <div className="col-span-1 flex w-full flex-col justify-center gap-2 pb-16 md:col-span-2 md:pl-16">
              <h1 className="mb-2 text-4xl">
                Hi, I am <span className="font-medium text-primary">Nisha Kumari</span>
              </h1>

              <p className="flex items-center justify-start gap-2 text-lg">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20M4 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6Z"
                    stroke="#41393B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Senior UX Designer
              </p>
              <p className="flex items-center gap-2 text-lg">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                    stroke="#41393B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#41393B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>{' '}
                Berlin, Germany
              </p>

              <p className="mt-8 text-4xl">
                I specialize in creating digital experiences
                <br />
                that are{' '}
                <WordRotate
                  className="bg-gradient-to-r from-secondary-500 to-secondary-900 bg-clip-text font-medium text-transparent"
                  words={['intuitive', 'seamless', 'data-driven', 'user-centric']}
                />
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-default-100/50 p-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
              <div className="flex flex-col">
                <h3 className="text-2xl font-medium">Current Role</h3>
                <span className="text-lg font-medium text-default-900">{current.role}</span>
                <br />
                <StaticImage
                  src="../images/companies/01_company.png"
                  alt={`${current.company} logo`}
                  placeholder="blurred"
                  height={28}
                  layout="fixed"
                  className="rounded-lg"
                />
              </div>
              <p className="text-md flex-1 text-default-800">
                At Flexera, I’m designing solutions for <strong>FinOps</strong> personas — from finance to engineering to product management. Currently, I’m
                focused on <strong>Cloud Cost Anomaly Management</strong>, capability that helps cloud engineers and financial analysts quickly spot and fix
                unexpected cloud spend spikes. This not only smooths out workflows but also improves financial predictability and cuts down on wasted resources.
                I’m also simplifying cost tracking through automation, freeing up teams to focus on strategic decisions instead of manual checks.
              </p>
            </div>
          </div>

          <ProjectsSection />

          <Companies />

          <TestimonialSection />

          <section
            style={{
              // padding: '16px',
              height: '496px',
              boxShadow: 'rgba(142, 151, 158, 0.15) 0px 4px 19px 0px',
              borderRadius: '16px',
              // overflow: 'hidden',
              width: '100%',
              // maxWidth: '650px',
            }}>
            <iframe
              src="https://adplist.org/widgets/reviews?src=nisha-kumari"
              title="All Reviews"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: '0px' }}></iframe>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
