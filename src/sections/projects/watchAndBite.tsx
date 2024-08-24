import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
const WatchProjectPreviewCard = styled(Link)({
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
    top: '0%',
    left: '0%',
    width: 'fill-available',
    height: 'fill-available',
  },

  '& .logo': {
    top: '24%',
    left: '5%',
  },

  '& .description': {
    top: '35%',
    left: '5%',
  },

  '& .Screen-3': {
    top: '32%',
    left: '35%',
  },
  '& .Screen-2': {
    top: '27%',
    left: '50%',
  },
  '& .Screen-1': {
    top: '22%',
    left: '65%',
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
      height: 'fill-available',
      width: 'fill-available',
      top: '-15%',
      left: '-15%',
    },

    '& .logo': {
      transform: 'scale(0.9)',
      top: '12%',
      left: '2%',
    },
    '& .description': {
      transform: 'scale(0.9)',
      top: '22%',
      left: '2%',
    },

    '& .Screen-3': {
      transform: 'rotate(5deg) scale(0.95)',
      top: '24.5%',
      left: '49.5%',
    },
    '& .Screen-2': {
      transform: 'rotate(0deg) scale(0.95)',
      top: '25.5%',
      left: '51.5%',
    },
    '& .Screen-1': {
      transform: 'rotate(-5deg) scale(0.95)',
      top: '25%',
      left: '50%',
    },
    '&:hover > .graphics': {
      top: '0%',
      left: '0%',
    },

    '&:hover > .logo': {
      transform: 'scale(1)',
      top: '24%',
      left: '5%',
    },

    '&:hover > .description': {
      transform: 'scale(1)',
      top: '35%',
      left: '5%',
    },

    '&:hover > .Screen-3': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '32%',
      left: '35%',
    },
    '&:hover > .Screen-2': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '27%',
      left: '50%',
    },
    '&:hover > .Screen-1': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '22%',
      left: '65%',
    },
  },
});

export function WatchAndBite({}) {
  return (
    <WatchProjectPreviewCard to="/projects/watchAndBite/">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/watchAndBite/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/watchAndBite/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="description"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/watchAndBite/description.png"
        alt="REPLACE WITH ACTUAL COPY"
      />

      <StaticImage
        className="Screen-3"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/watchAndBite/Screen-3.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="Screen-2"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/watchAndBite/Screen-2.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="Screen-1"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/watchAndBite/Screen-1.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </WatchProjectPreviewCard>
  );
}
