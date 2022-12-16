import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../layouts/mainLayout'
import { StaticImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

const ContactMeButton = styled.button({
  marginTop: '1.5rem',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'var(--color-primary-main)',
  color: 'var(--color-on-primary-main)',
  fontSize: '1.5rem',
  fontWeight: '550',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '4px 4px 8px #33333388',
  },
})

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 4rem',
        }}
      >
        <section
          id="hero"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '80vw',
            height: 'calc(var(--dim-hero-clip) - 6rem)',
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
            <h2>Hello I'm</h2>
            <h1
              style={{
                marginTop: '0.8rem',
              }}
            >
              Nisha Kumari
            </h1>
            <h3>UI/UX Designer</h3>
            <ContactMeButton>Use My Brain</ContactMeButton>
          </div>
          <StaticImage width={128 * 4} src="../images/person.png" alt="A corgi smiling happily" />
        </section>
        <section id="whyme">
          <h1>Why me</h1>
          <p>
            Occaecat sint incididunt ea officia. Dolor velit nisi elit mollit culpa voluptate sit aliqua cillum commodo
            minim. Ea ullamco dolore cupidatat est commodo veniam cupidatat do sint eiusmod. Laboris incididunt duis
            exercitation id commodo qui deserunt fugiat pariatur. Laborum id amet aute eiusmod tempor sunt dolore magna.
            Ipsum quis in consequat culpa velit commodo ullamco magna id eu excepteur excepteur do dolore. Est laborum
            veniam ex ipsum ipsum aliquip nostrud qui velit enim laborum commodo velit. Enim fugiat quis dolore
            consequat non irure. Dolore exercitation mollit laboris non ipsum ad. Nostrud aute ut aliquip enim proident
            veniam. Sunt ipsum dolor eiusmod consequat dolor sunt proident occaecat ipsum laborum. Labore adipisicing
            reprehenderit incididunt amet velit exercitation laborum eu nisi anim amet. Cillum fugiat in consequat irure
            ut amet. Sit tempor magna est est anim ex esse nisi sit. Officia consequat aute anim id laborum
            reprehenderit enim aliquip ex do Lorem exercitation. Ullamco non incididunt deserunt sint nulla. Quis
            excepteur culpa ipsum ullamco magna sint occaecat culpa et in Lorem. Adipisicing elit aliquip laborum id.
            Lorem do Lorem eu cupidatat est ex fugiat cillum amet adipisicing enim irure id. Sunt velit do ad ipsum ut.
            Velit magna quis eu Lorem ea amet nisi laborum excepteur id labore non labore. Sit exercitation esse ullamco
            nostrud duis aliqua deserunt occaecat voluptate elit laborum adipisicing. Velit pariatur veniam quis dolore
            aliqua amet magna aliquip duis anim ut cillum cillum mollit. Et ea incididunt cupidatat ipsum laborum veniam
            pariatur irure dolor eu. Ullamco enim enim voluptate dolor mollit exercitation esse non non fugiat duis. Sit
            nisi laboris veniam excepteur incididunt mollit labore nisi culpa. Veniam fugiat anim quis aute enim fugiat
            commodo. Ad non nisi laborum mollit amet id qui proident minim cillum Lorem.
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
