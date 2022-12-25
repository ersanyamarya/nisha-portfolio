import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Logo, SvgBlob } from '../../components'
import { SocialIcons } from '../../components/socialIcons'
const FooterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',
})
const FooterContainer = styled.footer({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8rem',
  width: '100%',
  padding: '4rem 8rem',
  backgroundColor: 'var(--color-secondary-100)',
  color: 'var(--color-primary-500)',

  '@media (max-width: 768px)': {
    flexDirection: 'column',
    padding: '4rem 2rem',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: '2rem',
    flex: 1,
  },
})

const Wave = styled(SvgBlob)({
  width: '100%',
  height: '10vh',
  overflow: 'hidden',
})

export default function Footer() {
  const {
    site: {
      siteMetadata: { description, title, copyWrite },
    },
  } = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          description
          title
          copyWrite
        }
      }
    }
  `)
  return (
    <FooterWrapper>
      <Wave
        viewBox="0 0 1200 201"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        duration={5000}
        fill="url(#paint_linear_gradient)"
        paths={[
          'M0 0L50 30C100 60 200 120 300 132C400 144 500 108 600 114C700 120 800 168 900 186C1000 204 1100 192 1150 186L1200 180V360H1150C1100 360 1000 360 900 360C800 360 700 360 600 360C500 360 400 360 300 360C200 360 100 360 50 360H0V0Z',
          'M0 9.94947L50 45.9495C100 81.9495 200 153.949 300 183.949C400 213.949 500 201.949 600 153.949C700 105.949 800 21.9495 900 3.94947C1000 -14.0505 1100 33.9495 1150 57.9495L1200 81.9495V297.949H1150C1100 297.949 1000 297.949 900 297.949C800 297.949 700 297.949 600 297.949C500 297.949 400 297.949 300 297.949C200 297.949 100 297.949 50 297.949H0V9.94947Z',
        ]}
      >
        <linearGradient
          id="paint_linear_gradient"
          x1="657.5"
          y1="212"
          x2="654.5"
          y2="-358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-secondary-100)" />
          <stop offset="1" stopColor="var(--color-secondary-0)" />
        </linearGradient>
      </Wave>
      <FooterContainer>
        <div>
          <Logo />
          <p className="text-style-body-regular-semi-bold">{description}</p>
        </div>
        <div>
          <p>
            ©{' '}
            <a href="https://www.linkedin.com/in/nisha-kumari-de/" target="_blank">
              {copyWrite}
            </a>{' '}
            {new Date().getFullYear()}, Built with ❤️
          </p>

          <SocialIcons
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
            }}
          />
        </div>
      </FooterContainer>
    </FooterWrapper>
  )
}
