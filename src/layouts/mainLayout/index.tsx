import React, { useEffect } from 'react';
import { AmbientBeans, CoffeeBean } from '../../components';
import '../layout.css';
import Footer from './footer';
import NavBar from './navBar';

interface LayoutProps {
  children: React.ReactNode;
}

/** Keeps `--scrollbar-w` in sync so full-bleed sections can size to the viewport's
 *  content width rather than 100vw, which counts the scrollbar in. */
function useScrollbarWidth() {
  useEffect(() => {
    const sync = () => document.documentElement.style.setProperty('--scrollbar-w', `${window.innerWidth - document.documentElement.clientWidth}px`);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);
}

export default function Layout({ children }: LayoutProps) {
  useScrollbarWidth();

  return (
    <>
      <AmbientBeans />
      <NavBar />
      {/* pt clears the fixed nav pill (h-16 + py-4). */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 md:px-8">{children}</div>
      <Footer />
      <CoffeeBean />
    </>
  );
}
