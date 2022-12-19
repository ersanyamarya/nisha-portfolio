import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
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
        <NavBar />
        <SocialLinks />
        {children}
      </div>
    </>
  )
}
