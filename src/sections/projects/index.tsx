import styled from '@emotion/styled'
import React from 'react'
import useScrollPosition from '../../hooks/useScrollPosition'
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
  opacity: 0,
  transform: 'translateY(100%)',
  transition: 'var(--transition-ease)',
  // '& > *': {
  //   opacity: 0.3,

  //   transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
  // },

  // '& > :nth-child(odd)': {
  //   marginLeft: '-100rem',
  // },

  // '& > :nth-child(even)': {
  //   marginRight: '-100rem',
  // },

  // '&.show > *': {
  //   margin: '0rem',
  //   opacity: 1,
  // },

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
})

export default function ProjectsSection() {
  const scrollPosition = useScrollPosition()
  return (
    <ProjectsContainer id="projects">
      <h2 className="text-style-heading-h-1-semi-bold">Projects</h2>
      <CardContainer className={scrollPosition > 300 ? 'show' : ''}>
        <IGuide />
        <PawsAndClaws />
        <WatchAndBite />
      </CardContainer>
    </ProjectsContainer>
  )
}
