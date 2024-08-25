import styled from '@emotion/styled';
import React from 'react';
import useForm from '../../hooks/useForm';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

const Backdrop = styled.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(10, 10, 10, 0.3)',
  paddingTop: 50,
  zIndex: 100,

  //   transition: 'var(--transition-ease)',
  //   backdropFilter: 'blur(5px)',
});

const ModalWrapper = styled.div({
  borderRadius: 'var(--dim-round-corner)',
  width: 'min(92vw, 800px)',
  minHeight: '400px',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: 'rgba(250, 251, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  boxShadow: 'var(--elevation-light)',
  color: 'var(--color-primary-500)',
});

export type ContactProps = {
  open: boolean;
  onClose: () => void;
};

export default function Contact({ open, onClose }: ContactProps) {
  const textClassNames = 'p-4 border border-default-700 rounded-md';
  const { state, registerField, noErrors, reset, valueExists } = useForm(
    {
      name: '',
      email: '',
      message: `Let's talk about your project!`,
    },
    textClassNames
  );

  const handleSubmit = async () => {
    onClose();
    try {
      const data = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        body: JSON.stringify(state),
      }).then(res => res.json());
      if (data.status === 'success') alert('Message Sent.');
      reset();
    } catch (error) {
      console.error(error);

      alert('Error sending message.');
      reset();
    }
  };
  return (
    <>
      {open ? (
        <Backdrop>
          <ModalWrapper>
            <button
              className="absolute -right-2 -top-3 rounded-md bg-primary p-4 text-2xl text-primary-50"
              onClick={() => onClose()}>
              <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="20px"
                height="20px"
                viewBox="0 0 122.878 122.88"
                xmlSpace="preserve"
                fill="currentColor">
                <g>
                  <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                </g>
              </svg>
            </button>
            <div className="text-default flex flex-col gap-4 p-8 px-32">
              <h2 className="text-2xl">Send me a message</h2>
              <label
                style={{
                  display: 'none',
                }}>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
              <input
                type="text"
                {...registerField('name', {
                  validator: value => {
                    if (value.length < 0) {
                      return 'Name is required';
                    }
                    return '';
                  },
                })}
              />
              <input
                type="email"
                {...registerField('email', {
                  validator: value => {
                    // validate email with regex
                    if (!value.match(EMAIL_REGEX)) {
                      return 'Invalid email';
                    }

                    return '';
                  },
                })}
              />
              <textarea
                rows={2}
                {...registerField('message', {
                  validator: value => {
                    if (value.length < 0) {
                      return 'Message is required';
                    }
                    return '';
                  },
                })}
              />
              <div>
                <button
                  className="w-fit-content rounded-lg bg-primary px-8 py-2 text-xl text-primary-50"
                  disabled={!noErrors || !valueExists(['name', 'email', 'message'])}
                  onClick={async () => {
                    await handleSubmit();
                  }}>
                  Send
                </button>
              </div>
            </div>
          </ModalWrapper>
        </Backdrop>
      ) : null}
    </>
  );
}
