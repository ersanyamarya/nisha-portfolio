import styled from '@emotion/styled';
import React from 'react';
import { SocialIcons } from '../../components';
import '../layout.css';
import Footer from './footer';
import NavBar from './navBar';

const SocialLinksContainer = styled(SocialIcons)({
  '&:hover > :not(:hover) ': {
    opacity: 0.5,
  },
});
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <SocialLinksContainer
        className="fixed left-1 top-1/2 z-10 hidden -translate-y-1/2 transform flex-col gap-4 rounded-lg bg-primary-50 p-4 shadow-lg md:flex"
        showEmail={false}
      />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </>
  );
}
