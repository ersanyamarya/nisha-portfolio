import React from 'react';
import { SocialIcons } from '../../components';
import '../layout.css';
import Footer from './footer';
import NavBar from './navBar';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {/* <SocialLinksContainer showEmail={false} /> */}
      <SocialIcons
        className="bg-primary-0 fixed left-1 top-1/2 z-10 hidden -translate-y-1/2 transform flex-col gap-4 rounded-lg p-4 shadow-lg md:flex"
        showEmail={false}
      />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </>
  );
}
