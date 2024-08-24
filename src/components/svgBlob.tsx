import React, { useEffect, useState } from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  paths: string[];
  duration?: number;
  animationInterval?: number;
  transitionStyle?: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear';
}

export function SvgBlob({ children, paths, duration = 3000, animationInterval, transitionStyle = 'linear', ...props }: Props) {
  const [pathData, setPathData] = useState<string>(paths[0]);

  useEffect(() => {
    let setPathIndex = 1;
    setPathData(paths[setPathIndex]);

    const interval = setInterval(
      () => {
        setPathIndex++;
        if (setPathIndex >= paths.length) setPathIndex = 0;
        setPathData(paths[setPathIndex]);
      },
      animationInterval && animationInterval > 0 ? animationInterval : (duration / paths.length) * 1.2
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={pathData}
        style={{
          transition: `all ${duration}ms ${transitionStyle}`,
        }}
      />
      {children}
    </svg>
  );
}
