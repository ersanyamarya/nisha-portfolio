import { HeadFC, PageProps, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { BlogCard, SEO } from '../../components';
import Layout from '../../layouts/mainLayout';

export default function Blog({ data }: PageProps<Queries.Query>) {
  let blogs = data.allMarkdownRemark.nodes as any[];
  blogs = blogs.sort(dateSort).filter(dataFilterShowDatedOnlyBeforeToday);

  return (
    <>
      <Layout>
        <div className="mx-auto flex min-h-[calc(100vh-36rem)] w-[80vw] max-w-[1360px] min-w-[320px] flex-col items-start justify-start gap-12 py-16">
          <h1 className="text-[3.25rem] leading-[3.25rem] font-medium">Blogs</h1>
          {blogs.map((part, index) => {
            const featuredImg = getImage(part.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData as any);
            const reverse = index % 2 === 0;

            return (
              <BlogCard
                title={part.frontmatter?.title || 'title'}
                slug={part.frontmatter?.slug || 'slug'}
                executiveSummary={part.frontmatter?.executiveSummary || 'description'}
                image={featuredImg}
                date={part.frontmatter?.date || 'date'}
                reverse={reverse}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { kind: { eq: "blog" } } }) {
      nodes {
        frontmatter {
          title
          slug
          executiveSummary
          date
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 600)
            }
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title=" Blog" />;

// Sort function for blogs comparing the date
function dateSort(a: { frontmatter: { date: string } }, b: { frontmatter: { date: string } }) {
  const dateA = new Date(a.frontmatter?.date);
  const dateB = new Date(b.frontmatter?.date);
  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
}

function dataFilterShowDatedOnlyBeforeToday(a: { frontmatter: { date: string } }) {
  const dateA = new Date(a.frontmatter?.date);
  const dateB = new Date();
  return dateA < dateB;
}
