import React from 'react'

export type ModalProps = {
  children: React.ReactNode
  show: boolean
  onClose?: () => void
}

export default function Modal({ children, show, onClose }: ModalProps) {
  return (
    <>
      {show ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50,
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 'var(--dim-round-corner)',
              maxWidth: 800,
              minHeight: 400,
              margin: '0 auto',
              padding: 30,
            }}
          >
            <button
              style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: 'red',
                cursor: 'pointer',
                marginLeft: 'auto',
                alignItems: 'end',
              }}
            >
              <span onClick={onClose}>Close</span>
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </>
  )
}
