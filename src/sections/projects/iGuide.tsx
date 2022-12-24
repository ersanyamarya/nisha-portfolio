import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const IGuideProjectPreviewCard = styled(Link)({
  borderRadius: 'var(--dim-round-corner-large)',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  transition: 'var(--transition-slow)',
  position: 'relative',
  overflow: 'hidden',
  width: '808px',
  maxWidth: '808px',
  height: '632px',
  transform: 'scale(0.95)',

  '&:hover': {
    transform: 'scale(1)',
    boxShadow: 'var(--elevation-focus)',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
  },
  '& .graphics': {
    height: 'fill-available',
    width: 'fill-available',
    top: '-15%',
    left: '-15%',
  },

  '&:hover > .graphics': {
    top: '0%',
    left: '0%',
  },

  '& .logo': {
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .logo': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '5%',
    left: '15%',
  },

  '& .description': {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .description': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '20%',
    left: '10%',
  },

  '& .mobile': {
    transform: 'scale(0.9)',
    top: '10%',
    right: '-10%',
  },

  '&:hover > .mobile': {
    transform: 'scale(1)',
    top: '10%',
    right: '-2%',
  },

  '& .ipad': {
    transform: 'scale(0.9)',
    top: '50%',
    right: '10%',
  },

  '&:hover > .ipad': {
    transform: 'scale(1)',
    top: '50%',
    right: '12%',
  },

  '& .desktop': {
    transform: 'scale(0.9)',
    top: '50%',
    left: '-20%',
  },

  '&:hover > .desktop': {
    transform: 'scale(1)',
    top: '42%',
    left: '-10%',
  },
})
export function IGuide({}) {
  return (
    <IGuideProjectPreviewCard to="/details/watchAndBite/">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/iGuide/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/iGuide/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="description"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/iGuide/description.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="mobile"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/iGuide/mobile.png"
        alt="REPLACE WITH ACTUAL COPY"
      />

      <StaticImage
        className="desktop"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/iGuide/desktop.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="ipad"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/iGuide/ipad.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </IGuideProjectPreviewCard>
  )
}
