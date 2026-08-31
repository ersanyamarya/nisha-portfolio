import { MailIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal, SpotlightCard } from '../../components';
import Contact from '../contact';

export default function CtaSection() {
  const [showContact, setShowContact] = useState(false);

  return (
    <section id="contact">
      <Contact
        open={showContact}
        onClose={() => setShowContact(false)}
      />

      <Reveal>
        <SpotlightCard
          radius={420}
          className="rounded-3xl px-6 py-16 text-center glass-panel md:px-16 md:py-20">
          {/* A thin terracotta crema line across the top edge. */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <div className="mb-4 text-xs font-medium tracking-widest text-primary uppercase">Let's talk</div>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">Let's brew something together.</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Open to product or UX designer roles in Berlin or remote across Germany and Europe. A complex problem to untangle, or just coffee and design talk.
            Either is a good reason to write.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setShowContact(true)}>
              Start a conversation
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg">
              <a href="mailto:kumari.nisha.de@gmail.com">
                <MailIcon
                  strokeWidth={1.5}
                  size={16}
                />
                kumari.nisha.de@gmail.com
              </a>
            </Button>
          </div>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
