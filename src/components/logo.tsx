import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const LogoTitle = styled.span({
  color: 'var(--color-primary-500)',
  padding: '0rem 0.2rem',
  '&:nth-of-type(even)': {
    color: 'var(--color-primary-0)',
    backgroundColor: 'var(--color-primary-500)',
    borderRadius: 'var(--dim-round-corner)',
  },
})

export function Logo({ ...props }) {
  return (
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
      }}
      {...props}
      to="/"
    >
      {/* <StaticImage width={64} src="../../images/icon.png" alt="REPLACE WITH ACTUAL COPY" /> */}
      <div
        style={{
          display: 'flex',
        }}
      >
        <LogoTitle className="text-style-heading-h-3-semi-bold">NISHA</LogoTitle>
        <LogoTitle className="text-style-heading-h-3-semi-bold">KUMARI</LogoTitle>
      </div>
    </Link>
  )
}
