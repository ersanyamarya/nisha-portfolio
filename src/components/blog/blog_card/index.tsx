import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

export type BlogCardProps = {
  title: string
  slug: string
  executiveSummary: string
  image: any
  date: string
  reverse?: boolean
}

const BlogCardWrapper = styled(Link)`
  display: flex;
  flex-direction: var(--direction);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  border-radius: 16px;
  background: #fefefe;
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.25);

  &: hover {
    box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.5);
    transform: scale(1.01);
  }

  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    gap: 0.8rem;
    h2 {
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: 3.25rem;
      color: #191c1e;
    }
    p {
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;
      color: #46464f;
    }
  }

  .image {
    flex: 1;
    padding: 2rem;
    .gatsby-image-wrapper {
      border-radius: 8px;
      padding: 0;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    .image {
      display: block;
      margin: 0;
      padding: 0;
      .gatsby-image-wrapper {
        border-radius: 8px 8px 0 0;
      }
    }
  }
`

const AuthorCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  p.name {
    font-size: 1rem;
    font-style: normal;
    font-weight: 900;
  }

  .gatsby-image-wrapper {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
  }
`
export function BlogCard({ title, slug, executiveSummary, image, date, reverse }: BlogCardProps) {
  return (
    <BlogCardWrapper
      to={`/blog/${slug}`}
      style={{
        // @ts-ignore
        '--direction': reverse ? 'row-reverse' : 'row',
      }}
      data-sal={reverse ? 'slide-right' : 'slide-left'}
      data-sal-delay="250"
      data-sal-easing="ease"
      data-sal-duration="250"
    >
      <div className="text">
        <h2>{title}</h2>
        <p>{executiveSummary}</p>
        <div className="divider"></div>
        <div className="info">
          <p>{date}</p>
        </div>
      </div>
      <div className="image">
        <GatsbyImage image={image} alt={title} aria-placeholder={title} />
      </div>
    </BlogCardWrapper>
  )
}
