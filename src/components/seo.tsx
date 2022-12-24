import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

interface SEOProps {
  title?: string
  description?: string
  pathname?: string
  keyWords?: string[]
  children?: React.ReactNode
}

export function SEO({ title, description, pathname, keyWords, children }: SEOProps) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          linkedinUsername
          image
          siteUrl
          keyWords
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
    keyWords: defaultKeyWords,
  } = data.site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || '/'}`,
    twitterUsername,
    keyWords: [...defaultKeyWords, ...(keyWords || [])],
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keyWords} />

      {/* Canonical */}
      <link rel="canonical" href={seo.url} />

      {/* Twitter   */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      {/* Open Graph */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:locale" content="en_US" />

      {children}
    </>
  )
}
