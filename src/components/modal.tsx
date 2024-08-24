import styled from '@emotion/styled';
import React from 'react';

const Backdrop = styled.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(10, 10, 10, 0.3)',
  padding: 50,
  zIndex: 100,
  //   transition: 'var(--transition-ease)',
  //   backdropFilter: 'blur(5px)',
});
const CloseButton = styled.button({
  padding: '1.5rem',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: -8,
  right: -8,
  borderRadius: 'var(--dim-round-corner)',
  backgroundColor: 'var(--color-primary-500)',
  color: 'var(--color-secondary-0)',
});

const ModalWrapper = styled.div({
  borderRadius: 'var(--dim-round-corner)',
  maxWidth: '90vw',
  minHeight: '90vh',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: 'rgba(250, 251, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  boxShadow: 'var(--elevation-light)',
  color: 'var(--color-primary-500)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

export default function Modal({ children, onClose, open }: ModalProps) {
  if (!open) return null;
  return (
    <Backdrop>
      <ModalWrapper>
        <CloseButton onClick={() => onClose()}>
          <svg
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            width="16px"
            height="16px"
            viewBox="0 0 122.878 122.88"
            xmlSpace="preserve"
            fill="currentColor">
            <g>
              <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
            </g>
          </svg>
        </CloseButton>
        {children}
      </ModalWrapper>
    </Backdrop>
  );
}
