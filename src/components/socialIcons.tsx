import styled from '@emotion/styled'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const SocialIcon = styled.a({
  width: '40px',
  height: '40px',
  transition: 'var(--transition-ease)',
  '&:hover': {
    transform: 'scale(1.5)',
  },
})

export function SocialIcons({ ...props }) {
  return (
    <div {...props}>
      <SocialIcon href="https://www.behance.net/nisha-kumari-de" target="_blank">
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
    </div>
  )
}
