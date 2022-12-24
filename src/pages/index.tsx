import styled from '@emotion/styled'
import { HeadFC, PageProps } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { SvgBlob } from '../components/svgBlob'
import useScrollPosition from '../hooks/useScrollPosition'
import Layout from '../layouts/mainLayout'
import Contact from '../sections/contact'
import ProjectsSection from '../sections/projects'
const paths = [
  'M312.85 7.76678C372.123 -2.10929 434.397 -5.7833 488.213 20.9487C547.766 50.5308 603.395 98.0072 622.651 161.654C641.771 224.854 609.053 289.131 588.315 351.818C567.702 414.124 554.024 482.738 502.84 523.813C450.548 565.779 379.862 570.651 312.85 572.883C243.643 575.188 170.935 575.37 113.438 536.781C54.8696 497.473 9.39615 433.665 1.0538 363.623C-6.74718 298.127 37.4713 240.425 71.404 183.864C98.11 139.349 133.419 103.666 175.361 73.0766C217.382 42.4287 261.547 16.315 312.85 7.76678Z',
  'M350.274 3.04708C423.38 -13.1396 505.103 37.5041 547.014 99.553C586.183 157.542 545.232 234.778 553.715 304.24C559.857 354.527 588.509 397.449 589.582 448.098C591.135 521.386 609.495 605.546 561.269 660.753C511.877 717.294 425.35 721.684 350.274 722.049C274.899 722.415 199.301 706.365 137.783 662.81C75.7687 618.905 28.5515 554.604 9.77396 480.977C-8.306 410.086 -2.49621 330.056 37.2546 268.636C73.4533 212.705 157.258 217.705 208.06 174.601C266.119 125.34 275.932 19.5072 350.274 3.04708Z',
]
const ContactMeButton = styled.button({
  marginTop: '2rem',
  padding: '1rem 4rem',
  border: 'none',
  borderRadius: 'var(--dim-round-corner-large)',
  backgroundColor: 'var(--color-primary-500)',
  color: 'var(--color-primary-0)',
  fontSize: '2.438rem',
  fontWeight: '400',
  cursor: 'pointer',
  width: 'fit-content',
  boxShadow: 'var(--elevation-surface)',
  transform: 'scale(0.95)',
  marginLeft: '-0.8rem',
  transition: 'var(--transition-ease)',
  '&:hover': {
    boxShadow: 'var(--elevation-focus)',
    transform: 'scale(1)',
    // marginLeft: '0rem',
  },
})

const HeroSection = styled.section({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '8rem',
  margin: '0 auto',
  width: '80vw',
  height: 'calc(100vh - var(--dim-nav-height))',
  // '&:hover > div > svg': {
  //   // opacity: 0.5,
  //   transform: 'scale(1.2)',
  // },

  '@media only screen and (max-width: 920px)': {
    flexDirection: 'column',
    width: '100vw',
    marginTop: 'var(--dim-nav-height)',
    gap: '2rem',
  },
})

const HeroBlob = styled(SvgBlob)({
  position: 'absolute',
  top: '0%',
  right: '-32%',
  zIndex: -1,
  width: '50vh',
  height: '60vh',
  overflow: 'hidden',

  // '@media only screen and (max-width: 920px)': {
  //   top: '30vh',
  //   width: '30vh',
  //   height: '50vh',
  // },
})

const IndexPage: React.FC<PageProps> = () => {
  const scrollPosition = useScrollPosition()
  const [showContact, setShowContact] = React.useState(false)
  return (
    <>
      <Contact open={showContact} onClose={() => setShowContact(false)} />
      <Layout
        openContactForm={() => {
          setShowContact(true)
        }}
      >
        <main>
          <HeroSection id="hero">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  lineHeight: '2',
                }}
                className="text-style-heading-h-2-regular"
              >
                I am,
              </span>
              <span
                style={{
                  lineHeight: '1.2',
                }}
                className="text-style-heading-h-1-semi-bold"
              >
                Nisha Kumari
              </span>
              <span
                style={{
                  lineHeight: '1.2',
                }}
                className="text-style-heading-h-2-semi-bold"
              >
                UI/UX Designer
              </span>
              <ContactMeButton
                onClick={() => {
                  setShowContact(true)
                }}
              >
                Contact Me
              </ContactMeButton>
            </div>
            <div
              style={{
                position: 'relative',
              }}
            >
              <HeroBlob
                viewBox="0 0 723 650"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                paths={paths}
                duration={5000}
                fill="url(#paint0_linear_59_11341)"
              >
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
              </HeroBlob>
              <StaticImage
                placeholder="blurred"
                layout="fullWidth"
                style={{
                  width: '40vh',
                }}
                src="../images/person.png"
                alt="REPLACE WITH ACTUAL COPY"
              ></StaticImage>
            </div>
          </HeroSection>
          <ProjectsSection />
        </main>
      </Layout>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Nisha Kumari</title>
