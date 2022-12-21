import styled from '@emotion/styled'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Project } from '../../utils/contentfulBaseData'

const ProjectsContainer = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  padding: '5vh 0',
  // padding: '2vh',
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

const IGuideProjectPreviewCard = styled.article({
  borderRadius: 'var(--dim-round-corner-large)',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  transition: 'var(--transition-slow)',
  position: 'relative',
  overflow: 'hidden',
  width: '808px',
  maxWidth: '808px',
  height: '632px',
  transform: 'scale(0.95)',

  '&:hover': {
    transform: 'scale(1)',
    boxShadow: 'var(--elevation-focus)',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
  },
  '& .graphics': {
    height: 'fill-available',
    width: 'fill-available',
    top: '-15%',
    left: '-15%',
  },

  '&:hover > .graphics': {
    top: '0%',
    left: '0%',
  },

  '& .logo': {
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .logo': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '5%',
    left: '15%',
  },

  '& .description': {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .description': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '20%',
    left: '10%',
  },

  '& .mobile': {
    transform: 'scale(0.9)',
    top: '10%',
    right: '-10%',
  },

  '&:hover > .mobile': {
    transform: 'scale(1)',
    top: '10%',
    right: '-2%',
  },

  '& .ipad': {
    transform: 'scale(0.9)',
    top: '50%',
    right: '10%',
  },

  '&:hover > .ipad': {
    transform: 'scale(1)',
    top: '50%',
    right: '12%',
  },

  '& .desktop': {
    transform: 'scale(0.9)',
    top: '50%',
    left: '-20%',
  },

  '&:hover > .desktop': {
    transform: 'scale(1)',
    top: '42%',
    left: '-10%',
  },
})

const PawsProjectPreviewCard = styled.article({
  borderRadius: 'var(--dim-round-corner-large)',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  transition: 'var(--transition-slow)',
  position: 'relative',
  overflow: 'hidden',
  width: '808px',
  maxWidth: '808px',
  height: '632px',
  transform: 'scale(0.95)',

  '&:hover': {
    transform: 'scale(1)',
    boxShadow: 'var(--elevation-focus)',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
  },

  '& .graphics': {
    height: 'fill-available',
    width: 'fill-available',
    top: '-15%',
    left: '-15%',
  },

  '&:hover > .graphics': {
    top: '0%',
    left: '0%',
  },

  '& .logo': {
    top: '18%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .logo': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '15%',
    left: '10%',
  },

  '& .description': {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1.2)',
  },

  '&:hover > .description': {
    transform: 'translate(0%, 0%) scale(1)',
    top: '33%',
    left: '10%',
  },

  '& .mobile': {
    transform: 'scale(0.9)',
    top: '10%',
    right: '-10%',
  },

  '&:hover > .mobile': {
    transform: 'scale(1)',
    top: '-4%',
    right: '-2%',
  },

  '& .desktop': {
    transform: 'scale(0.9)',
    top: '38%',
    left: '25%',
  },

  '&:hover > .desktop': {
    transform: 'scale(1)',
    top: '60%',
    left: '15%',
  },
})

const WatchProjectPreviewCard = styled.article({
  borderRadius: 'var(--dim-round-corner-large)',
  boxShadow: 'var(--elevation-surface)',
  cursor: 'pointer',
  transition: 'var(--transition-slow)',
  position: 'relative',
  overflow: 'hidden',
  width: '808px',
  maxWidth: '808px',
  height: '632px',
  transform: 'scale(0.95)',

  '&:hover': {
    transform: 'scale(1)',
    boxShadow: 'var(--elevation-focus)',
  },

  '& > .gatsby-image-wrapper': {
    position: 'absolute',
    transition: 'var(--transition-ease)',
  },

  '& .graphics': {
    height: 'fill-available',
    width: 'fill-available',
    top: '-15%',
    left: '-15%',
  },

  '&:hover > .graphics': {
    top: '0%',
    left: '0%',
  },

  '& .logo': {
    transform: 'scale(0.9)',
    top: '12%',
    left: '2%',
  },

  '&:hover > .logo': {
    transform: 'scale(1)',
    top: '24%',
    left: '5%',
  },

  '& .description': {
    transform: 'scale(0.9)',
    top: '22%',
    left: '2%',
  },

  '&:hover > .description': {
    transform: 'scale(1)',
    top: '35%',
    left: '5%',
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

  '& .desktop': {
    transform: 'scale(0.8)',
    left: '-150px',
    top: '-10px',
  },

  '&:hover > .desktop': {
    transform: 'scale(1)',
    left: '50px',
    top: '280px',
  },
})
type ProjectsSectionProps = {
  projects: Project[]
}
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <ProjectsContainer id="projects">
      <h2 className="text-style-heading-h-1-regular">Projects</h2>
      {/* <CardContainer>
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <h3>{project.name}</h3>
            <GatsbyImage className="img" image={project.cardCover} alt={project?.name || 'social link'} />

            <p className="text-style-heading-h-5-regular">{project.shortDescription}</p>
          </ProjectCard>
        ))}
      </CardContainer> */}
      <CardContainer>
        <IGuideProjectPreviewCard>
          <StaticImage
            className="graphics"
            placeholder="blurred"
            layout="constrained"
            src="../../images/iGuide/graphics.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="logo"
            placeholder="blurred"
            layout="fixed"
            src="../../images/iGuide/logo.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="description"
            placeholder="blurred"
            layout="fixed"
            src="../../images/iGuide/description.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="mobile"
            placeholder="blurred"
            layout="fixed"
            src="../../images/iGuide/mobile.svg"
            alt="A corgi smiling happily"
          />

          <StaticImage
            className="desktop"
            placeholder="blurred"
            layout="fixed"
            src="../../images/iGuide/desktop.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="ipad"
            placeholder="blurred"
            layout="fixed"
            src="../../images/iGuide/ipad.svg"
            alt="A corgi smiling happily"
          />
        </IGuideProjectPreviewCard>

        <PawsProjectPreviewCard>
          <StaticImage
            className="graphics"
            placeholder="blurred"
            layout="constrained"
            src="../../images/pawsAndClaws/graphics.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="logo"
            placeholder="blurred"
            layout="fixed"
            src="../../images/pawsAndClaws/logo.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="description"
            placeholder="blurred"
            layout="fixed"
            src="../../images/pawsAndClaws/description.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="mobile"
            placeholder="blurred"
            layout="fixed"
            src="../../images/pawsAndClaws/mobile.svg"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="desktop"
            placeholder="blurred"
            layout="fixed"
            src="../../images/pawsAndClaws/desktop.svg"
            alt="A corgi smiling happily"
          />
        </PawsProjectPreviewCard>
        <WatchProjectPreviewCard>
          <StaticImage
            className="graphics"
            placeholder="blurred"
            layout="constrained"
            src="../../images/watchAndBite/graphics.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="logo"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/logo.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="description"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/description.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="desktop"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/desktop.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="Screen-3"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/Screen-3.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="Screen-2"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/Screen-2.png"
            alt="A corgi smiling happily"
          />
          <StaticImage
            className="Screen-1"
            placeholder="blurred"
            layout="fixed"
            src="../../images/watchAndBite/Screen-1.png"
            alt="A corgi smiling happily"
          />
        </WatchProjectPreviewCard>
      </CardContainer>
    </ProjectsContainer>
  )
}
