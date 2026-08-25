import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

// Define the shape of our GraphQL response
interface CompanyQueryResult {
  allFile: {
    nodes: Array<{
      relativePath: string;
      name: string;
      childImageSharp: {
        gatsbyImageData: any;
      };
    }>;
  };
}

export default function Companies() {
  const data = useStaticQuery<CompanyQueryResult>(graphql`
    query AllCompaniesImages {
      allFile(filter: { relativeDirectory: { regex: "/companies/" } }, sort: { name: ASC }) {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG, quality: 100)
          }
        }
      }
    }
  `);

  const { allFile } = data;

  return (
    <section
      id="companies"
      className="flex w-full flex-col gap-8">
      <div className="max-w-xl">
        <div className="mb-4 text-xs font-medium tracking-widest text-primary uppercase">Where I've poured</div>
        <p className="text-xl leading-relaxed text-muted-foreground">
          Startups, enterprises, consultancies and freelance work — across climate-tech, cloud FinOps, security and education.
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-6 rounded-3xl px-8 py-8 glass-panel md:gap-2">
        {allFile.nodes.map(node => {
          const image = getImage(node.childImageSharp.gatsbyImageData);

          return image ? (
            <div
              className="flex w-full max-w-[120px] items-center justify-center opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              key={node.name}>
              <GatsbyImage
                image={image}
                alt={node.name}
                className="h-10 w-full"
                objectFit="contain"
              />
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}
