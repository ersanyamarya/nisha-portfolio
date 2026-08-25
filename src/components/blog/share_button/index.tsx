import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

interface ShareButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  return (
    <div className="absolute top-16 right-4 z-10 mx-auto hidden min-w-40 flex-col items-start justify-center gap-4 rounded-lg bg-card px-8 py-4 text-card-foreground shadow-[var(--elevation-surface)] backdrop-blur-md group-hover:flex [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:gap-4 [&_button:hover]:shadow-none [&_button:hover]:[filter:drop-shadow(0px_2px_10px_rgba(41,37,36,0.25))] [&_span]:text-xl [&_span]:leading-[4rem]">
      <LinkedinShareButton
        url={url}
        title={title}
        summary={description}>
        <LinkedinIcon
          size={32}
          round={true}
        />{' '}
        <span>LinkedIn</span>
      </LinkedinShareButton>

      <TwitterShareButton
        url={url}
        title={description}>
        <TwitterIcon
          size={32}
          round={true}
        />{' '}
        <span>Twitter</span>
      </TwitterShareButton>

      <WhatsappShareButton
        url={url}
        title={description}>
        <WhatsappIcon
          size={32}
          round={true}
        />{' '}
        <span>Whatsapp</span>
      </WhatsappShareButton>

      <FacebookShareButton
        url={url}
        title={description}>
        <FacebookIcon
          size={32}
          round={true}
        />{' '}
        <span>Facebook</span>
      </FacebookShareButton>
    </div>
  );
}
