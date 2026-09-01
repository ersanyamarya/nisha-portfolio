import { MoonIcon, SunIcon } from 'lucide-react';
import React from 'react';
import useTheme, { originOf, ROAST_LABEL } from '../hooks/useTheme';

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<'button'> {}

export function ThemeToggle({ className = '', ...props }: ThemeToggleProps) {
  const { theme, next, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={e => toggleTheme(originOf(e.currentTarget))}
      aria-label={`Switch to ${ROAST_LABEL[next].toLowerCase()}`}
      title={ROAST_LABEL[next]}
      className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-default-200 bg-card text-muted-foreground transition-colors duration-300 hover:text-accent-foreground focus:outline-none ${className}`}
      {...props}>
      {theme === 'dark' ? (
        <SunIcon
          strokeWidth={1.5}
          size={18}
        />
      ) : (
        <MoonIcon
          strokeWidth={1.5}
          size={18}
        />
      )}
    </button>
  );
}
