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
      <h2 className="text-2xl font-medium">So far....</h2>

      <p className="text-lg">I've worked across startups, corporations, consultancies, and freelance projects in various domains</p>
      <br />
      <div className="flex flex-row gap-8">
        {allFile.nodes.map((node, index) => {
          const image = getImage(node);

          return image ? (
            <GatsbyImage
              image={image}
              alt={node.name}
              className="w h-12"
              key={node.name}
              objectFit="contain"
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
