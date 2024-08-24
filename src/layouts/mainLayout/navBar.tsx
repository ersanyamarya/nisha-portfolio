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

const NavigationBar = styled.nav({
  '&.shadow': {
    transition: 'var(--transition-ease)',
    boxShadow: 'var(--elevation-light)',
    backdropFilter: 'blur(5px)',
  },
});

const Overlay = styled.div({
  position: 'fixed',
  top: '0',
  left: '-100%',
  // padding: '1rem 0rem 1.5rem 0rem ',
  // background: 'var(--color-secondary-0)',
  // zIndex: 100,
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // opacity: 0,
  // width: '100%',
  // transition: 'all 0.2s ease-in-out',
  // boxShadow: 'var(--elevation-light)',
  // '@media only screen and (min-width: 920px)': {
  //   display: 'none',
  // },
  '&.visible': {
    opacity: 1,
    left: '0',
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
      <NavigationBar
        className={`${scrollPosition > 0 ? 'shadow' : ''} bg-transparent sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between px-8 transition-[all]`}>
        <div>
          <Logo />
        </div>

        <button
          onClick={() => {
            setOverlayVisible(true);
          }}
          className="block w-10 cursor-pointer border-none bg-none p-1 sm:hidden">
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
        </button>

        {/* <pre>{scrollPosition}</pre> */}
        <nav className="hidden flex-row items-center justify-between sm:flex">
          {NAVIGATION_LINKS.map(link => (
            <Link
              className="hover:text-shadow px-4 text-primary-500 transition-[all] sm:px-4 sm:py-4"
              activeClassName="active"
              to={link.path}
              key={link.name}>
              {link.name}
            </Link>
          ))}
          <button
            className="rounded-lg bg-primary px-4 py-2 text-primary-50"
            onClick={() => {
              setShowContact(true);
            }}>
            Contact Me
          </button>
        </nav>
        <Overlay className={`${isOverlayVisible ? 'visible' : ''} flex w-full flex-col gap-4 bg-primary-50 pb-8`}>
          <div className="bg-transparent flex w-full flex-row items-center justify-between p-4">
            <Logo />
            <button
              onClick={() => {
                setOverlayVisible(false);
              }}
              className="w-10 cursor-pointer border-none bg-none p-1">
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
            </button>
          </div>
          {NAVIGATION_LINKS.map(link => (
            <Link
              className="hover:text-shadow px-4 text-xl text-primary transition-[all] sm:px-4 sm:py-4"
              activeClassName="active"
              to={link.path}
              key={link.name}
              onClick={() => {
                setOverlayVisible(false);
              }}>
              {link.name}
            </Link>
          ))}
          <button
            className="mx-auto w-2/3 rounded-lg bg-primary px-4 py-2 text-primary-50"
            onClick={() => {
              setShowContact(true);
            }}>
            Contact Me
          </button>
        </Overlay>
      </NavigationBar>
    </>
  );
}
