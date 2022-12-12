import styled from '@emotion/styled'
import React from 'react'
import '../layout.css'
import NavBar from './navBar'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const MainArea = styled.div({
  position: 'absolute',
  height: 'var(--dim-hero-clip)',
  right: '0',
  width: '99%',
  top: '0px',
  zIndex: '-999999',
  background: 'var(--color-primary-main)',
  clipPath: 'polygon(43.2% 0%, 100% 0%, 100% 100%, 51.1% 100%)',
})
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
      <MainArea />
    </>
  )
}
