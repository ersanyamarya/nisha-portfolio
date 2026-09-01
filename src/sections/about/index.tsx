import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import { PhoneMock, Reveal, Story, StoryReel } from '../../components';

/**
 * Caption and alt text per photo, keyed by filename in `src/images/story/`.
 * To change the reel: drop a numbered portrait image in that folder and add an entry
 * here. Anything without an entry is skipped, and the order follows the filenames.
 */
const FRAMES: Record<string, { tag: string; alt: string; caption: string; focus?: string }> = {
  '01_coffee': {
    tag: 'Sunlit',
    alt: 'Overhead shot of latte art beside a potted succulent on a sunlit wooden table',
    caption: 'Fern art and a stubborn succulent, both catching the morning sun.',
  },
  '02_coffee': {
    tag: 'Saturday',
    alt: 'Two lattes with rosetta art on the counter in front of the espresso machine',
    caption: 'Two cups, one dialled-in machine.',
    focus: '25% center',
  },
  '03_coffee': {
    tag: 'Heart',
    alt: 'A heart latte art in a glass mug, lit by hard directional light with a leaf shadow',
    caption: 'Hard light, a leaf shadow, and a heart I am still trying to get right.',
  },
  '04_coffee': {
    tag: 'Practice',
    alt: 'Saved story of a heart latte art captioned patience plus practice',
    caption: 'Saved this one for the reminder more than the pour.',
  },
  '05-espresso': { tag: 'Morning', alt: 'A glass cup of black filter coffee in hard morning light', caption: 'Filter, 6am, before anyone needs anything.' },
  '06-palette': { tag: 'Studio', alt: 'A loaded painter’s palette with a brush across it', caption: 'Every palette becomes a design system eventually.' },
};

interface StoryQuery {
  allFile: { nodes: { name: string; childImageSharp: { gatsbyImageData: IGatsbyImageData } }[] };
}

export default function AboutSection() {
  const { allFile } = useStaticQuery<StoryQuery>(graphql`
    query StoryImages {
      allFile(filter: { relativeDirectory: { eq: "story" } }, sort: { name: ASC }) {
        nodes {
          name
          childImageSharp {
            # 402:874 — the phone's screen, so sharp crops to what actually shows.
            gatsbyImageData(layout: CONSTRAINED, width: 804, aspectRatio: 0.46, placeholder: BLURRED, quality: 85, transformOptions: { cropFocus: CENTER })
          }
        }
      }
    }
  `);

  const stories: Story[] = allFile.nodes
    .filter(node => FRAMES[node.name])
    .map(node => ({ id: node.name, image: node.childImageSharp.gatsbyImageData, ...FRAMES[node.name] }));

  return (
    <section
      id="about"
      className="relative -mx-4 overflow-hidden rounded-3xl bg-primary px-6 py-20 md:px-14 md:py-24">
      {/* Roasted-paper texture: a fine dot field, barely there. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(var(--color-default-50) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 md:flex-row md:gap-16">
        <Reveal className="w-full md:w-1/2">
          <div className="mb-4 text-xs font-medium tracking-widest text-default-50/70 uppercase">Off the clock</div>
          <h2 className="mb-6 font-serif text-4xl font-medium tracking-[-0.01em] text-default-50 md:text-5xl">A designer, and a home barista.</h2>
          <div className="space-y-4 text-lg leading-relaxed text-default-50/90">
            <p>Away from the screen I paint, and I spend more time than is reasonable dialling in a single cup. Both feed the work.</p>
            <p>
              Painting taught me composition, and that colour is a decision rather than a preference. Coffee taught me patience, and that the variable you
              didn't measure is the one that ruined the shot.
            </p>
            <p>So I weigh the inputs, taste as I go, and don't ship anything I wouldn't stand behind.</p>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="w-full md:w-1/2">
          <PhoneMock>
            {/* pt clears the Dynamic Island — em, so it tracks the device as it scales. */}
            <StoryReel
              stories={stories}
              handle="nisha.brews"
              chromeOffset="pt-[48em]"
            />
          </PhoneMock>
        </Reveal>
      </div>
    </section>
  );
}
