import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Contact from '../contact';

export default function CtaSection() {
  const [showContact, setShowContact] = useState(false);

  return (
    <section
      id="contact"
      className="-mx-4 rounded-3xl bg-default-900 px-6 py-20 text-center md:px-16">
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />
      <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-extrabold tracking-[-0.02em] text-default-50 md:text-6xl">Let's build something great together.</h2>
      <p className="mx-auto mb-10 max-w-xl text-lg text-default-50 opacity-70">Always happy to talk products, research, or new opportunities.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          className="bg-default-50 text-default-900 hover:opacity-85"
          onClick={() => setShowContact(true)}>
          Let's talk
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-default-50/25 bg-transparent text-default-50 hover:bg-default-50/10">
          <a href="mailto:kumari.nisha.de@gmail.com">kumari.nisha.de@gmail.com</a>
        </Button>
      </div>
    </section>
  );
}
