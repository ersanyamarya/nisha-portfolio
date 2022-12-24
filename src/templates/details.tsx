import React from 'react'
// import { graphql } from 'gatsby'
import Contact from '../sections/contact'
import Layout from '../layouts/mainLayout'
import { HeadFC, PageProps } from 'gatsby'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import { SEO } from '../components'

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
  boxShadow: 'var(--elevation-paper)',
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

export const Head: HeadFC = ({ location, pageContext }) => {
  const pC = { ...pageContext } as DetailsProps['pageContext']
  const projectName = camelCaseToTitle(pC.name)
  return (
    <SEO
      title={projectName}
      description={`Details of ${projectName} project to be displayed here.`}
      keyWords={[projectName, 'project', 'details']}
      pathname={location.pathname}
    />
  )
}
