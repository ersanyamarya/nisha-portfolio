import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

export type BlogCardProps = {
  title: string;
  slug: string;
  executiveSummary: string;
  image: any;
  date: string;
  reverse?: boolean;
};

export function BlogCard({ title, slug, executiveSummary, image, date, reverse }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${slug}`}
      className={`flex ${
        reverse ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col-reverse md:flex-row'
      } cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-default-200 bg-card shadow-[var(--elevation-surface)] backdrop-blur-md transition-all duration-200 ease-in-out hover:scale-[1.01]`}
      data-sal={reverse ? 'slide-right' : 'slide-left'}
      data-sal-delay="250"
      data-sal-easing="ease"
      data-sal-duration="250">
      <div className="flex flex-1 flex-col items-start justify-center gap-3 p-8">
        <h2 className="text-4xl leading-tight font-medium text-card-foreground">{title}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">{executiveSummary}</p>
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="flex-1 p-0 md:p-8 md:pl-0">
        <GatsbyImage
          image={image}
          alt={title}
          aria-placeholder={title}
          className="[&_.gatsby-image-wrapper]:rounded-none [&_.gatsby-image-wrapper]:p-0 md:[&_.gatsby-image-wrapper]:rounded-2xl"
        />
      </div>
    </Link>
  );
}
