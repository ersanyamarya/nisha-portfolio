import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import { Logo } from '../../components';

const SECTIONS = [
  { name: 'Work', path: '/#work' },
  { name: 'Process', path: '/#process' },
  { name: 'About', path: '/#about' },
  { name: 'Kind words', path: '/#recommendations' },
  { name: 'Contact', path: '/#contact' },
];

function BrewButton() {
  const [pct, setPct] = useState(0);
  const [brewing, setBrewing] = useState(false);
  const [brewed, setBrewed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resetRef.current) clearTimeout(resetRef.current);
    },
    []
  );

  const startBrew = () => {
    if (brewing) return;
    if (resetRef.current) clearTimeout(resetRef.current);
    setBrewing(true);
    setBrewed(false);
    setPct(0);
    intervalRef.current = setInterval(() => {
      setPct(prev => {
        const next = prev + 8;
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          resetRef.current = setTimeout(() => {
            setBrewed(false);
            setPct(0);
          }, 4000);
          setBrewing(false);
          setBrewed(true);
          return 100;
        }
        return next;
      });
    }, 90);
  };

  let label = 'Brew me a coffee?';
  if (brewing) label = `Brewing... ${pct}%`;
  if (brewed) label = 'Order’s up, thanks for scrolling this far.';

  return (
    <button
      onClick={startBrew}
      className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-default-50/25 bg-transparent px-4 py-2.5 text-xs font-semibold text-default-50">
      <span
        className="size-3.5 shrink-0 rounded-full"
        style={{ background: `conic-gradient(var(--color-primary-400) ${pct}%, rgba(255,255,255,0.2) 0)` }}
      />
      {label}
    </button>
  );
}

export default function Footer() {
  const {
    site: {
      siteMetadata: { copyWrite },
      buildTime,
    },
  } = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          copyWrite
        }
        buildTime
      }
    }
  `);
  // Reading the build-time timestamp (baked into the query result at build) instead of
  // `new Date()` keeps the year identical between SSR output and client hydration.
  const year = new Date(buildTime).getFullYear();

  return (
    <div className="relative z-10 mt-32 rounded-t-3xl bg-default-900 px-4 md:px-8 lg:px-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <Logo inverted />
          </div>
          <p className="max-w-[260px] text-sm leading-relaxed text-default-50 opacity-55">
            Senior product designer in Berlin. Slow mornings, careful research, no shortcuts either way.
          </p>
        </div>

        <div>
          <div className="mb-4 text-xs font-medium tracking-widest text-default-50 uppercase opacity-50">Sections</div>
          <div className="flex flex-col gap-2.5 text-sm">
            {SECTIONS.map(link => (
              <a
                key={link.name}
                href={link.path}
                className="text-default-50 opacity-75 transition-opacity hover:opacity-50">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs font-medium tracking-widest text-default-50 uppercase opacity-50">Connect</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href="https://www.linkedin.com/in/nisha-kumari-de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-50 opacity-75 transition-opacity hover:opacity-50">
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/nisha-kumari-de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-50 opacity-75 transition-opacity hover:opacity-50">
              Behance
            </a>
            <a
              href="/Nisha_Kumari_Berlin_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-50 opacity-75 transition-opacity hover:opacity-50">
              Resume ↓
            </a>
            <span className="text-default-50 opacity-75">Berlin, Germany</span>
          </div>
        </div>

        <div className="flex items-start md:justify-end">
          <BrewButton />
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-default-50/10 py-6 text-xs text-default-50 opacity-60">
        © {year} {copyWrite}. Precision in the process, delight in the details.
      </div>
    </div>
  );
}
