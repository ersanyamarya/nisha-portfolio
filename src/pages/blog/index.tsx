import styled from '@emotion/styled'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import { BlogCard, SEO } from '../../components'
import Layout from '../../layouts/mainLayout'
import Contact from '../../sections/contact'
const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 3rem;
  width: 80vw;
  min-height: calc(100vh - 36rem);
  max-width: 1360px;
  min-width: 320px;
  margin: 0 auto;
  padding: 4rem 0;
  h1 {
    font-size: 3.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 3.25rem;
  }
`
export default function Blog({ data }: PageProps<Queries.Query>) {
  let blogs = data.allMarkdownRemark.nodes as any[]
  blogs = blogs.sort(dateSort).filter(dataFilterShowDatedOnlyBeforeToday)

  return (
    <>
      <Layout>
        <BlogsContainer>
          <h1>Blogs</h1>
          {blogs.map((part, index) => {
            const featuredImg = getImage(part.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData as any)
            const reverse = index % 2 === 0

            return (
              <BlogCard
                title={part.frontmatter?.title || 'title'}
                slug={part.frontmatter?.slug || 'slug'}
                executiveSummary={part.frontmatter?.executiveSummary || 'description'}
                image={featuredImg}
                date={part.frontmatter?.date || 'date'}
                reverse={reverse}
              />
            )
          })}
        </BlogsContainer>
      </Layout>
    </>
  )
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
`

export const Head: HeadFC = () => <SEO title=" Blog" />

// Sort function for blogs comparing the date
function dateSort(a: { frontmatter: { date: string } }, b: { frontmatter: { date: string } }) {
  const dateA = new Date(a.frontmatter?.date)
  const dateB = new Date(b.frontmatter?.date)
  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
}

function dataFilterShowDatedOnlyBeforeToday(a: { frontmatter: { date: string } }) {
  const dateA = new Date(a.frontmatter?.date)
  const dateB = new Date()
  return dateA < dateB
}
