import React from 'react'
import { SocialLinks } from '../../components'
import '../layout.css'
import NavBar from './navBar'

interface LayoutProps {
  children: React.ReactNode
  openContactForm: () => void
}

export default function Layout({ children, openContactForm }: LayoutProps) {
  return (
    <>
      <div className="">
        {/* <NavSlider /> */}
        <NavBar openContactForm={openContactForm} />
        <SocialLinks />
        {children}
      </div>
    </>
  )
}
