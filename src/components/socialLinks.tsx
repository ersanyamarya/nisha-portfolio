import styled from '@emotion/styled'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import React from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
const SocialLinksContainer = styled.aside({
  position: 'fixed',
  top: 'calc(50% - 5rem)',
  left: '1%',
  display: 'flex',
  padding: '0.5rem 1rem',
  borderRadius: 'var(--dim-round-corner-large)',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  boxShadow: 'var(--elevation-light)',
  width: 'fit-content',
  backgroundColor: 'var(--color-secondary-0)',
  '@media only screen and (max-width: 920px)': {
    display: 'none',
  },
})
const SocialIcon = styled.a({
  width: '40px',
  height: '40px',
  transition: 'var(--transition-ease)',
  '&:hover': {
    transform: 'scale(1.2)',
  },
})
export function SocialLinks() {
  const data: Queries.Query = useStaticQuery(graphql`
    query SocialLinksQuery {
      allContentfulSocialLinks {
        nodes {
          id
          name
          link
          logo {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  `)
  console.log(data)

  return (
    <SocialLinksContainer>
      {data.allContentfulSocialLinks.nodes.map(social => {
        const image = getImage(social.logo?.gatsbyImageData as IGatsbyImageData) as IGatsbyImageData
        return (
          social.link && (
            <SocialIcon href={social.link} key={social.id} target="_blank">
              <GatsbyImage image={image} alt={social?.name || 'social link'} />
            </SocialIcon>
          )
        )
      })}
    </SocialLinksContainer>
  )
}
