import * as React from 'react'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import styled from '@emotion/styled'
import Layout from '../../layouts/mainLayout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ShareButtons from '../../components/blog/share_button'
import { SEO } from '../../components'
const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1.4rem;
  width: 80vw;
  max-width: 1024px;
  min-width: 320px;
  margin: 0 auto;
  padding: 4rem 0;

  .gatsby-image-wrapper {
    width: 100%;
    border-radius: 8px;
    padding: 0;
    margin: auto;
    margin-bottom: 0rem;
  }

  .share-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    position: relative;

    .share {
      color: #191c1e;
      padding: 2rem;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;

      :hover .modal-wrapper {
        display: flex;
        top: 4rem;
        right: 1rem;
        position: absolute;
      }
    }
  }

  .html-content {
    & :is(h2, h3, h4, h5, h6) {
      font-style: normal;
      font-weight: 600;
      margin: 4rem 0 2rem 0;
    }

    h1 {
      font-weight: 600;
      color: #191c1e;
      font-size: 3.25rem;
      line-height: 4rem;
      padding: 1rem 0;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 2.25rem;
      line-height: 2.25rem;
    }
    h3 {
      font-size: 1.75rem;
      line-height: 2.25rem;
    }

    h4 {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    a {
      font-weight: 400;
      font-style: italic;
      :hover {
        text-shadow: 0px 0px 1px #191c1eaa;
      }
    }

    ul {
      list-style-type: none;
      li {
        font-size: 1.2rem;
        line-height: 2rem;
      }
      li::before {
        content: '👉';
        color: #00115a;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-right: 1rem;
        margin-left: 1rem;
      }
      padding-bottom: 2rem;
    }

    .gatsby-resp-image-wrapper {
      // margin: 2rem 0;
      border-radius: 80px;
      aspect-ratio: 9/1;
      img {
        // object-fit: cover !important;
        // aspect-ratio: 9/6 auto;
      }
    }
    p {
      font-size: 1.5rem;
      line-height: 1.75rem;
      margin-bottom: 2rem;
      font-weight: 300;
      text-align: justify;
    }
  }
`
const AuthorCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 8px;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin: auto;
    object-fit: scale-down;
  }
  .information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.2rem;
    height: 100%;
    .name {
      font-size: 1.3rem;
      font-style: normal;
      font-weight: 600;
    }
    .sub {
      font-weight: 300;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      row-gap: 0rem;
      flex-wrap: wrap;
    }
  }
`
export default function BlogPostTemplate({ data, location: { href: url } }: PageProps<Queries.Query>) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark as any
  const { featuredImage, title, executiveSummary, date } = frontmatter
  const featuredImg = getImage(featuredImage?.childImageSharp?.gatsbyImageData as any) as any
  return (
    <Layout>
      <BlogContainer>
        <GatsbyImage image={featuredImg} alt={title} aria-placeholder={title} />
        <div className="share-row">
          <AuthorCard>
            <img
              src="https://nishakumari.art/static/3ac0be86d11bc04145b23b3a655962e5/6e082/person.webp"
              alt={title}
              aria-placeholder={title}
            />
            <div className="information">
              <span className="name">NIsha Kumari</span>
              <span className="sub">
                {date} · <span>{minutesToRead(html)}</span>
              </span>
            </div>
          </AuthorCard>
          <div className="share">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            <ShareButtons url={url} title={title} description={executiveSummary} />
          </div>
        </div>
        <div className="html-content" dangerouslySetInnerHTML={{ __html: html }} />
      </BlogContainer>
    </Layout>
  )
}

interface SeoData {
  featuredImage: {
    publicURL: string
  }
  title: string
  executiveSummary: string
  keywords: string
}

export const Head: HeadFC = ({ data, location }) => {
  const {
    markdownRemark: {
      frontmatter: { featuredImage, title, executiveSummary, keywords },
    },
  } = data as any

  return (
    <SEO
      title={title}
      description={executiveSummary}
      keyWords={keywords.split(',')}
      pathname={location.pathname}
      image={featuredImage.publicURL}
    />
  )
}

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
`

const minutesToRead = (text: string) => {
  const wordsPerMinute = 250

  const numberOfWords = text.replace(/<[^>]*>/g, '').split(/\s/g).length
  return `${Math.ceil(numberOfWords / wordsPerMinute)} min read`
}
