import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Project } from '../../utils/contentfulBaseData'

const ProjectsContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80vw',
  margin: '0 auto',
  gap: '10vh',
})

const CardContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  rowGap: '10vh',
  gap: '10vh',

  '&:hover > :hover ': {
    boxShadow: 'var(--elevation-focus)',
  },
})

const ProjectCard = styled.div({
  position: 'relative',
  width: '500px',
  height: '400px',
  maxWidth: '80vw',

  zIndex: 0,
  overflow: 'hidden',
  margin: '0 auto',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  opacity: 1,
  transition: 'var(--transition-ease)',
  borderRadius: 'var(--dim-round-corner-large)',
  //   '@media only screen and (max-width: 920px)': {
  //     width: '500px',
  //     height: '400px',
  //   },
  '& > h3': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--color-primary-500)',
    backgroundBlendMode: 'multiply',
    color: 'var(--color-primary-0)',
    zIndex: 1,
    opacity: 1,
    transition: 'var(--transition-ease)',
  },
  '& > p': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    padding: '2rem',
    zIndex: 1,
    opacity: 0,
    backgroundColor: 'var(--color-secondary-500)',
    color: 'var(--color-secondary-0)',
    transition: 'var(--transition-ease)',
  },

  '&:hover > h3': {
    opacity: 0,
  },

  '&:hover > p': {
    opacity: 1,
  },

  '& > .img': {
    width: 'fill-available',
    height: 'fill-available',
    transition: 'var(--transition-ease)',
  },
  '&:hover > .img': {
    transform: 'scale(1.3)',
    marginLeft: '30%',
  },
})

type ProjectsSectionProps = {
  projects: Project[]
}
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <ProjectsContainer id="projects">
      <h2 className="text-style-heading-h-1-regular">Projects</h2>
      <CardContainer>
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <h3>{project.name}</h3>
            <GatsbyImage className="img" image={project.cardCover} alt={project?.name || 'social link'} />

            <p className="text-style-heading-h-5-regular">{project.shortDescription}</p>
          </ProjectCard>
        ))}
      </CardContainer>
    </ProjectsContainer>
  )
}
