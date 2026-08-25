import React from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';

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
];

export default function NavSlider() {
  const scrollPosition = useScrollPosition();
  const show = scrollPosition > 215;

  return (
    <nav
      className={`fixed top-[calc(50%-20rem)] z-[1] flex w-fit flex-col justify-between gap-4 transition-[var(--transition-ease)] max-[920px]:hidden ${
        show ? 'left-0 opacity-100' : 'left-[-100%] opacity-0'
      } [&>a]:relative [&>a]:left-[-50%] [&>a]:rounded-[var(--dim-round-corner)] [&>a]:bg-primary-500 [&>a]:px-8 [&>a]:py-2 [&>a]:text-[color:var(--color-secondary-0)] [&>a]:transition-[var(--transition-ease)] [&>a:hover]:left-0`}>
      {NAVIGATION_LINKS.map(link => (
        <a
          href={link.path}
          key={link.name}
          className="text-lg font-semibold">
          {link.name}
        </a>
      ))}
    </nav>
  );
}
