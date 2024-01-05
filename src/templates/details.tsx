import styled from '@emotion/styled'
import { HeadFC, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { SEO } from '../components'
import Modal from '../components/modal'
import Layout from '../layouts/mainLayout'

interface DetailsProps extends PageProps {
  pageContext: {
    name: string
    description: string
    hiddenDescription: string
    keyWords: string[]
    image: string
    icon: Queries.File
    prototypeLink: string
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
  '@media only screen and (max-width: 920px)': {
    marginTop: 'calc(var(--dim-nav-height))!important',
  },
})

const ContextAction = styled.aside({
  position: 'fixed',
  top: '50%',
  right: '2%',
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  borderRadius: '100%',
  gap: '2rem',

  backgroundColor: 'var(--color-primary-500)',
  boxShadow: 'var(--elevation-dark)',
  transition: 'var(--transition-ease)',

  // hover
  '&:hover': {
    backgroundColor: 'var(--color-primary-600)',
    cursor: 'pointer',
    boxShadow: 'var(--elevation-dark-focus)',
    padding: '1.2rem',
  },

  WebkitAnimation: 'bounce-top 0.9s both',
  animation: 'bounce-top 0.9s both',

  '@media only screen and (max-width: 920px)': {
    // position: 'fixed',
    top: '90%',
    right: '5%',
    padding: '0.5rem',
  },
})
const DetailContainer = styled.article({
  maxWidth: '1400px',
  margin: '0 auto',
  boxShadow: 'var(--elevation-paper)',
  borderRadius: 'var(--dim-round-corner)',
})
export default function Details({ pageContext }: DetailsProps) {
  const { images, name, description, hiddenDescription, prototypeLink } = pageContext

  const [showEmbed, setShowEmbed] = useState(false)

  return (
    <>
      <Modal open={showEmbed} onClose={() => setShowEmbed(false)}>
        <iframe
          style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            flex: 1,
            width: '100%',
          }}
          // // width="800"
          // height="100%"
          src={prototypeLink}
          allowFullScreen
        ></iframe>
      </Modal>
      <Layout>
        <ContextAction
          onClick={() => {
            if (!window.matchMedia('(max-width: 920px)').matches) setShowEmbed(true)
            else window.open(prototypeLink, '_blank')
          }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_565_6467" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="var(--color-primary-0)" />
            </mask>
            <g mask="url(#mask0_565_6467)">
              <path d="M8 19V5L19 12L8 19Z" fill="var(--color-primary-0)" />
            </g>
          </svg>
        </ContextAction>
        <PageContainer>
          <h1 className="text-style-heading-h-1-semi-bold">{name}</h1>
          <h2 className="text-style-heading-h-3-regular"> {description}</h2>
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
