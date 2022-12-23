import styled from '@emotion/styled'
import { HeadFC, PageProps } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { SvgBlob } from '../components/svgBlob'
import useScrollPosition from '../hooks/useScrollPosition'
import Layout from '../layouts/mainLayout'
import Contact from '../sections/contact'
import ProjectsSection from '../sections/projects'

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
  transition: 'var(--transition-ease)',
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
              {/* <HeroBlob
                style={{
                  transition: 'var(--transition-slow)',
                  transform: `rotate(${scrollPosition / 5}deg)`,
                }}
                viewBox="0 0 478 573"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M207.262 0.313351C338.646 -6.98229 436.561 114.293 470.663 241.384C499.653 349.425 437.712 453.864 346.24 518.254C259.53 579.292 142.659 596.207 58.7989 531.31C-19.2097 470.941 -5.80895 361.364 20.7514 266.367C52.9933 151.05 87.7064 6.95214 207.262 0.313351Z"
                  fill="url(#paint0_linear_59_11341)"
                />
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
                    <stop offset="1" stopColor="var(--color-primary-0)" />
                  </linearGradient>
                </defs>
              </HeroBlob> */}
              <HeroBlob />
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
