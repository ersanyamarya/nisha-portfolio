import React from 'react'
import { SocialLinks } from '../../components'
import '../layout.css'
import NavBar from './navBar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="">
        {/* <NavSlider /> */}
        <NavBar />
        <SocialLinks />
        {children}
      </div>
    </>
  )
}
