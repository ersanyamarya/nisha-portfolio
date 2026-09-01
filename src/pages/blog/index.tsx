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
          {blogs.map((part, index) => (
            <BlogCard {...toBlogCardProps(part, index)} />
          ))}
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

function getFeaturedImage(frontmatter: any) {
  return getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData as any);
}

function toBlogCardProps(part: any, index: number) {
  const fm = part.frontmatter ?? {};
  return {
    title: fm.title || 'title',
    slug: fm.slug || 'slug',
    executiveSummary: fm.executiveSummary || 'description',
    image: getFeaturedImage(fm),
    date: fm.date || 'date',
    reverse: index % 2 === 0,
  };
}

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
