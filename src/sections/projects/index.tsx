import styled from '@emotion/styled'
import React from 'react'
import { IGuide } from './iGuide'
import { PawsAndClaws } from './pawsAndClaws'
import { WatchAndBite } from './watchAndBite'

const ProjectsContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  minHeight: 'calc(100vh - 10vh)',
  gap: '10vh',
})

const CardContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  rowGap: '5vh',
  gap: '5vh',

  // '&:hover > :not(:hover) ': {
  //   // transform: 'scale(0.6)',
  //   opacity: 0.5,
  // },
  // '&:hover ': {
  //   rowGap: '1vh',
  //   gap: '1vh',
  // },
})

export default function ProjectsSection() {
  return (
    <ProjectsContainer id="projects">
      <h2 className="text-style-heading-h-1-semi-bold">Projects</h2>
      <CardContainer>
        <IGuide />
        <PawsAndClaws />
        <WatchAndBite />
      </CardContainer>
    </ProjectsContainer>
  )
}
