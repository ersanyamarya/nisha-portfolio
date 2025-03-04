import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Logo } from '../../components';
import useScrollPosition from '../../hooks/useScrollPosition';
import Contact from '../../sections/contact';

const NAVIGATION_LINKS = [
  // {
  //   name: 'Home',
  //   path: '/',
  // },
  {
    name: 'Selected Work',
    path: '/#projects',
  },
  {
    name: 'Recommendations',
    path: '/#recommendations',
  },
  // {
  //   name: 'Blog',
  //   path: '/blog',
  // },
];

const NavigationBar = styled.nav({
  '&.shadow': {
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(239, 248, 255, 0.4)', // primary-50 with opacity
  },
});

const Overlay = styled.div({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: 'auto',
  transform: 'translateY(-100%)',
  opacity: 0,
  transition: 'all 0.3s ease-in-out',
  zIndex: 50,
  visibility: 'hidden',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  '&.visible': {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0)',
  },
});

const NavLink = styled(Link)({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '-2px',
    left: '50%',
    backgroundColor: 'var(--color-primary)',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '100%',
  },
  '&.active::after': {
    width: '100%',
  },
});

export default function NavBar() {
  const [showContact, setShowContact] = React.useState(false);
  const scrollPosition = useScrollPosition();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 0);
  }, [scrollPosition]);

  return (
    <>
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />
      <NavigationBar
        className={`${isScrolled ? 'shadow' : ''} sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between px-4 py-6 transition-all duration-300 md:px-8 lg:px-24`}>
        <div className="z-30">
          <Logo />
        </div>

        <button
          onClick={() => {
            setOverlayVisible(true);
          }}
          className="z-30 block w-10 cursor-pointer border-none bg-none p-1 transition-transform hover:scale-105 focus:outline-none sm:hidden"
          aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 351.67"
            className="text-primary">
            <path
              fillRule="nonzero"
              d="M0 0h512v23.91H0V0zm0 327.76h512v23.91H0v-23.91zm0-163.88h512v23.91H0v-23.91z"
            />
          </svg>
        </button>

        <nav className="hidden flex-row items-center justify-between gap-6 sm:flex">
          {NAVIGATION_LINKS.map(link => (
            <NavLink
              className="px-2 py-1 text-lg text-primary transition-all duration-300 hover:text-primary-800"
              activeClassName="active"
              to={link.path}
              key={link.name}>
              {link.name}
            </NavLink>
          ))}
          <a
            title="Resume"
            href="/Nisha_Kumari_Berlin_Resume.pdf"
            className="ml-2 rounded-md border border-primary-300 px-4 py-1.5 text-primary transition-all duration-300 hover:bg-primary-50 hover:shadow-md"
            target="_blank"
            rel="noopener noreferrer">
            Resume
          </a>
          <button
            className="ml-2 rounded-md bg-primary px-4 py-1.5 text-primary-50 transition-all duration-300 hover:bg-primary-700 hover:shadow-md focus:outline-none"
            onClick={() => {
              setShowContact(true);
            }}>
            Let's Talk
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isOverlayVisible && (
          <div
            className="fixed inset-0 z-40 bg-primary-950 bg-opacity-30"
            onClick={() => setOverlayVisible(false)}
          />
        )}

        <Overlay className={`${isOverlayVisible ? 'visible' : ''} flex w-full flex-col bg-primary-50`}>
          <div className="flex w-full flex-row items-center justify-between border-b border-primary-100 px-6 py-4">
            <Logo />
            <button
              onClick={() => {
                setOverlayVisible(false);
              }}
              className="z-50 w-10 cursor-pointer border-none bg-none p-1 transition-transform hover:scale-105 focus:outline-none"
              aria-label="Close menu">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.878 122.88"
                className="h-6 w-6 text-primary">
                <g>
                  <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                </g>
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-6 px-6 py-8">
            {NAVIGATION_LINKS.map(link => (
              <Link
                className="text-lg font-medium text-primary transition-all duration-300 hover:text-primary-800"
                activeClassName="text-primary-800"
                to={link.path}
                key={link.name}
                onClick={() => {
                  setOverlayVisible(false);
                }}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 px-6 pb-8">
            <a
              title="Resume"
              href="/Nisha_Kumari_Berlin_Resume.pdf"
              className="w-full rounded-md border border-primary-300 py-2.5 text-center text-primary transition-all duration-300 hover:bg-primary-50"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOverlayVisible(false);
              }}>
              Resume
            </a>
            <button
              className="w-full rounded-md bg-primary py-2.5 text-primary-50 transition-all duration-300 hover:bg-primary-700 hover:shadow-md focus:outline-none"
              onClick={() => {
                setShowContact(true);
                setOverlayVisible(false);
              }}>
              Let's Talk
            </button>
          </div>
        </Overlay>
      </NavigationBar>
    </>
  );
}
