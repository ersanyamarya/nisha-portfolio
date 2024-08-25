import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
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
        className="mx-8 mb-8 mt-32 rounded-md border-2 border-primary-900 px-8 py-8 md:px-24 md:py-16"
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
            <h3 className="text-style-display-1">{title}</h3>
            <p className="text-sm">
              <strong>What really drives me?</strong>
              <br />
              The thrill of stepping into the unknown, diving headfirst into challenges that make me think, grow, and ultimately become a better designer.
            </p>
          </div>
          <div className="flex flex-row items-start justify-end gap-16">
            <a
              title="Resume"
              href="/Nisha_Kumari_Berlin_Resume.pdf"
              className="rounded-md px-2 py-1 text-lg text-primary hover:scale-105 hover:bg-primary-50 hover:font-medium hover:text-primary-900"
              target="_blank">
              Resume
            </a>
            <a
              title="Resume"
              href="https://www.linkedin.com/in/nisha-kumari-de/"
              className="rounded-md px-2 py-1 text-lg text-primary hover:scale-105 hover:bg-primary-50 hover:font-medium hover:text-primary-900"
              target="_blank">
              Linkedin
            </a>
            <a
              title="Resume"
              href="https://www.behance.net/nisha-kumari-de"
              className="rounded-md px-2 py-1 text-lg text-primary hover:scale-105 hover:bg-primary-50 hover:font-medium hover:text-primary-900"
              target="_blank">
              Behance
            </a>
          </div>
        </div>
      </div>
      <div className="h-1" />
    </>
  );

  return (
    <div className="relative mt-32">
      <div className="absolute left-5 top-0">
        <Rectangle8 />
      </div>
      <div className="grid grid-cols-1 px-64 py-12 md:grid-cols-2">
        <div className="flex w-[80%] flex-col gap-2">
          <Logo />
          <h3 className="text-style-display-1">{title}</h3>
          <p className="text-sm">
            <strong>What really drives me?</strong>
            <br />
            The thrill of stepping into the unknown, diving headfirst into challenges that make me think, grow, and ultimately become a better designer.
          </p>
        </div>
      </div>
    </div>
  );
}

export const Rectangle8 = () => {
  const rectHeight = '16vh';
  const rectWidth = '94vw';
  const height = `calc(${rectHeight} + 40px)`;
  const width = `calc(${rectWidth} + 40px)`;

  return (
    <svg
      height={height}
      width={width}
      fill="none"
      viewBox={`0 0 ${rectWidth} ${height}`}
      xmlns="http://www.w3.org/2000/svg">
      <rect
        height={rectHeight}
        width={rectWidth}
        rx="7"
        stroke="#DEF1FF"
        strokeWidth="4"
        x="10"
        y="1"
      />
      <rect
        height={rectHeight}
        width={rectWidth}
        rx="7"
        stroke="#0064AA"
        strokeWidth="4"
        x="30"
        y="20"
      />
    </svg>
  );
};
