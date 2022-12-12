import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Logo from './logo'
const StyledLink = styled(Link)({
  color: 'var(--color-on-primary-main)',
  fontSize: '1.25rem',
  padding: '0.8rem 1rem',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover:not(.active)': {
    color: 'var(--color-on-primary-light)',
  },
  '&.active': {
    borderBottom: '2px solid var(--color-on-primary-main)',
  },
})
const NavContainer = styled.nav({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '1rem 8rem',
  position: 'sticky',
  top: '0',
})
const NavLinks = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export default function NavBar() {
  return (
    <NavContainer>
      <Logo />
      <NavLinks>
        <StyledLink activeClassName="active" to="/#hero">
          Home
        </StyledLink>
        <StyledLink activeClassName="active" to="/#whyme">
          Why me
        </StyledLink>
        <StyledLink activeClassName="active" to="/#projects">
          Projects
        </StyledLink>
        <StyledLink activeClassName="active" to="/#contact">
          Contact
        </StyledLink>
      </NavLinks>
    </NavContainer>
  )
}
