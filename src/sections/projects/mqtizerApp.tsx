import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const MqtizerAppPreviewCard = styled(Link)({
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

  '& .content': {
    transform: 'translate(0%, 0%) scale(1.2)',
    top: '24%',
    left: '2%',
  },

  '& .android': {
    transform: 'translate(0%, 0%) scale(1.1)',
    top: '28%',
    left: '42%',
  },

  '& .iphone': {
    transform: 'translate(0%, 0%) scale(1.1)',
    top: '36%',
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

    '& .content': {
      transform: 'translate(0%, 0%) scale(1.4)',
      top: '24%',
      left: '16%',
    },

    '& .android': {
      transform: 'scale(0.8)',
      top: '38%',
      left: '60%',
    },

    '& .iphone': {
      transform: 'scale(0.8)',
      top: '38%',
      left: '50%',
    },

    '&:hover > .graphics': {
      height: 'fill-available',
      width: 'fill-available',
      top: '0%',
      left: '0%',
    },

    '&:hover > .content': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '24%',
      left: '2%',
    },

    '&:hover > .android': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '24%',
      left: '36%',
    },

    '&:hover > .iphone': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '30%',
      left: '42%',
    },
  },
})

export function MqtizerApp({}) {
  return (
    <MqtizerAppPreviewCard to="/projects/mqtizerApp">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/mqtizer/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="content"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizer/content.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="iphone"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizer/iphone.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="android"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizer/android.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </MqtizerAppPreviewCard>
  )
}
