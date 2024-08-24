import { Link } from 'gatsby';
import React from 'react';

export function Logo({ ...props }) {
  return (
    <Link
      {...props}
      to="/">
      {/* <StaticImage width={64} src="../../images/icon.png" alt="REPLACE WITH ACTUAL COPY" /> */}
      <div className="gap-0.1 flex text-3xl font-medium">
        <span className="px-1 py-0.5 text-primary">N</span>
        <span className="rounded-sm bg-primary px-1 py-0.5 text-primary-50">K</span>
      </div>
    </Link>
  );
}
