import styled from '@emotion/styled';
import React from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';

import { MqtizerApp } from './mqtizerApp';
import { MqtizerWeb } from './mqtizerWeb';
import { RollingAhead } from './rollingAhead';
import { VisionarAI } from './visionarai';
import { WatchAndBite } from './watchAndBite';

const CardContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  rowGap: '5vh',
  gap: '5vh',
  opacity: 0,
  transform: 'translateY(100%)',
  transition: 'var(--transition-ease)',

  '@media (max-width: 600px)': {
    transform: 'translateY(0rem)',
    opacity: 1,
  },

  '&.show': {
    transform: 'translateY(0rem)',
    opacity: 1,
  },

  // '&:hover > :not(:hover) ': {
  //   // transform: 'scale(0.6)',
  //   opacity: 0.5,
  // },
  // '&:hover ': {
  //   rowGap: '1vh',
  //   gap: '1vh',
  // },
});

export default function ProjectsSection() {
  const scrollPosition = useScrollPosition();
  return (
    <section
      id="projects"
      className="gap-10vh flex w-full flex-col items-center">
      <h2 className="text-5xl">Projects</h2>
      <CardContainer className={scrollPosition > 50 ? 'show' : ''}>
        <MqtizerApp />
        <VisionarAI />
        <MqtizerWeb />
        <RollingAhead />
        <WatchAndBite />
      </CardContainer>
    </section>
  );
}
