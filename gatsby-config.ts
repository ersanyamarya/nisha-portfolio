import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nisha Kumari | Senior UX Designer`,
    siteUrl: `https://nishakumari.art/`,
    description: `Nisha Kumari, Senior UX designer in Berlin, passionate about creating user-centric designs. Completed course with Google, seeking opportunities to create user-friendly products.`,
    linkedinUsername: `nisha-kumari-de/`,
    twitterUsername: `nishakumari_de`,
    image: '/seoThumbnail.png',
    copyWrite: 'Nisha Kumari',
    keyWords: [
      'Senior UX designer',
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-minify`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: 'Nisha Kumari | Senior UX Designer',
        short_name: 'Nisha Kumari',
        start_url: '/',
        display: 'standalone',
        background_color: '#fffdfa',
        theme_color: '#525c8f',
        lang: 'en',
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
