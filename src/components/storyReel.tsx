import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BeanIcon } from './coffeeBean/beanIcon';

export interface Story {
  id: string;
  image: IGatsbyImageData;
  alt: string;
  tag: string;
  caption: string;
  /** CSS `object-position` for the frame's image; defaults to centered. */
  focus?: string;
}

interface StoryReelProps {
  stories: Story[];
  /** The handle shown in the reel's header row. */
  handle: string;
  /** Utility class pushing the progress bars and header clear of device chrome above them. */
  chromeOffset?: string;
}

/** How long each frame holds before the reel advances, in ms. */
const DWELL = 1600;

/**
 * An Instagram-style story reel: a 9:16 card that plays through a set of photos with
 * segmented progress bars, pausing while you hover or focus it. Tap the left or right
 * of the card — or use the arrow keys — to step through by hand.
 */
export function StoryReel({ stories, handle, chromeOffset }: StoryReelProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = stories.length;

  const go = useCallback((delta: number) => setIndex(i => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => go(1), DWELL);
    return () => clearTimeout(timer);
  }, [index, paused, count, go]);

  if (!count) return null;
  const current = stories[index];

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-default-950"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}>
      {stories.map((story, i) => (
        <div
          key={story.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <GatsbyImage
            image={story.image}
            alt={i === index ? story.alt : ''}
            className="h-full w-full"
            objectFit="cover"
            // Warm cinematic grade, per docs/Brand.md §5 — keeps a mixed set of photos
            // reading as one roll of film against the terracotta panel.
            imgStyle={{ filter: 'saturate(0.88) sepia(0.16) contrast(1.04)', objectPosition: story.focus }}
          />
        </div>
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-default-950/85 to-transparent"
      />

      {/* Progress segments + header, held clear of any device chrome above them */}
      <div className={cn('absolute inset-x-0 top-0', chromeOffset)}>
        <div className="flex gap-1.5 px-3 pt-3">
          {stories.map((story, i) => (
            <span
              key={story.id}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-default-50/30">
              <span
                // Remounting on index change restarts the fill from zero.
                key={`${story.id}-${index}`}
                className={`block h-full origin-left rounded-full bg-default-50 ${
                  i < index
                    ? 'scale-x-100'
                    : i === index
                      ? 'motion-safe:animate-[story-fill_var(--dwell)_linear_forwards] motion-reduce:scale-x-100'
                      : 'scale-x-0'
                }`}
                style={{ '--dwell': `${DWELL}ms`, animationPlayState: paused ? 'paused' : 'running' } as React.CSSProperties}
              />
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5 px-4 pt-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-default-950/50 p-1.5 ring-2 ring-primary-400 backdrop-blur-sm">
            <BeanIcon className="size-full" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-default-50">{handle}</span>
          {/* Solid, not diluted — this row sits directly on the photo (outside the
              bottom scrim), so a translucent value is only as safe as the pixels
              underneath it, which vary per photo. */}
          <span className="text-xs text-default-50">{current.tag}</span>
        </div>
      </div>

      {/* Caption */}
      <p
        key={current.id}
        className="absolute inset-x-0 bottom-0 px-5 pb-11 font-serif text-lg leading-snug text-default-50 italic motion-safe:animate-in motion-safe:duration-500 motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
        {current.caption}
      </p>

      {/* Tap zones — a third back, the rest forward, exactly like the real thing. */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute inset-y-0 left-0 w-1/3 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none focus-visible:ring-inset">
        <span className="sr-only">Previous photo</span>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute inset-y-0 right-0 w-2/3 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none focus-visible:ring-inset">
        <span className="sr-only">Next photo</span>
      </button>
    </div>
  );
}
