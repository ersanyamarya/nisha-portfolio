import styled from '@emotion/styled'
import { HeadFC, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { SEO } from '../components'
import Layout from '../layouts/mainLayout'
import Contact from '../sections/contact'

interface DetailsProps extends PageProps {
  pageContext: {
    name: string
    description: string
    hiddenDescription: string
    keyWords: string[]
    image: string
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
  '& *': {
    color: 'var(--color-primary-500)',
  },
  '& h1,h2': {
    textAlign: 'center',
    padding: '0 2rem',
  },
})
const DetailContainer = styled.article({
  maxWidth: '1400px',
  margin: '0 auto',
  boxShadow: 'var(--elevation-paper)',
  borderRadius: 'var(--dim-round-corner)',
})
export default function Details({ pageContext }: DetailsProps) {
  const { images, name, description, hiddenDescription } = pageContext

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
          <h1 className="text-style-heading-h-1-semi-bold">{name}</h1>
          <h2 className="text-style-heading-h-2-regular"> {description}</h2>
          {/* A hidden paragraph which can only be read by Search engines */}
          <p style={{ display: 'none' }}>{hiddenDescription}</p>
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
  const { image, name, description, keyWords } = pageContext as DetailsProps['pageContext']

  return <SEO title={name} description={description} keyWords={keyWords} pathname={location.pathname} image={image} />
}
