import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nisha Kumari | UI/UX Designer`,
    siteUrl: `https://nisha-kumari-portfolio.netlify.app`,
    description: `Nisha Kumari, UI/UX designer in Berlin, passionate about creating user-centric designs. Completed course with Google, seeking opportunities to create user-friendly products.`,
    linkedinUsername: `nisha-kumari-de/`,
    twitterUsername: `nishakumari_de`,
    image: '/seoThumbnail.png',
    keyWords: [
      'UI/UX designer',
      'user-centric design',
      'Berlin',
      'IT experience',
      'art',
      'Google course',
      'Coursera course',
      'user interface design',
      'user experience design',
      'user-friendly products',
      'user research',
      'usability testing',
      'interaction design',
      'wireframing',
      'prototyping',
      'visual design',
      'graphic design',
      'user flow',
      'usability',
      'accessibility',
      'Figma',
      'Adobe XD',
      'design tools',
    ],
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        createLinkInHead: true,
      },
    },
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
  ],
}

export default config
