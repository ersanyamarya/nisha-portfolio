import styled from '@emotion/styled'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { SocialLink } from '../utils/contentfulBaseData'

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
  zIndex: 1,
  //   boxShadow: 'var(--elevation-light)',
  width: 'fit-content',
  backgroundColor: 'var(--color-primary-0)',
  '@media only screen and (max-width: 920px)': {
    display: 'none',
  },
  '&:hover > :not(:hover) ': {
    opacity: 0.5,
  },
})
const SocialIcon = styled.a({
  width: '40px',
  height: '40px',
  transition: 'var(--transition-ease)',
  '&:hover': {
    transform: 'scale(1.5)',
  },
})

export function SocialLinks() {
  return (
    <SocialLinksContainer>
      <SocialIcon href="https://www.linkedin.com/in/sanyam-arya/" target="_blank">
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          src="../images/behance.png"
          alt="REPLACE WITH ACTUAL COPY"
        />
      </SocialIcon>
      <SocialIcon href="https://www.linkedin.com/in/nisha-kumari-de/" target="_blank">
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          src="../images/linkedin.png"
          alt="REPLACE WITH ACTUAL COPY"
        />
      </SocialIcon>
    </SocialLinksContainer>
  )
}
