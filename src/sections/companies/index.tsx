import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

export default function Companies() {
  const { allFile } = useStaticQuery(graphql`
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
  return (
    <section
      id="companies"
      className="font-light">
      <h2 className="text-4xl">So far....</h2>

      <p className="py-2 text-2xl">I've worked across startups, corporations, consultancies, and freelance projects in various domains</p>
      <br />
      <div className="flex flex-row flex-wrap justify-center gap-4 md:flex-nowrap md:overflow-x-auto">
        {allFile.nodes.map((node, index) => {
          const image = getImage(node);

          return image ? (
            <GatsbyImage
              image={image}
              alt={node.name}
              className="h-8 w-64"
              key={node.name}
              objectFit="contain"
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
