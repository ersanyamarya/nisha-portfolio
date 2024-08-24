import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

const LogoTitle = styled.span({
  color: 'var(--color-primary-700)',
  padding: '0rem 0.2rem',
  '&:nth-of-type(even)': {
    color: 'var(--color-primary-0)',
    backgroundColor: 'var(--color-primary-700)',
    borderRadius: 'var(--dim-round-corner)',
  },
});

export function Logo({ ...props }) {
  return (
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        backgroundColor: 'var(--color-primary-50)',
      }}
      {...props}
      to="/">
      {/* <StaticImage width={64} src="../../images/icon.png" alt="REPLACE WITH ACTUAL COPY" /> */}
      <div
        style={{
          display: 'flex',
        }}>
        <LogoTitle className="text-style-heading-h-3-semi-bold">N</LogoTitle>
        <LogoTitle className="text-style-heading-h-3-semi-bold">K</LogoTitle>
      </div>
    </Link>
  );
}
