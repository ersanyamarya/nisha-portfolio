import styled from '@emotion/styled'
import { HeadFC, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { SEO } from '../components'
import Layout from '../layouts/mainLayout'
import Contact from '../sections/contact'

const ProjectsLookup = {
  watchAndBite: {
    name: 'Watch And Bite',
    description: 'An Online Platform for Convenient Snack and Beverage Delivery at the Movies',
    hiddenDescription: `Watch and Bite is an online platform that allows movie-goers to easily order snacks and beverages from the comfort of their seats. With just a few clicks, users can have their favorite treats delivered right to their theater.
Watch and Bite also offers a convenient group ordering feature, allowing users to coordinate snack purchases with their friends and family. Users can even schedule their orders for the beginning or interval of their movie.
In addition to providing convenience, Watch and Bite also offers a range of filtering options to help users find exactly what they're looking for. Whether you're in the mood for a classic bag of popcorn or a refreshing beverage, Watch and Bite has you covered.`,
    keyWords: [
      'Online platform',
      'Snacks',
      'Beverages',
      'Movie',
      'Delivery',
      'Save time',
      'Budget constraints',
      'Filter settings',
      'Group orders',
      'Order together function',
      'Scheduling orders',
      'Cinemas',
      'Convenient',
      'Watch and bite',
      'Watch and bite app',
      'Watch and bite website',
      'Watch and bite mobile app',
      'Watch and bite mobile website',
      'Watch and bite online platform',
      'Watch and bite online app',
      'Movie theaters',
      'Snackpass',
      'Concessions on Demand',
      'Online ordering',
      'Theater snacks',
      'Theater drinks',
      'Group ordering',
      'Scheduling options',
      'Streamlined snack purchases',
      'Classic popcorn',
      'Refreshing beverages',
      'Concession stand',
      'Movie-goers',
    ],
    image: '/watchAndBiteThumbnail.png',
  },
}

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
  const images = pageContext.images

  const project = ProjectsLookup[pageContext.name as keyof typeof ProjectsLookup]

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
          <h1 className="text-style-heading-h-1-semi-bold">{project.name}</h1>
          <h2 className="text-style-heading-h-2-regular"> {project.description}</h2>
          {/* A hidden paragraph which can only be read by Search engines */}
          <p style={{ display: 'none' }}>{project.hiddenDescription}</p>
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
  const project = ProjectsLookup[pC.name as keyof typeof ProjectsLookup]

  return (
    <SEO
      title={project.name}
      description={project.description}
      keyWords={project.keyWords}
      pathname={location.pathname}
      image={project.image}
    />
  )
}
