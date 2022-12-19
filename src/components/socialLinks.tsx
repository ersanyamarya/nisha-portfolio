import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
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

type SocialLinkProps = {
  socialLinks: SocialLink[]
}

export function SocialLinks({ socialLinks }: SocialLinkProps) {
  return (
    <SocialLinksContainer>
      {socialLinks.map(
        social =>
          social.link && (
            <SocialIcon href={social.link} key={social.id} target="_blank">
              <GatsbyImage image={social.logo} alt={social?.name || 'social link'} />
            </SocialIcon>
          )
      )}
    </SocialLinksContainer>
  )
}
