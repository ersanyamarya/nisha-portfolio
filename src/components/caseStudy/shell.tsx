import { Link } from 'gatsby';
import React from 'react';
import Layout from '../../layouts/mainLayout';
import { CaseStudySection, OnThisPageNav } from './onThisPageNav';

export function CaseStudyShell({ sections, children }: { sections: CaseStudySection[]; children: React.ReactNode }) {
  return (
    <Layout>
      <Link
        to="/#work"
        className="mb-4 inline-block text-sm font-semibold text-default-600 hover:text-primary">
        ← All work
      </Link>

      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_200px]">
        <div className="flex min-w-0 flex-col gap-16">{children}</div>
        <OnThisPageNav sections={sections} />
      </div>
    </Layout>
  );
}
