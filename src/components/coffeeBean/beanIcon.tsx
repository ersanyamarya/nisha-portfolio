import React from 'react';

export function BeanIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="bean-body"
          x1="10%"
          y1="0%"
          x2="90%"
          y2="100%">
          <stop
            offset="0%"
            stopColor="var(--color-primary-400)"
          />
          <stop
            offset="55%"
            stopColor="var(--color-primary-600)"
          />
          <stop
            offset="100%"
            stopColor="var(--color-primary-800)"
          />
        </linearGradient>
        <linearGradient
          id="bean-sheen"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%">
          <stop
            offset="0%"
            stopColor="#ffffff"
            stopOpacity="0.55"
          />
          <stop
            offset="100%"
            stopColor="#ffffff"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* body */}
      <path
        d="M50 4C74 4 92 30 92 66c0 40-22 70-42 70S8 106 8 66C8 30 26 4 50 4Z"
        fill="url(#bean-body)"
      />

      {/* top-left sheen, glassmorphism-style soft highlight */}
      <path
        d="M28 18C18 30 12 48 12 64c0 8 1 16 3 23-6-13-9-27-9-40C6 26 20 8 40 5c-5 3-9 8-12 13Z"
        fill="url(#bean-sheen)"
      />

      {/* center crease */}
      <path
        d="M50 10C43 26 40 46 40 66c0 24 6 46 16 62"
        fill="none"
        stroke="var(--color-primary-900)"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
