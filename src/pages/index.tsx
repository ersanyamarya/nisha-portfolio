import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../layouts/mainLayout'
import { StaticImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

const ContactMeButton = styled.button({
  marginTop: '1.5rem',
  padding: '1rem 4rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'var(--color-primary-500)',
  color: 'var(--color-primary-0)',
  fontSize: '2.438rem',
  fontWeight: '400',
  cursor: 'pointer',
  width: 'fit-content',
  transition: 'var(--transition-ease)',
  '&:hover': {
    boxShadow: 'var(--elevation-focus)',
  },
})

const HeroSection = styled.section({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '8rem',
  margin: '0 auto',
  width: '80vw',
  height: 'calc(100vh - var(--dim-nav-height))',
  '@media only screen and (max-width: 920px)': {
    flexDirection: 'column',
    width: '100vw',
    marginTop: 'var(--dim-nav-height)',
  },
})

const HeroBlob = styled.svg({
  position: 'absolute',
  top: '10vh',
  right: '0',
  width: '50vh',
  height: '60vh',

  '@media only screen and (max-width: 920px)': {
    top: '30vh',
    width: '40vh',
    height: '50vh',
  },
})
const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main>
        <HeroBlob viewBox="0 0 440 618" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M282.321 0.117837C363.442 -3.56932 412.097 80.0621 466.755 140.118C529.461 209.016 638.819 273.222 612.104 362.47C585.482 451.404 451.425 424.469 368.908 466.999C280.288 512.673 220.379 643.167 125.227 613.409C28.1003 583.034 1.67535 453.385 0.0182355 351.633C-1.28584 271.559 67.6305 218.421 117.777 155.98C167.547 94.0075 202.919 3.72686 282.321 0.117837Z"
            fill="url(#paint0_linear_20_18)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_20_18"
              x1="-9"
              y1="273.5"
              x2="596.5"
              y2="212"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="var(--color-primary-700)" />
              <stop offset="1" stop-color="var(--color-primary-0)" />
            </linearGradient>
          </defs>
        </HeroBlob>

        <HeroSection id="hero">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <span
              style={{
                lineHeight: '1.5',
              }}
              className="text-style-heading-h-2-regular"
            >
              I am
            </span>
            <span
              style={{
                lineHeight: '1.2',
              }}
              className="text-style-heading-h-1-semi-bold"
            >
              Nisha Kumari
            </span>
            <span
              style={{
                lineHeight: '1.2',
              }}
              className="text-style-heading-h-2-semi-bold"
            >
              UI/UX Designer
            </span>
            <ContactMeButton>Contact Me</ContactMeButton>
          </div>
          <div
            style={{
              flex: 1,
            }}
          >
            <div>
              <StaticImage
                placeholder="blurred"
                layout="constrained"
                src="../images/person.png"
                alt="A corgi smiling happily"
              />
            </div>
          </div>
        </HeroSection>
        <section id="projects">
          <h1>Projects</h1>
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
          </p>{' '}
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
          </p>{' '}
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
          </p>{' '}
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
