import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const VisionarAIPreviewCard = styled(Link)({
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

  '& .winner-tag': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '55%',
    left: '6%',
  },

  '& .logo': {
    transform: 'scale(1)',
    top: '22%',
    left: '6%',
  },

  '& .desktop': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '0%',
    left: '48%',
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

    '& .winner-tag': {
      transform: 'translate(0%, 0%) scale(1.5)',
      top: '78%',
      left: '31.5%',
    },
    '& .logo': {
      transform: 'scale(1.5)',
      top: '30%',
      left: '31.5%',
    },
    '& .desktop': {
      transform: 'scale(1.4)',
      top: '32%',
      left: '86%',
    },
    '&:hover > .graphics': {
      height: 'fill-available',
      width: 'fill-available',
      top: '0%',
      left: '0%',
    },

    '&:hover > .winner-tag': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '55%',
      left: '6%',
    },

    '&:hover > .logo': {
      transform: 'scale(1)',
      top: '22%',
      left: '6%',
    },

    '&:hover > .desktop': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '0%',
      left: '48%',
    },
  },
})

export function VisionarAI({}) {
  return (
    <VisionarAIPreviewCard to="/projects/visionari">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/visionari/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="desktop"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/visionari/desktop.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="winner-tag"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/visionari/winner-tag.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/visionari/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </VisionarAIPreviewCard>
  )
}
