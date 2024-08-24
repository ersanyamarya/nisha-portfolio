import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Logo } from '../../components';
import useScrollPosition from '../../hooks/useScrollPosition';
import Contact from '../../sections/contact';

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
    name: 'Blog',
    path: '/blog',
  },
];

const ContactMeButton = styled.button({
  padding: '1rem 3rem',
  marginLeft: '1rem',
  width: 'fit-content',
  cursor: 'pointer',
  border: 'none',
  borderRadius: 'var(--dim-round-corner-large)',
  backgroundColor: 'var(--color-primary-700)',
  color: 'var(--color-primary-0)',
  boxShadow: 'var(--elevation-surface)',
  transition: 'var(--transition-ease)',
  '&:hover': {
    boxShadow: 'var(--elevation-focus)',
  },
});

const StyledLink = styled(Link)({
  padding: '0 1rem',
  transition: 'var(--transition-ease)',
  color: 'var(--color-primary-500)',

  '&:hover': {
    textShadow: 'var(--elevation-surface)',
  },
  '@media only screen and (max-width: 920px)': {
    padding: '1rem',
  },
});
const NavigationBar = styled.nav({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0 8rem',
  height: 'var(--dim-nav-height)',
  maxHeight: 'var(--dim-nav-height)',
  position: 'sticky',
  top: '0',
  zIndex: 10,
  backgroundColor: 'transparent',
  // backdropFilter: 'blur(5px)',
  '@media only screen and (max-width: 920px)': {
    padding: '1rem',
    position: 'absolute',
  },
  '&.shadow': {
    transition: 'var(--transition-ease)',
    boxShadow: 'var(--elevation-light)',
    backdropFilter: 'blur(5px)',
  },
});
const NavLinks = styled.nav({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  '@media only screen and (max-width: 920px)': {
    display: 'none',
  },
});
const HamBurger = styled.button({
  width: '40px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'none',
  padding: '5px',
  '@media only screen and (max-width: 920px)': {
    display: 'block',
  },
});
const FullLogo = styled.div({
  display: 'block',
  // '@media only screen and (max-width: 920px)': {
  //   display: 'none',
  // },
});

const Overlay = styled.div({
  position: 'fixed',
  top: '0',
  left: '-100%',
  padding: '1rem 0rem 1.5rem 0rem ',
  background: 'var(--color-secondary-0)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  opacity: 0,
  width: '100%',
  transition: 'all 0.2s ease-in-out',
  '@media only screen and (min-width: 920px)': {
    display: 'none',
  },
  boxShadow: 'var(--elevation-light)',
  '&.visible': {
    opacity: 1,
    left: '0',
  },
  // CSS for button
  '& > button': {
    width: '80%',
    margin: '0 auto',
  },
});

export default function NavBar() {
  const [showContact, setShowContact] = React.useState(false);
  const scrollPosition = useScrollPosition();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  return (
    <>
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />
      <NavigationBar className={scrollPosition > 215 ? 'shadow' : ''}>
        <FullLogo>
          <Logo />
        </FullLogo>
        <HamBurger
          onClick={() => {
            setOverlayVisible(true);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 351.67">
            <path
              fillRule="nonzero"
              d="M0 0h512v23.91H0V0zm0 327.76h512v23.91H0v-23.91zm0-163.88h512v23.91H0v-23.91z"
            />
          </svg>
        </HamBurger>

        {/* <pre>{scrollPosition}</pre> */}
        <NavLinks>
          {NAVIGATION_LINKS.map(link => (
            <StyledLink
              className="text-style-heading-h-5-semi-bold"
              activeClassName="active"
              to={link.path}
              key={link.name}>
              {link.name}
            </StyledLink>
          ))}
          <ContactMeButton
            className="text-style-heading-h-5-semi-bold"
            onClick={() => {
              setShowContact(true);
            }}>
            Contact Me
          </ContactMeButton>
        </NavLinks>
        <Overlay className={isOverlayVisible ? 'visible' : ''}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '4rem',
              width: '100%',
              backgroundColor: 'transparent',
              padding: '1rem',
            }}>
            <Logo />

            <HamBurger
              onClick={() => {
                setOverlayVisible(false);
              }}>
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.878 122.88"
                enableBackground="new 0 0 122.878 122.88">
                <g>
                  <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                </g>
              </svg>
            </HamBurger>
          </div>
          {NAVIGATION_LINKS.map(link => (
            <StyledLink
              className="text-style-heading-h-5-semi-bold"
              activeClassName="active"
              to={link.path}
              key={link.name}
              onClick={() => {
                setOverlayVisible(false);
              }}>
              {link.name}
            </StyledLink>
          ))}
          <ContactMeButton
            className="text-style-heading-h-5-semi-bold"
            onClick={() => {
              setShowContact(true);
            }}>
            Contact Me
          </ContactMeButton>
        </Overlay>
      </NavigationBar>
    </>
  );
}
