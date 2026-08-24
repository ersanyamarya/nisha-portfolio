import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useState } from 'react';

type RoastKey = 'light' | 'medium' | 'dark';

const ROASTS: { key: RoastKey; label: string; tagline: string; bio: string }[] = [
  {
    key: 'light',
    label: 'Light',
    tagline: 'Quick taste — a quick intro to who I am and what I do.',
    bio: '8+ years designing for climate-tech, cloud FinOps and security products. UX designer who likes things clear, fast, and to the point.',
  },
  {
    key: 'medium',
    label: 'Medium',
    tagline: 'Full story — selected projects and my design approach.',
    bio: '8+ years leading research, design ops and prototyping for climate-tech, cloud FinOps and security products, for teams that need design decisions they can defend.',
  },
  {
    key: 'dark',
    label: 'Dark',
    tagline: 'Deep dive — research, decisions and thinking behind the work.',
    bio: '8+ years leading research, design ops and prototyping for climate-tech, cloud FinOps and security products. I’m also a home barista, and the habits carry over: weigh the inputs, respect the process, taste as you go, and don’t ship anything you wouldn’t stand behind.',
  },
];

const STEAM_DURATION: Record<RoastKey, string> = { light: '4.5s', medium: '3.2s', dark: '2s' };
const RING_CLASS: Record<RoastKey, string> = {
  light: 'border-primary-400',
  medium: 'border-primary-800',
  dark: 'border-default-900',
};

export default function HeroSection() {
  const [roast, setRoast] = useState<RoastKey>('medium');
  const active = ROASTS.find(r => r.key === roast)!;

  return (
    <div
      className="grid w-full grid-cols-1 items-center gap-16 text-default md:grid-cols-3 md:gap-2 md:pt-24"
      id="top">
      <div className="order-2 col-span-1 flex w-full flex-col justify-center gap-2 pb-16 md:order-1 md:col-span-2">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          SENIOR UX DESIGNER · BERLIN, GERMANY
        </div>

        <h1 className="mb-6 text-[42px] leading-[1.05] font-extrabold tracking-[-0.03em] md:text-[68px]">
          Hi, I'm Nisha. I design <span className="font-serif font-medium text-primary-800 italic">with intention.</span>
        </h1>

        <div className="mb-8">
          <div className="mb-3 text-xs font-semibold tracking-widest text-default-500">HOW MUCH DO YOU WANT TO KNOW? PICK A ROAST.</div>
          <div className="mb-2 inline-flex gap-1 rounded-full border border-default-200 p-1">
            {ROASTS.map(r => (
              <button
                key={r.key}
                onClick={() => setRoast(r.key)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  roast === r.key ? 'bg-default-900 text-default-50' : 'bg-transparent text-default-900'
                }`}>
                {r.label}
              </button>
            ))}
          </div>
          <div className="min-h-[18px] text-sm text-default-500">{active.tagline}</div>
        </div>

        <p className="mb-8 min-h-24 max-w-lg text-lg leading-relaxed text-default-600 transition-opacity duration-300">{active.bio}</p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-full bg-default-900 px-8 py-4 text-base font-semibold text-default-50 transition-transform hover:scale-[1.03]">
            View Selected Work
          </a>
          <a
            href="/Nisha_Kumari_Berlin_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-default-200 px-8 py-4 text-base font-semibold transition-colors hover:bg-default-100">
            Download Resume
          </a>
        </div>
      </div>

      <div className="relative order-1 col-span-1 flex h-[420px] items-center justify-center md:order-2">
        <div
          className="absolute size-[400px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--color-primary-200) 0%, transparent 70%)',
            animation: 'ring-pulse 6s ease-in-out infinite',
          }}
        />
        <div className={`absolute size-[320px] rounded-full border transition-colors duration-500 ${RING_CLASS[roast]}`} />
        <div className="relative size-[296px] overflow-hidden rounded-full">
          <StaticImage
            placeholder="blurred"
            layout="fixed"
            width={296}
            height={296}
            src="../../images/hero-img.png"
            alt="Nisha Kumari"
            imgStyle={{ objectPosition: 'center 20%' }}
          />
        </div>
        <span
          className="absolute bottom-2 h-4 w-0.5 rounded-full bg-default-500"
          style={{ animation: `steam-rise ${STEAM_DURATION[roast]} ease-in-out infinite` }}
        />
      </div>
    </div>
  );
}
