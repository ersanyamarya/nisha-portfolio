import styled from '@emotion/styled'
import React from 'react'
import useScrollPosition from '../../hooks/useScrollPosition'

const NAVIGATION_LINKS = [
  {
    name: 'Home',
    path: '/#hero',
  },
  {
    name: 'Projects',
    path: '/#projects',
  },
  {
    name: 'Contact',
    path: '/#contact',
  },
]

const NavSliderContainer = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 'fit-content',
  position: 'fixed',
  top: 'calc(50% - 20rem)',
  gap: '1rem',
  zIndex: 1,
  transition: 'var(--transition-ease)',
  opacity: 0,
  left: '-100%',

  '&.show': {
    opacity: 1,
    left: '0%',
  },
  '& > a': {
    position: 'relative',
    padding: '0.5rem 2rem 0.5rem 3rem',
    backgroundColor: 'var(--color-primary-500)',
    color: 'var(--color-secondary-0)',
    borderRadius: 'var(--dim-round-corner)',
    left: '-50%',
    transition: 'var(--transition-ease)',
  },

  '@media only screen and (max-width: 920px)': {
    display: 'none',
  },

  '&:hover': {
    '& > a:hover': {
      left: '0%',
    },
  },
})

export default function NavSlider() {
  const scrollPosition = useScrollPosition()
  return (
    <NavSliderContainer className={scrollPosition > 215 ? 'show' : ''}>
      {NAVIGATION_LINKS.map(link => (
        <a href={link.path} key={link.name} className="text-style-heading-h-5-semi-bold">
          {link.name}
        </a>
      ))}
    </NavSliderContainer>
  )
}
