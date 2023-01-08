import styled from '@emotion/styled'
import React from 'react'
import { SocialIcons } from '../../components'
import '../layout.css'
import Footer from './footer'
import NavBar from './navBar'
interface LayoutProps {
  children: React.ReactNode
  openContactForm: () => void
}

const SocialLinksContainer = styled(SocialIcons)({
  position: 'fixed',
  top: 'calc(50% - 5rem)',
  left: '1%',
  display: 'flex',
  padding: '1rem 1rem',
  borderRadius: 'var(--dim-round-corner-large)',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  zIndex: 1,
  boxShadow: 'var(--elevation-light)',
  width: 'fit-content',
  backgroundColor: 'var(--color-primary-0)',
  '@media only screen and (max-width: 920px)': {
    display: 'none',
  },
  '&:hover > :not(:hover) ': {
    opacity: 0.5,
  },
})

export default function Layout({ children, openContactForm }: LayoutProps) {
  return (
    <>
      <div className="">
        {/* <NavSlider /> */}
        <NavBar openContactForm={openContactForm} />
        <SocialLinksContainer showEmail={false} />
        {children}
        <Footer />
      </div>
    </>
  )
}
