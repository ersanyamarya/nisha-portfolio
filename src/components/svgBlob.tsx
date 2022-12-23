import React from 'react'
import { useSpring, animated } from 'react-spring'
interface Props extends React.SVGProps<SVGSVGElement> {}
export function SvgBlob({ ...props }: Props) {
  const animationStyles = useSpring({
    from: {
      d: 'M312.85 7.76678C372.123 -2.10929 434.397 -5.7833 488.213 20.9487C547.766 50.5308 603.395 98.0072 622.651 161.654C641.771 224.854 609.053 289.131 588.315 351.818C567.702 414.124 554.024 482.738 502.84 523.813C450.548 565.779 379.862 570.651 312.85 572.883C243.643 575.188 170.935 575.37 113.438 536.781C54.8696 497.473 9.39615 433.665 1.0538 363.623C-6.74718 298.127 37.4713 240.425 71.404 183.864C98.11 139.349 133.419 103.666 175.361 73.0766C217.382 42.4287 261.547 16.315 312.85 7.76678Z',
    },

    to: {
      d: 'M350.274 3.04708C423.38 -13.1396 505.103 37.5041 547.014 99.553C586.183 157.542 545.232 234.778 553.715 304.24C559.857 354.527 588.509 397.449 589.582 448.098C591.135 521.386 609.495 605.546 561.269 660.753C511.877 717.294 425.35 721.684 350.274 722.049C274.899 722.415 199.301 706.365 137.783 662.81C75.7687 618.905 28.5515 554.604 9.77396 480.977C-8.306 410.086 -2.49621 330.056 37.2546 268.636C73.4533 212.705 157.258 217.705 208.06 174.601C266.119 125.34 275.932 19.5072 350.274 3.04708Z',
    },
    onRest: () => {
      console.log('rest')
    },
    config: {
      duration: 5000,
    },
    loop: { reverse: true },
  })

  return (
    <svg
      viewBox="0 0 723 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <animated.path {...animationStyles} fill="url(#paint0_linear_59_11341)" fillRule="evenodd" clipRule="evenodd" />

      <defs>
        <linearGradient
          id="paint0_linear_59_11341"
          x1="1.20022e-05"
          y1="452.5"
          x2="478"
          y2="176.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-primary-700)" />
          <stop offset="1" stopColor="var(--color-primary-100)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
