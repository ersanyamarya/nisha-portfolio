import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '../../components';

export default function Footer() {
  const {
    site: {
      siteMetadata: { description, title, copyWrite },
    },
  } = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          description
          title
          copyWrite
        }
      }
    }
  `);

  return (
    <>
      <div
        className="mx-8 mt-32 mb-8 rounded-md border-2 border-primary-900 px-8 py-8 md:px-24 md:py-16"
        // style={{
        //   backgroundImage: 'url(/bg.svg)',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   // backgroundPosition: 'bottom center',
        // }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex w-[80%] flex-col gap-2">
            <Logo />
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-2 text-base">
              <span className="font-medium">What really drives me?</span> The thrill of stepping into the unknown, diving headfirst into challenges that make me
              think, grow, and ultimately become a better designer.
            </p>
          </div>
          <div className="mt-10 flex flex-row items-start justify-between md:m-0 md:justify-end md:gap-4">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-lg">
              <a
                title="Resume"
                href="/Nisha_Kumari_Berlin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-lg">
              <a
                title="LinkedIn"
                href="https://www.linkedin.com/in/nisha-kumari-de/"
                target="_blank"
                rel="noopener noreferrer">
                Linkedin
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-lg">
              <a
                title="Behance"
                href="https://www.behance.net/nisha-kumari-de"
                target="_blank"
                rel="noopener noreferrer">
                Behance
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="h-1" />
    </>
  );
}
