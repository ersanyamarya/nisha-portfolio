import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { useMemo } from 'react';

interface CaseStudyImagesQueryResult {
  allFile: {
    nodes: {
      relativePath: string;
      childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
    }[];
  };
}

/**
 * Optimized (lazy-loaded, blurred-placeholder) versions of every screenshot under
 * `src/images/case-studies/`, looked up by path relative to `src/images/`
 * (e.g. `case-studies/flexera/flexera_overview.png`). Runs one query per page instead
 * of one per image — call it once and reuse the returned lookup function.
 */
export function useCaseStudyImages(): (relativePath: string) => IGatsbyImageData | undefined {
  const data = useStaticQuery<CaseStudyImagesQueryResult>(graphql`
    query CaseStudyImages {
      allFile(filter: { relativeDirectory: { regex: "/^case-studies/" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 85)
          }
        }
      }
    }
  `);

  return useMemo(() => {
    const map = new Map(data.allFile.nodes.map(node => [node.relativePath, node.childImageSharp?.gatsbyImageData]));
    return (relativePath: string) => map.get(relativePath);
  }, [data]);
}
