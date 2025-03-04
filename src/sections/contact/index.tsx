import styled from '@emotion/styled';
import * as React from 'react';
import useForm from '../../hooks/useForm';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

const Backdrop = styled.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(10, 10, 10, 0.4)',
  paddingTop: 50,
  zIndex: 100,
  backdropFilter: 'blur(3px)',
});

const ModalWrapper = styled.div({
  borderRadius: '12px',
  width: 'min(92vw, 650px)',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: 'rgba(250, 251, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  color: 'var(--color-primary-500)',
});

export type ContactProps = {
  open: boolean;
  onClose: () => void;
};

export default function Contact({ open, onClose }: ContactProps) {
  const textClassNames =
    'w-full p-3 border border-default-200 rounded-lg bg-white/60 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-primary-900';
  const { state, registerField, noErrors, reset, valueExists } = useForm(
    {
      name: '',
      email: '',
      message: '',
    },
    textClassNames
  );

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

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
          <ModalWrapper className="animate-fade-in">
            <button
              className="absolute -right-3 -top-3 rounded-full bg-primary-600 p-2 text-primary-50 shadow-md transition-colors duration-200 hover:bg-primary-700"
              onClick={handleClose}>
              <svg
                width="14px"
                height="14px"
                viewBox="0 0 122.878 122.88"
                xmlSpace="preserve"
                fill="currentColor">
                <g>
                  <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                </g>
              </svg>
            </button>
            <div className="flex flex-col gap-5 p-8 md:p-10">
              <h2 className="mb-2 text-2xl font-bold text-primary-800">Get in touch</h2>
              <label
                style={{
                  display: 'none',
                }}>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
              <input
                type="text"
                {...registerField('name', {
                  placeholder: 'Your name',
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
                  placeholder: 'Email address',
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
                rows={4}
                {...registerField('message', {
                  placeholder: 'What would you like to discuss?',
                  validator: value => {
                    if (value.length < 0) {
                      return 'Message is required';
                    }
                    return '';
                  },
                })}
              />
              <div className="mt-2">
                <button
                  className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-primary-50 transition-colors duration-200 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!noErrors || !valueExists(['name', 'email', 'message'])}
                  onClick={async () => {
                    await handleSubmit();
                  }}>
                  Send message
                </button>
              </div>
            </div>
          </ModalWrapper>
        </Backdrop>
      ) : null}
    </>
  );
}
