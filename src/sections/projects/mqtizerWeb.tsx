import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const MqtizerWebPreviewCard = styled(Link)({
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

  '& .header': {
    transform: 'translate(0%, 0%) scale(0.98)',
    top: '0%',
    left: '-3%',
  },

  '& .logo': {
    transform: 'scale(1.5)',
    top: '10%',
    left: '45%',
  },

  '& .desktop': {
    transform: 'translate(0%, 0%) scale(1.2)',
    top: '42%',
    left: '8%',
  },

  '& .iphone': {
    transform: 'translate(0%, 0%) scale(1.2)',
    top: '56%',
    left: '72%',
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

    '& .header': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '0%',
      left: '0%',
    },

    '& .desktop': {
      transform: 'scale(1.4)',
      top: '50%',
      left: '10%',
    },

    '& .iphone': {
      transform: 'scale(1)',
      top: '60%',
      left: '48%',
    },
    '& .logo': {
      transform: 'scale(1)',
      top: '10%',
      left: '43%',
    },
    '&:hover > .graphics': {
      height: 'fill-available',
      width: 'fill-available',
      top: '0%',
      left: '0%',
    },

    '&:hover > .header': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '0%',
      left: '0%',
    },

    '&:hover > .logo': {
      transform: 'scale(1.1)',
      top: '8%',
      left: '42%',
    },

    '&:hover > .desktop': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '28%',
      left: '8%',
    },

    '&:hover > .iphone': {
      transform: 'translate(0%, 0%) scale(1)',
      top: '48%',
      left: '72%',
    },
  },
});

export function MqtizerWeb({}) {
  return (
    <MqtizerWebPreviewCard to="/projects/mqtizerWeb">
      <StaticImage
        className="graphics"
        placeholder="blurred"
        layout="constrained"
        src="../../images/projects/mqtizerWeb/graphics.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="header"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizerWeb/header.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="logo"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizerWeb/logo.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="desktop"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizerWeb/desktop.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
      <StaticImage
        className="iphone"
        placeholder="blurred"
        layout="fixed"
        src="../../images/projects/mqtizerWeb/iphone.png"
        alt="REPLACE WITH ACTUAL COPY"
      />
    </MqtizerWebPreviewCard>
  );
}
