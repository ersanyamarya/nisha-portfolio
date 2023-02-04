import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const RollingAheadProjectPreviewCard = styled(Link)({
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
    transform: 'translate(0%, 0%) scale(1.6)',
    top: '5%',
    left: '32%',
  },

  '& .description': {
    transform: 'translate(0%, 0%) scale(1.6)',
    top: '14%',
    left: '28%',
  },

  '& .desktop': {
    transform: 'scale(1)',
    top: '30%',
    left: '2%',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
    zoom: '25%',
  },

  '@media (max-width: 600px)': {
    '& > .gatsby-image-wrapper': {
      zoom: '12.5%',
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
      transform: 'translate(0%, 0%) scale(1.8)',
      top: '8%',
      left: '38%',
    },

    '& .description': {
      transform: 'translate(0%, 0%) scale(1.8)',
      top: '20%',
      left: '32%',
    },

    '& .desktop': {
      transform: 'scale(1.3)',
      top: '45%',
      left: '32%',
    },

    '&:hover > .graphics': {
      height: 'fill-available',
      width: 'fill-available',
      top: '0%',
      left: '0%',
    },

    '&:hover > .logo': {
      transform: 'translate(0%, 0%) scale(1.45)',
      top: '4.5%',
      left: '36%',
    },

    '&:hover > .description': {
      transform: 'translate(0%, 0%) scale(1.45)',
      top: '14.5%',
      left: '32%',
    },

    '&:hover > .desktop': {
      transform: 'scale(0.95)',
      top: '22%',
      left: '6%',
    },
  },
})

export function RollingAhead({}) {
  return (
    <RollingAheadProjectPreviewCard to="/projects/rollingAhead/">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/rollingAhead/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/rollingAhead/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="description"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/rollingAhead/description.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="desktop"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/rollingAhead/desktop.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </RollingAheadProjectPreviewCard>
  )
}
