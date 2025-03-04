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
      className="my-8 px-4 font-light">
      <h2 className="mb-2 text-3xl font-light">So far....</h2>

      <p className="mb-6 text-xl">I've worked across startups, corporations, consultancies, and freelance projects in various domains</p>

      <div className="flex w-full flex-row items-center justify-between gap-2">
        {allFile.nodes.map(node => {
          const image = getImage(node.childImageSharp.gatsbyImageData);

          return image ? (
            <div
              className="flex w-full max-w-[120px] items-center justify-center"
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
