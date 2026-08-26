import { Link } from 'gatsby';
import { MenuIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '../../components';
import useScrollPosition from '../../hooks/useScrollPosition';
import Contact from '../../sections/contact';

const NAVIGATION_LINKS = [
  { name: 'Work', path: '/#work' },
  { name: 'Process', path: '/#process' },
  { name: 'About', path: '/#about' },
  { name: 'Kind words', path: '/#recommendations' },
];

const navLinkClasses =
  "relative text-sm font-medium tracking-wide uppercase text-foreground transition-colors duration-300 hover:text-primary after:absolute after:bottom-[-6px] after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 after:content-[''] hover:after:w-full";

export default function NavBar() {
  const [showContact, setShowContact] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const [scrollPct, setScrollPct] = useState(0);

  const isScrolled = scrollPosition > 8;

  useEffect(() => {
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollPct(max > 0 ? Math.min((scrollPosition / max) * 100, 100) : 0);
  }, [scrollPosition]);

  // The mobile sheet covers the page; letting the page scroll behind it feels broken.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />

      {/* Brew-progress line: how far down the pour you are. */}
      <div className="fixed top-0 right-0 left-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <header className="fixed top-0 right-0 left-0 z-40 px-4 py-4 md:px-8">
        <nav
          className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-300 md:px-6 ${
            isScrolled ? 'glass-panel' : 'border border-transparent bg-transparent'
          }`}>
          <Logo />

          <div className="hidden items-center gap-8 md:flex">
            {NAVIGATION_LINKS.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={navLinkClasses}
                activeClassName="text-primary">
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm">
                <a
                  title="Resume"
                  href="/Nisha_Kumari_Berlin_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
              <Button
                size="sm"
                onClick={() => setShowContact(true)}>
                Let's brew
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(open => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:text-primary focus:outline-none">
              {isMenuOpen ? (
                <XIcon
                  strokeWidth={1.5}
                  size={22}
                />
              ) : (
                <MenuIcon
                  strokeWidth={1.5}
                  size={22}
                />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <div
          className={`absolute top-24 right-4 left-4 flex flex-col gap-1 rounded-3xl p-4 glass-panel transition-all duration-300 md:hidden ${
            isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
          }`}>
          {NAVIGATION_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-accent hover:text-primary"
              activeClassName="text-primary">
              {link.name}
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
            <Button
              asChild
              variant="outline"
              size="lg">
              <a
                title="Resume"
                href="/Nisha_Kumari_Berlin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}>
                Resume
              </a>
            </Button>
            <Button
              size="lg"
              onClick={() => {
                setShowContact(true);
                closeMenu();
              }}>
              Let's brew
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-30 cursor-default bg-default-950/15 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
