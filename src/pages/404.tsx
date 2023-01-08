import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import Contact from '../sections/contact'
import Layout from '../layouts/mainLayout'

const NotFoundPage: React.FC<PageProps> = () => {
  const [showContact, setShowContact] = React.useState(false)
  return (
    <>
      <Contact open={showContact} onClose={() => setShowContact(false)} />
      <Layout
        openContactForm={() => {
          setShowContact(true)
        }}
      >
        <main
          style={{
            width: '100%',
            height: '100%',
            padding: '15rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-500)',
            gap: '2rem',
          }}
        >
          <h1 className="text-style-heading-h-1-regular">404</h1>
          <p className="text-style-heading-h-2-regular">Page not found</p>
          <Link
            style={{
              backgroundColor: 'var(--color-primary-500)',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              color: 'var(--color-primary-0)',
            }}
            to="/"
            className="text-style-heading-h-3-regular"
          >
            Go back to home
          </Link>
        </main>
      </Layout>
    </>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
