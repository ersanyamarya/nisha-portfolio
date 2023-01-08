import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const PawsProjectPreviewCard = styled(Link)({
  borderRadius: 'var(--dim-round-corner-large)',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  transition: 'var(--transition-slow)',
  position: 'relative',
  overflow: 'hidden',
  width: '808px',
  height: '632px',
  maxWidth: '100vw',
  maxHeight: '100vw',
  transform: 'scale(0.95)',

  '& .graphics': {
    height: 'fill-available',
    width: 'fill-available',
    top: '0%',
    left: '0%',
  },

  '& .logo': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '15%',
    left: '10%',
  },

  '& .description': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '33%',
    left: '10%',
  },

  '& .mobile': {
    transform: 'scale(1)',
    top: '-4%',
    right: '-2%',
  },

  '& .desktop': {
    transform: 'scale(1)',
    top: '60%',
    left: '15%',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
  },

  '@media (max-width: 600px)': {
    '& > .gatsby-image-wrapper': {
      zoom: '50%',
    },
  },

  '@media (min-width: 600px)': {
    '&:hover': {
      transform: 'scale(1)',
      boxShadow: 'var(--elevation-focus)',
    },

    '& .graphics': {
      top: '-15%',
      left: '-15%',
    },

    '& .logo': {
      top: '18%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1.2)',
    },

    '& .description': {
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1.2)',
    },

    '& .mobile': {
      transform: 'scale(0.9)',
      top: '10%',
      right: '-10%',
    },

    '& .desktop': {
      transform: 'scale(0.9)',
      top: '38%',
      left: '25%',
    },

    '&:hover > .graphics': {
      top: '0%',
      left: '0%',
    },

    '&:hover > .logo': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '15%',
      left: '10%',
    },

    '&:hover > .description': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '33%',
      left: '10%',
    },

    '&:hover > .mobile': {
      transform: 'scale(1)',
      top: '-4%',
      right: '-2%',
    },

    '&:hover > .desktop': {
      transform: 'scale(1)',
      top: '60%',
      left: '15%',
    },
  },
})

export function PawsAndClaws({}) {
  return (
    <PawsProjectPreviewCard to="/projects/pawsAndClaws/">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/pawsAndClaws/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/pawsAndClaws/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="description"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/pawsAndClaws/description.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="mobile"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/pawsAndClaws/mobile.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="desktop"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/pawsAndClaws/desktop.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </PawsProjectPreviewCard>
  )
}
