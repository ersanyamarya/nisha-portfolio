import React from 'react'
import { SocialLinks } from '../../components'
import { SocialLink } from '../../utils/contentfulBaseData'
import '../layout.css'
import NavBar from './navBar'

interface LayoutProps {
  children: React.ReactNode
  socialLinks: SocialLink[]
}

export default function Layout({ children, socialLinks }: LayoutProps) {
  return (
    <>
      <div className="">
        <NavBar />
        <SocialLinks socialLinks={socialLinks} />
        {children}
      </div>
    </>
  )
}
