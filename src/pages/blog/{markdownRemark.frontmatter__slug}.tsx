import { HeadFC, PageProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { SEO } from '../../components';
import ShareButtons from '../../components/blog/share_button';
import Layout from '../../layouts/mainLayout';
import './blogContent.css';

export default function BlogPostTemplate({ data, location: { href: url } }: PageProps<Queries.Query>) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark as any;
  const { featuredImage, title, executiveSummary, date } = frontmatter;
  const featuredImg = getImage(featuredImage?.childImageSharp?.gatsbyImageData as any) as any;
  return (
    <Layout>
      <div className="mx-auto flex w-[80vw] max-w-[1024px] min-w-[320px] flex-col items-start justify-center gap-6 py-16 [&_.gatsby-image-wrapper]:mx-auto [&_.gatsby-image-wrapper]:mb-0 [&_.gatsby-image-wrapper]:w-full [&_.gatsby-image-wrapper]:rounded-2xl [&_.gatsby-image-wrapper]:p-0">
        <GatsbyImage
          image={featuredImg}
          alt={title}
          aria-placeholder={title}
        />
        <div className="flex w-full flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center gap-6 rounded-lg p-4">
            <img
              src="https://nishakumari.art/static/3ac0be86d11bc04145b23b3a655962e5/6e082/person.webp"
              alt={title}
              aria-placeholder={title}
              className="mx-auto size-14 rounded-full object-scale-down"
            />
            <div className="flex h-full flex-col items-start justify-center gap-1">
              <span className="text-xl font-semibold text-foreground">Nisha Kumari</span>
              <span className="flex flex-row flex-wrap items-center gap-2 font-light text-muted-foreground">
                {date} · <span>{minutesToRead(html)}</span>
              </span>
            </div>
          </div>
          <div className="group relative flex cursor-pointer flex-row items-center justify-center gap-4 p-8 text-lg text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle
                cx="18"
                cy="5"
                r="3"
              />
              <circle
                cx="6"
                cy="12"
                r="3"
              />
              <circle
                cx="18"
                cy="19"
                r="3"
              />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            <ShareButtons
              url={url}
              title={title}
              description={executiveSummary}
            />
          </div>
        </div>
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}

interface SeoData {
  featuredImage: {
    publicURL: string;
  };
  title: string;
  executiveSummary: string;
  keywords: string;
}

export const Head: HeadFC = ({ data, location }) => {
  const {
    markdownRemark: {
      frontmatter: { featuredImage, title, executiveSummary, keywords },
    },
  } = data as any;

  return (
    <SEO
      title={title}
      description={executiveSummary}
      keyWords={keywords.split(',')}
      pathname={location.pathname}
      image={featuredImage.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        slug
        title
        executiveSummary
        keywords
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
    }
  }
`;

const minutesToRead = (text: string) => {
  const wordsPerMinute = 250;

  const numberOfWords = text.replace(/<[^>]*>/g, '').split(/\s/g).length;
  return `${Math.ceil(numberOfWords / wordsPerMinute)} min read`;
};
