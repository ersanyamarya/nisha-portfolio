import styled from '@emotion/styled';
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

const ModalWrapper = styled.div`
  padding: 1rem 2rem;
  min-width: 160px;
  display: none;

  margin: 0 auto;

  background: #fcfcff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  background-size: cover;
  backdrop-filter: blur(px);
  border-radius: 0.4rem;

  flex-direction: column;
  justify-content: center;
  align-items: start;

  color: #191c1e;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    span {
      font-size: 1.2rem;
      line-height: 4rem;
    }
    :hover {
      box-shadow: none;
      filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25));
    }
  }
`;

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  return (
    <ModalWrapper className="modal-wrapper">
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
    </ModalWrapper>
  );
}
