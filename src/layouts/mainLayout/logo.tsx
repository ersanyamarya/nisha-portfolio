import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const LogoTitle = styled.span({
  color: 'var(--color-primary-main)',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  padding: '0rem 0.2rem',
  '&:nth-of-type(even)': {
    color: 'var(--color-on-primary-main)',
    backgroundColor: 'var(--color-primary-main)',
  },
})

export default function Logo() {
  return (
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
      }}
      to="/"
    >
      <StaticImage width={64} src="../../images/icon.png" alt="A corgi smiling happily" />
      <div
        style={{
          display: 'flex',
        }}
      >
        <LogoTitle>Nisha</LogoTitle>
        <LogoTitle>Kumari</LogoTitle>
      </div>
    </Link>
  )
}
