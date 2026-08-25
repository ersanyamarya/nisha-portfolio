import React, { useEffect, useState } from 'react';

export interface CaseStudySection {
  id: string;
  label: string;
}

const HEADER_OFFSET = 96;
const TRIGGER_BUFFER = 24;

export function OnThisPageNav({ sections }: { sections: CaseStudySection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(sections[sections.length - 1]?.id);
        return;
      }
      const trigger = HEADER_OFFSET + TRIGGER_BUFFER;
      let currentId = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger + 1) {
          currentId = s.id;
        } else {
          break;
        }
      }
      setActiveId(currentId);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - (HEADER_OFFSET + TRIGGER_BUFFER);
    setActiveId(id);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      className="sticky hidden flex-col gap-1 lg:flex"
      style={{ top: `${HEADER_OFFSET}px` }}>
      <div className="mb-2 text-xs font-bold tracking-widest text-default-400">ON THIS PAGE</div>
      {sections.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={e => scrollToSection(s.id, e)}
          className={`border-l-2 py-1.5 pl-3.5 text-sm transition-colors ${
            activeId === s.id ? 'border-primary font-bold text-foreground' : 'border-transparent font-medium text-default-400 hover:text-muted-foreground'
          }`}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
