import React from 'react'
// import { graphql } from 'gatsby'
import Contact from '../sections/contact'
import Layout from '../layouts/mainLayout'
import { PageProps } from 'gatsby'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

interface DetailsProps extends PageProps {
  pageContext: {
    name: string
    images: Queries.Query['allFile']['nodes']
  }
}
const PageContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3rem',
  '& h1': {
    color: 'var(--color-primary-500)',
  },
})
const DetailContainer = styled.article({
  maxWidth: '1400px',
  margin: '0 auto',
  // border: '1px solid var(--color-primary-500)',
  boxShadow: '8px 8px 10px -2.5px #dddddd, -8px -8px 10px -2.5px #dddddd',
  borderRadius: 'var(--dim-round-corner)',
})
export default function Details({ pageContext }: DetailsProps) {
  const projectSlug = pageContext.name
  const images = pageContext.images
  const projectName = camelCaseToTitle(projectSlug)
  const [showContact, setShowContact] = React.useState(false)

  return (
    <>
      <Contact open={showContact} onClose={() => setShowContact(false)} />
      <Layout
        openContactForm={() => {
          setShowContact(true)
        }}
      >
        <PageContainer>
          <h1 className="text-style-heading-h-1-semi-bold">{projectName}</h1>
          <DetailContainer>
            {images.map(image => {
              return (
                <GatsbyImage key={image.name} image={image?.childImageSharp?.gatsbyImageData as any} alt={image.name} />
              )
            })}
          </DetailContainer>
        </PageContainer>
      </Layout>
    </>
  )
}

const camelCaseToTitle = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase()
    })
    .trim()
}
