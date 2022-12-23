import styled from '@emotion/styled'
import React from 'react'
import useForm from '../../hooks/useForm'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i

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
})
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
})

const ModalWrapper = styled.div({
  borderRadius: 'var(--dim-round-corner)',
  maxWidth: 800,
  minHeight: 400,
  margin: '0 auto',
  position: 'relative',
  backgroundColor: 'rgba(250, 251, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  boxShadow: 'var(--elevation-light)',
  color: 'var(--color-primary-500)',
})

const ModalContent = styled.div({
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '2rem',

  '& input, textarea': {
    width: '100%',
    maxWidth: '400px',
    padding: '1rem',
    border: '1px solid var(--color-primary-300)',
    borderRadius: 'var(--dim-round-corner)',
    backgroundColor: 'var(--color-primary-0)',
    color: 'var(--color-primary-900)',
    '::placeholder': {
      color: 'var(--color-primary-200)',
    },

    '&.error': {
      border: '1px solid #FF331F',
    },
  },
  '& button': {
    padding: '1rem 2.4rem',
    border: 'none',
    borderRadius: 'var(--dim-round-corner)',
    backgroundColor: 'var(--color-primary-500)',
    color: 'var(--color-secondary-0)',
    marginTop: '1rem',
    width: 'fit-content',
    cursor: 'pointer',
    // boxShadow: 'var(--elevation-surface)',
    transform: 'scale(0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',

    transition: 'var(--transition-ease)',
    '&:hover': {
      boxShadow: 'var(--elevation-surface)',
      transform: 'scale(1)',
      // marginLeft: '0rem',
    },
    // Disabled state
    '&:disabled': {
      backgroundColor: 'var(--color-primary-200)',
      cursor: 'not-allowed',
      // disable hover
      '&:hover': {
        boxShadow: 'none',
        transform: 'scale(0.95)',
      },
    },
  },
})

export type ContactProps = {
  open: boolean
  onClose: () => void
}

export default function Contact({ open, onClose }: ContactProps) {
  const { state, registerField, noErrors, reset, valueExists } = useForm({
    name: '',
    email: '',
    message: `Let's talk about your project!`,
  })
  const handleSubmit = () => {
    console.log(state)
    reset()
    onClose()
  }
  return (
    <>
      {open ? (
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
                fill="currentColor"
              >
                <g>
                  <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                </g>
              </svg>
            </CloseButton>
            <ModalContent>
              <h2
                style={{
                  marginBottom: '2rem',
                }}
                className="text-style-heading-h-2-regular"
              >
                Send me a message
              </h2>
              <input
                type="text"
                {...registerField('name', {
                  validator: value => {
                    if (value.length < 0) {
                      return 'Name is required'
                    }
                    return ''
                  },
                })}
              />
              <input
                type="email"
                {...registerField('email', {
                  validator: value => {
                    // validate email with regex
                    if (!value.match(EMAIL_REGEX)) {
                      return 'Invalid email'
                    }

                    return ''
                  },
                })}
              />
              <textarea
                rows={2}
                {...registerField('message', {
                  validator: value => {
                    if (value.length < 0) {
                      return 'Message is required'
                    }
                    return ''
                  },
                })}
              />
              <button
                className="send text-style-heading-h-4-semi-bold"
                disabled={!noErrors || !valueExists(['name', 'email', 'message'])}
                onClick={() => handleSubmit()}
              >
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  width="32px"
                  height="32px"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  viewBox="0 0 512 371.13"
                >
                  <path d="M397 141.12c63.51 0 115 51.5 115 115.01 0 63.5-51.49 115-115 115s-115.02-51.5-115.02-115c0-63.51 51.51-115.01 115.02-115.01zM28.8 0h389.26c15.73 0 28.52 12.88 28.5 28.53l-.1 95.75c-7.58-2.84-15.46-5.04-23.59-6.55l.07-77.07-125.82 98.89 9.17 8.99c-3.04 2.56-5.94 5.24-8.75 8.04l-.09.1c-3.27 3.27-6.37 6.72-9.32 10.29l-10.89-10.69-42.14 35.87c-4.49 3.77-11.46 4.22-16.5.12l-44.24-36.1L39.45 282.69h219.27a140.08 140.08 0 0 0 6.71 23.6H28.49C12.74 306.29 0 293.42 0 277.76L.24 28.52C.27 12.84 13.05 0 28.8 0zm-5.19 261.9 130.45-122.08L23.82 41.69l-.21 220.21zM42.65 23.6l183.96 141.87L400.69 23.6H42.65zm358.01 180.04 49.96 51.69-51.52 53.32-16.07-15.44 25.81-26.71-65.47.07V244.3l65.53-.07-24.3-25.15 16.06-15.44z" />
                </svg>
              </button>
            </ModalContent>
          </ModalWrapper>
        </Backdrop>
      ) : null}
    </>
  )
}
